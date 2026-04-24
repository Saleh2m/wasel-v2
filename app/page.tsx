'use client'
import { useState, useEffect } from 'react'
import { supabase } from './supabase'

const T = {
  ar: {
    appName:'وصل AI', tagline:'منصة التوافق الوظيفي الذكي',
    heroTitle:'اكتشف بيئة العمل\nالتي ستزدهر فيها',
    heroDesc:'نربطك بالشركات التي تشاركك القيم والأسلوب والطموح',
    stats:['+٥٠٠٠ باحث','+٣٠٠ شركة','٩٤٪ رضا'],
    signIn:'تسجيل دخول', signUp:'حساب جديد',
    email:'البريد الإلكتروني', password:'كلمة المرور', fullName:'الاسم الكامل',
    continueGoogle:'متابعة مع Google', continueApple:'متابعة مع Apple',
    orEmail:'أو بالبريد الإلكتروني',
    candidate:'باحث عن عمل', company:'شركة',
    candidateDesc:'أبحث عن فرصة مناسبة', companyDesc:'أبحث عن مواهب مناسبة',
    loginBtn:'تسجيل الدخول', signupBtn:'إنشاء الحساب مجاناً',
    noAccount:'ليس لديك حساب؟', createAccount:'أنشئ حساباً', loading:'جاري التحقق...',
    roleSelectTitle:'اختر نوع حسابك', roleSelectDesc:'سيحدد هذا الاختيار لوحة التحكم والميزات المتاحة لك',
    continueBtn:'متابعة ←',
    dashboard:'لوحة التحكم', signOut:'خروج',
    assessment:'التقييم', matches:'التوافقات', requests:'الطلبات', views:'المشاهدات',
    completed:'مكتمل', notStarted:'لم يبدأ',
    professionalProfile:'شخصيتك المهنية',
    startAssessment:'ابدأ تقييمك المهني',
    startAssessmentDesc:'18 سؤالاً دقيقاً يكشفان شخصيتك المهنية. يستغرق 12 دقيقة فقط.',
    startNow:'ابدأ التقييم الآن ←',
    profile:'الملف المهني', editProfile:'تعديل الملف',
    profileDesc:'أكمل بياناتك لتحسين دقة التوافق',
    hrBoard:'لوحة الاستقطاب', openBoard:'فتح اللوحة',
    hrBoardDesc:'المرشحون مرتبون حسب توافقهم مع ثقافة شركتك',
    myMatches:'توافقاتك المهنية', viewMatches:'عرض التوافقات',
    matchesDesc:'اكتشف الشركات التي تشاركك القيم والأسلوب',
    assessmentTitle:'التقييم المهني', cancel:'إلغاء', prev:'← السابق',
    questionOf:(c:number,t:number)=>`السؤال ${c} من ${t}`,
    assessDoneTitle:'اكتمل تقييمك!',
    assessDoneDesc:'تم تحليل شخصيتك المهنية بنجاح.',
    viewMatches2:'عرض التوافقات', backDash:'لوحة التحكم',
    profileTitle:'الملف المهني', profileSub:'كلما كان ملفك أكتمل، كانت التوافقات أدق',
    back:'رجوع', saveProfile:'حفظ الملف المهني', savedProfile:'✓ تم الحفظ',
    cvUpload:'السيرة الذاتية', cvDesc:'ارفع ملف PDF — الحد الأقصى 5MB',
    clickUpload:'اضغط لاختيار الملف', pdfOnly:'PDF فقط',
    fieldTitle:'المجال والتخصص', selectField:'اختر المجال', selectSub:'اختر التخصص', selectTitle:'المسمى الوظيفي',
    regionsTitle:'المناطق المفضلة', regionsDesc:'اختر المناطق التي تناسبك',
    detailsTitle:'التفاصيل المهنية',
    skills:'المهارات', skillsPh:'React، Python، إدارة المشاريع',
    langs:'اللغات', langsPh:'العربية، الإنجليزية',
    exp:'سنوات الخبرة', expPh:'مثال: 5 سنوات',
    edu:'المؤهل التعليمي', eduPh:'بكالوريوس علوم حاسب',
    achieve:'أبرز إنجاز', achievePh:'اذكر إنجازاً مهنياً مميزاً',
    ideal:'البيئة المثالية', idealPh:'صف بيئة العمل التي تزدهر فيها',
    dealBreaker:'ما لن تقبله أبداً', dealBreakerPh:'ما الذي يجعلك ترفض الوظيفة؟',
    hrTitle:'لوحة الاستقطاب', hrSub:(n:number)=>`${n} مرشح`,
    refresh:'تحديث', allFields:'كل المجالات', allStatus:'كل الحالات',
    colCandidate:'المرشح', colField:'المجال', colTitle2:'المسمى', colRegion:'المنطقة',
    colMatch:'التوافق', colStatus:'الحالة', details:'تفاصيل',
    loadingData:'جاري التحميل...', noCandidates:'لا يوجد مرشحون بعد',
    matchScore:'نسبة التوافق', dimTitle:'الأبعاد المهنية', changeStatus:'تغيير الحالة',
    contact:'تواصل', schedule:'جدولة مقابلة', reject:'رفض',
    statuses:['جديد','قيد المراجعة','مقابلة','مقبول','مرفوض'],
    matchesTitle:'توافقاتك المهنية', matchesSub:'الشركات الأكثر توافقاً',
    noMatches:'لا توجد شركات بعد', noMatchesDesc:'ستظهر هنا الشركات عند تسجيلها',
    matchDone:'✓ أكملت التقييم', matchNotDone:'لم تكمل التقييم',
    compatibility:'توافق', applyNow:'تقدم الآن',
    colSubField:'التخصص', colExp:'الخبرة', colEdu:'التعليم',
    colSkills:'المهارات', colLangs:'اللغات', colAchieve:'أبرز إنجاز',
    colIdeal:'البيئة المثالية', colDeal:'لن يقبله أبداً',
    accountType:'نوع الحساب',
    dimLabels:{work_style:'أسلوب العمل',decision:'اتخاذ القرار',culture:'الثقافة',motivation:'الدوافع',leadership:'القيادة'},
  },
  en: {
    appName:'Wasel AI', tagline:'Smart Career Matching Platform',
    heroTitle:'Discover the work environment\nwhere you thrive',
    heroDesc:'We connect you with companies sharing your values and ambition',
    stats:['+5000 Seekers','+300 Companies','94% Satisfaction'],
    signIn:'Sign In', signUp:'New Account',
    email:'Email Address', password:'Password', fullName:'Full Name',
    continueGoogle:'Continue with Google', continueApple:'Continue with Apple',
    orEmail:'Or with email',
    candidate:'Job Seeker', company:'Company',
    candidateDesc:'Looking for the right opportunity', companyDesc:'Looking for the right talent',
    loginBtn:'Sign In', signupBtn:'Create Free Account',
    noAccount:"Don't have an account?", createAccount:'Create one', loading:'Verifying...',
    roleSelectTitle:'Choose your account type', roleSelectDesc:'This determines your dashboard and available features',
    continueBtn:'Continue →',
    dashboard:'Dashboard', signOut:'Sign Out',
    assessment:'Assessment', matches:'Matches', requests:'Requests', views:'Views',
    completed:'Completed', notStarted:'Not Started',
    professionalProfile:'Your Professional Profile',
    startAssessment:'Start Your Professional Assessment',
    startAssessmentDesc:'18 precise questions revealing your professional personality. Takes only 12 minutes.',
    startNow:'Start Assessment Now →',
    profile:'Professional Profile', editProfile:'Edit Profile',
    profileDesc:'Complete your profile to improve match accuracy',
    hrBoard:'Recruitment Board', openBoard:'Open Board',
    hrBoardDesc:'Candidates ranked by compatibility with your company culture',
    myMatches:'Your Professional Matches', viewMatches:'View Matches',
    matchesDesc:'Discover companies sharing your values and style',
    assessmentTitle:'Professional Assessment', cancel:'Cancel', prev:'← Previous',
    questionOf:(c:number,t:number)=>`Question ${c} of ${t}`,
    assessDoneTitle:'Assessment Complete!',
    assessDoneDesc:'Your professional personality has been successfully analyzed.',
    viewMatches2:'View Matches', backDash:'Dashboard',
    profileTitle:'Professional Profile', profileSub:'The more complete your profile, the better your matches',
    back:'Back', saveProfile:'Save Profile', savedProfile:'✓ Saved',
    cvUpload:'Resume / CV', cvDesc:'Upload PDF — Max 5MB',
    clickUpload:'Click to choose file', pdfOnly:'PDF only',
    fieldTitle:'Field & Specialization', selectField:'Select field', selectSub:'Select specialization', selectTitle:'Job Title',
    regionsTitle:'Preferred Regions', regionsDesc:'Select regions that work for you',
    detailsTitle:'Professional Details',
    skills:'Skills', skillsPh:'React, Python, Project Management',
    langs:'Languages', langsPh:'Arabic, English',
    exp:'Years of Experience', expPh:'e.g. 5 years',
    edu:'Education', eduPh:"Bachelor's in Computer Science",
    achieve:'Top Achievement', achievePh:'Share an achievement reflecting your value',
    ideal:'Ideal Environment', idealPh:'Describe where you thrive',
    dealBreaker:'Deal Breaker', dealBreakerPh:'What makes you reject an offer instantly?',
    hrTitle:'Recruitment Board', hrSub:(n:number)=>`${n} candidates`,
    refresh:'Refresh', allFields:'All Fields', allStatus:'All Statuses',
    colCandidate:'Candidate', colField:'Field', colTitle2:'Title', colRegion:'Region',
    colMatch:'Match', colStatus:'Status', details:'Details',
    loadingData:'Loading...', noCandidates:'No candidates yet',
    matchScore:'Match score', dimTitle:'Professional Dimensions', changeStatus:'Change Status',
    contact:'Contact', schedule:'Schedule Interview', reject:'Reject',
    statuses:['New','Under Review','Interview','Accepted','Rejected'],
    matchesTitle:'Your Professional Matches', matchesSub:'Most compatible companies',
    noMatches:'No companies yet', noMatchesDesc:'Companies will appear here once registered',
    matchDone:'✓ Assessment done', matchNotDone:'Assessment not done',
    compatibility:'match', applyNow:'Apply Now',
    colSubField:'Specialization', colExp:'Experience', colEdu:'Education',
    colSkills:'Skills', colLangs:'Languages', colAchieve:'Top Achievement',
    colIdeal:'Ideal Environment', colDeal:'Deal Breaker',
    accountType:'Account Type',
    dimLabels:{work_style:'Work Style',decision:'Decision Making',culture:'Culture',motivation:'Motivation',leadership:'Leadership'},
  }
}

const REGIONS_AR=['الرياض','جدة','مكة المكرمة','المدينة المنورة','الدمام','الخبر','الأحساء','تبوك','أبها','القصيم','حائل','جازان','نجران','الباحة','الجوف','عرعر','سكاكا','ينبع','القطيف','الطائف']
const REGIONS_EN=['Riyadh','Jeddah','Mecca','Medina','Dammam','Khobar','Ahsa','Tabuk','Abha','Qassim','Hail','Jazan','Najran','Baha','Jouf','Arar','Sakaka','Yanbu','Qatif','Taif']
const FIELDS_AR=[{name:'تقنية المعلومات',subs:['هندسة البرمجيات','علوم البيانات','الذكاء الاصطناعي','الأمن السيبراني','تطوير الويب','DevOps','الحوسبة السحابية']},{name:'المالية والمحاسبة',subs:['المحاسبة العامة','التحليل المالي','إدارة المخاطر','التمويل الإسلامي']},{name:'الموارد البشرية',subs:['التوظيف والاستقطاب','التدريب والتطوير','إدارة الأداء']},{name:'التسويق والمبيعات',subs:['التسويق الرقمي','إدارة المبيعات','تسويق المحتوى']},{name:'الهندسة',subs:['الهندسة المدنية','الهندسة الكهربائية','الهندسة الميكانيكية']},{name:'الصحة والطب',subs:['الطب العام','التمريض','الصيدلة']},{name:'التعليم',subs:['التدريس','الإدارة التعليمية','التعليم الإلكتروني']},{name:'القانون',subs:['المحاماة','الاستشارات القانونية','قانون الأعمال']}]
const FIELDS_EN=[{name:'Information Technology',subs:['Software Engineering','Data Science','AI','Cybersecurity','Web Development','DevOps','Cloud Computing']},{name:'Finance & Accounting',subs:['Accounting','Financial Analysis','Risk Management','Islamic Finance']},{name:'Human Resources',subs:['Recruitment','Training & Development','Performance Management']},{name:'Marketing & Sales',subs:['Digital Marketing','Sales Management','Content Marketing']},{name:'Engineering',subs:['Civil Engineering','Electrical Engineering','Mechanical Engineering']},{name:'Healthcare',subs:['General Medicine','Nursing','Pharmacy']},{name:'Education',subs:['Teaching','Educational Administration','E-Learning']},{name:'Law',subs:['Legal Practice','Legal Consulting','Business Law']}]
const TITLES_AR=['مطور برمجيات','محلل بيانات','مهندس ذكاء اصطناعي','مدير مشروع','محاسب قانوني','محلل مالي','مدير موارد بشرية','مسوق رقمي','مهندس مدني','طبيب عام','ممرض','صيدلاني','مدرس','محامي','مدير مبيعات','مطور تطبيقات','مصمم UX/UI','مدير عمليات','مستشار أعمال','مدير عام']
const TITLES_EN=['Software Developer','Data Analyst','AI Engineer','Project Manager','CPA','Financial Analyst','HR Manager','Digital Marketer','Civil Engineer','Physician','Nurse','Pharmacist','Teacher','Lawyer','Sales Manager','App Developer','UX/UI Designer','Operations Manager','Business Consultant','CEO']
const QUESTIONS_AR=[{id:1,dim:'work_style',text:'عندما تبدأ مشروعاً جديداً، ما أول شيء تفعله؟',options:['أضع خطة تفصيلية قبل أي خطوة','أبدأ بخطوات صغيرة وأعدّل في الطريق','أتحدث مع الفريق لفهم التوقعات','أبحث عن أمثلة ناجحة مشابهة']},{id:2,dim:'decision',text:'عند مواجهة قرار صعب بمعلومات ناقصة — ماذا تفعل؟',options:['أنتظر حتى تكتمل المعلومات','أتخذ القرار بأفضل المعلومات المتاحة','أستشير المعنيين أولاً','أقدم خيارات متعددة للمسؤول']},{id:3,dim:'culture',text:'ما بيئة العمل التي تجعلك أكثر إنتاجية؟',options:['بيئة منظمة بأدوار واضحة','بيئة مرنة تشجع على الإبداع','بيئة تعاونية كفريق واحد','بيئة تنافسية تكافئ التميز']},{id:4,dim:'motivation',text:'ما الذي يشعرك بأكبر قدر من الرضا في العمل؟',options:['حل مشكلة معقدة لم يحلها أحد','قيادة فريق لتحقيق هدف صعب','بناء شيء من الصفر يراه الناس','التطور المهني والتعلم المستمر']},{id:5,dim:'work_style',text:'كيف تتعامل مع مهام متعددة في نفس الوقت؟',options:['أكمل مهمة واحدة تماماً قبل التالية','أوزّع وقتي بين المهام بالتوازي','أفوّض ما أستطيع وأركز على الأهم','أرتّب حسب الأولوية والموعد النهائي']},{id:6,dim:'leadership',text:'في العمل الجماعي، ما دورك الطبيعي؟',options:['أقود وأحدد الاتجاه','أنفّذ وأضمن الجودة','أنسّق وأحل الخلافات','أبتكر وأطرح أفكاراً جديدة']},{id:7,dim:'culture',text:'كيف تفضّل تلقّي التغذية الراجعة؟',options:['مباشرة وصريحة في الوقت الفوري','مكتوبة ومفصّلة بعد تفكير','في اجتماع دوري منظم','بشكل غير رسمي في المحادثة اليومية']},{id:8,dim:'decision',text:'ما أسلوبك عند الخلاف مع زميل على قرار؟',options:['أقدم بيانات وحجج منطقية','أبحث عن حل وسط','أحيل الأمر للمدير','أتبنى رأيه إذا كان أكثر خبرة']},{id:9,dim:'motivation',text:'ماذا تعني لك الترقية المهنية؟',options:['مسؤولية أكبر وتأثير أوسع','راتب أعلى واعتراف بالجهد','فرصة لتطوير مهارات جديدة','قيادة فريق خاص بي']},{id:10,dim:'work_style',text:'كيف تتعامل مع المواعيد النهائية الضيقة؟',options:['أعمل إضافياً حتى أنجز العمل','أخفّض جودة ما يمكن تخفيضه','أتفاوض على تمديد الموعد','أطلب مساعدة الفريق فوراً']},{id:11,dim:'culture',text:'ما مدى أهمية العلاقات الاجتماعية مع الزملاء؟',options:['ضرورية — الفريق كالعائلة','مهمة لكنها تبقى مهنية','ثانوية — العمل هو الأولوية','تعتمد على شخصية الزميل']},{id:12,dim:'leadership',text:'كيف تتعامل مع زميل ضعيف الأداء؟',options:['أتحدث معه مباشرة وأضع خطة تحسين','أعطيه مهاماً تناسب قدراته','أُبلّغ مديري','أساعده شخصياً حتى يتحسن']},{id:13,dim:'motivation',text:'ما الذي يجعلك تبقى في وظيفة لأكثر من 3 سنوات؟',options:['مشاريع متجددة ومتحديات مستمرة','فريق عمل رائع','راتب تنافسي وامتيازات جيدة','مسار واضح للنمو']},{id:14,dim:'decision',text:'كيف تتعامل مع المخاطر المهنية؟',options:['أدرسها بعمق قبل أي قرار','أقبلها إذا كان المكسب يستحق','أتجنبها قدر الإمكان','أشارك المخاطرة مع الفريق']},{id:15,dim:'work_style',text:'ما أسلوبك في التعلم؟',options:['دورات منظمة وشهادات معتمدة','تعلم ذاتي من مصادر متنوعة','التعلم بالتجربة','التعلم من المرشدين']},{id:16,dim:'culture',text:'ما رأيك في العمل عن بُعد؟',options:['أفضّله بالكامل','أفضّل الهجين','أفضّل المكتب','لا يهمني المكان']},{id:17,dim:'leadership',text:'ما أسلوب القيادة الذي تعمل بشكل أفضل تحته؟',options:['توجيهية بتعليمات واضحة','تفويضية بالاستقلالية','تشاركية مع الفريق','تدريبية تركز على التطوير']},{id:18,dim:'motivation',text:'كيف تعرّف النجاح المهني لنفسك؟',options:['تحقيق أهداف ملموسة','التأثير الإيجابي على الآخرين','الوصول لمنصب قيادي','التوازن بين العمل والحياة']}]
const QUESTIONS_EN=[{id:1,dim:'work_style',text:'When starting a new project, what is the first thing you do?',options:['Create a detailed plan','Start small and adjust','Talk to the team first','Research similar examples']},{id:2,dim:'decision',text:'Facing a tough decision with incomplete info, what do you do?',options:['Wait for complete information','Decide with best available info','Consult stakeholders first','Present options to management']},{id:3,dim:'culture',text:'What work environment makes you most productive?',options:['Organized with clear roles','Flexible and creative','Collaborative team environment','Competitive and merit-based']},{id:4,dim:'motivation',text:'What gives you the most satisfaction at work?',options:['Solving complex problems','Leading a team to success','Building something from scratch','Continuous professional growth']},{id:5,dim:'work_style',text:'How do you handle multiple tasks simultaneously?',options:['Complete one task before the next','Distribute time in parallel','Delegate and focus on priority','Prioritize by deadline']},{id:6,dim:'leadership',text:'In team settings, what is your natural role?',options:['Lead and set direction','Execute and ensure quality','Coordinate and resolve conflicts','Innovate and propose ideas']},{id:7,dim:'culture',text:'How do you prefer to receive feedback?',options:['Direct and immediate','Written and detailed','In periodic meetings','Informally in conversation']},{id:8,dim:'decision',text:'How do you handle disagreements with a colleague?',options:['Present data and arguments','Find a compromise','Refer to management','Adopt their view if more experienced']},{id:9,dim:'motivation',text:'What does a promotion mean to you?',options:['More responsibility and impact','Higher salary and recognition','New skills development','Leading my own team']},{id:10,dim:'work_style',text:'How do you handle tight deadlines?',options:['Work overtime to finish','Reduce quality to deliver','Negotiate for extension','Ask team for immediate help']},{id:11,dim:'culture',text:'How important are social relationships with colleagues?',options:['Essential — team is family','Important but professional','Secondary — work first','Depends on the person']},{id:12,dim:'leadership',text:'How do you handle a poorly performing colleague?',options:['Talk directly and create improvement plan','Give suitable tasks','Report to management','Help personally']},{id:13,dim:'motivation',text:'What makes you stay in a job for over 3 years?',options:['Renewed projects and challenges','A great team','Competitive salary and benefits','Clear growth path']},{id:14,dim:'decision',text:'How do you handle professional risks?',options:['Study deeply before deciding','Accept if reward is worth it','Avoid as much as possible','Share the risk with the team']},{id:15,dim:'work_style',text:'What is your approach to learning?',options:['Organized courses and certifications','Self-learning from diverse sources','Learning by doing','Learning from mentors']},{id:16,dim:'culture',text:'What is your view on remote work?',options:['Fully prefer it','Prefer hybrid','Prefer the office',"Location doesn't matter"]},{id:17,dim:'leadership',text:'What leadership style do you work best under?',options:['Directive with clear instructions','Delegative with autonomy','Participative with team','Coaching focused on development']},{id:18,dim:'motivation',text:'How do you define professional success?',options:['Achieving measurable goals','Positive impact on others','Reaching leadership position','Work-life balance']}]

const DIM_COLORS:Record<string,string>={work_style:'#34D399',decision:'#60A5FA',culture:'#F97316',motivation:'#A78BFA',leadership:'#FBBF24'}

function calcScores(ans:Record<number,number>,qs:typeof QUESTIONS_AR){
  const d:Record<string,number[]>={}
  qs.forEach(q=>{if(!d[q.dim])d[q.dim]=[];if(ans[q.id]!==undefined)d[q.dim].push(ans[q.id])})
  const r:Record<string,number>={}
  Object.entries(d).forEach(([k,v])=>{r[k]=Math.round((v.reduce((a:number,b:number)=>a+b,0)/(v.length*3))*100)})
  return r
}
function calcMatch(a:Record<string,number>,b:Record<string,number>){
  const k=Object.keys(a);if(!k.length)return 0
  return Math.round(k.reduce((t,k)=>t+(100-Math.abs((a[k]||0)-(b[k]||0))),0)/k.length)
}
function mc(p:number,dark:boolean){return p>=85?'#34D399':p>=65?'#FBBF24':dark?'#6B7280':'#9CA3AF'}

function getG(dark:boolean){
  return dark?{
    bg:'#080A09',surface:'#0E1210',card:'#131816',cardHover:'#171D1A',
    overlay:'rgba(0,0,0,0.85)',accent:'#00DC82',accentGlow:'rgba(0,220,130,0.12)',
    textPri:'#F0FDF4',textSec:'#8FA89A',textHint:'#4A5C51',
    border:'#1E2822',borderMid:'#283330',
    success:'#34D399',warning:'#FBBF24',danger:'#F87171',info:'#60A5FA',
  }:{
    bg:'#F8FAF9',surface:'#FFFFFF',card:'#FFFFFF',cardHover:'#F0FDF4',
    overlay:'rgba(0,0,0,0.5)',accent:'#16A34A',accentGlow:'rgba(22,163,74,0.08)',
    textPri:'#0A0F0C',textSec:'#4B5563',textHint:'#9CA3AF',
    border:'#E5E7EB',borderMid:'#D1D5DB',
    success:'#16A34A',warning:'#D97706',danger:'#DC2626',info:'#2563EB',
  }
}

export default function WaselApp(){
  type Page='auth'|'role-select'|'dashboard'|'assessment'|'hr'|'matches'|'profile'
  const [page,setPage]=useState<Page>('auth')
  const [user,setUser]=useState<any>(null)
  const [profile,setProfile]=useState<any>(null)
  const [loading,setLoading]=useState(true)
  const [lang,setLang]=useState<'ar'|'en'>('ar')
  const [darkMode,setDarkMode]=useState(true)
  const [pendingUser,setPendingUser]=useState<any>(null)
  const [selectedRole,setSelectedRole]=useState<'candidate'|'company'>('candidate')

  const t=T[lang]
  const G=getG(darkMode)
  const FONT=lang==='ar'?`'IBM Plex Sans Arabic',sans-serif`:`'Inter',sans-serif`
  const dir=lang==='ar'?'rtl':'ltr'
  const FIELDS=lang==='ar'?FIELDS_AR:FIELDS_EN
  const REGIONS=lang==='ar'?REGIONS_AR:REGIONS_EN
  const TITLES=lang==='ar'?TITLES_AR:TITLES_EN
  const QUESTIONS=lang==='ar'?QUESTIONS_AR:QUESTIONS_EN

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [fullName,setFullName]=useState('')
  const [role,setRole]=useState<'candidate'|'company'>('candidate')
  const [isLogin,setIsLogin]=useState(true)
  const [authMsg,setAuthMsg]=useState('')
  const [authLoading,setAuthLoading]=useState(false)
  const [currentQ,setCurrentQ]=useState(0)
  const [answers,setAnswers]=useState<Record<number,number>>({})
  const [assessDone,setAssessDone]=useState(false)
  const [cvFile,setCvFile]=useState<File|null>(null)
  const [selField,setSelField]=useState('')
  const [selSub,setSelSub]=useState('')
  const [selTitle,setSelTitle]=useState('')
  const [selRegions,setSelRegions]=useState<string[]>([])
  const [skills,setSkills]=useState('')
  const [langs,setLangs]=useState('')
  const [achievement,setAchievement]=useState('')
  const [idealEnv,setIdealEnv]=useState('')
  const [dealBreaker,setDealBreaker]=useState('')
  const [experience,setExperience]=useState('')
  const [education,setEducation]=useState('')
  const [saved,setSaved]=useState(false)
  const [candidates,setCandidates]=useState<any[]>([])
  const [selCandidate,setSelCandidate]=useState<any>(null)
  const [filterField,setFilterField]=useState('')
  const [filterStatus,setFilterStatus]=useState('')
  const [hrLoading,setHrLoading]=useState(false)
  const [matches,setMatches]=useState<any[]>([])

  useEffect(()=>{
    const fl=document.createElement('link')
    fl.rel='stylesheet'
    fl.href='https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;700;900&family=Inter:wght@300;400;500;700;900&display=swap'
    document.head.appendChild(fl)

    supabase.auth.getSession().then(async({data:{session}})=>{
      if(session?.user){
        setUser(session.user)
        const{data}=await supabase.from('profiles').select('*').eq('id',session.user.id).single()
        if(data){setProfile(data);setPage('dashboard')}
        else{setPendingUser(session.user);setPage('role-select')}
      }
      setLoading(false)
    })

    supabase.auth.onAuthStateChange(async(event,session)=>{
      if(event==='SIGNED_IN'&&session?.user){
        const{data:p}=await supabase.from('profiles').select('*').eq('id',session.user.id).single()
        if(p){setUser(session.user);setProfile(p);setPage('dashboard')}
        else{setUser(session.user);setPendingUser(session.user);setPage('role-select')}
      }
    })
  },[])

  useEffect(()=>{
    let s=document.getElementById('ws')
    if(!s){s=document.createElement('style');s.id='ws';document.head.appendChild(s)}
    s.textContent=`*{box-sizing:border-box;margin:0;padding:0;}body{background:${G.bg};font-family:${FONT};direction:${dir};}input,select,textarea{font-family:${FONT}!important;direction:${dir};}input:focus,select:focus,textarea:focus{outline:none;border-color:${G.accent}!important;box-shadow:0 0 0 3px ${G.accentGlow}!important;}input::placeholder,textarea::placeholder{color:${G.textHint};}select option{background:${G.card};color:${G.textPri};}::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:${G.border};border-radius:4px;}@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}@keyframes slidePanel{from{transform:${dir==='rtl'?'translateX(-100%)':'translateX(100%)'}}to{transform:none}}.fu{animation:fadeUp 0.3s ease forwards;}.sp{animation:slidePanel 0.3s cubic-bezier(0.32,0.72,0,1) forwards;}`
  },[darkMode,lang])

  const inp:React.CSSProperties={width:'100%',padding:'13px 16px',borderRadius:'10px',border:`1.5px solid ${G.border}`,background:G.surface,color:G.textPri,fontSize:'14px',transition:'border-color 0.2s'}
  const cs=(e:any={}):React.CSSProperties=>({background:G.card,borderRadius:'16px',border:`1px solid ${G.border}`,...e})
  const bs=(v:'primary'|'secondary'|'ghost'|'danger'='primary',e:any={}):React.CSSProperties=>({
    padding:'12px 24px',borderRadius:'10px',border:'none',cursor:'pointer',fontWeight:700,fontSize:'14px',fontFamily:FONT,transition:'all 0.18s',
    ...(v==='primary'?{background:G.accent,color:darkMode?'#001A0D':'#fff'}:
        v==='secondary'?{background:G.surface,color:G.textPri,border:`1px solid ${G.border}`}:
        v==='danger'?{background:'rgba(248,113,113,0.12)',color:G.danger,border:`1px solid rgba(248,113,113,0.25)`}:
        {background:'transparent',color:G.textSec,border:'none'}),...e
  })

  async function signInWith(p:'google'|'apple'){
    await supabase.auth.signInWithOAuth({provider:p,options:{redirectTo:window.location.origin}})
  }

  async function handleAuth(){
    setAuthLoading(true);setAuthMsg('')
    if(isLogin){
      const{error}=await supabase.auth.signInWithPassword({email,password})
      if(error){setAuthMsg(error.message);setAuthLoading(false);return}
      const{data:{user:u}}=await supabase.auth.getUser()
      if(u){
        const{data:p}=await supabase.from('profiles').select('*').eq('id',u.id).single()
        setUser(u)
        if(p){setProfile(p);setPage('dashboard')}
        else{setPendingUser(u);setPage('role-select')}
      }
    }else{
      const{data,error}=await supabase.auth.signUp({email,password})
      if(error){setAuthMsg(error.message);setAuthLoading(false);return}
      if(data.user){
        // ── حفظ الـ role مباشرة عند التسجيل ──
        const{error:upsertError}=await supabase.from('profiles').upsert({
          id:data.user.id,
          full_name:fullName,
          role:role,  // الدور المختار
          assessment_done:false
        },{onConflict:'id'})
        if(upsertError){
          // إذا فشل الـ upsert، اذهب لصفحة اختيار الدور
          setUser(data.user);setPendingUser(data.user);setPage('role-select')
        }else{
          const{data:p}=await supabase.from('profiles').select('*').eq('id',data.user.id).single()
          setUser(data.user);setProfile(p);setPage('dashboard')
        }
      }
    }
    setAuthLoading(false)
  }

  async function handleRoleSelect(){
    const u=pendingUser||user
    if(!u)return
    await supabase.from('profiles').upsert({
      id:u.id,
      full_name:u.user_metadata?.full_name||fullName||u.email?.split('@')[0]||'',
      role:selectedRole,
      assessment_done:false
    },{onConflict:'id'})
    const{data:p}=await supabase.from('profiles').select('*').eq('id',u.id).single()
    setProfile(p);setPendingUser(null);setPage('dashboard')
  }

  async function handleSignOut(){await supabase.auth.signOut();setUser(null);setProfile(null);setPage('auth')}

  async function submitAssessment(){
    const scores=calcScores(answers,QUESTIONS)
    await supabase.from('profiles').update({assessment_done:true,scores:JSON.stringify(scores)}).eq('id',user.id)
    const{data:p}=await supabase.from('profiles').select('*').eq('id',user.id).single()
    setProfile(p);setAssessDone(true)
  }

  async function saveProfile(){
    await supabase.from('profiles').update({field:selField,sub_field:selSub,job_title:selTitle,regions:JSON.stringify(selRegions),skills,languages:langs,achievement,ideal_env:idealEnv,deal_breaker:dealBreaker,experience,education}).eq('id',user.id)
    const{data:p}=await supabase.from('profiles').select('*').eq('id',user.id).single()
    setProfile(p);setSaved(true);setTimeout(()=>setSaved(false),3000)
  }

  async function loadCandidates(){
    setHrLoading(true)
    const{data}=await supabase.from('profiles').select('*').eq('role','candidate')
    const cs2=profile?.scores?JSON.parse(profile.scores):{}
    setCandidates((data||[]).map((c:any)=>({...c,matchPct:calcMatch(c.scores?JSON.parse(c.scores):{},cs2)})).sort((a:any,b:any)=>b.matchPct-a.matchPct))
    setHrLoading(false)
  }

  async function updateStatus(id:string,status:string){
    await supabase.from('profiles').update({hr_status:status}).eq('id',id)
    setCandidates(p=>p.map(c=>c.id===id?{...c,hr_status:status}:c))
    if(selCandidate?.id===id)setSelCandidate((p:any)=>({...p,hr_status:status}))
  }

  async function loadMatches(){
    const{data}=await supabase.from('profiles').select('*').eq('role','company')
    const ms=profile?.scores?JSON.parse(profile.scores):{}
    setMatches((data||[]).map((c:any)=>({...c,matchPct:calcMatch(ms,c.scores?JSON.parse(c.scores):{})})).sort((a:any,b:any)=>b.matchPct-a.matchPct))
  }

  const isCompany=profile?.role==='company'||profile?.role==='شركة'

  const Controls=()=>(
    <div style={{position:'fixed',top:'16px',left:dir==='rtl'?'16px':'auto',right:dir==='ltr'?'16px':'auto',display:'flex',gap:'8px',zIndex:500}}>
      <button onClick={()=>setLang(l=>l==='ar'?'en':'ar')} style={bs('secondary',{padding:'7px 14px',fontSize:'12px',fontWeight:700,borderRadius:'8px'})}>{lang==='ar'?'EN':'عربي'}</button>
      <button onClick={()=>setDarkMode(d=>!d)} style={bs('secondary',{padding:'7px 12px',fontSize:'14px',borderRadius:'8px',minWidth:'36px'})}>{darkMode?'☀️':'🌙'}</button>
    </div>
  )

  if(loading)return(
    <div style={{minHeight:'100vh',background:G.bg,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{width:'48px',height:'48px',borderRadius:'14px',background:G.accentGlow,border:`1px solid ${G.accent}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',fontWeight:900,color:G.accent,fontFamily:FONT}}>{lang==='ar'?'و':'W'}</div>
    </div>
  )

  // ── ROLE SELECT ──
  if(page==='role-select')return(
    <main style={{minHeight:'100vh',background:G.bg,display:'flex',alignItems:'center',justifyContent:'center',direction:dir,fontFamily:FONT,padding:'24px',position:'relative'}}>
      <Controls/>
      <div className='fu' style={cs({padding:'48px',maxWidth:'480px',width:'100%',textAlign:'center'})}>
        <div style={{width:'64px',height:'64px',borderRadius:'18px',background:G.accentGlow,border:`1px solid ${G.accent}30`,margin:'0 auto 24px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',fontWeight:900,color:G.accent}}>{lang==='ar'?'و':'W'}</div>
        <div style={{fontSize:'26px',fontWeight:900,color:G.textPri,marginBottom:'10px'}}>{t.roleSelectTitle}</div>
        <div style={{fontSize:'14px',color:G.textSec,marginBottom:'36px',lineHeight:1.7}}>{t.roleSelectDesc}</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'28px'}}>
          {[{v:'candidate' as const,l:t.candidate,icon:'👤',d:t.candidateDesc},{v:'company' as const,l:t.company,icon:'🏢',d:t.companyDesc}].map(opt=>(
            <button key={opt.v} onClick={()=>setSelectedRole(opt.v)} style={{padding:'20px 16px',borderRadius:'14px',border:`2px solid ${selectedRole===opt.v?G.accent:G.border}`,background:selectedRole===opt.v?G.accentGlow:G.surface,cursor:'pointer',textAlign:'center',fontFamily:FONT,transition:'all 0.2s'}}>
              <div style={{fontSize:'32px',marginBottom:'10px'}}>{opt.icon}</div>
              <div style={{fontSize:'15px',fontWeight:700,color:selectedRole===opt.v?G.accent:G.textPri,marginBottom:'6px'}}>{opt.l}</div>
              <div style={{fontSize:'12px',color:G.textHint,lineHeight:1.5}}>{opt.d}</div>
            </button>
          ))}
        </div>
        <button onClick={handleRoleSelect} style={bs('primary',{padding:'14px',fontSize:'15px',width:'100%',borderRadius:'12px'})}>{t.continueBtn}</button>
      </div>
    </main>
  )

  // ── AUTH ──
  if(page==='auth')return(
    <main style={{minHeight:'100vh',background:G.bg,display:'flex',direction:dir,overflow:'hidden',fontFamily:FONT,position:'relative'}}>
      <Controls/>
      <div style={{flex:1,background:darkMode?`linear-gradient(135deg,#0A0F0C,#0E1A13)`:G.surface,padding:'60px',display:'flex',flexDirection:'column',justifyContent:'space-between',borderLeft:dir==='rtl'?`1px solid ${G.border}`:'none',borderRight:dir==='ltr'?`1px solid ${G.border}`:'none',minWidth:0}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{width:'40px',height:'40px',borderRadius:'12px',background:G.accentGlow,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',fontWeight:900,color:G.accent}}>{lang==='ar'?'و':'W'}</div>
          <div style={{fontSize:'20px',fontWeight:900,color:G.textPri}}>{t.appName}</div>
        </div>
        <div>
          <div style={{fontSize:'40px',fontWeight:900,color:G.textPri,lineHeight:1.3,marginBottom:'20px',whiteSpace:'pre-line'}}>{t.heroTitle}</div>
          <div style={{fontSize:'15px',color:G.textSec,lineHeight:1.8,marginBottom:'40px'}}>{t.heroDesc}</div>
          <div style={{display:'flex',gap:'32px'}}>
            {t.stats.map((s,i)=>(
              <div key={i}>
                <div style={{fontSize:'22px',fontWeight:900,color:G.accent}}>{s.split(' ')[0]}</div>
                <div style={{fontSize:'12px',color:G.textHint,marginTop:'4px'}}>{s.split(' ').slice(1).join(' ')}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{fontSize:'12px',color:G.textHint}}>© 2026 {t.appName}</div>
      </div>
      <div style={{width:'460px',flexShrink:0,padding:'60px 48px',display:'flex',flexDirection:'column',justifyContent:'center',overflow:'auto',background:G.bg}}>
        <div style={{marginBottom:'28px'}}>
          <div style={{fontSize:'26px',fontWeight:900,color:G.textPri,marginBottom:'6px'}}>{isLogin?t.signIn:t.signUp}</div>
          <div style={{fontSize:'13px',color:G.textSec}}>{t.tagline}</div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'20px'}}>
          {[{p:'google' as const,l:t.continueGoogle,icon:<svg width="18" height="18" viewBox="0 0 24 24" style={{flexShrink:0}}><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>},
           {p:'apple' as const,l:t.continueApple,icon:<svg width="18" height="18" viewBox="0 0 24 24" fill={G.textPri} style={{flexShrink:0}}><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>}].map(({p,l,icon})=>(
            <button key={p} onClick={()=>signInWith(p)} style={bs('secondary',{padding:'13px 20px',display:'flex',alignItems:'center',justifyContent:'center',gap:'12px',width:'100%',fontSize:'14px'})}>{icon}{l}</button>
          ))}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px'}}>
          <div style={{flex:1,height:'1px',background:G.border}}/><span style={{fontSize:'12px',color:G.textHint}}>{t.orEmail}</span><div style={{flex:1,height:'1px',background:G.border}}/>
        </div>
        <div style={{display:'flex',gap:'4px',marginBottom:'20px',background:G.surface,padding:'4px',borderRadius:'12px',border:`1px solid ${G.border}`}}>
          {[t.signIn,t.signUp].map((label,i)=>(
            <button key={i} onClick={()=>{setIsLogin(i===0);setAuthMsg('')}} style={{flex:1,padding:'10px',border:'none',borderRadius:'9px',fontWeight:700,fontSize:'13px',cursor:'pointer',fontFamily:FONT,transition:'all 0.2s',background:isLogin===(i===0)?G.card:'transparent',color:isLogin===(i===0)?G.textPri:G.textSec,boxShadow:isLogin===(i===0)?`0 1px 6px rgba(0,0,0,0.2)`:' none'}}>{label}</button>
          ))}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          {!isLogin&&<input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder={t.fullName} style={inp}/>}
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder={t.email} type='email' style={{...inp,direction:'ltr'}}/>
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder={t.password} type='password' style={{...inp,direction:'ltr'}}/>
          {!isLogin&&(
            <div>
              <div style={{fontSize:'12px',color:G.textHint,marginBottom:'10px',fontWeight:500}}>{t.accountType}</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
                {[{v:'candidate' as const,l:t.candidate,icon:'👤',d:t.candidateDesc},{v:'company' as const,l:t.company,icon:'🏢',d:t.companyDesc}].map(opt=>(
                  <button key={opt.v} onClick={()=>setRole(opt.v)} style={{padding:'14px 12px',borderRadius:'12px',border:`2px solid ${role===opt.v?G.accent:G.border}`,background:role===opt.v?G.accentGlow:G.surface,cursor:'pointer',textAlign:dir==='rtl'?'right':'left',fontFamily:FONT,transition:'all 0.2s'}}>
                    <div style={{fontSize:'18px',marginBottom:'6px'}}>{opt.icon}</div>
                    <div style={{fontSize:'13px',fontWeight:700,color:role===opt.v?G.accent:G.textPri,marginBottom:'2px'}}>{opt.l}</div>
                    <div style={{fontSize:'11px',color:G.textHint}}>{opt.d}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          {authMsg&&<div style={{padding:'12px 16px',borderRadius:'10px',background:'rgba(248,113,113,0.08)',border:'1px solid rgba(248,113,113,0.2)',color:G.danger,fontSize:'13px',display:'flex',alignItems:'center',gap:'8px'}}>⚠ {authMsg}</div>}
          <button onClick={handleAuth} disabled={authLoading} style={bs('primary',{padding:'14px',fontSize:'15px',opacity:authLoading?0.7:1,width:'100%',borderRadius:'12px'})}>{authLoading?t.loading:isLogin?t.loginBtn:t.signupBtn}</button>
          {isLogin&&<div style={{textAlign:'center',fontSize:'13px',color:G.textHint}}>{t.noAccount} <button onClick={()=>setIsLogin(false)} style={{background:'none',border:'none',color:G.accent,cursor:'pointer',fontWeight:700,fontFamily:FONT,fontSize:'13px'}}>{t.createAccount}</button></div>}
        </div>
      </div>
    </main>
  )

  // ── ASSESSMENT ──
  if(page==='assessment'){
    if(assessDone)return(
      <main style={{minHeight:'100vh',background:G.bg,display:'flex',alignItems:'center',justifyContent:'center',direction:dir,padding:'24px',fontFamily:FONT,position:'relative'}}>
        <Controls/>
        <div className='fu' style={cs({padding:'56px',maxWidth:'500px',width:'100%',textAlign:'center'})}>
          <div style={{width:'80px',height:'80px',borderRadius:'24px',background:G.accentGlow,border:`1px solid ${G.accent}40`,margin:'0 auto 24px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'36px'}}>🎯</div>
          <div style={{fontSize:'28px',fontWeight:900,color:G.textPri,marginBottom:'12px'}}>{t.assessDoneTitle}</div>
          <div style={{color:G.textSec,marginBottom:'36px',lineHeight:1.8,fontSize:'15px'}}>{t.assessDoneDesc}</div>
          <div style={{display:'flex',gap:'12px',justifyContent:'center'}}>
            <button onClick={()=>{setPage('matches');loadMatches()}} style={bs('primary',{padding:'13px 28px'})}>{t.viewMatches2}</button>
            <button onClick={()=>setPage('dashboard')} style={bs('secondary',{padding:'13px 28px'})}>{t.backDash}</button>
          </div>
        </div>
      </main>
    )
    const q=QUESTIONS[currentQ]
    const prog=Math.round((currentQ/QUESTIONS.length)*100)
    return(
      <main style={{minHeight:'100vh',background:G.bg,direction:dir,padding:'24px',fontFamily:FONT,position:'relative'}}>
        <Controls/>
        <div style={{maxWidth:'640px',margin:'0 auto'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'40px',paddingTop:'16px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <div style={{width:'32px',height:'32px',borderRadius:'9px',background:G.accentGlow,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:900,color:G.accent}}>{lang==='ar'?'و':'W'}</div>
              <span style={{fontSize:'16px',fontWeight:900,color:G.textPri}}>{t.assessmentTitle}</span>
            </div>
            <button onClick={()=>setPage('dashboard')} style={bs('ghost',{fontSize:'13px',color:G.textHint})}>{t.cancel}</button>
          </div>
          <div style={{marginBottom:'36px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
              <span style={{fontSize:'13px',color:G.textSec}}>{t.questionOf(currentQ+1,QUESTIONS.length)}</span>
              <span style={{fontSize:'13px',fontWeight:700,color:G.accent}}>{prog}%</span>
            </div>
            <div style={{background:G.border,borderRadius:'99px',height:'5px',overflow:'hidden'}}>
              <div style={{width:`${prog}%`,height:'100%',background:G.accent,borderRadius:'99px',transition:'width 0.4s ease'}}/>
            </div>
          </div>
          <div className='fu' key={currentQ} style={cs({padding:'40px',marginBottom:'20px'})}>
            <div style={{fontSize:'11px',fontWeight:700,color:G.accent,letterSpacing:'1.5px',marginBottom:'16px'}}>{t.dimLabels[q.dim as keyof typeof t.dimLabels]}</div>
            <div style={{fontSize:'20px',fontWeight:700,color:G.textPri,lineHeight:1.7,marginBottom:'32px'}}>{q.text}</div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {q.options.map((opt,i)=>(
                <button key={i} onClick={()=>{const na={...answers,[q.id]:i};setAnswers(na);setTimeout(()=>{if(currentQ<QUESTIONS.length-1)setCurrentQ(currentQ+1);else submitAssessment()},200)}}
                  style={{padding:'15px 20px',borderRadius:'12px',border:`1.5px solid ${answers[q.id]===i?G.accent:G.border}`,background:answers[q.id]===i?G.accentGlow:G.surface,cursor:'pointer',textAlign:dir==='rtl'?'right':'left',fontSize:'14px',fontWeight:answers[q.id]===i?700:400,color:answers[q.id]===i?G.accent:G.textSec,fontFamily:FONT,transition:'all 0.15s',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <span>{opt}</span>
                  {answers[q.id]===i&&<span style={{width:'18px',height:'18px',borderRadius:'50%',background:G.accent,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',color:darkMode?'#001A0D':'#fff',fontWeight:900,flexShrink:0}}>✓</span>}
                </button>
              ))}
            </div>
          </div>
          {currentQ>0&&<button onClick={()=>setCurrentQ(currentQ-1)} style={bs('ghost',{fontSize:'13px',color:G.textHint})}>{t.prev}</button>}
        </div>
      </main>
    )
  }

  // ── PROFILE ──
  if(page==='profile')return(
    <main style={{minHeight:'100vh',background:G.bg,direction:dir,padding:'24px',fontFamily:FONT,position:'relative'}}>
      <Controls/>
      <div style={{maxWidth:'720px',margin:'0 auto',paddingTop:'16px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'28px'}}>
          <div><div style={{fontSize:'22px',fontWeight:900,color:G.textPri}}>{t.profileTitle}</div><div style={{fontSize:'13px',color:G.textSec,marginTop:'4px'}}>{t.profileSub}</div></div>
          <button onClick={()=>setPage('dashboard')} style={bs('secondary',{padding:'9px 20px',fontSize:'13px'})}>{t.back}</button>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          <div style={cs({padding:'24px'})}>
            <div style={{fontWeight:700,color:G.textPri,marginBottom:'4px',fontSize:'15px'}}>{t.cvUpload}</div>
            <div style={{fontSize:'12px',color:G.textHint,marginBottom:'16px'}}>{t.cvDesc}</div>
            <label style={{display:'flex',alignItems:'center',gap:'16px',padding:'18px',borderRadius:'12px',border:`2px dashed ${cvFile?G.accent:G.border}`,cursor:'pointer',background:cvFile?G.accentGlow:G.surface,transition:'all 0.2s'}}>
              <div style={{width:'44px',height:'44px',borderRadius:'12px',background:G.border,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>📎</div>
              <div style={{flex:1}}><div style={{fontWeight:700,fontSize:'14px',color:cvFile?G.accent:G.textPri}}>{cvFile?cvFile.name:t.clickUpload}</div><div style={{fontSize:'12px',color:G.textHint,marginTop:'2px'}}>{t.pdfOnly}</div></div>
              {cvFile&&<span style={{color:G.accent,fontWeight:700}}>✓</span>}
              <input type='file' accept='.pdf' style={{display:'none'}} onChange={e=>e.target.files&&setCvFile(e.target.files[0])}/>
            </label>
          </div>
          <div style={cs({padding:'24px'})}>
            <div style={{fontWeight:700,color:G.textPri,marginBottom:'16px',fontSize:'15px'}}>{t.fieldTitle}</div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              <select value={selField} onChange={e=>{setSelField(e.target.value);setSelSub('')}} style={inp}><option value=''>{t.selectField}</option>{FIELDS.map(f=><option key={f.name} value={f.name}>{f.name}</option>)}</select>
              {selField&&<select value={selSub} onChange={e=>setSelSub(e.target.value)} style={inp}><option value=''>{t.selectSub}</option>{FIELDS.find(f=>f.name===selField)?.subs.map(s=><option key={s} value={s}>{s}</option>)}</select>}
              <select value={selTitle} onChange={e=>setSelTitle(e.target.value)} style={inp}><option value=''>{t.selectTitle}</option>{TITLES.map(tt=><option key={tt} value={tt}>{tt}</option>)}</select>
            </div>
          </div>
          <div style={cs({padding:'24px'})}>
            <div style={{fontWeight:700,color:G.textPri,marginBottom:'4px',fontSize:'15px'}}>{t.regionsTitle}</div>
            <div style={{fontSize:'12px',color:G.textHint,marginBottom:'16px'}}>{t.regionsDesc}</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
              {REGIONS.map(r=>(
                <button key={r} onClick={()=>setSelRegions(p=>p.includes(r)?p.filter(x=>x!==r):[...p,r])} style={{padding:'7px 16px',borderRadius:'99px',border:`1px solid ${selRegions.includes(r)?G.accent:G.border}`,background:selRegions.includes(r)?G.accentGlow:G.surface,cursor:'pointer',fontSize:'13px',fontWeight:selRegions.includes(r)?700:400,color:selRegions.includes(r)?G.accent:G.textSec,fontFamily:FONT,transition:'all 0.15s'}}>{r}</button>
              ))}
            </div>
          </div>
          <div style={cs({padding:'24px'})}>
            <div style={{fontWeight:700,color:G.textPri,marginBottom:'20px',fontSize:'15px'}}>{t.detailsTitle}</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'16px'}}>
              {[{l:t.skills,v:skills,s:setSkills,p:t.skillsPh},{l:t.langs,v:langs,s:setLangs,p:t.langsPh},{l:t.exp,v:experience,s:setExperience,p:t.expPh},{l:t.edu,v:education,s:setEducation,p:t.eduPh}].map(({l,v,s,p})=>(
                <div key={l}><div style={{fontSize:'12px',fontWeight:700,color:G.textSec,marginBottom:'8px'}}>{l}</div><textarea value={v} onChange={e=>s(e.target.value)} placeholder={p} rows={2} style={{...inp,resize:'vertical'}}/></div>
              ))}
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              {[{l:t.achieve,v:achievement,s:setAchievement,p:t.achievePh},{l:t.ideal,v:idealEnv,s:setIdealEnv,p:t.idealPh},{l:t.dealBreaker,v:dealBreaker,s:setDealBreaker,p:t.dealBreakerPh}].map(({l,v,s,p})=>(
                <div key={l}><div style={{fontSize:'12px',fontWeight:700,color:G.textSec,marginBottom:'8px'}}>{l}</div><textarea value={v} onChange={e=>s(e.target.value)} placeholder={p} rows={2} style={{...inp,resize:'vertical'}}/></div>
              ))}
            </div>
          </div>
          <button onClick={saveProfile} style={bs('primary',{padding:'14px',fontSize:'15px',borderRadius:'12px'})}>{saved?t.savedProfile:t.saveProfile}</button>
        </div>
      </div>
    </main>
  )

  // ── HR ──
  if(page==='hr'){
    const filtered=candidates.filter(c=>(!filterField||c.field===filterField)&&(!filterStatus||c.hr_status===filterStatus))
    const ss=(s:string):React.CSSProperties=>({padding:'4px 12px',borderRadius:'99px',fontSize:'12px',fontWeight:700,...(s==='مقبول'||s==='Accepted'?{background:'rgba(52,211,153,0.1)',color:G.success}:s==='مرفوض'||s==='Rejected'?{background:'rgba(248,113,113,0.1)',color:G.danger}:s==='مقابلة'||s==='Interview'?{background:'rgba(96,165,250,0.1)',color:G.info}:{background:G.surface,color:G.textSec})})
    return(
      <main style={{minHeight:'100vh',background:G.bg,direction:dir,padding:'24px',fontFamily:FONT,position:'relative'}}>
        <Controls/>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px',paddingTop:'16px'}}>
            <div><div style={{fontSize:'24px',fontWeight:900,color:G.textPri}}>{t.hrTitle}</div><div style={{fontSize:'13px',color:G.textSec,marginTop:'4px'}}>{t.hrSub(candidates.length)}</div></div>
            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={loadCandidates} style={bs('primary',{padding:'10px 20px',fontSize:'13px'})}>{t.refresh}</button>
              <button onClick={()=>setPage('dashboard')} style={bs('secondary',{padding:'10px 20px',fontSize:'13px'})}>{t.back}</button>
            </div>
          </div>
          <div style={{display:'flex',gap:'12px',marginBottom:'20px'}}>
            {[{v:filterField,s:setFilterField,opts:FIELDS.map(f=>f.name),ph:t.allFields},{v:filterStatus,s:setFilterStatus,opts:t.statuses,ph:t.allStatus}].map(({v,s,opts,ph},i)=>(
              <select key={i} value={v} onChange={e=>s(e.target.value)} style={{...inp,width:'auto',padding:'9px 16px',fontSize:'13px'}}><option value=''>{ph}</option>{opts.map(o=><option key={o} value={o}>{o}</option>)}</select>
            ))}
          </div>
          <div style={cs({overflow:'hidden'})}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'14px'}}>
              <thead><tr style={{borderBottom:`1px solid ${G.border}`,background:G.surface}}>
                {[t.colCandidate,t.colField,t.colTitle2,t.colRegion,t.colMatch,t.colStatus,''].map(h=>(
                  <th key={h} style={{padding:'13px 18px',textAlign:dir==='rtl'?'right':'left',fontWeight:700,color:G.textHint,fontSize:'11px',letterSpacing:'0.5px'}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {hrLoading&&<tr><td colSpan={7} style={{padding:'60px',textAlign:'center',color:G.textHint}}>{t.loadingData}</td></tr>}
                {!hrLoading&&filtered.length===0&&<tr><td colSpan={7} style={{padding:'60px',textAlign:'center',color:G.textHint}}>{t.noCandidates}</td></tr>}
                {!hrLoading&&filtered.map((c,i)=>(
                  <tr key={c.id} onClick={()=>setSelCandidate(c)} style={{borderBottom:`1px solid ${G.border}`,cursor:'pointer',background:i%2===0?G.card:G.surface,transition:'background 0.15s'}}
                    onMouseEnter={e=>(e.currentTarget.style.background=G.cardHover)}
                    onMouseLeave={e=>(e.currentTarget.style.background=i%2===0?G.card:G.surface)}>
                    <td style={{padding:'15px 18px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                        <div style={{width:'36px',height:'36px',borderRadius:'10px',background:G.accentGlow,border:`1px solid ${G.accent}20`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:900,color:G.accent,flexShrink:0}}>{(c.full_name||'M')[0]}</div>
                        <div><div style={{fontWeight:700,color:G.textPri,fontSize:'14px'}}>{c.full_name||'—'}</div><div style={{fontSize:'11px',color:G.textHint,marginTop:'2px'}}>{c.experience||'—'}</div></div>
                      </div>
                    </td>
                    <td style={{padding:'15px 18px',color:G.textSec,fontSize:'13px'}}>{c.field||'—'}</td>
                    <td style={{padding:'15px 18px',fontSize:'13px',color:G.textSec}}>{c.job_title||'—'}</td>
                    <td style={{padding:'15px 18px',fontSize:'13px',color:G.textHint}}>{c.regions?JSON.parse(c.regions)[0]||'—':'—'}</td>
                    <td style={{padding:'15px 18px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                        <span style={{fontSize:'18px',fontWeight:900,color:mc(c.matchPct,darkMode)}}>{c.matchPct}%</span>
                        <div style={{width:'48px',height:'4px',borderRadius:'99px',background:G.border,overflow:'hidden'}}>
                          <div style={{width:`${c.matchPct}%`,height:'100%',background:mc(c.matchPct,darkMode),borderRadius:'99px'}}/>
                        </div>
                      </div>
                    </td>
                    <td style={{padding:'15px 18px'}}><span style={ss(c.hr_status||(lang==='ar'?'جديد':'New'))}>{c.hr_status||(lang==='ar'?'جديد':'New')}</span></td>
                    <td style={{padding:'15px 18px'}}><button onClick={e=>{e.stopPropagation();setSelCandidate(c)}} style={bs('secondary',{padding:'7px 14px',fontSize:'12px'})}>{t.details}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {selCandidate&&(
          <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:G.overlay,zIndex:300,display:'flex',justifyContent:dir==='rtl'?'flex-start':'flex-end'}} onClick={()=>setSelCandidate(null)}>
            <div className='sp' style={{width:'440px',height:'100%',background:G.surface,overflowY:'auto',padding:'32px',borderLeft:dir==='rtl'?`1px solid ${G.borderMid}`:'none',borderRight:dir==='ltr'?`1px solid ${G.borderMid}`:'none',boxShadow:'0 0 80px rgba(0,0,0,0.5)'}} onClick={e=>e.stopPropagation()}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'24px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
                  <div style={{width:'48px',height:'48px',borderRadius:'14px',background:G.accentGlow,border:`1px solid ${G.accent}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',fontWeight:900,color:G.accent}}>{(selCandidate.full_name||'M')[0]}</div>
                  <div><div style={{fontWeight:900,fontSize:'18px',color:G.textPri}}>{selCandidate.full_name||'—'}</div><div style={{fontSize:'12px',color:G.textSec,marginTop:'2px'}}>{selCandidate.job_title||selCandidate.field||'—'}</div></div>
                </div>
                <button onClick={()=>setSelCandidate(null)} style={{background:G.card,border:`1px solid ${G.border}`,width:'32px',height:'32px',borderRadius:'8px',cursor:'pointer',fontSize:'16px',color:G.textSec,display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
              </div>
              <div style={{...cs({padding:'24px',marginBottom:'20px',textAlign:'center'}),border:`1px solid ${selCandidate.matchPct>=80?G.accent+'40':G.border}`}}>
                <div style={{fontSize:'52px',fontWeight:900,color:mc(selCandidate.matchPct,darkMode),lineHeight:1}}>{selCandidate.matchPct}%</div>
                <div style={{fontSize:'13px',color:G.textSec,marginTop:'8px'}}>{t.matchScore}</div>
              </div>
              {selCandidate.scores&&(
                <div style={{marginBottom:'20px'}}>
                  <div style={{fontWeight:700,marginBottom:'14px',fontSize:'13px',color:G.textSec}}>{t.dimTitle}</div>
                  {Object.entries(JSON.parse(selCandidate.scores)).map(([dim,val]:any)=>(
                    <div key={dim} style={{marginBottom:'12px'}}>
                      <div style={{display:'flex',justifyContent:'space-between',fontSize:'13px',marginBottom:'5px'}}>
                        <span style={{color:G.textSec}}>{t.dimLabels[dim as keyof typeof t.dimLabels]||dim}</span>
                        <span style={{fontWeight:700,color:DIM_COLORS[dim]||G.accent}}>{val}%</span>
                      </div>
                      <div style={{background:G.border,borderRadius:'99px',height:'5px',overflow:'hidden'}}>
                        <div style={{width:`${val}%`,height:'100%',background:DIM_COLORS[dim]||G.accent,borderRadius:'99px'}}/>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div style={{marginBottom:'20px',display:'flex',flexDirection:'column',gap:'8px'}}>
                {[{l:t.colField,v:selCandidate.field},{l:t.colSubField,v:selCandidate.sub_field},{l:t.colExp,v:selCandidate.experience},{l:t.colEdu,v:selCandidate.education},{l:t.colSkills,v:selCandidate.skills},{l:t.colLangs,v:selCandidate.languages},{l:t.colAchieve,v:selCandidate.achievement},{l:t.colIdeal,v:selCandidate.ideal_env},{l:t.colDeal,v:selCandidate.deal_breaker}].filter(d=>d.v).map(({l,v})=>(
                  <div key={l} style={{padding:'12px 16px',background:G.card,borderRadius:'10px',border:`1px solid ${G.border}`}}>
                    <div style={{fontSize:'10px',fontWeight:700,color:G.textHint,marginBottom:'4px'}}>{l}</div>
                    <div style={{fontSize:'13px',color:G.textSec,lineHeight:1.6}}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{marginBottom:'20px'}}>
                <div style={{fontWeight:700,marginBottom:'12px',fontSize:'13px',color:G.textSec}}>{t.changeStatus}</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
                  {t.statuses.map(s=>(
                    <button key={s} onClick={()=>updateStatus(selCandidate.id,s)} style={{padding:'7px 14px',borderRadius:'99px',border:`1px solid ${selCandidate.hr_status===s?G.accent:G.border}`,background:selCandidate.hr_status===s?G.accentGlow:G.card,cursor:'pointer',fontSize:'12px',fontWeight:700,fontFamily:FONT,color:selCandidate.hr_status===s?G.accent:G.textSec,transition:'all 0.15s'}}>{s}</button>
                  ))}
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                <button style={bs('primary',{padding:'13px',fontSize:'14px'})}>{t.contact}</button>
                <button style={bs('secondary',{padding:'13px',fontSize:'14px'})}>{t.schedule}</button>
                <button onClick={()=>updateStatus(selCandidate.id,lang==='ar'?'مرفوض':'Rejected')} style={bs('danger',{padding:'13px',fontSize:'14px'})}>{t.reject}</button>
              </div>
            </div>
          </div>
        )}
      </main>
    )
  }

  // ── MATCHES ──
  if(page==='matches')return(
    <main style={{minHeight:'100vh',background:G.bg,direction:dir,padding:'24px',fontFamily:FONT,position:'relative'}}>
      <Controls/>
      <div style={{maxWidth:'800px',margin:'0 auto',paddingTop:'16px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'28px'}}>
          <div><div style={{fontSize:'24px',fontWeight:900,color:G.textPri}}>{t.matchesTitle}</div><div style={{fontSize:'13px',color:G.textSec,marginTop:'4px'}}>{t.matchesSub}</div></div>
          <button onClick={()=>setPage('dashboard')} style={bs('secondary',{padding:'9px 20px',fontSize:'13px'})}>{t.back}</button>
        </div>
        {matches.length===0?(
          <div style={cs({padding:'72px',textAlign:'center'})}>
            <div style={{fontSize:'48px',marginBottom:'16px',opacity:0.4}}>🔍</div>
            <div style={{fontWeight:700,color:G.textPri,marginBottom:'8px'}}>{t.noMatches}</div>
            <div style={{color:G.textHint,fontSize:'14px'}}>{t.noMatchesDesc}</div>
          </div>
        ):matches.map((c,i)=>(
          <div key={c.id} className='fu' style={{...cs({padding:'24px',marginBottom:'12px',display:'flex',alignItems:'center',gap:'20px'}),animationDelay:`${i*0.05}s`}}>
            <div style={{width:'52px',height:'52px',borderRadius:'14px',background:G.accentGlow,border:`1px solid ${G.accent}20`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',flexShrink:0}}>🏢</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:800,fontSize:'16px',color:G.textPri,marginBottom:'4px'}}>{c.full_name||'—'}</div>
              <div style={{fontSize:'13px',color:G.textSec}}>{c.assessment_done?t.matchDone:t.matchNotDone}</div>
            </div>
            <div style={{textAlign:'center',flexShrink:0}}>
              <div style={{fontSize:'32px',fontWeight:900,color:mc(c.matchPct,darkMode),lineHeight:1}}>{c.matchPct}%</div>
              <div style={{fontSize:'11px',color:G.textHint,margin:'4px 0 12px'}}>{t.compatibility}</div>
              <button style={bs('primary',{padding:'8px 20px',fontSize:'12px'})}>{t.applyNow}</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )

  // ── DASHBOARD ──
  const myScores=profile?.scores?JSON.parse(profile.scores):null
  return(
    <main style={{minHeight:'100vh',background:G.bg,direction:dir,padding:'24px',fontFamily:FONT,position:'relative'}}>
      <Controls/>
      <div style={{maxWidth:'860px',margin:'0 auto',paddingTop:'16px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
            <div style={{width:'40px',height:'40px',borderRadius:'12px',background:G.accentGlow,border:`1px solid ${G.accent}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',fontWeight:900,color:G.accent}}>{(profile?.full_name||user?.email||'U')[0].toUpperCase()}</div>
            <div>
              <div style={{fontSize:'16px',fontWeight:700,color:G.textPri}}>{profile?.full_name||t.dashboard}</div>
              <div style={{fontSize:'12px',color:G.textSec}}>{isCompany?t.company:t.candidate}</div>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
            <div style={{fontSize:'20px',fontWeight:900,color:G.textPri}}>{t.appName}</div>
            <div style={{width:'1px',height:'24px',background:G.border}}/>
            <button onClick={handleSignOut} style={bs('ghost',{fontSize:'13px',color:G.textSec,padding:'8px 12px'})}>{t.signOut}</button>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'24px'}}>
          {[{l:t.assessment,v:profile?.assessment_done?t.completed:t.notStarted,dot:profile?.assessment_done?G.success:G.textHint},{l:t.matches,v:'—',dot:G.info},{l:t.requests,v:'0',dot:G.warning},{l:t.views,v:'0',dot:G.textHint}].map((s,i)=>(
            <div key={i} style={cs({padding:'18px'})}>
              <div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'10px'}}>
                <div style={{width:'6px',height:'6px',borderRadius:'50%',background:s.dot,flexShrink:0}}/>
                <div style={{fontSize:'11px',color:G.textHint}}>{s.l}</div>
              </div>
              <div style={{fontSize:'18px',fontWeight:900,color:s.v===t.completed?G.success:G.textPri}}>{s.v}</div>
            </div>
          ))}
        </div>
        {myScores&&(
          <div style={cs({padding:'28px',marginBottom:'20px'})}>
            <div style={{fontWeight:700,marginBottom:'20px',fontSize:'15px',color:G.textPri}}>{t.professionalProfile}</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'18px'}}>
              {Object.entries(myScores).map(([dim,val]:any)=>(
                <div key={dim}>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:'13px',marginBottom:'7px'}}>
                    <span style={{color:G.textSec}}>{t.dimLabels[dim as keyof typeof t.dimLabels]||dim}</span>
                    <span style={{fontWeight:700,color:DIM_COLORS[dim]||G.accent,fontSize:'14px'}}>{val}%</span>
                  </div>
                  <div style={{background:G.border,borderRadius:'99px',height:'5px',overflow:'hidden'}}>
                    <div style={{width:`${val}%`,height:'100%',background:DIM_COLORS[dim]||G.accent,borderRadius:'99px'}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'14px'}}>
          {!profile?.assessment_done&&(
            <div style={cs({padding:'32px',gridColumn:'1/-1',border:`1px solid ${G.accent}20`})}>
              <div style={{display:'flex',alignItems:'flex-start',gap:'20px'}}>
                <div style={{width:'56px',height:'56px',borderRadius:'16px',background:G.accentGlow,border:`1px solid ${G.accent}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px',flexShrink:0}}>🧭</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:'18px',fontWeight:900,color:G.textPri,marginBottom:'8px'}}>{t.startAssessment}</div>
                  <div style={{fontSize:'14px',color:G.textSec,lineHeight:1.8,marginBottom:'20px'}}>{t.startAssessmentDesc}</div>
                  <button onClick={()=>{setCurrentQ(0);setAnswers({});setAssessDone(false);setPage('assessment')}} style={bs('primary',{padding:'13px 28px',fontSize:'14px'})}>{t.startNow}</button>
                </div>
              </div>
            </div>
          )}
          {!isCompany&&(
            <div style={cs({padding:'28px'})}>
              <div style={{fontSize:'24px',marginBottom:'14px'}}>👤</div>
              <div style={{fontWeight:800,color:G.textPri,marginBottom:'6px',fontSize:'16px'}}>{t.profile}</div>
              <div style={{fontSize:'13px',color:G.textSec,marginBottom:'20px',lineHeight:1.7}}>{t.profileDesc}</div>
              <button onClick={()=>setPage('profile')} style={bs('secondary',{padding:'10px 22px',fontSize:'13px'})}>{t.editProfile}</button>
            </div>
          )}
          {profile?.assessment_done&&(isCompany?(
            <div style={cs({padding:'28px',border:`1px solid ${G.accent}15`})}>
              <div style={{fontSize:'24px',marginBottom:'14px'}}>👥</div>
              <div style={{fontWeight:800,color:G.textPri,marginBottom:'6px',fontSize:'16px'}}>{t.hrBoard}</div>
              <div style={{fontSize:'13px',color:G.textSec,marginBottom:'20px',lineHeight:1.7}}>{t.hrBoardDesc}</div>
              <button onClick={()=>{setPage('hr');loadCandidates()}} style={bs('primary',{padding:'10px 22px',fontSize:'13px'})}>{t.openBoard}</button>
            </div>
          ):(
            <div style={cs({padding:'28px',border:`1px solid ${G.accent}15`})}>
              <div style={{fontSize:'24px',marginBottom:'14px'}}>🎯</div>
              <div style={{fontWeight:800,color:G.textPri,marginBottom:'6px',fontSize:'16px'}}>{t.myMatches}</div>
              <div style={{fontSize:'13px',color:G.textSec,marginBottom:'20px',lineHeight:1.7}}>{t.matchesDesc}</div>
              <button onClick={()=>{setPage('matches');loadMatches()}} style={bs('primary',{padding:'10px 22px',fontSize:'13px'})}>{t.viewMatches}</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
