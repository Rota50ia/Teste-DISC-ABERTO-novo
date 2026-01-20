
import React, { useState, useEffect } from 'react';
import { DISC_QUESTIONS } from './constants';
import { DISCDimension, DISCScore, UserAnswers, EmployeeInfo, AnalysisResult } from './types';
import QuestionBlock from './components/QuestionBlock';
import ResultsChart from './components/ResultsChart';
import { getGeminiAnalysis } from './services/geminiService';

enum AppStep {
  LANDING,
  PRIVACY_NOTICE,
  ONBOARDING,
  TEST,
  LOADING,
  RESULTS
}

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.LANDING);
  const [employee, setEmployee] = useState<EmployeeInfo>({ name: '', email: '', age: '' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [finalScores, setFinalScores] = useState<DISCScore | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const startTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (employee.name && employee.email && employee.age) {
      setStep(AppStep.TEST);
    }
  };

  const handleSelection = (dimension: DISCDimension) => {
    setAnswers(prev => ({ ...prev, [DISC_QUESTIONS[currentIndex].id]: dimension }));
  };

  const nextQuestion = () => {
    if (currentIndex < DISC_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      processResults();
    }
  };

  const processResults = async () => {
    setStep(AppStep.LOADING);
    const scores: DISCScore = { D: 0, I: 0, S: 0, C: 0 };
    Object.values(answers).forEach(dim => scores[dim as DISCDimension]++);
    
    setFinalScores(scores);
    try {
      const result = await getGeminiAnalysis(scores, answers, employee);
      setAnalysis(result);
      setStep(AppStep.RESULTS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ocorreu um erro ao processar seus dados.");
      setStep(AppStep.LANDING);
    }
  };

  const progress = Math.round((currentIndex / DISC_QUESTIONS.length) * 100);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col p-4 md:p-8 font-sans selection:bg-emerald-500/30">
      
      {(step === AppStep.LANDING || step === AppStep.PRIVACY_NOTICE || step === AppStep.RESULTS) && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full"></div>
        </div>
      )}

      {step === AppStep.TEST && (
        <header className="max-w-4xl mx-auto w-full mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex justify-between items-end border-b border-slate-800 pb-4">
            <div>
              <p className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-1">
                AVALIANDO: {employee.name.toUpperCase()}
              </p>
              <h1 className="text-4xl font-serif-elegant text-white">Sessão de Autoconhecimento</h1>
            </div>
            <div className="text-right">
              <span className="text-slate-500 text-sm font-medium">Progresso: {progress}%</span>
            </div>
          </div>
          <div className="h-1 bg-slate-800 mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </header>
      )}

      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full">
        
        {step === AppStep.LANDING && (
          <div className="max-w-4xl w-full text-center space-y-10 animate-in fade-in zoom-in duration-1000">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-3xl mb-8 shadow-2xl">
                <p className="text-sm font-bold uppercase tracking-widest mb-1">⚠️ Falha na Comunicação</p>
                <p className="opacity-90">{error}</p>
              </div>
            )}
            <div className="space-y-4">
              <h1 className="text-7xl md:text-8xl font-serif-elegant text-white mb-6 leading-tight tracking-tighter">
                Jornada <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">DISC</span>
                <div className="text-2xl md:text-3xl text-slate-500 font-sans tracking-widest mt-4 uppercase font-medium">by Edilson Morais</div>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-light max-w-2xl mx-auto">
                Desvende o seu perfil comportamental em 5 minutos e receba um mapa detalhado da sua essência.
              </p>
            </div>
            <div className="pt-8">
              <button onClick={() => setStep(AppStep.PRIVACY_NOTICE)} className="group relative px-12 py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all shadow-[0_0_30px_rgba(34,197,94,0.3)] active:scale-95 text-xl tracking-widest uppercase">
                Iniciar Agora ✓
              </button>
            </div>
          </div>
        )}

        {step === AppStep.PRIVACY_NOTICE && (
          <div className="max-w-3xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-20 h-20 text-emerald-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif-elegant text-white tracking-tight uppercase">Privacidade</h1>
            </div>
            <div className="bg-[#111827]/60 border border-slate-800 rounded-[40px] p-8 md:p-12 backdrop-blur-xl shadow-2xl space-y-6 text-left">
              <p className="text-slate-300 text-lg leading-relaxed text-center">
                Não armazenamos suas respostas. O resultado é processado pelo n8n e enviado para o seu e-mail, sendo descartado de nossos registros após o envio.
              </p>
            </div>
            <div className="pt-4 flex flex-col md:flex-row items-center justify-center gap-4">
              <button onClick={() => setStep(AppStep.ONBOARDING)} className="px-12 py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all shadow-xl active:scale-95 text-lg tracking-widest uppercase w-full md:w-auto">
                Concordar e Continuar
              </button>
              <button onClick={() => setStep(AppStep.LANDING)} className="px-12 py-5 bg-slate-800 text-slate-400 font-bold rounded-2xl transition-all text-lg tracking-widest uppercase w-full md:w-auto">
                Voltar
              </button>
            </div>
          </div>
        )}

        {step === AppStep.ONBOARDING && (
          <div className="max-w-lg w-full space-y-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-5xl font-serif-elegant text-white mb-4">Prepare-se</h1>
            <form onSubmit={startTest} className="bg-[#111827] p-8 rounded-[32px] border border-slate-800 shadow-2xl space-y-6 text-left">
              <div className="space-y-2">
                <label className="text-slate-400 text-sm font-medium">Nome Completo</label>
                <input required value={employee.name} onChange={e => setEmployee({...employee, name: e.target.value})} placeholder="Seu nome" className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-slate-400 text-sm font-medium">E-mail</label>
                <input required type="email" value={employee.email} onChange={e => setEmployee({...employee, email: e.target.value})} placeholder="Para receber o laudo" className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-slate-400 text-sm font-medium">Idade</label>
                <input required value={employee.age} onChange={e => setEmployee({...employee, age: e.target.value})} placeholder="Sua idade" className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none" />
              </div>
              <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-5 rounded-2xl transition-all text-lg uppercase tracking-widest">Iniciar Teste</button>
            </form>
          </div>
        )}

        {step === AppStep.TEST && (
          <div className="max-w-4xl w-full animate-in fade-in duration-500">
            <div className="bg-[#111827] p-10 rounded-[40px] border border-slate-800 shadow-2xl relative">
               <QuestionBlock 
                question={DISC_QUESTIONS[currentIndex]}
                selectedDimension={answers[DISC_QUESTIONS[currentIndex].id] || null}
                onSelect={handleSelection}
               />
            </div>
            <footer className="mt-8 flex justify-between items-center">
              <div className="text-slate-500 text-sm font-medium">Questão {currentIndex + 1} de 15</div>
              <button onClick={nextQuestion} disabled={!answers[DISC_QUESTIONS[currentIndex].id]} className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-30 text-white font-bold px-12 py-4 rounded-2xl text-lg uppercase tracking-widest transition-all">
                {currentIndex === DISC_QUESTIONS.length - 1 ? 'Gerar Análise' : 'Próxima'}
              </button>
            </footer>
          </div>
        )}

        {step === AppStep.LOADING && (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 border-4 border-slate-800 border-t-emerald-500 rounded-full animate-spin mx-auto" />
            <h2 className="text-3xl font-serif-elegant text-white">Criando seu Mapa...</h2>
            <p className="text-slate-400 max-w-sm mx-auto">Sua jornada está sendo processada via n8n pela nossa inteligência artificial.</p>
          </div>
        )}

        {step === AppStep.RESULTS && (
          <div className="max-w-3xl w-full text-center space-y-12 animate-in fade-in zoom-in duration-1000 py-12">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-serif-elegant text-white leading-tight">
                Obrigado por responder ao teste! 🙌
              </h1>
              
              <div className="bg-[#111827]/80 border border-slate-800 p-8 md:p-12 rounded-[40px] shadow-2xl backdrop-blur-xl space-y-8">
                <p className="text-2xl text-emerald-400 font-medium">
                  Sua participação é muito importante para nós.
                </p>
                
                <div className="space-y-6 text-lg text-slate-300 leading-relaxed font-light">
                  <p>
                    O resultado da sua análise DISC já foi enviado para o e-mail <span className="text-white font-bold underline decoration-emerald-500/50">{employee.email}</span> que você cadastrou no início do teste.
                  </p>
                  
                  <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
                    <p>👉 Caso não encontre o e-mail, verifique também a caixa de spam ou promoções.</p>
                  </div>
                  
                  <p className="text-xl italic text-slate-400">
                    Leia com calma — ele foi preparado para te ajudar a se conhecer melhor.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button 
                onClick={() => {
                  setStep(AppStep.LANDING);
                  setAnswers({});
                  setCurrentIndex(0);
                  setAnalysis(null);
                }} 
                className="px-12 py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all shadow-[0_0_30px_rgba(34,197,94,0.3)] active:scale-95 text-xl tracking-widest uppercase"
              >
                Início
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
