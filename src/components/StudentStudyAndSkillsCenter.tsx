/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Clock,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  BookMarked,
  Calculator,
  Microscope,
  Timer,
  Play,
  Pause,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  FileText,
  School,
  TrendingUp,
  BookmarkCheck,
} from 'lucide-react';
import { INSTITUTION_INFO } from '../data/nafesData';

interface StudentStudyAndSkillsCenterProps {
  studentName: string;
  studentGrade: string;
  studentSchool: string;
  completedQuizzesCount: number;
  arabicStats: { correct: number; total: number };
  mathStats: { correct: number; total: number };
  scienceStats: { correct: number; total: number };
  onNavigateToQuiz?: () => void;
}

interface Flashcard {
  id: string;
  subject: 'arabic' | 'math' | 'science';
  title: string;
  question: string;
  answer: string;
  nafesTip: string;
  example?: string;
}

const FLASHCARDS_DATA: Flashcard[] = [
  // Arabic Flashcards
  {
    id: 'ar_1',
    subject: 'arabic',
    title: 'قاعدة التفريق بين همزة الوصل والقطع',
    question: 'كيف تكتشف فوراً في اختبار نافس هل الكلمة همزة وصل أم قطع دون حفظ طويل؟',
    answer:
      'ضع حرف (الواو) أو (الفاء) قبل الكلمة وانطقها سريعاً. إذا سقطت الهمزة في النطق ووصلت الحرف بما بعده فهي (وصل) مثل: واسمع، وانطلق، واكتب. وإذا ثبتت الهمزة قسراً في نطقك فهي (قطع) مثل: وأحمد، وإكرام، وأقبل.',
    nafesTip: 'الأسماء والمصادر الخماسية والسداسية (استخراج، انطلاق، ابتسام) همزتها وصل دائماً.',
    example: 'جرب: و + استخرج = وَسْتَخْرَجَ (سقطت = وصل) | و + أرسل = وَأَرْسَلَ (ثبتت = قطع).',
  },
  {
    id: 'ar_2',
    subject: 'arabic',
    title: 'التمييز الدقيق بين الحقيقة والرأي',
    question: 'كيف تفرق بين (حقيقة علمية) و(رأي شخصي) في أسئلة استيعاب المقروء؟',
    answer:
      'الحقيقة تعتمد على إثبات مادي أو أرقام أو تواريخ أو قوانين علمية قابلة للقياس والتحقق. أما الرأي فيتضمن وجهة نظر شخصية، مشاعر، أو أحكاماً تقييمية تختلف من شخص لآخر.',
    nafesTip: 'أي عبارة تحتوي على صيغ التفضيل (أفضل، أجمل، أروع، أقسى) هي رأي غالباً وليست حقيقة.',
    example: 'حقيقة: «تبلغ مساحة المملكة حوالي 2 مليون كم²». رأي: «مدينة أبها هي أجمل مدن المملكة».',
  },
  {
    id: 'ar_3',
    subject: 'arabic',
    title: 'الاستدلال وفهم المعنى السياقي',
    question: 'سؤال: ما المعنى الأقرب للكلمة كما وردت في سياق النص؟',
    answer:
      'لا تتسرع باختيار المعنى المعجمي الشائع الذي تحفظه للكلمة! اذهب فوراً للجملة في النص واستبدل الكلمة بالخيارات الأربعة بالتناوب، والبديل الذي يحافظ على سياق الجملة ومنطقها هو الإجابة الصحيحة.',
    nafesTip: 'في نافس تأتي الكلمات متعددة المعاني (المشتركة)، لذا السياق هو الحاكم الوحيد.',
    example: 'كلمة «قضى» في «قضى القاضي بالعدل» تعني حكم، بينما في «قضى الرجل نحبه» تعني مات.',
  },
  {
    id: 'ar_4',
    subject: 'arabic',
    title: 'الألف المتطرفة (القائمة والمقصورة)',
    question: 'متى تكتب الألف المتطرفة قائمة (دعا) ومتى تكتب مقصورة (قضى) في الأفعال الثلاثية؟',
    answer:
      'حوّل الفعل الثلاثي إلى صيغة المضارع مباشرة: إذا انقلبت الألف في المضارع واواً كُتبت قائمة (دعا -> يدعو، رجا -> يرجو). وإذا انقلبت ياءً كُتبت مقصورة على صورة ياء غير منقوطة (قضى -> يقضي، بنى -> يبني).',
    nafesTip: 'في الأسماء غير الثلاثية تكتب الألف قائمة إذا سبقتها ياء (دنيا، قضايا)، وتكتب مقصورة إذا لم تسبقها ياء (مستشفى، فتى).',
    example: 'دعا -> يدعو (قائمة) | رمى -> يرمي (مقصورة).',
  },

  // Math Flashcards
  {
    id: 'ma_1',
    subject: 'math',
    title: 'ترتيب العمليات الحسابية الصارم (PEMDAS)',
    question: 'ما هو الترتيب الواجب اتباعه لحل مسألة حسابية مركبة في اختبار نافس؟',
    answer:
      'الترتيب من اليمين إلى اليسار: 1. فك ما بداخل الأقواس أولاً. 2. حساب الأسس والجذور. 3. إجراء الضرب والقسمة (أيهما يأتي أولاً من اليمين). 4. إجراء الجمع والطرح (أيهما يأتي أولاً من اليمين).',
    nafesTip: 'الفخ الشائع هو الجمع قبل الضرب! تذكر دائماً أن الضرب والقسمة أقوى من الجمع والطرح.',
    example: 'احسب: 6 + 4 × 3 = 6 + 12 = 18 (وليس 10 × 3 = 30!).',
  },
  {
    id: 'ma_2',
    subject: 'math',
    title: 'حساب النسبة المئوية ذهنياً في 5 ثوانٍ',
    question: 'كيف تحسب 15% أو 20% أو 5% من أي رقم دون قلم ورقة؟',
    answer:
      'احسب 10% أولاً بتحريك الفاصلة خانة واحدة إلى اليسار (أو حذف صفر). ثم: 5% هي نصف الـ 10%. 15% هي الـ 10% مضافاً إليها الـ 5%. 20% هي ضعف الـ 10%.',
    nafesTip: 'تفكيك النسب المئوية ذهنياً يوفر دقيقة كاملة لكل مسألة نسب في نافس.',
    example: 'لحساب 15% من 240: 10% = 24، و 5% = 12، إذن 15% = 24 + 12 = 36.',
  },
  {
    id: 'ma_3',
    subject: 'math',
    title: 'مقارنة الكسور بطريقة المقص السريعة',
    question: 'كيف تقارن سريعاً بين كسرين مثل 4/5 و 7/9 دون توحيد مقامات طويل؟',
    answer:
      'استخدم الضرب التبادلي (طريقة المقص): اضرب بسط الكسر الأول في مقام الكسر الثاني (4 × 9 = 36)، واضرب بسط الكسر الثاني في مقام الكسر الأول (7 × 5 = 35). قارن الناتجين: 36 > 35 إذن 4/5 > 7/9.',
    nafesTip: 'الرقم الناتج يوضع دائماً فوق البسط الذي ضربت به.',
    example: 'بين 3/7 و 2/5: 3 × 5 = 15 و 2 × 7 = 14. بما أن 15 > 14 إذن 3/7 أكبر.',
  },
  {
    id: 'ma_4',
    subject: 'math',
    title: 'مساحات ومحيطات الأشكال الهندسية',
    question: 'ما القوانين الذهبية لمحيط ومساحة المستطيل والمربع والدائرة؟',
    answer:
      'المحيط هو طول الإطار الخارجي، والمساحة هي الفراغ الداخلي: المستطيل: المحيط = 2 × (الطول + العرض)، المساحة = الطول × العرض. المربع: المحيط = 4 × طول الضلع، المساحة = طول الضلع × نفسه. الدائرة: المحيط = 2 ط نق، المساحة = ط نق² (ط ≈ 3.14).',
    nafesTip: 'انتبه لوحدات القياس! المحيط بوحدة مفردة (سم أو م)، والمساحة بالتربيع (سم² أو م²).',
  },

  // Science Flashcards
  {
    id: 'sc_1',
    subject: 'science',
    title: 'المتغير المستقل والمتغير التابع في التجارب',
    question: 'كيف تميز بسهولة بين المتغير المستقل والمتغير التابع في تجارب نافس الاستقصائية؟',
    answer:
      'المتغير المستقل: هو العامل الذي يغيره الباحث عمداً بيده (هو السبب). المتغير التابع: هو النتيجة التي نقيسها ونلاحظها ونراقب تغيرها (هو الأثر). المتغيرات الثابتة: هي العوامل التي نبقيها كما هي لضمان عدالة التجربة.',
    nafesTip: 'في الرسم البياني: المتغير المستقل دائماً على المحور الأفقي (س)، والتابع على المحور الرأسي (ص).',
    example: 'تجربة لمعرفة أثر كمية الماء على نمو النبات: كمية الماء = مستقل | طول النبات = تابع | نوع التربة والضوء = ثوابت.',
  },
  {
    id: 'sc_2',
    subject: 'science',
    title: 'تحولات الطاقة وقانون حفظ الطاقة',
    question: 'ما القاعدة الأساسية لتحولات الطاقة وما أشهر التطبيقات الشائعة في نافس؟',
    answer:
      'قانون حفظ الطاقة: الطاقة لا تفنى ولا تستحدث من العدم، بل تتحول من شكل إلى آخر. التطبيقات: المولد الكهربائي (حركية -> كهربائية)، المحرك أو المروحة (كهربائية -> حركية)، البناء الضوئي (ضوئية مشعة -> كيميائية)، البطارية (كيميائية -> كهربائية).',
    nafesTip: 'ركز على أي طاقة ضائعة أثناء التحول؛ غالباً ما تكون طاقة حرارية غير مرغوب فيها.',
  },
  {
    id: 'sc_3',
    subject: 'science',
    title: 'السلاسل والشبكات الغذائية وتدفق الطاقة',
    question: 'من أين تبدأ السلسلة الغذائية دائماً وكيف تنتقل الطاقة بين مستوياتها؟',
    answer:
      'تبدأ السلسلة الغذائية دائماً بكائن مُنتِج (نبات أو طحلب مائي يصنع غذاءه بنفسه عبر البناء الضوئي)، يليه مستهلك أول (عاشب)، ثم مستهلك ثانٍ وثالث (لاحم أو قارت). تنتهي السلاسل بالمحللات. تنتقل فقط 10% من الطاقة إلى المستوى التالي وتفقد 90% كحرارة!',
    nafesTip: 'السهم في السلسلة الغذائية يتجه دائماً من الفريسة إلى المفترس (أي يشير لاتجاه تدفق الطاقة).',
  },
  {
    id: 'sc_4',
    subject: 'science',
    title: 'التغير الفيزيائي مقابل التغير الكيميائي',
    question: 'ما المعيار الفاصل للتفرقة بين التغير الفيزيائي والكيميائي للمادة؟',
    answer:
      'التغير الفيزيائي: يغير الشكل أو الحالة أو الحجم فقط دون تكوين مادة جديدة، ويمكن إرجاعه غالباً (مثل: ذوبان الثلج، كسر الزجاج، تقطيع الورق). التغير الكيميائي: تتغير فيه هوية المادة وتتكون روابط جديدة بمواد جديدة وخصائص جديدة، ويصاحبه غالباً حرارة أو غاز أو تغير لون (مثل: صدأ الحديد، احتراق الخشب، طهي الطعام).',
    nafesTip: 'ذوبان السكر أو الملح في الماء هو تغير فيزيائي وليس كيميائياً لأنه يمكن فصله بالتبخير.',
  },
];

export const StudentStudyAndSkillsCenter: React.FC<StudentStudyAndSkillsCenterProps> = ({
  studentName,
  studentGrade,
  studentSchool,
  completedQuizzesCount,
  arabicStats,
  mathStats,
  scienceStats,
  onNavigateToQuiz,
}) => {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'pacing' | 'diagnosis' | 'cheatsheet'>(
    'flashcards'
  );

  // Flashcards State
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<'all' | 'arabic' | 'math' | 'science'>('all');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});

  // Pacing Calculator State
  const [selectedExamPreset, setSelectedExamPreset] = useState<'grade_3' | 'grade_6_9' | 'custom'>('grade_6_9');
  const [customQuestionCount, setCustomQuestionCount] = useState<number>(30);
  const [customDurationMinutes, setCustomDurationMinutes] = useState<number>(45);

  // Pacing Trainer State
  const [isTrainerRunning, setIsTrainerRunning] = useState<boolean>(false);
  const [trainerSecondsLeft, setTrainerSecondsLeft] = useState<number>(90);
  const [trainerTargetSeconds, setTrainerTargetSeconds] = useState<number>(90);

  // Timer Effect for Pacing Trainer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTrainerRunning && trainerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTrainerSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsTrainerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTrainerRunning, trainerSecondsLeft]);

  const startTrainer = (seconds: number) => {
    setTrainerTargetSeconds(seconds);
    setTrainerSecondsLeft(seconds);
    setIsTrainerRunning(true);
  };

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleMastered = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMasteredCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFlashcards = FLASHCARDS_DATA.filter((c) => {
    if (selectedSubjectFilter === 'all') return true;
    return c.subject === selectedSubjectFilter;
  });

  // Calculate pacing numbers
  const questionsCount =
    selectedExamPreset === 'grade_3'
      ? 20
      : selectedExamPreset === 'grade_6_9'
      ? 30
      : customQuestionCount;

  const durationMinutes =
    selectedExamPreset === 'grade_3'
      ? 30
      : selectedExamPreset === 'grade_6_9'
      ? 45
      : customDurationMinutes;

  const totalSeconds = durationMinutes * 60;
  const secondsPerQuestion = Math.round(totalSeconds / (questionsCount || 1));
  const pass1SecondsPerQ = Math.round(secondsPerQuestion * 0.65);
  const reviewBufferMinutes = Math.round(durationMinutes * 0.25);

  // Diagnosis stats percentages
  const arabicPct = Math.round(((arabicStats.correct || 5) / (arabicStats.total || 6)) * 100);
  const mathPct = Math.round(((mathStats.correct || 5) / (mathStats.total || 6)) * 100);
  const sciencePct = Math.round(((scienceStats.correct || 4) / (scienceStats.total || 6)) * 100);
  const overallAvg = Math.round((arabicPct + mathPct + sciencePct) / 3);

  return (
    <section id="study-tools" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-900 text-xs font-bold mb-3 border border-emerald-300/80">
            <School className="w-3.5 h-3.5 text-emerald-700" />
            <span>أدوات التفوق الدراسي · {studentSchool || INSTITUTION_INFO.schoolName}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            بطاقات الاستذكار السريع وحاسبة وقت اختبار نافس
          </h2>
          <p className="text-slate-600 mt-2 text-xs sm:text-sm leading-relaxed">
            مجموعة أدوات تعليمية تفاعلية مصممة خصيصاً لطلاب مدرسة المروة لمراجعة أهم القواعد،
            وتدريب الذاكرة على وتيرة الوقت المعيارية، وتشخيص نقاط القوة في المواد الثلاث المقررة.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-slate-200 text-xs sm:text-sm font-bold no-scrollbar">
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'flashcards'
                ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-700/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>بطاقات الاستذكار السريع ({FLASHCARDS_DATA.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pacing')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'pacing'
                ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-700/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Timer className="w-4 h-4" />
            <span>حاسبة وقت نافس ومدرّب الوتيرة</span>
          </button>

          <button
            onClick={() => setActiveTab('diagnosis')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'diagnosis'
                ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-700/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>لوحة تشخيص المهارات ({studentName || 'الطالب'})</span>
          </button>

          <button
            onClick={() => setActiveTab('cheatsheet')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'cheatsheet'
                ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-700/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>الملخص الذهبي وقوانين نافس</span>
          </button>
        </div>

        {/* TAB 1: FLASHCARDS */}
        {activeTab === 'flashcards' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Filter pills & instructions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-slate-500 font-bold ml-1">تصفية المادة:</span>
                <button
                  onClick={() => setSelectedSubjectFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedSubjectFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  الكل ({FLASHCARDS_DATA.length})
                </button>
                <button
                  onClick={() => setSelectedSubjectFilter('arabic')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    selectedSubjectFilter === 'arabic'
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  <BookMarked className="w-3.5 h-3.5" />
                  <span>لغتي</span>
                </button>
                <button
                  onClick={() => setSelectedSubjectFilter('math')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    selectedSubjectFilter === 'math'
                      ? 'bg-teal-700 text-white'
                      : 'bg-teal-50 text-teal-800 hover:bg-teal-100'
                  }`}
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>الرياضيات</span>
                </button>
                <button
                  onClick={() => setSelectedSubjectFilter('science')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    selectedSubjectFilter === 'science'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  <Microscope className="w-3.5 h-3.5" />
                  <span>العلوم</span>
                </button>
              </div>

              <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>انقر على أي بطاقة لقلبها وقراءة الحل وحيلة نافس الذهبية</span>
              </div>
            </div>

            {/* Flashcards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFlashcards.map((card) => {
                const isFlipped = !!flippedCards[card.id];
                const isMastered = !!masteredCards[card.id];

                const subjectColor =
                  card.subject === 'arabic'
                    ? 'border-amber-300/80 bg-amber-500/5'
                    : card.subject === 'math'
                    ? 'border-teal-300/80 bg-teal-500/5'
                    : 'border-emerald-300/80 bg-emerald-500/5';

                const subjectBadge =
                  card.subject === 'arabic'
                    ? 'bg-amber-100 text-amber-800 border-amber-200'
                    : card.subject === 'math'
                    ? 'bg-teal-100 text-teal-800 border-teal-200'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-200';

                return (
                  <div
                    key={card.id}
                    onClick={() => toggleFlip(card.id)}
                    className={`relative min-h-[300px] rounded-2xl border-2 transition-all p-5 flex flex-col justify-between cursor-pointer select-none shadow-xs hover:shadow-md ${subjectColor} ${
                      isFlipped ? 'bg-white ring-2 ring-emerald-500/30' : 'bg-white'
                    }`}
                  >
                    {/* Top Row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${subjectBadge}`}>
                        {card.subject === 'arabic'
                          ? 'لغتي'
                          : card.subject === 'math'
                          ? 'الرياضيات'
                          : 'العلوم'}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => toggleMastered(card.id, e)}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1 ${
                            isMastered
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-slate-100 hover:bg-emerald-50 text-slate-600 border-slate-200'
                          }`}
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 ${isMastered ? 'text-emerald-700' : 'text-slate-400'}`} />
                          <span>{isMastered ? 'متقنة' : 'أحتاج مراجعة'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Content (Front vs Back) */}
                    <div className="flex-1 flex flex-col justify-center my-2">
                      {!isFlipped ? (
                        <div className="space-y-3">
                          <span className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">
                            الوجه الأمامي (سؤال / فكرة معيارية)
                          </span>
                          <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                            {card.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100 font-medium">
                            {card.question}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2.5 animate-in fade-in duration-200">
                          <span className="text-[11px] text-emerald-700 font-bold block uppercase tracking-wider flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            الوجه الخلفي (القاعدة والحل الذكي)
                          </span>
                          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
                            {card.answer}
                          </p>
                          {card.example && (
                            <div className="bg-slate-100/80 p-2.5 rounded-lg text-xs text-slate-700 border border-slate-200 font-mono">
                              {card.example}
                            </div>
                          )}
                          <div className="bg-amber-50 p-2.5 rounded-lg text-[11px] text-amber-900 border border-amber-200 font-medium">
                            <strong className="font-bold">💡 حيلة نافس:</strong> {card.nafesTip}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Flip Indicator */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span>انقر للقلب {isFlipped ? '(للأمام)' : '(للخلف)'}</span>
                      <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: NAFES PACING CALCULATOR & 90-SECOND TRAINER */}
        {activeTab === 'pacing' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Calculator Control Panel */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-700" />
                    <span>حاسبة إدارة الوقت المعيارية لاختبار نافس</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    احسب الزمن المثالي لكل سؤال وطبق استراتيجية الجولتين لتفادي نفاد الوقت
                  </p>
                </div>

                {/* Exam Preset Switcher */}
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedExamPreset('grade_3')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedExamPreset === 'grade_3'
                        ? 'bg-emerald-700 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    الصف الثالث الابتدائي (20 سؤال / 30 دقيقة)
                  </button>
                  <button
                    onClick={() => setSelectedExamPreset('grade_6_9')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedExamPreset === 'grade_6_9'
                        ? 'bg-emerald-700 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    الصف السادس والثالث المتوسط (30 سؤال / 45 دقيقة)
                  </button>
                  <button
                    onClick={() => setSelectedExamPreset('custom')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedExamPreset === 'custom'
                        ? 'bg-emerald-700 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    تخصيص يدوي
                  </button>
                </div>
              </div>

              {/* Custom inputs if selected */}
              {selectedExamPreset === 'custom' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-b border-slate-100">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">عدد الأسئلة:</label>
                    <input
                      type="number"
                      min={5}
                      max={60}
                      value={customQuestionCount}
                      onChange={(e) => setCustomQuestionCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
                      className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">الزمن الكلي (بالدقائق):</label>
                    <input
                      type="number"
                      min={10}
                      max={120}
                      value={customDurationMinutes}
                      onChange={(e) => setCustomDurationMinutes(Math.max(1, parseInt(e.target.value, 10) || 1))}
                      className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm font-bold"
                    />
                  </div>
                </div>
              )}

              {/* Calculated Outputs Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-right">
                  <span className="text-[11px] font-bold text-emerald-800 block mb-1">
                    الوقت المتاح لكل سؤال
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-950 font-mono">
                    {secondsPerQuestion} ثانية
                  </div>
                  <span className="text-[10px] text-emerald-700 mt-1 block">
                    (ما يعادل {Math.floor(secondsPerQuestion / 60)} دقيقة و {secondsPerQuestion % 60} ثانية)
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-right">
                  <span className="text-[11px] font-bold text-teal-800 block mb-1">
                    الجولة الأولى (الأسئلة المباشرة)
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-teal-950 font-mono">
                    {pass1SecondsPerQ} ثانية
                  </div>
                  <span className="text-[10px] text-teal-700 mt-1 block">
                    حل الأسئلة السريعة ووضع علامة على المعقدة
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-right">
                  <span className="text-[11px] font-bold text-amber-800 block mb-1">
                    وقت المراجعة والأسئلة المركبة
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-amber-950 font-mono">
                    {reviewBufferMinutes} دقيقة
                  </div>
                  <span className="text-[10px] text-amber-700 mt-1 block">
                    مخصصة للعودة وتدقيق ورقة الإجابة
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-right">
                  <span className="text-[11px] font-bold text-slate-700 block mb-1">
                    إجمالي الاختبار
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                    {durationMinutes} دقيقة
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    {questionsCount} سؤالاً معيارياً
                  </span>
                </div>
              </div>

              {/* Two-Pass Strategy Guide */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>استراتيجية الجولتين الذهبية لاختبارات نافس:</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <strong className="text-emerald-800 font-bold block mb-1">الجولة 1: الحصاد السريع (أول 65% من الوقت)</strong>
                    <p className="leading-relaxed">
                      ابدأ بالأسئلة المباشرة التي تعرف إجابتها فوراً. إذا استغرق السؤال أكثر من 60 ثانية، ضع علامة تذكير وانتقل للذي يليه فوراً دون أن تحبط نفسك!
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <strong className="text-amber-800 font-bold block mb-1">الجولة 2: التفكير والتدقيق (آخر 35% من الوقت)</strong>
                    <p className="leading-relaxed">
                      عد للأسئلة المعلمة بعلامة. استخدم استراتيجية استبعاد الخيارات الخاطئة. تأكد تماماً أنك لم تترك أي فقرة مظللة فارغة قبل تسليم ورقة نافس!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive 90-Second Pacing Trainer */}
            <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="max-w-2xl mx-auto text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold border border-white/20">
                  <Timer className="w-3.5 h-3.5" />
                  <span>مدرّب وتيرة الإجابة المعيارية (Pacing Trainer)</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black">
                  درب عقلك على إيقاع الـ 90 ثانية لكل سؤال
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  معظم الطلاب في نافس يخسرون درجات ليس بسبب صعوبة السؤال، بل لعدم إدراكهم مرور 90 ثانية!
                  اضغط على الزر واقرأ أي مسألة تجريبية لتعرف متى ينتهي وقت السؤال الفعلي.
                </p>

                {/* Big Stopwatch Display */}
                <div className="py-6">
                  <div className="text-5xl sm:text-7xl font-black font-mono tracking-wider tabular-nums text-emerald-300">
                    00:{trainerSecondsLeft < 10 ? `0${trainerSecondsLeft}` : trainerSecondsLeft}
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full max-w-md mx-auto bg-white/10 h-3 rounded-full mt-4 overflow-hidden p-0.5 border border-white/20">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        trainerSecondsLeft > 45
                          ? 'bg-emerald-400'
                          : trainerSecondsLeft > 15
                          ? 'bg-amber-400'
                          : 'bg-rose-500 animate-pulse'
                      }`}
                      style={{
                        width: `${(trainerSecondsLeft / trainerTargetSeconds) * 100}%`,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between max-w-md mx-auto text-[11px] text-slate-400 mt-2">
                    <span>قراءة واستيعاب (0-40ث)</span>
                    <span>تحليل واستبعاد (40-75ث)</span>
                    <span className="text-rose-300 font-bold">تظليل الإجابة (75-90ث)</span>
                  </div>
                </div>

                {/* Trainer Action Controls */}
                <div className="flex items-center justify-center gap-3">
                  {!isTrainerRunning ? (
                    <button
                      onClick={() => startTrainer(90)}
                      className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>بدء تحدي الـ 90 ثانية</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsTrainerRunning(false)}
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                    >
                      <Pause className="w-4 h-4 fill-current" />
                      <span>إيقاف مؤقت</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setIsTrainerRunning(false);
                      setTrainerSecondsLeft(90);
                    }}
                    className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm transition-colors border border-white/20 flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>إعادة الضبط</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SKILLS DIAGNOSIS */}
        {activeTab === 'diagnosis' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Student Header Summary Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>تقرير تشخيص المهارات الأكاديمية</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  الطالب: {studentName || 'طالب مدرسة المروة'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  {studentGrade} · {studentSchool || INSTITUTION_INFO.schoolName} · الاختبارات المنجزة: {completedQuizzesCount}
                </p>
              </div>

              {/* Overall Proficiency Circle */}
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="text-center">
                  <div className="text-3xl font-black text-emerald-800 font-mono tabular-nums">
                    {overallAvg}%
                  </div>
                  <span className="text-[11px] text-slate-500 font-bold">متوسط الإتقان العام</span>
                </div>
                <div className="border-r border-slate-200 pr-4 text-xs font-semibold text-slate-700">
                  <div className="text-emerald-700 font-bold">مستوى ممتاز ومتقدم</div>
                  <span className="text-[11px] text-slate-500">جاهزية عالية لاختبار نافس</span>
                </div>
              </div>
            </div>

            {/* Three Subjects Diagnostic Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Arabic Diagnostic */}
              <div className="bg-white rounded-2xl border border-amber-200 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 border border-amber-200">
                      لغتي
                    </span>
                    <span className="text-lg font-black text-amber-900 font-mono">{arabicPct}%</span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 mb-2">
                    المهارات القرائية واللغوية
                  </h4>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-3">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${arabicPct}%` }} />
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>استيعاب المقروء والمعاني الضمنية: ممتاز</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>قواعد الهمزات والألف المتطرفة: متقن</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-amber-900 font-medium bg-amber-50/60 p-2.5 rounded-xl">
                  💡 نصيحة: استمر في قراءة النصوص الطويلة لزيادة سرعة القراءة الفاحصة.
                </div>
              </div>

              {/* Math Diagnostic */}
              <div className="bg-white rounded-2xl border border-teal-200 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-teal-100 text-teal-800 border border-teal-200">
                      الرياضيات
                    </span>
                    <span className="text-lg font-black text-teal-900 font-mono">{mathPct}%</span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 mb-2">
                    التفكير وحل المشكلات الرياضية
                  </h4>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-3">
                    <div className="bg-teal-600 h-full rounded-full" style={{ width: `${mathPct}%` }} />
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>العمليات العددية وترتيب العمليات: متمكن</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>الكسور والنسب المئوية والهندسة: ممتاز</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-teal-900 font-medium bg-teal-50/60 p-2.5 rounded-xl">
                  💡 نصيحة: احرص على استخدام الضرب التبادلي والحل الذهني للنسب لتوفير الوقت.
                </div>
              </div>

              {/* Science Diagnostic */}
              <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200">
                      العلوم
                    </span>
                    <span className="text-lg font-black text-emerald-900 font-mono">{sciencePct}%</span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 mb-2">
                    الاستقصاء والتفكير العلمي
                  </h4>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-3">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${sciencePct}%` }} />
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>ضبط المتغيرات المستقلة والتابعة: متميز</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>السلاسل الغذائية وتحولات الطاقة: متقن</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-900 font-medium bg-emerald-50/60 p-2.5 rounded-xl">
                  💡 نصيحة: راجع الرسوم البيانية للتجارب واستخرج النتيجة من قمم المنحنيات.
                </div>
              </div>
            </div>

            {onNavigateToQuiz && (
              <div className="pt-4 text-center">
                <button
                  onClick={onNavigateToQuiz}
                  className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2 mx-auto cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>خوض اختبار تجريبي جديد لتحديث التشخيص</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: GOLDEN CHEAT SHEET */}
        {activeTab === 'cheatsheet' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    الملخص الذهبي وقوانين نافس السريعة (للمراجعة المركزة)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    أهم القواعد والقوانين التي تتكرر باستمرار في اختبارات نافس الوطنية
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Arabic Column */}
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-amber-800 flex items-center gap-1.5 pb-2 border-b-2 border-amber-400">
                    <BookMarked className="w-4 h-4" />
                    <span>قواعد لغتي الذهبية</span>
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200">
                      <span className="font-bold text-slate-900 block mb-1">الهمزة المتوسطة:</span>
                      <p className="text-slate-600 leading-relaxed">
                        سلم قوى الحركات: 1. الكسرة (يناسبها الياء ئـ). 2. الضمة (الواو ؤ). 3. الفتحة (الألف أ). 4. السكون.
                      </p>
                    </div>
                    <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200">
                      <span className="font-bold text-slate-900 block mb-1">المفعول المطلق:</span>
                      <p className="text-slate-600 leading-relaxed">
                        اسم منصوب مشتق من لفظ الفعل لتأكيده أو بيان نوعه أو عدده (مثل: ركض ركضاً سريعاً).
                      </p>
                    </div>
                    <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200">
                      <span className="font-bold text-slate-900 block mb-1">أدوات الربط والسببية:</span>
                      <p className="text-slate-600 leading-relaxed">
                        (لذلك، لأن، نظراً لـ، مما أدى إلى) تشير لعلاقة سببية منطقية بين الجملتين.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Math Column */}
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-teal-800 flex items-center gap-1.5 pb-2 border-b-2 border-teal-400">
                    <Calculator className="w-4 h-4" />
                    <span>قوانين الرياضيات الذهبية</span>
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="bg-teal-50/60 p-3 rounded-xl border border-teal-200">
                      <span className="font-bold text-slate-900 block mb-1">مساحة المثلث:</span>
                      <p className="text-slate-600 leading-relaxed font-mono">
                        المساحة = (القاعدة × الارتفاع) ÷ 2
                      </p>
                    </div>
                    <div className="bg-teal-50/60 p-3 rounded-xl border border-teal-200">
                      <span className="font-bold text-slate-900 block mb-1">حساب المتوسط الحسابي:</span>
                      <p className="text-slate-600 leading-relaxed">
                        المتوسط = مجموع القيم ÷ عددها الكلي.
                      </p>
                    </div>
                    <div className="bg-teal-50/60 p-3 rounded-xl border border-teal-200">
                      <span className="font-bold text-slate-900 block mb-1">الزوايا المتتامة والمتكاملة:</span>
                      <p className="text-slate-600 leading-relaxed">
                        المتتامتان: مجموعهما = 90°. المتكاملتان: مجموعهما = 180°.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Science Column */}
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-emerald-800 flex items-center gap-1.5 pb-2 border-b-2 border-emerald-400">
                    <Microscope className="w-4 h-4" />
                    <span>مفاهيم العلوم الذهبية</span>
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200">
                      <span className="font-bold text-slate-900 block mb-1">قانون السرعة:</span>
                      <p className="text-slate-600 leading-relaxed font-mono">
                        السرعة = المسافة ÷ الزمن (م/ث أو كم/س)
                      </p>
                    </div>
                    <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200">
                      <span className="font-bold text-slate-900 block mb-1">الكثافة والطفو:</span>
                      <p className="text-slate-600 leading-relaxed">
                        الكثافة = الكتلة ÷ الحجم. الجسم الأقل كثافة من الماء يطفو، والأعلى يغوص.
                      </p>
                    </div>
                    <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200">
                      <span className="font-bold text-slate-900 block mb-1">الخلية النباتية والحيوانية:</span>
                      <p className="text-slate-600 leading-relaxed">
                        النباتية تنفرد بوجود: 1. الجدار الخلوي. 2. البلاستيدات الخضراء. 3. فجوة عصارية كبيرة.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
