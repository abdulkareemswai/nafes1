/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SUBJECTS_DATA, SubjectData } from '../data/nafesData';
import { Question, calculateQuizScore, formatSeconds } from '../utils/nafesLogic';
import {
  Clock,
  BookOpenCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  BookMarked,
  Calculator,
  Microscope,
  Award,
} from 'lucide-react';

interface MockTestsSectionProps {
  onQuizCompleted: (correctCount: number, totalQuestions: number) => void;
  defaultSubjectId?: 'arabic' | 'math' | 'science' | 'all';
  onNavigateToTools?: () => void;
}

export const MockTestsSection: React.FC<MockTestsSectionProps> = ({
  onQuizCompleted,
  defaultSubjectId = 'all',
  onNavigateToTools,
}) => {
  const [testMode, setTestMode] = useState<'selection' | 'running' | 'summary'>('selection');
  const [selectedCategory, setSelectedCategory] = useState<'arabic' | 'math' | 'science' | 'all'>(
    defaultSubjectId
  );
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showInstantExplanation, setShowInstantExplanation] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const [timeLimit, setTimeLimit] = useState(600);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    correctCount: number;
    total: number;
    accuracy: number;
    timeSpent: number;
    masteryLevel: string;
  } | null>(null);

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isTimerActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerActive, timeRemaining]);

  const startTest = (category: 'arabic' | 'math' | 'science' | 'all') => {
    setSelectedCategory(category);
    let questionsPool: Question[] = [];

    if (category === 'all') {
      questionsPool = [
        ...SUBJECTS_DATA.arabic.mockQuestions,
        ...SUBJECTS_DATA.math.mockQuestions,
        ...SUBJECTS_DATA.science.mockQuestions,
      ];
      setTimeLimit(1200); // 20 minutes
      setTimeRemaining(1200);
    } else {
      questionsPool = SUBJECTS_DATA[category].mockQuestions;
      setTimeLimit(480); // 8 minutes
      setTimeRemaining(480);
    }

    setActiveQuestions(questionsPool);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setQuizResult(null);
    setTestMode('running');
    setIsTimerActive(true);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (selectedAnswers[currentIndex] !== undefined) return; // Answer already locked for this question
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const handleFinishQuiz = () => {
    setIsTimerActive(false);

    let correct = 0;
    activeQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct += 1;
      }
    });

    const timeSpent = Math.max(1, timeLimit - timeRemaining);
    const accuracyPercentage = Math.round((correct / activeQuestions.length) * 100);

    let masteryLevel = 'مستوى متقدم ومتميز';
    if (accuracyPercentage < 50) {
      masteryLevel = 'يحتاج لمزيد من المراجعة والتدريب';
    } else if (accuracyPercentage < 80) {
      masteryLevel = 'مستوى جيد ومتمكن';
    }

    const result = {
      correctCount: correct,
      total: activeQuestions.length,
      accuracy: accuracyPercentage,
      timeSpent,
      masteryLevel,
    };

    setQuizResult(result);
    setTestMode('summary');
    onQuizCompleted(correct, activeQuestions.length);
  };

  const currentQ = activeQuestions[currentIndex];
  const isCurrentAnswered = selectedAnswers[currentIndex] !== undefined;
  const currentAnswer = selectedAnswers[currentIndex];
  const isCurrentCorrect = isCurrentAnswered && currentAnswer === currentQ?.correctAnswer;

  return (
    <section id="tests" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Selection Screen */}
        {testMode === 'selection' && (
          <div className="space-y-12">
            <div className="max-w-3xl">
              <div className="text-xs font-bold text-emerald-800 tracking-wider mb-2">
                بيئة محاكاة معايير قياس ETEC
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                الاختبارات التجريبية المحاكية لاختبار نافس
              </h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
                اختر مادة للتدرب المكثف أو خض المحاكاة الشاملة. صممت الأسئلة لمحاكاة وقت وطبيعة أسئلة نافس الفعلية
                مع شروحات تفصيلية فورية لكل سؤال ومؤشرات تشخيصية.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Arabic Card */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:border-amber-300 transition-all">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                    <BookMarked className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">اختبار لغتي التجريبي</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    6 أسئلة معيارية لقياس استيعاب المقروء والعلاقات الدلالية والقواعد الإملائية.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span><span className="font-mono tabular-nums">8</span> دقائق · تقييم تشخيصي فوري</span>
                  </div>
                </div>
                <button
                  onClick={() => startTest('arabic')}
                  className="mt-6 w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
                >
                  بدء اختبار لغتي
                </button>
              </div>

              {/* Math Card */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:border-teal-300 transition-all">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">اختبار الرياضيات التجريبي</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    6 أسئلة معيارية تغطي الكسور، النمط، الهندسة ومسائل التفكير الرياضي السريع.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span><span className="font-mono tabular-nums">8</span> دقائق · تقييم تشخيصي فوري</span>
                  </div>
                </div>
                <button
                  onClick={() => startTest('math')}
                  className="mt-6 w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
                >
                  بدء اختبار الرياضيات
                </button>
              </div>

              {/* Science Card */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:border-emerald-300 transition-all">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                    <Microscope className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">اختبار العلوم التجريبي</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    6 أسئلة في الاستقصاء، المتغيرات، أجهزة الكائنات الحية والظواهر الطبيعية.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span><span className="font-mono tabular-nums">8</span> دقائق · تقييم تشخيصي فوري</span>
                  </div>
                </div>
                <button
                  onClick={() => startTest('science')}
                  className="mt-6 w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
                >
                  بدء اختبار العلوم
                </button>
              </div>

              {/* Comprehensive Mix Card */}
              <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 text-white rounded-2xl p-6 flex flex-col justify-between shadow-md">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-amber-300 flex items-center justify-center mb-4 border border-white/20">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">المحاكاة الشاملة الكبرى</h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    18 سؤالاً متكاملاً يدمج المواد الثلاث (لغتي + رياضيات + علوم) بنفس معايير نافس
                    الرسمية.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-emerald-300">
                    <Clock className="w-3.5 h-3.5" />
                    <span><span className="font-mono tabular-nums">20</span> دقيقة كاملة</span>
                  </div>
                </div>
                <button
                  onClick={() => startTest('all')}
                  className="mt-6 w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap"
                >
                  بدء المحاكاة الشاملة
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Running Test Interface */}
        {testMode === 'running' && currentQ && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Top Exam Header Strip */}
            <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  {currentIndex + 1}
                </span>
                <div>
                  <div className="text-xs text-slate-400">
                    السؤال {currentIndex + 1} من {activeQuestions.length}
                  </div>
                  <div className="text-sm font-bold">
                    {currentQ.subject === 'arabic'
                      ? 'مادة لغتي'
                      : currentQ.subject === 'math'
                      ? 'مادة الرياضيات'
                      : 'مادة العلوم'}
                  </div>
                </div>
              </div>

              {/* Timer & Finish button */}
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center gap-2 font-mono tabular-nums text-sm font-bold px-3 py-1.5 rounded-lg border ${
                    timeRemaining < 120
                      ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
                      : 'bg-slate-800 border-slate-700 text-emerald-400'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>الوقت المتبقي: {formatSeconds(timeRemaining)}</span>
                </div>

                <button
                  onClick={handleFinishQuiz}
                  className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  إنهاء الاختبار
                </button>
              </div>
            </div>

            {/* Question Progress Dots */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {activeQuestions.map((_, qIdx) => {
                const isAnswered = selectedAnswers[qIdx] !== undefined;
                const isCurrent = qIdx === currentIndex;
                return (
                  <button
                    key={qIdx}
                    onClick={() => setCurrentIndex(qIdx)}
                    className={`h-2 flex-1 min-w-[20px] rounded-full transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-emerald-600'
                        : isAnswered
                        ? 'bg-emerald-200'
                        : 'bg-slate-200'
                    }`}
                    title={`انتقال للسؤال ${qIdx + 1}`}
                  />
                );
              })}
            </div>

            {/* Question Body Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options list */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentIndex] === optIdx;
                  const isCorrect = optIdx === currentQ.correctAnswer;
                  const showFeedback = isCurrentAnswered && showInstantExplanation;

                  let borderClass = 'border-slate-200 hover:border-slate-400 bg-white';
                  let textClass = 'text-slate-800';
                  let badgeBg = 'bg-slate-100 text-slate-700';

                  if (showFeedback) {
                    if (isCorrect) {
                      borderClass = 'border-emerald-500 bg-emerald-50';
                      textClass = 'text-emerald-950 font-bold';
                      badgeBg = 'bg-emerald-600 text-white';
                    } else if (isSelected && !isCorrect) {
                      borderClass = 'border-rose-400 bg-rose-50';
                      textClass = 'text-rose-950';
                      badgeBg = 'bg-rose-600 text-white';
                    }
                  } else if (isSelected) {
                    borderClass = 'border-emerald-600 bg-emerald-50/50';
                    textClass = 'text-slate-900 font-semibold';
                    badgeBg = 'bg-emerald-700 text-white';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      disabled={isCurrentAnswered}
                      className={`w-full text-right p-4 rounded-xl border text-sm transition-all flex items-center justify-between gap-4 cursor-pointer disabled:cursor-default ${borderClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 font-mono ${badgeBg}`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className={textClass}>{opt}</span>
                      </div>

                      {showFeedback && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {showFeedback && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant explanation card if answered */}
              {isCurrentAnswered && showInstantExplanation && (
                <div
                  className={`p-4 rounded-xl border text-xs sm:text-sm animate-in fade-in duration-200 ${
                    isCurrentCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    <span>
                      {isCurrentCorrect
                        ? 'إجابة صحيحة ومتقنة! أحسنت.'
                        : 'إجابة غير دقيقة، تعلم منها:'}
                    </span>
                  </div>
                  <p className="leading-relaxed">{currentQ.explanation}</p>
                  <p className="text-slate-500 text-xs mt-1 font-medium">💡 مفتاح السؤال: {currentQ.tip}</p>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-200">
                <button
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  السؤال السابق
                </button>

                {currentIndex < activeQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    السؤال التالي
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinishQuiz}
                    className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-extrabold shadow-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <BookOpenCheck className="w-4 h-4" />
                    تسليم الاختبار وعرض التقرير
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Summary & Learning Feedback Screen */}
        {testMode === 'summary' && quizResult && (
          <div className="max-w-2xl mx-auto bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 text-center">
            {/* Header Icon */}
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900">
                {quizResult.accuracy >= 80
                  ? 'أداء متميز واستيعاب عالي للمعايير!'
                  : quizResult.accuracy >= 50
                  ? 'أداء جيد جداً مع إمكانية تعزيز المهارات'
                  : 'تدريب مبدئي، واصل مراجعة المفاهيم!'}
              </h3>
              <p className="text-xs text-slate-500">
                {quizResult.masteryLevel} · تم تسجيل نتيجتك في تقرير المهارات ومقرراتك
              </p>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-xl border border-slate-200">
              <div>
                <span className="text-xs text-slate-500 block mb-1">نسبة الإتقان</span>
                <span className="text-2xl font-black text-emerald-700 font-mono tabular-nums">
                  {quizResult.accuracy}%
                </span>
              </div>
              <div className="border-x border-slate-100">
                <span className="text-xs text-slate-500 block mb-1">الإجابات الصحيحة</span>
                <span className="text-2xl font-black text-slate-900 font-mono tabular-nums">
                  {quizResult.correctCount} / {quizResult.total}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block mb-1">الوقت المستغرق</span>
                <span className="text-2xl font-black text-slate-800 font-mono tabular-nums">
                  {formatSeconds(quizResult.timeSpent)}
                </span>
              </div>
            </div>

            {/* Diagnostic Advice */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-right text-xs leading-relaxed text-emerald-950">
              <span className="font-bold block mb-1 text-emerald-900">توصية تعليمية للمراجعة:</span>
              {quizResult.accuracy >= 80 ? (
                <span>ممتاز! حافظ على وتيرة القراءة السريعة للأسئلة واستخدم بطاقات الاستذكار السريع لمراجعة القوانين والقواعد المركبة.</span>
              ) : (
                <span>يُنصح بمشاهدة شروحات المعلمين للأسئلة التي واجهت فيها صعوبة، واستخدام بطاقات الاستذكار السريع وحاسبة إدارة الوقت قبل الاختبار القادم.</span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setTestMode('selection')}
                className="py-2.5 px-5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                خوض اختبار آخر
              </button>
              {onNavigateToTools && (
                <button
                  onClick={onNavigateToTools}
                  className="py-2.5 px-5 border border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-900 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <BookOpenCheck className="w-3.5 h-3.5 text-emerald-700" />
                  الانتقال لبطاقات المذاكرة وحاسبة الوقت
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
