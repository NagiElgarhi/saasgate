
import { Part, ContentType } from '../../types';

export const part5: Part = {
  id: 'part5',
  partTitle: 'الباب الخامس: تطوير الواجهة الخلفية لنظام SaaS',
  icon: '🚀',
  chapters: [
    {
      id: 'part5_chapter1',
      chapterTitle: 'الفصل 5: تطوير الواجهة الخلفية – بناء API قوية، آمنة، وقابلة للتوسع',
      sections: [
        {
          id: 'part5_ch1_sec1',
          title: 'مقدمة: لماذا الواجهة الخلفية هي العمود الفقري لأي نظام SaaS؟',
          icon: '📌',
          content: [
            {
              type: ContentType.PARAGRAPH,
              text: 'إذا كانت <b>الواجهة الأمامية</b> هي "الوجه" الذي يراه العميل ويتفاعل معه، فإن <b>الواجهة الخلفية (Backend)</b> هي "الدماغ والجهاز العصبي المركزي" الذي يُفكّر، يُعالج، يتذكر، ويحمي. إنها ليست مجرد مستودع للبيانات، بل هي الحارس الذي يفرض منطق العمل (Business Logic)، ويضمن أن المستخدم لا يمكنه إنشاء 200 مشروع في الخطة التي تسمح بـ 5 فقط. هي التي تعالج المدفوعات بأمان، وتطلق المهام المعقدة في الخلفية، وتتكامل بسلاسة مع عشرات الخدمات الأخرى التي يعتمد عليها عملك.',
            },
            {
                type: ContentType.PARAGRAPH,
                text: 'في نظام SaaS، لا يمكن الاعتماد على واجهة خلفية بسيطة تُعيد بيانات ثابتة. أنت تبني نظامًا مركزيًا معقدًا مصممًا لاستضافة <b>آلاف، وربما ملايين، المستأجرين (Tenants)</b> في نفس الوقت، ويُعالج <b>مليارات الطلبات شهريًا</b>، ويُدير <b>الدفع، الصلاحيات، التكاملات، والأمان</b> بشكل متزامن وآمن. السؤال الحاسم ليس "هل يمكنني كتابة API؟"، بل "هل يمكنني بناء واجهة خلفية مصممة للصمود أمام ضغط النمو، مقاومة للهجمات، وسهلة الصيانة والتطوير على المدى الطويل؟"',
            },
            {
              type: ContentType.PARAGRAPH,
              text: 'في هذا الفصل، سنغوص في <b>العمق التقني للواجهة الخلفية في أنظمة SaaS</b>، متجاوزين الأساسيات للتركيز على القرارات المعمارية التي تفصل بين نظام ينهار تحت أول 1000 مستخدم ونظام يتوسع بسلاسة إلى مليون مستخدم. سنركز على:',
            },
            {
              type: ContentType.LIST_UNORDERED,
              items: [
                '<b>الأنماط المعمارية الرئيسية:</b> تحليل مقارن بين Monolith و Microservices و Serverless، مع توضيح متى تختار كل نمط في دورة حياة SaaS.',
                '<b>تصميم واجهة برمجة تطبيقات (API) داعمة لـ Multi-Tenant:</b> استراتيجيات تحديد المستأجر، تصميم API غير متكررة (Idempotent)، وإدارة الإصدارات.',
                '<b>أكواد عملية ومفصلة:</b> أمثلة واقعية لإدارة المستخدمين، الاشتراكات باستخدام Stripe، وتطبيق نظام صلاحيات متقدم (RBAC/ABAC).',
                '<b>استراتيجيات الأمان المتقدمة:</b> من تأمين رفع الملفات إلى منع هجمات CSRF و XSS من منظور الخادم، وإدارة الأسرار (Secret Management).',
                '<b>تحسين الأداء الجذري:</b> استخدام التخزين المؤقت (Caching) بفعالية، وتطبيق قوائم الانتظار غير المتزامنة (Asynchronous Queues) للمهام الثقيلة.',
                '<b>حالات دراسية من شركات مثل Slack، Shopify، وNetflix:</b> تحليل قراراتهم المعمارية وكيف ساهمت في نجاحهم.',
              ],
            },
            {
              type: ContentType.PARAGRAPH,
              text: 'بعد قراءة هذا الفصل، ستكون قادرًا على تصميم وبناء واجهة خلفية لا تعمل فقط، بل تعمل بكفاءة وأمان وقادرة على التكيف مع متطلبات المستقبل.',
            },
          ]
        },
        {
          id: 'part5_ch1_sec2',
          title: 'الأنماط المعمارية للواجهة الخلفية: Monolith، Microservices، أم Serverless؟',
          icon: '🏛️',
          content: [
            {
              type: ContentType.PARAGRAPH,
              text: 'قبل كتابة سطر واحد من الكود، القرار المعماري الأول والأكثر تأثيرًا هو اختيار النمط الذي ستبني عليه واجهتك الخلفية. هذا القرار سيؤثر على سرعة التطوير، تكلفة التشغيل، سهولة التوسع، وحتى هيكل فريقك الهندسي.'
            },
            {
              type: ContentType.HEADING3,
              text: '1. The Monolith (الكتلة الواحدة المتراصة)'
            },
            {
              type: ContentType.PARAGRAPH,
              text: '<b>الوصف:</b> هو النهج التقليدي حيث يتم بناء التطبيق بأكمله كوحدة واحدة متكاملة. كل الميزات (المصادقة، الفواتير، التقارير، إلخ) تكون مترابطة في قاعدة كود واحدة ويتم نشرها معًا. إطار عمل مثل Ruby on Rails أو Django يشجع بقوة على هذا النمط.'
            },
            {
              type: ContentType.NOTE,
              title: '🔹 تشبيه: مطعم صغير متكامل',
              text: 'الـ Monolith يشبه مطعمًا صغيرًا حيث يقوم نفس الطاهي (أو فريق صغير) بإعداد المقبلات، الطبق الرئيسي، والتحلية في مطبخ واحد. كل شيء متماسك وسريع التنسيق، لكن إذا زاد الطلب بشكل كبير على قسم واحد (مثل الحلويات)، فقد يتباطأ المطبخ بأكمله.'
            },
            {
              type: ContentType.DEFINITION_LIST,
              definitionItems: [
                { term: '✅ متى يكون الخيار الأفضل؟', definition: '<b>في البداية دائمًا تقريبًا.</b> عند إطلاق منتجك الأولي (MVP) أو عندما يكون فريقك صغيرًا (1-5 مطورين)، يكون الـ Monolith هو الخيار الأسرع والأبسط. إنه يقلل من التعقيد التشغيلي ويسمح لك بالتركيز على بناء الميزات والتحقق من صحة فكرتك في السوق.' },
                { term: '❌ متى يصبح مشكلة؟', definition: 'مع نمو قاعدة الكود والفريق، يصبح من الصعب فهمه وتعديله (ما يعرف بـ "Big Ball of Mud"). أي تغيير صغير يتطلب اختبار ونشر التطبيق بأكمله، مما يبطئ من وتيرة الابتكار. كما أن أي خطأ في جزء واحد يمكن أن يتسبب في انهيار النظام بأكمله.' }
              ]
            },
            { type: ContentType.HEADING4, text: 'حالة دراسية: Shopify والـ Majestic Monolith'},
            { type: ContentType.PARAGRAPH, text: 'Shopify، إحدى أكبر منصات التجارة الإلكترونية في العالم، لا تزال تعمل على بنية Monolith مكتوبة بلغة Ruby on Rails. كيف يمكن ذلك؟ لأنهم استثمروا في بناء "Monolith جيد التصميم". قاموا بتقسيم الكود داخليًا إلى وحدات (modules) واضحة المعالم مع حدود صارمة بينها. هذا يسمح لفرق متعددة بالعمل على أجزاء مختلفة من الكود دون التداخل بشكل كبير، مع الاستفادة من بساطة النشر والاختبار في بيئة واحدة.'},
            {
              type: ContentType.HEADING3,
              text: '2. Microservices (الخدمات المصغّرة)'
            },
            {
              type: ContentType.PARAGRAPH,
              text: '<b>الوصف:</b> يتم تقسيم التطبيق إلى مجموعة من الخدمات الصغيرة والمستقلة التي يمكن تطويرها ونشرها بشكل منفصل. كل خدمة تكون مسؤولة عن وظيفة عمل واحدة (مثل خدمة للمصادقة، خدمة للفواتير، خدمة للإشعارات) وتتواصل مع الخدمات الأخرى عبر واجهات API أو قوائم انتظار الرسائل.'
            },
            {
              type: ContentType.NOTE,
              title: '🔹 تشبيه: قاعة طعام (Food Court)',
              text: 'الخدمات المصغرة تشبه قاعة طعام في مركز تجاري. هناك مطعم متخصص في البيتزا، وآخر في البرجر، وثالث في العصائر. كل مطبخ يعمل بشكل مستقل، يستخدم أدواته الخاصة، ويمكنه التوسع أو التغيير دون التأثير على الآخرين. الزبون (بوابة API) يجمع طلبه من المطاعم المختلفة.'
            },
            {
              type: ContentType.DEFINITION_LIST,
              definitionItems: [
                { term: '✅ متى يكون الخيار الأفضل؟', definition: 'عندما يصبح الـ Monolith كبيرًا جدًا وبطيئًا، وعندما ينمو الفريق الهندسي ليضم عدة فرق متخصصة. يسمح للفرق بالعمل بشكل مستقل، ويحسن من قابلية التوسع (يمكنك توسيع خدمة الفواتير فقط دون لمس الخدمات الأخرى)، ويزيد من المرونة التقنية (يمكن كتابة خدمة بلغة Python وأخرى بـ Go).' },
                { term: '❌ متى يكون فخًا؟', definition: 'اعتماد هذا النمط في وقت مبكر جدًا هو خطأ شائع وقاتل للشركات الناشئة. إنه يضيف تعقيدًا تشغيليًا هائلاً (مراقبة، نشر، وتنسيق خدمات متعددة)، ويتطلب خبرة قوية في DevOps. غالبًا ما يشار إليه بـ "ضريبة الخدمات المصغرة".' }
              ]
            },
            { type: ContentType.HEADING4, text: 'تحدي المعاملات الموزعة ونمط Saga'},
            { type: ContentType.PARAGRAPH, text: 'في Monolith، يمكنك تغليف عمليات متعددة في معاملة قاعدة بيانات واحدة (ACID). في الخدمات المصغرة، هذا غير ممكن لأن كل خدمة لها قاعدة بياناتها الخاصة. ماذا يحدث إذا نجحت "خدمة إنشاء المستخدم" وفشلت "خدمة الفوترة"؟ الحل الشائع هو **نمط Saga**. إنه سلسلة من المعاملات المحلية. كل خطوة في العملية تطلق حدثًا. إذا نجحت، يتم تشغيل الخطوة التالية. إذا فشلت، يتم تشغيل سلسلة من "المعاملات التعويضية" التي تلغي الخطوات السابقة.'},
            { type: ContentType.HEADING4, text: 'حالة دراسية: كيف تستخدم Netflix الخدمات المصغرة'},
            { type: ContentType.PARAGRAPH, text: 'تعتبر Netflix المثال الأشهر على النجاح في تطبيق بنية الخدمات المصغرة على نطاق هائل. كل جانب من جوانب خدمتهم، من كتالوج الأفلام، إلى التوصيات، إلى الفوترة، إلى تشفير الفيديو، هو خدمة مصغرة منفصلة. هذا يسمح لهم بنشر تحديثات آلاف المرات يوميًا، وتحقيق مستوى مذهل من الجاهزية (Uptime)، وتجربة تقنيات جديدة في خدمات معزولة دون المخاطرة بتعطيل النظام بأكمله.'},
            {
              type: ContentType.HEADING3,
              text: '3. Serverless (بدون خوادم)'
            },
            {
              type: ContentType.PARAGRAPH,
              text: '<b>الوصف:</b> هذا ليس معناه عدم وجود خوادم، بل معناه أنك كمطور لم تعد تفكر في الخوادم أو تديرها. أنت تكتب كودك كدوال منفصلة (مثل AWS Lambda أو Google Cloud Functions) ويقوم مزود السحابة بتشغيلها تلقائيًا عند الحاجة، ويتولى التوسع من صفر إلى آلاف الطلبات المتزامنة والعودة إلى الصفر مرة أخرى.'
            },
            {
              type: ContentType.DEFINITION_LIST,
              definitionItems: [
                { term: '✅ متى يكون الخيار الأفضل؟', definition: 'للمهام غير المتزامنة، أو التي يتم تشغيلها بشكل متقطع (مثل معالجة الصور عند رفعها، أو إرسال بريد إلكتروني ترحيبي)، أو لواجهات API ذات حركة مرور غير متوقعة. إنه فعال للغاية من حيث التكلفة لأنك تدفع فقط مقابل وقت التنفيذ الفعلي بالمللي ثانية.' },
                { term: '❌ ما هي حدوده؟', definition: 'قد يكون هناك تأخير في البدء البارد (Cold Start) عند تشغيل الدالة لأول مرة. كما أن تصحيح الأخطاء والمراقبة يمكن أن يكونا أكثر تعقيدًا من التطبيقات التقليدية. لا يناسب المهام التي تتطلب اتصالات طويلة الأمد أو حالة مستمرة.' }
              ]
            },
            {
              type: ContentType.NOTE,
              title: '💡 نصيحة عملية: ابدأ بـ Monolith، وخطط للتحول إلى Microservices',
              text: 'الاستراتيجية الأكثر حكمة هي البدء بـ "Monolith جيد التصميم" (Well-structured Monolith). قسّم الكود داخليًا إلى وحدات (modules) منطقية (مثل وحدة للمستخدمين، وحدة للفواتير). هذا يسهل عملية استخراج هذه الوحدات لاحقًا وتحويلها إلى خدمات مصغرة عندما يحين الوقت المناسب لذلك. لا تبدأ بالخدمات المصغرة إلا عندما يصبح الألم الناتج عن الـ Monolith أكبر من ألم التحول إليها.'
            }
          ]
        },
        {
          id: 'part5_ch1_sec3',
          title: 'اختيار الحزمة التقنية المناسبة (Tech Stack)',
          icon: '🧰',
          content: [
            { type: ContentType.PARAGRAPH, text: 'اختيار لغة البرمجة وإطار العمل المناسب يعتمد بشكل كبير على خبرة فريقك، متطلبات الأداء، والنظام البيئي (ecosystem) للمكتبات المتاحة.' },
            { type: ContentType.HEADING3, text: 'تحليل مقارن لأشهر أطر العمل' },
            {
              type: ContentType.DEFINITION_LIST,
              definitionItems: [
                { term: 'Node.js (مع Express/NestJS)', definition: '<b>الفلسفة:</b> السرعة والأداء العالي للمدخلات/المخرجات (I/O) بفضل نموذجها غير المتزامن القائم على الأحداث (event-driven, non-blocking I/O). مثالي للتطبيقات التي تتطلب تعاملًا مع عدد كبير من الاتصالات المتزامنة مثل تطبيقات الدردشة، الإشعارات، أو واجهات API التي تعمل كوسيط. <b>NestJS</b> يضيف طبقة قوية من التنظيم والهيكلة فوق Express، مما يجعله خيارًا ممتازًا لتطبيقات المؤسسات.' },
                { term: 'Python (مع Django/FastAPI)', definition: '<b>الفلسفة:</b> سرعة التطوير والوضوح. <b>Django</b> يأتي مع "بطاريات متضمنة" (admin panel, ORM, authentication)، مما يجعله مثاليًا للأنظمة المعقدة التي تتطلب إدارة محتوى أو عمليات خلفية قوية. <b>FastAPI</b> يركز على الأداء العالي والتوثيق التلقائي لواجهات API، وهو خيار ممتاز لواجهات API التي تخدم نماذج تعلم الآلة أو تتطلب استجابة سريعة.' },
                { term: 'Ruby on Rails', definition: '<b>الفلسفة:</b> "الاتفاقية فوق التكوين" (Convention over Configuration). يهدف إلى جعل المطور سعيدًا ومنتجًا من خلال توفير مسار واضح ومحدد لبناء تطبيقات الويب. لا يزال خيارًا قويًا جدًا لبناء المنتجات الأولية (MVPs) والأنظمة المتوسطة بسرعة قياسية.' },
              ]
            },
            { type: ContentType.NOTE, title: '🔹 القرار ليس تقنيًا بحتًا', text: 'العامل الأهم في اختيار الحزمة التقنية هو: <b>ما هي اللغة التي يجيدها فريقك الحالي أو يمكن توظيف مطورين لها بسهولة؟</b>. تطبيق مكتوب بلغة "أبطأ" ولكنه مصمم جيدًا ومفهوم لفريقك سيكون دائمًا أفضل من تطبيق مكتوب بلغة "أسرع" ولكن لا أحد يعرف كيفية صيانته.' }
          ]
        },
        {
          id: 'part5_ch1_sec4',
          title: 'تصميم قاعدة البيانات لـ SaaS: قوة PostgreSQL',
          icon: '🗃️',
          content: [
            { type: ContentType.PARAGRAPH, text: 'قاعدة البيانات هي قلب نظامك. في حين أن هناك العديد من الخيارات، أثبتت <b>PostgreSQL</b> نفسها كخيار مفضل لمعظم تطبيقات SaaS الحديثة لمزيجها الفريد من الموثوقية، المرونة، والميزات المتقدمة.' },
            { type: ContentType.HEADING3, text: 'لماذا PostgreSQL تتفوق في SaaS؟' },
            {
              type: ContentType.LIST_UNORDERED,
              items: [
                '<b>الموثوقية و ACID Compliance:</b> تضمن أن معاملاتك (مثل تسجيل مستخدم جديد وإنشاء اشتراكه) إما أن تكتمل بنجاح بالكامل أو تفشل بالكامل، مما يمنع البيانات غير المتسقة.',
                '<b>دعم JSONB:</b> يمكنك تخزين بيانات JSON غير منظمة والبحث فيها بكفاءة داخل قاعدة بياناتك العلائقية، مما يمنحك أفضل ما في عالمي SQL و NoSQL.',
                '<b>ملحقات قوية (Extensions):</b> مثل PostGIS (للبيانات الجغرافية) و TimescaleDB (للبيانات الزمنية)، مما يسمح لك بتوسيع قدرات قاعدة البيانات دون الحاجة إلى نظام منفصل.',
                '<b>الأمان المتقدم:</b> الميزة الأهم هي <b>Row-Level Security (RLS)</b>، والتي سنتناولها بالتفصيل، وهي تعتبر شبكة أمان حاسمة في بنية Multi-Tenant.'
              ]
            },
            {
                type: ContentType.HEADING3,
                text: 'النماذج الثلاثة لعزل البيانات: شقة، تاون هاوس، أم فيلا؟'
            },
            {
                type: ContentType.PARAGRAPH,
                text: 'اختيار نموذج عزل البيانات هو القرار المعماري الأهم في نظامك. لا يوجد حل "أفضل" للجميع، بل هو موازنة بين التكلفة والأمان وسهولة الإدارة. دعنا نستكشف النماذج الثلاثة باستخدام تشبيهات من عالم العقارات.'
            },
            {
                type: ContentType.DEFINITION_LIST,
                definitionItems: [
                    { term: '1. Shared Database, Shared Schema (نموذج الشقة)', definition: '<b>الوصف:</b> جميع المستأجرين يستخدمون نفس قاعدة البيانات ونفس الجداول. يتم التمييز بينهم عبر حقل `tenant_id` في كل جدول. هذا هو النموذج الأكثر شيوعًا للشركات الناشئة بسبب بساطته وتكلفته المنخفضة. <b>المخاطر:</b> يتطلب انضباطًا برمجيًا صارمًا لمنع تسرب البيانات، ومشكلة "الجار المزعج" حيث يمكن لمستأجر واحد أن يبطئ أداء الجميع.' },
                    { term: '2. Shared Database, Separate Schema (نموذج التاون هاوس)', definition: '<b>الوصف:</b> نفس قاعدة البيانات، لكن لكل مستأجر مخطط (Schema) منفصل يحتوي على جداوله الخاصة. يوفر عزلاً منطقيًا قويًا. <b>المخاطر:</b> عملية ترحيل البيانات (تغيير بنية الجداول) تصبح كابوسًا حيث يجب تطبيقها على كل مخطط على حدة.' },
                    { term: '3. Separate Database (نموذج الفيلا الخاصة)', definition: '<b>الوصف:</b> كل مستأجر له قاعدة بيانات كاملة منفصلة. يوفر أعلى مستوى من العزل والأمان والأداء. <b>المخاطر:</b> تكاليف تشغيلية باهظة وتعقيد هائل في الإدارة والتحديثات.' },
                ]
            },
             { type: ContentType.CODE_EXPLANATION,
                language: 'sql',
                codeTitle: 'مثال تصميم جدول المستخدمين (نموذج الشقة الشائع)',
                code: `CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL
);

CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    UNIQUE (tenant_id, email) -- البريد الإلكتروني فريد داخل الشركة الواحدة
);

-- كل استعلام يجب أن يتضمن شرط tenant_id
-- SELECT * FROM tasks WHERE user_id = ? AND tenant_id = ?;`,
                explanations: [
                    { lines: "1-4", explanation: "جدول لتخزين معلومات المستأجرين (الشركات المشتركة)." },
                    { lines: "10", explanation: "العمود الحاسم الذي يربط كل مستخدم بالمستأجر الخاص به. `ON DELETE CASCADE` تضمن حذف جميع مستخدمي المستأجر عند حذف المستأجر نفسه." },
                    { lines: "11", explanation: "قيد فريد يضمن أن البريد الإلكتروني لا يتكرر داخل نفس المستأجر، ولكنه يمكن أن يوجد في مستأجر آخر." }
                ]
            },
          ]
        },
        {
          id: 'part5_ch1_sec5',
          title: 'تصميم واجهة برمجة التطبيقات (API) داعمة لـ Multi-Tenant',
          icon: '🧩',
          content: [
            { type: ContentType.PARAGRAPH, text: 'واجهة API هي العقد الذي يربط بين الواجهة الأمامية والخلفية. يجب تصميمها لتكون واضحة، آمنة، وداعمة لتعدد المستأجرين منذ اليوم الأول.'},
            { type: ContentType.HEADING3, text: 'تحديد المستأجر (Tenant Identification)'},
            { type: ContentType.PARAGRAPH, text: 'كيف يعرف النظام أي مستأجر يقدم الطلب؟ الطرق الشائعة تشمل:'},
            {
                type: ContentType.LIST_UNORDERED,
                items: [
                    '<b>عبر Subdomain (النطاق الفرعي):</b> مثل `acme.yoursaas.com`. هذه هي الطريقة الأكثر احترافية لتطبيقات B2B.',
                    '<b>عبر JWT Token:</b> بعد تسجيل الدخول، يتم تضمين `tenant_id` داخل حمولة (payload) توكن المصادقة. هذه طريقة آمنة وشائعة جدًا.'
                ]
            },
            {
              type: ContentType.HEADING3,
              text: 'إدارة إصدارات API (API Versioning)'
            },
            {
              type: ContentType.PARAGRAPH,
              text: 'مع تطور تطبيقك، ستحتاج إلى تغيير واجهة API الخاصة بك. ولكن لا يمكنك كسر التكامل مع العملاء القدامى (خاصة تطبيقات الهاتف المحمول). إدارة الإصدارات أمر حاسم. الطرق الشائعة هي:'
            },
            {
              type: ContentType.LIST_UNORDERED,
              items: [
                '<b>في مسار URL (URL Path):</b> الأكثر شيوعًا ووضوحًا. `https://api.yoursaas.com/v1/tasks` و `https://api.yoursaas.com/v2/tasks`.',
                '<b>في رأس مخصص (Custom Header):</b> `Accept: application/vnd.yoursaas.v1+json`. أكثر مرونة ولكن أقل قابلية للاكتشاف.',
              ]
            },
            {
              type: ContentType.HEADING3,
              text: 'تصميم API غير متكررة (Idempotent APIs)'
            },
            {
              type: ContentType.PARAGRAPH,
              text: 'في العمليات الحساسة مثل إنشاء فاتورة أو إجراء دفعة، ماذا يحدث إذا قام العميل بإرسال نفس الطلب مرتين بسبب مشكلة في الشبكة؟ يجب أن تضمن واجهة API الخاصة بك أن تنفيذ الطلب مرتين له نفس تأثير تنفيذه مرة واحدة. هذا ما يعرف بـ "Idempotency".'
            },
            {
              type: ContentType.CODE_EXPLANATION,
              language: 'python',
              codeTitle: 'مثال Idempotency باستخدام رأس مخصص (Python/Flask)',
              code: `import redis
cache = redis.Redis()

@app.route('/api/invoices', methods=['POST'])
@jwt_required()
def create_invoice():
    idempotency_key = request.headers.get('Idempotency-Key')
    if not idempotency_key:
        return jsonify({'error': 'Idempotency-Key header is required'}), 400

    # تحقق مما إذا كان هذا المفتاح قد تمت معالجته بالفعل
    if cache.get(idempotency_key):
        return jsonify({'message': 'Request already processed'}), 200

    # ... منطق إنشاء الفاتورة هنا ...
    invoice = create_invoice_in_db()

    # قم بتخزين المفتاح في Redis مع فترة انتهاء صلاحية (مثلاً 24 ساعة)
    cache.set(idempotency_key, invoice.id, ex=86400)
    
    return jsonify(invoice.to_dict()), 201`,
              explanations: [
                { lines: '6', explanation: 'يتوقع الخادم أن يرسل العميل رأسًا فريدًا لكل عملية جديدة.' },
                { lines: '11-13', explanation: 'قبل تنفيذ أي شيء، يتحقق الخادم في ذاكرة التخزين المؤقت (Redis) مما إذا كان هذا المفتاح قد شوهد من قبل. إذا كان الأمر كذلك، فإنه يعيد الاستجابة الأصلية دون تكرار العملية.' },
                { lines: '19', explanation: 'بعد إكمال العملية بنجاح، يتم تخزين المفتاح للإشارة إلى أن هذه العملية قد تمت.' }
              ]
            }
          ]
        },
        {
          id: 'part5_ch1_sec6',
          title: 'المصادقة والتفويض المتقدم (AuthN & AuthZ)',
          icon: '🔑',
          content: [
            { type: ContentType.PARAGRAPH, text: '<b>المصادقة (Authentication - AuthN)</b> تجيب على سؤال "من أنت؟". <b>التفويض (Authorization - AuthZ)</b> يجيب على سؤال "ما الذي يُسمح لك بفعله؟". كلاهما حاسم للأمان.' },
            { type: ContentType.HEADING3, text: 'التفويض: RBAC مقابل ABAC' },
            {
              type: ContentType.DEFINITION_LIST,
              definitionItems: [
                { term: 'التحكم في الوصول القائم على الأدوار (Role-Based Access Control - RBAC)', definition: 'النموذج الأكثر شيوعًا. يتم تعيين صلاحيات لأدوار (مثل `admin`, `editor`, `viewer`)، ثم يتم تعيين هذه الأدوار للمستخدمين. إنه بسيط وسهل الفهم.' },
                { term: 'التحكم في الوصول القائم على السمات (Attribute-Based Access Control - ABAC)', definition: 'نموذج أكثر قوة ومرونة. يتم اتخاذ قرارات التفويض بناءً على مجموعة من السمات (مثل دور المستخدم، قسمه، موقع المشروع، حساسية البيانات). إنه أكثر تعقيدًا في التنفيذ ولكنه يوفر تحكمًا دقيقًا للغاية.' }
              ]
            },
            { type: ContentType.CODE_EXPLANATION, language: 'python', codeTitle: 'مثال Middleware للتفويض (RBAC)',
            code: `from functools import wraps

def requires_role(required_role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            user_role = get_user_role_from_jwt() # احصل على دور المستخدم
            if user_role != required_role and user_role != 'owner':
                return jsonify({'message': 'Forbidden'}), 403
            return f(*args, **kwargs)
        return decorated_function
    return decorator

@app.route('/api/tenants/settings', methods=['PUT'])
@jwt_required()
@requires_role('admin') # فقط الأدمن أو المالك يمكنهم الوصول
def update_tenant_settings():
    # ... منطق التحديث ...
    return jsonify({'message': 'Settings updated'})
`,
            explanations: [
                { lines: '3', explanation: 'هذا مُزيِّن (decorator) يقبل الدور المطلوب كوسيطة.'},
                { lines: '8-9', explanation: 'يتم فحص دور المستخدم المستخرج من توكن JWT. إذا لم يكن لديه الدور المطلوب (أو دور `owner` الأعلى)، يتم إرجاع خطأ 403 Forbidden.'},
                { lines: '16', explanation: 'تطبيق المُزيِّن على نقطة النهاية يضمن تشغيل فحص الصلاحيات قبل تنفيذ منطق العمل.'}
            ]}
          ]
        },
        {
          id: 'part5_ch1_sec7',
          title: 'دمج نظام الدفع باحترافية: Stripe API',
          icon: '💳',
          content: [
            { type: ContentType.PARAGRAPH, text: 'إدارة الفوترة والاشتراكات هي عملية معقدة ومحفوفة بالمخاطر الأمنية. محاولة بناء هذا النظام من الصفر هو خطأ فادح. <b>Stripe</b> هي الأداة القياسية للمطورين للتعامل مع كل هذا التعقيد.' },
            { type: ContentType.HEADING3, text: 'دورة حياة الاشتراك مع Stripe' },
            {
              type: ContentType.CODE_BLOCK,
              language: 'python',
              code: `# 1. إنشاء عميل في Stripe عند تسجيل مستخدم جديد
customer = stripe.Customer.create(
    email=user.email,
    name=user.name,
    metadata={'app_user_id': user.id} # الربط بين النظامين
)
# user.stripe_customer_id = customer.id
# db.session.commit()

# 2. إنشاء اشتراك للعميل
subscription = stripe.Subscription.create(
    customer=user.stripe_customer_id,
    items=[{'price': 'price_pro_monthly'}], # price_id من لوحة تحكم Stripe
    trial_period_days=14,
    metadata={'tenant_id': user.tenant_id}
)

# 3. تخزين حالة الاشتراك في قاعدة بياناتك
# new_sub = Subscription(id=subscription.id, status=subscription.status, ...)
# db.session.add(new_sub)`
            },
            {
              type: ContentType.HEADING3,
              text: 'التعامل مع Webhooks: المصدر الوحيد للحقيقة'
            },
            {
              type: ContentType.PARAGRAPH,
              text: 'لا تعتمد على نتيجة طلب API لمعرفة ما إذا كان الدفع قد نجح. المصدر الوحيد الموثوق به هو <b>Stripe Webhooks</b>. Webhooks هي إشعارات آلية يرسلها Stripe إلى خادمك عند وقوع أحداث معينة (مثل نجاح الدفع، فشل الفاتورة، إلغاء الاشتراك).'
            },
            {
              type: ContentType.CODE_EXPLANATION,
              language: 'python',
              codeTitle: 'مثال نقطة نهاية Webhook (Python/Django)',
              code: `@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.headers.get('Stripe-Signature')
    endpoint_secret = settings.STRIPE_WEBHOOK_SECRET
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError:
        return HttpResponse(status=400) # حمولة غير صالحة
    except stripe.error.SignatureVerificationError:
        return HttpResponse(status=400) # توقيع غير صالح

    # التعامل مع حدث نجاح دفع الفاتورة
    if event['type'] == 'invoice.payment_succeeded':
        invoice = event['data']['object']
        handle_payment_succeeded(invoice)
    
    # التعامل مع حدث فشل الدفع
    elif event['type'] == 'invoice.payment_failed':
        invoice = event['data']['object']
        # أرسل إشعارًا للمستخدم لتحديث بطاقته
        send_payment_failed_email(invoice.customer_email)

    # التعامل مع حدث إلغاء الاشتراك
    elif event['type'] == 'customer.subscription.deleted':
        subscription = event['data']['object']
        handle_subscription_canceled(subscription)

    return HttpResponse(status=200)`,
              explanations: [
                { lines: '1', explanation: 'يجب تعطيل حماية CSRF لهذه النقطة لأن الطلب يأتي من خوادم Stripe وليس من مستخدم لديه جلسة.' },
                { lines: '7-13', explanation: '<b>الخطوة الأكثر أهمية:</b> التحقق من توقيع Webhook. هذا يضمن أن الطلب جاء بالفعل من Stripe وليس من جهة خبيثة تحاول التلاعب بنظامك.' },
                { lines: '21-24', explanation: 'التعامل مع فشل الدفع لا يقل أهمية عن التعامل مع النجاح. يجب إعلام المستخدم لاتخاذ إجراء وتجنب الانصراف غير الطوعي (involuntary churn).' }
              ]
            }
          ]
        },
        {
          id: 'part5_ch1_sec8',
          title: 'الأمان الشامل للواجهة الخلفية',
          icon: '🛡️',
          content: [
            { type: ContentType.PARAGRAPH, text: 'الأمان ليس ميزة، بل هو أساس يجب أن يُبنى عليه كل شيء. في نظام SaaS، أنت مسؤول عن بيانات آلاف العملاء.' },
            {
              type: ContentType.DEFINITION_LIST,
              definitionItems: [
                { term: 'منع حقن SQL (SQL Injection)', definition: 'استخدم دائمًا <b>ORM (Object-Relational Mapper)</b> مثل SQLAlchemy أو Django ORM، أو استخدم <b>العبارات المُعدة (Prepared Statements)</b>. لا تقم أبدًا بدمج مدخلات المستخدم مباشرة في سلسلة استعلام SQL.' },
                { term: 'إدارة الأسرار (Secret Management)', definition: '<b>لا تكتب أبدًا مفاتيح API أو كلمات سر قاعدة البيانات مباشرة في الكود.</b> استخدم متغيرات البيئة (Environment Variables) في التطوير المحلي، واستخدم خدمة متخصصة لإدارة الأسرار في الإنتاج مثل <b>AWS Secrets Manager</b>, <b>HashiCorp Vault</b>, أو <b>Doppler</b>. هذه الأدوات تخزن الأسرار بشكل مشفر وتوفرها للتطبيق بأمان عند بدء التشغيل.'},
                { term: 'أمان رفع الملفات', definition: 'لا تثق أبدًا في اسم الملف أو نوع MIME الذي يرسله العميل. قم بالتحقق من نوع الملف على الخادم، وقم بتغيير اسم الملف إلى معرف فريد، وقم برفع الملفات مباشرة إلى خدمة تخزين كائنات (Object Storage) مثل <b>AWS S3</b>، وقم بتقديمها من نطاق فرعي منفصل أو عبر CDN لمنع تنفيذ أي كود خبيث قد يكون مخبأً في الملف.' },
                { term: 'أمان الاعتماديات (Dependency Security)', definition: 'استخدم أدوات مثل <b>npm audit</b> أو <b>GitHub Dependabot</b> لفحص مكتبات الطرف الثالث التي تستخدمها بانتظام بحثًا عن ثغرات أمنية معروفة وتحديثها.' },
              ]
            },
            {
              type: ContentType.CODE_BLOCK,
              language: 'python',
              codeTitle: 'مثال على استخدام عبارة معدة (Python/psycopg2)',
              code: `# ❌ خطر: عرضة لحقن SQL
cursor.execute(f"SELECT * FROM users WHERE id = '{user_id}'")

# ✅ آمن: استخدام تمرير المعلمات
# يقوم ড্রাইفر قاعدة البيانات بتعقيم المدخلات
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))`
            }
          ]
        },
        {
          id: 'part5_ch1_sec9',
          title: 'تحسين الأداء المتقدم: التخزين المؤقت وقوائم الانتظار',
          icon: '📈',
          content: [
            {
              type: ContentType.HEADING3,
              text: 'التخزين المؤقت (Caching) باستخدام Redis'
            },
            {
              type: ContentType.PARAGRAPH,
              text: 'الوصول إلى قاعدة البيانات هو أبطأ جزء في معظم التطبيقات. التخزين المؤقت هو عملية تخزين البيانات التي يتم الوصول إليها بشكل متكرر في ذاكرة سريعة مثل <b>Redis</b> لتقليل الحمل على قاعدة البيانات. استراتيجية "Cache-Aside" هي الأكثر شيوعًا.'
            },
            {
              type: ContentType.CODE_BLOCK,
              language: 'javascript',
              codeTitle: 'مثال Cache-Aside (Node.js/Redis)',
              code: `app.get('/api/tasks', async (req, res) => {
  const cacheKey = \`tasks:\${req.tenant.id}\`;
  
  // 1. حاول الحصول على البيانات من ذاكرة التخزين المؤقت أولاً
  const cached = await redis.get(cacheKey);
  if (cached) {
    return res.json(JSON.parse(cached));
  }

  // 2. إذا لم تكن موجودة، احصل عليها من قاعدة البيانات
  const tasks = await db.query('SELECT * FROM tasks WHERE tenant_id = ?', [req.tenant.id]);
  
  // 3. قم بتخزينها في ذاكرة التخزين المؤقت للطلبات المستقبلية
  await redis.setex(cacheKey, 300, JSON.stringify(tasks)); // تخزين لمدة 5 دقائق

  res.json(tasks);
});`
            },
            {
              type: ContentType.NOTE,
              title: '⚠️ أصعب مشكلة في علوم الكمبيوتر',
              text: 'يقال إن هناك مشكلتين صعبتين في علوم الكمبيوتر: تسمية الأشياء، وإبطال صلاحية ذاكرة التخزين المؤقت (Cache Invalidation). عند تحديث البيانات، يجب أن تتذكر إما حذفها من ذاكرة التخزين المؤقت أو تحديثها لضمان عدم تقديم بيانات قديمة للمستخدم.'
            },
            {
              type: ContentType.HEADING3,
              text: 'قوائم الانتظار غير المتزامنة (Asynchronous Queues)'
            },
            {
              type: ContentType.PARAGRAPH,
              text: 'ماذا يحدث إذا طلب مستخدم تصدير تقرير كبير يستغرق 30 ثانية؟ لا يمكنك جعل المستخدم ينتظر كل هذا الوقت. الحل هو معالجة المهام الطويلة في الخلفية باستخدام نظام قائمة انتظار مثل <b>Celery (مع RabbitMQ أو Redis)</b>.'
            },
            {
              type: ContentType.HEADING4,
              text: 'حالة دراسية: كيف تستخدم Slack قوائم الانتظار'
            },
            {
              type: ContentType.PARAGRAPH,
              text: 'تستخدم Slack قوائم الانتظار بشكل مكثف للحفاظ على استجابة تطبيقها. عندما تكتب رسالة وتلصق رابطًا، لا ينتظر الخادم حتى يتم تحليل الرابط وإنشاء معاينة له (unfurling). بدلاً من ذلك، يتم إرسال الرسالة على الفور، ويتم وضع مهمة "unfurl_link" في قائمة انتظار. يقوم عامل منفصل بمعالجة هذه المهمة في الخلفية، وعندما ينتهي، يرسل تحديثًا عبر WebSocket لاستبدال الرابط بالمعاينة الغنية. هذا يضمن أن تجربة الدردشة تظل فورية.'
            },
            {
              type: ContentType.CODE_EXPLANATION,
              language: 'python',
              codeTitle: 'مثال Celery مع قائمة انتظار الرسائل الميتة (DLQ)',
              code: `# tasks.py - ملف تعريف مهام Celery
from celery import Celery

app = Celery('tasks', broker='redis://localhost:6379/0')

@app.task(bind=True, max_retries=3, default_retry_delay=60)
def generate_report(self, tenant_id, user_id):
    try:
        # ... منطق إنشاء التقرير الذي قد يفشل ...
        report_data = create_large_report_data()
        send_notification(user_id, "Your report is ready!")
    except Exception as exc:
        # إذا فشلت، أعد المحاولة بعد 60 ثانية، حتى 3 مرات
        raise self.retry(exc=exc)


# views.py - نقطة نهاية API التي تبدأ المهمة
@app.route('/api/reports', methods=['POST'])
def request_report():
    generate_report.delay(current_user.tenant_id, current_user.id)
    return jsonify({'message': 'Report generation started.'}), 202`,
              explanations: [
                { lines: '6', explanation: '`bind=True` يسمح للمهمة بالوصول إلى نفسها. `max_retries` و `default_retry_delay` يحددان سلوك إعادة المحاولة التلقائي.' },
                { lines: '12', explanation: 'إذا حدث استثناء، فإن استدعاء `self.retry` يخبر Celery بإعادة جدولة المهمة بدلاً من الفشل النهائي.'}
              ]
            },
            {
                type: ContentType.NOTE,
                title: 'قائمة انتظار الرسائل الميتة (DLQ)',
                text: 'إذا فشلت المهمة بعد كل المحاولات، يمكن تكوين Celery لإرسالها إلى **قائمة انتظار الرسائل الميتة (Dead Letter Queue - DLQ)**. هذا يسمح للمهندسين بفحص المهام الفاشلة يدويًا وتحديد سبب المشكلة دون فقدان المهمة.'
            }
          ]
        },
        {
          id: 'part5_ch1_sec11',
          title: 'الخلاصة وتمارين تطبيقية',
          icon: '📚',
          content: [
            {
              type: ContentType.PARAGRAPH,
              text: 'الواجهة الخلفية لنظام SaaS هي آلة معقدة تتطلب توازنًا دقيقًا بين السرعة والأمان وقابلية التوسع. القرارات المعمارية التي تتخذها في وقت مبكر سيكون لها تأثير دائم على نجاح منتجك.'
            },
            {
              type: ContentType.PARAGRAPH,
              text: 'من خلال هذا الفصل، تعلمت:'
            },
            {
              type: ContentType.LIST_UNORDERED,
              items: [
                'كيفية اختيار النمط المعماري المناسب (Monolith vs. Microservices) ومتى تنتقل بينهما.',
                'تصميم قاعدة بيانات Multi-tenant واعية بالأمان باستخدام PostgreSQL و RLS.',
                'تنفيذ واجهات API قوية وغير متكررة (Idempotent) مع إدارة الإصدارات.',
                'دمج Stripe والتعامل مع Webhooks بشكل آمن.',
                'استخدام التخزين المؤقت وقوائم الانتظار لتحسين الأداء بشكل جذري.',
                'أهمية إدارة الأسرار (Secrets) وعدم كتابتها مباشرة في الكود.',
              ]
            },
            {
              type: ContentType.HEADING3,
              text: '📝 تمارين تطبيقية'
            },
            {
              type: ContentType.DEFINITION_LIST,
              definitionItems: [
                { term: '1. تطبيق RLS على جدول المهام', definition: 'قم بإعداد قاعدة بيانات PostgreSQL، وأنشئ جدول المهام كما هو موضح، ثم قم بتطبيق سياسة Row-Level Security عليه. حاول الاستعلام عن الجدول قبل وبعد تعيين متغير الجلسة `app.current_tenant_id` لترى الفرق.' },
                { term: '2. كتابة نقطة نهاية Webhook آمنة', definition: 'أنشئ نقطة نهاية أساسية في إطار العمل المفضل لديك تتحقق من توقيع Stripe Webhook. يمكنك استخدام Stripe CLI لمحاكاة إرسال أحداث Webhook إلى خادمك المحلي.' },
                { term: '3. تصميم واجهة API مع إصدارات', definition: 'صمم مسارين (routes) لواجهة API، واحد لـ `/api/v1/tasks` وآخر لـ `/api/v2/tasks`. اجعل الإصدار الثاني يعيد حقلًا إضافيًا لا يوجد في الإصدار الأول.'},
                { term: '4. تصميم Saga لتسجيل المستخدم', definition: 'على ورقة أو باستخدام أداة رسم تخطيطي، صمم تدفق Saga لعملية تسجيل مستخدم جديد. يجب أن تتضمن الخطوات: (1) إنشاء سجل المستخدم، (2) إنشاء عميل Stripe، (3) إرسال بريد إلكتروني ترحيبي. لكل خطوة، حدد "المعاملة التعويضية" التي يجب تنفيذها إذا فشلت الخطوة التالية.' }
              ]
            }
          ]
        }
      ]
    }
  ]
};
