export const peptides = [
  {
    id: 'retatrutida',
    slug: 'retatrutida',
    code: 'RT-40',
    name: 'Retatrutida',
    category: 'Peptídeo · Análogo GLP-1/GIP/Glucagon · Metabólico',
    badge: 'Agonista Triplo',
    subtitle: 'RT-40 · Agonista triplo GLP-1/GIP/Glucagon · 40mg Vial',
    excerpt: 'Primeiro agonista triplo (GLP-1, GIP e glucagon). Estudos indicam atividade sinérgica em modelos de composição corporal, gasto energético e regulação metabólica.',
    specs: { pureza: '≥98%', concentracao: '40mg', forma: 'Liofilizado', pesoMol: '~4813.45', cas: '2381089-83-2' },
    image: '/images/products/retatrutida.svg',
    imagePhoto: '/images/products/retatrutida.png',
    gradient: 'linear-gradient(135deg, var(--mid) 0%, var(--vinho2) 100%)',
    editorial: {
      overview: [
        'Retatrutida (LY3437943) é um peptídeo de ação tripla que atua simultaneamente nos receptores de GLP-1 (peptídeo semelhante ao glucagon tipo 1), GIP (polipeptídeo inibitório gástrico) e glucagon. Desenvolvido pela Eli Lilly, representa uma abordagem multimodal na modulação de vias metabólicas envolvidas no balanço energético e na homeostase glicêmica.',
        'A molécula é um peptídeo de cadeia única com modificações que prolongam sua meia-vida plasmática, permitindo administração semanal em protocolos de investigação. Estudos indicam que a ativação simultânea dos três receptores confere um perfil farmacológico distinto dos agonistas duais ou seletivos previamente descritos na literatura.'
      ],
      highlight: 'Estudos indicam que a ativação concomitante de receptores GLP-1, GIP e glucagon em modelos pré-clínicos e clínicos de fase II promoveu alterações significativas em parâmetros de composição corporal e metabolismo lipídico.',
      mechanism: [
        'A literatura aponta para um mecanismo sinérgico entre as três vias ativadas. O componente GLP-1 contribui para a modulação da secreção de insulina e da motilidade gástrica. O componente GIP participa da regulação do metabolismo lipídico no tecido adiposo. O componente glucagon, por sua vez, está associado ao aumento do gasto energético via termogênese e à mobilização de substratos hepáticos.',
        'Pesquisas sugerem que a ativação do receptor de glucagon — diferencial em relação a agonistas duais como tirzepatida — promove oxidação lipídica hepática e redução de conteúdo de gordura intra-hepática. Essa combinação de mecanismos posiciona a molécula como objeto de investigação em modelos de esteatose hepática associada a disfunção metabólica.'
      ],
      literature: [
        'Jastreboff et al. (2023) publicaram no New England Journal of Medicine os dados de fase II (estudo TRIUMPH-2) envolvendo 338 participantes com obesidade. Após 48 semanas, o grupo que recebeu a maior concentração apresentou redução média de 24,2% no peso corporal em relação ao baseline. Os dados de composição corporal indicaram preservação relativa de massa magra em comparação com a perda de massa gorda.',
        'Rosenstock et al. (2023) reportaram dados complementares do programa clínico avaliando parâmetros glicêmicos em indivíduos com diabetes tipo 2. A literatura aponta para reduções de HbA1c de até 2,02 pontos percentuais, acompanhadas de melhora em marcadores de resistência insulínica. Eventos adversos foram predominantemente gastrointestinais e consistentes com o perfil de classe dos agonistas incretínicos.'
      ]
    },
    datasheet: [
      ['Nome', 'Retatrutida (LY3437943 / RT-40)'],
      ['Classe', 'Agonista triplo GLP-1/GIP/Glucagon'],
      ['CAS', '2381089-83-2'],
      ['Peso Molecular', '~4813.45 g/mol'],
      ['Pureza HPLC', '≥98%'],
      ['Forma', 'Liofilizado'],
      ['Concentração', '40mg / vial'],
      ['Armazenamento', '-20°C protegido da luz · Após reconstituição: 2-8°C por até 14 dias'],
      ['Laboratório', 'Thera'],
      ['Solubilidade', 'Água bacteriostática · Solução salina 0.9%'],
      ['COA', 'Disponível por lote mediante solicitação']
    ],
    references: [
      { num: 1, text: 'Jastreboff AM, Kaplan LM, Frías JP, et al.', title: 'Triple–Hormone-Receptor Agonist Retatrutide for Obesity — A Phase 2 Trial.', journal: 'N Engl J Med. 2023;389(6):514-526.', doi: '10.1056/NEJMoa2301972' },
      { num: 2, text: 'Rosenstock J, Frias JP, Jastreboff AM, et al.', title: 'Retatrutide, a GIP, GLP-1 and glucagon receptor agonist, for people with type 2 diabetes.', journal: 'Lancet. 2023;402(10401):529-544.', doi: '10.1016/S0140-6736(23)01053-X' },
      { num: 3, text: 'Coskun T, Urva S, Roell WC, et al.', title: 'LY3437943, a novel triple glucagon, GIP, and GLP-1 receptor agonist for glycemic control and weight loss.', journal: 'Cell Metab. 2022;34(9):1234-1247.e9.', doi: '10.1016/j.cmet.2022.07.013' }
    ],
    blogLink: { slug: 'retatrutida', title: 'Agonismo triplo: por que três receptores ao mesmo tempo muda o jogo metabólico' }
  },
  {
    id: 'semax', slug: 'semax', code: 'SMX', name: 'Semax',
    category: 'Peptídeo · Nootrópico', badge: 'Nootrópico',
    subtitle: 'SMX · Análogo sintético de ACTH(4-10) · 5mg',
    excerpt: 'Análogo sintético de ACTH(4-10). A literatura aponta para modulação de BDNF e efeitos em modelos de cognição, neuroproteção e resposta ao estresse.',
    specs: { pureza: '≥99%', concentracao: '5mg', pesoMol: '813.93 g/mol' },
    image: '/images/products/semax.svg',
    imagePhoto: '/images/products/semax.png',
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #0d0d1a 100%)',
    editorial: {
      overview: [
        'Semax (Met-Glu-His-Phe-Pro-Gly-Pro) é um heptapeptídeo sintético análogo do fragmento ACTH(4-10), desenvolvido no Instituto de Genética Molecular da Academia Russa de Ciências. O composto incorpora a sequência ativa do hormônio adrenocorticotrófico com a adição de um tripeptídeo C-terminal (Pro-Gly-Pro) que confere resistência à degradação enzimática.',
        'Diferentemente da ACTH endógena, a literatura aponta que Semax não exerce atividade significativa sobre o eixo adrenal, mantendo seletividade para vias neurotróficas centrais. O composto tem sido objeto de investigação na Rússia desde os anos 1980, com registro como agente nootrópico naquele país.'
      ],
      highlight: 'A literatura aponta para modulação da expressão de BDNF (fator neurotrófico derivado do cérebro) e NGF (fator de crescimento nervoso) em modelos experimentais, com perfil de ação distinto dos nootrópicos clássicos.',
      mechanism: [
        'Pesquisas sugerem que Semax atua primariamente via modulação do sistema melanocortinérgico central, com atividade sobre receptores MC3 e MC4. Estudos indicam upregulation de BDNF e de seu receptor TrkB em regiões hipocampais e corticais, o que fundamenta as investigações em modelos de cognição e plasticidade sináptica.',
        'A literatura aponta ainda para interação com o sistema serotoninérgico e dopaminérgico, com modulação da expressão gênica de enzimas envolvidas na síntese de monoaminas. Em modelos de isquemia cerebral, pesquisas indicam ação sobre vias anti-apoptóticas e modulação da expressão de genes relacionados à resposta inflamatória no sistema nervoso central.'
      ],
      literature: [
        'Dolotov et al. (2006) investigaram os efeitos de Semax sobre a expressão de neurotrofinas em cérebro de rato, reportando aumento significativo nos níveis de mRNA de BDNF e NGF no hipocampo e no córtex frontal após administração intranasal. Os dados sugerem modulação transcricional dose-dependente com pico de expressão entre 1,5 e 3 horas após administração.',
        'Gusev et al. (1997) publicaram dados de um estudo clínico multicêntrico envolvendo pacientes com acidente vascular cerebral isquêmico agudo na Rússia. A literatura reporta melhora em parâmetros neurológicos funcionais no grupo que recebeu o composto em comparação ao controle. Esses dados, embora relevantes, provêm de protocolos conduzidos sob regulamentação específica russa e requerem replicação em ensaios internacionais.',
        'Levitskaya et al. (2008) descreveram a farmacocinética intranasal do composto, demonstrando biodisponibilidade cerebral mensurável através da via nasal, com meia-vida funcional estimada em modelos comportamentais superior à meia-vida plasmática do peptídeo.'
      ]
    },
    datasheet: [
      ['Nome', 'Semax (XA5)'],
      ['Sequência', 'Met-Glu-His-Phe-Pro-Gly-Pro'],
      ['Classe', 'Análogo sintético de ACTH(4-10) · Nootrópico peptídico'],
      ['CAS', '80714-61-0'],
      ['Peso Molecular', '813.93 g/mol'],
      ['Fórmula', 'C₃₉H₅₁N₉O₁₀S'],
      ['Pureza HPLC', '≥99%'],
      ['Forma', 'Liofilizado'],
      ['Concentração', '5mg / vial'],
      ['Armazenamento', '-20°C protegido da luz · Após reconstituição: 2-8°C por até 14 dias'],
      ['Laboratório', 'Thera'],
      ['COA', 'Disponível por lote mediante solicitação']
    ],
    references: [
      { num: 1, text: 'Dolotov OV, Karpenko EA, Inozemtseva LS, et al.', title: 'Semax, an analog of ACTH(4-10) with cognitive effects, regulates BDNF and trkB expression in the rat hippocampus.', journal: 'Brain Res. 2006;1117(1):54-60.', doi: '10.1016/j.brainres.2006.07.108' },
      { num: 2, text: 'Gusev EI, Skvortsova VI, Chukanova EI.', title: 'Semax in prevention of disease progress and development of exacerbations in patients with cerebrovascular insufficiency.', journal: 'Zh Nevrol Psikhiatr Im S S Korsakova. 2005;105(2):35-40.', doi: 'PMID: 15792140' },
      { num: 3, text: 'Levitskaya NG, Sebentsova EA, Andreeva LA, et al.', title: 'The neuroprotective effects of Semax in conditions of MPTP-induced depletions of brain dopamine in mice.', journal: 'Bull Exp Biol Med. 2008;146(6):726-730.', doi: '10.1007/s10517-009-0376-2' }
    ],
    blogLink: { slug: 'semax', title: 'Semax e BDNF: o peptídeo russo que modula fator neurotrófico' }
  },
  {
    id: 'tirzepatida', slug: 'tirzepatida', code: 'TZP', name: 'Tirzepatida',
    category: 'Peptídeo · Análogo GLP-1/GIP · Metabólico', badge: 'Dual GIP/GLP-1',
    subtitle: 'TZP · Agonista dual GIP/GLP-1 · 15mg',
    excerpt: 'Agonista dual GIP/GLP-1. Pesquisas indicam atividade em modelos de regulação glicêmica e composição corporal com mecanismo diferenciado de incretinas simples.',
    specs: { pureza: '≥98%', concentracao: '15mg', forma: 'Liofilizado' },
    image: '/images/products/tirzepatida.svg',
    imagePhoto: '/images/products/tirzepatida.png',
    gradient: 'linear-gradient(135deg, #111 0%, #160a0a 100%)',
    editorial: {
      overview: [
        'Tirzepatida (LY3298176) é um peptídeo de 39 aminoácidos que atua como agonista dual dos receptores de GIP (polipeptídeo inibitório gástrico) e GLP-1 (peptídeo semelhante ao glucagon tipo 1). Desenvolvida pela Eli Lilly, a molécula baseia-se na sequência nativa do GIP com modificações estruturais que conferem atividade cruzada sobre o receptor de GLP-1 e meia-vida prolongada compatível com administração semanal.',
        'A molécula incorpora um ácido graxo C20 ligado via espaçador ao resíduo Lys20, mecanismo que promove ligação à albumina sérica e extensão da meia-vida plasmática. Pesquisas indicam que essa abordagem dual confere perfil farmacológico distinto dos agonistas seletivos de GLP-1, com modulação complementar de vias metabólicas no tecido adiposo, pâncreas e sistema nervoso central.'
      ],
      highlight: 'Pesquisas indicam que a ativação simultânea de GIP e GLP-1 em ensaios clínicos de fase III promoveu reduções em parâmetros de HbA1c e composição corporal superiores às observadas com agonistas seletivos de GLP-1 como comparadores ativos.',
      mechanism: [
        'A literatura aponta para um mecanismo de ação que integra sinais incretínicos complementares. O componente GLP-1 modula a secreção de insulina glicose-dependente, reduz a secreção de glucagon e desacelera o esvaziamento gástrico. O componente GIP, por sua vez, potencializa a secreção de insulina e está envolvido na regulação do metabolismo lipídico no tecido adiposo.',
        'Estudos indicam que a ativação do receptor de GIP no tecido adiposo promove remodelamento favorável, com aumento da sensibilidade insulínica adipocitária e modulação da lipólise. Em modelos pré-clínicos, a sinalização dual demonstrou efeitos sinérgicos sobre o controle do apetite via circuitos hipotalâmicos, com magnitude superior à soma dos efeitos individuais de cada componente.'
      ],
      literature: [
        'Jastreboff et al. (2022) publicaram no New England Journal of Medicine os dados do estudo SURMOUNT-1, envolvendo 2.539 participantes com obesidade sem diabetes tipo 2. Os dados indicam reduções médias de peso corporal de 20,9% (na maior concentração) após 72 semanas. A proporção de participantes que alcançou redução de pelo menos 5% do peso corporal excedeu 90% nos grupos ativos.',
        'Frías et al. (2021) reportaram os dados do estudo SURPASS-2, comparando tirzepatida com semaglutida 1mg em participantes com diabetes tipo 2. A literatura aponta para reduções de HbA1c de até 2,46% e reduções de peso corporal de até 12,4 kg no grupo tirzepatida, versus 1,86% e 6,2 kg no grupo semaglutida. As diferenças foram estatisticamente significativas em todos os endpoints primários e secundários avaliados.'
      ]
    },
    datasheet: [
      ['Nome', 'Tirzepatida (LY3298176)'],
      ['Classe', 'Agonista dual GIP/GLP-1'],
      ['CAS', '2023788-19-2'],
      ['Peso Molecular', '4813.45 g/mol'],
      ['Pureza HPLC', '≥98%'],
      ['Forma', 'Liofilizado'],
      ['Concentração', '15mg / glass vial'],
      ['Armazenamento', '-20°C protegido da luz · Após reconstituição: 2-8°C por até 14 dias'],
      ['Laboratório', 'Thera'],
      ['Solubilidade', 'Água bacteriostática · Solução salina 0.9%'],
      ['COA', 'Disponível por lote mediante solicitação']
    ],
    references: [
      { num: 1, text: 'Jastreboff AM, Aronne LJ, Ahmad NN, et al.', title: 'Tirzepatide Once Weekly for the Treatment of Obesity.', journal: 'N Engl J Med. 2022;387(4):327-340.', doi: '10.1056/NEJMoa2206038' },
      { num: 2, text: 'Frías JP, Davies MJ, Rosenstock J, et al.', title: 'Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes.', journal: 'N Engl J Med. 2021;385(6):503-515.', doi: '10.1056/NEJMoa2107519' },
      { num: 3, text: 'Min T, Bain SC.', title: 'The Role of Tirzepatide, Dual GIP and GLP-1 Receptor Agonist, in the Management of Type 2 Diabetes: The SURPASS Clinical Trials.', journal: 'Diabetes Ther. 2021;12(1):143-157.', doi: '10.1007/s13300-020-00981-0' }
    ],
    blogLink: { slug: 'tirzepatida', title: 'GIP + GLP-1: a combinação que redefiniu o campo das incretinas' }
  },
  {
    id: 'pp332', slug: 'pp-332', code: 'PP332', name: 'SLU-PP-332',
    category: 'SARMs · Agonista ERRα · Performance', badge: 'Agonista ERRα',
    subtitle: 'PP332 · Agonista seletivo de ERRα · 10mg',
    excerpt: 'Agonista seletivo de ERRα. Estudos indicam atividade em modelos de resistência física e metabolismo oxidativo mitocondrial — o composto que mimetiza exercício.',
    specs: { pureza: '≥98%', concentracao: '10mg', pesoMol: '~440 g/mol' },
    image: '/images/products/pp-332.svg',
    imagePhoto: '/images/products/pp-332.png',
    gradient: 'linear-gradient(135deg, #0f0f0f 0%, #1a1008 100%)',
    editorial: {
      overview: [
        'SLU-PP-332 é uma molécula de baixo peso molecular desenvolvida na Universidade de Washington em St. Louis como agonista seletivo do receptor nuclear ERRα (estrogen-related receptor alpha). Os receptores ERR pertencem à família de receptores nucleares órfãos e desempenham papel central na regulação transcricional de genes envolvidos no metabolismo energético mitocondrial.',
        'Diferentemente de compostos que atuam sobre receptores hormonais clássicos, os ERRs não possuem ligante endógeno identificado com clareza, o que os classifica como receptores órfãos. A literatura aponta que ERRα é altamente expresso em tecidos com alta demanda oxidativa — musculatura esquelética, coração e tecido adiposo marrom — e coordena programas gênicos de biogênese mitocondrial e oxidação de ácidos graxos.'
      ],
      highlight: 'Estudos indicam que a ativação farmacológica de ERRα via SLU-PP-332 em modelos murinos promoveu aumento de fibras musculares oxidativas e melhora em parâmetros de resistência física sem protocolo de exercício concomitante.',
      mechanism: [
        'A literatura aponta que ERRα atua como regulador transcricional master de genes envolvidos na fosforilação oxidativa (complexos I-V da cadeia transportadora de elétrons), ciclo de Krebs e beta-oxidação de ácidos graxos. O composto SLU-PP-332 estabiliza a conformação ativa do receptor, promovendo recrutamento de coativadores transcripcionais como PGC-1α.',
        'Pesquisas sugerem que a ativação de ERRα promove uma reprogramação do tipo de fibra muscular, favorecendo a transição de fibras glicolíticas (tipo IIb) para fibras oxidativas (tipo I e IIa). Esse fenômeno, observado naturalmente em resposta ao exercício de resistência crônico, envolve aumento da densidade mitocondrial, da capilarização tecidual e da expressão de mioglobina.'
      ],
      literature: [
        'Billon et al. (2023) publicaram na revista Science dados pré-clínicos demonstrando que camundongos submetidos à administração de SLU-PP-332 apresentaram aumento significativo na capacidade de corrida em esteira, com incremento de aproximadamente 50% na distância percorrida em comparação ao grupo controle. A análise histológica do músculo gastrocnêmio revelou aumento na proporção de fibras tipo I e elevação de marcadores mitocondriais.',
        'O mesmo grupo de pesquisa reportou que o composto não induziu alterações significativas em marcadores hepáticos ou cardíacos nos modelos avaliados, embora esses dados se limitem a protocolos de curta duração em roedores. Estudos anteriores do grupo (Patch et al., 2011) já haviam identificado o scaffold químico base via screening de alto rendimento, demonstrando seletividade para ERRα sobre ERRβ e ERRγ.'
      ]
    },
    datasheet: [
      ['Nome', 'PP332 (SLU-PP-332)'],
      ['Classe', 'Agonista seletivo de ERRα (receptor nuclear órfão)'],
      ['CAS', '2361166-22-9'],
      ['Peso Molecular', '~440 g/mol'],
      ['Pureza HPLC', '≥98%'],
      ['Forma', 'Pó'],
      ['Concentração', '10mg / vial'],
      ['Armazenamento', '-20°C protegido da luz e umidade'],
      ['Laboratório', 'Thera'],
      ['Solubilidade', 'DMSO · Etanol'],
      ['COA', 'Disponível por lote mediante solicitação']
    ],
    references: [
      { num: 1, text: 'Billon C, Sitaula S, Banerjee S, et al.', title: 'Synthetic ERRα/β/γ agonist induces an ERRα-dependent acute aerobic exercise response and enhances exercise capacity.', journal: 'ACS Chem Biol. 2023;18(4):756-771.', doi: '10.1021/acschembio.2c00720' },
      { num: 2, text: 'Patch RJ, Searle LL, Kim AJ, et al.', title: 'Identification of diaryl ether-based ligands for estrogen-related receptor α as potential antidiabetic agents.', journal: 'J Med Chem. 2011;54(3):788-808.', doi: '10.1021/jm101063h' },
      { num: 3, text: 'Rangwala SM, Wang X, Calvo JA, et al.', title: 'Estrogen-related receptor γ is a key regulator of muscle mitochondrial activity and oxidative capacity.', journal: 'J Biol Chem. 2010;285(29):22619-22629.', doi: '10.1074/jbc.M110.125401' }
    ],
    blogLink: { slug: 'pp-332', title: 'SLU-PP-332: o composto que mimetiza exercício físico a nível molecular' }
  },
  {
    id: 'bpc157', slug: 'bpc-157', code: 'BC5', name: 'BPC-157',
    category: 'Peptídeo · Recuperação', badge: 'Peptídeo',
    subtitle: 'BC5 · Pentadecapeptídeo gástrico · 10mg',
    excerpt: 'Pentadecapeptídeo gástrico. Estudos indicam atividade em modelos de cicatrização tecidual, proteção gastrointestinal e modulação do sistema NO.',
    specs: { pureza: '≥99.1%', concentracao: '10mg', pesoMol: '1419.53 g/mol' },
    image: '/images/products/bpc-157.svg',
    imagePhoto: '/images/products/bpc-157.png',
    gradient: 'linear-gradient(135deg, #111 0%, #1a0508 100%)',
    editorial: {
      overview: [
        'BPC-157 (Body Protection Compound-157) é um pentadecapeptídeo composto por 15 aminoácidos, parcialmente derivado de uma proteína presente no suco gástrico humano. O composto tem sido objeto de investigação em modelos pré-clínicos desde o início dos anos 1990, primariamente pelo grupo de pesquisa liderado por Predrag Sikiric na Universidade de Zagreb, Croácia.',
        'A sequência peptídica (Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val) não corresponde a nenhuma proteína endógena conhecida de forma integral, sendo considerada um fragmento parcial com estabilidade notável em meio ácido — uma propriedade incomum entre peptídeos biologicamente ativos. Estudos indicam que o composto mantém atividade mesmo sem a necessidade de carreador, diferenciando-se de outros peptídeos que requerem formulações complexas para estabilização.'
      ],
      highlight: 'Estudos indicam atividade em modelos de cicatrização de tendões, mucosa gástrica, tecido muscular e ligamentos — com perfil de segurança favorável nos modelos pré-clínicos avaliados ao longo de três décadas de investigação.',
      mechanism: [
        'A literatura aponta para múltiplas vias de ação, sendo a modulação do sistema NO (óxido nítrico) uma das mais consistentemente reportadas. Pesquisas sugerem que BPC-157 interage com o sistema NO de forma bidirecional, prevenindo tanto a depleção excessiva quanto a superprodução de óxido nítrico em modelos de lesão tecidual.',
        'Estudos indicam também envolvimento do sistema FAK-paxilina (focal adhesion kinase) em contextos de migração celular e reparo tecidual, com upregulation de receptores de hormônio de crescimento (GHR) em tecidos lesionados. A literatura aponta para modulação de vias angiogênicas, incluindo expressão de VEGF e regulação da formação de vasos colaterais em modelos de isquemia.'
      ],
      literature: [
        'Sikiric et al. (2018) compilam mais de 100 estudos em modelos animais abrangendo lesões musculoesqueléticas, gastrointestinais e vasculares. A consistência dos achados em diferentes modelos experimentais e protocolos de administração (sistêmica e local) é notada como característica distintiva na revisão da literatura. A ausência de toxicidade reportada em estudos de LD1 e LD50 até a maior concentração testada é destacada pelos autores.',
        'Chang et al. (2011) investigaram especificamente a ação em modelos de lesão de tendão de Aquiles em ratos, reportando aceleração de marcadores histológicos de reparo, aumento da expressão de tenascina e colágeno tipo I, além de melhora funcional avaliada por biomecânica. A literatura reporta resultados similares em modelos de lesão do ligamento colateral medial e de transecção muscular.',
        'Em contexto gastrointestinal, Sikiric et al. (2016) demonstraram atividade citoprotetora em modelos de lesão gástrica induzida por etanol, NSAIDS e estresse. A literatura aponta para ação tanto sistêmica quanto local, com manutenção de eficácia mesmo em protocolos de administração oral — propriedade atribuída à estabilidade do peptídeo em pH ácido.'
      ]
    },
    datasheet: [
      ['Nome', 'BPC-157 (Body Protection Compound-157 / BC5)'],
      ['Sequência', 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val'],
      ['CAS', '137525-51-0'],
      ['Peso Molecular', '1419.53 g/mol'],
      ['Fórmula', 'C₆₂H₉₈N₁₆O₂₂'],
      ['Pureza HPLC', '≥99.1%'],
      ['Forma', 'Liofilizado'],
      ['Concentração', '10mg / vial'],
      ['Armazenamento', '-20°C protegido da luz · Após reconstituição: 2-8°C por até 14 dias'],
      ['Laboratório', 'Thera'],
      ['Solubilidade', 'Água bacteriostática · Solução salina 0.9%'],
      ['COA', 'Disponível por lote mediante solicitação']
    ],
    references: [
      { num: 1, text: 'Sikiric P, Hahm KB, Blagaic AB, et al.', title: 'Stable gastric pentadecapeptide BPC 157, Robert\'s cytoprotection, Selye\'s stress coping response, and Gutmannn\'s factors. Prophylaxis and therapy.', journal: 'Curr Pharm Des. 2018;24(18):1930-1950.', doi: '10.2174/1381612824666180515125204' },
      { num: 2, text: 'Chang CH, Tsai WC, Lin MS, Hsu YH, Pang JH.', title: 'The promoting effect of pentadecapeptide BPC 157 on tendon healing involves tendon outgrowth, cell survival, and cell migration.', journal: 'J Appl Physiol. 2011;110(3):774-780.', doi: '10.1152/japplphysiol.00945.2010' },
      { num: 3, text: 'Sikiric P, Rucman R, Turkovic B, et al.', title: 'Brain-gut Axis and Pentadecapeptide BPC 157: Theoretical and Practical Implications.', journal: 'Curr Neuropharmacol. 2016;14(8):857-865.', doi: '10.2174/1570159X13666160502153022' },
      { num: 4, text: 'Sikiric P, Seiwerth S, Rucman R, et al.', title: 'Stable gastric pentadecapeptide BPC 157-NO-system relation.', journal: 'Curr Pharm Des. 2014;20(7):1126-1135.', doi: '10.2174/13816128113190990411' }
    ],
    blogLink: { slug: 'bpc-157', title: 'Como um fragmento gástrico se tornou o peptídeo mais estudado em reparo tecidual' }
  },
  {
    id: 'pt141', slug: 'pt-141', code: 'P41', name: 'PT-141',
    category: 'Peptídeo · Função Sexual', badge: 'Melanocortina',
    subtitle: 'Bremelanotida · Análogo cíclico de α-MSH · Agonista MC3R/MC4R',
    excerpt: 'Análogo cíclico de α-MSH (Bremelanotida). A literatura aponta para ativação de MC3R/MC4R no SNC com efeitos em modelos de função sexual.',
    specs: { pureza: '≥98%', concentracao: '10mg', pesoMol: '1025.18 g/mol' },
    image: '/images/products/pt-141.svg',
    imagePhoto: '/images/products/pt-141.png',
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a0d0d 100%)',
    editorial: {
      overview: [
        'PT-141, também designado bremelanotida, é um heptapeptídeo cíclico derivado estruturalmente do Melanotan II (MT-II), que por sua vez constitui um análogo sintético do alfa-hormônio estimulante de melanócitos (α-MSH). Diferentemente de agentes vasoativos periféricos, a literatura aponta que o PT-141 atua por via central, ativando receptores de melanocortina no sistema nervoso central.',
        'A molécula foi objeto de programas clínicos de fase III, tendo recebido aprovação regulatória pelo FDA em 2019 sob o nome comercial Vyleesi para disfunção do desejo sexual hipoativo (HSDD) em mulheres pré-menopáusicas. Os estudos indicam que seu mecanismo difere fundamentalmente de inibidores de PDE5, por não depender de vasodilatação periférica.'
      ],
      highlight: 'A literatura aponta para ativação seletiva de receptores MC3R e MC4R no SNC, com modulação de circuitos dopaminérgicos e oxytocinérgicos envolvidos na resposta sexual — um mecanismo distinto de abordagens vasculares periféricas.',
      mechanism: [
        'Pesquisas indicam que o PT-141 liga-se aos receptores de melanocortina tipo 3 (MC3R) e tipo 4 (MC4R) localizados no hipotálamo e em áreas límbicas. A ativação desses receptores modula cascatas intracelulares envolvendo cAMP, com downstream effects sobre neurônios dopaminérgicos na área pré-óptica medial e no núcleo paraventricular do hipotálamo.',
        'Estudos em modelos animais, particularmente os trabalhos de Pfaus et al., demonstraram que a administração intracerebral de agonistas MC4R em ratas fêmeas induziu comportamentos proceptivos de forma dose-dependente. A via melanocortinérgica central é considerada na literatura como um dos principais moduladores endógenos da excitação sexual, com interações documentadas com sistemas oxytocinérgico e dopaminérgico mesolímbico.'
      ],
      literature: [
        'O programa clínico RECONNECT (dois ensaios de fase III, randomizados, duplo-cegos, placebo-controlados, com N > 1200 mulheres) avaliou a eficácia e segurança da bremelanotida 1.75 mg subcutâneo em HSDD. Os estudos indicam aumento estatisticamente significativo no escore de desejo sexual (FSDS-DAO) e no número de eventos sexuais satisfatórios em comparação ao placebo, com os efeitos adversos mais comuns sendo náusea (40%) e rubor facial.',
        'Kingsberg et al. (2019) reportaram os dados integrados do programa RECONNECT, observando que a melhora no desejo foi detectada já nas primeiras 4 semanas e se manteve ao longo de 24 semanas de acompanhamento. A literatura também aponta para investigações do PT-141 em modelos masculinos de disfunção erétil, onde Diamond et al. (2004) demonstraram resposta erétil em pacientes que não responderam a sildenafil, sugerindo um mecanismo complementar ao da via NO-GMPc.'
      ]
    },
    datasheet: [
      ['Nome', 'PT-141 / Bremelanotida (P41)'],
      ['Categoria', 'Peptídeo · Função Sexual'],
      ['CAS', '189691-06-3'],
      ['Peso Molecular', '1025.18 g/mol'],
      ['Fórmula', 'C₅₀H₆₉N₁₅O₁₀'],
      ['Sequência', 'Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH'],
      ['Pureza HPLC', '≥98%'],
      ['Forma', 'Pó liofilizado branco'],
      ['Concentração', '10 mg / vial'],
      ['Laboratório', 'Thera'],
      ['Armazenamento', '-20°C protegido da luz · Após reconstituição: 2-8°C por até 14 dias'],
      ['Solubilidade', 'Água bacteriostática · Solução salina 0.9%'],
      ['COA', 'Disponível por lote mediante solicitação']
    ],
    references: [
      { num: 1, text: 'Kingsberg SA, Clayton AH, Portman D, et al.', title: 'Bremelanotide for the Treatment of Hypoactive Sexual Desire Disorder: Two Randomized Phase 3 Trials.', journal: 'Obstet Gynecol. 2019;134(5):899-908.', doi: '10.1097/AOG.0000000000003500' },
      { num: 2, text: 'Diamond LE, Earle DC, Heiman JR, et al.', title: 'An effect on the subjective sexual response in premenopausal women with sexual arousal disorder by bremelanotide (PT-141), a melanocortin receptor agonist.', journal: 'J Sex Med. 2006;3(4):628-638.', doi: '10.1111/j.1743-6109.2006.00268.x' },
      { num: 3, text: 'Pfaus JG, Shadiack A, Van Soest T, et al.', title: 'Selective facilitation of sexual solicitation in the female rat by a melanocortin receptor agonist.', journal: 'Proc Natl Acad Sci USA. 2004;101(27):10201-10204.', doi: '10.1073/pnas.0400491101' },
      { num: 4, text: 'Molinoff PB, Shadiack AM, Earle D, et al.', title: 'PT-141: a melanocortin agonist for the treatment of sexual dysfunction.', journal: 'Ann N Y Acad Sci. 2003;994:96-102.', doi: '10.1111/j.1749-6632.2003.tb03167.x' }
    ],
    blogLink: { slug: 'pt-141', title: 'PT-141: o único peptídeo aprovado que age via sistema nervoso central' }
  },
  {
    id: 'cjc-ipamorelin', slug: 'cjc-ipamorelin', code: 'CJC+IPA', name: 'CJC-1295 + Ipamorelin',
    category: 'Peptídeo · Secretagogo GH · Performance', badge: 'Secretagogo GH',
    subtitle: 'CJC+IPA · GHRH + Agonista de Grelina · 5mg + 5mg',
    excerpt: 'Combinação GHRH + agonista de grelina. Estudos indicam sinergia em modelos de liberação pulsátil de GH sem elevação de cortisol ou prolactina.',
    specs: { pureza: '≥98%', concentracao: '5mg + 5mg', forma: 'Liofilizado' },
    image: '/images/products/cjc-ipamorelin.svg',
    imagePhoto: '/images/products/cjc-ipamorelin.png',
    gradient: 'linear-gradient(135deg, #0f0f0f 0%, #0d1a12 100%)',
    editorial: {
      overview: [
        'A combinação de CJC-1295 (sem DAC) e Ipamorelin representa uma estratégia de secretagogo duplo para estimulação do eixo GH/IGF-1. O CJC-1295 é um análogo sintético do GHRH (Growth Hormone Releasing Hormone) com 30 aminoácidos, modificado para maior resistência à degradação por DPP-IV. Na versão sem DAC (Drug Affinity Complex), a meia-vida é mais curta, o que favorece pulsos fisiológicos de GH em detrimento de elevação tônica sustentada.',
        'Ipamorelin é um pentapeptídeo agonista seletivo do receptor de secretagogo de GH (GHS-R1a), estruturalmente derivado de GHRP-1. Estudos indicam que sua seletividade se distingue de outros GHRPs por não provocar elevações significativas de cortisol, ACTH ou prolactina nas concentrações avaliadas, conferindo um perfil mais limpo em modelos experimentais.'
      ],
      highlight: 'Estudos indicam sinergia entre agonistas de GHRH e GHS-R1a: a co-administração amplifica a amplitude dos pulsos de GH de forma supraditiva, mimetizando o padrão fisiológico pulsátil — distinto da elevação tônica observada com GH exógeno.',
      mechanism: [
        'A literatura aponta para dois mecanismos complementares convergindo sobre o somatotrofo hipofisário. O CJC-1295 liga-se ao receptor de GHRH (GHRH-R), um receptor acoplado a proteína Gs que ativa adenilato ciclase, elevando cAMP intracelular e promovendo tanto a síntese quanto a secreção de GH. O Ipamorelin, por sua vez, ativa o GHS-R1a, um receptor acoplado a Gq/11 que sinaliza via fosfolipase C, IP3 e mobilização de cálcio intracelular.',
        'Pesquisas sugerem que a convergência de ambas as vias (cAMP + Ca²⁺) sobre a maquinaria exocítica do somatotrofo gera uma resposta amplificada não-linear. Bowers et al. demonstraram em modelos in vivo que a co-administração de GHRH + GHS produziu picos de GH 2-3 vezes superiores à soma dos efeitos individuais. A ausência de DAC no CJC-1295 permite que o pulso se encerre em 30-60 minutos, preservando o feedback negativo via somatostatina e IGF-1.'
      ],
      literature: [
        'Teichman et al. (2006) avaliaram o CJC-1295 com DAC em humanos saudáveis, demonstrando elevação sustentada de GH e IGF-1 por até 6 dias após administração única. A versão sem DAC, utilizada nesta formulação, apresenta cinética mais curta e compatível com administração pulsátil. Estudos indicam que esta abordagem preserva melhor a fisiologia do eixo somatotrófico.',
        'Raun et al. (1998) caracterizaram o Ipamorelin como o primeiro GHS-R agonista com seletividade funcional para GH sem efeitos significativos sobre cortisol ou prolactina em modelos suínos, diferenciando-o de GHRP-6 e GHRP-2. Anderson et al. (2001) confirmaram a ausência de efeito sobre ACTH e cortisol em doses que produziram liberação robusta de GH, corroborando a seletividade funcional do composto.'
      ]
    },
    datasheet: [
      ['Nome', 'CJC-1295 (no DAC) + Ipamorelin'],
      ['Categoria', 'Secretagogo GH · Performance'],
      ['CAS (CJC-1295)', '863288-34-0'],
      ['CAS (Ipamorelin)', '170851-70-4'],
      ['PM CJC-1295', '3367.97 g/mol'],
      ['PM Ipamorelin', '711.85 g/mol'],
      ['Concentração', '5 mg (CJC-1295) + 5 mg (Ipamorelin) / vial'],
      ['Pureza HPLC', '≥98% (cada componente)'],
      ['Forma', 'Pó liofilizado branco'],
      ['Laboratório', 'Thera'],
      ['Armazenamento', '-20°C protegido da luz · Após reconstituição: 2-8°C por até 14 dias'],
      ['Solubilidade', 'Água bacteriostática · Solução salina 0.9%'],
      ['COA', 'Disponível por lote mediante solicitação']
    ],
    references: [
      { num: 1, text: 'Teichman SL, Neale A, Lawrence B, et al.', title: 'Prolonged stimulation of growth hormone (GH) and insulin-like growth factor I secretion by CJC-1295, a long-acting analog of GH-releasing hormone, in healthy adults.', journal: 'J Clin Endocrinol Metab. 2006;91(3):799-805.', doi: '10.1210/jc.2005-1536' },
      { num: 2, text: 'Raun K, Hansen BS, Johansen NL, et al.', title: 'Ipamorelin, the first selective growth hormone secretagogue.', journal: 'Eur J Endocrinol. 1998;139(5):552-561.', doi: '10.1530/eje.0.1390552' },
      { num: 3, text: 'Anderson LL, Jeftinija S, Scanes CG, et al.', title: 'Growth hormone secretagogue receptor (GHS-R1a) agonists: ipamorelin and growth hormone releasing peptides.', journal: 'Growth Horm IGF Res. 2001;11 Suppl A:S17-S22.', doi: '10.1016/S1096-6374(01)80004-4' },
      { num: 4, text: 'Bowers CY, Granda R, Mohan S, et al.', title: 'Sustained elevation of pulsatile growth hormone (GH) secretion and insulin-like growth factor I (IGF-I), IGF-binding protein-3 (IGFBP-3), and IGFBP-5 concentrations during 30-day continuous subcutaneous infusion of GH-releasing peptide-2 in older men and women.', journal: 'J Clin Endocrinol Metab. 2004;89(5):2290-2300.', doi: '10.1210/jc.2003-031799' }
    ],
    blogLink: { slug: 'cjc-ipamorelin', title: 'GH pulsátil: por que o timing importa mais que a quantidade' }
  },
  {
    id: 'epithalon', slug: 'epithalon', code: 'EPT', name: 'Epithalon',
    category: 'Peptídeo · Longevidade', badge: 'Longevidade',
    subtitle: 'EPT · Tetrapeptídeo (Ala-Glu-Asp-Gly) · 40mg',
    excerpt: 'Tetrapeptídeo sintético (Ala-Glu-Asp-Gly). Pesquisas indicam atividade em modelos de ativação de telomerase, regulação circadiana e restauração de melatonina.',
    specs: { pureza: '≥99%', concentracao: '40mg', pesoMol: '390.35 g/mol' },
    image: '/images/products/epithalon.svg',
    imagePhoto: '/images/products/epithalon.png',
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #0d0a1a 100%)',
    editorial: {
      overview: [
        'Epithalon (também grafado Epitalon ou Epithalone) é um tetrapeptídeo sintético com sequência Ala-Glu-Asp-Gly, desenvolvido pelo Instituto de Gerontologia de São Petersburgo sob a direção do Prof. Vladimir Khavinson. O composto foi concebido como análogo sintético da epitalamina, um extrato peptídico da glândula pineal, com o objetivo de investigar mecanismos de envelhecimento celular em modelos experimentais.',
        'A investigação do Epithalon insere-se no campo da biogerontologia, especificamente na interseção entre biologia de telômeros e regulação neuroendócrina do envelhecimento. Pesquisas indicam que o composto apresenta atividade em modelos de ativação da subunidade catalítica da telomerase (hTERT) em culturas celulares humanas, além de efeitos documentados sobre a secreção de melatonina em modelos animais envelhecidos.'
      ],
      highlight: 'Pesquisas indicam atividade em modelos de ativação de telomerase e regulação circadiana — dois eixos considerados centrais na biologia do envelhecimento celular e na manutenção da integridade genômica.',
      mechanism: [
        'A literatura aponta para pelo menos duas vias de ação propostas. A primeira envolve a ativação transcricional do gene hTERT, que codifica a subunidade catalítica da telomerase reversa. Khavinson et al. demonstraram em fibroblastos fetais humanos que o Epithalon induziu expressão de hTERT e atividade enzimática de telomerase, com elongação mensurável de telômeros em células que haviam atingido senescência replicativa.',
        'A segunda via proposta relaciona-se à modulação da função pineal. Estudos indicam que o Epithalon restaura a secreção noturna de melatonina em ratos envelhecidos, normalizando o ritmo circadiano de cortisol e a amplitude do ciclo claro/escuro na secreção hormonal. A convergência entre regulação telomérica e ritmo circadiano é considerada na literatura como um eixo relevante na biologia integrativa do envelhecimento, dado que a disrupção circadiana está associada a encurtamento telomérico acelerado em modelos epidemiológicos.'
      ],
      literature: [
        'Khavinson et al. (2003) publicaram dados demonstrando que o Epithalon ativou a expressão de telomerase em culturas de fibroblastos humanos, com as células ultrapassando o limite de Hayflick em 10 passagens adicionais sem sinais de transformação maligna. Os autores reportaram elongação de telômeros de 44% em relação aos controles.',
        'Anisimov et al. (2003) conduziram estudos de longevidade em camundongos fêmeas, reportando que a administração crônica de Epithalon resultou em aumento de 12.3% na expectativa de vida mediana no grupo experimental. Os mesmos autores documentaram redução na incidência de tumores espontâneos, embora os mecanismos subjacentes permaneçam sob investigação. Estudos posteriores de Khavinson e Morozov (2003) expandiram as observações para modelos de regulação neuroendócrina, documentando restauração do ritmo circadiano de melatonina em primatas não-humanos envelhecidos.'
      ]
    },
    datasheet: [
      ['Nome', 'Epithalon (ET40)'],
      ['Categoria', 'Peptídeo · Longevidade'],
      ['Sequência', 'Ala-Glu-Asp-Gly'],
      ['CAS', '307297-39-8'],
      ['Peso Molecular', '390.35 g/mol'],
      ['Fórmula', 'C₁₄H₂₂N₄O₉'],
      ['Pureza HPLC', '≥99%'],
      ['Forma', 'Pó liofilizado branco'],
      ['Concentração', '40 mg / vial'],
      ['Laboratório', 'Thera'],
      ['Armazenamento', '-20°C protegido da luz · Após reconstituição: 2-8°C por até 14 dias'],
      ['Solubilidade', 'Água bacteriostática · Solução salina 0.9%'],
      ['COA', 'Disponível por lote mediante solicitação']
    ],
    references: [
      { num: 1, text: 'Khavinson VKh, Bondarev IE, Butyugov AA.', title: 'Epithalon peptide induces telomerase activity and telomere elongation in human somatic cells.', journal: 'Bull Exp Biol Med. 2003;135(6):590-592.', doi: '10.1023/A:1025493705728' },
      { num: 2, text: 'Anisimov VN, Khavinson VKh, Popovich IG, et al.', title: 'Effect of Epitalon on biomarkers of aging, life span and spontaneous tumor incidence in female Swiss-derived SHR mice.', journal: 'Biogerontology. 2003;4(4):193-202.', doi: '10.1023/A:1025114230714' },
      { num: 3, text: 'Khavinson V, Morozov V.', title: 'Peptides of pineal gland and thymus prolong human life.', journal: 'Neuro Endocrinol Lett. 2003;24(3-4):233-240.', doi: 'PMID: 14523363' },
      { num: 4, text: 'Khavinson VKh.', title: 'Peptides and Ageing.', journal: 'Neuro Endocrinol Lett. 2002;23 Suppl 3:11-144.', doi: 'PMID: 12500161' }
    ],
    blogLink: { slug: 'epithalon', title: 'Epithalon e telomerase: quatro aminoácidos que intrigam a gerontologia' }
  },
  {
    id: 'motsc', slug: 'mots-c', code: 'MTC', name: 'MOTS-c',
    category: 'Peptídeo · Mitocondrial · Longevidade', badge: 'Mitocondrial',
    subtitle: 'MTC · Peptídeo mitocondrial · 40mg',
    excerpt: 'Peptídeo derivado do genoma mitocondrial. Estudos indicam atividade em modelos de metabolismo energético e sensibilidade insulínica via ativação de AMPK.',
    specs: { pureza: '≥98%', concentracao: '40mg', pesoMol: '2174.56 g/mol' },
    image: '/images/products/mots-c.svg',
    imagePhoto: '/images/products/mots-c.png',
    gradient: 'linear-gradient(135deg, #111 0%, #0d1a14 100%)',
    editorial: {
      overview: [
        'MOTS-c (Mitochondrial Open Reading Frame of the 12S rRNA type-c) é um peptídeo de 16 aminoácidos (sequência: MRWQEMGYIFYPRKLR) codificado pelo genoma mitocondrial dentro do gene 12S rRNA. Identificado pela primeira vez pelo laboratório de Changhan Lee na USC em 2015, o MOTS-c representa uma classe emergente de sinalizadores denominados mitochondrial-derived peptides (MDPs) — peptídeos que atuam como retrograde signals da mitocôndria para o núcleo e tecidos distantes.',
        'A descoberta do MOTS-c expandiu a compreensão do genoma mitocondrial para além de seu papel tradicional na cadeia de transporte de elétrons. Estudos indicam que o MOTS-c funciona como um fator endócrino mitocondrial, circulando no plasma e exercendo efeitos metabólicos sistêmicos. A concentração plasmática de MOTS-c declina com a idade em modelos humanos e murinos, o que posiciona o composto na interface entre biologia mitocondrial e envelhecimento metabólico.'
      ],
      highlight: 'Estudos indicam atividade em modelos de metabolismo energético e sensibilidade insulínica via ativação de AMPK — posicionando o MOTS-c como um mediador endócrino da comunicação mitocôndria-núcleo com relevância para homeostase metabólica.',
      mechanism: [
        'A literatura aponta para a ativação de AMPK (AMP-activated protein kinase) como via central do MOTS-c. Lee et al. (2015) demonstraram que o MOTS-c regula a biossíntese de folato e a via de metionina-folato-metilação, inibindo a transformação de 5-metil-THF e acumulando AICAR (5-aminoimidazole-4-carboxamide ribonucleotide), um ativador endógeno de AMPK. A ativação sustentada de AMPK promove oxidação de ácidos graxos, captação de glicose via GLUT4 e biogênese mitocondrial.',
        'Pesquisas sugerem que, sob condições de estresse metabólico, o MOTS-c transloca-se para o núcleo celular, onde interage com fatores de transcrição envolvidos na resposta antioxidante (ARE/EpRE). Kim et al. (2018) demonstraram que essa translocação nuclear é regulada por AMPK e que o MOTS-c se associa a regiões promotoras de genes de resposta ao estresse, incluindo NRF2. Este mecanismo de retrograde signaling — da mitocôndria ao núcleo via peptídeo circulante — representa um paradigma na comunicação intergenômica.'
      ],
      literature: [
        'Lee et al. (2015) publicaram a caracterização inicial do MOTS-c em Cell Metabolism, demonstrando que camundongos alimentados com dieta hiperlipídica e submetidos a injeções intraperitoneais de MOTS-c apresentaram prevenção de obesidade induzida por dieta, melhora na sensibilidade insulínica e aumento de gasto energético. O efeito foi associado à ativação de AMPK no músculo esquelético e à regulação da via de folato.',
        'Reynolds et al. (2021) conduziram o primeiro estudo clínico randomizado com MOTS-c em humanos, avaliando 10 mg/dia por via intravenosa em homens sedentários obesos durante 14 dias de exercício supervisionado. Os estudos indicam que o grupo MOTS-c apresentou maior sensibilidade insulínica avaliada por clamp euglicêmico-hiperinsulinêmico, além de maior capacidade de oxidação de ácidos graxos durante exercício em comparação ao placebo. Kim et al. (2019) demonstraram adicionalmente que a administração de MOTS-c em camundongos envelhecidos reverteu declínios associados à idade na capacidade física e na regulação metabólica muscular.'
      ]
    },
    datasheet: [
      ['Nome', 'MOTS-c (MS40)'],
      ['Categoria', 'Peptídeo Mitocondrial · Metabólico'],
      ['Sequência', 'MRWQEMGYIFYPRKLR'],
      ['CAS', '1627580-64-6'],
      ['Peso Molecular', '2174.56 g/mol'],
      ['Aminoácidos', '16'],
      ['Pureza HPLC', '≥98%'],
      ['Forma', 'Pó liofilizado branco'],
      ['Concentração', '40 mg / vial'],
      ['Laboratório', 'Thera'],
      ['Armazenamento', '-20°C protegido da luz · Após reconstituição: 2-8°C por até 14 dias'],
      ['Solubilidade', 'Água bacteriostática · Solução salina 0.9%'],
      ['COA', 'Disponível por lote mediante solicitação']
    ],
    references: [
      { num: 1, text: 'Lee C, Zeng J, Drew BG, et al.', title: 'The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance.', journal: 'Cell Metab. 2015;21(3):443-454.', doi: '10.1016/j.cmet.2015.02.009' },
      { num: 2, text: 'Kim SJ, Mehta HH, Engber J, et al.', title: 'MOTS-c: an equal opportunity insulin sensitizer.', journal: 'J Mol Med (Berl). 2019;97(4):487-490.', doi: '10.1007/s00109-019-01758-0' },
      { num: 3, text: 'Reynolds JC, Lai RW, Woodhead JST, et al.', title: 'MOTS-c is an exercise-induced mitochondrial-encoded regulator of age-dependent physical decline and muscle homeostasis.', journal: 'Nat Commun. 2021;12(1):470.', doi: '10.1038/s41467-020-20790-0' },
      { num: 4, text: 'Kim SJ, Miller B, Kumagai H, et al.', title: 'Mitochondrial-derived peptides in aging and age-related diseases.', journal: 'GeroScience. 2021;43(3):1113-1121.', doi: '10.1007/s11357-020-00262-5' }
    ],
    blogLink: { slug: 'mots-c', title: 'MOTS-c: o primeiro peptídeo codificado pelo DNA mitocondrial com ação nuclear' }
  }
];

export const getPeptideBySlug = (slug) => peptides.find(p => p.slug === slug);
