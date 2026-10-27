/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SUBJECTS_DATA, SubjectData, StudyStrategy } from '../data/nafesData';
import {
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  BookMarked,
  Calculator,
  Microscope,
  FileText,
  ChevronDown,
} from 'lucide-react';

interface StudyAndSolveGuideProps {
  selectedSubjectId: 'arabic' | 'math' | 'science';
  onSubjectChange: (id: 'arabic' | 'math' | 'science') => void;
}

export const StudyAndSolveGuide: React.FC<StudyAndSolveGuideProps> = ({
  selectedSubjectId,
  onSubjectChange,
}) => {
  const currentSubject: SubjectData = SUBJECTS_DATA[selectedSubjectId];
  const [activeStrategyIndex, setActiveStrategyIndex] = useState(0);
  const [showSolutionExplanation, setShowSolutionExplanation] = useState(true);
  const [activeCheatSheetIndex, setActiveCheatSheetIndex] = useState<number | null>(0);

  const activeStrategy: StudyStrategy = currentSubject.strategies[activeStrategyIndex];

  return (
    <section id="strategies" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-bold text-emerald-800 tracking-wider mb-2">
              منهجية التفكير والاستعداد الذكي
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              كيفية المذاكرة وكيفية الحل في نافس
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-2xl leading-relaxed">
              اختبار نافس لا يقيس حفظ النصوص بل يقيس طريقة التفكير السريع والتعامل مع المسائل
              واستبعاد الخيارات الخاطئة بثقة.
            </p>
          </div>

          {/* Interactive Subject Filter Tabs */}
          <div className="w-full md:w-auto overflow-x-auto pb-1 max-w-full">
            <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl w-max md:w-auto border border-slate-200/80">
              <button
                onClick={() => {
                  onSubjectChange('arabic');
                  setActiveStrategyIndex(0);
              }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                selectedSubjectId === 'arabic'
                  ? 'bg-white text-amber-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5 text-amber-600" />
              لغتي
            </button>
            <button
              onClick={() => {
                onSubjectChange('math');
                setActiveStrategyIndex(0);
              }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                selectedSubjectId === 'math'
                  ? 'bg-white text-teal-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-teal-600" />
              الرياضيات
            </button>
            <button
              onClick={() => {
                onSubjectChange('science');
                setActiveStrategyIndex(0);
              }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                selectedSubjectId === 'science'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Microscope className="w-3.5 h-3.5 text-emerald-600" />
              <span>العلوم</span>
            </button>
          </div>
        </div>
        </div>

        {/* Strategies Section Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Strategy Selector List (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="text-xs font-bold text-slate-500 mb-2 px-1">
              استراتيجيات الحل لمادة {currentSubject.name}:
            </div>

            {currentSubject.strategies.map((strat, idx) => (
              <button
                key={strat.id}
                onClick={() => setActiveStrategyIndex(idx)}
                className={`w-full text-right p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                  activeStrategyIndex === idx
                    ? 'bg-emerald-50/70 border-emerald-300 text-slate-900 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    activeStrategyIndex === idx
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{strat.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{strat.shortRule}</p>
                </div>
              </button>
            ))}

            {/* Quick cheat-sheet triggers */}
            <div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-700" />
                ملخص القواعد والمفاهيم الذهبية
              </div>
              {currentSubject.cheatSheet.map((sheet, sIdx) => (
                <div key={sIdx} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() =>
                      setActiveCheatSheetIndex(activeCheatSheetIndex === sIdx ? null : sIdx)
                    }
                    className="w-full p-3 text-right text-xs font-bold text-slate-800 flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <span>{sheet.title}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        activeCheatSheetIndex === sIdx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {activeCheatSheetIndex === sIdx && (
                    <div className="p-3 bg-white border-t border-slate-200 space-y-2 text-xs">
                      {sheet.items.map((item, iIdx) => (
                        <div key={iIdx} className="pb-1.5 border-b border-slate-100 last:border-0">
                          <span className="font-bold text-slate-900 block">{item.label}:</span>
                          <span className="text-slate-600 block mt-0.5">{item.detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Strategy Detail & Interactive Worked Example (8 cols) */}
          <div className="lg:col-span-8 bg-slate-50/60 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            {/* Strategy Title & Rule */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                <Lightbulb className="w-4 h-4" />
                <span>الاستراتيجية رقم {activeStrategyIndex + 1}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {activeStrategy.title}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                {activeStrategy.detailedGuide}
              </p>
            </div>

            {/* Worked Example Sandbox */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="bg-slate-900 text-white p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>تطبيق عملي محلول: نموذج سؤال حقيقي من نافس</span>
                </div>
                <button
                  onClick={() => setShowSolutionExplanation(!showSolutionExplanation)}
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 py-1 px-2.5 rounded-md bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {showSolutionExplanation ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      إخفاء التحليل الذكي
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      إظهار التحليل الذكي
                    </>
                  )}
                </button>
              </div>

              <div className="p-5 sm:p-6 space-y-4">
                {/* Question Text */}
                <div className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                  {activeStrategy.workedExample.questionText}
                </div>

                {/* Choices */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {activeStrategy.workedExample.choices.map((choice, cIdx) => {
                    const isCorrect = cIdx === activeStrategy.workedExample.correctIndex;
                    return (
                      <div
                        key={cIdx}
                        className={`p-3 rounded-lg border text-xs sm:text-sm font-medium transition-colors flex items-center gap-2.5 ${
                          showSolutionExplanation && isCorrect
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            showSolutionExplanation && isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {String.fromCharCode(65 + cIdx)}
                        </span>
                        <span>{choice}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Analysis breakdowns */}
                {showSolutionExplanation && (
                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                    {/* The Trap */}
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-950 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold text-rose-900 block mb-0.5">
                          فخ السؤال وكيف يتشتت الطلاب:
                        </strong>
                        <p className="leading-relaxed">{activeStrategy.workedExample.trapExplanation}</p>
                      </div>
                    </div>

                    {/* The Smart Solution Path */}
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold text-emerald-900 block mb-0.5">
                          طريقة الحل الذكي المباشر:
                        </strong>
                        <p className="leading-relaxed">{activeStrategy.workedExample.smartSolutionPath}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
