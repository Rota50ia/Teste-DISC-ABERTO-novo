
export type DISCDimension = 'D' | 'I' | 'S' | 'C';

export interface EmployeeInfo {
  name: string;
  email: string;
  age: string;
}

export interface DISCOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  dimension: DISCDimension;
}

export interface DISCQuestion {
  id: number;
  question: string;
  options: DISCOption[];
}

export interface DISCScore {
  D: number;
  I: number;
  S: number;
  C: number;
}

export interface UserAnswers {
  [questionId: number]: DISCDimension;
}

export interface AnalysisResult {
  perfil_disc_dominante: string;
  perfil_disc_secundario: string;
  temperamento_dominante: string;
  temperamento_secundario: string;
  quem_voce_e: {
    resumo_acolhedor: string;
    seus_superpoderes: string[];
    o_que_te_energiza: string[];
    o_que_te_drena: string[];
  };
  pontos_de_atencao: {
    [key: string]: {
      comportamento: string;
      como_aparece_no_dia_a_dia: string;
      impacto_nos_relacionamentos: string;
    };
  };
  relacionamentos: {
    como_voce_ama: string;
    o_que_voce_precisa_de_parceiros: string;
    ponto_de_atrito_comum: string;
    dica_para_relacionamentos: string;
  };
  comunicacao: {
    seu_estilo_natural: string;
    como_os_outros_te_percebem: string;
    mal_entendido_frequente: string;
    ajuste_simples: string;
  };
  plano_de_evolucao_30_dias: {
    [key: string]: {
      foco: string;
      por_que_isso: string;
      exercicio_diario: string;
      reflexao_da_semana: string;
    };
  };
  habitos_para_vida: {
    habito_matinal: string;
    habito_noturno: string;
    pratica_semanal: string;
  };
  frases_de_poder: {
    mantra_pessoal: string;
    lembrete_para_momentos_dificeis: string;
    afirmacao_de_crescimento: string;
  };
  mensagem_final: string;
}
