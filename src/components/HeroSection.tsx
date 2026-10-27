/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ArrowLeft,
  BookOpenCheck,
  Sparkles,
  Award,
  School,
  PlayCircle,
  Lightbulb,
  CheckCircle2,
  BookmarkCheck,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { INSTITUTION_INFO } from '../data/nafesData';

interface HeroSectionProps {
  studentName: string;
  studentGrade: string;
  studentSchool: string;
  onStartQuiz: () => void;
  onExploreStrategies: () => void;
  onOpenVideos: () => void;
  onOpenStudyTools: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  studentName,
  studentGrade,
  studentSchool,
  onStartQuiz,
  onExploreStrategies,
  onOpenVideos,
  onOpenStudyTools,
  onNavigateSection,
}) => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-[#0a101d] to-[#070b14] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        {/* Madrasati Header Notice Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-emerald-200 bg-slate-900/80 backdrop-blur-md border border-slate-800/80 px-4 py-2.5 rounded-2xl shadow-sm mb-6">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <School className="w-3.5 h-3.5" />
            </span>
            <span className="font-extrabold text-white">{studentSchool || INSTITUTION_INFO.schoolName}</span>
            <span aria-hidden="true" className="text-emerald-500/60">·</span>
            <span className="text-emerald-300">{INSTITUTION_INFO.ministryName}</span>
          </div>

          <div className="flex items-center gap-2.5 text-slate-300">
            <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 rounded-md font-bold text-[11px]">
              {studentGrade}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-[11px] font-semibold text-emerald-300">
              بوابة الاستعداد لاختبار نافس الوطني 1446-1447هـ
            </span>
          </div>
        </div>

        {/* 2-Column Split Hero (Madrasati Student Portal Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Text & Dashboard Actions Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/80 text-xs font-bold text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>بوابة نافس المدرسية المحاكية · المواد الثلاث المقررة</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.25] text-balance">
              مرحباً بك يا بطل <span className="text-emerald-400">{studentSchool || 'مدرسة المروة'}</span>:{' '}
              <span className="underline decoration-amber-400 decoration-3 underline-offset-4">
                {studentName || 'طالب مدرسة المروة'}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              بوابة تعليمية صُممت على غرار <strong className="text-white">نظام مدرستي</strong> لخدمة الطلاب
              في الاختبارات الوطنية (نافس)، تركز حصرياً على المواد الثلاث المقررة:{' '}
              <strong className="text-emerald-300 font-bold">لغتي، الرياضيات، والعلوم</strong>.
              شاهد الدروس مباشرة، تدرب على استراتيجيات الحل الذكي وتفادي الأفخاخ، واستخدم بطاقات الاستذكار السريع وحاسبة إدارة وقت الاختبار.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                onClick={onStartQuiz}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 border border-emerald-400/30"
              >
                <BookOpenCheck className="w-4 h-4" />
                ابدأ اختباراً محاكياً
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreStrategies}
                className="px-4 py-3 bg-slate-900/90 hover:bg-slate-850 hover:text-white text-slate-200 border border-slate-700/80 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
              >
                <Lightbulb className="w-4 h-4 text-amber-400" />
                طرق المذاكرة والحل الذكي
              </button>

              <button
                onClick={onOpenVideos}
                className="px-4 py-3 bg-slate-900/90 hover:bg-slate-850 hover:text-white text-slate-200 border border-slate-700/80 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
              >
                <PlayCircle className="w-4 h-4 text-rose-400" />
                الدروس وقنوات المعلمين
              </button>

              <button
                onClick={onOpenStudyTools}
                className="px-4 py-3 border border-emerald-700/80 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-200 rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Layers className="w-4 h-4 text-emerald-400" />
                بطاقات المذاكرة وحاسبة الوقت
              </button>
            </div>

            {/* Quick-Jump Section Navigator (تنظيم وسهولة النزول والطلوع في الموقع) */}
            <div className="pt-3 border-t border-slate-200">
              <div className="text-xs font-bold text-slate-600 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-700" />
                <span>التنقل المنظم بين أقسام المنصة (نزول وطلوع فوري):</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onNavigateSection('subjects')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <BookmarkCheck className="w-3 h-3 text-emerald-600" />
                  <span>المواد الثلاث</span>
                </button>
                <button
                  onClick={() => onNavigateSection('strategies')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Lightbulb className="w-3 h-3 text-amber-500" />
                  <span>استراتيجيات الحل والأفخاخ</span>
                </button>
                <button
                  onClick={() => onNavigateSection('teachers')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <PlayCircle className="w-3 h-3 text-rose-500" />
                  <span>الفيديوهات وقنوات المعلمين</span>
                </button>
                <button
                  onClick={() => onNavigateSection('tests')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <BookOpenCheck className="w-3 h-3 text-blue-600" />
                  <span>الاختبارات المحاكية</span>
                </button>
                <button
                  onClick={() => onNavigateSection('study-tools')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-100/80 border border-emerald-300 hover:bg-emerald-200 text-emerald-900 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <GraduationCap className="w-3 h-3 text-emerald-700" />
                  <span>أدوات المذاكرة وتشخيص المهارات</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Media Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-200/80 shadow-xl bg-slate-100 aspect-[16/11]">
              <img
                src="/src/assets/images/hero_nafes_saudi_1793104028708.jpg"
                alt="طالب في مدرسة المروة يستعد لاختبار نافس الوطني"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end p-5">
                <div className="text-white space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                    <School className="w-3.5 h-3.5" />
                    <span>{INSTITUTION_INFO.schoolName} · {INSTITUTION_INFO.ministryName}</span>
                  </div>
                  <p className="text-sm font-extrabold text-white">
                    منظومة نافس المدرسية الموحدة · لغتي - رياضيات - علوم
                  </p>
                  <p className="text-[11px] text-slate-300">
                    منصة تدريبية تفاعلية تحاكي معايير هيئة تقويم التعليم والتدريب
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-column KPI strip (Madrasati Statistics) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200">
          <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-2xs">
            <div className="text-2xl font-black text-emerald-800">
              <span className="font-mono tabular-nums">3</span> مواد
            </div>
            <p className="text-xs text-slate-600 font-medium mt-1">لغتي · الرياضيات · العلوم</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="text-2xl font-black text-slate-900">
              <span className="font-mono tabular-nums">15</span> استراتيجية
            </div>
            <p className="text-xs text-slate-600 font-medium mt-1">طرق حل ذكية وتفادي الأفخاخ</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="text-2xl font-black text-slate-900">
              <span className="font-mono tabular-nums">6</span> معلمين
            </div>
            <p className="text-xs text-slate-600 font-medium mt-1">فيديوهات مباشرة وقنوات يوتيوب</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-2xs">
            <div className="text-2xl font-black text-emerald-800">
              بطاقات وحاسبة وقت
            </div>
            <p className="text-xs text-slate-600 font-medium mt-1">أدوات ذكية للاستذكار وإدارة الزمن</p>
          </div>
        </div>
      </div>
    </section>
  );
};
