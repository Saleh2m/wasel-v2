'use client';
import { useState, useEffect } from 'react';
import { supabase } from './supabase';

// ===== QUESTIONS =====
const QUESTIONS = [
  {
    id: 1,
    dim: 'work_style',
    text: 'عندما تبدأ مشروعاً جديداً، ما أول شيء تفعله؟',
    options: [
      'أضع خطة تفصيلية قبل أي خطوة',
      'أبدأ بخطوات صغيرة وأعدّل في الطريق',
      'أتحدث مع الفريق لفهم التوقعات',
      'أبحث عن أمثلة ناجحة مشابهة',
    ],
  },
  {
    id: 2,
    dim: 'decision',
    text: 'عند مواجهة قرار صعب بمعلومات ناقصة — ماذا تفعل؟',
    options: [
      'أنتظر حتى تكتمل المعلومات',
      'أتخذ القرار بأفضل المعلومات المتاحة',
      'أستشير المعنيين أولاً',
      'أقدم خيارات متعددة للمسؤول',
    ],
  },
  {
    id: 3,
    dim: 'culture',
    text: 'ما بيئة العمل التي تجعلك أكثر إنتاجية؟',
    options: [
      'بيئة منظمة بأدوار واضحة',
      'بيئة مرنة تشجع على الإبداع',
      'بيئة تعاونية كفريق واحد',
      'بيئة تنافسية تكافئ التميز',
    ],
  },
  {
    id: 4,
    dim: 'motivation',
    text: 'ما الذي يشعرك بأكبر قدر من الرضا في العمل؟',
    options: [
      'حل مشكلة معقدة لم يحلها أحد',
      'قيادة فريق لتحقيق هدف صعب',
      'بناء شيء من الصفر يراه الناس',
      'التطور المهني والتعلم المستمر',
    ],
  },
  {
    id: 5,
    dim: 'work_style',
    text: 'كيف تتعامل مع مهام متعددة في نفس الوقت؟',
    options: [
      'أكمل مهمة واحدة تماماً قبل التالية',
      'أوزّع وقتي بين المهام بالتوازي',
      'أفوّض ما أستطيع وأركز على الأهم',
      'أرتّب حسب الأولوية والموعد النهائي',
    ],
  },
  {
    id: 6,
    dim: 'leadership',
    text: 'في العمل الجماعي، ما دورك الطبيعي؟',
    options: [
      'أقود وأحدد الاتجاه',
      'أنفّذ وأضمن الجودة',
      'أنسّق وأحل الخلافات',
      'أبتكر وأطرح أفكاراً جديدة',
    ],
  },
  {
    id: 7,
    dim: 'culture',
    text: 'كيف تفضّل تلقّي التغذية الراجعة؟',
    options: [
      'مباشرة وصريحة في الوقت الفوري',
      'مكتوبة ومفصّلة بعد تفكير',
      'في اجتماع دوري منظم',
      'بشكل غير رسمي في المحادثة اليومية',
    ],
  },
  {
    id: 8,
    dim: 'decision',
    text: 'ما أسلوبك عند الخلاف مع زميل على قرار؟',
    options: [
      'أقدم بيانات وحجج منطقية',
      'أبحث عن حل وسط يرضي الطرفين',
      'أحيل الأمر للمدير لحسمه',
      'أتبنى رأيه إذا كان أكثر خبرة',
    ],
  },
  {
    id: 9,
    dim: 'motivation',
    text: 'ماذا تعني لك الترقية المهنية؟',
    options: [
      'مسؤولية أكبر وتأثير أوسع',
      'راتب أعلى واعتراف بالجهد',
      'فرصة لتطوير مهارات جديدة',
      'قيادة فريق خاص بي',
    ],
  },
  {
    id: 10,
    dim: 'work_style',
    text: 'كيف تتعامل مع المواعيد النهائية الضيقة؟',
    options: [
      'أعمل إضافياً حتى أنجز العمل',
      'أخفّض جودة ما يمكن تخفيضه للتسليم في الوقت',
      'أتفاوض على تمديد الموعد',
      'أطلب مساعدة الفريق فوراً',
    ],
  },
  {
    id: 11,
    dim: 'culture',
    text: 'ما مدى أهمية العلاقات الاجتماعية مع الزملاء؟',
    options: [
      'ضرورية — الفريق كالعائلة',
      'مهمة لكنها تبقى مهنية',
      'ثانوية — العمل هو الأولوية',
      'تعتمد على شخصية الزميل',
    ],
  },
  {
    id: 12,
    dim: 'leadership',
    text: 'كيف تتعامل مع موظف أو زميل ضعيف الأداء؟',
    options: [
      'أتحدث معه مباشرة وأضع خطة تحسين',
      'أعطيه مهاماً تناسب قدراته',
      'أُبلّغ مديري لاتخاذ الإجراء المناسب',
      'أساعده شخصياً حتى يتحسن',
    ],
  },
  {
    id: 13,
    dim: 'motivation',
    text: 'ما الذي يجعلك تبقى في وظيفة لأكثر من 3 سنوات؟',
    options: [
      'مشاريع متجددة ومتحديات مستمرة',
      'فريق عمل رائع تستمتع بوجوده',
      'راتب تنافسي وامتيازات جيدة',
      'مسار واضح للنمو والترقي',
    ],
  },
  {
    id: 14,
    dim: 'decision',
    text: 'كيف تتعامل مع المخاطر المهنية؟',
    options: [
      'أدرسها بعمق قبل أي قرار',
      'أقبلها إذا كان المكسب يستحق',
      'أتجنبها قدر الإمكان',
      'أشارك المخاطرة مع الفريق',
    ],
  },
  {
    id: 15,
    dim: 'work_style',
    text: 'ما أسلوبك في التعلم وتطوير مهاراتك؟',
    options: [
      'دورات منظمة وشهادات معتمدة',
      'تعلم ذاتي من مصادر متنوعة',
      'التعلم من خلال التجربة والتطبيق',
      'التعلم من المرشدين والخبراء',
    ],
  },
  {
    id: 16,
    dim: 'culture',
    text: 'ما رأيك في العمل عن بُعد بشكل كامل؟',
    options: [
      'أفضّله — أنتج أكثر بدون إزعاج',
      'أفضّل الهجين — أيام في المكتب وأيام من البيت',
      'أفضّل المكتب — أحتاج البيئة المهنية',
      'لا يهمني المكان إذا توفرت الأدوات',
    ],
  },
  {
    id: 17,
    dim: 'leadership',
    text: 'ما أسلوب القيادة الذي تعمل بشكل أفضل تحته؟',
    options: [
      'قيادة توجيهية تعطي تعليمات واضحة',
      'قيادة تفويضية تمنح استقلالية',
      'قيادة تشاركية تشرك الفريق في القرارات',
      'قيادة تدريبية تركز على التطوير',
    ],
  },
  {
    id: 18,
    dim: 'motivation',
    text: 'كيف تعرّف النجاح المهني لنفسك؟',
    options: [
      'تحقيق أهداف ملموسة وقابلة للقياس',
      'التأثير الإيجابي على من حولك',
      'الوصول لمنصب قيادي مرموق',
      'تحقيق التوازن بين العمل والحياة',
    ],
  },
];

// ===== SCORE CALCULATOR =====
function calcScores(answers: Record<number, number>) {
  const dims: Record<string, number[]> = {};
  QUESTIONS.forEach((q) => {
    if (!dims[q.dim]) dims[q.dim] = [];
    const ans = answers[q.id];
    if (ans !== undefined) dims[q.dim].push(ans);
  });
  const result: Record<string, number> = {};
  Object.entries(dims).forEach(([dim, vals]) => {
    result[dim] = Math.round(
      (vals.reduce((a: number, b: number) => a + b, 0) / (vals.length * 3)) *
        100
    );
  });
  return result;
}

function calcMatch(
  candidateScores: Record<string, number>,
  companyScores: Record<string, number>
) {
  const keys = Object.keys(candidateScores);
  if (!keys.length) return 0;
  let total = 0;
  keys.forEach((k) => {
    const diff = Math.abs((candidateScores[k] || 0) - (companyScores[k] || 0));
    total += 100 - diff;
  });
  return Math.round(total / keys.length);
}

// ===== MAIN COMPONENT =====
export default function WaselApp() {
  const [page, setPage] = useState<
    'auth' | 'dashboard' | 'assessment' | 'profile' | 'hr' | 'matches'
  >('auth');
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Auth state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'candidate' | 'company'>('candidate');
  const [isLogin, setIsLogin] = useState(true);
  const [authMsg, setAuthMsg] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Assessment state
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [assessDone, setAssessDone] = useState(false);

  // HR state
  const [candidates, setCandidates] = useState<any[]>([]);
  const [hrLoading, setHrLoading] = useState(false);

  // Matches state
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data);
        setPage('dashboard');
      }
      setLoading(false);
    });
  }, []);

  // ===== AUTH =====
  async function handleAuth() {
    setAuthLoading(true);
    setAuthMsg('');
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setAuthMsg(error.message);
        setAuthLoading(false);
        return;
      }
      const {
        data: { user: u },
      } = await supabase.auth.getUser();
      if (u) {
        const { data: p } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', u.id)
          .single();
        setUser(u);
        setProfile(p);
        setPage('dashboard');
      }
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setAuthMsg(error.message);
        setAuthLoading(false);
        return;
      }
      if (data.user) {
        await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            full_name: fullName,
            role,
            assessment_done: false,
          });
        const { data: p } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        setUser(data.user);
        setProfile(p);
        setPage('dashboard');
      }
    }
    setAuthLoading(false);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setPage('auth');
    setEmail('');
    setPassword('');
    setFullName('');
  }

  // ===== ASSESSMENT =====
  async function submitAssessment() {
    const scores = calcScores(answers);
    await supabase
      .from('profiles')
      .update({
        assessment_done: true,
        scores: JSON.stringify(scores),
      })
      .eq('id', user.id);
    const { data: p } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    setProfile(p);
    setAssessDone(true);
  }

  // ===== HR =====
  async function loadCandidates() {
    setHrLoading(true);
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'candidate');
    const compScores = profile?.scores ? JSON.parse(profile.scores) : {};
    const withMatch = (data || [])
      .map((c: any) => {
        const cScores = c.scores ? JSON.parse(c.scores) : {};
        return { ...c, matchPct: calcMatch(cScores, compScores) };
      })
      .sort((a: any, b: any) => b.matchPct - a.matchPct);
    setCandidates(withMatch);
    setHrLoading(false);
  }

  async function loadMatches() {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'company');
    const myScores = profile?.scores ? JSON.parse(profile.scores) : {};
    const withMatch = (data || [])
      .map((c: any) => {
        const cScores = c.scores ? JSON.parse(c.scores) : {};
        return { ...c, matchPct: calcMatch(myScores, cScores) };
      })
      .sort((a: any, b: any) => b.matchPct - a.matchPct);
    setMatches(withMatch);
  }

  // ===== STYLES =====
  const S = {
    bg: '#F5F4EF',
    card: {
      background: 'white',
      borderRadius: '16px',
      border: '1px solid #E2E1DB',
    },
    green: '#1B6B3A',
    dark: '#0B0F0A',
    muted: '#7D8878',
    btn: (variant: 'primary' | 'secondary' = 'primary') => ({
      padding: '12px 28px',
      borderRadius: '10px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 700,
      fontSize: '14px',
      background: variant === 'primary' ? '#1B6B3A' : '#F5F4EF',
      color: variant === 'primary' ? 'white' : '#0B0F0A',
    }),
  };

  if (loading)
    return (
      <div
        style={{
          minHeight: '100vh',
          background: S.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: '32px', fontWeight: 900, color: S.green }}>
          وصل
        </div>
      </div>
    );

  // ===== AUTH PAGE =====
  if (page === 'auth')
    return (
      <main
        style={{
          minHeight: '100vh',
          background: S.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          direction: 'rtl',
        }}
      >
        <div
          style={{
            ...S.card,
            padding: '48px',
            width: '100%',
            maxWidth: '440px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ marginBottom: '32px' }}>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 900,
                color: S.dark,
                marginBottom: '4px',
              }}
            >
              وصل <span style={{ color: S.green }}>AI</span>
            </div>
            <div style={{ fontSize: '14px', color: S.muted }}>
              منصة التوافق الوظيفي الذكي
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '28px',
              background: S.bg,
              padding: '4px',
              borderRadius: '10px',
            }}
          >
            {(['تسجيل دخول', 'حساب جديد'] as const).map((label, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsLogin(i === 0);
                  setAuthMsg('');
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  background: isLogin === (i === 0) ? 'white' : 'transparent',
                  color: isLogin === (i === 0) ? S.dark : S.muted,
                  boxShadow:
                    isLogin === (i === 0)
                      ? '0 1px 4px rgba(0,0,0,0.1)'
                      : 'none',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            {!isLogin && (
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="الاسم الكامل"
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #E2E1DB',
                  fontSize: '14px',
                  outline: 'none',
                  fontFamily: 'sans-serif',
                  direction: 'rtl',
                }}
              />
            )}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="البريد الإلكتروني"
              type="email"
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #E2E1DB',
                fontSize: '14px',
                outline: 'none',
                fontFamily: 'sans-serif',
                direction: 'ltr',
              }}
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              type="password"
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #E2E1DB',
                fontSize: '14px',
                outline: 'none',
                fontFamily: 'sans-serif',
                direction: 'ltr',
              }}
            />

            {!isLogin && (
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { val: 'candidate', label: 'باحث عن عمل', icon: '👤' },
                  { val: 'company', label: 'شركة', icon: '🏢' },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setRole(opt.val as any)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '10px',
                      border: `2px solid ${
                        role === opt.val ? S.green : '#E2E1DB'
                      }`,
                      background: role === opt.val ? '#EEF7F1' : 'white',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: role === opt.val ? S.green : S.muted,
                    }}
                  >
                    <span style={{ marginLeft: '6px' }}>{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {authMsg && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: authMsg.includes('✓') ? '#EEF7F1' : '#FEF2F2',
                  color: authMsg.includes('✓') ? S.green : '#DC2626',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                {authMsg}
              </div>
            )}

            <button
              onClick={handleAuth}
              disabled={authLoading}
              style={{
                ...S.btn('primary'),
                padding: '14px',
                fontSize: '15px',
                opacity: authLoading ? 0.7 : 1,
              }}
            >
              {authLoading ? '...' : isLogin ? 'تسجيل الدخول' : 'إنشاء الحساب'}
            </button>
          </div>
        </div>
      </main>
    );

  // ===== ASSESSMENT PAGE =====
  if (page === 'assessment') {
    if (assessDone)
      return (
        <main
          style={{
            minHeight: '100vh',
            background: S.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'sans-serif',
            direction: 'rtl',
          }}
        >
          <div
            style={{
              ...S.card,
              padding: '48px',
              maxWidth: '480px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ fontSize: '56px', marginBottom: '20px' }}>🎯</div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 900,
                marginBottom: '12px',
              }}
            >
              اكتمل تقييمك!
            </div>
            <div
              style={{ color: S.muted, marginBottom: '32px', lineHeight: 1.7 }}
            >
              تم تحليل شخصيتك المهنية بنجاح. يمكنك الآن مشاهدة أفضل الشركات
              توافقاً معك.
            </div>
            <div
              style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}
            >
              <button
                onClick={() => {
                  setPage('matches');
                  loadMatches();
                }}
                style={S.btn('primary')}
              >
                عرض التوافقات
              </button>
              <button
                onClick={() => setPage('dashboard')}
                style={S.btn('secondary')}
              >
                لوحة التحكم
              </button>
            </div>
          </div>
        </main>
      );

    const q = QUESTIONS[currentQ];
    const progress = (currentQ / QUESTIONS.length) * 100;

    return (
      <main
        style={{
          minHeight: '100vh',
          background: S.bg,
          fontFamily: 'sans-serif',
          direction: 'rtl',
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '32px',
            }}
          >
            <div style={{ fontSize: '20px', fontWeight: 900, color: S.dark }}>
              وصل <span style={{ color: S.green }}>AI</span>
            </div>
            <button
              onClick={() => setPage('dashboard')}
              style={{
                ...S.btn('secondary'),
                padding: '8px 16px',
                fontSize: '13px',
              }}
            >
              خروج
            </button>
          </div>

          <div
            style={{
              marginBottom: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '13px',
              color: S.muted,
            }}
          >
            <span>
              السؤال {currentQ + 1} من {QUESTIONS.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div
            style={{
              background: '#E2E1DB',
              borderRadius: '99px',
              height: '6px',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: S.green,
                borderRadius: '99px',
                transition: 'width 0.3s',
              }}
            />
          </div>

          <div
            style={{
              ...S.card,
              padding: '36px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                fontWeight: 800,
                lineHeight: 1.6,
                marginBottom: '28px',
              }}
            >
              {q.text}
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const newAnswers = { ...answers, [q.id]: i };
                    setAnswers(newAnswers);
                    if (currentQ < QUESTIONS.length - 1) {
                      setCurrentQ(currentQ + 1);
                    } else {
                      submitAssessment();
                    }
                  }}
                  style={{
                    padding: '14px 18px',
                    borderRadius: '10px',
                    border: `2px solid ${
                      answers[q.id] === i ? S.green : '#E2E1DB'
                    }`,
                    background: answers[q.id] === i ? '#EEF7F1' : 'white',
                    cursor: 'pointer',
                    textAlign: 'right',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: answers[q.id] === i ? S.green : S.dark,
                    transition: 'all 0.15s',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {currentQ > 0 && (
            <button
              onClick={() => setCurrentQ(currentQ - 1)}
              style={{ ...S.btn('secondary'), fontSize: '13px' }}
            >
              ← السابق
            </button>
          )}
        </div>
      </main>
    );
  }

  // ===== HR PAGE =====
  if (page === 'hr')
    return (
      <main
        style={{
          minHeight: '100vh',
          background: S.bg,
          fontFamily: 'sans-serif',
          direction: 'rtl',
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '32px',
            }}
          >
            <div>
              <div style={{ fontSize: '22px', fontWeight: 900 }}>لوحة HR</div>
              <div style={{ fontSize: '14px', color: S.muted }}>
                المرشحون مرتبون حسب التوافق مع شركتك
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => {
                  loadCandidates();
                }}
                style={S.btn('primary')}
              >
                تحديث
              </button>
              <button
                onClick={() => setPage('dashboard')}
                style={S.btn('secondary')}
              >
                رجوع
              </button>
            </div>
          </div>

          {hrLoading ? (
            <div
              style={{ textAlign: 'center', padding: '60px', color: S.muted }}
            >
              جاري التحميل...
            </div>
          ) : candidates.length === 0 ? (
            <div style={{ ...S.card, padding: '48px', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>👥</div>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>
                لا يوجد مرشحون بعد
              </div>
              <div style={{ color: S.muted, fontSize: '14px' }}>
                اضغط تحديث بعد تسجيل مرشحين في المنصة
              </div>
            </div>
          ) : (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              {candidates.map((c, i) => (
                <div
                  key={c.id}
                  style={{
                    ...S.card,
                    padding: '24px',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto',
                    gap: '20px',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      background: '#EEF7F1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '18px',
                      color: S.green,
                    }}
                  >
                    {(c.full_name || 'م')[0]}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: '16px',
                        marginBottom: '4px',
                      }}
                    >
                      {c.full_name || 'مرشح'}
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        color: S.muted,
                        marginBottom: '10px',
                      }}
                    >
                      {c.email || ''}
                    </div>
                    {c.scores && (
                      <div
                        style={{
                          display: 'flex',
                          gap: '16px',
                          flexWrap: 'wrap',
                        }}
                      >
                        {Object.entries(JSON.parse(c.scores)).map(
                          ([dim, val]: any) => (
                            <div key={dim} style={{ minWidth: '90px' }}>
                              <div
                                style={{
                                  fontSize: '10px',
                                  color: S.muted,
                                  marginBottom: '3px',
                                }}
                              >
                                {dim}
                              </div>
                              <div
                                style={{
                                  background: '#F5F4EF',
                                  borderRadius: '3px',
                                  height: '5px',
                                }}
                              >
                                <div
                                  style={{
                                    width: `${val}%`,
                                    height: '100%',
                                    background: S.green,
                                    borderRadius: '3px',
                                  }}
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        fontSize: '28px',
                        fontWeight: 900,
                        color:
                          c.matchPct >= 80
                            ? S.green
                            : c.matchPct >= 60
                            ? '#B8860B'
                            : S.muted,
                      }}
                    >
                      {c.matchPct}%
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: S.muted,
                        marginBottom: '8px',
                      }}
                    >
                      توافق
                    </div>
                    <button
                      style={{
                        ...S.btn('primary'),
                        padding: '8px 16px',
                        fontSize: '12px',
                      }}
                    >
                      تواصل
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    );

  // ===== MATCHES PAGE =====
  if (page === 'matches')
    return (
      <main
        style={{
          minHeight: '100vh',
          background: S.bg,
          fontFamily: 'sans-serif',
          direction: 'rtl',
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '32px',
            }}
          >
            <div>
              <div style={{ fontSize: '22px', fontWeight: 900 }}>توافقاتك</div>
              <div style={{ fontSize: '14px', color: S.muted }}>
                الشركات الأكثر توافقاً مع شخصيتك المهنية
              </div>
            </div>
            <button
              onClick={() => setPage('dashboard')}
              style={S.btn('secondary')}
            >
              رجوع
            </button>
          </div>

          {matches.length === 0 ? (
            <div style={{ ...S.card, padding: '48px', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>
                لا توجد شركات بعد
              </div>
              <div style={{ color: S.muted, fontSize: '14px' }}>
                ستظهر هنا الشركات المسجلة في المنصة
              </div>
            </div>
          ) : (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              {matches.map((c) => (
                <div
                  key={c.id}
                  style={{
                    ...S.card,
                    padding: '24px',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto',
                    gap: '20px',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '12px',
                      background: '#EEF7F1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '18px',
                      color: S.green,
                    }}
                  >
                    🏢
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: '16px',
                        marginBottom: '4px',
                      }}
                    >
                      {c.full_name || 'شركة'}
                    </div>
                    <div style={{ fontSize: '13px', color: S.muted }}>
                      {c.assessment_done
                        ? '✓ أكملت التقييم'
                        : 'لم تكمل التقييم بعد'}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        fontSize: '28px',
                        fontWeight: 900,
                        color:
                          c.matchPct >= 80
                            ? S.green
                            : c.matchPct >= 60
                            ? '#B8860B'
                            : S.muted,
                      }}
                    >
                      {c.matchPct}%
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: S.muted,
                        marginBottom: '8px',
                      }}
                    >
                      توافق
                    </div>
                    <button
                      style={{
                        ...S.btn('primary'),
                        padding: '8px 16px',
                        fontSize: '12px',
                      }}
                    >
                      تقدم
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    );

  // ===== DASHBOARD =====
  const isCompany = profile?.role === 'company' || profile?.role === 'شركة';
  const myScores = profile?.scores ? JSON.parse(profile.scores) : null;

  return (
    <main
      style={{
        minHeight: '100vh',
        background: S.bg,
        fontFamily: 'sans-serif',
        direction: 'rtl',
        padding: '24px',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* HEADER */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px',
          }}
        >
          <div>
            <div style={{ fontSize: '22px', fontWeight: 900 }}>
              وصل <span style={{ color: S.green }}>AI</span>
            </div>
            <div style={{ fontSize: '13px', color: S.muted }}>
              {isCompany ? 'شركة' : 'باحث عن عمل'} ·{' '}
              {profile?.full_name || user?.email}
            </div>
          </div>
          <button
            onClick={handleSignOut}
            style={{
              ...S.btn('secondary'),
              padding: '8px 16px',
              fontSize: '13px',
            }}
          >
            خروج
          </button>
        </div>

        {/* STATS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          {[
            {
              label: 'حالة التقييم',
              value: profile?.assessment_done ? 'مكتمل ✓' : 'لم يبدأ',
              icon: '📊',
            },
            {
              label: isCompany ? 'المرشحون' : 'التوافقات',
              value: '0',
              icon: '🎯',
            },
            { label: 'الطلبات', value: '0', icon: '📨' },
          ].map((stat, i) => (
            <div key={i} style={{ ...S.card, padding: '20px' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>
                {stat.icon}
              </div>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 900,
                  marginBottom: '4px',
                  color: stat.value === 'مكتمل ✓' ? S.green : S.dark,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: '12px', color: S.muted }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* SCORES (if done) */}
        {myScores && (
          <div style={{ ...S.card, padding: '28px', marginBottom: '24px' }}>
            <div style={{ fontWeight: 800, marginBottom: '16px' }}>
              ملفك المهني
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
              }}
            >
              {Object.entries(myScores).map(([dim, val]: any) => (
                <div key={dim}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '13px',
                      marginBottom: '6px',
                    }}
                  >
                    <span style={{ color: S.muted }}>{dim}</span>
                    <span style={{ fontWeight: 700, color: S.green }}>
                      {val}%
                    </span>
                  </div>
                  <div
                    style={{
                      background: '#F5F4EF',
                      borderRadius: '99px',
                      height: '8px',
                    }}
                  >
                    <div
                      style={{
                        width: `${val}%`,
                        height: '100%',
                        background: S.green,
                        borderRadius: '99px',
                        transition: 'width 0.5s',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTION CARD */}
        <div
          style={{
            ...S.card,
            padding: '36px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          }}
        >
          {!profile?.assessment_done ? (
            <>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧭</div>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 900,
                  marginBottom: '8px',
                }}
              >
                ابدأ تقييمك المهني
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: S.muted,
                  marginBottom: '28px',
                  lineHeight: 1.7,
                }}
              >
                18 سؤال يكشفان شخصيتك المهنية ويوصلانك بالبيئة التي ستزدهر فيها
              </div>
              <button
                onClick={() => {
                  setCurrentQ(0);
                  setAnswers({});
                  setAssessDone(false);
                  setPage('assessment');
                }}
                style={{
                  ...S.btn('primary'),
                  padding: '14px 36px',
                  fontSize: '15px',
                }}
              >
                ابدأ التقييم الآن
              </button>
            </>
          ) : isCompany ? (
            <>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 900,
                  marginBottom: '8px',
                }}
              >
                لوحة HR
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: S.muted,
                  marginBottom: '28px',
                  lineHeight: 1.7,
                }}
              >
                اعرض المرشحين مرتبين حسب توافقهم مع ثقافة شركتك
              </div>
              <button
                onClick={() => {
                  setPage('hr');
                  loadCandidates();
                }}
                style={{
                  ...S.btn('primary'),
                  padding: '14px 36px',
                  fontSize: '15px',
                }}
              >
                فتح لوحة HR
              </button>
            </>
          ) : (
            <>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 900,
                  marginBottom: '8px',
                }}
              >
                توافقاتك المهنية
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: S.muted,
                  marginBottom: '28px',
                  lineHeight: 1.7,
                }}
              >
                اكتشف الشركات الأكثر توافقاً مع شخصيتك وأسلوبك في العمل
              </div>
              <button
                onClick={() => {
                  setPage('matches');
                  loadMatches();
                }}
                style={{
                  ...S.btn('primary'),
                  padding: '14px 36px',
                  fontSize: '15px',
                }}
              >
                عرض التوافقات
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
