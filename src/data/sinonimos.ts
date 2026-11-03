// Dicionário da busca interna (/busca/).
//
// Cada linha diz: "quando a pessoa escrever qualquer uma destas palavras ou frases
// (`dizem`), procure também estas palavras (`procurar`), que são as usadas nos artigos."
//
// - `dizem`: como o leitor fala, inclusive gíria e erro de grafia comum. Não precisa
//   repetir acento nem maiúscula. Pode ter frase ("pressão alta").
// - `procurar`: só palavras soltas, do jeito que aparecem nos artigos.
// - Erros leves de digitação (uma letra trocada) a busca já perdoa sozinha; aqui entram
//   os casos em que o leitor usa OUTRA palavra ou erra o som da palavra.
// - Para acrescentar: copie uma linha, troque as palavras. Vale no próximo build.

export interface Sinonimo {
  dizem: string[];
  procurar: string[];
}

export const SINONIMOS: Sinonimo[] = [
  // — Doenças e exames do dia a dia —
  { dizem: ['pressão alta', 'pressão', 'hipertensão', 'hipertenso', 'ipertensao', 'pressão subiu', 'pressão 14'], procurar: ['pressao', 'hipertensao'] },
  { dizem: ['pressão baixa', 'queda de pressão'], procurar: ['pressao', 'tontura', 'desmaio'] },
  { dizem: ['açúcar alto', 'açúcar no sangue', 'asucar', 'diabete', 'diabetis', 'diabético', 'glicose', 'glicemia'], procurar: ['diabetes', 'glicemia', 'glicose'] },
  { dizem: ['colesterol', 'colesterou', 'gordura no sangue', 'triglicerídeos'], procurar: ['colesterol'] },
  { dizem: ['izame', 'ezame', 'exami', 'exame de sangue', 'exame de rotina', 'check-up', 'checkup'], procurar: ['exame', 'exames'] },
  { dizem: ['infecção', 'infeccao', 'inflamação', 'pneumonia', 'pulmonia', 'febre', 'tosse'], procurar: ['infeccao', 'pneumonia', 'febre'] },
  { dizem: ['infecção de urina', 'infecção urinária', 'itu'], procurar: ['infeccao', 'urinaria', 'urina'] },
  { dizem: ['avc', 'derrame', 'isquemia', 'trombose'], procurar: ['avc'] },
  { dizem: ['parkinson', 'tremedeira', 'tremor'], procurar: ['parkinson'] },
  { dizem: ['dor', 'dores', 'doendo', 'dolorido', 'dor no corpo'], procurar: ['dor'] },

  // — Memória e demência —
  { dizem: ['alzaimer', 'alzaimar', 'auzaimer', 'alzhaimer', 'alzheimer', 'mal de alzheimer'], procurar: ['alzheimer', 'demencia'] },
  { dizem: ['esquecimento', 'esquecendo', 'esquece tudo', 'esqueceu', 'memória fraca', 'memória ruim', 'lapso', 'branco'], procurar: ['esquecer', 'esquecimento', 'memoria'] },
  { dizem: ['caduco', 'caducando', 'caduquice', 'gagá', 'esclerose', 'esclerosado', 'esclerosada', 'senil', 'senilidade', 'demensia', 'demência senil', 'perdendo a cabeça', 'ficando doido'], procurar: ['demencia', 'alzheimer', 'memoria'] },
  { dizem: ['repete', 'repetindo', 'repetitivo', 'mesma pergunta', 'pergunta de novo', 'conta a mesma história', 'repete a mesma coisa'], procurar: ['pergunta', 'repetir', 'memoria', 'demencia'] },
  { dizem: ['não me reconhece', 'não reconhece', 'não sabe quem sou', 'se perdeu', 'se perde na rua', 'perdido'], procurar: ['reconhece', 'perdido', 'demencia', 'desorientacao'] },

  // — Confusão, agitação, humor —
  { dizem: ['confuso', 'confusa', 'confusão', 'variando', 'avoado', 'avoada', 'fora de si', 'desorientado', 'desorientada', 'delírium', 'deliriun', 'delirio agudo'], procurar: ['confusao', 'delirium', 'desorientacao'] },
  { dizem: ['alucinação', 'alucinacao', 'vendo coisas', 've coisas', 'vendo gente', 've gente', 'vendo bichos', 'escuta vozes', 'ouve vozes', 'paranoia', 'desconfiança', 'acusa de roubo', 'dizendo que roubaram'], procurar: ['alucinacoes', 'delirios', 'roubo'] },
  { dizem: ['agitado', 'agitada', 'nervoso', 'nervosa', 'inquieto', 'inquieta', 'irritado', 'irritada', 'agressivo', 'agressiva', 'bravo', 'brigando', 'não sossega', 'não para quieto', 'andando de um lado para o outro', 'vagando', 'perambulando'], procurar: ['agitacao', 'sossegar', 'inquietacao', 'comportamento', 'agressividade'] },
  { dizem: ['fim de tarde', 'final da tarde', 'anoitecer', 'sol baixa', 'sundowning', 'por do sol', 'piora à tarde', 'piora de tarde', 'piora ao anoitecer'], procurar: ['entardecer', 'tarde', 'agitacao'] },
  { dizem: ['triste', 'tristeza', 'deprimido', 'deprimida', 'depressão', 'desânimo', 'desanimado', 'sem vontade', 'sem ânimo', 'apático', 'apática', 'apatia', 'quieto demais', 'chorando', 'choro'], procurar: ['vontade', 'depressao', 'apatia', 'tristeza'] },
  { dizem: ['ansioso', 'ansiosa', 'ansiedade', 'angústia', 'aflito', 'aflita', 'preocupado', 'medo'], procurar: ['ansiedade'] },

  // — Sono —
  { dizem: ['insônia', 'não durmo', 'não consegue dormir', 'dormindo mal', 'sono ruim', 'acorda de madrugada', 'acorda à noite', 'noite em claro', 'troca o dia pela noite', 'dia e noite trocados'], procurar: ['sono', 'dormir', 'insonia', 'noite', 'madrugada'] },
  { dizem: ['remédio para dormir', 'remédio de dormir', 'calmante', 'sonífero', 'tarja preta', 'rivotril', 'clonazepam', 'diazepam', 'lorazepam', 'alprazolam', 'lexotan', 'frontal', 'dormonid', 'zolpidem', 'stilnox', 'benzodiazepínico', 'benzodiazepinicos'], procurar: ['calmante', 'benzodiazepinicos', 'sono', 'medicamentos'] },

  // — Quedas, equilíbrio, ossos —
  { dizem: ['tombo', 'tombos', 'tombou', 'caiu', 'caindo', 'cair', 'escorregou', 'escorregar', 'tropeçou', 'tropeçar', 'trupicou', 'desequilibrou', 'desequilíbrio'], procurar: ['quedas', 'queda', 'equilibrio'] },
  { dizem: ['tontura', 'tonto', 'tonta', 'zonzo', 'zonza', 'vertigem', 'labirintite', 'cabeça rodando', 'tonteira', 'desmaio', 'desmaiou', 'apagão', 'passou mal'], procurar: ['tontura', 'vertigem', 'desmaio', 'equilibrio'] },
  { dizem: ['quebrou o fêmur', 'quebrou a bacia', 'quebrou o osso', 'quebrar osso', 'fratura', 'fraturou', 'osso', 'ossos', 'osteoporose', 'osteoporoze', 'ostioporose', 'osteopenia', 'descalcificação', 'descalcificado', 'ossos fracos', 'cálcio'], procurar: ['fratura', 'osteoporose', 'ossos', 'calcio'] },
  { dizem: ['tapete', 'escada', 'corrimão', 'barra de apoio', 'iluminação', 'piso escorregadio', 'casa segura', 'adaptar a casa', 'andador', 'bengala'], procurar: ['seguranca', 'tapete', 'escada', 'banheiro', 'quedas', 'andador', 'bengala'] },

  // — Músculo, peso, exercício —
  { dizem: ['músculo', 'músculos', 'musculatura', 'fraqueza', 'fraco', 'fraca', 'perna fraca', 'pernas fracas', 'sem força', 'perdendo massa', 'perda de massa', 'massa muscular', 'sarcopenia', 'sarcopênia'], procurar: ['musculo', 'forca', 'sarcopenia', 'fraqueza', 'massa'] },
  { dizem: ['frágil', 'fragilidade', 'magrinho', 'magrinha', 'emagrecendo', 'emagreceu', 'emagrecimento', 'perdendo peso', 'perda de peso', 'magreza', 'definhando', 'murchando'], procurar: ['fragilidade', 'peso', 'sarcopenia', 'nutricional'] },
  { dizem: ['academia', 'musculação', 'ginástica', 'caminhada', 'caminhar', 'treino', 'treinar', 'atividade física', 'pilates', 'hidroginástica', 'natação', 'alongamento', 'malhar', 'malhando', 'ezercicio', 'exercicio'], procurar: ['exercicio', 'atividade', 'caminhada', 'treino'] },
  { dizem: ['fôlego', 'falta de ar', 'cansaço', 'cansado', 'cansada', 'ofegante', 'sem fôlego', 'canseira', 'dispneia'], procurar: ['folego', 'cansaco'] },

  // — Alimentação —
  { dizem: ['comida', 'comer', 'refeição', 'dieta', 'nutrição', 'apetite', 'sem fome', 'não quer comer', 'não come', 'recusa comida', 'almoço', 'jantar', 'café da manhã', 'lanche', 'alimentassao'], procurar: ['alimentacao', 'comida', 'apetite', 'refeicao', 'nutricao'] },
  { dizem: ['proteína', 'proteina', 'carne', 'ovo', 'ovos', 'leite', 'iogurte', 'frango', 'peixe', 'whey', 'albumina'], procurar: ['proteina', 'suplemento'] },
  { dizem: ['vitamina', 'vitaminas', 'suplemento', 'suplementos', 'b12', 'vitamina d', 'ômega 3', 'creatina', 'colágeno', 'multivitamínico'], procurar: ['vitamina', 'suplemento'] },
  { dizem: ['engasgo', 'engasgar', 'engasgando', 'engasgou', 'sufoca', 'disfagia', 'disfajia', 'dificuldade para engolir', 'dificuldade de engolir', 'não consegue engolir', 'mastigar', 'mastigação', 'dentadura', 'prótese dentária'], procurar: ['engolir', 'disfagia', 'engasgo', 'mastigar'] },
  { dizem: ['sede', 'hidratação', 'desidratação', 'desidratado', 'água', 'líquidos', 'não bebe água'], procurar: ['desidratacao', 'agua', 'liquidos', 'sede'] },

  // — Xixi, intestino, pele, banho —
  { dizem: ['xixi', 'urina', 'urinar', 'perde xixi', 'escapa xixi', 'fralda', 'escape de urina', 'bexiga', 'bexiga solta', 'incontinência', 'encontinencia', 'incontinensia', 'molhando a cama', 'não chega ao banheiro'], procurar: ['incontinencia', 'urina', 'bexiga', 'fralda'] },
  { dizem: ['prisão de ventre', 'intestino preso', 'intestino travado', 'constipação', 'constipaçao', 'obstipação', 'cocô', 'coco', 'fezes', 'evacuar', 'laxante', 'intestino'], procurar: ['intestino', 'constipacao', 'laxante', 'fezes'] },
  { dizem: ['ferida', 'feridas', 'escara', 'escaras', 'úlcera', 'ulcera de pressão', 'assadura', 'coceira', 'pele seca', 'ressecada', 'manchas na pele', 'hidratante', 'protetor solar', 'pele'], procurar: ['pele', 'ferida', 'escara', 'ressecada', 'coceira'] },
  { dizem: ['banho', 'tomar banho', 'não quer tomar banho', 'recusa o banho', 'chuveiro', 'banheiro', 'higiene', 'se lavar'], procurar: ['banho', 'banheiro', 'higiene'] },

  // — Sentidos —
  { dizem: ['surdo', 'surda', 'surdez', 'ouvir mal', 'ouve mal', 'não escuta', 'não ouve', 'televisão alta', 'tv alta', 'aparelho de surdez', 'aparelho auditivo', 'otorrino', 'ouvido', 'orelha', 'zumbido'], procurar: ['audicao', 'surdez', 'ouvir', 'ouvido', 'aparelho', 'televisao'] },
  { dizem: ['vista', 'visão', 'óculos', 'enxerga mal', 'não enxerga', 'catarata', 'oftalmologista'], procurar: ['visao', 'oculos', 'vista', 'catarata'] },

  // — Remédios —
  { dizem: ['remédio', 'remedio', 'remédios', 'medicamento', 'medicamentos', 'medicação', 'comprimido', 'comprimidos', 'pílula', 'pílulas', 'tomar remédio', 'remedeo'], procurar: ['remedios', 'medicamentos', 'medicacao'] },
  { dizem: ['muitos remédios', 'remédio demais', 'tomo muito remédio', 'coquetel de remédios', 'polifarmácia', 'poli farmácia', 'revisar remédios', 'tirar remédio', 'suspender remédio'], procurar: ['polifarmacia', 'remedios', 'prescricao', 'medicamentos'] },
  { dizem: ['receita', 'receituário', 'prescrição', 'prescricao', 'receita médica'], procurar: ['receita', 'prescricao'] },
  { dizem: ['antipsicótico', 'antipsicoticos', 'haldol', 'haloperidol', 'risperidona', 'risperdal', 'quetiapina', 'seroquel'], procurar: ['antipsicoticos', 'agitacao', 'medicamentos'] },
  { dizem: ['antidepressivo', 'antidepressivos', 'sertralina', 'escitalopram', 'fluoxetina', 'prozac'], procurar: ['antidepressivos', 'depressao', 'medicamentos'] },
  { dizem: ['organizar remédios', 'caixa de remédios', 'caixinha de remédios', 'pastilheiro', 'horário do remédio', 'esqueci de tomar'], procurar: ['caixa', 'organizar', 'horario', 'remedios'] },

  // — Cuidador, família, instituição —
  { dizem: ['cuidador', 'cuidadora', 'quem cuida', 'cuidar da mãe', 'cuidar do pai', 'cuidando da minha mãe', 'cuidando do meu pai', 'esgotamento', 'esgotada', 'exausta', 'exausto', 'estresse', 'sobrecarga', 'burnout', 'cansaço do cuidador'], procurar: ['cuidador', 'cuida', 'sobrecarga', 'esgotamento', 'estresse'] },
  { dizem: ['asilo', 'casa de repouso', 'lar de idosos', 'clínica de idosos', 'abrigo', 'ilpi', 'instituição', 'longa permanência', 'internar a mãe', 'colocar no asilo'], procurar: ['instituicoes', 'permanencia', 'ilpi', 'asilo'] },
  { dizem: ['hospital', 'internação', 'internado', 'internada', 'internar', 'uti', 'pronto socorro', 'pronto atendimento', 'upa', 'samu', '192', 'emergência', 'urgência'], procurar: ['hospital', 'internacao', 'emergencia', 'urgencia', 'samu'] },
  { dizem: ['alta hospitalar', 'alta do hospital', 'receber alta', 'voltar para casa'], procurar: ['hospital', 'internacao', 'recuperacao'] },
  { dizem: ['acompanhante', 'ficar com ele no hospital', 'dormir no hospital'], procurar: ['acompanhante', 'hospital', 'internacao'] },

  // — Consulta e geriatria —
  { dizem: ['geriatra', 'geriatria', 'médico de idoso', 'consulta', 'primeira consulta', 'o que levar ao médico', 'o que levar na consulta', 'retorno', 'acompanhamento'], procurar: ['consulta', 'geriatrica', 'geriatria'] },
  { dizem: ['independência', 'independente', 'dependente', 'dependência', 'autonomia', 'se virar sozinho', 'atividades do dia a dia', 'avd', 'funcionalidade'], procurar: ['autonomia', 'independencia', 'funcionalidade'] },
  { dizem: ['longevidade', 'viver mais', 'viver bem', 'envelhecer', 'envelhecimento', 'velhice', 'terceira idade', 'melhor idade', 'velho', 'velha', 'vovó', 'vovô', 'ancião'], procurar: ['envelhecer', 'envelhecimento', 'longevidade', 'velhice'] },
  { dizem: ['sinais de alerta', 'perigo', 'grave', 'gravidade', 'quando procurar', 'quando levar ao hospital', 'piorou de repente', 'mudou de repente', 'não está igual'], procurar: ['alerta', 'sinais', 'emergencia', 'repente'] },
  { dizem: ['cabeça', 'cérebro', 'neurologista', 'neuro'], procurar: ['cerebro', 'neurologista'] },
  { dizem: ['fisioterapia', 'fisioterapeuta', 'fisio', 'reabilitação'], procurar: ['fisioterapia', 'fisioterapeuta'] },
];
