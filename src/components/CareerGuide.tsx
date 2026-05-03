'use client';
import { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend, ReferenceLine } from 'recharts';
import { industries, SALARY_AGES } from '@/data/industries';

const CURVE_COLORS = ['#378ADD','#1D9E75','#BA7517','#534AB7','#E24B4A','#0F6E56','#3B6D11','#993556'];

const CAREER_TABS = [
  { key: 'sim', label: '年収シミュレーション' },
  { key: 'map', label: 'ポジショニングマップ' },
  { key: 'score', label: 'OpenWorkスコア分析' },
  { key: 'path', label: 'キャリアパス' },
];

export default function CareerGuide({ onBack, workHours = 7.5 }: { onBack: () => void; workHours?: number }) {
  const [tab, setTab] = useState('sim');
  const [currentSalary, setCurrentSalary] = useState(500);
  const [currentAge, setCurrentAge] = useState(28);
  const [currentIndustry, setCurrentIndustry] = useState('manufacturer');

  // Simulation: project salary in each industry based on current age
  const ageIndex = SALARY_AGES.reduce((best, age, i) => Math.abs(age - currentAge) < Math.abs(SALARY_AGES[best] - currentAge) ? i : best, 0);

  const simResults = industries.map(ind => {
    const indSalaryAtAge = ind.salaryCurve[ageIndex];
    const diff = indSalaryAtAge - currentSalary;
    const diffPct = Math.round((diff / currentSalary) * 100);
    return { ...ind, indSalaryAtAge, diff, diffPct };
  }).sort((a, b) => b.indSalaryAtAge - a.indSalaryAtAge);

  // Positioning map data
  const mapData = industries.map(ind => ({
    name: ind.name,
    icon: ind.icon,
    x: ind.overtime,
    y: ind.salary / 100,
    key: ind.key,
  }));

  // Score data (simulated OpenWork scores)
  const openworkScores = [
    { industry: '総合商社', salary_sat: 4.8, wlb: 3.0, growth: 4.7, stable: 4.0, culture: 3.8 },
    { industry: 'コンサル', salary_sat: 4.5, wlb: 2.2, growth: 4.9, stable: 3.2, culture: 3.9 },
    { industry: '金融', salary_sat: 4.0, wlb: 3.5, growth: 3.5, stable: 4.8, culture: 3.5 },
    { industry: '製造業（大手）', salary_sat: 3.8, wlb: 4.0, growth: 3.5, stable: 4.7, culture: 3.8 },
    { industry: 'IT・通信（大手）', salary_sat: 3.6, wlb: 3.8, growth: 4.5, stable: 3.5, culture: 4.0 },
    { industry: 'インフラ・公益', salary_sat: 3.5, wlb: 4.5, growth: 2.8, stable: 4.9, culture: 3.5 },
    { industry: '公務員', salary_sat: 3.0, wlb: 4.2, growth: 2.5, stable: 5.0, culture: 3.2 },
    { industry: 'サービス・小売', salary_sat: 2.8, wlb: 3.2, growth: 3.5, stable: 3.2, culture: 3.8 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="text-gray-400 hover:text-gray-700 text-sm">← 戻る</button>
          <span className="text-gray-200">|</span>
          <span className="text-sm font-medium text-gray-700">業界・職種ガイド</span>
          <span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full">転職版</span>
        </div>
        <div className="max-w-5xl mx-auto px-4 pb-3 flex gap-1 overflow-x-auto">
          {CAREER_TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${tab === t.key ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* ── SIMULATION ── */}
        {tab === 'sim' && (
          <div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-5">
              <h2 className="font-medium text-gray-900 mb-4">現状を入力してください</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">現在の年収（万円）</label>
                  <input type="number" value={currentSalary} onChange={e => setCurrentSalary(Number(e.target.value))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                  <input type="range" min={300} max={2000} step={50} value={currentSalary}
                    onChange={e => setCurrentSalary(Number(e.target.value))} className="w-full mt-2" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">現在の年齢</label>
                  <input type="number" value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                  <input type="range" min={22} max={50} step={1} value={currentAge}
                    onChange={e => setCurrentAge(Number(e.target.value))} className="w-full mt-2" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">現在の業界</label>
                  <select value={currentIndustry} onChange={e => setCurrentIndustry(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    {industries.map(ind => <option key={ind.key} value={ind.key}>{ind.icon} {ind.name}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <h3 className="font-medium text-gray-900 mb-3">{currentAge}歳・現年収{currentSalary}万円との比較</h3>
            {/* 要件1：所定労働時間の表示 */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 mb-3 flex items-center gap-3">
              <span className="text-xs text-blue-700 font-medium">所定労働時間：{workHours}h（トップページで変更可）</span>
              <span className="text-xs text-blue-500">時給換算はこの設定値を使用しています</span>
            </div>
            <div className="space-y-3">
              {simResults.map(ind => {
                const isCurrent = ind.key === currentIndustry;
                const workDaysPerMonth = 22;
                const totalWorkH = workHours * workDaysPerMonth + ind.overtime;
                const hourlyWage = Math.round((ind.indSalaryAtAge * 10000) / 12 / totalWorkH);
                return (
                  <div key={ind.key}
                    className={`bg-white border rounded-xl p-4 transition-all ${isCurrent ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{ind.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 text-sm">{ind.name}</span>
                          {isCurrent && <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">現職</span>}
                        </div>
                        <div className="flex items-center gap-4 flex-wrap">
                          <span className="text-lg font-medium text-gray-900">{ind.indSalaryAtAge}万円</span>
                          <span className={`text-sm font-medium ${ind.diff > 0 ? 'text-green-600' : ind.diff < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                            {ind.diff > 0 ? '+' : ''}{ind.diff}万円 ({ind.diffPct > 0 ? '+' : ''}{ind.diffPct}%)
                          </span>
                          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                            時給 {hourlyWage.toLocaleString()}円
                          </span>
                        </div>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <div>残業 {ind.overtime}h/月</div>
                        <div>休日 {ind.holiday}日</div>
                      </div>
                    </div>
                    <div className="mt-2 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div className={`h-full rounded-full ${isCurrent ? 'bg-blue-400' : 'bg-gray-400'}`}
                        style={{ width: `${Math.min(100, ind.indSalaryAtAge / 20)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-400 mt-3">
              ※OpenWork口コミ・各種調査をもとにした推計モデル。実際の転職年収は経験・スキル・交渉力により大きく異なります。
            </p>
          </div>
        )}

        {/* ── MAP ── */}
        {tab === 'map' && (
          <div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
              <h2 className="font-medium text-gray-900 mb-1">年収 × 残業時間 ポジショニングマップ</h2>
              <p className="text-xs text-gray-500 mb-4">右上が「高年収・残業多い」、左上が「高年収・残業少ない」（理想）</p>
              <div className="relative" style={{ height: 380 }}>
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-white rounded-xl" />
                <div className="absolute top-2 left-8 text-xs text-green-600 font-medium">← 理想ゾーン</div>
                <ResponsiveContainer width="100%" height={380}>
                  <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                    <XAxis dataKey="x" name="残業時間" unit="h/月" tick={{ fontSize: 11 }}
                      label={{ value: '残業時間 (h/月)', position: 'insideBottom', offset: -5, fontSize: 11 }} />
                    <YAxis dataKey="y" name="年収" unit="00万" tick={{ fontSize: 11 }}
                      label={{ value: '年収 (00万円)', angle: -90, position: 'insideLeft', fontSize: 11 }} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }}
                      content={({ active, payload }) => {
                        if (active && payload?.length) {
                          const d = payload[0].payload;
                          return (
                            <div className="bg-white border border-gray-200 rounded-lg p-2 text-xs shadow-md">
                              <p className="font-medium">{d.icon} {d.name}</p>
                              <p>年収：{d.y * 100}万円</p>
                              <p>残業：{d.x}h/月</p>
                            </div>
                          );
                        }
                        return null;
                      }} />
                    <ReferenceLine x={25} stroke="#e5e7eb" strokeDasharray="4 2" label={{ value: '平均残業', fontSize: 10, fill: '#9ca3af' }} />
                    <ReferenceLine y={8} stroke="#e5e7eb" strokeDasharray="4 2" label={{ value: '平均年収', fontSize: 10, fill: '#9ca3af', position: 'insideRight' }} />
                    <Scatter data={mapData} fill="#378ADD"
                      shape={(props: any) => {
                        const { cx, cy, payload } = props;
                        return (
                          <g>
                            <circle cx={cx} cy={cy} r={18} fill="#EFF6FF" stroke="#BFDBFE" strokeWidth={1.5} />
                            <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={16}>{payload.icon}</text>
                            <text x={cx} y={cy + 26} textAnchor="middle" fontSize={9} fill="#374151">{payload.name.substring(0, 5)}</text>
                          </g>
                        );
                      }} />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h3 className="text-sm font-medium text-amber-800 mb-2">マップの読み方</h3>
              <ul className="text-xs text-amber-700 space-y-1">
                <li>・<strong>左上（高年収・残業少）</strong>：理想。インフラ・一部金融がこのゾーン。</li>
                <li>・<strong>右上（高年収・残業多）</strong>：コンサル・商社はここ。稼げるが時間を使う。</li>
                <li>・<strong>左下（低年収・残業少）</strong>：インフラ・公務員の一部。安定重視タイプ向け。</li>
                <li>・<strong>右下（低年収・残業多）</strong>：サービス・小売の一部。コスパが低い。</li>
              </ul>
            </div>
          </div>
        )}

        {/* ── SCORE ── */}
        {tab === 'score' && (
          <div>
            <p className="text-sm text-gray-600 mb-4">OpenWorkスコア5項目（目安）。実際は個社ごとに確認してください。</p>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {['業界', '待遇満足', 'WLB', '成長環境', '安定性', '風通し'].map(h => (
                      <th key={h} className="text-left px-3 py-2.5 text-xs font-medium text-gray-500 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {openworkScores.map(row => (
                    <tr key={row.industry} className="hover:bg-gray-50">
                      <td className="px-3 py-2.5 font-medium text-xs">{row.industry}</td>
                      {[row.salary_sat, row.wlb, row.growth, row.stable, row.culture].map((score, i) => (
                        <td key={i} className="px-3 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <div className="flex gap-0.5">
                              {[1,2,3,4,5].map(s => (
                                <div key={s} className={`w-2.5 h-2.5 rounded-sm ${s <= Math.round(score) ? 'bg-blue-400' : 'bg-gray-200'}`} />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">{score.toFixed(1)}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              ※OpenWork各社口コミ（2024-25年）をもとに業界代表的大手企業の平均として推計。実際は個社ごとに大きく異なります。
            </p>
          </div>
        )}

        {/* ── PATH ── */}
        {tab === 'path' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">業界間の主な転職パターンと、転職時の年収変化目安です。</p>
            {[
              {
                from: '製造業', to: 'コンサル', arrow: '→',
                salary: '+300〜700万円', difficulty: '高',
                note: 'ロジカルシンキング・業界知識を活かして戦略コンサルへ。製造業出身者はメーカー向けコンサルで強みを活かせる。MBAや難関校卒が有利。',
              },
              {
                from: 'IT・通信', to: '外資IT', arrow: '→',
                salary: '+200〜600万円', difficulty: '中〜高',
                note: 'SIer・日系ITからGoogle・Microsoft・Amazonへ。英語力と技術スキルが問われる。LinkedInでのアピールが重要。',
              },
              {
                from: '金融', to: '総合商社（中途）', arrow: '→',
                salary: '+100〜400万円', difficulty: '高',
                note: '銀行・証券からの転職。財務・投資の専門知識を評価される。ただし商社中途採用枠は少なく競争率が高い。',
              },
              {
                from: 'コンサル', to: '事業会社（経営企画）', arrow: '→',
                salary: '-100〜+200万円', difficulty: '低〜中',
                note: 'コンサル3〜5年後の定番出口。年収は多少下がることもあるが、ワークライフバランスが改善。事業会社でのオーナーシップを求めて転職するケースが多い。',
              },
              {
                from: '製造業', to: 'インフラ（電力・ガス）', arrow: '→',
                salary: '-50〜+100万円', difficulty: '低〜中',
                note: '技術系から安定志向への転職。残業・休日の条件が改善されることが多い。理系出身者に人気のルート。',
              },
            ].map(path => (
              <div key={path.from + path.to} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">{path.from}</span>
                  <span className="text-gray-400 text-lg">→</span>
                  <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-sm font-medium text-blue-800">{path.to}</span>
                  <span className={`ml-auto text-sm font-medium ${path.salary.includes('+') ? 'text-green-600' : 'text-gray-600'}`}>
                    {path.salary}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-500">転職難易度：</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${path.difficulty.includes('高') ? 'bg-red-50 text-red-700' : path.difficulty.includes('中') ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>
                    {path.difficulty}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{path.note}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
