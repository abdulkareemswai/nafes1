/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SUBJECTS_DATA, TeacherInfo, VideoLesson, INSTITUTION_INFO } from '../data/nafesData';
import {
  ExternalLink,
  Play,
  Star,
  CheckCircle2,
  Video,
  BookMarked,
  Calculator,
  Microscope,
  GraduationCap,
  School,
  Sparkles,
} from 'lucide-react';

interface VideosAndTeachersProps {
  selectedSubjectId: 'arabic' | 'math' | 'science';
  onSubjectChange: (id: 'arabic' | 'math' | 'science') => void;
}

export const VideosAndTeachers: React.FC<VideosAndTeachersProps> = ({
  selectedSubjectId,
  onSubjectChange,
}) => {
  // Direct playing video ID - video loads right inside the card immediately!
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const currentSubject = SUBJECTS_DATA[selectedSubjectId];
  const currentVideos = currentSubject.videos;

  return (
    <section id="teachers" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with Ministry of Education & Al-Marwah School Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider mb-2">
              <span className="flex items-center gap-1">
                <School className="w-3.5 h-3.5 text-emerald-600" />
                {INSTITUTION_INFO.schoolName}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>{INSTITUTION_INFO.ministryName}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500">القنوات التعليمية والشروحات المعتمدة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              أفضل المعلمين وقنوات الشرح المباشرة لنافس
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-2xl leading-relaxed">
              شاهد مقاطع الفيديو مباشرة داخل المنصة بنقرة واحدة، وتصفح القنوات الرسمية لنخبة معلمي
              المملكة المعتمدين لمواد لغتي والرياضيات والعلوم.
            </p>
          </div>

          {/* Subject Filter */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-xl shadow-xs shrink-0 self-start md:self-auto border border-slate-200">
            <button
              onClick={() => {
                onSubjectChange('arabic');
                setPlayingVideoId(null);
              }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                selectedSubjectId === 'arabic'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              لغتي
            </button>
            <button
              onClick={() => {
                onSubjectChange('math');
                setPlayingVideoId(null);
              }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                selectedSubjectId === 'math'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              الرياضيات
            </button>
            <button
              onClick={() => {
                onSubjectChange('science');
                setPlayingVideoId(null);
              }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                selectedSubjectId === 'science'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Microscope className="w-3.5 h-3.5" />
              العلوم
            </button>
          </div>
        </div>

        {/* Section 1: Top Recommended Teachers */}
        <div className="mb-14">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <GraduationCap className="w-5 h-5 text-emerald-700" />
              <span>نخبة المعلمين المعتمدين لمادة ({currentSubject.name})</span>
            </div>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              روابط مباشرة تفتح القناة الرسمية لكل أستاذ
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentSubject.teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Teacher header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${teacher.avatarBg} text-white flex items-center justify-center font-bold text-lg shadow-xs shrink-0`}
                    >
                      {teacher.name.charAt(2) || 'أ'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-base font-bold text-slate-900 truncate">
                          {teacher.name}
                        </h4>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{teacher.role}</p>
                    </div>
                  </div>

                  {/* Rating & stats strip */}
                  <div className="flex items-center gap-3 text-xs text-slate-500 py-2 border-y border-slate-100 mb-4">
                    <span className="flex items-center gap-1 font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span className="tabular-nums">{teacher.rating}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums font-medium">{teacher.studentsCount}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-medium truncate">{teacher.specialty}</span>
                  </div>

                  {/* Teacher's golden tip */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 mb-5">
                    <span className="text-[11px] font-bold text-emerald-800 block mb-1">
                      نصيحة الأستاذ لطلاب مدرسة المروة:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed italic">
                      "{teacher.tips}"
                    </p>
                  </div>
                </div>

                {/* Direct Channel Link that opens on the teacher's channel */}
                <a
                  href={teacher.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  title={`فتح القناة الرسمية للأستاذ ${teacher.name}`}
                >
                  <span>فتح القناة الرسمية ({teacher.name})</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Direct Inline Video Player Cards */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <Video className="w-5 h-5 text-emerald-700" />
              <span>شروحات فيديو تفاعلية لنافس (تفتح مباشرة بنقرة واحدة)</span>
            </div>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              مشاهدة فورية مدمجة
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentVideos.map((vid) => {
              const isPlaying = playingVideoId === vid.id;

              return (
                <div
                  key={vid.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Direct Player Container */}
                    <div className="relative aspect-[16/9] bg-slate-950 overflow-hidden">
                      {isPlaying ? (
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${vid.youtubeId}?autoplay=1&rel=0`}
                          title={vid.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center relative group p-4 text-center">
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-slate-950/80" />
                          <button
                            onClick={() => setPlayingVideoId(vid.id)}
                            className="relative z-10 w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 cursor-pointer mb-2"
                            title="تشغيل المقطع فوراً"
                          >
                            <Play className="w-6 h-6 fill-white text-white translate-x-[-1px]" />
                          </button>
                          <span className="relative z-10 text-xs font-bold text-white block">
                            انقر للتشغيل المباشر
                          </span>
                          <div className="absolute bottom-2 right-3 text-[10px] font-mono text-white/90 bg-black/70 px-2 py-0.5 rounded">
                            {vid.duration}
                          </div>
                          <div className="absolute top-2 right-3 text-[10px] font-bold text-emerald-300">
                            {currentSubject.name}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug mb-1.5">
                        {vid.title}
                      </h4>
                      <p className="text-xs text-emerald-700 font-semibold mb-2">
                        بإشراف: {vid.teacherName}
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {vid.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center gap-2">
                    <button
                      onClick={() => setPlayingVideoId(isPlaying ? null : vid.id)}
                      className="flex-1 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <Play className="w-3.5 h-3.5 fill-emerald-700 text-emerald-700" />
                      <span>{isPlaying ? 'إيقاف المشغل' : 'تشغيل مباشر الآن'}</span>
                    </button>

                    <a
                      href={vid.directUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap"
                      title="فتح في يوتيوب"
                    >
                      <span>يوتيوب</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
