
import { DISCQuestion } from './types';

export const DISC_DIMENSIONS = {
  D: {
    name: 'Dominância',
    color: '#ef4444',
    description: 'Focado em resultados, desafios e ação rápida.',
  },
  I: {
    name: 'Influência',
    color: '#f59e0b',
    description: 'Focado em pessoas, entusiasmo e persuasão.',
  },
  S: {
    name: 'Estabilidade',
    color: '#10b981',
    description: 'Focado em cooperação, sinceridade e confiabilidade.',
  },
  C: {
    name: 'Conformidade',
    color: '#3b82f6',
    description: 'Focado em qualidade, precisão e competência.',
  }
};

export const DISC_QUESTIONS: DISCQuestion[] = [
  {
    id: 1,
    question: "Quando você acorda no fim de semana sem compromissos, você geralmente...",
    options: [
      { id: 'A', text: "Já acorda pensando no que vai resolver ou fazer de produtivo", dimension: 'D' },
      { id: 'B', text: "Fica animado pensando em quem vai encontrar ou conversar", dimension: 'I' },
      { id: 'C', text: "Curte o momento calmo, sem pressa de sair da cama", dimension: 'S' },
      { id: 'D', text: "Planeja mentalmente como organizar o dia da melhor forma", dimension: 'C' }
    ]
  },
  {
    id: 2,
    question: "Em uma discussão com alguém próximo, você tende a...",
    options: [
      { id: 'A', text: "Falar direto o que pensa, mesmo que seja difícil de ouvir", dimension: 'D' },
      { id: 'B', text: "Tentar aliviar o clima e buscar um meio-termo rapidamente", dimension: 'I' },
      { id: 'C', text: "Ouvir bastante antes de dar sua opinião", dimension: 'S' },
      { id: 'D', text: "Analisar os dois lados e apontar onde está a lógica ou o erro", dimension: 'C' }
    ]
  },
  {
    id: 3,
    question: "Quando precisa tomar uma decisão importante na vida, você...",
    options: [
      { id: 'A', text: "Decide rápido, confiando no seu instinto", dimension: 'D' },
      { id: 'B', text: "Conversar com várias pessoas para ouvir opiniões", dimension: 'I' },
      { id: 'C', text: "Leva tempo, pesa os prós e contras com calma", dimension: 'S' },
      { id: 'D', text: "Pesquisa muito, analisa dados e só decide quando tem certeza", dimension: 'C' }
    ]
  },
  {
    id: 4,
    question: "Em uma festa ou encontro social, você é aquela pessoa que...",
    options: [
      { id: 'A', text: "Chega, resolve o que foi fazer e não fica muito tempo", dimension: 'D' },
      { id: 'B', text: "Conhece gente nova, conversa com todo mundo e é o último a ir embora", dimension: 'I' },
      { id: 'C', text: "Fica mais na sua, conversando com pessoas que já conhece", dimension: 'S' },
      { id: 'D', text: "Observa o ambiente e escolhe com cuidado com quem vai interagir", dimension: 'C' }
    ]
  },
  {
    id: 5,
    question: "Quando um amigo te conta um problema, sua primeira reação é...",
    options: [
      { id: 'A', text: "Dar uma solução prática e direta", dimension: 'D' },
      { id: 'B', text: "Dar apoio emocional, animar e mostrar o lado positivo", dimension: 'I' },
      { id: 'C', text: "Ouvir com paciência, sem interromper", dimension: 'S' },
      { id: 'D', text: "Fazer perguntas para entender todos os detalhes antes de opinar", dimension: 'C' }
    ]
  },
  {
    id: 6,
    question: "O que mais te frustra no dia a dia?",
    options: [
      { id: 'A', text: "Pessoas lentas, indecisas ou que enrolam demais", dimension: 'D' },
      { id: 'B', text: "Ambientes sérios demais, rotina repetitiva ou ficar sozinho muito tempo", dimension: 'I' },
      { id: 'C', text: "Conflitos, pressão excessiva ou mudanças bruscas", dimension: 'S' },
      { id: 'D', text: "Desorganização, erros evitáveis ou pessoas que não cumprem o combinado", dimension: 'C' }
    ]
  },
  {
    id: 7,
    question: "Quando você erra ou falha em algo, você geralmente...",
    options: [
      { id: 'A', text: "Fica irritado consigo mesmo, mas logo parte pra resolver", dimension: 'D' },
      { id: 'B', text: "Fica chateado, mas tenta não se cobrar demais e segue em frente", dimension: 'I' },
      { id: 'C', text: "Fica remoendo por um tempo, mas não demonstra muito", dimension: 'S' },
      { id: 'D', text: "Analisa detalhadamente o que deu errado para não repetir", dimension: 'C' }
    ]
  },
  {
    id: 8,
    question: "Em um grupo de amigos, você naturalmente assume o papel de...",
    options: [
      { id: 'A', text: "Quem decide o que fazer e organiza as coisas", dimension: 'D' },
      { id: 'B', text: "Quem anima, faz piada e mantém o clima leve", dimension: 'I' },
      { id: 'C', text: "Quem está sempre disponível e apoia todo mundo", dimension: 'S' },
      { id: 'D', text: "Quem lembra dos detalhes, planeja a logística ou pesquisa as opções", dimension: 'C' }
    ]
  },
  {
    id: 9,
    question: "Quando você está estressado ou sobrecarregado, você tende a...",
    options: [
      { id: 'A', text: "Ficar impaciente, querer resolver tudo de uma vez", dimension: 'D' },
      { id: 'B', text: "Falar demais, se dispersar ou buscar distração", dimension: 'I' },
      { id: 'C', text: "Se isolar, ficar quieto e guardar pra si", dimension: 'S' },
      { id: 'D', text: "Ficar crítico, perfeccionista ou travado nos detalhes", dimension: 'C' }
    ]
  },
  {
    id: 10,
    question: "O que te faz sentir realizado e feliz?",
    options: [
      { id: 'A', text: "Conquistar objetivos, vencer desafios, ver resultados concretos", dimension: 'D' },
      { id: 'B', text: "Estar cercado de pessoas, ser reconhecido, viver experiências novas", dimension: 'I' },
      { id: 'C', text: "Ter paz, estabilidade, relacionamentos harmoniosos", dimension: 'S' },
      { id: 'D', text: "Fazer as coisas bem feitas, com qualidade e organização", dimension: 'C' }
    ]
  },
  {
    id: 11,
    question: "Em um relacionamento amoroso, você é uma pessoa que...",
    options: [
      { id: 'A', text: "Gosta de parceiros independentes, não curte carência ou drama", dimension: 'D' },
      { id: 'B', text: "É expressivo, demonstra afeto, gosta de momentos juntos e novidades", dimension: 'I' },
      { id: 'C', text: "É leal, dedicado, valoriza a rotina e a segurança do casal", dimension: 'S' },
      { id: 'D', text: "Demonstra amor através de ações práticas, presentes pensados ou palavras bem escolhidas", dimension: 'C' }
    ]
  },
  {
    id: 12,
    question: "Quando fazem uma crítica a você, sua reação interna é...",
    options: [
      { id: 'A', text: "Ficar na defensiva ou rebater se achar injusta", dimension: 'D' },
      { id: 'B', text: "Ficar magoado, mas tentar não demonstrar", dimension: 'I' },
      { id: 'C', text: "Aceitar calado, mesmo que doa por dentro", dimension: 'S' },
      { id: 'D', text: "Analisa se a crítica faz sentido antes de reagir", dimension: 'C' }
    ]
  },
  {
    id: 13,
    question: "Seu maior medo na vida é...",
    options: [
      { id: 'A', text: "Perder o controle, ser passado pra trás ou parecer fraco", dimension: 'D' },
      { id: 'B', text: "Ser rejeitado, ignorado ou ficar sozinho", dimension: 'I' },
      { id: 'C', text: "Conflitos, instabilidade ou decepcionar quem você ama", dimension: 'S' },
      { id: 'D', text: "Errar, ser criticado ou fazer algo mal feito", dimension: 'C' }
    ]
  },
  {
    id: 14,
    question: "No trabalho ou em projetos pessoais, você funciona melhor quando...",
    options: [
      { id: 'A', text: "Tem autonomia e liberdade pra fazer do seu jeito", dimension: 'D' },
      { id: 'B', text: "Trabalha em equipe, com interação e troca de ideias", dimension: 'I' },
      { id: 'C', text: "Tem instruções claras, ambiente estável e sem surpresas", dimension: 'S' },
      { id: 'D', text: "Tem tempo pra analisar, planejar e fazer com qualidade", dimension: 'C' }
    ]
  },
  {
    id: 15,
    question: "As pessoas que te conhecem bem diriam que você é...",
    options: [
      { id: 'A', text: "Determinado, direto, às vezes intenso demais", dimension: 'D' },
      { id: 'B', text: "Divertido, sociável, às vezes fala demais", dimension: 'I' },
      { id: 'C', text: "Calmo, confiável, às vezes passivo demais", dimension: 'S' },
      { id: 'D', text: "Detalhista, organizado, às vezes crítico demais", dimension: 'C' }
    ]
  }
];
