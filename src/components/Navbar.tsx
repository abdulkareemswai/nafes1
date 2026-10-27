/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User, Award, School, Sparkles, BookOpen, Layers } from 'lucide-react';
import { INSTITUTION_INFO } from '../data/nafesData';

interface NavbarProps {
  studentName: string;
  studentSchool: string;
  onOpenProfile: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  studentName,
  studentSchool,
  onOpenProfile,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20">
      {/* Top Institutional Ribbon (Madrasati Style) */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-950 to-teal-950 text-emerald-200 text-[11px] font-medium py-1 px-4 sm:px-6 border-b border-emerald-900/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/80" />
            <span className="font-bold text-slate-100">{INSTITUTION_INFO.ministryName}</span>
            <span className="text-emerald-500/70">·</span>
            <span className="text-emerald-300 font-semibold">{studentSchool || INSTITUTION_INFO.schoolName}</span>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-emerald-300/80">
            <span className="hidden md:inline">بوابة محاكاة اختبار نافس الوطني</span>
            <span className="hidden md:inline text-emerald-600">·</span>
            <span className="bg-emerald-900/60 text-emerald-200 border border-emerald-700/50 px-2 py-0.5 rounded font-bold">
              العام الدراسي 1446 - 1447هـ
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-6 px-3 sm:px-6 py-2.5 sm:py-3">
        {/* Wordmark & Emblem */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="text-sm sm:text-lg font-bold tracking-tight text-white hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-black text-sm sm:text-base shadow-md shadow-emerald-900/50 border border-emerald-500/30 group-hover:scale-105 transition-transform shrink-0">
            ن
          </div>
          <div className="flex flex-col text-right leading-tight">
            <span className="font-extrabold text-xs sm:text-base text-white flex items-center gap-1 sm:gap-1.5">
              منصة نافس المدرسية
              <span className="text-[9px] sm:text-[10px] bg-emerald-950/80 text-emerald-300 px-1.5 py-0.5 rounded font-bold border border-emerald-800">
                مدرستي
              </span>
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-400 font-semibold hidden xs:inline sm:inline">
              {studentSchool || INSTITUTION_INFO.schoolName} · لغتي - رياضيات - علوم
            </span>
          </div>
        </a>

        {/* Madrasati Segmented Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs font-semibold text-slate-300">
          <button
            onClick={() => onNavigate('subjects')}
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1.5 border-b-2 border-transparent hover:border-emerald-500 flex items-center gap-1"
          >
            <span>مقرراتي (3 مواد)</span>
          </button>
          <button
            onClick={() => onNavigate('strategies')}
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1.5 border-b-2 border-transparent hover:border-emerald-500 flex items-center gap-1"
          >
            <span>استراتيجيات الحل الذكي</span>
          </button>
          <button
            onClick={() => onNavigate('teachers')}
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1.5 border-b-2 border-transparent hover:border-emerald-500 flex items-center gap-1"
          >
            <span>الدروس وقنوات المعلمين</span>
          </button>
          <button
            onClick={() => onNavigate('tests')}
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1.5 border-b-2 border-transparent hover:border-emerald-500 flex items-center gap-1"
          >
            <span>الاختبارات المحاكية</span>
          </button>
          <button
            onClick={() => onNavigate('study-tools')}
            className="bg-emerald-950/60 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-800/80 hover:bg-emerald-900/60 hover:border-emerald-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer font-bold flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>بطاقات وأدوات المذاكرة</span>
          </button>
        </nav>

        {/* Student Profile Action */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onOpenProfile}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 hover:text-white border border-slate-800 hover:border-emerald-500/50 rounded-xl shadow-xs transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            title="تعديل بيانات الطالب"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px] sm:text-[10px] shrink-0 shadow-xs">
              <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
            <div className="text-right flex flex-col leading-none">
              <span className="max-w-[90px] sm:max-w-[130px] truncate font-bold text-slate-100">
                {studentName || 'حساب الطالب'}
              </span>
              <span className="text-[9px] text-slate-400 font-medium hidden sm:inline">
                {studentSchool || 'مدرسة المروة'}
              </span>
            </div>
            <span className="text-[10px] text-emerald-300 bg-emerald-950/90 px-1.5 py-0.5 rounded font-semibold border border-emerald-800/70">
              تعديل
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
