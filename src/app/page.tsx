'use client';
import { useState } from 'react';
import StudentGuide from '@/components/StudentGuide';

export default function Home() {
  const [mode, setMode] = useState<'entry' | 'student'>('entry');

  if (mode === 'student') return <StudentGuide onBack={() => setMode('entry')} />;

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs text-gray-500 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
            OpenWork × 大手企業前提データ使用
          </div>
          <h1 className="text-3xl font-medium text-gray-900 mb-3 tracking-tight">
            業界・職種<br />
            <span className="text-gray-400">リアル比較ガイド</span>
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto">
            年収・残業・休日・年収カーブをOpenWorkの口コミデータをもとに可視化。
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="font-medium text-amber-800 mb-1 text-sm">📌 前提条件（必ずご確認ください）</p>
          <ul className="text-amber-700 space-y-1 text-xs leading-relaxed">
            <li>・年収データは主に <strong>OpenWork（口コミサイト）の社員クチコミ平均</strong> を使用</li>
            <li>・対象は <strong>大企業・大手企業前提</strong>（関関同立以上が主な就職先となる企業）</li>
            <li>・同じ業界でも <strong>会社・部署・職種によって大きく異なります</strong></li>
            <li>・有給日数・取得率・残業・福利厚生は個社で必ずOpenWorkで再確認を</li>
            <li>・数値は目安であり、保証するものではありません</li>
          </ul>
        </div>

        <button
          onClick={() => setMode('student')}
          className="group w-full bg-white border border-gray-200 rounded-2xl p-6 text-left hover:border-blue-300 hover:shadow-md transition-all"
        >
          <div className="text-3xl mb-3">🎓</div>
          <div className="font-medium text-gray-900 mb-1 text-lg">業界・職種ガイドを開く</div>
          <div className="text-xs text-gray-500 leading-relaxed mb-4">
            大学2〜3年生向け。業界概要・年収カーブ・価値観診断で志望業界を絞る。
          </div>
          <div className="flex flex-wrap gap-1">
            {['業界比較', '年収カーブ', '職種ガイド', '価値観診断'].map(t => (
              <span key={t} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">{t}</span>
            ))}
          </div>
          <div className="mt-4 text-blue-600 text-sm font-medium group-hover:underline">
            開く →
          </div>
        </button>

        <p className="text-center text-xs text-gray-400 mt-6">
          出典：OpenWork、厚労省就労条件総合調査（2025）、各社有価証券報告書
        </p>
      </div>
    </main>
  );
}
