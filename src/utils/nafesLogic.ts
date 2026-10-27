/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Question {
  id: string;
  subject: 'arabic' | 'math' | 'science';
  question: string;
  passage?: string;
  diagramSvg?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  tip: string;
}

export interface StudentStats {
  name: string;
  grade: string;
  school: string;
  points: number;
  completedQuizzes: number;
  arabicScore: { correct: number; total: number };
  mathScore: { correct: number; total: number };
  scienceScore: { correct: number; total: number };
  tasksCompleted: string[];
}

export interface SubjectProficiency {
  subject: 'arabic' | 'math' | 'science';
  title: string;
  percentage: number;
  level: 'متقدم' | 'متمكن' | 'في طور التقدم' | 'يحتاج دعم';
  recommendation: string;
}

/**
 * Calculates total quiz score with accuracy points and time bonus.
 */
export function calculateQuizScore(
  correctCount: number,
  totalQuestions: number,
  timeTakenSeconds: number,
  timeLimitSeconds: number
): { pointsEarned: number; accuracyPercentage: number; timeBonus: number } {
  if (totalQuestions <= 0) {
    return { pointsEarned: 0, accuracyPercentage: 0, timeBonus: 0 };
  }

  const basePointsPerCorrect = 50;
  const basePoints = correctCount * basePointsPerCorrect;
  const accuracyPercentage = Math.round((correctCount / totalQuestions) * 100);

  // Time bonus is granted only if accuracy is at least 60%
  let timeBonus = 0;
  if (accuracyPercentage >= 60 && timeLimitSeconds > timeTakenSeconds) {
    const remainingRatio = (timeLimitSeconds - timeTakenSeconds) / timeLimitSeconds;
    timeBonus = Math.round(remainingRatio * 30 * (correctCount / totalQuestions));
  }

  // Perfect score bonus
  const perfectBonus = correctCount === totalQuestions ? 50 : 0;
  const pointsEarned = basePoints + timeBonus + perfectBonus;

  return { pointsEarned, accuracyPercentage, timeBonus: timeBonus + perfectBonus };
}

/**
 * Evaluates subject proficiencies based on correct and total answers
 */
export function evaluateSubjectProficiency(
  subject: 'arabic' | 'math' | 'science',
  correct: number,
  total: number
): SubjectProficiency {
  const titles = {
    arabic: 'لغتي والمهارات القرائية',
    math: 'الرياضيات والتفكير المنطقي',
    science: 'العلوم والاستقصاء العلمي',
  };

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  let level: SubjectProficiency['level'] = 'يحتاج دعم';
  let recommendation = '';

  if (percentage >= 85) {
    level = 'متقدم';
    recommendation = 'أداء استثنائي! واصل حل النماذج الشاملة للحفاظ على مستواك العالي.';
  } else if (percentage >= 70) {
    level = 'متمكن';
    recommendation = 'مستوى متميز، راجع استراتيجيات استبعاد الخيارات لتحقيق العلامة الكاملة.';
  } else if (percentage >= 50) {
    level = 'في طور التقدم';
    recommendation = 'مستوى جيد، ننصح بمشاهدة مقاطع الفيديو للشروحات وحل المزيد من التمارين.';
  } else {
    level = 'يحتاج دعم';
    recommendation = 'ركز على مراجعة المفاهيم الأساسية وأوراق القواعد قبل إعادة الاختبار.';
  }

  return {
    subject,
    title: titles[subject],
    percentage,
    level,
    recommendation,
  };
}

/**
 * Formats seconds into mm:ss display
 */
export function formatSeconds(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${formattedMinutes}:${formattedSeconds}`;
}

/**
 * Calculates schedule completion rate
 */
export function calculateScheduleProgress(completedTaskIds: string[], totalTasksCount: number): number {
  if (totalTasksCount <= 0) return 0;
  return Math.min(100, Math.round((completedTaskIds.length / totalTasksCount) * 100));
}

/**
 * Generates certificate verification code
 */
export function generateCertificateCode(studentName: string, dateStr: string): string {
  const clean = studentName.trim().slice(0, 4);
  const cleanDate = dateStr.replace(/-/g, '');
  return `NAFES-${cleanDate}-${Math.abs(clean.charCodeAt(0) || 77)}${Math.abs(clean.charCodeAt(1) || 88)}`;
}
