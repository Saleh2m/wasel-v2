'use client'
import { useState, useEffect } from 'react'
import { supabase } from './supabase'

// ═══════════════════════════════════════════
// TRANSLATIONS
// ═══════════════════════════════════════════
const T = {
  ar: {
    appName: 'وصل AI',
    tagline: 'منصة التوافق الوظيفي الذكي',
    heroTitle: 'اكتشف بيئة العمل\nالتي ستزدهر فيها',
    heroDesc: 'نربطك بالشركات التي تشاركك القيم والأسلوب والطموح',
    stats: ['+٥٠٠٠ باحث', '+٣٠٠ شركة', '٩٤٪ رضا'],
    signIn: 'تسجيل دخول', signUp: 'حساب جديد',
    email: 'البريد الإلكتروني', password: 'كلمة المرور',
    fullName: 'الاسم الكامل',
    continueGoogle: 'متابعة مع Google',
    continueApple: 'متابعة مع Apple',
    orEmail: 'أو بالبريد الإلكتروني',
    candidate: 'باحث عن عمل', company: 'شركة',
    candidateDesc: 'أبحث عن فرصة مناسبة', companyDesc: 'أبحث عن مواهب مناسبة',
    loginBtn: 'تسجيل الدخول', signupBtn: 'إنشاء الحساب مجاناً',
    noAccount: 'ليس لديك حساب؟', createAccount: 'أنشئ حساباً',
    loading: 'جاري التحقق...',
    dashboard: 'لوحة التحكم', signOut: 'خروج',
    assessment: 'التقييم', matches: 'التوافقات', requests: 'الطلبات', views: 'المشاهدات',
    completed: 'مكتمل', notStarted: 'لم يبدأ',
    professionalProfile: 'شخصيتك المهنية',
    startAssessment: 'ابدأ تقييمك المهني',
    startAssessmentDesc: '18 سؤالاً دقيقاً يكشفان شخصيتك المهنية ويوصلانك بالبيئة التي ستزدهر فيها. يستغرق 12 دقيقة فقط.',
    startNow: 'ابدأ التقييم الآن ←',
    profile: 'الملف المهني', editProfile: 'تعديل الملف',
    profileDesc: 'أكمل بياناتك لتحسين دقة التوافق وزيادة فرصك',
    hrBoard: 'لوحة الاستقطاب', openBoard: 'فتح اللوحة',
    hrBoardDesc: 'المرشحون مرتبون حسب توافقهم مع ثقافة شركتك',
    myMatches: 'توافقاتك المهنية', viewMatches: 'عرض التوافقات',
    matchesDesc: 'اكتشف الشركات التي تشاركك القيم والأسلوب والطموح',
    assessmentTitle: 'التقييم المهني',
    cancel: 'إلغاء', prev: '← السؤال السابق',
    questionOf: (c:number,t:number) => `السؤال ${c} من ${t}`,
    assessDoneTitle: 'اكتمل تقييمك!',
    assessDoneDesc: 'تم تحليل شخصيتك المهنية بنجاح. الآن يمكنك اكتشاف الشركات الأكثر توافقاً معك.',
    viewMatches2: 'عرض التوافقات', backDash: 'لوحة التحكم',
    profileTitle: 'الملف المهني', profileSub: 'كلما كان ملفك أكتمل، كانت التوافقات أدق',
    back: 'رجوع', saveProfile: 'حفظ الملف المهني', savedProfile: '✓ تم الحفظ بنجاح',
    cvUpload: 'السيرة الذاتية', cvDesc: 'ارفع ملف PDF — الحد الأقصى 5MB',
    clickUpload: 'اضغط لاختيار الملف', pdfOnly: 'PDF فقط',
    fieldTitle: 'المجال والتخصص', selectField: 'اختر المجال الوظيفي',
    selectSub: 'اختر التخصص الدقيق', selectTitle: 'المسمى الوظيفي',
    regionsTitle: 'المناطق المفضلة للعمل', regionsDesc: 'اختر كل المناطق التي تناسبك',
    detailsTitle: 'التفاصيل المهنية',
    skills: 'المهارات', skillsPh: 'React، Python، إدارة المشاريع',
    langs: 'اللغات', langsPh: 'العربية، الإنجليزية',
    exp: 'سنوات الخبرة', expPh: 'مثال: 5 سنوات',
    edu: 'المؤهل التعليمي', eduPh: 'بكالوريوس علوم حاسب',
    achieve: 'أبرز إنجاز', achievePh: 'اذكر إنجازاً مهنياً مميزاً يعكس قيمتك الحقيقية',
    ideal: 'البيئة المثالية لك', idealPh: 'صف بيئة العمل التي تزدهر فيها وتعطي أفضل ما لديك',
    dealBreaker: 'ما لن تقبله أبداً', dealBreakerPh: 'ما الذي يجعلك ترفض عرض العمل فوراً؟',
    hrTitle: 'لوحة الاستقطاب', hrSub: (n:number) => `${n} مرشح • مرتبون حسب نسبة التوافق`,
    refresh: 'تحديث', allFields: 'كل المجالات', allStatus: 'كل الحالات',
    colCandidate: 'المرشح', colField: 'المجال', colTitle2: 'المسمى', colRegion: 'المنطقة',
    colMatch: 'التوافق', colStatus: 'الحالة',
    details: 'تفاصيل', loadingCandidates: 'جاري التحميل...', noCandidates: 'لا يوجد مرشحون بعد',
    matchScore: 'نسبة التوافق مع شركتك',
    dimTitle: 'الأبعاد المهنية', changeStatus: 'تغيير الحالة',
    contact: 'تواصل مع المرشح', schedule: 'جدولة مقابلة', reject: 'رفض المرشح',
    statuses: ['جديد','قيد المراجعة','مقابلة','مقبول','مرفوض'],
    matchesTitle: 'توافقاتك المهنية', matchesSub: 'الشركات الأكثر توافقاً مع شخصيتك',
    noMatches: 'لا توجد شركات بعد', noMatchesDesc: 'ستظهر هنا الشركات عند تسجيلها في المنصة',
    matchDone: '✓ أكملت التقييم المهني', matchNotDone: 'لم تكمل التقييم بعد',
    compatibility: 'توافق', applyNow: 'تقدم الآن',
    colSubField: 'التخصص', colExp: 'الخبرة', colEdu: 'التعليم',
    colSkills: 'المهارات', colLangs: 'اللغات', colAchieve: 'أبرز إنجاز',
    colIdeal: 'البيئة المثالية', colDeal: 'لن يقبله أبداً',
    accountType: 'نوع الحساب',
    dimLabels: { work_style:'أسلوب العمل', decision:'اتخاذ القرار', culture:'الثقافة', motivation:'الدوافع', leadership:'القيادة' },
  },
  en: {
    appName: 'Wasel AI',
    tagline: 'Smart Career Matching Platform',
    heroTitle: 'Discover the work\nenvironment where you thrive',
    heroDesc: 'We connect you with companies that share your values, style, and ambition',
    stats: ['+5000 Seekers', '+300 Companies', '94% Satisfaction'],
    signIn: 'Sign In', signUp: 'New Account',
    email: 'Email Address', password: 'Password',
    fullName: 'Full Name',
    continueGoogle: 'Continue with Google',
    continueApple: 'Continue with Apple',
    orEmail: 'Or with email',
    candidate: 'Job Seeker', company: 'Company',
    candidateDesc: 'Looking for the right opportunity', companyDesc: 'Looking for the right talent',
    loginBtn: 'Sign In', signupBtn: 'Create Free Account',
    noAccount: "Don't have an account?", createAccount: 'Create one',
    loading: 'Verifying...',
    dashboard: 'Dashboard', signOut: 'Sign Out',
    assessment: 'Assessment', matches: 'Matches', requests: 'Requests', views: 'Views',
    completed: 'Completed', notStarted: 'Not Started',
    professionalProfile: 'Your Professional Profile',
    startAssessment: 'Start Your Professional Assessment',
    startAssessmentDesc: '18 precise questions that reveal your professional personality and connect you with your ideal work environment. Takes only 12 minutes.',
    startNow: 'Start Assessment Now →',
    profile: 'Professional Profile', editProfile: 'Edit Profile',
    profileDesc: 'Complete your profile to improve match accuracy and increase your chances',
    hrBoard: 'Recruitment Board', openBoard: 'Open Board',
    hrBoardDesc: 'Candidates ranked by compatibility with your company culture',
    myMatches: 'Your Professional Matches', viewMatches: 'View Matches',
    matchesDesc: 'Discover companies that share your values, style, and ambition',
    assessmentTitle: 'Professional Assessment',
    cancel: 'Cancel', prev: '← Previous Question',
    questionOf: (c:number,t:number) => `Question ${c} of ${t}`,
    assessDoneTitle: 'Assessment Complete!',
    assessDoneDesc: 'Your professional personality has been successfully analyzed. Now discover the most compatible companies.',
    viewMatches2: 'View Matches', backDash: 'Dashboard',
    profileTitle: 'Professional Profile', profileSub: 'The more complete your profile, the more accurate your matches',
    back: 'Back', saveProfile: 'Save Profile', savedProfile: '✓ Saved Successfully',
    cvUpload: 'Resume / CV', cvDesc: 'Upload PDF — Max 5MB',
    clickUpload: 'Click to choose file', pdfOnly: 'PDF only',
    fieldTitle: 'Field & Specialization', selectField: 'Select your field',
    selectSub: 'Select specialization', selectTitle: 'Job Title',
    regionsTitle: 'Preferred Work Regions', regionsDesc: 'Select all regions that work for you',
    detailsTitle: 'Professional Details',
    skills: 'Skills', skillsPh: 'React, Python, Project Management',
    langs: 'Languages', langsPh: 'Arabic, English',
    exp: 'Years of Experience', expPh: 'e.g. 5 years',
    edu: 'Education', eduPh: "Bachelor's in Computer Science",
    achieve: 'Top Achievement', achievePh: 'Share a professional achievement that reflects your true value',
    ideal: 'Ideal Environment', idealPh: 'Describe the work environment where you thrive and give your best',
    dealBreaker: 'Deal Breaker', dealBreakerPh: 'What would make you instantly reject a job offer?',
    hrTitle: 'Recruitment Board', hrSub: (n:number) => `${n} candidates • Ranked by compatibility`,
    refresh: 'Refresh', allFields: 'All Fields', allStatus: 'All Statuses',
    colCandidate: 'Candidate', colField: 'Field', colTitle2: 'Title', colRegion: 'Region',
    colMatch: 'Match', colStatus: 'Status',
    details: 'Details', loadingCandidates: 'Loading...', noCandidates: 'No candidates yet',
    matchScore: 'Match score with your company',
    dimTitle: 'Professional Dimensions', changeStatus: 'Change Status',
    contact: 'Contact Candidate', schedule: 'Schedule Interview', reject: 'Reject Candidate',
    statuses: ['New','Under Review','Interview','Accepted','Rejected'],
    matchesTitle: 'Your Professional Matches', matchesSub: 'Companies most compatible with your personality',
    noMatches: 'No companies yet', noMatchesDesc: 'Companies will appear here once they register on the platform',
    matchDone: '✓ Completed assessment', matchNotDone: 'Assessment not completed',
    compatibility: 'match', applyNow: 'Apply Now',
    colSubField: 'Specialization', colExp: 'Experience', colEdu: 'Education',
    colSkills: 'Skills', colLangs: 'Languages', colAchieve: 'Top Achievement',
    colIdeal: 'Ideal Environment', colDeal: 'Deal Breaker',
    accountType: 'Account Type',
    dimLabels: { work_style:'Work Style', decision:'Decision Making', culture:'Culture', motivation:'Motivation', leadership:'Leadership' },
  }
}

// ═══════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════
const REGIONS_AR = ['الرياض','جدة','مكة المكرمة','المدينة المنورة','الدمام','الخبر','الأحساء','تبوك','أبها','القصيم','حائل','جازان','نجران','الباحة','الجوف','عرعر','سكاكا','ينبع','القطيف','الطائف']
const REGIONS_EN = ['Riyadh','Jeddah','Mecca','Medina','Dammam','Khobar','Ahsa','Tabuk','Abha','Qassim','Hail','Jazan','Najran','Baha','Jouf','Arar','Sakaka','Yanbu','Qatif','Taif']

const FIELDS_AR = [
  { name:'تقنية المعلومات', subs:['هندسة البرمجيات','علوم البيانات','الذكاء الاصطناعي','الأمن السيبراني','تطوير الويب','تطوير التطبيقات','DevOps','الحوسبة السحابية'] },
  { name:'المالية والمحاسبة', subs:['المحاسبة العامة','المراجعة الداخلية','التحليل المالي','إدارة المخاطر','التمويل الإسلامي'] },
  { name:'الموارد البشرية', subs:['التوظيف والاستقطاب','التدريب والتطوير','إدارة الأداء','تخطيط القوى العاملة'] },
  { name:'التسويق والمبيعات', subs:['التسويق الرقمي','إدارة المبيعات','العلاقات العامة','تسويق المحتوى'] },
  { name:'الهندسة', subs:['الهندسة المدنية','الهندسة الكهربائية','الهندسة الميكانيكية','هندسة المعمار'] },
  { name:'الصحة والطب', subs:['الطب العام','التمريض','الصيدلة','إدارة المستشفيات'] },
  { name:'التعليم', subs:['التدريس','الإدارة التعليمية','تطوير المناهج','التعليم الإلكتروني'] },
  { name:'القانون', subs:['المحاماة','الاستشارات القانونية','قانون الأعمال','الامتثال والحوكمة'] },
]
const FIELDS_EN = [
  { name:'Information Technology', subs:['Software Engineering','Data Science','Artificial Intelligence','Cybersecurity','Web Development','App Development','DevOps','Cloud Computing'] },
  { name:'Finance & Accounting', subs:['General Accounting','Internal Audit','Financial Analysis','Risk Management','Islamic Finance'] },
  { name:'Human Resources', subs:['Recruitment','Training & Development','Performance Management','Workforce Planning'] },
  { name:'Marketing & Sales', subs:['Digital Marketing','Sales Management','Public Relations','Content Marketing'] },
  { name:'Engineering', subs:['Civil Engineering','Electrical Engineering','Mechanical Engineering','Architecture'] },
  { name:'Healthcare', subs:['General Medicine','Nursing','Pharmacy','Hospital Management'] },
  { name:'Education', subs:['Teaching','Educational Administration','Curriculum Development','E-Learning'] },
  { name:'Law', subs:['Legal Practice','Legal Consulting','Business Law','Compliance & Governance'] },
]
const TITLES_AR = ['مطور برمجيات','محلل بيانات','مهندس ذكاء اصطناعي','مدير مشروع','محاسب قانوني','محلل مالي','مدير موارد بشرية','مسوق رقمي','مهندس مدني','طبيب عام','ممرض','صيدلاني','مدرس','محامي','مدير مبيعات','مهندس شبكات','مطور تطبيقات','مصمم UX/UI','مدير عمليات','مستشار أعمال']
const TITLES_EN = ['Software Developer','Data Analyst','AI Engineer','Project Manager','CPA','Financial Analyst','HR Manager','Digital Marketer','Civil Engineer','General Physician','Nurse','Pharmacist','Teacher','Lawyer','Sales Manager','Network Engineer','App Developer','UX/UI Designer','Operations Manager','Business Consultant']

const QUESTIONS_AR = [
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
const QUESTIONS_EN = [
  { id:1, dim:'work_style', text:'When you start a new project, what is the first thing you do?', options:['Create a detailed plan before any step','Start with small steps and adjust along the way','Talk to the team to understand expectations','Research similar successful examples'] },
  { id:2, dim:'decision', text:'When facing a tough decision with incomplete information, what do you do?', options:['Wait until information is complete','Make the best decision with available information','Consult relevant stakeholders first','Present multiple options to management'] },
  { id:3, dim:'culture', text:'What work environment makes you most productive?', options:['Organized environment with clear roles','Flexible environment encouraging creativity','Collaborative team environment','Competitive environment rewarding excellence'] },
  { id:4, dim:'motivation', text:'What gives you the greatest satisfaction at work?', options:['Solving a complex problem no one has solved','Leading a team to achieve a difficult goal','Building something from scratch that people can see','Continuous professional growth and learning'] },
  { id:5, dim:'work_style', text:'How do you handle multiple tasks simultaneously?', options:['Complete one task fully before moving to the next','Distribute time between tasks in parallel','Delegate what you can and focus on the most important','Prioritize by importance and deadlines'] },
  { id:6, dim:'leadership', text:'In team settings, what is your natural role?', options:['Lead and set direction','Execute and ensure quality','Coordinate and resolve conflicts','Innovate and propose new ideas'] },
  { id:7, dim:'culture', text:'How do you prefer to receive feedback?', options:['Direct and honest immediately','Written and detailed after reflection','In organized periodic meetings','Informally in daily conversation'] },
  { id:8, dim:'decision', text:'How do you handle disagreements with a colleague?', options:['Present data and logical arguments','Find a compromise that satisfies both','Refer the matter to management','Adopt their view if they have more experience'] },
  { id:9, dim:'motivation', text:'What does a professional promotion mean to you?', options:['More responsibility and broader impact','Higher salary and recognition of effort','Opportunity to develop new skills','Leading my own team'] },
  { id:10, dim:'work_style', text:'How do you handle tight deadlines?', options:['Work overtime until the work is done','Reduce quality where possible to deliver on time','Negotiate for a deadline extension','Ask the team for immediate help'] },
  { id:11, dim:'culture', text:'How important are social relationships with colleagues?', options:['Essential — the team is like family','Important but remain professional','Secondary — work is the priority','Depends on the colleague\'s personality'] },
  { id:12, dim:'leadership', text:'How do you handle a colleague with poor performance?', options:['Talk to them directly and create an improvement plan','Give them tasks suited to their abilities','Report to management for appropriate action','Help them personally until they improve'] },
  { id:13, dim:'motivation', text:'What makes you stay in a job for more than 3 years?', options:['Renewed projects and ongoing challenges','A great team you enjoy being with','Competitive salary and good benefits','Clear path for growth and advancement'] },
  { id:14, dim:'decision', text:'How do you handle professional risks?', options:['Study them deeply before any decision','Accept them if the reward is worth it','Avoid them as much as possible','Share the risk with the team'] },
  { id:15, dim:'work_style', text:'What is your approach to learning and development?', options:['Organized courses and certified credentials','Self-learning from diverse sources','Learning through experience and application','Learning from mentors and experts'] },
  { id:16, dim:'culture', text:'What is your view on fully remote work?', options:['Prefer it — more productive without interruptions','Prefer hybrid — some days in office, some remote','Prefer the office — need the professional environment','Location doesn\'t matter if tools are available'] },
  { id:17, dim:'leadership', text:'What leadership style do you work best under?', options:['Directive with clear instructions','Delegative with autonomy','Participative involving the team','Coaching focused on development'] },
  { id:18, dim:'motivation', text:'How do you define professional success for yourself?', options:['Achieving tangible measurable goals','Positive impact on those around you','Reaching a prestigious leadership position','Achieving work-life balance'] },
]

const DIM_COLORS: Record<string,string> = { work_style:'#34D399', decision:'#60A5FA', culture:'#F97316', motivation:'#A78BFA', leadership:'#FBBF24' }

function calcScores(ans: Record<number,number>, qs: typeof QUESTIONS_AR) {
  const d: Record<string,number[]> = {}
  qs.forEach(q => { if (!d[q.dim]) d[q.dim]=[]; if (ans[q.id]!==undefined) d[q.dim].push(ans[q.id]) })
  const r: Record<string,number> = {}
  Object.entries(d).forEach(([k,v]) => { r[k]=Math.round((v.reduce((a:number,b:number)=>a+b,0)/(v.length*3))*100) })
  return r
}
function calcMatch(a:Record<string,number>, b:Record<string,number>) {
  const k=Object.keys(a); if(!k.length) return 0
  return Math.round(k.reduce((t,k)=>t+(100-Math.abs((a[k]||0)-(b[k]||0))),0)/k.length)
}
function matchColor(pct:number, dark:boolean) {
  return pct>=85?'#34D399':pct>=65?'#FBBF24':dark?'#6B7280':'#9CA3AF'
}

// ═══════════════════════════════════════════
// THEMES
// ═══════════════════════════════════════════
function getTheme(dark: boolean) {
  return dark ? {
    bg:'#080A09', surface:'#0E1210', card:'#131816', cardHover:'#171D1A',
    overlay:'rgba(0,0,0,0.85)', accent:'#00DC82', accentDim:'#00A862',
    accentGlow:'rgba(0,220,130,0.12)', textPri:'#F0FDF4', textSec:'#8FA89A',
    textHint:'#4A5C51', border:'#1E2822', borderMid:'#283330',
    success:'#34D399', warning:'#FBBF24', danger:'#F87171', info:'#60A5FA',
  } : {
    bg:'#F8FAF9', surface:'#FFFFFF', card:'#FFFFFF', cardHover:'#F0FDF4',
    overlay:'rgba(0,0,0,0.5)', accent:'#16A34A', accentDim:'#15803D',
    accentGlow:'rgba(22,163,74,0.08)', textPri:'#0A0F0C', textSec:'#4B5563',
    textHint:'#9CA3AF', border:'#E5E7EB', borderMid:'#D1D5DB',
    success:'#16A34A', warning:'#D97706', danger:'#DC2626', info:'#2563EB',
  }
}

// ═══════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════
export default function WaselApp() {
  type Page = 'auth'|'dashboard'|'assessment'|'hr'|'matches'|'profile'
  type Lang = 'ar'|'en'

  const [page, setPage] = useState<Page>('auth')
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [lang, setLang] = useState<Lang>('ar')
  const [darkMode, setDarkMode] = useState(true)

  const t = T[lang]
  const G = getTheme(darkMode)
  const FONT = lang==='ar' ? `'IBM Plex Sans Arabic', sans-serif` : `'Inter', sans-serif`
  const dir = lang==='ar' ? 'rtl' : 'ltr'
  const FIELDS = lang==='ar' ? FIELDS_AR : FIELDS_EN
  const REGIONS = lang==='ar' ? REGIONS_AR : REGIONS_EN
  const TITLES = lang==='ar' ? TITLES_AR : TITLES_EN
  const QUESTIONS = lang==='ar' ? QUESTIONS_AR : QUESTIONS_EN

  // Auth state
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

  // Profile
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
  const [matches, setMatches] = useState<any[]>([])

  useEffect(() => {
    const fontLink = document.createElement('link')
    fontLink.rel = 'stylesheet'
    fontLink.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;700;900&family=Inter:wght@300;400;500;700;900&display=swap'
    document.head.appendChild(fontLink)

    const style = document.createElement('style')
    style.id = 'wasel-styles'
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

  useEffect(() => {
    const el = document.getElementById('wasel-styles')
    if (el) el.textContent = `
      *{box-sizing:border-box;margin:0;padding:0;}
      body{background:${G.bg};font-family:${FONT};direction:${dir};}
      input,select,textarea{font-family:${FONT}!important;direction:${dir};}
      input:focus,select:focus,textarea:focus{outline:none;border-color:${G.accent}!important;box-shadow:0 0 0 3px ${G.accentGlow}!important;}
      input::placeholder,textarea::placeholder{color:${G.textHint};}
      select option{background:${G.card};color:${G.textPri};}
      ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:${G.bg};}::-webkit-scrollbar-thumb{background:${G.border};border-radius:4px;}
      @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
      @keyframes slidePanel{from{transform:${dir==='rtl'?'translateX(-100%)':'translateX(100%)'}}to{transform:none}}
      .fade-up{animation:fadeUp 0.3s ease forwards;}
      .slide-panel{animation:slidePanel 0.3s cubic-bezier(0.32,0.72,0,1) forwards;}
    `
  }, [darkMode, lang])

  const inp: React.CSSProperties = { width:'100%', padding:'13px 16px', borderRadius:'10px', border:`1.5px solid ${G.border}`, background:G.surface, color:G.textPri, fontSize:'14px', transition:'border-color 0.2s' }
  const card = (extra:any={}):React.CSSProperties => ({ background:G.card, borderRadius:'16px', border:`1px solid ${G.border}`, ...extra })
  const btn = (v:'primary'|'secondary'|'ghost'|'danger'='primary', extra:any={}):React.CSSProperties => ({
    padding:'12px 24px', borderRadius:'10px', border:'none', cursor:'pointer', fontWeight:700, fontSize:'14px', fontFamily:FONT, transition:'all 0.18s',
    ...(v==='primary'?{background:G.accent,color:darkMode?'#001A0D':'#fff'}:
        v==='secondary'?{background:G.surface,color:G.textPri,border:`1px solid ${G.border}`}:
        v==='danger'?{background:'rgba(248,113,113,0.12)',color:G.danger,border:`1px solid rgba(248,113,113,0.25)`}:
        {background:'transparent',color:G.textSec,border:'none'}),
    ...extra
  })

  async function signInWith(provider:'google'|'apple') {
    await supabase.auth.signInWithOAuth({ provider, options:{redirectTo:window.location.origin} })
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
    const scores=calcScores(answers, QUESTIONS)
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

  // ── Controls Bar ──
  const ControlsBar = () => (
    <div style={{position:'fixed',top:'16px',left:dir==='rtl'?'16px':'auto',right:dir==='ltr'?'16px':'auto',display:'flex',gap:'8px',zIndex:500}}>
      <button onClick={()=>setLang(l=>l==='ar'?'en':'ar')} style={{...btn('secondary',{padding:'7px 14px',fontSize:'12px',fontWeight:700,borderRadius:'8px'})}}>
        {lang==='ar'?'EN':'عربي'}
      </button>
      <button onClick={()=>setDarkMode(d=>!d)} style={{...btn('secondary',{padding:'7px 12px',fontSize:'14px',borderRadius:'8px',minWidth:'36px'})}}>
        {darkMode?'☀️':'🌙'}
      </button>
    </div>
  )

  if (loading) return (
    <div style={{minHeight:'100vh',background:G.bg,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'16px'}}>
        <div style={{width:'48px',height:'48px',borderRadius:'14px',background:G.accentGlow,border:`1px solid ${G.accent}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',fontWeight:900,color:G.accent,fontFamily:FONT}}>و</div>
      </div>
    </div>
  )

  // ── AUTH ──
  if (page==='auth') return (
    <main style={{minHeight:'100vh',background:G.bg,display:'flex',direction:dir,overflow:'hidden',fontFamily:FONT,position:'relative'}}>
      <ControlsBar/>
      <div style={{flex:1,background:darkMode?`linear-gradient(135deg,#0A0F0C,#0E1A13)`:G.surface,padding:'60px',display:'flex',flexDirection:'column',justifyContent:'space-between',borderLeft:dir==='rtl'?`1px solid ${G.border}`:'none',borderRight:dir==='ltr'?`1px solid ${G.border}`:'none',minWidth:0}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{width:'40px',height:'40px',borderRadius:'12px',background:G.accentGlow,border:`1px solid ${G.accent}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',fontWeight:900,color:G.accent}}>{lang==='ar'?'و':'W'}</div>
          <div style={{fontSize:'20px',fontWeight:900,color:G.textPri}}>{t.appName}</div>
        </div>
        <div>
          <div style={{fontSize:'42px',fontWeight:900,color:G.textPri,lineHeight:1.3,marginBottom:'20px',whiteSpace:'pre-line'}}>{t.heroTitle}</div>
          <div style={{fontSize:'16px',color:G.textSec,lineHeight:1.8,marginBottom:'40px'}}>{t.heroDesc}</div>
          <div style={{display:'flex',gap:'32px'}}>
            {t.stats.map((s,i)=>(
              <div key={i}>
                <div style={{fontSize:'24px',fontWeight:900,color:G.accent}}>{s.split(' ')[0]}</div>
                <div style={{fontSize:'12px',color:G.textHint,marginTop:'4px'}}>{s.split(' ').slice(1).join(' ')}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{fontSize:'12px',color:G.textHint}}>© 2026 {t.appName}</div>
      </div>

      <div style={{width:'460px',flexShrink:0,padding:'60px 48px',display:'flex',flexDirection:'column',justifyContent:'center',overflow:'auto',background:G.bg}}>
        <div style={{marginBottom:'32px'}}>
          <div style={{fontSize:'28px',fontWeight:900,color:G.textPri,marginBottom:'8px'}}>{isLogin?t.signIn:t.signUp}</div>
          <div style={{fontSize:'14px',color:G.textSec}}>{isLogin?t.tagline:t.signUp}</div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'20px'}}>
          {[{provider:'google' as const,label:t.continueGoogle,icon:<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>},
           {provider:'apple' as const,label:t.continueApple,icon:<svg width="18" height="18" viewBox="0 0 24 24" fill={G.textPri}><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>}].map(({provider,label,icon})=>(
            <button key={provider} onClick={()=>signInWith(provider)} style={{...btn('secondary',{padding:'13px 20px',display:'flex',alignItems:'center',justifyContent:'center',gap:'12px',width:'100%',fontSize:'14px'})}}>
              {icon}{label}
            </button>
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
                {[{v:'candidate',l:t.candidate,icon:'👤',d:t.candidateDesc},{v:'company',l:t.company,icon:'🏢',d:t.companyDesc}].map(opt=>(
                  <button key={opt.v} onClick={()=>setRole(opt.v as any)} style={{padding:'14px 12px',borderRadius:'12px',border:`1.5px solid ${role===opt.v?G.accent:G.border}`,background:role===opt.v?G.accentGlow:G.surface,cursor:'pointer',textAlign:dir==='rtl'?'right':'left',fontFamily:FONT,transition:'all 0.2s'}}>
                    <div style={{fontSize:'18px',marginBottom:'6px'}}>{opt.icon}</div>
                    <div style={{fontSize:'13px',fontWeight:700,color:role===opt.v?G.accent:G.textPri,marginBottom:'2px'}}>{opt.l}</div>
                    <div style={{fontSize:'11px',color:G.textHint}}>{opt.d}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          {authMsg&&<div style={{padding:'12px 16px',borderRadius:'10px',background:'rgba(248,113,113,0.08)',border:'1px solid rgba(248,113,113,0.2)',color:G.danger,fontSize:'13px',display:'flex',alignItems:'center',gap:'8px'}}>⚠ {authMsg}</div>}
          <button onClick={handleAuth} disabled={authLoading} style={{...btn('primary',{padding:'14px',fontSize:'15px',opacity:authLoading?0.7:1,width:'100%',borderRadius:'12px'})}}>{authLoading?t.loading:isLogin?t.loginBtn:t.signupBtn}</button>
          {isLogin&&<div style={{textAlign:'center',fontSize:'13px',color:G.textHint}}>{t.noAccount} <button onClick={()=>setIsLogin(false)} style={{background:'none',border:'none',color:G.accent,cursor:'pointer',fontWeight:700,fontFamily:FONT,fontSize:'13px'}}>{t.createAccount}</button></div>}
        </div>
      </div>
    </main>
  )

  // ── ASSESSMENT ──
  if (page==='assessment') {
    if (assessDone) return (
      <main style={{minHeight:'100vh',background:G.bg,display:'flex',alignItems:'center',justifyContent:'center',direction:dir,padding:'24px',fontFamily:FONT,position:'relative'}}>
        <ControlsBar/>
        <div className='fade-up' style={card({padding:'56px',maxWidth:'500px',width:'100%',textAlign:'center'})}>
          <div style={{width:'80px',height:'80px',borderRadius:'24px',background:G.accentGlow,border:`1px solid ${G.accent}40`,margin:'0 auto 24px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'36px'}}>🎯</div>
          <div style={{fontSize:'28px',fontWeight:900,color:G.textPri,marginBottom:'12px'}}>{t.assessDoneTitle}</div>
          <div style={{color:G.textSec,marginBottom:'36px',lineHeight:1.8,fontSize:'15px'}}>{t.assessDoneDesc}</div>
          <div style={{display:'flex',gap:'12px',justifyContent:'center'}}>
            <button onClick={()=>{setPage('matches');loadMatches()}} style={btn('primary',{padding:'13px 28px'})}>{t.viewMatches2}</button>
            <button onClick={()=>setPage('dashboard')} style={btn('secondary',{padding:'13px 28px'})}>{t.backDash}</button>
          </div>
        </div>
      </main>
    )
    const q=QUESTIONS[currentQ]
    const prog=Math.round((currentQ/QUESTIONS.length)*100)
    return (
      <main style={{minHeight:'100vh',background:G.bg,direction:dir,padding:'24px',fontFamily:FONT,position:'relative'}}>
        <ControlsBar/>
        <div style={{maxWidth:'640px',margin:'0 auto'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'40px',paddingTop:'16px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <div style={{width:'32px',height:'32px',borderRadius:'9px',background:G.accentGlow,border:`1px solid ${G.accent}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:900,color:G.accent}}>{lang==='ar'?'و':'W'}</div>
              <span style={{fontSize:'16px',fontWeight:900,color:G.textPri}}>{t.assessmentTitle}</span>
            </div>
            <button onClick={()=>setPage('dashboard')} style={btn('ghost',{fontSize:'13px',color:G.textHint})}>{t.cancel}</button>
          </div>
          <div style={{marginBottom:'36px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
              <span style={{fontSize:'13px',color:G.textSec,fontWeight:500}}>{t.questionOf(currentQ+1,QUESTIONS.length)}</span>
              <span style={{fontSize:'13px',fontWeight:700,color:G.accent}}>{prog}%</span>
            </div>
            <div style={{background:G.border,borderRadius:'99px',height:'5px',overflow:'hidden'}}>
              <div style={{width:`${prog}%`,height:'100%',background:G.accent,borderRadius:'99px',transition:'width 0.4s ease'}}/>
            </div>
          </div>
          <div className='fade-up' key={currentQ} style={card({padding:'40px',marginBottom:'20px'})}>
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
          {currentQ>0&&<button onClick={()=>setCurrentQ(currentQ-1)} style={btn('ghost',{fontSize:'13px',color:G.textHint})}>{t.prev}</button>}
        </div>
      </main>
    )
  }

  // ── PROFILE ──
  if (page==='profile') return (
    <main style={{minHeight:'100vh',background:G.bg,direction:dir,padding:'24px',fontFamily:FONT,position:'relative'}}>
      <ControlsBar/>
      <div style={{maxWidth:'720px',margin:'0 auto',paddingTop:'16px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'28px'}}>
          <div>
            <div style={{fontSize:'22px',fontWeight:900,color:G.textPri}}>{t.profileTitle}</div>
            <div style={{fontSize:'13px',color:G.textSec,marginTop:'4px'}}>{t.profileSub}</div>
          </div>
          <button onClick={()=>setPage('dashboard')} style={btn('secondary',{padding:'9px 20px',fontSize:'13px'})}>{t.back}</button>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          <div style={card({padding:'24px'})}>
            <div style={{fontWeight:700,color:G.textPri,marginBottom:'4px',fontSize:'15px'}}>{t.cvUpload}</div>
            <div style={{fontSize:'12px',color:G.textHint,marginBottom:'16px'}}>{t.cvDesc}</div>
            <label style={{display:'flex',alignItems:'center',gap:'16px',padding:'18px',borderRadius:'12px',border:`2px dashed ${cvFile?G.accent:G.border}`,cursor:'pointer',background:cvFile?G.accentGlow:G.surface,transition:'all 0.2s'}}>
              <div style={{width:'44px',height:'44px',borderRadius:'12px',background:G.border,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>📎</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:'14px',color:cvFile?G.accent:G.textPri}}>{cvFile?cvFile.name:t.clickUpload}</div>
                <div style={{fontSize:'12px',color:G.textHint,marginTop:'2px'}}>{t.pdfOnly}</div>
              </div>
              {cvFile&&<span style={{color:G.accent,fontWeight:700,fontSize:'13px'}}>✓</span>}
              <input type='file' accept='.pdf' style={{display:'none'}} onChange={e=>e.target.files&&setCvFile(e.target.files[0])}/>
            </label>
          </div>
          <div style={card({padding:'24px'})}>
            <div style={{fontWeight:700,color:G.textPri,marginBottom:'16px',fontSize:'15px'}}>{t.fieldTitle}</div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              <select value={selField} onChange={e=>{setSelField(e.target.value);setSelSub('')}} style={{...inp}}><option value=''>{t.selectField}</option>{FIELDS.map(f=><option key={f.name} value={f.name}>{f.name}</option>)}</select>
              {selField&&<select value={selSub} onChange={e=>setSelSub(e.target.value)} style={{...inp}}><option value=''>{t.selectSub}</option>{FIELDS.find(f=>f.name===selField)?.subs.map(s=><option key={s} value={s}>{s}</option>)}</select>}
              <select value={selTitle} onChange={e=>setSelTitle(e.target.value)} style={{...inp}}><option value=''>{t.selectTitle}</option>{TITLES.map(tt=><option key={tt} value={tt}>{tt}</option>)}</select>
            </div>
          </div>
          <div style={card({padding:'24px'})}>
            <div style={{fontWeight:700,color:G.textPri,marginBottom:'4px',fontSize:'15px'}}>{t.regionsTitle}</div>
            <div style={{fontSize:'12px',color:G.textHint,marginBottom:'16px'}}>{t.regionsDesc}</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
              {REGIONS.map(r=>(
                <button key={r} onClick={()=>setSelRegions(p=>p.includes(r)?p.filter(x=>x!==r):[...p,r])} style={{padding:'7px 16px',borderRadius:'99px',border:`1px solid ${selRegions.includes(r)?G.accent:G.border}`,background:selRegions.includes(r)?G.accentGlow:G.surface,cursor:'pointer',fontSize:'13px',fontWeight:selRegions.includes(r)?700:400,color:selRegions.includes(r)?G.accent:G.textSec,fontFamily:FONT,transition:'all 0.15s'}}>{r}</button>
              ))}
            </div>
          </div>
          <div style={card({padding:'24px'})}>
            <div style={{fontWeight:700,color:G.textPri,marginBottom:'20px',fontSize:'15px'}}>{t.detailsTitle}</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'16px'}}>
              {[{l:t.skills,v:skills,s:setSkills,p:t.skillsPh},{l:t.langs,v:langs,s:setLangs,p:t.langsPh},{l:t.exp,v:experience,s:setExperience,p:t.expPh},{l:t.edu,v:education,s:setEducation,p:t.eduPh}].map(({l,v,s,p})=>(
                <div key={l}>
                  <div style={{fontSize:'12px',fontWeight:700,color:G.textSec,marginBottom:'8px'}}>{l}</div>
                  <textarea value={v} onChange={e=>s(e.target.value)} placeholder={p} rows={2} style={{...inp,resize:'vertical'}}/>
                </div>
              ))}
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              {[{l:t.achieve,v:achievement,s:setAchievement,p:t.achievePh},{l:t.ideal,v:idealEnv,s:setIdealEnv,p:t.idealPh},{l:t.dealBreaker,v:dealBreaker,s:setDealBreaker,p:t.dealBreakerPh}].map(({l,v,s,p})=>(
                <div key={l}>
                  <div style={{fontSize:'12px',fontWeight:700,color:G.textSec,marginBottom:'8px'}}>{l}</div>
                  <textarea value={v} onChange={e=>s(e.target.value)} placeholder={p} rows={2} style={{...inp,resize:'vertical'}}/>
                </div>
              ))}
            </div>
          </div>
          <button onClick={saveProfile} style={btn('primary',{padding:'14px',fontSize:'15px',borderRadius:'12px'})}>{saved?t.savedProfile:t.saveProfile}</button>
        </div>
      </div>
    </main>
  )

  // ── HR ──
  if (page==='hr') {
    const filtered=candidates.filter(c=>(!filterField||c.field===filterField)&&(!filterStatus||c.hr_status===filterStatus))
    const statusStyle=(s:string):React.CSSProperties=>({padding:'4px 12px',borderRadius:'99px',fontSize:'12px',fontWeight:700,...(s==='مقبول'||s==='Accepted'?{background:'rgba(52,211,153,0.1)',color:G.success}:s==='مرفوض'||s==='Rejected'?{background:'rgba(248,113,113,0.1)',color:G.danger}:s==='مقابلة'||s==='Interview'?{background:'rgba(96,165,250,0.1)',color:G.info}:{background:G.surface,color:G.textSec})})
    return (
      <main style={{minHeight:'100vh',background:G.bg,direction:dir,padding:'24px',fontFamily:FONT,position:'relative'}}>
        <ControlsBar/>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px',paddingTop:'16px'}}>
            <div>
              <div style={{fontSize:'24px',fontWeight:900,color:G.textPri}}>{t.hrTitle}</div>
              <div style={{fontSize:'13px',color:G.textSec,marginTop:'4px'}}>{t.hrSub(candidates.length)}</div>
            </div>
            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={loadCandidates} style={btn('primary',{padding:'10px 20px',fontSize:'13px'})}>{t.refresh}</button>
              <button onClick={()=>setPage('dashboard')} style={btn('secondary',{padding:'10px 20px',fontSize:'13px'})}>{t.back}</button>
            </div>
          </div>
          <div style={{display:'flex',gap:'12px',marginBottom:'20px'}}>
            {[{v:filterField,s:setFilterField,opts:FIELDS.map(f=>f.name),ph:t.allFields},{v:filterStatus,s:setFilterStatus,opts:t.statuses,ph:t.allStatus}].map(({v,s,opts,ph},i)=>(
              <select key={i} value={v} onChange={e=>s(e.target.value)} style={{...inp,width:'auto',padding:'9px 16px',fontSize:'13px'}}><option value=''>{ph}</option>{opts.map(o=><option key={o} value={o}>{o}</option>)}</select>
            ))}
          </div>
          <div style={card({overflow:'hidden'})}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'14px'}}>
              <thead><tr style={{borderBottom:`1px solid ${G.border}`,background:G.surface}}>
                {[t.colCandidate,t.colField,t.colTitle2,t.colRegion,t.colMatch,t.colStatus,''].map(h=>(
                  <th key={h} style={{padding:'13px 18px',textAlign:dir==='rtl'?'right':'left',fontWeight:700,color:G.textHint,fontSize:'11px',letterSpacing:'0.5px'}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {hrLoading&&<tr><td colSpan={7} style={{padding:'60px',textAlign:'center',color:G.textHint}}>{t.loadingCandidates}</td></tr>}
                {!hrLoading&&filtered.length===0&&<tr><td colSpan={7} style={{padding:'60px',textAlign:'center',color:G.textHint}}>{t.noCandidates}</td></tr>}
                {!hrLoading&&filtered.map((c,i)=>(
                  <tr key={c.id} onClick={()=>setSelCandidate(c)} style={{borderBottom:`1px solid ${G.border}`,cursor:'pointer',background:i%2===0?G.card:G.surface,transition:'background 0.15s'}}
                    onMouseEnter={e=>(e.currentTarget.style.background=G.cardHover)}
                    onMouseLeave={e=>(e.currentTarget.style.background=i%2===0?G.card:G.surface)}>
                    <td style={{padding:'15px 18px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                        <div style={{width:'36px',height:'36px',borderRadius:'10px',background:G.accentGlow,border:`1px solid ${G.accent}20`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:900,color:G.accent,flexShrink:0}}>{(c.full_name||'M')[0]}</div>
                        <div>
                          <div style={{fontWeight:700,color:G.textPri,fontSize:'14px'}}>{c.full_name||'—'}</div>
                          <div style={{fontSize:'11px',color:G.textHint,marginTop:'2px'}}>{c.experience||'—'}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{padding:'15px 18px',color:G.textSec,fontSize:'13px'}}>{c.field||'—'}</td>
                    <td style={{padding:'15px 18px',fontSize:'13px',color:G.textSec}}>{c.job_title||'—'}</td>
                    <td style={{padding:'15px 18px',fontSize:'13px',color:G.textHint}}>{c.regions?JSON.parse(c.regions)[0]||'—':'—'}</td>
                    <td style={{padding:'15px 18px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                        <span style={{fontSize:'18px',fontWeight:900,color:matchColor(c.matchPct,darkMode)}}>{c.matchPct}%</span>
                        <div style={{width:'48px',height:'4px',borderRadius:'99px',background:G.border,overflow:'hidden'}}>
                          <div style={{width:`${c.matchPct}%`,height:'100%',background:matchColor(c.matchPct,darkMode),borderRadius:'99px'}}/>
                        </div>
                      </div>
                    </td>
                    <td style={{padding:'15px 18px'}}><span style={statusStyle(c.hr_status||'جديد')}>{c.hr_status||(lang==='ar'?'جديد':'New')}</span></td>
                    <td style={{padding:'15px 18px'}}><button onClick={e=>{e.stopPropagation();setSelCandidate(c)}} style={btn('secondary',{padding:'7px 14px',fontSize:'12px'})}>{t.details}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selCandidate&&(
          <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:G.overlay,zIndex:300,display:'flex',justifyContent:dir==='rtl'?'flex-start':'flex-end'}} onClick={()=>setSelCandidate(null)}>
            <div className='slide-panel' style={{width:'440px',height:'100%',background:G.surface,overflowY:'auto',padding:'32px',borderLeft:dir==='rtl'?`1px solid ${G.borderMid}`:'none',borderRight:dir==='ltr'?`1px solid ${G.borderMid}`:'none',boxShadow:'0 0 80px rgba(0,0,0,0.5)'}} onClick={e=>e.stopPropagation()}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'24px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
                  <div style={{width:'48px',height:'48px',borderRadius:'14px',background:G.accentGlow,border:`1px solid ${G.accent}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',fontWeight:900,color:G.accent}}>{(selCandidate.full_name||'M')[0]}</div>
                  <div>
                    <div style={{fontWeight:900,fontSize:'18px',color:G.textPri}}>{selCandidate.full_name||'—'}</div>
                    <div style={{fontSize:'12px',color:G.textSec,marginTop:'2px'}}>{selCandidate.job_title||selCandidate.field||'—'}</div>
                  </div>
                </div>
                <button onClick={()=>setSelCandidate(null)} style={{background:G.card,border:`1px solid ${G.border}`,width:'32px',height:'32px',borderRadius:'8px',cursor:'pointer',fontSize:'16px',color:G.textSec,display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
              </div>
              <div style={{...card({padding:'24px',marginBottom:'20px',textAlign:'center'}),border:`1px solid ${selCandidate.matchPct>=80?G.accent+'40':G.border}`}}>
                <div style={{fontSize:'52px',fontWeight:900,color:matchColor(selCandidate.matchPct,darkMode),lineHeight:1}}>{selCandidate.matchPct}%</div>
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
                <button style={btn('primary',{padding:'13px',fontSize:'14px'})}>{t.contact}</button>
                <button style={btn('secondary',{padding:'13px',fontSize:'14px'})}>{t.schedule}</button>
                <button onClick={()=>updateStatus(selCandidate.id,lang==='ar'?'مرفوض':'Rejected')} style={btn('danger',{padding:'13px',fontSize:'14px'})}>{t.reject}</button>
              </div>
            </div>
          </div>
        )}
      </main>
    )
  }

  // ── MATCHES ──
  if (page==='matches') return (
    <main style={{minHeight:'100vh',background:G.bg,direction:dir,padding:'24px',fontFamily:FONT,position:'relative'}}>
      <ControlsBar/>
      <div style={{maxWidth:'800px',margin:'0 auto',paddingTop:'16px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'28px'}}>
          <div>
            <div style={{fontSize:'24px',fontWeight:900,color:G.textPri}}>{t.matchesTitle}</div>
            <div style={{fontSize:'13px',color:G.textSec,marginTop:'4px'}}>{t.matchesSub}</div>
          </div>
          <button onClick={()=>setPage('dashboard')} style={btn('secondary',{padding:'9px 20px',fontSize:'13px'})}>{t.back}</button>
        </div>
        {matches.length===0?(
          <div style={card({padding:'72px',textAlign:'center'})}>
            <div style={{fontSize:'48px',marginBottom:'16px',opacity:0.4}}>🔍</div>
            <div style={{fontWeight:700,color:G.textPri,marginBottom:'8px'}}>{t.noMatches}</div>
            <div style={{color:G.textHint,fontSize:'14px'}}>{t.noMatchesDesc}</div>
          </div>
        ):matches.map((c,i)=>(
          <div key={c.id} className='fade-up' style={{...card({padding:'24px',marginBottom:'12px',display:'flex',alignItems:'center',gap:'20px'}),animationDelay:`${i*0.05}s`}}>
            <div style={{width:'52px',height:'52px',borderRadius:'14px',background:G.accentGlow,border:`1px solid ${G.accent}20`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',flexShrink:0}}>🏢</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:800,fontSize:'16px',color:G.textPri,marginBottom:'4px'}}>{c.full_name||'—'}</div>
              <div style={{fontSize:'13px',color:G.textSec}}>{c.assessment_done?t.matchDone:t.matchNotDone}</div>
            </div>
            <div style={{textAlign:'center',flexShrink:0}}>
              <div style={{fontSize:'32px',fontWeight:900,color:matchColor(c.matchPct,darkMode),lineHeight:1}}>{c.matchPct}%</div>
              <div style={{fontSize:'11px',color:G.textHint,margin:'4px 0 12px'}}>{t.compatibility}</div>
              <button style={btn('primary',{padding:'8px 20px',fontSize:'12px'})}>{t.applyNow}</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )

  // ── DASHBOARD ──
  const myScores = profile?.scores?JSON.parse(profile.scores):null
  return (
    <main style={{minHeight:'100vh',background:G.bg,direction:dir,padding:'24px',fontFamily:FONT,position:'relative'}}>
      <ControlsBar/>
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
            <button onClick={handleSignOut} style={btn('ghost',{fontSize:'13px',color:G.textSec,padding:'8px 12px'})}>{t.signOut}</button>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'24px'}}>
          {[
            {l:t.assessment,v:profile?.assessment_done?t.completed:t.notStarted,dot:profile?.assessment_done?G.success:G.textHint},
            {l:t.matches,v:'—',dot:G.info},
            {l:t.requests,v:'0',dot:G.warning},
            {l:t.views,v:'0',dot:G.textHint},
          ].map((s,i)=>(
            <div key={i} style={card({padding:'18px'})}>
              <div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'10px'}}>
                <div style={{width:'6px',height:'6px',borderRadius:'50%',background:s.dot,flexShrink:0}}/>
                <div style={{fontSize:'11px',color:G.textHint,letterSpacing:'0.3px'}}>{s.l}</div>
              </div>
              <div style={{fontSize:'18px',fontWeight:900,color:s.v===t.completed?G.success:G.textPri}}>{s.v}</div>
            </div>
          ))}
        </div>

        {myScores&&(
          <div style={card({padding:'28px',marginBottom:'20px'})}>
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
            <div style={card({padding:'32px',gridColumn:'1/-1',border:`1px solid ${G.accent}20`})}>
              <div style={{display:'flex',alignItems:'flex-start',gap:'20px'}}>
                <div style={{width:'56px',height:'56px',borderRadius:'16px',background:G.accentGlow,border:`1px solid ${G.accent}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px',flexShrink:0}}>🧭</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:'18px',fontWeight:900,color:G.textPri,marginBottom:'8px'}}>{t.startAssessment}</div>
                  <div style={{fontSize:'14px',color:G.textSec,lineHeight:1.8,marginBottom:'20px'}}>{t.startAssessmentDesc}</div>
                  <button onClick={()=>{setCurrentQ(0);setAnswers({});setAssessDone(false);setPage('assessment')}} style={btn('primary',{padding:'13px 28px',fontSize:'14px'})}>{t.startNow}</button>
                </div>
              </div>
            </div>
          )}
          {!isCompany&&(
            <div style={card({padding:'28px'})}>
              <div style={{fontSize:'24px',marginBottom:'14px'}}>👤</div>
              <div style={{fontWeight:800,color:G.textPri,marginBottom:'6px',fontSize:'16px'}}>{t.profile}</div>
              <div style={{fontSize:'13px',color:G.textSec,marginBottom:'20px',lineHeight:1.7}}>{t.profileDesc}</div>
              <button onClick={()=>setPage('profile')} style={btn('secondary',{padding:'10px 22px',fontSize:'13px'})}>{t.editProfile}</button>
            </div>
          )}
          {profile?.assessment_done&&(isCompany?(
            <div style={card({padding:'28px',border:`1px solid ${G.accent}15`})}>
              <div style={{fontSize:'24px',marginBottom:'14px'}}>👥</div>
              <div style={{fontWeight:800,color:G.textPri,marginBottom:'6px',fontSize:'16px'}}>{t.hrBoard}</div>
              <div style={{fontSize:'13px',color:G.textSec,marginBottom:'20px',lineHeight:1.7}}>{t.hrBoardDesc}</div>
              <button onClick={()=>{setPage('hr');loadCandidates()}} style={btn('primary',{padding:'10px 22px',fontSize:'13px'})}>{t.openBoard}</button>
            </div>
          ):(
            <div style={card({padding:'28px',border:`1px solid ${G.accent}15`})}>
              <div style={{fontSize:'24px',marginBottom:'14px'}}>🎯</div>
              <div style={{fontWeight:800,color:G.textPri,marginBottom:'6px',fontSize:'16px'}}>{t.myMatches}</div>
              <div style={{fontSize:'13px',color:G.textSec,marginBottom:'20px',lineHeight:1.7}}>{t.matchesDesc}</div>
              <button onClick={()=>{setPage('matches');loadMatches()}} style={btn('primary',{padding:'10px 22px',fontSize:'13px'})}>{t.viewMatches}</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
