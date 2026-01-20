
import React from 'react';
import { DISCQuestion, DISCDimension } from '../types';

interface QuestionBlockProps {
  question: DISCQuestion;
  selectedDimension: DISCDimension | null;
  onSelect: (dimension: DISCDimension) => void;
}

const QuestionBlock: React.FC<QuestionBlockProps> = ({ 
  question, 
  selectedDimension, 
  onSelect 
}) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-3">
        <p className="text-emerald-500 font-bold text-xs uppercase tracking-widest">
          QUESTÃO {question.id} DE 15
        </p>
        <h2 className="text-3xl font-serif-elegant text-white leading-tight">
          {question.question}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option) => {
          const isSelected = selectedDimension === option.dimension;
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.dimension)}
              className={`flex items-center w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left group ${
                isSelected 
                ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]' 
                : 'bg-[#0f172a] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg mr-4 shrink-0 transition-colors ${
                isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
              }`}>
                {option.id}
              </div>
              
              <span className={`text-lg font-medium grow ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                {option.text}
              </span>

              {isSelected && (
                <div className="text-emerald-500 ml-4 animate-in zoom-in duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionBlock;
