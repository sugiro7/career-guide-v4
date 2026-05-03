'use client';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { industries, jobTypes, SALARY_AGES, type Industry } from '@/data/industries';

const TABS = [
  { key: 'overview', label: '業界の概要' },
  { key: 'compare', label: '数値で比較' },
  { key: 'curve', label: '年収カーブ' },
  { key: 'caution', label: '年収だけじゃない' },
  { key: 'jobs', label: '職種ガイド' },
  { key: 'quiz', label: '価値観診断' },
];

const BADGE_COLORS: Record<string, string> = {
  bb: 'bg-blue-50 text-blue-700',
  bg: 'bg-green-50 text-green-700',
  br: 'bg-red-50 text-red-700',
  ba: 'bg-amber-50 text-amber-700',
};

const CURVE_COLORS = ['#378ADD','#1D9E75','#BA7517','#534AB7','#E24B4A','#0F6E56','#3B6D11','#993556'];

type SortKey = 'salary' | 'overtime' | 'holiday' | 'paid';

export default function StudentGuide({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState('overview');
  const [selected, setSelected] = useState<Industry | null>(null);
  const [sort, setSort] = useState<SortKey>('salary');
  const [selectedCurve, setSelectedCurve] = useState<string[]>(['shosha', 'manufacturer', 'it', 'infra']);
  const [quiz, setQuiz] = useState({ salary: 3, wlb: 3, holiday: 3, stable: 3, growth: 3, global: 3 });

  const sorted = [...industries].sort((a, b) => {
    if (sort === 'salary') return b.salary - a.salary;
    if (sort === 'overtime') return a.overtime - b.overtime;
    if (sort === 'holiday') return b.holiday - a.holiday;
    if (sort === 'paid') return b.paid - a.paid;
    return 0;
  });

  const curveData = SALARY_AGES.map((age, i) => {
    const obj: Record<string, number | string> = { age: `${age}歳` };
    industries.filter(ind => selectedCurve.includes(ind.key)).forEach(ind => {
      obj[ind.name] = ind.salaryCurve[i];
    });
    return obj;
  });

  const quizResults = [...industries].map(i => ({
    ...i,
    score: i.salaryScore * quiz.salary + i.wlbScore * quiz.wlb + i.holidayScore * quiz.holiday
      + i.stableScore * quiz.stable + i.growthScore * quiz.growth + i.globalScore * quiz.global
  })).sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="text-gray-400 hover:text-gray-700 text-sm">← 戻る</button>
          <span className="text-gray-200">|</span>
          <span className="text-sm font-medium text-gray-700">業界・職種ガイド</span>
          <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">就活版</span>
          <span className="ml-auto text-xs text-gray-400">OpenWork・大手企業前提</span>
        </div>
        <div className="max-w-5xl mx-auto px-4 pb-3 flex gap-1 overflow-x-auto">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${tab === t.key ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* ── OVERVIEW ── */}
        {tab === 'overview' && (
          <div>
            <p className="text-xs text-gray-500 mb-4">業界カードをタップして詳細を確認。数値はOpenWork口コミ・大手企業平均の目安です。</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
              {industries.map(ind => (
                <button key={ind.key} onClick={() => setSelected(ind === selected ? null : ind)}
                  className={`bg-white border rounded-xl p-3 text-left transition-all hover:shadow-md ${selected?.key === ind.key ? 'border-gray-800 shadow-md' : 'border-gray-200'}`}>
                  <div className="text-2xl mb-2">{ind.icon}</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">{ind.name}</div>
                  <div className="text-xs text-gray-500 mb-2">{ind.tagline}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${BADGE_COLORS[ind.badge]}`}>{ind.badgeText}</span>
                </button>
              ))}
            </div>

            {selected && (
              <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">{selected.icon} {selected.name}</h2>
                    <p className="text-sm text-gray-500">{selected.tagline}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${BADGE_COLORS[selected.badge]}`}>{selected.badgeText}</span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {[
                    { label: '平均年収（OpenWork）', value: `${selected.salary}万円` },
                    { label: '月残業時間', value: `${selected.overtime}h` },
                    { label: '年間休日', value: `${selected.holiday}日` },
                    { label: '有給消化率', value: `${selected.paid}%` },
                  ].map(m => (
                    <div key={m.label} className="bg-gray-50 rounded-xl p-3 text-center">
                      <div className="text-xs text-gray-500 mb-1">{m.label}</div>
                      <div className="text-xl font-medium text-gray-900">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Representative companies */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-600 mb-2">代表的な大手企業</p>
                  <div className="flex flex-wrap gap-1">
                    {selected.representative.map(c => (
                      <span key={c} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{c}</span>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-4">{selected.desc}</p>

                {selected.overseas && (
                  <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-3 mb-4">
                    <p className="text-xs font-medium text-amber-800 mb-1">✈ 海外駐在ブーストについて</p>
                    <p className="text-xs text-amber-700 leading-relaxed">{selected.overseas}</p>
                  </div>
                )}

                {/* Companies comparison */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-600 mb-2">主要企業の年収・残業比較（OpenWork参考）</p>
                  <div className="space-y-2">
                    {selected.companies.map(c => (
                      <div key={c.name} className="flex items-center gap-3">
                        <span className="text-xs text-gray-700 w-36 shrink-0">{c.name}</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div className="h-full bg-blue-400 rounded-full" style={{ width: `${Math.min(100, c.salary / 22)}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 w-20 text-right">{c.salary}万円</span>
                        <span className={`text-xs w-14 text-right ${c.overtime > 35 ? 'text-red-500' : c.overtime > 25 ? 'text-amber-500' : 'text-green-600'}`}>{c.overtime}h/月</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 rounded-xl p-3">
                    <p className="text-xs font-medium text-green-800 mb-2">✓ メリット</p>
                    {selected.pros.map(p => <p key={p} className="text-xs text-green-700 py-0.5">・{p}</p>)}
                  </div>
                  <div className="bg-red-50 rounded-xl p-3">
                    <p className="text-xs font-medium text-red-800 mb-2">✗ デメリット</p>
                    {selected.cons.map(c => <p key={c} className="text-xs text-red-700 py-0.5">・{c}</p>)}
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-3">
                  ※年収出典：{selected.salarySource}
                  <br />※残業出典：{selected.overtimeSource}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── COMPARE ── */}
        {tab === 'compare' && (
          <div>
            <div className="flex gap-2 mb-4 flex-wrap">
              {([['salary','年収順'], ['overtime','残業少ない'], ['holiday','休日多い'], ['paid','有給消化率']] as const).map(([k, label]) => (
                <button key={k} onClick={() => setSort(k)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${sort === k ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}>
                  {label}
                </button>
              ))}
            </div>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {['業界', '平均年収（OpenWork）', '残業/月', '年間休日', '有給消化率'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sorted.map(ind => (
                    <tr key={ind.key} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="mr-1">{ind.icon}</span>
                        <span className="font-medium text-gray-900 text-sm">{ind.name}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div className="h-full bg-blue-400 rounded-full" style={{ width: `${ind.salary / 14}%` }} />
                          </div>
                          <span className="text-sm font-medium">{ind.salary}万</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-medium ${ind.overtime > 35 ? 'text-red-600' : ind.overtime > 25 ? 'text-amber-600' : 'text-green-600'}`}>
                          {ind.overtime}h
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-medium ${ind.holiday >= 120 ? 'text-green-600' : 'text-amber-600'}`}>
                          {ind.holiday}日
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div className="h-full bg-purple-400 rounded-full" style={{ width: `${ind.paid}%` }} />
                          </div>
                          <span className="text-sm">{ind.paid}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              出典：OpenWork口コミデータ（2024-25年）、厚労省就労条件総合調査（2025年）。大手企業前提の目安。
            </p>
          </div>
        )}

        {/* ── CURVE ── */}
        {tab === 'curve' && (
          <div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-3">比較する業界を選択（複数選択可）：</p>
              <div className="flex flex-wrap gap-2">
                {industries.map((ind, i) => (
                  <button key={ind.key}
                    onClick={() => setSelectedCurve(prev =>
                      prev.includes(ind.key) ? prev.filter(k => k !== ind.key) : [...prev, ind.key]
                    )}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${selectedCurve.includes(ind.key) ? 'border-transparent text-white' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                    style={selectedCurve.includes(ind.key) ? { backgroundColor: CURVE_COLORS[i % CURVE_COLORS.length] } : {}}>
                    {ind.icon} {ind.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h2 className="text-sm font-medium text-gray-900 mb-4">業界別 年収カーブ（大手企業・総合職モデル）</h2>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={curveData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                  <XAxis dataKey="age" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={v => `${v}万`} tick={{ fontSize: 11 }} domain={[300, 2500]} />
                  <Tooltip formatter={(v: number) => [`${v}万円`]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  {industries.filter(ind => selectedCurve.includes(ind.key)).map((ind, i) => (
                    <Line key={ind.key} type="monotone" dataKey={ind.name}
                      stroke={CURVE_COLORS[industries.indexOf(ind) % CURVE_COLORS.length]}
                      strokeWidth={2} dot={{ r: 3 }} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-400 mt-3">
                ※OpenWork口コミ・各社有価証券報告書・各種調査をもとにした推計モデル。実際は個人差・会社差・年度により大きく異なります。
              </p>
            </div>

            {/* Curve insights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {[
                { emoji: '🌏', title: '総合商社', body: '22歳：400万→25歳：600万→30歳：1,000万。ボーナスが大きく伸び、30歳前後で一気に上がる。海外駐在でさらに1.5倍。' },
                { emoji: '💼', title: 'コンサル', body: '昇進ペースが速く、Up or Outで20代でも年収が大きく変わる。外資戦略系は30代で2,000万超も。' },
                { emoji: '🏭', title: '製造業（大手）', body: '22歳：390万→30歳：680万→40歳：880万と安定して右肩上がり。上限は商社・コンサルより低め。' },
                { emoji: '⚡', title: 'インフラ', body: '急な上昇はないが、安定した年功序列カーブ。50歳近くでも着実に増え続ける。倒産リスクゼロ。' },
              ].map(item => (
                <div key={item.title} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-sm font-medium text-gray-800 mb-1">{item.emoji} {item.title}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CAUTION ── */}
        {tab === 'caution' && (
          <div className="space-y-4">
            <div className="bg-red-50 border-l-4 border-red-400 rounded-r-2xl p-4">
              <h3 className="font-medium text-red-900 mb-2">⚠ 年収1,000万円 ≠ 豊かさ1,000万円</h3>
              <p className="text-sm text-red-700 leading-relaxed">
                年収が高くても残業が多ければ「可処分時間」が減ります。住宅手当・社宅・食堂補助などの福利厚生は年収に含まれませんが、実質的な生活水準に直結します。
              </p>
              <p className="text-sm text-red-700 mt-2">
                <strong>例：</strong>年収700万円でも社宅（家賃月5万円）＋昼食補助 → 実質780万円相当。年収900万円でも毎月60h残業 → 時給換算で年収600万円の人と大差なし。
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <h3 className="font-medium text-gray-900 mb-3">🏢 同じ業界でも会社・部署によって全然違う</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                業界平均はあくまで「目安」です。同じ製造業でも、キーエンス（2,039万円）とパナソニック（741万円）では3倍近い差があります。個社の情報は必ずOpenWork・キャリアガーデン等で確認しましょう。
              </p>
              <div className="bg-green-50 rounded-xl p-3">
                <p className="text-xs font-medium text-green-800 mb-2">✅ OpenWorkで確認すべき5項目</p>
                {['残業時間（部署ばらつきも口コミで確認）', '有給取得率（取りやすい文化かどうか）', '待遇面の満足度スコア（目安：3.5以上が良好）', '20代成長環境スコア（若手の育て方）', '福利厚生の内容（住宅補助・DC・食事補助等）'].map(item => (
                  <p key={item} className="text-xs text-green-700 py-0.5">・{item}</p>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <h3 className="font-medium text-gray-900 mb-3">💴 福利厚生は「第二の給与」</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { title: '住宅手当・社宅', body: '月3〜10万円相当。都心では年収換算で大きな差に' },
                  { title: '確定拠出年金（DC）', body: '会社マッチング拠出で老後資産が有利に積み上がる' },
                  { title: '育休・産休取得率', body: '特に女性・ライフイベントを重視する人には重要な指標' },
                  { title: '教育研修・資格補助', body: 'スキルアップ費用を会社が負担。長期的な市場価値に影響' },
                ].map(item => (
                  <div key={item.title} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs font-medium text-gray-800 mb-1">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── JOBS ── */}
        {tab === 'jobs' && (
          <div className="space-y-4">
            <p className="text-xs text-gray-500">同じ業界でも職種によって働き方は大きく異なります。「業界×職種」で考えることが重要です。</p>
            {jobTypes.map(job => (
              <div key={job.key} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{job.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-medium text-gray-900">{job.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${job.turnover === '高' ? 'bg-red-50 text-red-700' : job.turnover === '中' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>
                        離職率：{job.turnover}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${job.remote === '高' ? 'bg-blue-50 text-blue-700' : job.remote === '中' ? 'bg-gray-100 text-gray-600' : 'bg-gray-100 text-gray-600'}`}>
                        リモート：{job.remote}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">年収目安 {job.salaryRange}｜残業 {job.overtime}</div>
                  </div>
                  <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full whitespace-nowrap">{job.point}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{job.desc}</p>
                <div className="bg-amber-50 border-l-3 border-amber-300 rounded-r-lg p-3 mb-2">
                  <p className="text-xs font-medium text-amber-800 mb-1">💬 リアルな声</p>
                  <p className="text-xs text-amber-700 leading-relaxed">{job.realVoice}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-red-800 mb-1">⚠ 離職の実態</p>
                  <p className="text-xs text-red-700 leading-relaxed">{job.turnoverReason}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── QUIZ ── */}
        {tab === 'quiz' && (
          <div>
            <p className="text-sm text-gray-600 mb-4">スライダーを動かして自分の優先度を入力してください。</p>
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 space-y-4">
              {([
                ['salary', '年収の高さを重視する'],
                ['wlb', 'プライベートの時間を確保したい（残業少ない）'],
                ['holiday', '休日・有給を重視する'],
                ['stable', '安定性・雇用の安心感を重視する'],
                ['growth', 'スキルアップ・成長環境を重視する'],
                ['global', '海外経験・グローバルな仕事に興味がある'],
              ] as const).map(([key, label]) => (
                <div key={key}>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{label}</span>
                    <span className="font-medium">{quiz[key as keyof typeof quiz]}</span>
                  </div>
                  <input type="range" min={1} max={5} step={1} value={quiz[key as keyof typeof quiz]}
                    onChange={e => setQuiz(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                    className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer" />
                  <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                    <span>低</span><span>高</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">あなたに向いている業界</h3>
              {quizResults.slice(0, 3).map((ind, i) => (
                <div key={ind.key} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 items-center">
                  <div className={`text-xl font-medium w-10 text-center ${i === 0 ? 'text-amber-500' : i === 1 ? 'text-gray-400' : 'text-amber-700'}`}>
                    {['1位', '2位', '3位'][i]}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{ind.icon} {ind.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      年収 {ind.salary}万円｜残業 {ind.overtime}h/月｜年間休日 {ind.holiday}日｜有給消化率 {ind.paid}%
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-xs text-gray-400">※入力の優先度に基づくスコアリング。参考目安としてご利用ください。</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
