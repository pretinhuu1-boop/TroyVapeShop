import Database from 'better-sqlite3';
import fs from 'fs';

const db = new Database('database.db');

try {
    const data = fs.readFileSync('products_to_import.json', 'utf8');
    const products = JSON.parse(data);

    // Limpar tabela
    db.prepare('DELETE FROM products').run();
    console.log('Todos os produtos antigos foram removidos com sucesso.');

    const insert = db.prepare(`
        INSERT INTO products (name, brand, price, puffs, flavor, stock, promo, image)
        VALUES (@name, @brand, @price, @puffs, @flavor, @stock, @promo, @image)
    `);

    const insertMany = db.transaction((prods) => {
        for (const p of prods) {
            insert.run({
                name: p.name,
                brand: p.brand || '',
                price: parseFloat(p.price) || 0,
                puffs: parseInt(p.puffs) || 0,
                flavor: p.flavor || '',
                stock: parseInt(p.stock) || 0,
                promo: p.promo ? 1 : 0,
                image: p.image || 'https://picsum.photos/seed/pod/400/400'
            });
        }
    });

    insertMany(products);
    console.log(`Sucesso! ${products.length} novos produtos foram inseridos.`);
} catch (e) {
    console.error('Erro na importação:', e.message);
}
db.close();
