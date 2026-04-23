'use client'
import { useState, useEffect } from 'react'
import { supabase } from './supabase'

const REGIONS = ['الرياض','جدة','مكة المكرمة','المدينة المنورة','الدمام','الخبر','الأحساء','تبوك','أبها','القصيم','حائل','جازان','نجران','الباحة','الجوف','عرعر','سكاكا','ينبع','القطيف','الطائف']
const FIELDS = [
  { name:'تقنية المعلومات', subs:['هندسة البرمجيات','علوم البيانات','الذكاء الاصطناعي','الأمن السيبراني','تطوير الويب','تطوير التطبيقات','DevOps','الحوسبة السحابية'] },
  { name:'المالية والمحاسبة', subs:['المحاسبة العامة','المراجعة الداخلية','التحليل المالي','إدارة المخاطر','التمويل الإسلامي'] },
  { name:'الموارد البشرية', subs:['التوظيف والاستقطاب','التدريب والتطوير','إدارة الأداء','تخطيط القوى العاملة'] },
  { name:'التسويق والمبيعات', subs:['التسويق الرقمي','إدارة المبيعات','العلاقات العامة','تسويق المحتوى'] },
  { name:'الهندسة', subs:['الهندسة المدنية','الهندسة الكهربائية','الهندسة الميكانيكية','هندسة المعمار'] },
  { name:'الصحة والطب', subs:['الطب العام','التمريض','الصيدلة','إدارة المستشفيات'] },
  { name:'التعليم', subs:['التدريس','الإدارة التعليمية','تطوير المناهج','التعليم الإلكتروني'] },
  { name:'القانون', subs:['المحاماة','الاستشارات القانونية','قانون الأعمال','الامتثال والحوكمة'] },
]
const JOB_TITLES = ['مطور برمجيات','محلل بيانات','مهندس ذكاء اصطناعي','مدير مشروع','محاسب قانوني','محلل مالي','مدير موارد بشرية','مسوق رقمي','مهندس مدني','طبيب عام','ممرض','صيدلاني','مدرس','محامي','مدير مبيعات','مهندس شبكات','مطور تطبيقات','مصمم UX/UI','مدير عمليات','مستشار أعمال','مدير تسويق','مهندس كهربائي','أخصائي موارد بشرية','محلل أعمال','مدير عام']
const QUESTIONS = [
  { id:1, dim:'work_style', text:'عندما تبدأ مشروعاً جديداً، ما أول شيء تفعله؟', options:['أضع خطة تفصيلية قبل أي خطوة','أبدأ بخطوات صغيرة وأعدّل في الطريق','أتحدث مع الفريق لفهم التوقعات','أبحث عن أمثلة ناجحة مشابهة'] },
  { id:2, dim:'decision', text:'عند مواجهة قرار صعب بمعلومات ناقصة — ماذا تفعل؟', options:['أنتظر حتى تكتمل المعلومات','أتخذ القرار بأفضل المعلومات المتاحة','أستشير المعنيين أولاً','أقدم خيارات متعددة للمسؤول'] },
  { id:3, dim:'culture', text:'ما بيئة العمل التي تجعلك أكثر إنتاجية؟', options:['بيئة منظمة بأدوار واضحة','بيئة مرنة تشجع على الإبداع','بيئة تعاونية كفريق واحد','بيئة تنافسية تكافئ التميز'] },
  { id:4, dim:'motivation', text:'ما الذي يشعرك بأكبر قدر من الرضا في العمل؟', options:['حل مشكلة معقدة لم يحلها أحد','قيادة فريق لتحقيق هدف صعب','بناء شيء من الصفر يراه الناس','التطور المهني والتعلم المستمر'] },
  { id:5, dim:'work_style', text:'كيف تتعامل مع مهام متعددة في نفس الوقت؟', options:['أكمل مهمة واحدة تماماً قبل التالية','أوزّع وقتي بين المهام بالتوازي','أفوّض ما أستطيع وأركز على الأهم','أرتّب حسب الأولوية والموعد النهائي'] },
  { id:6, dim:'leadership', text:'في العمل الجماعي، ما دورك الطبيعي؟', options:['أقود وأحدد الاتجاه','أنفّذ وأضمن الجودة','أنسّق وأحل الخلافات','أبتكر وأطرح أفكاراً جديدة'] },
  { id:7, dim:'culture', text:'كيف تفضّل تلقّي التغذية الراجعة؟', options:['مباشرة وصريحة في الوقت الفوري','مكتوبة ومفصّلة بعد تفكير','في اجتماع دوري منظم','بشكل غير رسمي في المحادثة اليومية'] },
  { id:8, dim:'decision', text:'ما أسلوبك عند الخلاف مع زميل على قرار؟', options:['أقدم بيانات وحجج منطقية','أبحث عن حل وسط يرضي الطرفين','أحيل الأمر للمدير لحسمه','أتبنى رأيه إذا كان أكثر خبرة'] },
  { id:9, dim:'motivation', text:'ماذا تعني لك الترقية المهنية؟', options:['مسؤولية أكبر وتأثير أوسع','راتب أعلى واعتراف بالجهد','فرصة لتطوير مهارات جديدة','قيادة فريق خاص بي'] },
  { id:10, dim:'work_style', text:'كيف تتعامل مع المواعيد النهائية الضيقة؟', options:['أعمل إضافياً حتى أنجز العمل','أخفّض جودة ما يمكن تخفيضه','أتفاوض على تمديد الموعد','أطلب مساعدة الفريق فوراً'] },
  { id:11, dim:'culture', text:'ما مدى أهمية العلاقات الاجتماعية مع الزملاء؟', options:['ضرورية — الفريق كالعائلة','مهمة لكنها تبقى مهنية','ثانوية — العمل هو الأولوية','تعتمد على شخصية الزميل'] },
  { id:12, dim:'leadership', text:'كيف تتعامل مع زميل ضعيف الأداء؟', options:['أتحدث معه مباشرة وأضع خطة تحسين','أعطيه مهاماً تناسب قدراته','أُبلّغ مديري لاتخاذ الإجراء المناسب','أساعده شخصياً حتى يتحسن'] },
  { id:13, dim:'motivation', text:'ما الذي يجعلك تبقى في وظيفة لأكثر من 3 سنوات؟', options:['مشاريع متجددة ومتحديات مستمرة','فريق عمل رائع','راتب تنافسي وامتيازات جيدة','مسار واضح للنمو والترقي'] },
  { id:14, dim:'decision', text:'كيف تتعامل مع المخاطر المهنية؟', options:['أدرسها بعمق قبل أي قرار','أقبلها إذا كان المكسب يستحق','أتجنبها قدر الإمكان','أشارك المخاطرة مع الفريق'] },
  { id:15, dim:'work_style', text:'ما أسلوبك في التعلم؟', options:['دورات منظمة وشهادات معتمدة','تعلم ذاتي من مصادر متنوعة','التعلم بالتجربة والتطبيق','التعلم من المرشدين والخبراء'] },
  { id:16, dim:'culture', text:'ما رأيك في العمل عن بُعد؟', options:['أفضّله بالكامل','أفضّل الهجين','أفضّل المكتب','لا يهمني المكان'] },
  { id:17, dim:'leadership', text:'ما أسلوب القيادة الذي تعمل بشكل أفضل تحته؟', options:['توجيهية بتعليمات واضحة','تفويضية بالاستقلالية','تشاركية مع الفريق','تدريبية تركز على التطوير'] },
  { id:18, dim:'motivation', text:'كيف تعرّف النجاح المهني لنفسك؟', options:['تحقيق أهداف ملموسة','التأثير الإيجابي على الآخرين','الوصول لمنصب قيادي','التوازن بين العمل والحياة'] },
]

const DIM_LABELS: Record<string,string> = { work_style:'أسلوب العمل', decision:'اتخاذ القرار', culture:'الثقافة', motivation:'الدوافع', leadership:'القيادة' }
const DIM_COLORS: Record<string,string> = { work_style:'#34D399', decision:'#60A5FA', culture:'#F97316', motivation:'#A78BFA', leadership:'#FBBF24' }

function calcScores(ans: Record<number,number>) {
  const d: Record<string,number[]> = {}
  QUESTIONS.forEach(q => { if (!d[q.dim]) d[q.dim]=[]; if (ans[q.id]!==undefined) d[q.dim].push(ans[q.id]) })
  const r: Record<string,number> = {}
  Object.entries(d).forEach(([k,v]) => { r[k]=Math.round((v.reduce((a:number,b:number)=>a+b,0)/(v.length*3))*100) })
  return r
}
function calcMatch(a:Record<string,number>, b:Record<string,number>) {
  const k=Object.keys(a); if(!k.length) return 0
  return Math.round(k.reduce((t,k)=>t+(100-Math.abs((a[k]||0)-(b[k]||0))),0)/k.length)
}

// ═══════════════════════════════════════════
// DESIGN TOKENS — Premium Dark
// ═══════════════════════════════════════════
const G = {
  // Backgrounds
  bg:        '#080A09',
  surface:   '#0E1210',
  card:      '#131816',
  cardHover: '#171D1A',
  overlay:   'rgba(0,0,0,0.85)',

  // Accents
  accent:    '#00DC82',   // neon green — primary CTA
  accentDim: '#00A862',
  accentGlow:'rgba(0,220,130,0.15)',

  // Text
  textPri:   '#F0FDF4',
  textSec:   '#8FA89A',
  textHint:  '#4A5C51',

  // Borders
  border:    '#1E2822',
  borderMid: '#283330',

  // Status
  success:   '#34D399',
  warning:   '#FBBF24',
  danger:    '#F87171',
  info:      '#60A5FA',
}

// ═══════════════════════════════════════════
// SHARED STYLES
// ═══════════════════════════════════════════
const FONT = `'IBM Plex Sans Arabic', sans-serif`

const inp: React.CSSProperties = {
  width:'100%', padding:'13px 16px', borderRadius:'10px',
  border:`1.5px solid ${G.border}`, background:G.surface,
  color:G.textPri, fontSize:'14px', fontFamily:FONT,
  outline:'none', boxSizing:'border-box', transition:'border-color 0.2s',
}

const card = (extra:any={}):React.CSSProperties => ({
  background:G.card, borderRadius:'16px', border:`1px solid ${G.border}`, ...extra
})

const btn = (v:'primary'|'secondary'|'ghost'|'danger'='primary', extra:any={}):React.CSSProperties => ({
  padding:'12px 24px', borderRadius:'10px', border:'none', cursor:'pointer',
  fontWeight:700, fontSize:'14px', fontFamily:FONT, transition:'all 0.18s',
  ...(v==='primary' ? { background:G.accent, color:'#001A0D' } :
      v==='secondary' ? { background:G.surface, color:G.textPri, border:`1px solid ${G.border}` } :
      v==='danger' ? { background:'rgba(248,113,113,0.12)', color:G.danger, border:`1px solid rgba(248,113,113,0.25)` } :
      { background:'transparent', color:G.textSec, border:'none' }),
  ...extra
})

const matchColor = (pct:number) => pct>=85?G.success:pct>=65?G.warning:G.textSec

// ═══════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════
export default function WaselApp() {
  type Page = 'auth'|'dashboard'|'assessment'|'hr'|'matches'|'profile'
  const [page, setPage] = useState<Page>('auth')
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Auth
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<'candidate'|'company'>('candidate')
  const [isLogin, setIsLogin] = useState(true)
  const [authMsg, setAuthMsg] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  // Assessment
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number,number>>({})
  const [assessDone, setAssessDone] = useState(false)

  // Profile form
  const [cvFile, setCvFile] = useState<File|null>(null)
  const [selField, setSelField] = useState('')
  const [selSub, setSelSub] = useState('')
  const [selTitle, setSelTitle] = useState('')
  const [selRegions, setSelRegions] = useState<string[]>([])
  const [skills, setSkills] = useState('')
  const [langs, setLangs] = useState('')
  const [achievement, setAchievement] = useState('')
  const [idealEnv, setIdealEnv] = useState('')
  const [dealBreaker, setDealBreaker] = useState('')
  const [experience, setExperience] = useState('')
  const [education, setEducation] = useState('')
  const [saved, setSaved] = useState(false)

  // HR
  const [candidates, setCandidates] = useState<any[]>([])
  const [selCandidate, setSelCandidate] = useState<any>(null)
  const [filterField, setFilterField] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [hrLoading, setHrLoading] = useState(false)

  // Matches
  const [matches, setMatches] = useState<any[]>([])

  const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;700;900&display=swap');`

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = FONT_IMPORT + `
      *{font-family:${FONT};box-sizing:border-box;}
      body{background:${G.bg};margin:0;}
      input:focus,select:focus,textarea:focus{border-color:${G.accent}!important;box-shadow:0 0 0 3px ${G.accentGlow};}
      input::placeholder,textarea::placeholder{color:${G.textHint};}
      select option{background:${G.card};color:${G.textPri};}
      ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-track{background:${G.bg};} ::-webkit-scrollbar-thumb{background:${G.border};border-radius:4px;}
      @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
      @keyframes slideIn{from{transform:translateX(-100%)}to{transform:none}}
      .fade-in{animation:fadeIn 0.3s ease forwards;}
      .slide-in{animation:slideIn 0.3s cubic-bezier(0.32,0.72,0,1) forwards;}
    `
    document.head.appendChild(style)

    supabase.auth.getSession().then(async ({data:{session}}) => {
      if (session?.user) {
        setUser(session.user)
        const {data} = await supabase.from('profiles').select('*').eq('id',session.user.id).single()
        setProfile(data); setPage('dashboard')
      }
      setLoading(false)
    })

    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event==='SIGNED_IN' && session?.user) {
        setUser(session.user)
        let {data:p} = await supabase.from('profiles').select('*').eq('id',session.user.id).single()
        if (!p) {
          await supabase.from('profiles').upsert({id:session.user.id, full_name:session.user.user_metadata?.full_name||'', role:'candidate', assessment_done:false})
          const {data:np} = await supabase.from('profiles').select('*').eq('id',session.user.id).single()
          p = np
        }
        setProfile(p); setUser(session.user); setPage('dashboard')
      }
    })
  }, [])

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({ provider:'google', options:{ redirectTo:window.location.origin } })
  }
  async function signInWithApple() {
    await supabase.auth.signInWithOAuth({ provider:'apple', options:{ redirectTo:window.location.origin } })
  }

  async function handleAuth() {
    setAuthLoading(true); setAuthMsg('')
    if (isLogin) {
      const {error} = await supabase.auth.signInWithPassword({email,password})
      if (error) { setAuthMsg(error.message); setAuthLoading(false); return }
      const {data:{user:u}} = await supabase.auth.getUser()
      if (u) { const {data:p}=await supabase.from('profiles').select('*').eq('id',u.id).single(); setUser(u); setProfile(p); setPage('dashboard') }
    } else {
      const {data,error} = await supabase.auth.signUp({email,password})
      if (error) { setAuthMsg(error.message); setAuthLoading(false); return }
      if (data.user) {
        await supabase.from('profiles').upsert({id:data.user.id,full_name:fullName,role,assessment_done:false})
        const {data:p}=await supabase.from('profiles').select('*').eq('id',data.user.id).single()
        setUser(data.user); setProfile(p); setPage('dashboard')
      }
    }
    setAuthLoading(false)
  }

  async function handleSignOut() { await supabase.auth.signOut(); setUser(null); setProfile(null); setPage('auth') }

  async function submitAssessment() {
    const scores=calcScores(answers)
    await supabase.from('profiles').update({assessment_done:true,scores:JSON.stringify(scores)}).eq('id',user.id)
    const {data:p}=await supabase.from('profiles').select('*').eq('id',user.id).single()
    setProfile(p); setAssessDone(true)
  }

  async function saveProfile() {
    await supabase.from('profiles').update({field:selField,sub_field:selSub,job_title:selTitle,regions:JSON.stringify(selRegions),skills,languages:langs,achievement,ideal_env:idealEnv,deal_breaker:dealBreaker,experience,education}).eq('id',user.id)
    const {data:p}=await supabase.from('profiles').select('*').eq('id',user.id).single()
    setProfile(p); setSaved(true); setTimeout(()=>setSaved(false),3000)
  }

  async function loadCandidates() {
    setHrLoading(true)
    const {data}=await supabase.from('profiles').select('*').eq('role','candidate')
    const cs2=profile?.scores?JSON.parse(profile.scores):{}
    setCandidates((data||[]).map((c:any)=>({...c,matchPct:calcMatch(c.scores?JSON.parse(c.scores):{},cs2)})).sort((a:any,b:any)=>b.matchPct-a.matchPct))
    setHrLoading(false)
  }

  async function updateStatus(id:string, status:string) {
    await supabase.from('profiles').update({hr_status:status}).eq('id',id)
    setCandidates(p=>p.map(c=>c.id===id?{...c,hr_status:status}:c))
    if (selCandidate?.id===id) setSelCandidate((p:any)=>({...p,hr_status:status}))
  }

  async function loadMatches() {
    const {data}=await supabase.from('profiles').select('*').eq('role','company')
    const ms=profile?.scores?JSON.parse(profile.scores):{}
    setMatches((data||[]).map((c:any)=>({...c,matchPct:calcMatch(ms,c.scores?JSON.parse(c.scores):{})})).sort((a:any,b:any)=>b.matchPct-a.matchPct))
  }

  const isCompany = profile?.role==='company'||profile?.role==='شركة'

  // ─── LOADING ───
  if (loading) return (
    <div style={{minHeight:'100vh',background:G.bg,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'16px'}}>
        <div style={{width:'48px',height:'48px',borderRadius:'14px',background:G.accentGlow,border:`1px solid ${G.accent}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',fontWeight:900,color:G.accent}}>و</div>
        <div style={{fontSize:'14px',color:G.textHint}}>جاري التحميل...</div>
      </div>
    </div>
  )

  // ─── AUTH ───
  if (page==='auth') return (
    <main style={{minHeight:'100vh',background:G.bg,display:'flex',direction:'rtl',overflow:'hidden'}}>
      {/* Left Panel — Branding */}
      <div style={{flex:1,background:`linear-gradient(135deg,#0A0F0C 0%,#0E1A13 100%)`,padding:'60px',display:'flex',flexDirection:'column',justifyContent:'space-between',borderLeft:`1px solid ${G.border}`,minWidth:0}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{width:'40px',height:'40px',borderRadius:'12px',background:G.accentGlow,border:`1px solid ${G.accent}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',fontWeight:900,color:G.accent}}>و</div>
          <div style={{fontSize:'20px',fontWeight:900,color:G.textPri}}>وصل <span style={{color:G.accent}}>AI</span></div>
        </div>
        <div>
          <div style={{fontSize:'42px',fontWeight:900,color:G.textPri,lineHeight:1.3,marginBottom:'20px'}}>
            اكتشف بيئة العمل<br/>التي ستزدهر فيها
          </div>
          <div style={{fontSize:'16px',color:G.textSec,lineHeight:1.8,marginBottom:'40px'}}>
            منصة التوافق الوظيفي الذكي — نربطك بالشركات التي تشاركك القيم والأسلوب والطموح
          </div>
          <div style={{display:'flex',gap:'32px'}}>
            {[{n:'+٥٠٠٠',l:'باحث عن عمل'},{n:'+٣٠٠',l:'شركة'},{n:'٩٤٪',l:'رضا المستخدمين'}].map(s=>(
              <div key={s.l}>
                <div style={{fontSize:'24px',fontWeight:900,color:G.accent}}>{s.n}</div>
                <div style={{fontSize:'12px',color:G.textHint,marginTop:'4px'}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{fontSize:'12px',color:G.textHint}}>© 2026 وصل AI — جميع الحقوق محفوظة</div>
      </div>

      {/* Right Panel — Form */}
      <div style={{width:'460px',flexShrink:0,padding:'60px 48px',display:'flex',flexDirection:'column',justifyContent:'center',overflow:'auto'}}>
        <div style={{marginBottom:'36px'}}>
          <div style={{fontSize:'28px',fontWeight:900,color:G.textPri,marginBottom:'8px'}}>
            {isLogin?'مرحباً بعودتك':'ابدأ رحلتك المهنية'}
          </div>
          <div style={{fontSize:'14px',color:G.textSec}}>
            {isLogin?'سجّل دخولك للمتابعة':'أنشئ حسابك مجاناً في دقيقة واحدة'}
          </div>
        </div>

        {/* Social Buttons */}
        <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'24px'}}>
          <button onClick={signInWithGoogle} style={{...btn('secondary',{padding:'13px 20px',display:'flex',alignItems:'center',justifyContent:'center',gap:'12px',width:'100%',fontSize:'14px'})}}>
            <svg width="18" height="18" viewBox="0 0 24 24" style={{flexShrink:0}}>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            متابعة مع Google
          </button>
          <button onClick={signInWithApple} style={{...btn('secondary',{padding:'13px 20px',display:'flex',alignItems:'center',justifyContent:'center',gap:'12px',width:'100%',fontSize:'14px'})}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill={G.textPri} style={{flexShrink:0}}>
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            متابعة مع Apple
          </button>
        </div>

        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
          <div style={{flex:1,height:'1px',background:G.border}}/>
          <span style={{fontSize:'12px',color:G.textHint,letterSpacing:'0.5px'}}>أو بالبريد الإلكتروني</span>
          <div style={{flex:1,height:'1px',background:G.border}}/>
        </div>

        {/* Tabs */}
        <div style={{display:'flex',gap:'4px',marginBottom:'20px',background:G.surface,padding:'4px',borderRadius:'12px',border:`1px solid ${G.border}`}}>
          {['تسجيل دخول','حساب جديد'].map((label,i)=>(
            <button key={i} onClick={()=>{setIsLogin(i===0);setAuthMsg('')}} style={{flex:1,padding:'10px',border:'none',borderRadius:'9px',fontWeight:700,fontSize:'13px',cursor:'pointer',fontFamily:FONT,transition:'all 0.2s',background:isLogin===(i===0)?G.card:'transparent',color:isLogin===(i===0)?G.textPri:G.textSec,boxShadow:isLogin===(i===0)?`0 1px 6px rgba(0,0,0,0.4),0 0 0 1px ${G.border}`:' none'}}>{label}</button>
          ))}
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          {!isLogin&&(
            <input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder='الاسم الكامل' style={{...inp,direction:'rtl'}}/>
          )}
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder='البريد الإلكتروني' type='email' style={{...inp,direction:'ltr'}}/>
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder='كلمة المرور (8 أحرف على الأقل)' type='password' style={{...inp,direction:'ltr'}}/>

          {!isLogin&&(
            <div>
              <div style={{fontSize:'12px',color:G.textHint,marginBottom:'10px',fontWeight:500}}>نوع الحساب</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
                {[{v:'candidate',l:'باحث عن عمل',icon:'👤',desc:'أبحث عن فرصة مناسبة'},{v:'company',l:'شركة',icon:'🏢',desc:'أبحث عن مواهب مناسبة'}].map(opt=>(
                  <button key={opt.v} onClick={()=>setRole(opt.v as any)} style={{padding:'14px 12px',borderRadius:'12px',border:`1.5px solid ${role===opt.v?G.accent:G.border}`,background:role===opt.v?G.accentGlow:G.surface,cursor:'pointer',textAlign:'right',fontFamily:FONT,transition:'all 0.2s'}}>
                    <div style={{fontSize:'18px',marginBottom:'6px'}}>{opt.icon}</div>
                    <div style={{fontSize:'13px',fontWeight:700,color:role===opt.v?G.accent:G.textPri,marginBottom:'2px'}}>{opt.l}</div>
                    <div style={{fontSize:'11px',color:G.textHint}}>{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {authMsg&&(
            <div style={{padding:'12px 16px',borderRadius:'10px',background:'rgba(248,113,113,0.08)',border:'1px solid rgba(248,113,113,0.2)',color:G.danger,fontSize:'13px',display:'flex',alignItems:'center',gap:'8px'}}>
              <span>⚠</span>{authMsg}
            </div>
          )}

          <button onClick={handleAuth} disabled={authLoading} style={{...btn('primary',{padding:'14px',fontSize:'15px',fontWeight:700,opacity:authLoading?0.7:1,width:'100%',borderRadius:'12px',letterSpacing:'-0.2px'})}}>
            {authLoading?'جاري التحقق...':isLogin?'تسجيل الدخول':'إنشاء الحساب مجاناً'}
          </button>

          {isLogin&&<div style={{textAlign:'center',fontSize:'13px',color:G.textHint}}>ليس لديك حساب؟ <button onClick={()=>setIsLogin(false)} style={{background:'none',border:'none',color:G.accent,cursor:'pointer',fontWeight:700,fontFamily:FONT,fontSize:'13px'}}>أنشئ حساباً</button></div>}
        </div>
      </div>
    </main>
  )

  // ─── ASSESSMENT ───
  if (page==='assessment') {
    if (assessDone) return (
      <main style={{minHeight:'100vh',background:G.bg,display:'flex',alignItems:'center',justifyContent:'center',direction:'rtl',padding:'24px'}}>
        <div className='fade-in' style={card({padding:'56px',maxWidth:'500px',width:'100%',textAlign:'center',border:`1px solid ${G.accent}30`})}>
          <div style={{width:'80px',height:'80px',borderRadius:'24px',background:G.accentGlow,border:`1px solid ${G.accent}40`,margin:'0 auto 24px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'36px'}}>🎯</div>
          <div style={{fontSize:'28px',fontWeight:900,color:G.textPri,marginBottom:'12px'}}>اكتمل تقييمك!</div>
          <div style={{color:G.textSec,marginBottom:'36px',lineHeight:1.8,fontSize:'15px'}}>تم تحليل شخصيتك المهنية بنجاح. الآن يمكنك اكتشاف الشركات الأكثر توافقاً معك.</div>
          <div style={{display:'flex',gap:'12px',justifyContent:'center'}}>
            <button onClick={()=>{setPage('matches');loadMatches()}} style={btn('primary',{padding:'13px 28px'})}>عرض التوافقات</button>
            <button onClick={()=>setPage('dashboard')} style={btn('secondary',{padding:'13px 28px'})}>لوحة التحكم</button>
          </div>
        </div>
      </main>
    )

    const q=QUESTIONS[currentQ]
    const prog=Math.round((currentQ/QUESTIONS.length)*100)

    return (
      <main style={{minHeight:'100vh',background:G.bg,direction:'rtl',padding:'24px'}}>
        <div style={{maxWidth:'640px',margin:'0 auto'}}>
          {/* Header */}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'40px',paddingTop:'16px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <div style={{width:'32px',height:'32px',borderRadius:'9px',background:G.accentGlow,border:`1px solid ${G.accent}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:900,color:G.accent}}>و</div>
              <span style={{fontSize:'16px',fontWeight:900,color:G.textPri}}>التقييم المهني</span>
            </div>
            <button onClick={()=>setPage('dashboard')} style={btn('ghost',{fontSize:'13px',color:G.textHint})}>إلغاء</button>
          </div>

          {/* Progress */}
          <div style={{marginBottom:'36px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
              <span style={{fontSize:'13px',color:G.textSec,fontWeight:500}}>السؤال {currentQ+1} من {QUESTIONS.length}</span>
              <span style={{fontSize:'13px',fontWeight:700,color:G.accent}}>{prog}%</span>
            </div>
            <div style={{background:G.border,borderRadius:'99px',height:'5px',overflow:'hidden'}}>
              <div style={{width:`${prog}%`,height:'100%',background:G.accent,borderRadius:'99px',transition:'width 0.4s cubic-bezier(0.4,0,0.2,1)'}}/>
            </div>
          </div>

          {/* Question Card */}
          <div className='fade-in' key={currentQ} style={card({padding:'40px',marginBottom:'20px'})}>
            <div style={{fontSize:'11px',fontWeight:700,color:G.accent,letterSpacing:'1.5px',marginBottom:'16px',textTransform:'uppercase'}}>{DIM_LABELS[q.dim]}</div>
            <div style={{fontSize:'20px',fontWeight:700,color:G.textPri,lineHeight:1.7,marginBottom:'32px'}}>{q.text}</div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {q.options.map((opt,i)=>(
                <button key={i} onClick={()=>{const na={...answers,[q.id]:i};setAnswers(na);setTimeout(()=>{if(currentQ<QUESTIONS.length-1)setCurrentQ(currentQ+1);else submitAssessment()},200)}}
                  style={{padding:'15px 20px',borderRadius:'12px',border:`1.5px solid ${answers[q.id]===i?G.accent:G.border}`,background:answers[q.id]===i?G.accentGlow:G.surface,cursor:'pointer',textAlign:'right',fontSize:'14px',fontWeight:answers[q.id]===i?700:400,color:answers[q.id]===i?G.accent:G.textSec,fontFamily:FONT,transition:'all 0.15s',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <span>{opt}</span>
                  {answers[q.id]===i&&<span style={{width:'18px',height:'18px',borderRadius:'50%',background:G.accent,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',color:'#001A0D',fontWeight:900,flexShrink:0}}>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {currentQ>0&&<button onClick={()=>setCurrentQ(currentQ-1)} style={btn('ghost',{fontSize:'13px',color:G.textHint})}>← السؤال السابق</button>}
        </div>
      </main>
    )
  }

  // ─── PROFILE ───
  if (page==='profile') return (
    <main style={{minHeight:'100vh',background:G.bg,direction:'rtl',padding:'24px'}}>
      <div style={{maxWidth:'720px',margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px',paddingTop:'16px'}}>
          <div>
            <div style={{fontSize:'22px',fontWeight:900,color:G.textPri}}>الملف المهني</div>
            <div style={{fontSize:'13px',color:G.textSec,marginTop:'4px'}}>كلما كان ملفك أكتمل، كانت التوافقات أدق</div>
          </div>
          <button onClick={()=>setPage('dashboard')} style={btn('secondary',{padding:'9px 20px',fontSize:'13px'})}>رجوع</button>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          {/* CV Upload */}
          <div style={card({padding:'24px'})}>
            <div style={{fontWeight:700,color:G.textPri,marginBottom:'4px',fontSize:'15px'}}>السيرة الذاتية</div>
            <div style={{fontSize:'12px',color:G.textHint,marginBottom:'16px'}}>ارفع ملف PDF — الحد الأقصى 5MB</div>
            <label style={{display:'flex',alignItems:'center',gap:'16px',padding:'18px',borderRadius:'12px',border:`2px dashed ${cvFile?G.accent:G.border}`,cursor:'pointer',background:cvFile?G.accentGlow:G.surface,transition:'all 0.2s'}}>
              <div style={{width:'44px',height:'44px',borderRadius:'12px',background:G.border,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>📎</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:'14px',color:cvFile?G.accent:G.textPri}}>{cvFile?cvFile.name:'اضغط لاختيار الملف'}</div>
                <div style={{fontSize:'12px',color:G.textHint,marginTop:'2px'}}>PDF فقط</div>
              </div>
              {cvFile&&<span style={{color:G.accent,fontWeight:700,fontSize:'13px'}}>✓</span>}
              <input type='file' accept='.pdf' style={{display:'none'}} onChange={e=>e.target.files&&setCvFile(e.target.files[0])}/>
            </label>
          </div>

          {/* Field */}
          <div style={card({padding:'24px'})}>
            <div style={{fontWeight:700,color:G.textPri,marginBottom:'16px',fontSize:'15px'}}>المجال والتخصص</div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              <select value={selField} onChange={e=>{setSelField(e.target.value);setSelSub('')}} style={{...inp}}>
                <option value=''>اختر المجال الوظيفي</option>
                {FIELDS.map(f=><option key={f.name} value={f.name}>{f.name}</option>)}
              </select>
              {selField&&<select value={selSub} onChange={e=>setSelSub(e.target.value)} style={{...inp}}>
                <option value=''>اختر التخصص الدقيق</option>
                {FIELDS.find(f=>f.name===selField)?.subs.map(s=><option key={s} value={s}>{s}</option>)}
              </select>}
              <select value={selTitle} onChange={e=>setSelTitle(e.target.value)} style={{...inp}}>
                <option value=''>المسمى الوظيفي</option>
                {JOB_TITLES.map(t=><option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Regions */}
          <div style={card({padding:'24px'})}>
            <div style={{fontWeight:700,color:G.textPri,marginBottom:'4px',fontSize:'15px'}}>المناطق المفضلة للعمل</div>
            <div style={{fontSize:'12px',color:G.textHint,marginBottom:'16px'}}>اختر كل المناطق التي تناسبك</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
              {REGIONS.map(r=>(
                <button key={r} onClick={()=>setSelRegions(p=>p.includes(r)?p.filter(x=>x!==r):[...p,r])} style={{padding:'7px 16px',borderRadius:'99px',border:`1px solid ${selRegions.includes(r)?G.accent:G.border}`,background:selRegions.includes(r)?G.accentGlow:G.surface,cursor:'pointer',fontSize:'13px',fontWeight:selRegions.includes(r)?700:400,color:selRegions.includes(r)?G.accent:G.textSec,fontFamily:FONT,transition:'all 0.15s'}}>{r}</button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div style={card({padding:'24px'})}>
            <div style={{fontWeight:700,color:G.textPri,marginBottom:'20px',fontSize:'15px'}}>التفاصيل المهنية</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
              {[{l:'المهارات',v:skills,s:setSkills,p:'React، Python، إدارة المشاريع',rows:2},{l:'اللغات',v:langs,s:setLangs,p:'العربية، الإنجليزية',rows:1},{l:'سنوات الخبرة',v:experience,s:setExperience,p:'مثال: 5 سنوات',rows:1},{l:'المؤهل التعليمي',v:education,s:setEducation,p:'بكالوريوس علوم حاسب',rows:1}].map(({l,v,s,p,rows})=>(
                <div key={l}>
                  <div style={{fontSize:'12px',fontWeight:700,color:G.textSec,marginBottom:'8px',letterSpacing:'0.3px'}}>{l}</div>
                  <textarea value={v} onChange={e=>s(e.target.value)} placeholder={p} rows={rows} style={{...inp,resize:'vertical'}}/>
                </div>
              ))}
            </div>
            <div style={{marginTop:'16px',display:'flex',flexDirection:'column',gap:'14px'}}>
              {[{l:'أبرز إنجاز',v:achievement,s:setAchievement,p:'اذكر إنجازاً مهنياً مميزاً يعكس قيمتك الحقيقية'},{l:'البيئة المثالية لك',v:idealEnv,s:setIdealEnv,p:'صف بيئة العمل التي تزدهر فيها وتعطي أفضل ما لديك'},{l:'ما لن تقبله أبداً',v:dealBreaker,s:setDealBreaker,p:'ما الذي يجعلك ترفض عرض العمل فوراً؟'}].map(({l,v,s,p})=>(
                <div key={l}>
                  <div style={{fontSize:'12px',fontWeight:700,color:G.textSec,marginBottom:'8px'}}>{l}</div>
                  <textarea value={v} onChange={e=>s(e.target.value)} placeholder={p} rows={2} style={{...inp,resize:'vertical'}}/>
                </div>
              ))}
            </div>
          </div>

          <button onClick={saveProfile} style={btn('primary',{padding:'14px',fontSize:'15px',borderRadius:'12px'})}>
            {saved?'✓ تم الحفظ بنجاح':'حفظ الملف المهني'}
          </button>
        </div>
      </div>
    </main>
  )

  // ─── HR ───
  if (page==='hr') {
    const filtered=candidates.filter(c=>(!filterField||c.field===filterField)&&(!filterStatus||c.hr_status===filterStatus))
    const statusStyle=(s:string):React.CSSProperties => ({
      padding:'4px 12px',borderRadius:'99px',fontSize:'12px',fontWeight:700,
      ...(s==='مقبول'?{background:'rgba(52,211,153,0.1)',color:G.success}:
          s==='مرفوض'?{background:'rgba(248,113,113,0.1)',color:G.danger}:
          s==='مقابلة'?{background:'rgba(96,165,250,0.1)',color:G.info}:
          {background:G.surface,color:G.textSec})
    })

    return (
      <main style={{minHeight:'100vh',background:G.bg,direction:'rtl',padding:'24px',position:'relative'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          {/* Header */}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'28px',paddingTop:'16px'}}>
            <div>
              <div style={{fontSize:'24px',fontWeight:900,color:G.textPri}}>لوحة الاستقطاب</div>
              <div style={{fontSize:'13px',color:G.textSec,marginTop:'4px'}}>{candidates.length} مرشح • مرتبون حسب نسبة التوافق</div>
            </div>
            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={loadCandidates} style={btn('primary',{padding:'10px 20px',fontSize:'13px'})}>تحديث</button>
              <button onClick={()=>setPage('dashboard')} style={btn('secondary',{padding:'10px 20px',fontSize:'13px'})}>رجوع</button>
            </div>
          </div>

          {/* Filters */}
          <div style={{display:'flex',gap:'12px',marginBottom:'20px'}}>
            {[{v:filterField,s:setFilterField,opts:FIELDS.map(f=>f.name),ph:'كل المجالات'},{v:filterStatus,s:setFilterStatus,opts:['جديد','قيد المراجعة','مقابلة','مقبول','مرفوض'],ph:'كل الحالات'}].map(({v,s,opts,ph},i)=>(
              <select key={i} value={v} onChange={e=>s(e.target.value)} style={{...inp,width:'auto',padding:'9px 16px',fontSize:'13px'}}>
                <option value=''>{ph}</option>
                {opts.map(o=><option key={o} value={o}>{o}</option>)}
              </select>
            ))}
          </div>

          {/* Table */}
          <div style={card({overflow:'hidden'})}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'14px'}}>
              <thead>
                <tr style={{borderBottom:`1px solid ${G.border}`,background:G.surface}}>
                  {['المرشح','المجال','المسمى الوظيفي','المنطقة','التوافق','الحالة',''].map(h=>(
                    <th key={h} style={{padding:'13px 18px',textAlign:'right',fontWeight:700,color:G.textHint,fontSize:'11px',letterSpacing:'0.5px'}}>{h.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hrLoading&&<tr><td colSpan={7} style={{padding:'60px',textAlign:'center',color:G.textHint}}>جاري التحميل...</td></tr>}
                {!hrLoading&&filtered.length===0&&<tr><td colSpan={7} style={{padding:'60px',textAlign:'center',color:G.textHint}}>لا يوجد مرشحون بعد</td></tr>}
                {!hrLoading&&filtered.map((c,i)=>(
                  <tr key={c.id} onClick={()=>setSelCandidate(c)}
                    style={{borderBottom:`1px solid ${G.border}`,cursor:'pointer',background:i%2===0?G.card:G.surface,transition:'background 0.15s'}}
                    onMouseEnter={e=>(e.currentTarget.style.background=G.cardHover)}
                    onMouseLeave={e=>(e.currentTarget.style.background=i%2===0?G.card:G.surface)}>
                    <td style={{padding:'15px 18px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                        <div style={{width:'36px',height:'36px',borderRadius:'10px',background:G.accentGlow,border:`1px solid ${G.accent}20`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:900,color:G.accent,flexShrink:0}}>
                          {(c.full_name||'م')[0]}
                        </div>
                        <div>
                          <div style={{fontWeight:700,color:G.textPri,fontSize:'14px'}}>{c.full_name||'مرشح'}</div>
                          <div style={{fontSize:'11px',color:G.textHint,marginTop:'2px'}}>{c.experience||'—'}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{padding:'15px 18px',color:G.textSec,fontSize:'13px'}}>{c.field||'—'}</td>
                    <td style={{padding:'15px 18px',fontSize:'13px',color:G.textSec}}>{c.job_title||'—'}</td>
                    <td style={{padding:'15px 18px',fontSize:'13px',color:G.textHint}}>{c.regions?JSON.parse(c.regions)[0]||'—':'—'}</td>
                    <td style={{padding:'15px 18px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                        <span style={{fontSize:'18px',fontWeight:900,color:matchColor(c.matchPct)}}>{c.matchPct}%</span>
                        <div style={{width:'48px',height:'4px',borderRadius:'99px',background:G.border,overflow:'hidden'}}>
                          <div style={{width:`${c.matchPct}%`,height:'100%',background:matchColor(c.matchPct),borderRadius:'99px'}}/>
                        </div>
                      </div>
                    </td>
                    <td style={{padding:'15px 18px'}}><span style={statusStyle(c.hr_status||'جديد')}>{c.hr_status||'جديد'}</span></td>
                    <td style={{padding:'15px 18px'}}><button onClick={e=>{e.stopPropagation();setSelCandidate(c)}} style={btn('secondary',{padding:'7px 14px',fontSize:'12px'})}>تفاصيل</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Panel */}
        {selCandidate&&(
          <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:G.overlay,zIndex:300,display:'flex',justifyContent:'flex-start'}} onClick={()=>setSelCandidate(null)}>
            <div className='slide-in' style={{width:'460px',height:'100%',background:G.surface,overflowY:'auto',padding:'32px',borderLeft:`1px solid ${G.borderMid}`,boxShadow:'20px 0 80px rgba(0,0,0,0.8)'}} onClick={e=>e.stopPropagation()}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'28px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
                  <div style={{width:'48px',height:'48px',borderRadius:'14px',background:G.accentGlow,border:`1px solid ${G.accent}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',fontWeight:900,color:G.accent}}>
                    {(selCandidate.full_name||'م')[0]}
                  </div>
                  <div>
                    <div style={{fontWeight:900,fontSize:'18px',color:G.textPri}}>{selCandidate.full_name||'مرشح'}</div>
                    <div style={{fontSize:'12px',color:G.textSec,marginTop:'2px'}}>{selCandidate.job_title||selCandidate.field||'—'}</div>
                  </div>
                </div>
                <button onClick={()=>setSelCandidate(null)} style={{background:G.card,border:`1px solid ${G.border}`,width:'32px',height:'32px',borderRadius:'8px',cursor:'pointer',fontSize:'16px',color:G.textSec,display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
              </div>

              {/* Match Score */}
              <div style={{...card({padding:'24px',marginBottom:'20px',background:G.card,textAlign:'center'}),border:`1px solid ${selCandidate.matchPct>=80?G.accent+'40':G.border}`}}>
                <div style={{fontSize:'56px',fontWeight:900,color:matchColor(selCandidate.matchPct),lineHeight:1}}>{selCandidate.matchPct}%</div>
                <div style={{fontSize:'13px',color:G.textSec,marginTop:'8px'}}>نسبة التوافق مع شركتك</div>
              </div>

              {/* Dimensions */}
              {selCandidate.scores&&(
                <div style={{marginBottom:'20px'}}>
                  <div style={{fontWeight:700,marginBottom:'14px',fontSize:'13px',color:G.textSec,letterSpacing:'0.5px'}}>الأبعاد المهنية</div>
                  {Object.entries(JSON.parse(selCandidate.scores)).map(([dim,val]:any)=>(
                    <div key={dim} style={{marginBottom:'12px'}}>
                      <div style={{display:'flex',justifyContent:'space-between',fontSize:'13px',marginBottom:'6px'}}>
                        <span style={{color:G.textSec}}>{DIM_LABELS[dim]||dim}</span>
                        <span style={{fontWeight:700,color:DIM_COLORS[dim]||G.accent}}>{val}%</span>
                      </div>
                      <div style={{background:G.border,borderRadius:'99px',height:'5px',overflow:'hidden'}}>
                        <div style={{width:`${val}%`,height:'100%',background:DIM_COLORS[dim]||G.accent,borderRadius:'99px'}}/>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Details */}
              <div style={{marginBottom:'20px',display:'flex',flexDirection:'column',gap:'8px'}}>
                {[{l:'المجال',v:selCandidate.field},{l:'التخصص',v:selCandidate.sub_field},{l:'الخبرة',v:selCandidate.experience},{l:'التعليم',v:selCandidate.education},{l:'المهارات',v:selCandidate.skills},{l:'اللغات',v:selCandidate.languages},{l:'أبرز إنجاز',v:selCandidate.achievement},{l:'البيئة المثالية',v:selCandidate.ideal_env},{l:'لن يقبله أبداً',v:selCandidate.deal_breaker}].filter(d=>d.v).map(({l,v})=>(
                  <div key={l} style={{padding:'12px 16px',background:G.card,borderRadius:'10px',border:`1px solid ${G.border}`}}>
                    <div style={{fontSize:'10px',fontWeight:700,color:G.textHint,marginBottom:'4px',letterSpacing:'0.5px'}}>{l.toUpperCase()}</div>
                    <div style={{fontSize:'13px',color:G.textSec,lineHeight:1.6}}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Status */}
              <div style={{marginBottom:'20px'}}>
                <div style={{fontWeight:700,marginBottom:'12px',fontSize:'13px',color:G.textSec,letterSpacing:'0.5px'}}>تغيير الحالة</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
                  {['جديد','قيد المراجعة','مقابلة','مقبول','مرفوض'].map(s=>(
                    <button key={s} onClick={()=>updateStatus(selCandidate.id,s)} style={{padding:'7px 14px',borderRadius:'99px',border:`1px solid ${selCandidate.hr_status===s?G.accent:G.border}`,background:selCandidate.hr_status===s?G.accentGlow:G.card,cursor:'pointer',fontSize:'12px',fontWeight:700,fontFamily:FONT,color:selCandidate.hr_status===s?G.accent:G.textSec,transition:'all 0.15s'}}>{s}</button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                <button style={btn('primary',{padding:'13px',fontSize:'14px'})}>تواصل مع المرشح</button>
                <button style={btn('secondary',{padding:'13px',fontSize:'14px'})}>جدولة مقابلة</button>
                <button onClick={()=>updateStatus(selCandidate.id,'مرفوض')} style={btn('danger',{padding:'13px',fontSize:'14px'})}>رفض المرشح</button>
              </div>
            </div>
          </div>
        )}
      </main>
    )
  }

  // ─── MATCHES ───
  if (page==='matches') return (
    <main style={{minHeight:'100vh',background:G.bg,direction:'rtl',padding:'24px'}}>
      <div style={{maxWidth:'800px',margin:'0 auto',paddingTop:'16px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px'}}>
          <div>
            <div style={{fontSize:'24px',fontWeight:900,color:G.textPri}}>توافقاتك المهنية</div>
            <div style={{fontSize:'13px',color:G.textSec,marginTop:'4px'}}>الشركات الأكثر توافقاً مع شخصيتك وأسلوبك في العمل</div>
          </div>
          <button onClick={()=>setPage('dashboard')} style={btn('secondary',{padding:'9px 20px',fontSize:'13px'})}>رجوع</button>
        </div>
        {matches.length===0?(
          <div style={card({padding:'72px',textAlign:'center'})}>
            <div style={{fontSize:'48px',marginBottom:'16px',opacity:0.5}}>🔍</div>
            <div style={{fontWeight:700,color:G.textPri,marginBottom:'8px'}}>لا توجد شركات بعد</div>
            <div style={{color:G.textHint,fontSize:'14px'}}>ستظهر هنا الشركات عند تسجيلها في المنصة</div>
          </div>
        ):matches.map((c,i)=>(
          <div key={c.id} className='fade-in' style={{...card({padding:'24px',marginBottom:'12px',display:'flex',alignItems:'center',gap:'20px'}),animationDelay:`${i*0.05}s`}}>
            <div style={{width:'52px',height:'52px',borderRadius:'14px',background:G.accentGlow,border:`1px solid ${G.accent}20`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',flexShrink:0}}>🏢</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:800,fontSize:'16px',color:G.textPri,marginBottom:'4px'}}>{c.full_name||'شركة'}</div>
              <div style={{fontSize:'13px',color:G.textSec}}>{c.assessment_done?'✓ أكملت التقييم المهني':'لم تكمل التقييم بعد'}</div>
            </div>
            <div style={{textAlign:'center',flexShrink:0}}>
              <div style={{fontSize:'32px',fontWeight:900,color:matchColor(c.matchPct),lineHeight:1}}>{c.matchPct}%</div>
              <div style={{fontSize:'11px',color:G.textHint,margin:'4px 0 12px'}}>توافق</div>
              <button style={btn('primary',{padding:'8px 20px',fontSize:'12px'})}>تقدم الآن</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )

  // ─── DASHBOARD ───
  const myScores = profile?.scores?JSON.parse(profile.scores):null

  return (
    <main style={{minHeight:'100vh',background:G.bg,direction:'rtl',padding:'24px'}}>
      <div style={{maxWidth:'860px',margin:'0 auto',paddingTop:'16px'}}>

        {/* Nav */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'36px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
            <div style={{width:'40px',height:'40px',borderRadius:'12px',background:G.accentGlow,border:`1px solid ${G.accent}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',fontWeight:900,color:G.accent}}>
              {(profile?.full_name||user?.email||'م')[0]}
            </div>
            <div>
              <div style={{fontSize:'16px',fontWeight:700,color:G.textPri}}>{profile?.full_name||'مرحباً'}</div>
              <div style={{fontSize:'12px',color:G.textSec}}>{isCompany?'حساب شركة':'باحث عن عمل'}</div>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <div style={{fontSize:'20px',fontWeight:900,color:G.textPri}}>وصل <span style={{color:G.accent}}>AI</span></div>
            <div style={{width:'1px',height:'24px',background:G.border}}/>
            <button onClick={handleSignOut} style={btn('ghost',{fontSize:'13px',color:G.textSec,padding:'8px 12px'})}>خروج</button>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'24px'}}>
          {[
            {l:'التقييم',v:profile?.assessment_done?'مكتمل':'لم يبدأ',dot:profile?.assessment_done?G.success:G.textHint},
            {l:'التوافقات',v:'—',dot:G.info},
            {l:'الطلبات المرسلة',v:'0',dot:G.warning},
            {l:'المشاهدات',v:'0',dot:G.textHint},
          ].map((s,i)=>(
            <div key={i} style={card({padding:'18px'})}>
              <div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'10px'}}>
                <div style={{width:'6px',height:'6px',borderRadius:'50%',background:s.dot}}/>
                <div style={{fontSize:'11px',color:G.textHint,letterSpacing:'0.3px'}}>{s.l}</div>
              </div>
              <div style={{fontSize:'18px',fontWeight:900,color:s.v==='مكتمل'?G.success:G.textPri}}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* Scores */}
        {myScores&&(
          <div style={card({padding:'28px',marginBottom:'20px'})}>
            <div style={{fontWeight:700,marginBottom:'20px',fontSize:'15px',color:G.textPri,display:'flex',alignItems:'center',gap:'8px'}}>
              <span style={{width:'24px',height:'24px',borderRadius:'6px',background:G.accentGlow,display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:'12px'}}>📊</span>
              شخصيتك المهنية
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'18px'}}>
              {Object.entries(myScores).map(([dim,val]:any)=>(
                <div key={dim}>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:'13px',marginBottom:'7px'}}>
                    <span style={{color:G.textSec}}>{DIM_LABELS[dim]||dim}</span>
                    <span style={{fontWeight:700,color:DIM_COLORS[dim]||G.accent,fontSize:'14px'}}>{val}%</span>
                  </div>
                  <div style={{background:G.border,borderRadius:'99px',height:'5px',overflow:'hidden'}}>
                    <div style={{width:`${val}%`,height:'100%',background:DIM_COLORS[dim]||G.accent,borderRadius:'99px',transition:'width 1s ease'}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Cards */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'14px'}}>
          {!profile?.assessment_done&&(
            <div style={card({padding:'32px',gridColumn:'1/-1',border:`1px solid ${G.accent}20`,background:`linear-gradient(135deg,${G.card} 0%,rgba(0,220,130,0.03) 100%)`})}>
              <div style={{display:'flex',alignItems:'flex-start',gap:'20px'}}>
                <div style={{width:'56px',height:'56px',borderRadius:'16px',background:G.accentGlow,border:`1px solid ${G.accent}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px',flexShrink:0}}>🧭</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:'18px',fontWeight:900,color:G.textPri,marginBottom:'8px'}}>ابدأ تقييمك المهني</div>
                  <div style={{fontSize:'14px',color:G.textSec,lineHeight:1.8,marginBottom:'20px'}}>18 سؤالاً دقيقاً يكشفان شخصيتك المهنية ويوصلانك بالبيئة التي ستزدهر فيها. يستغرق 12 دقيقة فقط.</div>
                  <button onClick={()=>{setCurrentQ(0);setAnswers({});setAssessDone(false);setPage('assessment')}} style={btn('primary',{padding:'13px 28px',fontSize:'14px'})}>
                    ابدأ التقييم الآن ←
                  </button>
                </div>
              </div>
            </div>
          )}

          {!isCompany&&(
            <div style={card({padding:'28px'})}>
              <div style={{fontSize:'24px',marginBottom:'14px'}}>👤</div>
              <div style={{fontWeight:800,color:G.textPri,marginBottom:'6px',fontSize:'16px'}}>الملف المهني</div>
              <div style={{fontSize:'13px',color:G.textSec,marginBottom:'20px',lineHeight:1.7}}>أكمل بياناتك لتحسين دقة التوافق وزيادة فرصك</div>
              <button onClick={()=>setPage('profile')} style={btn('secondary',{padding:'10px 22px',fontSize:'13px'})}>تعديل الملف</button>
            </div>
          )}

          {profile?.assessment_done&&(isCompany?(
            <div style={card({padding:'28px',border:`1px solid ${G.accent}15`})}>
              <div style={{fontSize:'24px',marginBottom:'14px'}}>👥</div>
              <div style={{fontWeight:800,color:G.textPri,marginBottom:'6px',fontSize:'16px'}}>لوحة الاستقطاب</div>
              <div style={{fontSize:'13px',color:G.textSec,marginBottom:'20px',lineHeight:1.7}}>عرض المرشحين مرتبين حسب توافقهم مع ثقافة شركتك</div>
              <button onClick={()=>{setPage('hr');loadCandidates()}} style={btn('primary',{padding:'10px 22px',fontSize:'13px'})}>فتح اللوحة</button>
            </div>
          ):(
            <div style={card({padding:'28px',border:`1px solid ${G.accent}15`})}>
              <div style={{fontSize:'24px',marginBottom:'14px'}}>🎯</div>
              <div style={{fontWeight:800,color:G.textPri,marginBottom:'6px',fontSize:'16px'}}>توافقاتك المهنية</div>
              <div style={{fontSize:'13px',color:G.textSec,marginBottom:'20px',lineHeight:1.7}}>اكتشف الشركات التي تشاركك القيم والأسلوب والطموح</div>
              <button onClick={()=>{setPage('matches');loadMatches()}} style={btn('primary',{padding:'10px 22px',fontSize:'13px'})}>عرض التوافقات</button>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
