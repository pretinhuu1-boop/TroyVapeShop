import 'dotenv/config';
import express from 'express';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import http from 'http';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3002;

// Middleware
app.use(express.json({ limit: '50mb' })); // Para aguentar base64 de imagem
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Garantir que a pasta uploads existe
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Inicializar Banco de Dados
const db = new Database(path.join(__dirname, 'database.db'));

// Criar Tabelas
db.exec(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        brand TEXT NOT NULL,
        price REAL NOT NULL,
        stock INTEGER DEFAULT 0,
        puffs INTEGER DEFAULT 0,
        flavor TEXT,
        promo INTEGER DEFAULT 0,
        image TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        total_price REAL NOT NULL,
        customer_info TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(product_id) REFERENCES products(id)
    );
`);

// API Endpoints

// GET /api/products
app.get('/api/products', (req, res) => {
    try {
        const products = db.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
        // Converter promo para boolean
        const formatted = products.map(p => ({ ...p, promo: !!p.promo }));
        res.json(formatted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/products/:id
app.get('/api/products/:id', (req, res) => {
    try {
        const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
        if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
        res.json({ ...product, promo: !!product.promo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/products
app.post('/api/products', (req, res) => {
    const { name, brand, price, stock, puffs, flavor, promo, image } = req.body;
    let imageUrl = image;

    // Se receber base64, salvar em arquivo
    if (image && image.startsWith('data:image')) {
        try {
            const matches = image.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
            const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
            const buffer = Buffer.from(matches[2], 'base64');
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;
            const filePath = path.join(uploadsDir, fileName);
            fs.writeFileSync(filePath, buffer);
            imageUrl = `/uploads/${fileName}`;
        } catch (err) {
            console.error("Erro ao salvar imagem:", err);
        }
    }

    try {
        const stmt = db.prepare(`
            INSERT INTO products (name, brand, price, stock, puffs, flavor, promo, image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);
        const result = stmt.run(name, brand, price, stock || 0, puffs || 0, flavor, promo ? 1 : 0, imageUrl);
        const newProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);
        res.status(201).json({ ...newProduct, promo: !!newProduct.promo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/products/:id
app.put('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const { name, brand, price, stock, puffs, flavor, promo, image } = req.body;
    let imageUrl = image;

    if (image && image.startsWith('data:image')) {
        try {
            const matches = image.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
            const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
            const buffer = Buffer.from(matches[2], 'base64');
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;
            const filePath = path.join(uploadsDir, fileName);
            fs.writeFileSync(filePath, buffer);
            imageUrl = `/uploads/${fileName}`;
        } catch (err) {
            console.error("Erro ao salvar imagem:", err);
        }
    }

    try {
        // Build dynamic SET clause
        const fields = [];
        const values = [];
        if (name !== undefined) { fields.push('name = ?'); values.push(name); }
        if (brand !== undefined) { fields.push('brand = ?'); values.push(brand); }
        if (price !== undefined) { fields.push('price = ?'); values.push(price); }
        if (stock !== undefined) { fields.push('stock = ?'); values.push(stock); }
        if (puffs !== undefined) { fields.push('puffs = ?'); values.push(puffs); }
        if (flavor !== undefined) { fields.push('flavor = ?'); values.push(flavor); }
        if (promo !== undefined) { fields.push('promo = ?'); values.push(promo ? 1 : 0); }
        if (imageUrl !== undefined) { fields.push('image = ?'); values.push(imageUrl); }

        if (fields.length === 0) return res.status(400).json({ error: 'Nenhum campo para atualizar' });

        values.push(id);
        const stmt = db.prepare(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`);
        const result = stmt.run(...values);

        if (result.changes === 0) return res.status(404).json({ error: 'Produto não encontrado' });

        const updated = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
        res.json({ ...updated, promo: !!updated.promo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/products/:id
app.delete('/api/products/:id', (req, res) => {
    try {
        const stmt = db.prepare('DELETE FROM products WHERE id = ?');
        const result = stmt.run(req.params.id);
        if (result.changes === 0) return res.status(404).json({ error: 'Produto não encontrado' });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/sales
app.post('/api/sales', (req, res) => {
    const { product_id, quantity, total_price, customer_info } = req.body;
    try {
        const stmt = db.prepare(`
            INSERT INTO sales (product_id, quantity, total_price, customer_info)
            VALUES (?, ?, ?, ?)
        `);
        const result = stmt.run(product_id, quantity, total_price, customer_info);
        const newSale = db.prepare('SELECT * FROM sales WHERE id = ?').get(result.lastInsertRowid);
        res.status(201).json(newSale);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/sales
app.get('/api/sales', (req, res) => {
    try {
        const sales = db.prepare(`
            SELECT s.*, p.name as product_name, p.price as product_price
            FROM sales s
            LEFT JOIN products p ON s.product_id = p.id
            ORDER BY s.created_at DESC
        `).all();
        
        // Formatar para bater com o que o front espera: e.products.name
        const formatted = sales.map(s => ({
            ...s,
            products: { name: s.product_name, price: s.product_price }
        }));
        res.json(formatted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Chat AI → OpenRouter API (same provider as troyagent)
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY || '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';
const AI_MODEL = process.env.AI_MODEL || 'meta-llama/llama-3.3-70b-instruct:free';

app.post('/api/chat', (req, res) => {
    const { message, sessionId } = req.body;

    if (!message || typeof message !== 'string' || message.length > 2000) {
        return res.status(400).json({ error: 'Mensagem inválida (max 2000 chars)' });
    }

    const products = db.prepare('SELECT name, brand, price, puffs, flavor, stock, promo FROM products').all();
    const catalog = products.map(p =>
        `${p.name} (${p.brand}) - R$${p.price} | ${p.puffs} puffs | Sabor: ${p.flavor || 'N/A'} | Estoque: ${p.stock}${p.promo ? ' | PROMO' : ''}`
    ).join('\n');

    const systemPrompt = `Você é o Troy AI, assistente virtual da Troy Vape Shop.
Idioma: Português brasileiro. Tom: amigável, casual, entusiasmado com vaping.
Você conhece todos os produtos da loja. Recomende com base em preferências do cliente (sabor, puffs, preço).
Para comprar, direcione ao WhatsApp: https://wa.me/5511999999999
Responda de forma concisa (max 3 parágrafos).

CATÁLOGO ATUAL:
${catalog}`;

    const payload = JSON.stringify({
        model: AI_MODEL,
        stream: true,
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
        ]
    });

    const options = {
        hostname: 'openrouter.ai',
        port: 443,
        path: '/api/v1/chat/completions',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENROUTER_KEY}`,
            'HTTP-Referer': 'https://troyvapes.store',
            'X-Title': 'Troy Vape Shop'
        }
    };

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    const proxyReq = https.request(options, (proxyRes) => {
        proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
        console.error('OpenRouter error:', err.message);
        if (!res.writableEnded) {
            const errChunk = JSON.stringify({ choices: [{ delta: { content: 'Desculpe, estou offline. Fale conosco pelo WhatsApp!' } }] });
            res.write(`data: ${errChunk}\n\n`);
            res.write('data: [DONE]\n\n');
            res.end();
        }
    });

    req.on('close', () => proxyReq.destroy());
    proxyReq.write(payload);
    proxyReq.end();
});

// Servir arquivos estáticos (opcional, mas bom para uploads)
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

app.listen(port, () => {
    console.log(`Express server rodando em http://localhost:${port}`);
});
