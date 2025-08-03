import { Part, ContentType } from '../../types';

export const part3: Part = {
  id: 'part3',
  partTitle: 'الباب الثالث: التصميم التقني العميق',
  icon: '🏗️',
  chapters: [
    {
      id: 'part3_chapter1',
      chapterTitle: 'الفصل 3: التصميم التقني لنظام SaaS – بنية Multi-Tenant من الألف إلى الياء',
      sections: [
        {
          id: 'part3_ch1_sec1',
          title: 'مقدمة: لماذا التصميم التقني هو حجر الأساس؟',
          icon: '📌',
          content: [
            {
              type: ContentType.PARAGRAPH,
              text: 'إذا كنت تبني نظام SaaS، فأنت لا تُطوّر تطبيقًا عاديًا. أنت تُطوّر <b>نظامًا مركزيًا يستضيف آلاف العملاء (المستأجرين - Tenants)</b>، ويُقدّم لهم نفس الخدمة، مع <b>عزل تام لبياناتهم (Data Isolation)</b>، وضمان <b>الأداء (Performance)، الأمان (Security)، والتوسع (Scalability)</b>. السؤال الأهم ليس: "هل يمكنني بناء هذا النظام؟" بل: "هل يمكنني بناؤه بطريقة تُمكنه من النمو إلى مليون مستخدم دون الانهيار؟"',
            },
            {
                type: ContentType.PARAGRAPH,
                text: 'في هذا الفصل، سنغوص في <b>العمق التقني لتصميم نظام SaaS</b>، مع التركيز على <b>بنية متعددة المستأجرين (Multi-Tenant Architecture)</b> — وهي القلب النابض لأي نظام SaaS ناجح. هذا ليس مجرد خيار تقني، بل هو قرار استراتيجي سيحدد تكلفة تشغيلك، ومستوى أمانك، وقدرتك على النمو في المستقبل. سنتناول:'
            },
            {
              type: ContentType.LIST_UNORDERED,
              items: [
                '<b>ما معنى Multi-Tenant؟</b> وكيف يختلف عن الأنظمة التقليدية.',
                '<b>النماذج الثلاثة لعزل البيانات</b> (Shared DB، Schema per Tenant، Database per Tenant) مع تشبيهات عملية.',
                '<b>كيف تُصمم قاعدة البيانات (Database)، الواجهة الخلفية (Backend)، والواجهة الأمامية (Frontend)</b> لدعم المستأجرين.',
                '<b>أكواد عملية ومفصلة</b> بلغات متعددة (Python، JavaScript، SQL، Docker).',
                '<b>تحليل للمخاطر الشائعة</b> مثل "مشكلة الجار المزعج (Noisy Neighbor)" و "جحيم ترحيل البيانات (Migration Hell)".',
                '<b>أدوات، مكتبات، وأفضل الممارسات</b> لتطبيق الأمان والتوسع.',
              ],
            },
            {
              type: ContentType.PARAGRAPH,
              text: 'بعد قراءة هذا الفصل، ستكون قادرًا على اتخاذ قرارات معمارية مستنيرة، وتصميم هيكل نظام قابل للتطوير، وتجنب الأخطاء الشائعة التي تُدمّر الأنظمة في مرحلة النمو.',
            },
          ]
        },
        {
            id: 'part3_ch1_sec2',
            title: 'ما هو Multi-Tenant Architecture؟ التعريف والأساسيات',
            icon: '🔍',
            content: [
                { type: ContentType.HEADING3, text: '📘 التعريف البسيط والموسع' },
                { type: ContentType.PARAGRAPH, text: '<b>بنية متعددة المستأجرين (Multi-Tenant Architecture)</b> هي نموذج تصميم برمجي يُمكّن <b>تطبيقًا واحدًا من خدمة عدة عملاء (مستأجرين - Tenants)</b>، مع <b>عزل بياناتهم (Data Isolation)</b> عن بعضهم البعض. المستأجر (Tenant) هو عميل أو منظمة تستخدم النظام (مثل شركة، فريق، أو مؤسسة تعليمية).'},
                { type: ContentType.NOTE, title: '🔹 تشبيه بسيط: العمارة السكنية مقابل الفيلا الخاصة', text: '- <b>المستأجر الواحد (Single-Tenant)</b> يشبه امتلاك فيلا خاصة بك. تحصل على أقصى درجات الخصوصية والأمان، وتتحكم في كل شيء، لكن التكلفة الأولية وتكاليف الصيانة باهظة جداً. كل عميل يحصل على نسخته الخاصة من التطبيق وقاعدة البيانات والخادم.\n- <b>متعدد المستأجرين (Multi-Tenant)</b> يشبه العيش في عمارة سكنية. جميع السكان يتشاركون المبنى نفسه (البنية التحتية والتطبيق)، والمصعد (الموارد)، لكن لكل ساكن شقته الخاصة وباب مقفل (عزل البيانات). التكلفة أقل بكثير لأنها موزعة على الجميع، والصيانة مركزية ومسؤولية المالك (مزود الخدمة).'},
                 { type: ContentType.HEADING3, text: '🔄 الفرق بين Single-Tenant و Multi-Tenant' },
                 { type: ContentType.PARAGRAPH, text: `<div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
    <!-- Single-Tenant Card -->
    <div class="bg-stone-50 border-2 border-stone-200 rounded-xl p-6 shadow-md flex flex-col">
        <div class="flex items-center gap-4 mb-4">
            <div class="bg-sky-100 text-sky-700 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            </div>
            <h3 class="text-2xl font-bold text-stone-800">Single-Tenant (الفيلا الخاصة)</h3>
        </div>
        <ul class="space-y-3 text-stone-700 flex-grow">
            <li class="flex items-start gap-3"><span class="text-green-500 font-bold">✓</span><div><strong>الأمان:</strong> عزل كامل للبيانات، مثالي للبيانات الحساسة.</div></li>
            <li class="flex items-start gap-3"><span class="text-green-500 font-bold">✓</span><div><strong>التحكم:</strong> سيطرة كاملة على البيئة والتحديثات والتخصيص.</div></li>
            <li class="flex items-start gap-3"><span class="text-green-500 font-bold">✓</span><div><strong>الأداء:</strong> لا يوجد تأثير "الجار المزعج"، الموارد مخصصة بالكامل.</div></li>
            <li class="flex items-start gap-3"><span class="text-red-500 font-bold">✗</span><div><strong>التكلفة:</strong> باهظة جدًا (خوادم، تراخيص، صيانة لكل عميل).</div></li>
            <li class="flex items-start gap-3"><span class="text-red-500 font-bold">✗</span><div><strong>الصيانة:</strong> معقدة ومستهلكة للوقت، يجب تحديث كل نسخة على حدة.</div></li>
        </ul>
    </div>

    <!-- Multi-Tenant Card -->
    <div class="bg-stone-50 border-2 border-amber-400 rounded-xl p-6 shadow-lg flex flex-col">
        <div class="flex items-center gap-4 mb-4">
            <div class="bg-amber-100 text-amber-700 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <h3 class="text-2xl font-bold text-stone-800">Multi-Tenant (العمارة السكنية)</h3>
        </div>
        <ul class="space-y-3 text-stone-700 flex-grow">
            <li class="flex items-start gap-3"><span class="text-green-500 font-bold">✓</span><div><strong>التكلفة:</strong> منخفضة جدًا، حيث يتم تقاسم تكاليف البنية التحتية والصيانة.</div></li>
            <li class="flex items-start gap-3"><span class="text-green-500 font-bold">✓</span><div><strong>الصيانة:</strong> مركزية وسهلة، تحديث واحد يصل لجميع العملاء فورًا.</div></li>
            <li class="flex items-start gap-3"><span class="text-green-500 font-bold">✓</span><div><strong>التوسع:</strong> أسهل وأسرع في إضافة عملاء جدد.</div></li>
            <li class="flex items-start gap-3"><span class="text-red-500 font-bold">✗</span><div><strong>الأمان:</strong> يتطلب تصميمًا دقيقًا لعزل البيانات (مثل RLS) لمنع التسرب.</div></li>
            <li class="flex items-start gap-3"><span class="text-red-500 font-bold">✗</span><div><strong>التحكم:</strong> تخصيص محدود، جميع العملاء يستخدمون نفس نسخة البرنامج.</div></li>
        </ul>
    </div>
</div>`},
            ]
        },
        {
            id: 'part3_ch1_sec3',
            title: 'النماذج الثلاثة لعزل البيانات: شقة، تاون هاوس، أم فيلا؟',
            icon: '🧱',
            content: [
                { type: ContentType.PARAGRAPH, text: 'اختيار نموذج عزل البيانات هو القرار المعماري الأهم في نظامك. لا يوجد حل "أفضل" للجميع، بل هو موازنة بين التكلفة والأمان وسهولة الإدارة. دعنا نستكشف النماذج الثلاثة باستخدام تشبيهات من عالم العقارات.' },
                { type: ContentType.HEADING3, text: '📌 النموذج 1: قاعدة بيانات مشتركة، مخطط مشترك (Shared Database, Shared Schema) (نموذج الشقة)' },
                { type: ContentType.PARAGRAPH, text: '<b>الوصف:</b> جميع المستأجرين يستخدمون نفس قاعدة البيانات ونفس الجداول. يتم التمييز بينهم عبر حقل `tenant_id` في كل جدول. هذا هو النموذج الأكثر شيوعًا للشركات الناشئة.' },
                {
                    type: ContentType.CODE_EXPLANATION,
                    language: 'sql',
                    codeTitle: 'جدول المهام مع tenant_id',
                    code: `CREATE TABLE tasks (
    id UUID PRIMARY KEY,
    title VARCHAR(200),
    user_id UUID REFERENCES users(id),
    tenant_id UUID NOT NULL, -- العمود الحاسم
    status VARCHAR(20) DEFAULT 'pending'
);

-- الاستعلام الآمن
SELECT * FROM tasks WHERE tenant_id = 'uuid-for-tenant-A';

-- الاستعلام الخطير (تسريب بيانات)
SELECT * FROM tasks; -- يعرض مهام جميع المستأجرين!`,
                    explanations: [
                        { lines: "5", explanation: "هذا العمود هو مفتاح العزل. كل صف في الجدول يجب أن يكون مرتبطًا بمستأجر معين." },
                        { lines: "9", explanation: "أي استعلام لجلب البيانات يجب أن يتضمن شرط `WHERE tenant_id = ?` لضمان عدم رؤية بيانات مستأجر آخر." },
                        { lines: "12", explanation: "نسيان هذا الشرط هو الخطأ الأمني الأكثر شيوعًا وخطورة في هذا النموذج." }
                    ]
                },
                {
                    type: ContentType.PARAGRAPH,
                    text: '<b>شرح الكود:</b> يوضح هذا الكود أبسط نموذج لتعدد المستأجرين، حيث يتم تمييز بيانات كل عميل باستخدام عمود `tenant_id`. أهميته تكمن في بساطته وتكلفته المنخفضة، مما يجعله الخيار الأمثل للمنتجات الأولية (MVPs). يُستخدم هذا النمط في معظم أنظمة SaaS في مراحلها المبكرة، ولكنه يتطلب انضباطًا برمجيًا صارمًا لضمان إضافة شرط `WHERE tenant_id` في كل استعلام لتجنب تسرب البيانات.'
                },
                { type: ContentType.HEADING4, text: 'متى تختار هذا النموذج؟' },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<b>عند إطلاق منتجك الأولي (MVP):</b> لأنه الأسرع والأقل تكلفة في التنفيذ.",
                    "<b>للتطبيقات الموجهة للمستهلك (B2C):</b> حيث يكون مستوى حساسية البيانات أقل مقارنة بالشركات.",
                    "<b>عندما تكون الميزانية محدودة:</b> يتطلب أقل قدر من الموارد التشغيلية.",
                ]},
                { type: ContentType.HEADING4, text: 'المخاطر الشائعة' },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: 'تسرب البيانات (Data Leakage)', definition: 'خطأ برمجي واحد في استعلام يمكن أن يعرض بيانات جميع عملائك. يتطلب انضباطًا صارمًا من فريق التطوير أو استخدام أدوات أمان متقدمة مثل RLS.' },
                    { term: 'مشكلة الجار المزعج (Noisy Neighbor)', definition: 'إذا قام أحد المستأجرين بتشغيل استعلامات ثقيلة جدًا، فإنه يبطئ أداء التطبيق لجميع المستأجرين الآخرين لأنهم يتشاركون نفس موارد قاعدة البيانات.' },
                ]},
                { type: ContentType.HEADING3, text: '📌 النموذج 2: قاعدة بيانات مشتركة، مخططات منفصلة (Shared Database, Separate Schemas) (نموذج التاون هاوس)' },
                { type: ContentType.PARAGRAPH, text: '<b>الوصف:</b> نفس قاعدة البيانات، لكن لكل مستأجر <b>مخطط (Schema) منفصل</b> يحتوي على جداوله الخاصة. هذا يوفر عزلاً منطقيًا قويًا داخل قاعدة بيانات مشتركة.' },
                 { type: ContentType.CODE_EXPLANATION,
                    language: 'sql',
                    codeTitle: 'إنشاء مخططات منفصلة',
                    code: `-- إنشاء مخطط لكل مستأجر
CREATE SCHEMA tenant_acme;
CREATE SCHEMA tenant_innovate;

-- إنشاء جدول في كل مخطط
CREATE TABLE tenant_acme.tasks (...);
CREATE TABLE tenant_innovate.tasks (...);

-- تغيير مسار البحث لتوجيه الاستعلامات
SET search_path TO tenant_acme;
SELECT * FROM tasks; -- سيقرأ من tenant_acme.tasks`,
                    explanations: [
                        { lines: "2-3", explanation: "يتم إنشاء مساحة اسم (namespace) منفصلة لكل مستأجر داخل قاعدة البيانات." },
                        { lines: "6-7", explanation: "يتم إنشاء نفس بنية الجداول داخل كل مخطط، مما يؤدي إلى تكرار الهيكل ولكن ليس البيانات." },
                        { lines: "10-11", explanation: "قبل كل استعلام، يجب على التطبيق تحديد المخطط الذي سيعمل عليه. هذا يضيف طبقة من الأمان ويمنع الحاجة إلى `WHERE tenant_id`." },
                    ]
                },
                {
                    type: ContentType.PARAGRAPH,
                    text: '<b>شرح الكود:</b> يشرح هذا الكود نموذج العزل عبر المخططات (Schemas)، حيث يحصل كل عميل على مجموعة جداوله الخاصة. فائدته هي توفير عزل منطقي أقوى من النموذج المشترك، مما يقلل من خطر تسرب البيانات. يُستخدم هذا النمط في تطبيقات B2B التي تتطلب درجة أعلى من الأمان ولكنها لا تزال تريد الاستفادة من قاعدة بيانات واحدة لسهولة الإدارة.'
                },
                { type: ContentType.HEADING4, text: 'متى تختار هذا النموذج؟' },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<b>تطبيقات B2B:</b> عندما يطلب العملاء درجة أعلى من عزل البيانات.",
                    "<b>عندما تحتاج إلى نسخ احتياطي لكل عميل على حدة:</b> يمكنك بسهولة عمل نسخة احتياطية من مخطط واحد.",
                    "<b>عندما تكون هناك اختلافات طفيفة في بنية البيانات بين العملاء.</b>",
                ]},
                 { type: ContentType.HEADING4, text: 'المخاطر الشائعة' },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: 'جحيم ترحيل البيانات (Migration Hell)', definition: 'عندما تحتاج إلى تغيير بنية جدول (مثل إضافة عمود)، يجب عليك تطبيق هذا التغيير على مئات أو آلاف المخططات. هذه عملية معقدة وبطيئة ومحفوفة بالمخاطر.' },
                    { term: 'حدود قواعد البيانات', definition: 'بعض أنظمة قواعد البيانات لديها حد أقصى لعدد المخططات، مما قد يحد من قدرتك على التوسع.' },
                ]},
                { type: ContentType.HEADING3, text: '📌 النموذج 3: قاعدة بيانات منفصلة (Separate Database) (نموذج الفيلا الخاصة)' },
                { type: ContentType.PARAGRAPH, text: '<b>الوصف:</b> كل مستأجر له <b>قاعدة بيانات كاملة منفصلة</b>، وقد تكون على خادم منفصل. هذا يوفر أعلى مستوى من العزل والأمان والأداء.' },
                 { type: ContentType.CODE_EXPLANATION,
                    language: 'python',
                    codeTitle: 'الاتصال بقاعدة بيانات مختلفة',
                    code: `# دالة للحصول على اتصال بالقاعدة المناسبة
def get_db_connection(tenant_id):
    # يتم تخزين معلومات الاتصال في جدول مركزي
    tenant_config = get_tenant_config_from_central_db(tenant_id)

    db_url = (f"postgresql://{tenant_config.user}:"
              f"{tenant_config.password}@"
              f"{tenant_config.host}/"
              f"{tenant_config.db_name}")

    return create_engine(db_url)`,
                    explanations: [
                        { lines: "3", explanation: "يجب أن يكون لديك قاعدة بيانات مركزية صغيرة (أو ملف تكوين) لتخزين تفاصيل الاتصال لكل قاعدة بيانات خاصة بالمستأجرين." },
                        { lines: "6-9", explanation: "يقوم التطبيق ببناء سلسلة الاتصال ديناميكيًا بناءً على `tenant_id` الخاص بالمستخدم الذي قام بتسجيل الدخول." },
                    ]
                },
                {
                    type: ContentType.PARAGRAPH,
                    text: '<b>شرح الكود:</b> يوضح هذا الكود كيفية الاتصال بقاعدة بيانات مختلفة ديناميكيًا بناءً على هوية المستأجر. أهميته تكمن في توفير أقصى درجات العزل والأمان، حيث تكون بيانات كل عميل منفصلة تمامًا. يُستخدم هذا النموذج للعملاء من المؤسسات الكبيرة أو في الصناعات الحساسة (مثل الرعاية الصحية) التي لديها متطلبات امتثال صارمة.'
                },
                { type: ContentType.HEADING4, text: 'متى تختار هذا النموذج؟' },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<b>العملاء من المؤسسات الكبيرة (Enterprise):</b> الذين لديهم متطلبات أمان صارمة.",
                    "<b>الصناعات المنظمة:</b> مثل الرعاية الصحية (HIPAA) أو الخدمات المالية.",
                    "<b>عندما يحتاج كل عميل إلى أداء مخصص وغير متأثر بالآخرين.</b>",
                ]},
                { type: ContentType.HEADING4, text: 'المخاطر الشائعة' },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: 'تكاليف تشغيلية باهظة', definition: 'إدارة وصيانة مئات قواعد البيانات تتطلب موارد ضخمة وأتمتة متقدمة.' },
                    { term: 'تعقيد التحديثات', definition: 'نشر التحديثات وتغييرات المخطط يصبح عملية معقدة للغاية وتتطلب أدوات متخصصة.' },
                ]},
            ]
        },
        {
          id: 'part3_ch1_sec4',
          title: 'تحديد المستأجر (Tenant Identification): كيف يعرف النظام من أنت؟',
          icon: '🆔',
          content: [
            { type: ContentType.PARAGRAPH, text: 'قبل أن يتمكن نظامك من عزل البيانات، يجب أن يعرف أولاً هوية المستأجر الذي يقدم الطلب. هناك عدة طرق شائعة لتحقيق ذلك.' },
            { type: ContentType.DEFINITION_LIST, definitionItems: [
                { term: '1. عبر النطاق الفرعي (Subdomain)', definition: '<b>مثال: `acme.yoursaas.com`</b>. يستخرج التطبيق `acme` من عنوان URL ويستخدمه لتحديد المستأجر. هذه هي الطريقة الأكثر احترافية وشيوعًا لتطبيقات B2B.' },
                { term: '2. عبر النطاق المخصص (Custom Domain)', definition: '<b>مثال: `tasks.acme.com`</b>. يسمح للعملاء باستخدام نطاقاتهم الخاصة، مما يعزز علامتهم التجارية. يتطلب هذا إعدادات DNS معقدة.' },
                { term: '3. عبر مسار URL (URL Path)', definition: '<b>مثال: `yoursaas.com/acme/tasks`</b>. يتم تضمين معرف المستأجر في مسار URL. أبسط من النطاقات الفرعية ولكنها أقل احترافية.' },
                { term: '4. عبر توكن JWT (JWT Token)', definition: 'عند تسجيل الدخول، يتم تضمين `tenant_id` داخل حمولة (payload) توكن المصادقة (JWT). في كل طلب لاحق، يقوم الخادم بفك تشفير التوكن واستخراج معرف المستأجر. هذه طريقة آمنة وشائعة جدًا.' },
            ]},
            {
              type: ContentType.NOTE,
              title: '🔹 النهج الهجين هو الأفضل',
              text: 'غالبًا ما تستخدم الأنظمة القوية نهجًا هجينًا: يتم استخدام النطاق الفرعي لتحديد المستأجر في البداية (صفحة تسجيل الدخول)، وبعد المصادقة الناجحة، يتم الاعتماد على `tenant_id` المضمن في JWT لجميع طلبات API اللاحقة. هذا يجمع بين تجربة المستخدم الجيدة والأمان القوي.'
            }
          ]
        },
        {
          id: 'part3_ch1_sec5',
          title: 'تصميم قاعدة البيانات: إدارة الأدوار والدعوات',
          icon: '🔑',
          content: [
            { type: ContentType.PARAGRAPH, text: 'تصميم قاعدة بيانات Multi-tenant لا يقتصر فقط على عزل البيانات، بل يشمل أيضًا إدارة كيفية وصول المستخدمين إلى تلك البيانات داخل المستأجر الواحد. هذا يتطلب إدارة الأدوار والدعوات.' },
            { type: ContentType.HEADING3, text: 'الجداول الأساسية والمتقدمة' },
            { type: ContentType.CODE_BLOCK, language: 'sql', code: `-- جدول المستأجرين (الشركات)
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    plan VARCHAR(20) DEFAULT 'basic' -- basic, pro, enterprise
);

-- جدول المستخدمين
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

-- جدول الربط الحاسم: يحدد أي مستخدم ينتمي إلى أي مستأجر وبأي دور
CREATE TABLE tenant_memberships (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL, -- 'owner', 'admin', 'member'
    PRIMARY KEY (user_id, tenant_id)
);

-- جدول الدعوات
CREATE TABLE invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' -- 'pending', 'accepted'
);` },
            {
                type: ContentType.PARAGRAPH,
                text: '<b>شرح الكود:</b> يوضح هذا التصميم المتقدم كيفية إدارة المستخدمين والأدوار والدعوات في نظام متعدد المستأجرين. أهميته تكمن في فصل هوية المستخدم (`users`) عن عضويته في شركة (`tenant_memberships`). هذا يسمح للمستخدم الواحد بالانضمام إلى عدة فرق بنفس الحساب، وهو سيناريو شائع جدًا. جدول `invitations` يُمكن من بناء تدفق دعوة آمن وقابل للتتبع.'
            },
            { type: ContentType.NOTE, title: 'لماذا هذا التصميم أفضل؟', text: 'فصل جدول `users` عن `tenants` والسماح بعلاقة متعدد إلى متعدد (Many-to-Many) عبر `tenant_memberships` يسمح للمستخدم الواحد بأن يكون عضوًا في عدة شركات (مستأجرين) مختلفين بنفس البريد الإلكتروني، وهو سيناريو شائع جدًا (مثل مستشار يعمل مع عدة عملاء).' },
             {
              type: ContentType.NOTE,
              title: 'مشروع عملي: تدفق المصادقة الكامل',
              text: 'لتجربة هذه المفاهيم عمليًا، قمنا بإعداد مشروع تفاعلي يوضح تدفق التسجيل، تسجيل الدخول، إعادة تعيين كلمة المرور. (ملاحظة: يتطلب هذا المشروع تشغيل خادم خلفي مصاحب على `localhost:5000` ليعمل بشكل صحيح).'
            },
            {
              type: ContentType.PROJECT_AUTH_FLOW,
            },
          ]
        },
        {
          id: 'part3_ch1_sec6',
          title: 'الأمان المتقدم: تطبيق أمان مستوى الصف (Row-Level Security - RLS)',
          icon: '🛡️',
          content: [
            { type: ContentType.PARAGRAPH, text: 'الاعتماد على المطورين فقط لتذكر إضافة `WHERE tenant_id = ?` هو وصفة لكارثة. <b>أمان مستوى الصف (Row-Level Security - RLS)</b> في قواعد البيانات مثل PostgreSQL هي شبكة أمان قوية تفرض عزل البيانات على مستوى قاعدة البيانات نفسها.' },
            { type: ContentType.HEADING3, text: 'كيف يعمل RLS؟ (خطوة بخطوة)' },
            { type: ContentType.DEFINITION_LIST, definitionItems: [
                { term: '1. تمكين RLS على الجدول', definition: 'أولاً، تقوم بتفعيل الميزة على الجدول المستهدف. بمجرد تفعيلها، لن يتمكن أي مستخدم (حتى المالك) من رؤية أي صفوف افتراضيًا.' },
                { term: '2. إنشاء سياسة (Policy)', definition: 'تكتب سياسة تحدد الشروط التي يجب أن تتحقق لرؤية صف معين. هذه السياسة تستخدم متغيرات الجلسة (session variables) التي يمررها تطبيقك.' },
                { term: '3. تمرير السياق من التطبيق', definition: 'في الواجهة الخلفية (Backend)، قبل تنفيذ أي استعلام، تقوم بتعيين متغير الجلسة الذي يحتوي على `tenant_id` الخاص بالمستخدم الحالي. قاعدة البيانات تستخدم هذا المتغير لتطبيق السياسة تلقائيًا.' },
            ]},
            { type: ContentType.CODE_EXPLANATION,
              language: 'sql',
              codeTitle: 'سياسة RLS لجدول المهام',
              code: `-- 1. تفعيل RLS على جدول المهام
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- 2. إنشاء سياسة تفرض عزل المستأجرين
CREATE POLICY tenant_isolation_policy ON tasks
FOR ALL -- تنطبق على SELECT, INSERT, UPDATE, DELETE
USING (
    -- قارن العمود في الجدول مع متغير الجلسة
    tenant_id::text = current_setting('app.current_tenant_id', true)
);`,
              explanations: [
                { lines: '2', explanation: 'تفعيل RLS يمنع كل الوصول إلى الجدول افتراضيًا حتى يتم إنشاء سياسة تسمح بالوصول.' },
                { lines: '5', explanation: 'هذه السياسة ستطبق على كل أنواع الاستعلامات.' },
                { lines: '7-9', explanation: 'الشرط الحاسم. قاعدة البيانات ستضيف هذا الشرط تلقائيًا إلى أي استعلام يتم على جدول `tasks`. `current_setting` هي دالة PostgreSQL تقرأ متغيرًا تم تعيينه في الجلسة الحالية. الخيار `true` يعني أنه لن يحدث خطأ إذا لم يكن المتغير موجودًا.' },
              ]
            },
             {
                type: ContentType.PARAGRAPH,
                text: '<b>شرح الكود:</b> يوضح هذا الكود كيفية إنشاء سياسة أمان على مستوى الصف (RLS) في PostgreSQL. هذه هي آلية الأمان القصوى لتعدد المستأجرين. فائدتها أنها تفرض عزل البيانات على مستوى قاعدة البيانات نفسها، مما يعني أنه حتى لو ارتكب المطور خطأً في كود التطبيق، فإن قاعدة البيانات ستمنع تسرب البيانات. إنها شبكة أمان حاسمة لتطبيقات SaaS التي تتعامل مع بيانات حساسة.'
            },
            { type: ContentType.CODE_EXPLANATION,
              language: 'python',
              codeTitle: 'تعيين متغير الجلسة في Python (Flask/SQLAlchemy)',
              code: `from flask import g
from sqlalchemy import text

@app.before_request
def set_tenant_context():
    # افترض أن tenant_id تم استخراجه من JWT
    g.tenant_id = get_tenant_id_from_jwt()

    # قم بتعيين متغير الجلسة في PostgreSQL
    # سيستمر هذا الإعداد طوال مدة الطلب الحالي
    if g.tenant_id:
        db.session.execute(
            text("SET app.current_tenant_id = :tenant_id"),
            {"tenant_id": g.tenant_id}
        )
`,
              explanations: [
                { lines: '4', explanation: '`@app.before_request` هو مُزيِّن (decorator) في Flask يضمن تشغيل هذه الدالة قبل كل طلب API.' },
                { lines: '6', explanation: 'يتم استخراج معرف المستأجر من توكن المصادقة وتخزينه في سياق الطلب (`g`).' },
                { lines: '10-13', explanation: 'هنا يتم تنفيذ أمر `SET` في PostgreSQL لتعيين متغير الجلسة. الآن، أي استعلام SQLAlchemy لاحق داخل هذا الطلب سيخضع تلقائيًا لسياسة RLS.' },
              ]
            },
            {
                type: ContentType.PARAGRAPH,
                text: '<b>شرح الكود:</b> يوضح هذا الكود كيف يقوم التطبيق بإبلاغ قاعدة البيانات بهوية المستأجر الحالي قبل كل طلب. أهميته تكمن في أنه "يُفعّل" سياسة RLS لتلك الجلسة المحددة. يُستخدم هذا الكود كـ "Middleware" في الواجهة الخلفية لضمان أن كل استعلام لاحق يتم تصفيته تلقائيًا بواسطة قاعدة البيانات، مما يوفر أمانًا شفافًا وقويًا.'
            }
          ]
        },
        {
          id: 'part3_ch1_sec7',
          title: 'التوسع (Scaling) في نظام Multi-Tenant',
          icon: '📈',
          content: [
            { type: ContentType.PARAGRAPH, text: 'مع نمو قاعدة عملائك، يجب أن ينمو نظامك معها بسلاسة. التخطيط للتوسع منذ البداية يمكن أن يوفر عليك الكثير من المتاعب في المستقبل.' },
            { type: ContentType.HEADING3, text: 'التوسع الأفقي (Horizontal Scaling) مقابل التوسع العمودي (Vertical Scaling)' },
            { type: ContentType.DEFINITION_LIST, definitionItems: [
                { term: 'التوسع العمودي (Vertical Scaling)', definition: 'زيادة موارد الخادم الحالي (مثل إضافة المزيد من CPU أو RAM). إنه سهل ولكنه محدود ومكلف. تصل إلى نقطة لا يمكنك فيها ترقية الخادم أكثر.' },
                { term: 'التوسع الأفقي (Horizontal Scaling)', definition: 'إضافة المزيد من الخوادم بدلاً من ترقية خادم واحد. هذا هو النهج المفضل في التطبيقات السحابية لأنه يوفر مرونة لا نهائية تقريبًا وجاهزية عالية (High Availability). يتطلب استخدام موازن أحمال (Load Balancer) لتوزيع حركة المرور بين الخوادم.' },
            ]},
            { type: ContentType.HEADING3, text: 'حل مشكلة الجار المزعج (Noisy Neighbor)' },
            { type: ContentType.PARAGRAPH, text: 'في النماذج المشتركة، يمكن أن يؤثر مستأجر واحد سيء الأداء على الجميع. إليك بعض الاستراتيجيات للتعامل مع هذا:' },
            { type: ContentType.LIST_UNORDERED, items: [
                '<b>تحديد المعدل (Rate Limiting):</b> قم بفرض حدود على عدد طلبات API التي يمكن للمستأجر إجراؤها في فترة زمنية معينة (مثل 100 طلب في الدقيقة).',
                '<b>قوائم انتظار منفصلة (Separate Queues):</b> للمهام الطويلة التي تعمل في الخلفية (مثل إنشاء التقارير أو تصدير البيانات)، قم بوضع مهام كل مستأجر في قائمة انتظار منفصلة لضمان عدم تأخير مهام الآخرين.',
                '<b>عزل الموارد للمستأجرين الكبار:</b> يمكنك نقل المستأجرين الذين يستهلكون موارد عالية إلى مجموعة خوادم وقواعد بيانات مخصصة لهم (تحويلهم إلى نموذج شبه منفصل).',
            ]},
            { type: ContentType.NOTE, title: 'الخلاصة', text: 'بناء نظام SaaS متعدد المستأجرين هو رحلة من المقايضات. ابدأ بالبساطة (نموذج الشقة المشترك)، ولكن صمم نظامك مع وضع التوسع والأمان في الاعتبار منذ اليوم الأول. استخدم أدوات مثل RLS لتأمين بياناتك، وخطط للتوسع الأفقي لضمان نمو سلس وموثوق.' }
          ]
        },