/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SubjectsOverview } from './components/SubjectsOverview';
import { StudyAndSolveGuide } from './components/StudyAndSolveGuide';
import { VideosAndTeachers } from './components/VideosAndTeachers';
import { MockTestsSection } from './components/MockTestsSection';
import { StudentStudyAndSkillsCenter } from './components/StudentStudyAndSkillsCenter';
import { StudentOnboardingModal } from './components/StudentOnboardingModal';
import { Footer } from './components/Footer';
import { Sparkles, ArrowUp } from 'lucide-react';

export default function App() {
  // Student Profile State (Student inputs their own name once)
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('nafes_student_name') || 'طالب متميز';
  });
  const [studentGrade, setStudentGrade] = useState<string>(() => {
    return localStorage.getItem('nafes_student_grade') || 'الصف الثالث المتوسط';
  });
  const [studentSchool, setStudentSchool] = useState<string>(() => {
    return localStorage.getItem('nafes_student_school') || 'مدرسة المروة';
  });
  const [completedQuizzesCount, setCompletedQuizzesCount] = useState<number>(() => {
    const saved = localStorage.getItem('nafes_quizzes_count');
    return saved ? parseInt(saved, 10) : 1;
  });

  // Subject Stats for Diagnosis
  const [arabicStats, setArabicStats] = useState<{ correct: number; total: number }>(() => {
    return { correct: 5, total: 6 };
  });
  const [mathStats, setMathStats] = useState<{ correct: number; total: number }>(() => {
    return { correct: 5, total: 6 };
  });
  const [scienceStats, setScienceStats] = useState<{ correct: number; total: number }>(() => {
    return { correct: 4, total: 6 };
  });

  // Navigation and UI state
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<'arabic' | 'math' | 'science'>('arabic');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Monitor scroll for Back-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (studentName) localStorage.setItem('nafes_student_name', studentName);
    localStorage.setItem('nafes_student_grade', studentGrade);
    localStorage.setItem('nafes_student_school', studentSchool);
    localStorage.setItem('nafes_quizzes_count', completedQuizzesCount.toString());
  }, [studentName, studentGrade, studentSchool, completedQuizzesCount]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSaveProfile = (name: string, grade: string, school: string) => {
    setStudentName(name);
    setStudentGrade(grade);
    setStudentSchool(school);
    setIsOnboardingOpen(false);
    showToast(`أهلاً بك يا ${name}! تم حفظ بياناتك بنجاح في مدرسة ${school} 🌟`);
  };

  const handleQuizCompleted = (correctCount: number, totalQuestions: number) => {
    setCompletedQuizzesCount((prev) => prev + 1);

    // Update diagnosis stats based on selected subject
    if (selectedSubjectId === 'arabic') {
      setArabicStats({ correct: correctCount, total: totalQuestions });
    } else if (selectedSubjectId === 'math') {
      setMathStats({ correct: correctCount, total: totalQuestions });
    } else if (selectedSubjectId === 'science') {
      setScienceStats({ correct: correctCount, total: totalQuestions });
    }

    const accuracy = Math.round((correctCount / totalQuestions) * 100);
    showToast(`تم تسليم الاختبار بنجاح! نسبة الإتقان المحققة: ${accuracy}% 🎯`);
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col font-sans text-slate-100 selection:bg-emerald-500 selection:text-black relative overflow-x-hidden" dir="rtl">
      {/* Ambient background glows for high-end aesthetic depth */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 -left-32 w-[450px] h-[450px] bg-teal-500/8 rounded-full blur-[128px]" />
        <div className="absolute top-2/3 right-10 w-[500px] h-[500px] bg-indigo-500/8 rounded-full blur-[128px]" />
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700/80 text-xs sm:text-sm font-semibold flex items-center gap-2 backdrop-blur-md animate-in fade-in slide-in-from-top-2">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Madrasati-Style Navbar */}
      <Navbar
        studentName={studentName}
        studentSchool={studentSchool}
        onOpenProfile={() => setIsOnboardingOpen(true)}
        onNavigate={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* Madrasati Student Portal Dashboard Hero */}
        <HeroSection
          studentName={studentName}
          studentGrade={studentGrade}
          studentSchool={studentSchool}
          onStartQuiz={() => scrollToSection('tests')}
          onExploreStrategies={() => scrollToSection('strategies')}
          onOpenVideos={() => scrollToSection('teachers')}
          onOpenStudyTools={() => scrollToSection('study-tools')}
          onNavigateSection={scrollToSection}
        />

        {/* Subjects Overview (لغتي، الرياضيات، العلوم فقط) */}
        <SubjectsOverview
          onSelectSubjectStrategy={(subId) => {
            setSelectedSubjectId(subId);
            scrollToSection('strategies');
          }}
          onSelectSubjectQuiz={(subId) => {
            setSelectedSubjectId(subId);
            scrollToSection('tests');
          }}
          onSelectSubjectVideos={(subId) => {
            setSelectedSubjectId(subId);
            scrollToSection('teachers');
          }}
        />

        {/* How to Study & Smart Solution Strategies (طرق المذاكرة وحل الأسئلة الذكية وتفادي الأفخاخ) */}
        <StudyAndSolveGuide
          selectedSubjectId={selectedSubjectId}
          onSubjectChange={setSelectedSubjectId}
        />

        {/* Curated Videos & Best Teachers (with Direct In-Card Player & Direct Channel Links) */}
        <VideosAndTeachers
          selectedSubjectId={selectedSubjectId}
          onSubjectChange={setSelectedSubjectId}
        />

        {/* Realistic Mock Tests (لغتي، الرياضيات، العلوم) */}
        <MockTestsSection
          defaultSubjectId={selectedSubjectId}
          onQuizCompleted={handleQuizCompleted}
          onNavigateToTools={() => scrollToSection('study-tools')}
        />

        {/* Student Study & Skills Center (Flashcards, NAFES Pacing Calculator, 90-Second Trainer, Skills Diagnostic, Cheat Sheets) */}
        <StudentStudyAndSkillsCenter
          studentName={studentName}
          studentGrade={studentGrade}
          studentSchool={studentSchool}
          completedQuizzesCount={completedQuizzesCount}
          arabicStats={arabicStats}
          mathStats={mathStats}
          scienceStats={scienceStats}
          onNavigateToQuiz={() => scrollToSection('tests')}
        />
      </main>

      {/* Footer - Exclusive single placement of student creator honor */}
      <Footer onNavigate={scrollToSection} />

      {/* Student Onboarding & Profile Modal */}
      <StudentOnboardingModal
        isOpen={isOnboardingOpen}
        initialName={studentName}
        initialGrade={studentGrade}
        initialSchool={studentSchool}
        onSave={handleSaveProfile}
        onClose={() => setIsOnboardingOpen(false)}
        isMandatory={false}
      />

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 p-3.5 bg-emerald-600/90 hover:bg-emerald-500 active:scale-95 text-white rounded-full shadow-2xl shadow-emerald-950 transition-all hover:scale-105 cursor-pointer flex items-center justify-center border border-emerald-400/40 backdrop-blur-sm"
          title="العودة لأعلى الصفحة"
          aria-label="العودة لأعلى الصفحة"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
