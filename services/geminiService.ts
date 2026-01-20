
import { DISCScore, UserAnswers, EmployeeInfo, AnalysisResult } from "../types";
import { DISC_QUESTIONS } from "../constants";

/**
 * Tenta encontrar o objeto de análise dentro da resposta do n8n.
 * Suporta formatos: [ { "resultado": { ... } } ], { "resultado": { ... } }, ou o objeto direto.
 */
const extractAnalysis = (data: any): AnalysisResult | null => {
  if (!data) return null;

  let candidate = data;

  // 1. Se for um array (padrão do n8n em muitos casos), pega o primeiro item
  if (Array.isArray(candidate) && candidate.length > 0) {
    candidate = candidate[0];
  }

  // 2. Se houver a chave 'resultado', o conteúdo real está dentro dela
  if (candidate && candidate.resultado) {
    candidate = candidate.resultado;
  }

  // 3. Se for uma string (caso a IA retorne texto puro), tenta parsear como JSON
  if (typeof candidate === 'string') {
    try {
      const cleanJson = candidate.replace(/```json/g, '').replace(/```/g, '').trim();
      candidate = JSON.parse(cleanJson);
    } catch (e) {
      console.warn("Não foi possível parsear a string como JSON");
    }
  }

  // 4. Verificação mínima: se temos as chaves principais ou qualquer dado útil
  if (candidate && typeof candidate === 'object') {
    // Se a estrutura estiver flat (sem o quem_voce_e), nós a normalizamos para não quebrar o App
    if (!candidate.quem_voce_e && candidate.resumo_acolhedor) {
      candidate.quem_voce_e = {
        resumo_acolhedor: candidate.resumo_acolhedor,
        seus_superpoderes: candidate.seus_superpoderes || [],
        o_que_te_energiza: candidate.o_que_te_energiza || [],
        o_que_te_drena: candidate.o_que_te_drena || []
      };
    }
    
    return candidate as AnalysisResult;
  }

  return null;
};

export const getGeminiAnalysis = async (scores: DISCScore, answers: UserAnswers, employee: EmployeeInfo): Promise<AnalysisResult> => {
  const WEBHOOK_URL = 'https://edilson-dark-n8n.7lvlou.easypanel.host/webhook/teste-disc-aberto';

  const payload = {
    pessoa: { nome: employee.name, email: employee.email, idade: employee.age },
    scores: { D: scores.D, I: scores.I, S: scores.S, C: scores.C },
    respostas: DISC_QUESTIONS.map(q => ({
      id_pergunta: q.id,
      pergunta: q.question,
      dimensao: answers[q.id],
      texto_resposta: q.options.find(o => o.dimension === answers[q.id])?.text
    })),
    timestamp: new Date().toISOString()
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`Erro na rede: ${response.status}`);

    const rawData = await response.json();
    console.log("Resposta recebida do n8n:", rawData);

    const result = extractAnalysis(rawData);
    if (result) return result;

    throw new Error("A resposta do servidor não contém os dados esperados da análise.");
  } catch (error) {
    console.error("Erro na comunicação com n8n:", error);
    throw error;
  }
};
