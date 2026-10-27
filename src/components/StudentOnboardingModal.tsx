/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserCheck, Sparkles, School, Building2 } from 'lucide-react';
import { INSTITUTION_INFO } from '../data/nafesData';

interface StudentOnboardingModalProps {
  isOpen: boolean;
  initialName?: string;
  initialGrade?: string;
  initialSchool?: string;
  onSave: (name: string, grade: string, school: string) => void;
  onClose?: () => void;
  isMandatory?: boolean;
}

const NAFES_GRADES = [
  { id: 'grade_3_elem', label: 'الصف الثالث الابتدائي' },
  { id: 'grade_6_elem', label: 'الصف السادس الابتدائي' },
  { id: 'grade_3_mid', label: 'الصف الثالث المتوسط' },
];

export const StudentOnboardingModal: React.FC<StudentOnboardingModalProps> = ({
  isOpen,
  initialName = '',
  initialGrade = 'الصف الثالث المتوسط',
  initialSchool = 'مدرسة المروة',
  onSave,
  onClose,
  isMandatory = false,
}) => {
  const [name, setName] = useState(initialName);
  const [grade, setGrade] = useState(initialGrade);
  const [school, setSchool] = useState(initialSchool || 'مدرسة المروة');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('يرجى كتابة اسمك لمتابعة تدريبك وحفظ تقدمك.');
      return;
    }
    setError('');
    onSave(name.trim(), grade, school.trim() || 'مدرسة المروة');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden">
        {/* Header with Ministry & Al-Marwah School */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 p-6 text-white text-center relative">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
            <School className="w-7 h-7 text-amber-300" />
          </div>
          <div className="text-xs font-semibold text-emerald-200">
            {INSTITUTION_INFO.ministryName}
          </div>
          <h2 className="text-xl font-bold tracking-tight mt-1">
            مرحباً بك في منصة نافس ({school || INSTITUTION_INFO.schoolName})
          </h2>
          <p className="text-xs text-emerald-100 mt-1">
            سجّل اسمك لتخصيص تجربتك ومتابعة أدائك في المواد الثلاث المقررة
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="student-name-input" className="block text-sm font-semibold text-slate-800 mb-1.5">
              اسم الطالب / الطالبة <span className="text-emerald-600">*</span>
            </label>
            <input
              id="student-name-input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="مثال: عبد الكريم السويعي..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-slate-900 bg-slate-50 transition-all placeholder:text-slate-400"
              autoFocus
            />
            {error && <p className="text-xs text-rose-600 mt-1.5 font-medium">{error}</p>}
          </div>

          <div>
            <label htmlFor="student-school-input" className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-600" />
              المدرسة التابع لها
            </label>
            <input
              id="student-school-input"
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="مدرسة المروة"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-slate-900 bg-slate-50 transition-all"
            />
          </div>

          <div>
            <label htmlFor="student-grade-select" className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <School className="w-4 h-4 text-emerald-600" />
              المرحلة الدراسية لاختبار نافس
            </label>
            <select
              id="student-grade-select"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-slate-900 bg-slate-50 transition-all cursor-pointer"
            >
              {NAFES_GRADES.map((g) => (
                <option key={g.id} value={g.label}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              className="flex-1 py-3 px-5 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white rounded-xl text-sm font-semibold shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              حفظ وبدء المذاكرة فوراً
            </button>
            {!isMandatory && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-4 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl text-sm font-medium transition-colors cursor-pointer"
              >
                إغلاق
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
