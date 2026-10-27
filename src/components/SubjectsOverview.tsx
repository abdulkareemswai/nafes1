/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SUBJECTS_DATA, SubjectData } from '../data/nafesData';
import { BookMarked, Calculator, Microscope, ArrowLeft, CheckCircle2, Play, Compass } from 'lucide-react';

interface SubjectsOverviewProps {
  onSelectSubjectStrategy: (subjectId: 'arabic' | 'math' | 'science') => void;
  onSelectSubjectQuiz: (subjectId: 'arabic' | 'math' | 'science') => void;
  onSelectSubjectVideos: (subjectId: 'arabic' | 'math' | 'science') => void;
}

export const SubjectsOverview: React.FC<SubjectsOverviewProps> = ({
  onSelectSubjectStrategy,
  onSelectSubjectQuiz,
  onSelectSubjectVideos,
}) => {
  const subjects: SubjectData[] = [
    SUBJECTS_DATA.arabic,
    SUBJECTS_DATA.math,
    SUBJECTS_DATA.science,
  ];

  const getSubjectIcon = (id: string) => {
    switch (id) {
      case 'arabic':
        return <BookMarked className="w-5 h-5 text-amber-700" />;
      case 'math':
        return <Calculator className="w-5 h-5 text-teal-700" />;
      case 'science':
        return <Microscope className="w-5 h-5 text-emerald-700" />;
      default:
        return null;
    }
  };

  return (
    <section id="subjects" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-emerald-800 tracking-wider mb-2">
            المجالات المعرفية الثلاثة المعتمدة
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            المواد المقررة في اختبار نافس الوطني
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
            تم تركيز محتوى المنصة حصرياً على مواد لغتي، والرياضيات، والعلوم، وفقاً لمعايير
            التقويم الوطنية لقياس نواتج التعلم ومهارات التفكير العليا.
          </p>
        </div>

        {/* 3 Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Image banner */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={sub.image}
                  alt={sub.fullName}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-lg text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5">
                  {getSubjectIcon(sub.id)}
                  <span>{sub.name}</span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{sub.fullName}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {sub.overview}
                  </p>

                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-bold text-slate-800">أبرز المهارات المستهدفة:</p>
                    <ul className="space-y-1.5">
                      {sub.skillsMeasured.slice(0, 3).map((skill, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Subject Actions */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <button
                    onClick={() => onSelectSubjectQuiz(sub.id)}
                    className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <span>اختبار تجريبي في {sub.name}</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectSubjectStrategy(sub.id)}
                      className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <Compass className="w-3.5 h-3.5 text-slate-500" />
                      طرق الحل
                    </button>
                    <button
                      onClick={() => onSelectSubjectVideos(sub.id)}
                      className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <Play className="w-3.5 h-3.5 text-slate-500" />
                      الشروحات
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
