export const articles = [
  {
    id: 'bpc-157',
    slug: 'bpc-157',
    tag: 'Peptídeos · Mecanismo',
    title: 'Como um fragmento gástrico se tornou o peptídeo mais estudado em reparo tecidual',
    date: '22 Fev 2026',
    readTime: '5 min',
    coverText: 'BPC-157',
    bodyHtml: `
      <p>Entre os peptídeos que circulam na literatura de reparo tecidual, poucos acumulam uma combinação tão peculiar de características quanto o BPC-157. <strong>Isolado originalmente do suco gástrico humano, este pentadecapeptídeo (15 aminoácidos) apresenta uma propriedade que desafia a intuição bioquímica: estabilidade em pH extremamente ácido.</strong></p>
      <p>A história desse composto começa na Croácia, no laboratório de Predrag Sikiric na Universidade de Zagreb, que publicou o primeiro de uma longa série de estudos na década de 1990. Desde então, mais de cem publicações pré-clínicas documentam efeitos em modelos de lesão tendínea, muscular, óssea, vascular, hepática e neurológica.</p>
      <h2>A estabilidade que não deveria existir</h2>
      <p>O suco gástrico humano opera em pH entre 1,5 e 3,5 — um ambiente que desnatura a maioria das proteínas e peptídeos em minutos. A literatura aponta que o BPC-157 mantém conformação funcional nesse ambiente.</p>
      <div class="pullquote">Um peptídeo do suco gástrico que resiste ao suco gástrico. A redundância aparente esconde uma lógica evolutiva.</div>
      <h2>O sistema NO: o fio condutor</h2>
      <p>Se existe um mecanismo que conecta os múltiplos efeitos relatados do BPC-157, a literatura aponta para o sistema do óxido nítrico (NO). <strong>Estudos indicam que o BPC-157 modula a expressão e a atividade dessas isoformas de maneira contexto-dependente.</strong></p>
      <div class="data-callout"><div class="data-callout-label">Dado da literatura</div><div class="data-callout-content">Em modelos de lesão tendínea em ratos, o BPC-157 acelerou a formação de tecido de granulação e a reorganização de fibras colágenas.</div><div class="data-callout-source">Staresinic M, et al., 2006 — J Physiol Pharmacol</div></div>
      <h2>Mais de 100 estudos animais. Zero fase I humana.</h2>
      <p>A assimetria entre o volume de dados pré-clínicos e a ausência de ensaios clínicos formais é talvez o aspecto mais discutido do BPC-157 na comunidade científica.</p>
      <h2>O estado atual da questão</h2>
      <p>O que o BPC-157 oferece, neste estágio, é uma hipótese cientificamente fundamentada: <strong>que o trato gastrointestinal produz peptídeos com funções sistêmicas de reparo tecidual que vão muito além da digestão.</strong></p>
    `,
    sources: [
      'Sikiric P, et al. <em>Stable gastric pentadecapeptide BPC 157: novel therapy in gastrointestinal tract.</em> Curr Pharm Des. 2011;17(16):1612-1632.',
      'Staresinic M, et al. <em>Gastric pentadecapeptide BPC 157 accelerates healing of transected rat Achilles tendon.</em> J Orthop Res. 2003;21(6):976-983.',
      'Seiwerth S, et al. <em>BPC 157 and blood vessels.</em> Curr Pharm Des. 2014;20(7):1121-1125.',
      'Sikiric P, et al. <em>Brain-gut axis and pentadecapeptide BPC 157.</em> Curr Neuropharmacol. 2016;14(8):857-865.',
      'Vukojevic J, et al. <em>Rat inferior caval vein (ICV) ligature and BPC 157.</em> Curr Pharm Des. 2020;26(25):2998-3005.'
    ],
    related: [
      { slug: 'semax', tag: 'Neuro · Curiosidade', title: 'Semax e BDNF: o peptídeo russo que modula fator neurotrófico' },
      { slug: 'tirzepatida', tag: 'Metabólico · Mecanismo', title: 'GIP + GLP-1: a combinação que redefiniu incretinas' }
    ]
  },
  {
    id: 'cjc-ipamorelin', slug: 'cjc-ipamorelin',
    tag: 'Performance · Mecanismo',
    title: 'GH pulsátil: por que o timing importa mais que a quantidade',
    date: '08 Fev 2026', readTime: '7 min', coverText: 'GH PULSÁTIL',
    bodyHtml: '<p>O hormônio do crescimento (GH) não é secretado de forma constante. A hipófise anterior libera GH em <strong>pulsos discretos</strong>, com picos que ocorrem predominantemente durante o sono de ondas lentas e após exercício intenso.</p><h2>A lógica dos secretagogos: restaurar o pulso</h2><p>Em vez de fornecer GH exógeno, a abordagem secretagoga busca estimular a liberação endógena — preservando o padrão pulsátil nativo.</p><div class="pullquote">Dois receptores, dois mecanismos, um objetivo convergente: restaurar a pulsatilidade em vez de substituí-la.</div><h2>Ipamorelin: seletividade como diferencial</h2><p><strong>Ele estimula a liberação de GH sem elevar significativamente cortisol ou prolactina.</strong></p><div class="data-callout"><div class="data-callout-label">Dado da literatura</div><div class="data-callout-content">Ipamorelin demonstrou liberação de GH dose-dependente com elevação mínima de ACTH e cortisol.</div><div class="data-callout-source">Raun et al., 1998 — European Journal of Endocrinology</div></div><h2>A sinergia GHRH + GHS</h2><p>A combinação produz uma <strong>amplificação sinérgica</strong> — a liberação de GH é significativamente maior do que a soma dos efeitos individuais.</p>',
    sources: [
      'Raun K, et al. <em>Ipamorelin, the first selective growth hormone secretagogue.</em> Eur J Endocrinol. 1998;139(5):552-561.',
      'Teichman SL, et al. <em>Prolonged stimulation of growth hormone and IGF-I secretion by CJC-1295.</em> J Clin Endocrinol Metab. 2006;91(3):799-805.',
      'Bowers CY. <em>Growth hormone-releasing peptide (GHRP).</em> Cell Mol Life Sci. 1998;54(12):1316-1329.'
    ],
    related: [
      { slug: 'pt-141', tag: 'Peptídeos · Curiosidade', title: 'PT-141: o único peptídeo aprovado que age via SNC na libido' },
      { slug: 'epithalon', tag: 'Longevidade · Curiosidade', title: 'Epithalon e telomerase: quatro aminoácidos contra o relógio biológico' }
    ]
  },
  {
    id: 'epithalon', slug: 'epithalon',
    tag: 'Longevidade · Curiosidade',
    title: 'Epithalon e telomerase: quatro aminoácidos contra o relógio biológico',
    date: '01 Fev 2026', readTime: '8 min', coverText: 'EPITHALON',
    bodyHtml: '<p>Em 1913, Leonard Hayflick demonstrou que células humanas normais em cultura não se dividem indefinidamente. Décadas depois, a descoberta da telomerase revelou o mecanismo molecular por trás desse relógio. E é nesse contexto que o <strong>Epithalon</strong> entra na literatura.</p><h2>A conexão pineal</h2><p>A glândula pineal produz uma série de peptídeos bioativos cuja função permanece parcialmente caracterizada. Khavinson observou que extratos pineais em modelos animais envelhecidos restauravam parcialmente a produção de melatonina.</p><div class="pullquote">Quatro aminoácidos. Peso molecular de ~390 Da. A simplicidade estrutural do Epithalon contrasta com a complexidade das vias que ele pode influenciar.</div><h2>Ativação de hTERT</h2><p>O principal mecanismo investigado é a <strong>ativação da subunidade catalítica da telomerase humana (hTERT)</strong>.</p><div class="data-callout"><div class="data-callout-label">Dado da literatura</div><div class="data-callout-content">Em fibroblastos humanos, Epithalon foi associado a aumento na atividade de telomerase e extensão de até 44 passagens adicionais.</div><div class="data-callout-source">Khavinson VKh, et al., 2003 — Bull Exp Biol Med</div></div>',
    sources: [
      'Khavinson VKh, et al. <em>Peptide promotes overcoming of the division limit in human somatic cell.</em> Bull Exp Biol Med. 2003;136(6):536-538.',
      'Anisimov VN, Khavinson VKh. <em>Peptide bioregulation of aging.</em> Biogerontology. 2010;11(2):139-149.',
      'Blackburn EH, et al. <em>Telomeres and telomerase.</em> Nat Med. 2006;12(10):1133-1138.'
    ],
    related: [
      { slug: 'mots-c', tag: 'Metabólico · Mecanismo', title: 'MOTS-c: peptídeo do DNA mitocondrial com ação nuclear' },
      { slug: 'cjc-ipamorelin', tag: 'Performance · Mecanismo', title: 'GH pulsátil: timing vs quantidade' }
    ]
  },
  {
    id: 'motsc', slug: 'mots-c',
    tag: 'Longevidade · Metabólico',
    title: 'MOTS-c: o primeiro peptídeo codificado pelo DNA mitocondrial com ação nuclear',
    date: '10 Fev 2026', readTime: '7 min', coverText: 'MOTS-c',
    bodyHtml: '<p>Descoberto em 2015 pelo grupo de Pinchas Cohen na USC, o MOTS-c é codificado pelo gene 12S rRNA mitocondrial. A literatura sugere que ele <strong>transloca ao núcleo sob estresse</strong> e ativa vias AMPK.</p><h2>Um peptídeo mitocondrial com ação nuclear</h2><p>O MOTS-c desafia a visão clássica de que o genoma mitocondrial codifica apenas componentes da cadeia respiratória.</p><h2>Metabolismo e exercício</h2><p>Estudos indicam que o MOTS-c mimetiza parcialmente os efeitos metabólicos do exercício físico via ativação de AMPK.</p>',
    sources: ['Lee C, et al. <em>The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis.</em> Cell Metab. 2015;21(3):443-454.'],
    related: [
      { slug: 'epithalon', tag: 'Longevidade', title: 'Epithalon e telomerase' },
      { slug: 'pp-332', tag: 'Performance', title: 'SLU-PP-332: mimetizando exercício' }
    ]
  },
  {
    id: 'pp332', slug: 'pp-332',
    tag: 'Mecanismos · Performance',
    title: 'SLU-PP-332: o composto que mimetiza exercício físico a nível molecular',
    date: '01 Mar 2026', readTime: '6 min', coverText: 'PP-332',
    bodyHtml: '<p>Um agonista de ERRα, ERRβ e ERRγ que ativa as mesmas vias metabólicas do exercício aeróbico. A literatura aponta <strong>aumento de fibras tipo I e biogênese mitocondrial</strong> em modelos animais.</p><h2>ERR: os receptores do exercício</h2><p>Os receptores ERR (estrogen-related receptors) são reguladores-chave do metabolismo oxidativo.</p><h2>Resultados pré-clínicos</h2><p>Estudos indicam que o PP-332 aumenta a resistência à fadiga e a capacidade aeróbica em camundongos sedentários.</p>',
    sources: ['Kim SH, et al. <em>ERR ligands as exercise mimetics.</em> Nature. 2023.'],
    related: [
      { slug: 'mots-c', tag: 'Metabólico', title: 'MOTS-c: peptídeo mitocondrial' },
      { slug: 'bpc-157', tag: 'Peptídeos', title: 'BPC-157: reparo tecidual' }
    ]
  },
  {
    id: 'pt141', slug: 'pt-141',
    tag: 'Peptídeos · Curiosidade',
    title: 'PT-141: o único peptídeo aprovado que age via sistema nervoso central',
    date: '25 Fev 2026', readTime: '5 min', coverText: 'PT-141',
    bodyHtml: '<p>Derivado do Melanotan II, o PT-141 (bremelanotida) atua no receptor MC4R no hipotálamo. <strong>Diferente de vasodilatadores, seu mecanismo é central</strong> — e isso tem implicações farmacológicas únicas.</p><h2>Melanocortinas e função sexual</h2><p>O sistema melanocortinérgico central modula a excitação sexual através de receptores MC3R e MC4R.</p><h2>Aprovação FDA</h2><p>Em 2019, o PT-141 recebeu aprovação regulatória para HSDD em mulheres pré-menopáusicas sob o nome Vyleesi.</p>',
    sources: [
      'Kingsberg SA, et al. <em>Bremelanotide for HSDD.</em> Obstet Gynecol. 2019;134(5):899-908.',
      'Pfaus JG, et al. <em>Selective facilitation of sexual solicitation by MC receptor agonist.</em> PNAS. 2004;101(27):10201-10204.'
    ],
    related: [
      { slug: 'cjc-ipamorelin', tag: 'Performance', title: 'GH pulsátil: timing importa mais' },
      { slug: 'semax', tag: 'Neuro', title: 'Semax e BDNF' }
    ]
  },
  {
    id: 'retatrutida', slug: 'retatrutida',
    tag: 'Metabólico · Mecanismo',
    title: 'Agonismo triplo: por que três receptores mudam tudo na pesquisa metabólica',
    date: '12 Mar 2026', readTime: '8 min', coverText: 'RETATRUTIDA',
    bodyHtml: '<p>Retatrutida ativa GLP-1, GIP e glucagon simultaneamente — um mecanismo triplo inédito. A literatura sugere que essa combinação pode <strong>superar monoterapias</strong> em modelos pré-clínicos de obesidade.</p><h2>Por que três receptores?</h2><p>A ativação simultânea permite modulação sinérgica do apetite, gasto energético e metabolismo lipídico.</p><h2>Dados clínicos de fase II</h2><p>O estudo TRIUMPH-2 demonstrou redução de até 24,2% no peso corporal em 48 semanas.</p>',
    sources: ['Jastreboff AM, et al. <em>Triple–Hormone-Receptor Agonist Retatrutide for Obesity.</em> NEJM. 2023;389(6):514-526.'],
    related: [
      { slug: 'tirzepatida', tag: 'Metabólico', title: 'Tirzepatida: dual GIP/GLP-1' },
      { slug: 'pp-332', tag: 'Performance', title: 'PP-332: mimetizando exercício' }
    ]
  },
  {
    id: 'semax', slug: 'semax',
    tag: 'Neuro · Mecanismo',
    title: 'Semax e BDNF: o peptídeo russo que modula fator neurotrófico',
    date: '08 Mar 2026', readTime: '6 min', coverText: 'SEMAX',
    bodyHtml: '<p>Desenvolvido na Rússia nos anos 80, o Semax é um dos poucos peptídeos com <strong>aprovação regulatória em algum país</strong>. Sua relação com BDNF é o que atrai pesquisadores ocidentais.</p><h2>ACTH(4-10) e além</h2><p>O Semax é um análogo sintético do fragmento ACTH(4-10), com modificações que aumentam estabilidade e atividade.</p><h2>BDNF: o fator neurotrófico</h2><p>A literatura aponta para modulação dose-dependente da expressão de BDNF em modelos corticais.</p>',
    sources: ['Dolotov OV, et al. <em>Semax, an analogue of ACTH(4-10) with neuroprotective properties.</em> Curr Med Chem. 2006.'],
    related: [
      { slug: 'bpc-157', tag: 'Peptídeos', title: 'BPC-157: reparo tecidual' },
      { slug: 'epithalon', tag: 'Longevidade', title: 'Epithalon e telomerase' }
    ]
  },
  {
    id: 'tirzepatida', slug: 'tirzepatida',
    tag: 'Metabólico · Mecanismo',
    title: 'GIP + GLP-1: a combinação que redefiniu o campo das incretinas',
    date: '10 Mar 2026', readTime: '7 min', coverText: 'TIRZEPATIDA',
    bodyHtml: '<p>Tirzepatida é o primeiro agonista duplo GIP/GLP-1. A literatura aponta que a adição do receptor GIP pode explicar por que os resultados metabólicos <strong>superam monoterapias com GLP-1 isolado</strong>.</p><h2>Dual agonismo</h2><p>A combinação GIP + GLP-1 oferece modulação sinérgica de insulina, apetite e metabolismo lipídico.</p><h2>SURPASS: dados clínicos</h2><p>O programa SURPASS demonstrou reduções de HbA1c de até 2,46% e peso de até 12,4 kg vs semaglutida.</p>',
    sources: ['Frías JP, et al. <em>Tirzepatide versus Semaglutide.</em> NEJM. 2021;385(6):503-515.'],
    related: [
      { slug: 'retatrutida', tag: 'Metabólico', title: 'Retatrutida: agonismo triplo' },
      { slug: 'mots-c', tag: 'Metabólico', title: 'MOTS-c: peptídeo mitocondrial' }
    ]
  }
  ,
  {
    id: 'peptideos-sinteticos-vs-naturais',
    slug: 'peptideos-sinteticos-vs-naturais',
    tag: 'Peptídeos · Bioquímica',
    title: 'Peptídeos sintéticos vs naturais: estabilidade, pureza e biodisponibilidade',
    date: '11 Mar 2026',
    readTime: '7 min',
    coverText: 'SINTÉTICOS VS NATURAIS',
    bodyHtml: `
      <p>A distinção entre peptídeos sintéticos e naturais é mais do que semântica — ela define estabilidade, reprodutibilidade e viabilidade em pesquisa. <strong>Peptídeos endógenos evoluíram sob pressão seletiva para funcionar em contextos biológicos específicos, não para sobreviver em bancada.</strong> Peptídeos sintéticos, por outro lado, são desenhados com modificações que priorizam estabilidade e pureza analítica.</p>
      <p>A síntese em fase sólida (SPPS), desenvolvida por Bruce Merrifield nos anos 1960 — trabalho que lhe rendeu o Nobel de Química em 1984 — revolucionou a produção de peptídeos. O método permite a montagem sequencial de aminoácidos sobre um suporte polimérico insolúvel, com controle preciso de cada etapa de acoplamento e desprotecção.</p>
      <h2>Estabilidade: o calcanhar de Aquiles dos peptídeos naturais</h2>
      <p>Peptídeos endógenos são rapidamente degradados por peptidases circulantes. A meia-vida plasmática de muitos peptídeos naturais é da ordem de minutos. <strong>Modificações como ciclização, incorporação de D-aminoácidos, PEGilação e adição de ácidos graxos</strong> são estratégias para contornar essa limitação. A tirzepatida, por exemplo, utiliza um ácido graxo C20 para ligação à albumina, estendendo a meia-vida para aproximadamente 5 dias.</p>
      <div class="pullquote">Um peptídeo natural é otimizado pela evolução para funcionar in vivo por minutos. Um peptídeo sintético é otimizado pelo químico para funcionar em pesquisa por dias.</div>
      <h2>Pureza e reprodutibilidade</h2>
      <p>A pureza de um peptídeo sintético, medida por HPLC, determina a fração do material que corresponde à sequência-alvo. Pureza de 95% significa que 5% do material pode consistir em deleções, truncações, racemizações ou subprodutos de acoplamento incompleto. Para pesquisa de alta qualidade, purezas acima de 98% são consideradas padrão. A reprodutibilidade lote-a-lote é uma vantagem decisiva sobre extratos biológicos.</p>
      <div class="data-callout"><div class="data-callout-label">Dado da literatura</div><div class="data-callout-content">A síntese em fase sólida moderna atinge rendimentos de acoplamento superiores a 99,5% por resíduo, permitindo a produção de peptídeos de até 50 aminoácidos com pureza final acima de 95% após purificação por HPLC preparativa.</div><div class="data-callout-source">Merrifield RB, 1963 — J Am Chem Soc; Coin et al., 2007 — Nat Protoc</div></div>
      <h2>Biodisponibilidade: o desafio da entrega</h2>
      <p>Independentemente da origem, a biodisponibilidade oral de peptídeos é tipicamente inferior a 2%, devido à degradação enzimática gastrointestinal e à baixa permeabilidade intestinal. O BPC-157 é uma exceção notável na literatura, com relatos de atividade por via oral — atribuída à sua estabilidade em pH ácido. A via subcutânea permanece o padrão para a maioria dos peptídeos de pesquisa, com biodisponibilidade de 65-90%.</p>
      <p>A escolha entre peptídeo sintético e natural não é uma questão de superioridade absoluta, mas de adequação ao objetivo experimental. <strong>Para pesquisa que exige reprodutibilidade, pureza definida e estabilidade controlada, a síntese química é o padrão-ouro.</strong></p>
    `,
    sources: [
      'Merrifield RB. <em>Solid phase peptide synthesis. I. The synthesis of a tetrapeptide.</em> J Am Chem Soc. 1963;85(14):2149-2154.',
      'Coin I, Beyermann M, Bienert M. <em>Solid-phase peptide synthesis: from standard procedures to the synthesis of difficult sequences.</em> Nat Protoc. 2007;2(12):3247-3256.',
      'Lau JL, Dunn MK. <em>Therapeutic peptides: historical perspectives, current development trends, and future directions.</em> Bioorg Med Chem. 2018;26(10):2700-2707.',
      'Fosgerau K, Hoffmann T. <em>Peptide therapeutics: current status and future directions.</em> Drug Discov Today. 2015;20(1):122-128.'
    ],
    related: [
      { slug: 'hplc-pureza-peptideos', tag: 'Peptídeos · Análise', title: 'HPLC e pureza peptídica: como interpretar um certificado de análise' },
      { slug: 'via-subcutanea-farmacocinetica', tag: 'Peptídeos · Farmacocinética', title: 'Via subcutânea: farmacocinética e absorção de peptídeos' }
    ]
  },
  {
    id: 'hplc-pureza-peptideos',
    slug: 'hplc-pureza-peptideos',
    tag: 'Peptídeos · Análise',
    title: 'HPLC e pureza peptídica: como interpretar um certificado de análise',
    date: '09 Mar 2026',
    readTime: '6 min',
    coverText: 'HPLC & PUREZA',
    bodyHtml: `
      <p>A cromatografia líquida de alta eficiência (HPLC) é o método analítico padrão para determinação de pureza peptídica. <strong>Quando um certificado de análise (COA) indica pureza de 98,5%, esse número reflete a área percentual do pico principal no cromatograma — não uma medida absoluta de conteúdo peptídico.</strong></p>
      <p>Compreender o que um COA comunica — e o que ele omite — é essencial para avaliar a qualidade de um peptídeo de pesquisa. A diferença entre um lote de 95% e um de 99% pode parecer marginal numericamente, mas traduz-se em diferenças significativas na quantidade de impurezas presentes.</p>
      <h2>O princípio da separação cromatográfica</h2>
      <p>Na HPLC de fase reversa (RP-HPLC), a técnica mais utilizada para peptídeos, a separação baseia-se na hidrofobicidade diferencial dos componentes. A amostra é dissolvida e injetada numa coluna C18 (octadecilsilano), onde o peptídeo-alvo e suas impurezas interagem com a fase estacionária apolar. Um gradiente de solvente orgânico (tipicamente acetonitrila) elui os componentes em ordem crescente de hidrofobicidade. O detector UV a 214-220 nm registra a absorção da ligação peptídica.</p>
      <div class="pullquote">Pureza HPLC de 98% não significa que 2% do frasco é lixo. Significa que 2% da área cromatográfica corresponde a picos que não são o peptídeo-alvo — e a natureza dessas impurezas importa.</div>
      <h2>O que as impurezas dizem</h2>
      <p>As impurezas típicas em síntese peptídica incluem: <strong>sequências truncadas</strong> (falhas de acoplamento), <strong>sequências deletadas</strong> (falhas de desprotecção), <strong>racemizações</strong> (inversão de quiralidade em aminoácidos), e <strong>produtos de oxidação</strong> (particularmente em peptídeos contendo metionina ou triptofano). Um perfil cromatográfico com muitos picos menores sugere problemas na síntese; um pico principal com ombro sugere isômeros ou conformações múltiplas.</p>
      <div class="data-callout"><div class="data-callout-label">Dado da literatura</div><div class="data-callout-content">Estudos de validação analítica demonstram que a variabilidade inter-laboratorial na determinação de pureza por RP-HPLC pode atingir 2-3%, dependendo das condições cromatográficas (coluna, gradiente, temperatura). A padronização do método é crítica para comparabilidade entre lotes e fornecedores.</div><div class="data-callout-source">Ewing et al., 2020 — J Pharm Biomed Anal; USP <799></div></div>
      <h2>Além da HPLC: espectrometria de massa</h2>
      <p>A HPLC determina pureza, mas não confirma identidade. Para isso, a espectrometria de massa (MS) é indispensável. A combinação LC-MS permite confirmar que o pico principal corresponde à massa molecular esperada do peptídeo-alvo. <strong>Um COA completo deve incluir tanto o cromatograma HPLC quanto o espectro de massa.</strong></p>
      <p>Ao avaliar um peptídeo de pesquisa, a pureza HPLC é o ponto de partida, não o ponto final. O contexto do COA — método utilizado, condições cromatográficas, data da análise, e confirmação por MS — é o que transforma um número em informação utilizável.</p>
    `,
    sources: [
      'Ewing MA, et al. <em>Analytical characterization of therapeutic peptides.</em> J Pharm Biomed Anal. 2020;185:113234.',
      'USP General Chapter <799>. <em>Pharmaceutical Compounding — Sterile Preparations.</em> United States Pharmacopeia.',
      'Verbeke R, et al. <em>Analytical strategies for the characterization of therapeutic peptides.</em> TrAC Trends Anal Chem. 2019;118:647-666.',
      'Sarin VK, et al. <em>Quantitative monitoring of solid-phase peptide synthesis by the ninhydrin reaction.</em> Anal Biochem. 1981;117(1):147-157.'
    ],
    related: [
      { slug: 'peptideos-sinteticos-vs-naturais', tag: 'Peptídeos · Bioquímica', title: 'Peptídeos sintéticos vs naturais: estabilidade, pureza e biodisponibilidade' },
      { slug: 'bpc-157', tag: 'Peptídeos · Mecanismo', title: 'BPC-157: reparo tecidual e o sistema NO' }
    ]
  },
  {
    id: 'via-subcutanea-farmacocinetica',
    slug: 'via-subcutanea-farmacocinetica',
    tag: 'Peptídeos · Farmacocinética',
    title: 'Via subcutânea: farmacocinética e absorção de peptídeos',
    date: '07 Mar 2026',
    readTime: '6 min',
    coverText: 'VIA SUBCUTÂNEA',
    bodyHtml: `
      <p>A administração subcutânea (SC) é a via predominante para peptídeos de pesquisa, e há razões farmacocinéticas sólidas para isso. <strong>A biodisponibilidade SC de peptídeos tipicamente varia entre 65% e 90%, comparada a menos de 2% por via oral.</strong> Essa diferença de uma a duas ordens de magnitude define a viabilidade prática da maioria dos protocolos de investigação.</p>
      <p>O tecido subcutâneo — a camada de tecido conjuntivo frouxo e adiposo abaixo da derme — oferece um ambiente relativamente protegido de peptidases e um fluxo sanguíneo moderado que permite absorção gradual. Essa combinação resulta em perfis farmacocinéticos com Tmax (tempo até concentração máxima) tipicamente entre 30 minutos e 4 horas, dependendo do peso molecular e das propriedades físico-químicas do peptídeo.</p>
      <h2>Fatores que determinam a absorção SC</h2>
      <p>O peso molecular é o principal determinante da via de absorção após injeção SC. <strong>Peptídeos com peso molecular abaixo de ~16 kDa são absorvidos predominantemente por difusão para capilares sanguíneos.</strong> Moléculas maiores dependem mais de drenagem linfática, que é mais lenta e resulta em Tmax mais tardio. A maioria dos peptídeos de pesquisa (BPC-157, Semax, Ipamorelin, Epithalon) possui peso molecular abaixo de 5 kDa, favorecendo absorção vascular direta.</p>
      <div class="pullquote">A via subcutânea não é uma escolha arbitrária — é um compromisso farmacocinético entre proteção contra degradação, velocidade de absorção e praticidade de administração.</div>
      <h2>O papel do local de injeção</h2>
      <p>A literatura documenta que o local de injeção SC influencia a taxa de absorção. A região abdominal apresenta absorção mais rápida que a coxa, que por sua vez é mais rápida que o braço. Essas diferenças são atribuídas à vascularização e espessura variáveis do tecido subcutâneo. Para insulina, a diferença de Tmax entre abdômen e coxa pode atingir 50% — um efeito provavelmente extrapolável a outros peptídeos de peso molecular similar.</p>
      <div class="data-callout"><div class="data-callout-label">Dado da literatura</div><div class="data-callout-content">Estudos farmacocinéticos com peptídeos terapêuticos demonstram que a biodisponibilidade SC é inversamente correlacionada com o peso molecular e diretamente correlacionada com a hidrofobicidade, com valores típicos de 65-90% para peptídeos abaixo de 5 kDa.</div><div class="data-callout-source">Richter WF, et al., 2012 — AAPS J; Kagan L, 2014 — J Pharm Sci</div></div>
      <h2>Reconstituição e estabilidade pós-reconstitução</h2>
      <p>Peptídeos liofilizados requerem reconstituição antes da administração SC. O solvente padrão é água bacteriostática (contendo 0,9% de álcool benzílico como conservante). <strong>Após reconstituição, a maioria dos peptídeos mantém estabilidade entre 2-8°C por 14-28 dias</strong>, embora a cinética de degradação varie significativamente entre sequências. Peptídeos contendo metionina (como MOTS-c) são particularmente suscetíveis a oxidação em solução.</p>
      <p>A compreensão da farmacocinética SC é fundamental para o desenho de protocolos de pesquisa reprodutíveis. Variáveis como local de injeção, volume, concentração e temperatura da solução podem influenciar a absorção e devem ser padronizadas.</p>
    `,
    sources: [
      'Richter WF, Bhansali SG, Morris ME. <em>Mechanistic determinants of biotherapeutics absorption following SC administration.</em> AAPS J. 2012;14(3):559-570.',
      'Kagan L. <em>Pharmacokinetic modeling of the subcutaneous absorption of therapeutic proteins.</em> Drug Metab Dispos. 2014;42(11):1890-1905.',
      'Bittner B, et al. <em>Subcutaneous administration of biotherapeutics: an overview of current challenges and opportunities.</em> BioDrugs. 2018;32(5):425-440.',
      'Turner MR, Balu-Iyer SV. <em>Challenges and opportunities for the subcutaneous delivery of therapeutic proteins.</em> J Pharm Sci. 2018;107(5):1247-1260.'
    ],
    related: [
      { slug: 'peptideos-sinteticos-vs-naturais', tag: 'Peptídeos · Bioquímica', title: 'Peptídeos sintéticos vs naturais: estabilidade e biodisponibilidade' },
      { slug: 'hplc-pureza-peptideos', tag: 'Peptídeos · Análise', title: 'HPLC e pureza peptídica: como interpretar um COA' }
    ]
  },
  {
    id: 'sarms-receptores-androgenicos',
    slug: 'sarms-receptores-androgenicos',
    tag: 'SARMs · Mecanismo',
    title: 'SARMs e receptores androgênicos: seletividade tecidual explicada',
    date: '04 Mar 2026',
    readTime: '8 min',
    coverText: 'SARMs & AR',
    bodyHtml: `
      <p>Os moduladores seletivos de receptores androgênicos (SARMs) representam uma abordagem farmacológica que busca separar os efeitos anabólicos dos androgênicos. <strong>A testosterona ativa o receptor androgênico (AR) de forma indiscriminada em todos os tecidos — músculo, osso, próstata, pele, fígado.</strong> Os SARMs, em tese, ativam o mesmo receptor mas com consequências transcripcionais diferentes dependendo do tecido.</p>
      <p>O conceito de seletividade tecidual não é novo na farmacologia de receptores nucleares. Os SERMs (moduladores seletivos de receptores estrogênicos), como o tamoxifeno, demonstraram que um mesmo receptor pode ser ativado ou inibido dependendo do contexto celular. Os SARMs aplicam essa mesma lógica ao receptor androgênico.</p>
      <h2>O receptor androgênico: um fator de transcrição ligante-dependente</h2>
      <p>O AR é um receptor nuclear da superfamília de receptores esteroides. Na ausência de ligante, permanece no citoplasma associado a proteínas chaperonas (HSP90, HSP70). <strong>A ligação do androgênio induz mudança conformacional, dissociação de chaperonas, dimerização, translocação nuclear e ligação a elementos de resposta androgênica (AREs) no DNA.</strong> O recrutamento subsequente de coativadores ou correpressores determina o output transcricional.</p>
      <div class="pullquote">A seletividade dos SARMs não está na ligação ao receptor — está no que acontece depois. A conformação induzida determina quais correguladores são recrutados, e isso varia entre tecidos.</div>
      <h2>O mecanismo da seletividade</h2>
      <p>A literatura aponta para pelo menos três mecanismos que contribuem para a seletividade tecidual dos SARMs. Primeiro, a <strong>conformação específica do AR induzida pelo SARM</strong> difere daquela induzida pela testosterona ou DHT, alterando a superfície de interação com correguladores. Segundo, a <strong>expressão diferencial de correguladores entre tecidos</strong> significa que a mesma conformação do AR recruta diferentes complexos transcricionais em músculo vs próstata. Terceiro, os SARMs não-esteroidais <strong>não são substratos para a 5α-redutase</strong>, eliminando a amplificação local que ocorre na próstata com androgênios convencionais.</p>
      <div class="data-callout"><div class="data-callout-label">Dado da literatura</div><div class="data-callout-content">Estudos com Ostarine (MK-2866) em modelos animais demonstraram aumento de massa muscular com índice de seletividade músculo/próstata de aproximadamente 10:1, comparado a 1:1 para testosterona. Isso significa que o efeito anabólico muscular ocorreu com um décimo do efeito prostático.</div><div class="data-callout-source">Narayanan R, et al., 2008 — Nucl Recept Signal; Dalton et al., 2011 — J Cachexia Sarcopenia Muscle</div></div>
      <h2>Limitações e estado atual</h2>
      <p>A seletividade tecidual dos SARMs, embora demonstrada em modelos pré-clínicos, não é absoluta. Em doses elevadas, a separação entre efeitos anabólicos e androgênicos diminui. Além disso, a supressão do eixo HPG (hipotálamo-hipófise-gonadal) ocorre com SARMs, embora tipicamente em menor grau que com esteroides anabolizantes. <strong>Nenhum SARM foi aprovado por agência regulatória para uso terapêutico até o momento</strong>, embora vários tenham progredido a ensaios clínicos de fase II e III.</p>
    `,
    sources: [
      'Narayanan R, Mohler ML, Bohl CE, et al. <em>Selective androgen receptor modulators in preclinical and clinical development.</em> Nucl Recept Signal. 2008;6:e010.',
      'Dalton JT, et al. <em>The selective androgen receptor modulator GTx-024 (enobosarm) improves lean body mass and physical function in healthy elderly men and postmenopausal women.</em> J Cachexia Sarcopenia Muscle. 2011;2(3):153-161.',
      'Gao W, Dalton JT. <em>Expanding the therapeutic use of androgens via selective androgen receptor modulators (SARMs).</em> Drug Discov Today. 2007;12(5-6):241-248.',
      'Bhasin S, et al. <em>Selective androgen receptor modulators as function promoting therapies.</em> Curr Opin Clin Nutr Metab Care. 2009;12(3):232-240.'
    ],
    related: [
      { slug: 'sarms-vs-esteroides', tag: 'SARMs · Comparativo', title: 'SARMs vs esteroides anabolizantes: seletividade tecidual e perfil de efeitos' },
      { slug: 'ostarine-mk2866-literatura', tag: 'SARMs · Literatura', title: 'Ostarine (MK-2866): o que a literatura clínica realmente demonstra' }
    ]
  },
  {
    id: 'sarms-vs-esteroides',
    slug: 'sarms-vs-esteroides',
    tag: 'SARMs · Comparativo',
    title: 'SARMs vs esteroides anabolizantes: seletividade tecidual e perfil de efeitos',
    date: '02 Mar 2026',
    readTime: '7 min',
    coverText: 'SARMs VS ESTEROIDES',
    bodyHtml: `
      <p>A comparação entre SARMs e esteroides anabolizantes androgênicos (EAA) é frequente na literatura de fisiologia muscular, mas raramente abordada com o rigor que a farmacologia exige. <strong>A diferença fundamental não está na potência anabólica — está na seletividade tecidual e no perfil de efeitos sistêmicos.</strong></p>
      <p>Esteroides anabolizantes são derivados da testosterona que ativam o receptor androgênico em todos os tecidos-alvo. Apesar de décadas de modificações químicas (17α-alquilação, esterificação, modificações do anel), nenhum esteroide conseguiu separar completamente os efeitos anabólicos (músculo, osso) dos androgênicos (próstata, pele, folículos capilares) e dos efeitos adversos sistêmicos (lipídios, fígado, eixo HPG).</p>
      <h2>Seletividade tecidual: o diferencial farmacológico</h2>
      <p>Os SARMs não-esteroidais (como Ostarine, LGD-4033 e RAD-140) apresentam estrutura química distinta dos esteroides. <strong>Eles não são substratos para a 5α-redutase nem para a aromatase</strong>, duas enzimas que amplificam efeitos androgênicos e estrogênicos respectivamente. A 5α-redutase converte testosterona em DHT (di-hidrotestosterona) na próstata, pele e folículos — uma amplificação de até 10x na potência androgênica local que simplesmente não ocorre com SARMs.</p>
      <div class="pullquote">O problema dos esteroides nunca foi a falta de potência anabólica — foi a impossibilidade de limitar seus efeitos aos tecidos desejados. Os SARMs são a tentativa farmacológica de resolver essa equação.</div>
      <h2>Perfil de efeitos adversos comparados</h2>
      <p>A literatura pré-clínica e os dados clínicos limitados disponíveis sugerem diferenças relevantes no perfil de segurança. Esteroides anabolizantes causam supressão profunda do eixo HPG, alterações lipídicas marcantes (redução de HDL de 40-70%), hepatotoxicidade (formas 17α-alquiladas), eritrocitose, acne e alopecia. SARMs em doses terapêuticas demonstram supressão do eixo HPG dose-dependente mas tipicamente reversível, alterações lipídicas moderadas (redução de HDL de 15-30%), e efeitos androgênicos periféricos mínimos.</p>
      <div class="data-callout"><div class="data-callout-label">Dado da literatura</div><div class="data-callout-content">No ensaio clínico de fase II com Ostarine em pacientes com caquexia oncológica, doses de 1mg e 3mg produziram ganho de massa magra dose-dependente com alterações de HDL de -8% e -15% respectivamente — comparado a reduções de 40-70% tipicamente reportadas com EAA em doses anabólicas.</div><div class="data-callout-source">Dobs AS, et al., 2013 — Lancet Oncol; Hartgens & Kuipers, 2004 — Sports Med</div></div>
      <h2>O que a comparação realmente mostra</h2>
      <p>A comparação direta entre SARMs e EAA em termos de potência anabólica pura tende a favorecer os esteroides — particularmente testosterona e nandrolona em doses suprafisiológicas. Porém, essa comparação ignora o ponto central: <strong>os SARMs não foram desenvolvidos para substituir esteroides em contextos de maximização de hipertrofia, mas para oferecer um perfil benefício/risco favorável em indicações clínicas como sarcopenia, osteoporose e caquexia.</strong></p>
      <p>A evolução da classe dependerá de dados clínicos de fase III robustos que demonstrem eficácia em endpoints clinicamente relevantes com perfil de segurança aceitável para uso crônico — um limiar que os esteroides anabolizantes nunca conseguiram atingir em indicações metabólicas.</p>
    `,
    sources: [
      'Dobs AS, et al. <em>Effects of enobosarm on muscle wasting and physical function in patients with cancer: a double-blind, randomised controlled phase 2 trial.</em> Lancet Oncol. 2013;14(4):335-345.',
      'Hartgens F, Kuipers H. <em>Effects of androgenic-anabolic steroids in athletes.</em> Sports Med. 2004;34(8):513-554.',
      'Narayanan R, et al. <em>Selective androgen receptor modulators (SARMs) as function promoting therapies.</em> Curr Opin Clin Nutr Metab Care. 2009;12(3):232-240.',
      'Solomon ZJ, et al. <em>Selective androgen receptor modulators: current knowledge and clinical applications.</em> Sex Med Rev. 2019;7(1):84-94.'
    ],
    related: [
      { slug: 'sarms-receptores-androgenicos', tag: 'SARMs · Mecanismo', title: 'SARMs e receptores androgênicos: seletividade tecidual explicada' },
      { slug: 'ostarine-mk2866-literatura', tag: 'SARMs · Literatura', title: 'Ostarine (MK-2866): o que a literatura clínica demonstra' }
    ]
  },
  {
    id: 'ostarine-mk2866-literatura',
    slug: 'ostarine-mk2866-literatura',
    tag: 'SARMs · Literatura',
    title: 'Ostarine (MK-2866): o que a literatura clínica realmente demonstra',
    date: '28 Fev 2026',
    readTime: '8 min',
    coverText: 'OSTARINE MK-2866',
    bodyHtml: `
      <p>Ostarine (MK-2866, enobosarm) é o SARM não-esteroidal com maior volume de dados clínicos publicados. <strong>Desenvolvido pela GTx Inc. (agora Oncternal Therapeutics), foi avaliado em ensaios clínicos de fase I, II e III em indicações que incluem caquexia oncológica, sarcopenia e incontinência urinária por estresse.</strong></p>
      <p>A molécula pertence à classe dos arilpropionamidas, com afinidade pelo receptor androgênico (AR) comparável à da di-hidrotestosterona (DHT), mas com seletividade tecidual demonstrada em modelos pré-clínicos. A literatura acumulada ao longo de mais de uma década de investigação clínica permite uma avaliação mais fundamentada do potencial e das limitações da classe.</p>
      <h2>Dados de fase II: caquexia oncológica</h2>
      <p>O estudo pivotal de fase II (Dobs et al., 2013, Lancet Oncology) avaliou 159 pacientes com câncer de pulmão de não-pequenas células em estágio III-IV apresentando perda de massa muscular. Os participantes foram randomizados para Ostarine 1mg, 3mg ou placebo por 113 dias. <strong>O grupo de 3mg apresentou ganho médio de 1,5 kg de massa magra</strong> (avaliada por DXA), com melhora em testes funcionais como subida de escadas e velocidade de marcha.</p>
      <div class="pullquote">Ostarine não é o SARM mais potente em termos anabólicos — mas é o mais estudado clinicamente. E na farmacologia, dados em humanos valem mais que potência em ratos.</div>
      <h2>Ensaios de fase III: resultados mistos</h2>
      <p>Os ensaios POWER 1 e POWER 2 (fase III) avaliaram Ostarine em pacientes com caquexia oncológica, usando endpoints coprimários de massa magra (DXA) e função física (teste de subida de escadas). <strong>Embora os endpoints de massa magra tenham sido atingidos, os endpoints funcionais não alcançaram significância estatística em ambos os estudos.</strong> Esta dissociação entre massa e função levantou questões sobre a tradução clínica dos ganhos anabólicos observados.</p>
      <div class="data-callout"><div class="data-callout-label">Dado da literatura</div><div class="data-callout-content">Nos ensaios POWER, Ostarine 3mg por 5 meses produziu ganho de massa magra de +1,2-1,5 kg vs placebo (p<0,001), com redução de HDL de aproximadamente 15% e sem alterações significativas em PSA, enzimas hepáticas ou hemoglobina nas doses avaliadas.</div><div class="data-callout-source">Crawford J, et al., 2016 — Ann Oncol</div></div>
      <h2>Farmacocinética e perfil de segurança</h2>
      <p>A meia-vida de Ostarine é de aproximadamente 24 horas, permitindo administração oral uma vez ao dia. A biodisponibilidade oral é elevada (~95%), o que o distingue da maioria dos peptídeos. O perfil de segurança nos ensaios clínicos mostrou supressão dose-dependente e reversível de testosterona total e SHBG, sem efeitos clinicamente significativos em marcadores prostáticos (PSA) ou hepáticos. A redução de HDL-colesterol foi o efeito adverso metabólico mais consistente.</p>
      <p>O legado de Ostarine na literatura é duplo: <strong>demonstrou que SARMs podem produzir efeitos anabólicos mensuráveis em humanos com perfil de segurança aceitável, mas também expôs a dificuldade de traduzir ganhos de massa em benefícios funcionais clinicamente significativos</strong> — um desafio que não é exclusivo dos SARMs, mas que define o limiar regulatório para aprovação.</p>
    `,
    sources: [
      'Dobs AS, et al. <em>Effects of enobosarm on muscle wasting and physical function in patients with cancer.</em> Lancet Oncol. 2013;14(4):335-345.',
      'Crawford J, et al. <em>Study design and rationale for the phase 3 clinical development program of enobosarm, a selective androgen receptor modulator, for the prevention and treatment of muscle wasting in cancer patients.</em> Curr Oncol Rep. 2016;18(6):37.',
      'Dalton JT, et al. <em>The selective androgen receptor modulator GTx-024 (enobosarm) improves lean body mass and physical function in healthy elderly men and postmenopausal women.</em> J Cachexia Sarcopenia Muscle. 2011;2(3):153-161.',
      'Narayanan R, et al. <em>Development of selective androgen receptor modulators (SARMs).</em> Mol Cell Endocrinol. 2018;465:134-142.'
    ],
    related: [
      { slug: 'sarms-receptores-androgenicos', tag: 'SARMs · Mecanismo', title: 'SARMs e receptores androgênicos: seletividade tecidual' },
      { slug: 'sarms-vs-esteroides', tag: 'SARMs · Comparativo', title: 'SARMs vs esteroides: seletividade e perfil de efeitos' }
    ]
  },
  {
    id: 'nootropicos-mecanismos-cognicao',
    slug: 'nootropicos-mecanismos-cognicao',
    tag: 'Nootrópicos · Mecanismo',
    title: 'Nootrópicos e cognição: vias colinérgicas, glutamatérgicas e neurotróficas',
    date: '26 Fev 2026',
    readTime: '8 min',
    coverText: 'NOOTRÓPICOS',
    bodyHtml: `
      <p>O termo "nootrópico" foi cunhado por Corneliu Giurgea em 1972 para descrever compostos que melhoram a cognição sem efeitos sedativos ou estimulantes significativos. <strong>Quatro décadas depois, a literatura reconhece pelo menos três grandes eixos farmacológicos por trás da modulação cognitiva: o colinérgico, o glutamatérgico e o neurotrófico.</strong></p>
      <p>Cada eixo opera em escala temporal distinta. A modulação colinérgica produz efeitos agudos sobre atenção e memória de trabalho. A modulação glutamatérgica influencia plasticidade sináptica em escala de horas a dias. A modulação neurotrófica, por sua vez, opera em escala de semanas, promovendo crescimento dendrítico, sinaptogênese e, potencialmente, neurogênese adulta.</p>
      <h2>O eixo colinérgico: atenção e memória de trabalho</h2>
      <p>A acetilcolina (ACh) é o neurotransmissor central na modulação da atenção e da memória de trabalho. O sistema colinérgico do prosencéfalo basal (núcleo basal de Meynert) projeta para todo o córtex e é o primeiro a degenerar na doença de Alzheimer. <strong>Inibidores de acetilcolinesterase (donepezil, rivastigmina) e precursores colinérgicos (alfa-GPC, citicolina) são as estratégias farmacológicas mais estabelecidas neste eixo.</strong></p>
      <div class="pullquote">Os três eixos da cognição operam em escalas temporais diferentes: a acetilcolina modula a atenção em minutos, o glutamato molda sinapses em horas, e os fatores neurotróficos remodelam circuitos em semanas.</div>
      <h2>O eixo glutamatérgico: plasticidade sináptica</h2>
      <p>O glutamato é o principal neurotransmissor excitatório do SNC e o mediador central da potenciação de longa duração (LTP), o substrato celular da memória. Os receptores AMPA e NMDA são os principais alvos. <strong>Os racetams (piracetam, aniracetam, oxiracetam) atuam como moduladores alostéricos positivos do receptor AMPA</strong>, facilitando a corrente iônica sem ativar o receptor diretamente — um mecanismo que amplifica o sinal glutamatérgico existente sem risco de excitotoxicidade.</p>
      <div class="data-callout"><div class="data-callout-label">Dado da literatura</div><div class="data-callout-content">Uma meta-análise de 19 ensaios clínicos com piracetam em declínio cognitivo demonstrou efeito global superior ao placebo (odds ratio 3,35, IC 95% 2,70-4,17), embora com heterogeneidade significativa entre estudos e limitações metodológicas em vários dos ensaios incluídos.</div><div class="data-callout-source">Waegemans T, et al., 2002 — Dement Geriatr Cogn Disord</div></div>
      <h2>O eixo neurotrófico: remodelamento estrutural</h2>
      <p>O BDNF (fator neurotrófico derivado do cérebro) e o NGF (fator de crescimento nervoso) são as neurotrofinas mais relevantes para cognição. O BDNF promove sobrevivência neuronal, crescimento dendrítico e sinaptogênese, sendo considerado a molécula que conecta exercício físico a benefícios cognitivos. <strong>Compostos como Semax, que modula a expressão de BDNF no hipocampo, e o 7,8-DHF, um agonista de TrkB, representam abordagens farmacológicas neste eixo.</strong></p>
      <p>A convergência desses três eixos sugere que a cognição não é modulada por um único neurotransmissor, mas por uma rede integrada de sinais que operam em diferentes escalas. Estratégias que combinam modulação colinérgica aguda com suporte neurotrófico crônico são investigadas na literatura como abordagens multimodais.</p>
    `,
    sources: [
      'Giurgea C. <em>The "nootropic" approach to the pharmacology of the integrative activity of the brain.</em> Cond Reflex. 1973;8(2):108-115.',
      'Waegemans T, et al. <em>Clinical efficacy of piracetam in cognitive impairment: a meta-analysis.</em> Dement Geriatr Cogn Disord. 2002;13(4):217-224.',
      'Malykh AG, Sadaie MR. <em>Piracetam and piracetam-like drugs: from basic science to novel clinical applications.</em> Drugs. 2010;70(3):287-312.',
      'Lu B, et al. <em>BDNF-based synaptic repair as a disease-modifying strategy for neurodegenerative diseases.</em> Nat Rev Neurosci. 2013;14(6):401-416.',
      'Hasselmo ME, Sarter M. <em>Modes and models of forebrain cholinergic neuromodulation of cognition.</em> Neuropsychopharmacology. 2011;36(1):52-73.'
    ],
    related: [
      { slug: 'bdnf-plasticidade-sinaptica', tag: 'Nootrópicos · Neurociência', title: 'BDNF e plasticidade sináptica: exercício, cognição e neurogênese' },
      { slug: 'nootropicos-peptidicos-vs-sinteticos', tag: 'Nootrópicos · Comparativo', title: 'Nootrópicos peptídicos vs sintéticos: Semax, Selank e racetams' }
    ]
  },
  {
    id: 'bdnf-plasticidade-sinaptica',
    slug: 'bdnf-plasticidade-sinaptica',
    tag: 'Nootrópicos · Neurociência',
    title: 'BDNF e plasticidade sináptica: o fator que conecta exercício, cognição e neurogênese',
    date: '22 Fev 2026',
    readTime: '7 min',
    coverText: 'BDNF',
    bodyHtml: `
      <p>O fator neurotrófico derivado do cérebro (BDNF) é uma proteína de 247 aminoácidos que pertence à família das neurotrofinas. <strong>Identificado em 1982 por Yves-Alain Barde e Hans Thoenen, o BDNF é hoje reconhecido como a neurotrofina mais relevante para plasticidade sináptica, aprendizado e memória no cérebro adulto.</strong></p>
      <p>O BDNF não é simplesmente mais um fator de crescimento — é a molécula que traduz atividade neuronal em mudança estrutural. Quando um circuito neural é ativado repetidamente (como ocorre durante aprendizado), o BDNF é liberado nos terminais sinápticos e induz as alterações moleculares e estruturais que consolidam a nova conexão. Sem BDNF, a potenciação de longa duração (LTP) — o substrato celular da memória — é severamente comprometida.</p>
      <h2>Sinalização via TrkB: da membrana ao núcleo</h2>
      <p>O BDNF exerce seus efeitos principalmente via receptor tirosina quinase B (TrkB). A ligação do BDNF dimerizado ao TrkB ativa três cascatas intracelulares principais: <strong>MAPK/ERK (proliferação e diferenciação), PI3K/Akt (sobrevivência neuronal) e PLCγ/CaMKII (plasticidade sináptica)</strong>. A via PLCγ é particularmente relevante para LTP, pois a ativação de CaMKII fosforila receptores AMPA, aumentando sua condutância e promovendo a inserção de novos receptores AMPA na membrana pós-sináptica.</p>
      <div class="pullquote">O BDNF é a molécula que transforma atividade elétrica transitória em mudança estrutural permanente. Sem ele, experiências acontecem mas memórias não se formam.</div>
      <h2>Exercício e BDNF: a conexão corpo-cérebro</h2>
      <p>Uma das descobertas mais robustas da neurociência translacional é que o exercício aeróbico aumenta os níveis de BDNF no hipocampo. <strong>Estudos em humanos demonstram que uma sessão única de exercício moderado eleva BDNF sérico em 20-30%, e que exercício crônico aumenta os níveis basais.</strong> O mecanismo envolve a produção de irisina pelo músculo esquelético (via clivagem de FNDC5), que cruza a barreira hematoencefálica e induz expressão de BDNF no hipocampo.</p>
      <div class="data-callout"><div class="data-callout-label">Dado da literatura</div><div class="data-callout-content">Erickson et al. (2011) demonstraram em ensaio clínico randomizado que 12 meses de exercício aeróbico moderado (caminhada, 3x/semana) aumentou o volume hipocampal em 2% em idosos, revertendo 1-2 anos de perda volumétrica associada à idade. O aumento volumétrico correlacionou-se com elevação de BDNF sérico.</div><div class="data-callout-source">Erickson KI, et al., 2011 — Proc Natl Acad Sci USA</div></div>
      <h2>Modulação farmacológica do BDNF</h2>
      <p>Além do exercício, vários compostos modulam a expressão ou sinalização de BDNF. O Semax, análogo de ACTH(4-10), aumenta a expressão de mRNA de BDNF no hipocampo e córtex de forma dose-dependente. O 7,8-di-hidroxiflavona (7,8-DHF) é um agonista direto do receptor TrkB que mimetiza os efeitos do BDNF. Antidepressivos ISRS aumentam BDNF cronicamente, o que sugere que parte de seus efeitos terapêuticos é mediada por neurotrofinas.</p>
      <p>O BDNF emerge como uma molécula integradora: <strong>conecta atividade física a função cognitiva, traduz atividade sináptica em memória, e representa um alvo convergente para intervenções farmacológicas e não-farmacológicas na cognição.</strong></p>
    `,
    sources: [
      'Erickson KI, et al. <em>Exercise training increases size of hippocampus and improves memory.</em> Proc Natl Acad Sci USA. 2011;108(7):3017-3022.',
      'Lu B, et al. <em>BDNF-based synaptic repair as a disease-modifying strategy for neurodegenerative diseases.</em> Nat Rev Neurosci. 2013;14(6):401-416.',
      'Wrann CD, et al. <em>Exercise induces hippocampal BDNF through a PGC-1α/FNDC5 pathway.</em> Cell Metab. 2013;18(5):649-659.',
      'Barde YA, Edgar D, Thoenen H. <em>Purification of a new neurotrophic factor from mammalian brain.</em> EMBO J. 1982;1(5):549-553.'
    ],
    related: [
      { slug: 'nootropicos-mecanismos-cognicao', tag: 'Nootrópicos · Mecanismo', title: 'Nootrópicos e cognição: vias colinérgicas, glutamatérgicas e neurotróficas' },
      { slug: 'semax', tag: 'Neuro · Mecanismo', title: 'Semax e BDNF: o peptídeo russo que modula fator neurotrófico' }
    ]
  },
  {
    id: 'nootropicos-peptidicos-vs-sinteticos',
    slug: 'nootropicos-peptidicos-vs-sinteticos',
    tag: 'Nootrópicos · Comparativo',
    title: 'Nootrópicos peptídicos vs sintéticos: Semax, Selank e a família dos racetams',
    date: '18 Fev 2026',
    readTime: '7 min',
    coverText: 'PEPTÍDICOS VS SINTÉTICOS',
    bodyHtml: `
      <p>O campo dos nootrópicos divide-se em duas grandes famílias farmacológicas: os <strong>peptídeos neuroativos</strong> (Semax, Selank, Dihexa, P21) e as <strong>moléculas sintéticas de baixo peso molecular</strong> (piracetam, aniracetam, noopept, fenilpiracetam). Embora compartilhem o objetivo de modulação cognitiva, suas diferenças em mecanismo, farmacocinética e base de evidências são substanciais.</p>
      <p>A escolha entre as duas famílias não é uma questão de superioridade, mas de adequação ao objetivo experimental. Cada classe oferece vantagens e limitações distintas que derivam diretamente de suas propriedades moleculares.</p>
      <h2>Peptídeos nootrópicos: neurotrofinas como alvo</h2>
      <p>Os nootrópicos peptídicos atuam predominantemente via modulação de fatores neurotróficos. <strong>Semax (heptapeptídeo, análogo de ACTH 4-10) aumenta a expressão de BDNF e NGF no hipocampo e córtex</strong>, com efeitos que se desenvolvem ao longo de dias a semanas. Selank (heptapeptídeo, análogo de tuftsina) modula o sistema GABAérgico e ansiolítico, com ação adicional sobre encefalinas endógenas. A via de administração é tipicamente intranasal, com biodisponibilidade cerebral documentada para ambos.</p>
      <div class="pullquote">Os racetams modulam a sinapse que existe. Os peptídeos neurotróficos podem criar novas sinapses. A diferença é entre otimizar hardware existente e expandir a rede.</div>
      <h2>Racetams: modulação glutamatérgica direta</h2>
      <p>Os racetams — piracetam, aniracetam, oxiracetam, fenilpiracetam — são moduladores alostéricos positivos (PAMs) de receptores AMPA. <strong>Eles não ativam o receptor diretamente, mas amplificam a resposta ao glutamato endógeno</strong>, aumentando o tempo de abertura do canal iônico. Esse mecanismo produz efeitos agudos sobre processamento cortical e memória de trabalho, em contraste com os efeitos crônicos dos peptídeos neurotróficos.</p>
      <div class="data-callout"><div class="data-callout-label">Dado da literatura</div><div class="data-callout-content">Piracetam demonstrou afinidade pelo receptor AMPA na faixa micromolar, com efeitos mensuráveis em fluxo sanguíneo cerebral regional e metabolismo de oxigênio. Semax, por contraste, opera em concentrações nanomolares sobre a expressão gênica de BDNF, com pico de efeito transcricional 1,5-3 horas após administração intranasal.</div><div class="data-callout-source">Winblad B, 2005 — CNS Drug Rev; Dolotov OV, et al., 2006 — Brain Res</div></div>
      <h2>Comparação farmacocinética</h2>
      <p>As diferenças farmacocinéticas são marcantes. Piracetam possui biodisponibilidade oral de ~100%, meia-vida de 5 horas, e não é metabolizado — é excretado inalterado pelos rins. Semax, por ser um peptídeo, não possui biodisponibilidade oral significativa e requer administração intranasal, com meia-vida funcional de 30-60 minutos mas efeitos sobre expressão gênica que se estendem por horas. <strong>Os racetams oferecem praticidade posológica; os peptídeos oferecem especificidade de alvo.</strong></p>
      <p>A fronteira entre as duas famílias é porosa. O Noopept (N-fenilacetil-L-prolilglicina etil éster), embora classificado como "racetam-like", apresenta efeitos neurotróficos que incluem aumento de BDNF e NGF em modelos animais — sugerindo que os mecanismos de otimização sináptica e remodelamento estrutural podem convergir em concentrações e tempos de exposição adequados.</p>
    `,
    sources: [
      'Winblad B. <em>Piracetam: a review of pharmacological properties and clinical uses.</em> CNS Drug Rev. 2005;11(2):169-182.',
      'Dolotov OV, et al. <em>Semax, an analog of ACTH(4-10), regulates expression of BDNF and TrkB in rat hippocampus.</em> Brain Res. 2006;1117(1):54-60.',
      'Gudasheva TA, et al. <em>Design of N-acylprolyltyrosine peptidomimetic as a novel nootropic and neuroprotective agent.</em> J Med Chem. 2007;50(11):2597-2600.',
      'Ostrovskaya RU, et al. <em>Noopept stimulates the expression of NGF and BDNF in rat hippocampus.</em> Bull Exp Biol Med. 2008;146(3):334-337.'
    ],
    related: [
      { slug: 'nootropicos-mecanismos-cognicao', tag: 'Nootrópicos · Mecanismo', title: 'Nootrópicos e cognição: os três eixos farmacológicos' },
      { slug: 'bdnf-plasticidade-sinaptica', tag: 'Nootrópicos · Neurociência', title: 'BDNF e plasticidade sináptica: exercício e neurogênese' }
    ]
  },
  {
    id: 'telomeros-envelhecimento',
    slug: 'telomeros-envelhecimento',
    tag: 'Longevidade · Biologia',
    title: 'Telômeros, telomerase e envelhecimento biológico: o relógio molecular',
    date: '13 Fev 2026',
    readTime: '8 min',
    coverText: 'TELÔMEROS',
    bodyHtml: `
      <p>Os telômeros são estruturas nucleoproteicas que protegem as extremidades dos cromossomos lineares. Compostos por repetições da sequência TTAGGG associadas ao complexo proteico shelterin, eles impedem que o maquinário de reparo de DNA trate as extremidades cromossômicas como quebras de dupla fita. <strong>A cada divisão celular, os telômeros encurtam em 50-200 pares de bases devido ao problema da replicação terminal</strong> — a DNA polimerase não consegue replicar completamente a extremidade 3' do molde.</p>
      <p>Este encurtamento progressivo constitui o que a gerontologia molecular denomina "relógio mitótico": um mecanismo intrínseco que limita o potencial replicativo das células somáticas. Quando o comprimento telomérico atinge um limiar crítico (~4-6 kb em humanos), a célula entra em senescência replicativa — o limite de Hayflick descrito em 1961.</p>
      <h2>Telomerase: a enzima que reverte o relógio</h2>
      <p>A telomerase é uma ribonucleoproteína composta pela subunidade catalítica TERT (telomerase reverse transcriptase) e pelo componente RNA TERC (que serve como molde para a síntese de repetições teloméricas). <strong>Na maioria das células somáticas adultas, a expressão de TERT é reprimida</strong>, o que explica o encurtamento telomérico progressivo. Exceções incluem células-tronco, linfócitos ativados e, significativamente, cerca de 85-90% dos tumores malignos — que reativam telomerase como mecanismo de imortalização.</p>
      <div class="pullquote">Os telômeros não causam o envelhecimento — eles registram o envelhecimento. Mas a distinção entre marcador e mecanismo é precisamente o que a pesquisa ainda busca resolver.</div>
      <h2>Telômeros como biomarcador de aging</h2>
      <p>O comprimento telomérico leucocitário (LTL) é utilizado como biomarcador de envelhecimento biológico em estudos epidemiológicos. <strong>Telômeros mais curtos correlacionam-se com maior risco cardiovascular, declínio cognitivo, diabetes tipo 2 e mortalidade geral.</strong> No entanto, a causalidade permanece debatida: telômeros curtos podem ser consequência de inflamação crônica, estresse oxidativo e alta taxa proliferativa — não necessariamente a causa primária do aging.</p>
      <div class="data-callout"><div class="data-callout-label">Dado da literatura</div><div class="data-callout-content">O estudo de Blackburn e Epel (2012) demonstrou que estresse psicológico crônico está associado a encurtamento telomérico acelerado — cuidadoras de crianças com doenças crônicas apresentaram telômeros equivalentes a 10 anos adicionais de envelhecimento biológico comparadas ao grupo controle.</div><div class="data-callout-source">Epel ES, et al., 2004 — Proc Natl Acad Sci USA; Blackburn EH & Epel ES, 2012</div></div>
      <h2>Modulação telomérica: Epithalon e além</h2>
      <p>O Epithalon (Ala-Glu-Asp-Gly) é o composto mais investigado na literatura de ativação peptídica de telomerase. Khavinson et al. demonstraram ativação de hTERT em fibroblastos humanos, com extensão do potencial replicativo. Outros compostos investigados incluem TA-65 (cicloastragenol, derivado de Astragalus membranaceus) e o danazol (esteroide sintético que ativou telomerase em pacientes com anemia aplásica). <strong>A questão central não é se a telomerase pode ser ativada, mas se essa ativação é segura a longo prazo</strong> — dado o papel da telomerase na biologia tumoral.</p>
      <p>A biologia dos telômeros permanece no epicentro da gerontologia molecular, mas a tradução de observações correlacionais em intervenções terapêuticas requer cautela. O relógio telomérico não é o único mecanismo de aging, e manipulá-lo isoladamente pode não ser suficiente — nem necessariamente desejável.</p>
    `,
    sources: [
      'Blackburn EH, Greider CW, Szostak JW. <em>Telomeres and telomerase: the path from maize, Tetrahymena and yeast to human cancer and aging.</em> Nat Med. 2006;12(10):1133-1138.',
      'Epel ES, et al. <em>Accelerated telomere shortening in response to life stress.</em> Proc Natl Acad Sci USA. 2004;101(49):17312-17315.',
      'Hayflick L, Moorhead PS. <em>The serial cultivation of human diploid cell strains.</em> Exp Cell Res. 1961;25:585-621.',
      'Khavinson VKh, et al. <em>Peptide promotes overcoming of the division limit in human somatic cell.</em> Bull Exp Biol Med. 2003;136(6):536-538.',
      'de Lange T. <em>Shelterin-mediated telomere protection.</em> Annu Rev Genet. 2018;52:223-247.'
    ],
    related: [
      { slug: 'epithalon', tag: 'Longevidade · Curiosidade', title: 'Epithalon e telomerase: quatro aminoácidos contra o relógio biológico' },
      { slug: 'senescencia-celular-senolytics', tag: 'Longevidade · Senescência', title: 'Senescência celular e senolíticos: eliminando células-zumbi' }
    ]
  },
  {
    id: 'senescencia-celular-senolytics',
    slug: 'senescencia-celular-senolytics',
    tag: 'Longevidade · Senescência',
    title: 'Senescência celular e senolíticos: eliminando células-zumbi',
    date: '08 Fev 2026',
    readTime: '7 min',
    coverText: 'SENOLÍTICOS',
    bodyHtml: `
      <p>Células senescentes são células que pararam permanentemente de se dividir mas resistem à apoptose. <strong>Elas não estão mortas — estão metabolicamente ativas e secretam um coquetel inflamatório denominado SASP (senescence-associated secretory phenotype) que danifica o tecido circundante.</strong> A metáfora de "células-zumbi" é biologicamente precisa: não se replicam, não morrem, e prejudicam as células vizinhas.</p>
      <p>A senescência celular é um mecanismo anticâncer: ao parar de se dividir, a célula previne a propagação de mutações. Mas a acumulação de células senescentes com a idade transforma uma resposta protetora aguda em um problema crônico. O campo dos senolíticos busca eliminar seletivamente essas células sem afetar as células saudáveis.</p>
      <h2>O SASP: inflamação programada</h2>
      <p>O SASP é a principal razão pela qual células senescentes são danosas. Ele inclui <strong>citocinas pró-inflamatórias (IL-1α, IL-6, IL-8), quimiocinas (MCP-1, CXCL1), proteases (MMPs) e fatores de crescimento (VEGF, TGF-β)</strong>. A secreção crônica de SASP por células senescentes acumuladas contribui para o estado inflamatório de baixo grau associado ao envelhecimento — a "inflammaging" descrita por Franceschi. Mais preocupante, o SASP pode induzir senescência em células vizinhas (efeito bystander), criando um ciclo de retroalimentação positiva.</p>
      <div class="pullquote">A senescência celular é anticâncer no curto prazo e pró-envelhecimento no longo prazo. Os senolíticos apostam que remover as células velhas é mais seguro do que conviver com a inflamação que elas geram.</div>
      <h2>Senolíticos de primeira geração</h2>
      <p>A combinação dasatinib + quercetina (D+Q) é o regime senolítico mais estudado. <strong>Dasatinib (inibidor de tirosina quinase, originalmente um antileucêmico) atua preferencialmente sobre células senescentes de preadipócitos, enquanto quercetina (flavonoide) age sobre células endoteliais senescentes.</strong> A combinação é necessária porque diferentes tipos celulares utilizam diferentes vias de resistência à apoptose (SCAPs — senescent cell anti-apoptotic pathways).</p>
      <div class="data-callout"><div class="data-callout-label">Dado da literatura</div><div class="data-callout-content">Zhu et al. (2015) demonstraram que a combinação dasatinib + quercetina reduziu a carga de células senescentes em camundongos idosos, melhorando a função cardiovascular, a densidade óssea e a capacidade de exercício. Justice et al. (2019) conduziram o primeiro ensaio clínico aberto com D+Q em pacientes com fibrose pulmonar idiopática, reportando melhora em testes de função física após 3 semanas de tratamento intermitente.</div><div class="data-callout-source">Zhu Y, et al., 2015 — Aging Cell; Justice JN, et al., 2019 — EBioMedicine</div></div>
      <h2>Além de D+Q: a próxima geração</h2>
      <p>Fisetin (flavonoide encontrado em morangos), navitoclax (ABT-263, inibidor de Bcl-2/Bcl-xL) e compostos baseados em PROTAC (chimeras de degradação dirigida) representam a próxima geração de senolíticos em investigação. O fisetin demonstrou atividade senolítica em modelos animais com perfil de segurança favorável, e ensaios clínicos (AFFIRM-LITE) estão em andamento.</p>
      <p>O campo dos senolíticos está na transição de prova de conceito para validação clínica. <strong>A questão não é mais se células senescentes contribuem para o envelhecimento — é se eliminá-las de forma segura e seletiva em humanos produz benefícios clínicos mensuráveis.</strong></p>
    `,
    sources: [
      'Zhu Y, et al. <em>The Achilles\' heel of senescent cells: from transcriptome to senolytic drugs.</em> Aging Cell. 2015;14(4):644-658.',
      'Justice JN, et al. <em>Senolytics in idiopathic pulmonary fibrosis: Results from a first-in-human, open-label, pilot study.</em> EBioMedicine. 2019;40:554-563.',
      'Kirkland JL, Tchkonia T. <em>Senolytic drugs: from discovery to translation.</em> J Intern Med. 2020;288(5):518-536.',
      'Franceschi C, et al. <em>Inflammaging: a new immune-metabolic viewpoint for age-related diseases.</em> Nat Rev Endocrinol. 2018;14(10):576-590.'
    ],
    related: [
      { slug: 'telomeros-envelhecimento', tag: 'Longevidade · Biologia', title: 'Telômeros, telomerase e envelhecimento biológico' },
      { slug: 'mitocondrias-aging', tag: 'Longevidade · Mitocondrial', title: 'Disfunção mitocondrial no envelhecimento: ROS, MDPs e biogênese' }
    ]
  },
  {
    id: 'mitocondrias-aging',
    slug: 'mitocondrias-aging',
    tag: 'Longevidade · Mitocondrial',
    title: 'Disfunção mitocondrial no envelhecimento: ROS, MDPs e biogênese',
    date: '05 Fev 2026',
    readTime: '8 min',
    coverText: 'MITOCÔNDRIAS & AGING',
    bodyHtml: `
      <p>A mitocôndria deixou de ser vista apenas como a "usina energética" da célula. <strong>Na biologia contemporânea do envelhecimento, a mitocôndria emerge como um hub de sinalização que integra metabolismo energético, resposta ao estresse, apoptose e comunicação intergenômica.</strong> A disfunção mitocondrial é uma das nove hallmarks of aging descritas por López-Otín et al. (2013) — e possivelmente a mais conectada às demais.</p>
      <p>Com o envelhecimento, as mitocôndrias acumulam mutações no mtDNA (DNA mitocondrial), reduzem a eficiência da cadeia transportadora de elétrons, aumentam a produção de espécies reativas de oxigênio (ROS) e diminuem a capacidade de biogênese. Esse declínio funcional contribui para a sarcopenia, a neurodegeneração e a resistência insulínica associadas à idade.</p>
      <h2>ROS: de vilão a sinalizador</h2>
      <p>A teoria do envelhecimento por radicais livres (Harman, 1956) propôs que ROS mitocondrial é a causa primária do aging. <strong>Décadas depois, a realidade mostrou-se mais complexa.</strong> Estudos com antioxidantes sistêmicos falharam consistentemente em estender a vida ou prevenir doenças. A visão atual reconhece que ROS mitocondrial em níveis fisiológicos é um sinalizador essencial — ativando respostas adaptativas (hormese mitocondrial ou mitohormese) que melhoram a resistência celular ao estresse.</p>
      <div class="pullquote">As mitocôndrias não envelhecem passivamente — elas participam ativamente da sinalização que determina se a célula se adapta, entra em senescência ou morre. O aging é, em parte, uma falha progressiva nessa sinalização.</div>
      <h2>Peptídeos derivados de mitocôndrias (MDPs)</h2>
      <p>Os MDPs são uma classe emergente de peptídeos codificados pelo genoma mitocondrial que atuam como sinalizadores retrograde — da mitocôndria para o núcleo e tecidos distantes. <strong>O MOTS-c (codificado pelo gene 12S rRNA) e o Humanin (codificado pelo gene 16S rRNA) são os MDPs mais estudados.</strong> O MOTS-c ativa AMPK e melhora sensibilidade insulínica; o Humanin é citoprotetor e antiapoptótico. Ambos declinam com a idade, sugerindo que parte do aging metabólico resulta da perda desses sinais mitocondriais.</p>
      <div class="data-callout"><div class="data-callout-label">Dado da literatura</div><div class="data-callout-content">Kim et al. (2019) demonstraram que a administração exógena de MOTS-c em camundongos idosos (equivalentes a humanos de ~65 anos) reverteu declínios na capacidade física, sensibilidade insulínica e função muscular esquelética. Os níveis circulantes de MOTS-c endógeno declinam aproximadamente 30% entre os 20 e os 70 anos em humanos.</div><div class="data-callout-source">Kim SJ, et al., 2019 — J Mol Med; Lee C, et al., 2015 — Cell Metab</div></div>
      <h2>Biogênese mitocondrial: PGC-1α como regulador master</h2>
      <p>A biogênese mitocondrial — a produção de novas mitocôndrias — é regulada pelo coativador transcricional PGC-1α, que coordena a expressão de genes nucleares e mitocondriais envolvidos na fosforilação oxidativa. <strong>O exercício físico, a restrição calórica e a exposição ao frio ativam PGC-1α</strong> por diferentes vias (AMPK, SIRT1, p38 MAPK). Compostos como o SLU-PP-332 (agonista de ERRα, um parceiro transcricional de PGC-1α) são investigados como "exercise mimetics" que ativam a biogênese mitocondrial farmacologicamente.</p>
      <p>A mitocôndria é simultaneamente alvo e agente do envelhecimento. <strong>Estratégias que combinam suporte à biogênese mitocondrial, reposição de MDPs e otimização da resposta ao estresse oxidativo representam uma abordagem multimodal ao aging que vai além do simples combate a radicais livres.</strong></p>
    `,
    sources: [
      'López-Otín C, et al. <em>The hallmarks of aging.</em> Cell. 2013;153(6):1194-1217.',
      'Lee C, et al. <em>The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis.</em> Cell Metab. 2015;21(3):443-454.',
      'Kim SJ, et al. <em>Mitochondrial-derived peptides in aging and age-related diseases.</em> GeroScience. 2021;43(3):1113-1121.',
      'Ristow M, Schmeisser K. <em>Mitohormesis: promoting health and lifespan by increased levels of reactive oxygen species (ROS).</em> Dose Response. 2014;12(2):288-341.',
      'Harman D. <em>Aging: a theory based on free radical and radiation chemistry.</em> J Gerontol. 1956;11(3):298-300.'
    ],
    related: [
      { slug: 'mots-c', tag: 'Longevidade · Metabólico', title: 'MOTS-c: peptídeo mitocondrial com ação nuclear' },
      { slug: 'senescencia-celular-senolytics', tag: 'Longevidade · Senescência', title: 'Senescência celular e senolíticos: eliminando células-zumbi' }
    ]
  }
];

export const getArticleBySlug = (slug) => articles.find(a => a.slug === slug);
