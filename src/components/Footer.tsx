/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ExternalLink, School, ArrowUp, Award, Sparkles, CheckCircle2, User } from 'lucide-react';
import { INSTITUTION_INFO } from '../data/nafesData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t-4 border-emerald-600 text-xs relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-32 bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Prominent Student Honor & Attribution Card ("عمل الطالب عبدالكريم مجد صوي") */}
        <div className="mb-14 bg-gradient-to-br from-slate-800 via-slate-800/95 to-emerald-950/70 rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
          {/* Subtle gold ribbon decoration */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            {/* Student Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-right">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-xl shadow-emerald-900/50 border-2 border-emerald-300/40 shrink-0">
                <Award className="w-10 h-10 text-amber-300" />
              </div>

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-[11px] font-bold text-emerald-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>مبادرة وإنجاز طلابي متميز</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  عمل وإعداد الطالب:{' '}
                  <span className="text-emerald-400 underline decoration-amber-400 decoration-2 underline-offset-4">
                    {INSTITUTION_INFO.studentCreator}
                  </span>
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                  تم تصميم وتطوير هذه المنصة التعليمية لخدمة زملائي الطلاب والطالبات في{' '}
                  <strong className="text-amber-300 font-bold">{INSTITUTION_INFO.schoolName}</strong> للاستعداد
                  الشامل والمتقن لاختبارات <strong className="text-white">نافس الوطنية</strong> تحت إشراف{' '}
                  <strong className="text-white">{INSTITUTION_INFO.ministryName}</strong>.
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-300 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {INSTITUTION_INFO.schoolName}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <School className="w-3.5 h-3.5 text-emerald-400" />
                    {INSTITUTION_INFO.ministryName}
                  </span>
                  <span>·</span>
                  <span className="text-amber-300/90 font-medium">
                    {INSTITUTION_INFO.motto}
                  </span>
                </div>
              </div>
            </div>

            {/* School & Certificate Badge */}
            <div className="shrink-0 flex flex-col items-center sm:items-end gap-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-700/80">
              <span className="text-[10px] text-slate-400 font-medium">الجهة التعليمية الحاضنة</span>
              <span className="text-sm font-extrabold text-white flex items-center gap-1.5">
                <School className="w-4 h-4 text-emerald-400" />
                {INSTITUTION_INFO.schoolName}
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold">
                العام الدراسي 1446 - 1447هـ
              </span>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-8 border-b border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-white font-bold text-base flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-emerald-700/40">
                ن
              </span>
              منصة نافس المدرسية · {INSTITUTION_INFO.schoolName}
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              بوابة تعليمية تحاكي نظام مدرستي مصممة لتمكين الطلاب في المواد المقررة الثلاث:
              لغتي، الرياضيات، والعلوم عبر استراتيجيات الحل الذكية والاختبارات المحاكية
              والدروس المرئية المباشرة.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold pt-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>مبادرة مدرسية طلابية لخدمة المجتمع التعليمي</span>
            </div>
          </div>

          {/* Platform Sections */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              أقسام المنصة
            </h5>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('subjects')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-right"
                >
                  المواد المقررة (لغتي، رياضيات، علوم)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('strategies')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-right"
                >
                  استراتيجيات الحل الذكي والأفخاخ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('teachers')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-right"
                >
                  الدروس المرئية وقنوات المعلمين
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tests')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-right"
                >
                  الاختبارات التجريبية المحاكية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('study-tools')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-emerald-300 font-semibold text-right"
                >
                  بطاقات الاستذكار وحاسبة إدارة الوقت
                </button>
              </li>
            </ul>
          </div>

          {/* Official Endorsements */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              المراجع الرسمية
            </h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://moe.gov.sa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  وزارة التعليم بالمملكة العربية السعودية
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://etec.gov.sa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  هيئة تقويم التعليم والتدريب (ETEC)
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://ien.edu.sa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  منصة وقنوات عين التعليمية iEN
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://schools.madrasati.sa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  بوابة منصة مدرستي الرسمية
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-right">
            <span>© 2026 {INSTITUTION_INFO.schoolName}</span>
            <span>·</span>
            <span className="text-white font-semibold">عمل وإشراف الطالب: {INSTITUTION_INFO.studentCreator}</span>
            <span>·</span>
            <span>{INSTITUTION_INFO.ministryName}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer shrink-0"
          >
            <span>العودة للأعلى</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
