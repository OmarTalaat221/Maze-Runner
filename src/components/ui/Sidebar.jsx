import { memo } from "react";
import { ALGORITHMS } from "../../utils/constants";

const AlgorithmExplainer = memo(function AlgorithmExplainer({
  algorithm,
  isOpen,
  onClose,
}) {
  const explanations = {
    [ALGORITHMS.BFS]: {
      title: "BFS - Breadth-First Search",
      emoji: "🔵",
      color: "from-blue-500 to-cyan-500",
      structure: "Queue (FIFO)",
      guarantee: "أقصر مسار (بعدد الخطوات)",
      complexity: {
        time: "O(V + E)",
        space: "O(V)",
      },
      howItWorks: [
        "نبدأ من نقطة البداية",
        "نضيفها في Queue",
        "نستكشف كل الجيران المباشرين",
        "نضيف الجيران في نهاية الـ Queue",
        "نكرر حتى نوصل للهدف",
      ],
      advantages: [
        "يضمن أقصر مسار",
        "يستكشف بشكل منظم",
        "مناسب للمسافات القصيرة",
      ],
      disadvantages: [
        "يستهلك ذاكرة كبيرة",
        "بطيء في المتاهات الكبيرة",
        "لا يهتم بالتكلفة",
      ],
      visual: `
        Level 0:    S
                   ↙ ↓ ↘
        Level 1:  1  2  3
                 ↙↓  ↓  ↓↘
        Level 2: 4 5 6 7 8
      `,
    },
    [ALGORITHMS.DFS]: {
      title: "DFS - Depth-First Search",
      emoji: "🟢",
      color: "from-green-500 to-emerald-500",
      structure: "Stack (LIFO)",
      guarantee: "يجد أي مسار (ليس بالضرورة الأقصر)",
      complexity: {
        time: "O(V + E)",
        space: "O(V)",
      },
      howItWorks: [
        "نبدأ من نقطة البداية",
        "نضيفها في Stack",
        "نستكشف أول جار",
        "ندخل في العمق قبل الاتساع",
        "نرجع للخلف إذا وصلنا لطريق مسدود",
      ],
      advantages: ["ذاكرة أقل من BFS", "سريع في إيجاد حل", "بسيط في التنفيذ"],
      disadvantages: ["قد يجد مسار طويل", "قد يدور في دائرة", "غير مثالي"],
      visual: `
        S → 1 → 2 → 3 → Goal
            ↓   ↓
            4   5
            ↓
            6
      `,
    },
    [ALGORITHMS.UCS]: {
      title: "UCS - Uniform Cost Search",
      emoji: "🟡",
      color: "from-yellow-500 to-orange-500",
      structure: "Priority Queue (أقل تكلفة)",
      guarantee: "أقل تكلفة إجمالية",
      complexity: {
        time: "O(V log V)",
        space: "O(V)",
      },
      howItWorks: [
        "نبدأ من نقطة البداية بتكلفة 0",
        "نضيف في Priority Queue",
        "نختار دائماً الخلية بأقل تكلفة",
        "نحسب التكلفة التراكمية",
        "نكرر حتى نوصل للهدف",
      ],
      advantages: ["يضمن أقل تكلفة", "مثالي للمسارات المرجحة", "دقيق جداً"],
      disadvantages: [
        "أبطأ من BFS",
        "يستهلك ذاكرة",
        "قد يأخذ مسار أطول بتكلفة أقل",
      ],
      visual: `
        S(0) → A(3) → B(5) → Goal
          ↓      ↓      ↓
         C(5)   D(8)   E(10)
         
        نختار الأقل تكلفة دائماً
      `,
    },
    [ALGORITHMS.IDS]: {
      title: "IDS - Iterative Deepening Search",
      emoji: "🟣",
      color: "from-purple-500 to-indigo-500",
      structure: "Stack + حد عمق متزايد",
      guarantee: "أقصر مسار (بعدد الخطوات)",
      complexity: {
        time: "O(b^d)",
        space: "O(d)",
      },
      howItWorks: [
        "نبدأ بعمق محدود = 1",
        "نبحث باستخدام DFS حتى العمق المحدد",
        "إذا لم نجد الهدف، نزيد العمق",
        "نكرر البحث بالعمق الجديد",
        "نستمر حتى نجد الهدف",
      ],
      advantages: [
        "ذاكرة قليلة مثل DFS",
        "يضمن أقصر مسار مثل BFS",
        "أفضل ما في العالمين",
      ],
      disadvantages: [
        "يعيد الحسابات عدة مرات",
        "أبطأ من BFS",
        "يستهلك وقت أكثر",
      ],
      visual: `
        Depth 1: S → X
        Depth 2: S → A → X
        Depth 3: S → A → B → Goal ✓
      `,
    },
    [ALGORITHMS.A_STAR_MANHATTAN]: {
      title: "A* - Manhattan Distance",
      emoji: "⭐",
      color: "from-pink-500 to-rose-500",
      structure: "Priority Queue (f = g + h)",
      guarantee: "أقل تكلفة + ذكاء في الاتجاه",
      complexity: {
        time: "O(b^d)",
        space: "O(b^d)",
      },
      howItWorks: [
        "f(n) = g(n) + h(n)",
        "g(n) = التكلفة الفعلية من البداية",
        "h(n) = المسافة التقديرية للهدف (Manhattan)",
        "نختار الخلية بأقل f",
        "نستكشف باتجاه الهدف",
      ],
      advantages: ["أسرع من UCS", "يضمن أقل تكلفة", "ذكي في الاتجاه"],
      disadvantages: [
        "يعتمد على دقة الـ Heuristic",
        "قد يستهلك ذاكرة",
        "معقد قليلاً",
      ],
      visual: `
        h = |x₁-x₂| + |y₁-y₂|
        
        S(g=0, h=10, f=10)
         ↓
        A(g=3, h=7, f=10)
         ↓
        Goal(g=10, h=0, f=10)
      `,
    },
    [ALGORITHMS.A_STAR_DANGER]: {
      title: "A* - Danger Aware",
      emoji: "🔴",
      color: "from-red-500 to-pink-500",
      structure: "Priority Queue + تجنب الوحوش",
      guarantee: "أقل تكلفة + أمان",
      complexity: {
        time: "O(b^d)",
        space: "O(b^d)",
      },
      howItWorks: [
        "f(n) = g(n) + h(n) + danger(n)",
        "g(n) = التكلفة الفعلية",
        "h(n) = المسافة للهدف",
        "danger(n) = عقوبة القرب من الوحوش",
        "نتجنب المناطق الخطرة",
      ],
      advantages: ["يتجنب الوحوش", "آمن أكثر", "ذكي في التخطيط"],
      disadvantages: [
        "قد يأخذ مسار أطول",
        "تكلفة أعلى",
        "يعتمد على مواقع الوحوش",
      ],
      visual: `
        Danger Penalty:
        ≤2 cells: +50 (خطر جداً)
        ≤4 cells: +20 (خطر)
        ≤6 cells: +10 (حذر)
        
        يفضل المسار الآمن
      `,
    },
    [ALGORITHMS.HILL_CLIMBING]: {
      title: "Hill Climbing",
      emoji: "🏔️",
      color: "from-orange-500 to-amber-500",
      structure: "Greedy (الأقرب دائماً)",
      guarantee: "لا يوجد ضمان!",
      complexity: {
        time: "O(∞)",
        space: "O(1)",
      },
      howItWorks: [
        "نختار دائماً الجار الأقرب للهدف",
        "لا نرجع للخلف أبداً",
        "نتحرك خطوة بخطوة",
        "قد نعلق في مكان",
        "سريع جداً لكن غير مضمون",
      ],
      advantages: ["سريع جداً", "ذاكرة قليلة جداً", "بسيط جداً"],
      disadvantages: [
        "قد يعلق (Local Maxima)",
        "غير مضمون الوصول",
        "غير مثالي",
        "قد يفشل",
      ],
      visual: `
        ⛰️ Local Maximum Problem:
        
        Goal ←│    │← Stuck here!
              │ ╱  │
              │╱   │
        Start ─────────
        
        ⚠️ Can't escape local max!
      `,
    },
  };

  const data = explanations[algorithm] || explanations[ALGORITHMS.BFS];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div
          className={`sticky top-0 bg-gradient-to-r ${data.color} p-6 text-white z-10`}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="text-5xl mb-2">{data.emoji}</div>
              <h2 className="text-2xl font-bold">{data.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-3xl leading-none"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Structure */}
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <span>🏗️</span> البنية
            </h3>
            <p className="text-gray-300">{data.structure}</p>
          </div>

          {/* Guarantee */}
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <span>✅</span> الضمان
            </h3>
            <p className="text-gray-300">{data.guarantee}</p>
          </div>

          {/* Complexity */}
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <span>📊</span> التعقيد
            </h3>
            <div className="space-y-2 text-gray-300">
              <p>
                • Time:{" "}
                <code className="bg-slate-900 px-2 py-1 rounded">
                  {data.complexity.time}
                </code>
              </p>
              <p>
                • Space:{" "}
                <code className="bg-slate-900 px-2 py-1 rounded">
                  {data.complexity.space}
                </code>
              </p>
            </div>
          </div>

          {/* How it Works */}
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <span>⚙️</span> كيف تعمل؟
            </h3>
            <ol className="space-y-2">
              {data.howItWorks.map((step, i) => (
                <li key={i} className="text-gray-300 flex gap-2">
                  <span className="text-blue-400 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Visual */}
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <span>👁️</span> توضيح بصري
            </h3>
            <pre className="text-gray-300 text-xs font-mono whitespace-pre overflow-x-auto">
              {data.visual}
            </pre>
          </div>

          {/* Advantages */}
          <div className="bg-green-900/20 rounded-xl p-4 border border-green-700/50">
            <h3 className="text-green-400 font-bold mb-3 flex items-center gap-2">
              <span>✅</span> المميزات
            </h3>
            <ul className="space-y-2">
              {data.advantages.map((adv, i) => (
                <li key={i} className="text-green-300 flex gap-2">
                  <span>•</span>
                  <span>{adv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disadvantages */}
          <div className="bg-red-900/20 rounded-xl p-4 border border-red-700/50">
            <h3 className="text-red-400 font-bold mb-3 flex items-center gap-2">
              <span>⚠️</span> العيوب
            </h3>
            <ul className="space-y-2">
              {data.disadvantages.map((dis, i) => (
                <li key={i} className="text-red-300 flex gap-2">
                  <span>•</span>
                  <span>{dis}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
});

export default AlgorithmExplainer;
