export type Industry = {
  key: string;
  name: string;
  icon: string;
  tagline: string;
  salary: number; // OpenWork口コミ平均 (万円)
  salarySource: string;
  overtime: number; // 月残業時間
  overtimeSource: string;
  holiday: number; // 年間休日
  paid: number; // 有給消化率(%)
  representative: string[]; // 代表的な大手企業例
  badge: string;
  badgeText: string;
  salaryScore: number;
  wlbScore: number;
  holidayScore: number;
  stableScore: number;
  growthScore: number;
  globalScore: number;
  desc: string;
  overseas?: string;
  pros: string[];
  cons: string[];
  // 年収カーブ (22,25,28,30,33,35,38,40,43,45,48,50歳)
  salaryCurve: number[];
  companies: { name: string; salary: number; overtime: number }[];
};

export const industries: Industry[] = [
  {
    key: "shosha",
    name: "総合商社",
    icon: "🌏",
    tagline: "年収・海外キャリアの頂点",
    salary: 1253,
    salarySource: "OpenWork 5大商社口コミ平均（2024-25年）",
    overtime: 34,
    overtimeSource: "OpenWork 7大商社データ（2024年）三井27.8h〜伊藤忠42.1hの平均",
    holiday: 120,
    paid: 62,
    representative: ["三菱商事", "三井物産", "伊藤忠商事", "住友商事", "丸紅"],
    badge: "bb",
    badgeText: "高年収",
    salaryScore: 5, wlbScore: 2, holidayScore: 3, stableScore: 4, growthScore: 5, globalScore: 5,
    desc: "三菱商事・三井物産・伊藤忠等の5大商社。OpenWork口コミ平均で業界平均1,253万円。20代後半〜30代で1,000万超が標準ルート。海外駐在すると手取りが1.5〜2倍になる「駐在ブースト」が最大の特徴。採用倍率は非常に高く、関関同立以上が前提となるケースが多い。",
    overseas: "30代で海外駐在した場合、年収1,500〜2,200万円が相場。住宅費全額・税金会社負担・ハードシップ手当が加算。4〜5年の駐在期間で数千万円の貯蓄も珍しくない。（出典：各種駐在員実態調査）",
    pros: ["20代後半で年収1,000万超", "海外駐在で手取り1.5〜2倍", "スケールの大きい仕事"],
    cons: ["採用倍率が極めて高い", "転勤・海外赴任が必須", "残業は社・部署で30〜42h/月の差"],
    salaryCurve: [400, 600, 850, 1000, 1150, 1250, 1400, 1500, 1650, 1750, 1850, 1900],
    companies: [
      { name: "三菱商事", salary: 1535, overtime: 38 },
      { name: "三井物産", salary: 1483, overtime: 28 },
      { name: "伊藤忠商事", salary: 1357, overtime: 42 },
      { name: "住友商事", salary: 1253, overtime: 36 },
      { name: "丸紅", salary: 1200, overtime: 33 },
    ],
  },
  {
    key: "consulting",
    name: "コンサル",
    icon: "💼",
    tagline: "最高峰の年収・最高峰の激務",
    salary: 1200,
    salarySource: "OpenWork コンサルティング・シンクタンク業界口コミ（TOP20社平均年収1,065万円以上）",
    overtime: 40,
    overtimeSource: "OpenWork定点観測（2023年）コンサル業種平均",
    holiday: 120,
    paid: 58,
    representative: ["McKinsey", "BCG", "アクセンチュア", "デロイト", "野村総研"],
    badge: "br",
    badgeText: "残業最多",
    salaryScore: 5, wlbScore: 1, holidayScore: 3, stableScore: 3, growthScore: 5, globalScore: 3,
    desc: "OpenWork TOP20社はすべて平均年収1,000万円超（BCG等の外資戦略コンサルは1,600万円超）。論理的思考力・提案力が飛躍的に向上し、その後のキャリアに大きなアドバンテージ。ただし月40h超の残業はザラで、プロジェクト次第では50〜60hになることも。「Up or Out」文化の外資では評価されなければ退職を促される場合もある。",
    pros: ["30代で最高水準の年収", "スキルアップ速度が業界No.1", "転職市場での評価が極めて高い"],
    cons: ["月残業40h超が日常", "Up or Out文化でプレッシャー大", "体力的・精神的消耗が激しい"],
    salaryCurve: [500, 750, 1000, 1200, 1400, 1500, 1700, 1800, 2000, 2100, 2200, 2300],
    companies: [
      { name: "BCG", salary: 1616, overtime: 45 },
      { name: "アクセンチュア", salary: 1200, overtime: 38 },
      { name: "野村総研(NRI)", salary: 1050, overtime: 32 },
      { name: "マッキンゼー", salary: 1600, overtime: 48 },
      { name: "デロイト", salary: 1100, overtime: 40 },
    ],
  },
  {
    key: "finance",
    name: "金融",
    icon: "🏦",
    tagline: "安定高収入・専門性が高い",
    salary: 850,
    salarySource: "OpenWork メガバンク・大手証券・保険各社口コミ平均（2024-25年）",
    overtime: 20,
    overtimeSource: "OpenWork定点観測（2023年）金融業種平均",
    holiday: 120,
    paid: 65,
    representative: ["三菱UFJ銀行", "三井住友銀行", "野村證券", "東京海上日動", "大和証券"],
    badge: "bb",
    badgeText: "安定高収入",
    salaryScore: 4, wlbScore: 3, holidayScore: 4, stableScore: 5, growthScore: 3, globalScore: 2,
    desc: "メガバンク・大手証券・保険の大手はOpenWork口コミで700〜950万円台が中心。証券・投資銀行部門は1,000万円超も。社会的信用が高く、福利厚生（社宅・住宅補助）が充実。一方でノルマ文化が残る部署もあり、転勤が多い。",
    pros: ["業界全体の平均年収が高水準", "社会的信用が高い", "福利厚生が充実（社宅等）"],
    cons: ["ノルマがきつい部署もある", "転勤・支店勤務の辞令あり", "規制業種でスピード感が出づらい"],
    salaryCurve: [400, 550, 680, 750, 850, 900, 950, 1000, 1050, 1100, 1150, 1200],
    companies: [
      { name: "三菱UFJ銀行", salary: 900, overtime: 22 },
      { name: "三井住友銀行", salary: 870, overtime: 20 },
      { name: "野村證券", salary: 1000, overtime: 25 },
      { name: "東京海上日動", salary: 820, overtime: 18 },
      { name: "大和証券", salary: 850, overtime: 22 },
    ],
  },
  {
    key: "manufacturer",
    name: "製造業（大手）",
    icon: "🏭",
    tagline: "安定×休み多い＝コスパ最強説",
    salary: 800,
    salarySource: "OpenWork ソニー951万・トヨタ1,035万・パナソニック741万などの大手平均を参考に業界目安として算出",
    overtime: 20,
    overtimeSource: "OpenWork定点観測（2023年）製造業種平均。組合により削減が進んでいる。",
    holiday: 123,
    paid: 68,
    representative: ["トヨタ自動車", "ソニーグループ", "キーエンス", "パナソニック", "日立製作所"],
    badge: "bg",
    badgeText: "休日最多・安定",
    salaryScore: 4, wlbScore: 4, holidayScore: 5, stableScore: 5, growthScore: 3, globalScore: 3,
    desc: "大手は年収700〜1,000万円超が中心（キーエンス2,039万円・ソニー951万円・トヨタ1,035万円など）。組合の力があり年間休日123日・有給消化率68%と業界トップクラスの休暇環境。転勤・出向がある点は注意。理系学生に特に人気。",
    overseas: "製造業大手でも海外工場・現地法人への赴任あり。手取り1.5〜2倍の駐在ブーストが発生。トヨタの駐在年収は推定1,400〜1,900万円規模。",
    pros: ["年間休日123日が業界標準", "有給消化率68%（高水準）", "大手は福利厚生が手厚い"],
    cons: ["転勤・出向が発生しやすい", "給与の上限は商社・コンサルより低め", "変化のスピードが遅い傾向"],
    salaryCurve: [390, 500, 600, 680, 730, 780, 830, 880, 920, 960, 1000, 1050],
    companies: [
      { name: "キーエンス", salary: 2039, overtime: 20 },
      { name: "ソニーグループ", salary: 951, overtime: 22 },
      { name: "トヨタ自動車", salary: 1035, overtime: 20 },
      { name: "パナソニック", salary: 741, overtime: 25 },
      { name: "日立製作所", salary: 850, overtime: 22 },
    ],
  },
  {
    key: "it",
    name: "IT・通信（大手）",
    icon: "💻",
    tagline: "需要急増・スキルで年収変わる",
    salary: 750,
    salarySource: "OpenWork NTTデータ・富士通・NRI等大手SIer口コミ平均（2024-25年）",
    overtime: 25,
    overtimeSource: "OpenWork定点観測（2023年）IT・通信業種平均。SIerとスタートアップで差大。",
    holiday: 122,
    paid: 70,
    representative: ["NTTデータ", "富士通", "NRI（野村総研）", "アクセンチュア", "SAP Japan"],
    badge: "bb",
    badgeText: "リモート普及",
    salaryScore: 4, wlbScore: 3, holidayScore: 4, stableScore: 3, growthScore: 5, globalScore: 2,
    desc: "大手SIer（NTTデータ・富士通等）はOpenWork口コミで700〜900万円台。外資系IT（Google・Microsoft・Amazon等）は1,000〜1,500万円超。リモートワーク普及率が最高水準で、通勤コスト・時間ゼロも可能。スキル次第で年収が大幅に変わる業界。",
    pros: ["リモートワーク普及率が最高水準", "スキルで年収アップが狙える", "AI需要で市場拡大中"],
    cons: ["会社・PJで残業の差が大きい", "スキルの継続的アップデートが必要", "大手SIerは年収の上限が見えやすい"],
    salaryCurve: [380, 480, 580, 650, 720, 780, 840, 890, 940, 980, 1020, 1060],
    companies: [
      { name: "野村総研(NRI)", salary: 1050, overtime: 28 },
      { name: "NTTデータ", salary: 820, overtime: 26 },
      { name: "富士通", salary: 780, overtime: 24 },
      { name: "アクセンチュア", salary: 1200, overtime: 38 },
      { name: "日本IBM", salary: 850, overtime: 25 },
    ],
  },
  {
    key: "infra",
    name: "インフラ・公益",
    icon: "⚡",
    tagline: "安定の王様・有給消化率No.1",
    salary: 750,
    salarySource: "OpenWork 東京電力・東京ガス・JR各社等大手口コミ平均（2024-25年）",
    overtime: 15,
    overtimeSource: "厚労省就労条件総合調査（2025年）電気・ガス・水道業有給消化率75.2%で全産業最高",
    holiday: 123,
    paid: 75,
    representative: ["東京電力HD", "東京ガス", "JR東日本", "ENEOS", "関西電力"],
    badge: "bg",
    badgeText: "有給No.1",
    salaryScore: 3, wlbScore: 5, holidayScore: 5, stableScore: 5, growthScore: 2, globalScore: 1,
    desc: "厚労省データでも有給消化率が全業界トップ（75.2%）。倒産リスクがほぼなく、安定した給与と手厚い休暇制度が特徴。OpenWorkでは東京ガス948万円・ENEOS926万円などの大手も。一方で給与の伸びは穏やかで、変化が少ない。",
    pros: ["有給消化率75%（業界最高）", "倒産リスクがほぼゼロ", "年間休日123日以上"],
    cons: ["給与の伸びが穏やか", "キャリアの選択肢が限られる", "変化が少なくルーティン感あり"],
    salaryCurve: [390, 480, 570, 640, 700, 750, 800, 850, 890, 930, 960, 990],
    companies: [
      { name: "東京ガス", salary: 948, overtime: 15 },
      { name: "ENEOS", salary: 926, overtime: 16 },
      { name: "JR東日本", salary: 800, overtime: 18 },
      { name: "東京電力HD", salary: 780, overtime: 14 },
      { name: "関西電力", salary: 820, overtime: 15 },
    ],
  },
  {
    key: "civil",
    name: "公務員",
    icon: "🏛️",
    tagline: "最高安定・副業不可・伸び緩やか",
    salary: 680,
    salarySource: "国家公務員・地方公務員の一般職平均給与を参考に業界目安として算出",
    overtime: 16,
    overtimeSource: "部署により大きく異なる。繁忙期（予算・決算期）は50h超も",
    holiday: 122,
    paid: 68,
    representative: ["国家公務員（各省庁）", "地方公務員（都道府県・政令市）", "国税専門官", "外務省", "警察・消防"],
    badge: "bg",
    badgeText: "最安定",
    salaryScore: 3, wlbScore: 4, holidayScore: 4, stableScore: 5, growthScore: 2, globalScore: 1,
    desc: "倒産リスクゼロ・解雇なし・産休育休が取りやすい。社会貢献感が高い。一方で年収の伸びは緩やかで上限も低め。副業が原則禁止で、国家公務員は全国転勤あり。近年はデジタル庁など高給ポジションも増加。",
    pros: ["雇用が安定（事実上の終身雇用）", "産休・育休が取りやすい", "社会貢献感が高い"],
    cons: ["年収の伸びが遅い・上限低め", "副業が原則禁止", "国家公務員は転勤あり"],
    salaryCurve: [370, 440, 510, 570, 620, 660, 700, 740, 770, 800, 830, 850],
    companies: [
      { name: "デジタル庁", salary: 970, overtime: 20 },
      { name: "国家公務員（総合職）", salary: 750, overtime: 25 },
      { name: "地方公務員（都道府県）", salary: 680, overtime: 15 },
      { name: "地方公務員（政令市）", salary: 700, overtime: 15 },
      { name: "国家公務員（一般職）", salary: 620, overtime: 18 },
    ],
  },
  {
    key: "service",
    name: "サービス・小売",
    icon: "🏪",
    tagline: "身近な仕事・年収は厳しめ",
    salary: 550,
    salarySource: "OpenWork 大手小売・サービス各社口コミ平均（2024-25年）。ファーストリテイリング等の大手前提。",
    overtime: 20,
    overtimeSource: "OpenWork定点観測（2023年）サービス・小売業種平均",
    holiday: 108,
    paid: 55,
    representative: ["ファーストリテイリング", "セブン&iHD", "イオン", "楽天グループ", "ソフトバンク"],
    badge: "ba",
    badgeText: "年収低め",
    salaryScore: 2, wlbScore: 3, holidayScore: 2, stableScore: 3, growthScore: 3, globalScore: 2,
    desc: "大手小売・サービスでも年収は550〜700万円台が中心。土日出勤・シフト制が多く年間休日108日は業界最低水準。ただしファーストリテイリング等は海外展開・グローバルキャリアの機会あり。消費者に近く仕事の成果が見えやすいのが特徴。",
    pros: ["仕事の成果が見えやすい", "接客・営業スキルが身につく", "大手では海外展開の機会あり"],
    cons: ["年間休日が少ない（108日）", "シフト勤務・土日出勤あり", "年収の上限が他業界より低め"],
    salaryCurve: [360, 420, 490, 540, 580, 610, 640, 670, 700, 720, 740, 760],
    companies: [
      { name: "ファーストリテイリング", salary: 780, overtime: 22 },
      { name: "楽天グループ", salary: 750, overtime: 28 },
      { name: "ソフトバンク", salary: 720, overtime: 22 },
      { name: "セブン&iHD", salary: 680, overtime: 20 },
      { name: "イオン", salary: 580, overtime: 18 },
    ],
  },
];

export const SALARY_AGES = [22, 25, 28, 30, 33, 35, 38, 40, 43, 45, 48, 50];

export type JobType = {
  key: string;
  name: string;
  icon: string;
  salaryRange: string;
  overtime: string;
  industries: string[];
  turnover: "高" | "中" | "低";
  turnoverReason: string;
  remote: "高" | "中" | "低";
  desc: string;
  realVoice: string;
  point: string;
};

export const jobTypes: JobType[] = [
  {
    key: "sales",
    name: "営業職",
    icon: "🤝",
    salaryRange: "400〜800万円",
    overtime: "20〜40h/月",
    industries: ["総合商社", "金融", "製造業", "IT", "サービス"],
    turnover: "高",
    turnoverReason: "目標未達・ノルマのプレッシャーによる離職が多い。特に金融・不動産・無形商材の営業は離職率が高い傾向。",
    remote: "低",
    desc: "どの業界にも存在する最も汎用性の高い職種。売上数字で評価されるためやりがいと達成感がある一方で、ノルマ未達時のプレッシャーも大きい。インセンティブがある会社（商社・IT営業など）では若くして高収入も可能。文理問わず就職しやすく、1社目のキャリアとして最多。",
    realVoice: "「目標数字は明確で達成感はあるが、未達の月はメンタルがきつい。インセンティブで年収が大きく変わるので、成果主義が好きな人には向いている」（IT営業・28歳）",
    point: "文理問わず就職しやすい・最汎用",
  },
  {
    key: "engineer",
    name: "エンジニア（ITエンジニア）",
    icon: "⌨️",
    salaryRange: "450〜1,200万円",
    overtime: "20〜45h/月",
    industries: ["IT・通信", "製造業", "コンサル"],
    turnover: "中",
    turnoverReason: "スキルアップのための転職が多く、離職率は高いが「前向きな離職」が中心。待遇格差が大きく、より良い環境を求めて転職するケースが多い。",
    remote: "高",
    desc: "プログラミングでシステム・サービスを開発する職種。リモートワーク普及率が業界最高水準。スキルを身につければ市場価値が高く転職もしやすい。大手SIerは安定しているが年収の伸びが緩やか。外資系IT・スタートアップはハイリスクハイリターン。文系でもプログラミングを学べばなれる。",
    realVoice: "「リモートワークで通勤ゼロ、プロジェクトが終われば自分の成果物が世に出るのが嬉しい。一方で技術のキャッチアップは常に必要で、勉強しない人は置いていかれる」（Webエンジニア・26歳）",
    point: "リモートワーク最多・スキルで差がつく",
  },
  {
    key: "consulting",
    name: "コンサルタント",
    icon: "📊",
    salaryRange: "600〜2,000万円",
    overtime: "35〜60h/月",
    industries: ["コンサル", "金融（FAS等）"],
    turnover: "高",
    turnoverReason: "Up or Out文化（昇格できなければ退職を促される）と激務による燃え尽きが主な理由。3〜5年で独立・事業会社に転職するケースも多い。",
    remote: "中",
    desc: "企業の経営課題を分析・解決提案する高度専門職。年収は高いが月40h超の残業はザラ。外資戦略コンサルは30代で2,000万円超も。論理的思考・プレゼン力が飛躍的に向上し、転職市場での評価が高い「キャリアの最速ルート」として人気。",
    realVoice: "「入社3年で思考力とプレゼン力が劇的に上がった。ただ週80時間働く時期もあり、体力と精神力が問われる。給与は申し分ないが、プライベートは犠牲になることを覚悟して」（戦略コンサルタント・30歳）",
    point: "キャリア最速ルート・年収最高峰",
  },
  {
    key: "rd",
    name: "研究開発（R&D）",
    icon: "🔬",
    salaryRange: "500〜900万円",
    overtime: "15〜30h/月",
    industries: ["製造業", "医薬品・化学"],
    turnover: "低",
    turnoverReason: "専門性が高く転職先が限られるため離職率が低い。長期プロジェクトが多く、チームへの帰属意識が強い傾向。",
    remote: "低",
    desc: "製造業・医薬品・化学業界で新製品・新技術を開発する職種。大学の研究室の延長線上にあり理系大学院卒が多い。年収・休日ともに良好で、安定した環境で専門性を深めたい人に最適。ただし成果が出るまでに時間がかかる特性上、短期的な成果が見えにくい。",
    realVoice: "「年収も休みも安定している。一方で研究が製品になるまで10年以上かかることもあり、短気な人には向かない。地道に専門性を積み上げることが好きな人に最高の環境」（化学メーカー研究員・32歳）",
    point: "理系院卒向け・休日多め安定",
  },
  {
    key: "admin",
    name: "経営企画・事務・管理",
    icon: "📋",
    salaryRange: "400〜700万円",
    overtime: "15〜25h/月",
    industries: ["製造業", "金融", "インフラ", "IT"],
    turnover: "低",
    turnoverReason: "業務が会社固有のナレッジに依存するため転職しづらく、離職率が低い傾向。ただし経営企画は例外的に転職市場で評価が高い。",
    remote: "中",
    desc: "総務・経理・人事・法務・経営企画など会社を支えるバックオフィス職。残業は比較的少なく定時に上がれる職場も多い。年収は営業・エンジニアより低めだが、ワークライフバランスを重視したい人に向いている。経営企画は業務理解が深く、転職市場でも評価される。",
    realVoice: "「定時に上がれる日が多く、プライベートの時間が確保しやすい。年収は高くないが、家族との時間を大切にしたい自分には合っている。ただし事務職は派遣・アウトソーシングとの競合意識がある」（大手製造業・人事・29歳）",
    point: "残業少ない・安定重視向け",
  },
  {
    key: "marketing",
    name: "マーケティング",
    icon: "📣",
    salaryRange: "450〜900万円",
    overtime: "20〜35h/月",
    industries: ["製造業", "IT", "サービス・小売", "コンサル"],
    turnover: "中",
    turnoverReason: "デジタルマーケターはスキルの市場価値が高く、より良い条件を求めた転職が多い。ブランドマーケターは会社愛着が強く離職率低め。",
    remote: "中",
    desc: "商品・サービスを顧客に届けるための戦略・施策を担う。デジタルマーケティングの台頭でデータ分析スキルの需要が急増中。消費財メーカー・IT・広告代理店で活躍の場が多い。クリエイティビティとデータ分析力の両方が求められる希少な職種。",
    realVoice: "「施策が当たって売上に直結したときの達成感は格別。デジタルとアナログを行き来しながら、数字とクリエイティブを同時に扱う感覚が好き。ただし広告代理店は深夜残業がまだ多い」（消費財メーカー・マーケター・27歳）",
    point: "デジタル化で需要急増中",
  },
];
