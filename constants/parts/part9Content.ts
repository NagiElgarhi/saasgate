
import { Part, ContentType } from '../../types';

export const part9: Part = {
  id: 'part9',
  partTitle: 'الباب التاسع: تحليل البيانات واتخاذ القرار',
  icon: '📊',
  chapters: [
    {
      id: 'part9_chapter1',
      chapterTitle: 'الفصل 9: تحليل البيانات واتخاذ القرار في SaaS – من التتبع إلى النمو القائم على البيانات',
      sections: [
        {
          id: 'part9_ch1_sec1',
          title: 'مقدمة: لماذا لا يمكن إدارة SaaS بدون بيانات؟',
          icon: '📌',
          content: [
            {
              type: ContentType.PARAGRAPH,
              text: 'تخيل أنك تقود طائرة حديثة في ليلة عاصفة. هل ستعتمد على حدسك لتحديد الارتفاع والسرعة واتجاه الريح؟ أم ستنظر إلى لوحة أجهزة القياس التي أمامك، والتي تعرض كل مؤشر حيوي بدقة؟ في عالم **SaaS (Software as a Service)**، إدارة منتجك بدون بيانات تحليلية دقيقة هو تمامًا مثل قيادة تلك الطائرة في الظلام وأنت مغمض العينين. قد تظل في الجو لفترة، ولكن الهبوط الآمن ليس مضمونًا.',
            },
            {
              type: ContentType.PARAGRAPH,
              text: 'العديد من أنظمة SaaS الواعدة تفشل ليس بسبب سوء التصميم أو ضعف التسويق، بل لأن مؤسسيها لا يملكون صورة حقيقية عما يحدث داخل محركهم. إنهم لا يعرفون من هم أفضل عملائهم، ولماذا يغادر الآخرون. لا يفهمون أي الميزات هي الأكثر استخدامًا، وأيها تُهمل تمامًا. وكما يقول بيتر دراكر، أبو الإدارة الحديثة: "لا يمكنك إدارة ما لا يمكنك قياسه. وإذا لم تقيس، فأنت لا تُحسّن. وإذا لم تُحسّن، فأنت تتراجع."',
            },
            {
              type: ContentType.PARAGRAPH,
              text: 'في هذا الفصل، لن نكتفِ بسرد قائمة بأدوات التحليل، بل سنقوم بتشريح عقلية النمو القائم على البيانات. سنبني معًا لوحة أجهزة القياس الخاصة بك، وسنتعلم كيف نقرأ الإشارات التي ترسلها، ونتخذ قرارات استراتيجية بناءً عليها. البيانات ليست مجرد أرقام؛ إنها **صوت عملائك يتحدث إليك بلغة الأفعال**. سندرس:',
            },
            {
              type: ContentType.LIST_UNORDERED,
              items: [
                '<b>كيفية تتبع سلوك المستخدم داخل تطبيق SaaS</b> بشكل دقيق وأخلاقي.',
                '<b>تحليل المؤشرات الحيوية</b> مثل MRR، Churn Rate، LTV، وRetention، وكيفية حسابها وتفسيرها بعمق.',
                '<b>أكواد عملية ومفصلة</b> لجمع البيانات من الواجهة الأمامية، تخزينها في الواجهة الخلفية، وعرضها في لوحة تحكم تفاعلية.',
                '<b>استخدام A/B Testing</b> كأداة علمية لاتخاذ قرارات مبنية على الأدلة، وليس على الآراء الشخصية.',
                '<b>حالات دراسية معمقة</b> من شركات مثل **Notion، Slack، وHubSpot** وكيف استخدمت البيانات لتغذية نموها الأسطوري.',
                '<b>تمارين تطبيقية</b> ستساعدك على بناء لوحة تحكم تحليلية أولية لمنتجك.',
              ],
            },
            {
              type: ContentType.PARAGRAPH,
              text: 'بعد قراءة هذا الفصل، ستكون قادرًا على تحويل منتجك من صندوق أسود غامض إلى نظام شفاف يمكنك فهمه، تحسينه، وتوجيهه نحو النمو المستدام. ستتعلم كيف تستمع إلى ما يخبرك به المستخدمون من خلال أفعالهم، وليس فقط كلماتهم.',
            },
          ]
        },
        {
          id: 'part9_ch1_sec2',
          title: '9.1 لماذا التحليلات ضرورية في SaaS؟',
          icon: '🔍',
          content: [
            { type: ContentType.HEADING3, text: '📘 الفرق بين SaaS والمنتجات التقليدية: مشكلة الدلو المثقوب' },
            { type: ContentType.PARAGRAPH, text: 'لفهم أهمية التحليلات، يجب أن ندرك الفرق الجوهري في نموذج العمل بين SaaS وبيع البرامج التقليدية (On-Premise). في النموذج التقليدي، أنت تبيع منتجًا لمرة واحدة، والعلاقة تنتهي عند البيع. أما في SaaS، فالبيع هو مجرد البداية. أنت تحاول ملء دلو بالماء (العملاء)، لكن هذا الدلو به ثقوب (الانصراف أو Churn). إذا لم تقم بسد الثقوب (الاحتفاظ بالعملاء)، فستظل تصب الماء إلى ما لا نهاية دون أن يمتلئ الدلو أبدًا.' },
            { type: ContentType.PARAGRAPH, text: `<div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
    <!-- Traditional Product -->
    <div class="bg-stone-50 border border-stone-200 rounded-lg p-6 shadow-sm">
        <h4 class="text-xl font-bold text-stone-800 mb-4">📦 منتج تقليدي (بيع لمرة واحدة)</h4>
        <ul class="space-y-3 text-sm text-stone-600">
            <li class="flex items-start gap-2"><strong class="text-sky-600">الإيراد:</strong> يتركز بالكامل في لحظة الشراء.</li>
            <li class="flex items-start gap-2"><strong class="text-sky-600">العلاقة:</strong> قصيرة الأمد، تنتهي بعد البيع.</li>
            <li class="flex items-start gap-2"><strong class="text-sky-600">الانصراف (Churn):</strong> غير ذي صلة.</li>
            <li class="flex items-start gap-2"><strong class="text-sky-600">البيانات المطلوبة:</strong> محدودة (من اشترى؟).</li>
            <li class="flex items-start gap-2"><strong class="text-sky-600">اتخاذ القرار:</strong> نادر (عند التخطيط للإصدار التالي).</li>
        </ul>
    </div>

    <!-- SaaS Product -->
    <div class="bg-stone-50 border border-stone-200 rounded-lg p-6 shadow-sm">
        <h4 class="text-xl font-bold text-stone-800 mb-4">☁️ نظام SaaS (اشتراك متكرر)</h4>
        <ul class="space-y-3 text-sm text-stone-600">
            <li class="flex items-start gap-2"><strong class="text-amber-600">الإيراد:</strong> موزع على مدى حياة العميل.</li>
            <li class="flex items-start gap-2"><strong class="text-amber-600">العلاقة:</strong> طويلة الأمد ومستمرة.</li>
            <li class="flex items-start gap-2"><strong class="text-amber-600">الانصراف (Churn):</strong> المقياس الأكثر خطورة.</li>
            <li class="flex items-start gap-2"><strong class="text-amber-600">البيانات المطلوبة:</strong> مستمرة ودقيقة (من، كيف، متى، ولماذا؟).</li>
            <li class="flex items-start gap-2"><strong class="text-amber-600">اتخاذ القرار:</strong> يومي ومستمر بناءً على سلوك المستخدم.</li>
        </ul>
    </div>
</div>`},
            { type: ContentType.NOTE, text: '🔹 في SaaS، **كل يوم يُمكن أن يُحدث فرقًا**. أنت لا تبيع منتجًا، بل تبيع نتيجة. إذا توقف المستخدم عن تحقيق تلك النتيجة، سيتوقف عن الدفع. والبيانات هي الطريقة الوحيدة لمعرفة ما إذا كان عملاؤك ينجحون أم لا. إذا لم تُحلّل، فأنت تسير في الظلام.' },
            { type: ContentType.HEADING3, text: '🧩 ما الذي يجب أن تُحلّله في SaaS؟' },
            { type: ContentType.PARAGRAPH, text: 'التحليلات ليست مجرد "تتبع النقرات". إنها قصة كاملة عن رحلة عميلك. يمكن تقسيمها إلى فئات رئيسية:'},
            { type: ContentType.DEFINITION_LIST, definitionItems: [
              { term: 'تحليلات التسويق (Marketing Analytics)', definition: '<b>الأسئلة:</b> من أين يأتي أفضل الزوار؟ ما هي القنوات التسويقية الأكثر فعالية؟ كم تكلفة اكتساب العميل (CAC) من كل قناة؟' },
              { term: 'تحليلات المنتج (Product Analytics)', definition: '<b>الأسئلة:</b> ما هي الميزات الأكثر استخدامًا (والأقل استخدامًا)؟ أين يواجه المستخدمون صعوبة في الواجهة؟ كم من الوقت يستغرق المستخدم للوصول إلى "لحظة الإدراك"؟' },
              { term: 'تحليلات الإيرادات (Revenue Analytics)', definition: '<b>الأسئلة:</b> ما هو الإيراد الشهري المتكرر (MRR)؟ ما هو معدل الانصراف (Churn)؟ ما هي القيمة مدى الحياة للعميل (LTV)؟' },
              { term: 'تحليلات الأداء الفني (Performance Analytics)', definition: '<b>الأسئلة:</b> ما هو متوسط زمن تحميل الصفحات؟ كم عدد الأخطاء التي تحدث في الواجهة الخلفية؟ هل هناك تباطؤ في استجابة API؟' },
            ]},
          ]
        },
        {
          id: 'part9_ch1_sec3',
          title: '9.2 المؤشرات الحيوية في SaaS (Key Performance Indicators - KPIs)',
          icon: '📊',
          content: [
            { type: ContentType.HEADING3, text: '1. MRR (Monthly Recurring Revenue) – الإيراد الشهري المتكرر' },
            { type: ContentType.PARAGRAPH, text: 'هذا هو النبض الحي لعملك. إنه ليس مجرد رقم، بل هو قصة نموك (أو تراجعك) شهرًا بعد شهر.' },
            { type: ContentType.HEADING4, text: '📈 الصيغة الأساسية' },
            { type: ContentType.PREFORMATTED_TEXT, text: `MRR = Σ (متوسط الإيراد الشهري لكل عميل)` },
            { type: ContentType.HEADING4, text: '🧮 تشريح التغيرات في MRR (The MRR Waterfall)'},
            { type: ContentType.PARAGRAPH, text: 'لفهم صحة عملك الحقيقية، يجب أن تحلل مكونات MRR. تخيلها كشلال ماء:'},
            { type: ContentType.IMAGE_PLACEHOLDER, alt: 'MRR Waterfall Chart showing New, Expansion, Contraction, and Churn MRR.'},
            { type: ContentType.CODE_BLOCK, language: 'text', code: `Net New MRR = New MRR + Expansion MRR - Contraction MRR - Churned MRR` },
            { type: ContentType.DEFINITION_LIST, definitionItems: [
                { term: 'New MRR', definition: 'الإيراد من العملاء الجدد الذين اشتركوا هذا الشهر.'},
                { term: 'Expansion MRR', definition: 'الإيراد الإضافي من العملاء الحاليين الذين قاموا بالترقية إلى خطة أعلى أو إضافة مستخدمين جدد.'},
                { term: 'Contraction MRR', definition: 'الإيراد المفقود من العملاء الحاليين الذين قاموا بتخفيض خطتهم.'},
                { term: 'Churned MRR', definition: 'الإيراد المفقود من العملاء الذين ألغوا اشتراكهم بالكامل هذا الشهر.'},
            ]},
            { type: ContentType.NOTE, title: '🔹 التحليل العميق', text: 'شركة قد يكون لديها New MRR مرتفع، لكن إذا كان Churned MRR مرتفعًا أيضًا، فهذا يشبه محاولة ملء دلو مثقوب. المشكلة ليست في جذب العملاء، بل في الاحتفاظ بهم. الوصول إلى **Net Negative Churn** (حيث يكون Expansion MRR أكبر من Churned MRR) هو الهدف الأسمى، ويعني أن عملك ينمو حتى لو لم تكتسب أي عميل جديد.' },
            { type: ContentType.HEADING3, text: '2. Churn Rate – معدل ترك العملاء' },
            { type: ContentType.PARAGRAPH, text: 'هذا هو العدو الصامت لكل شركة SaaS. إنه النسبة المئوية للعملاء أو الإيرادات التي تفقدها كل شهر.'},
            { type: ContentType.HEADING4, text: 'Customer Churn vs. Revenue Churn'},
            { type: ContentType.LIST_UNORDERED, items: [
              '<b>Customer Churn:</b> نسبة العملاء الذين يغادرون. `(عدد العملاء المغادرين / إجمالي العملاء) * 100`',
              '<b>Revenue Churn:</b> نسبة الإيرادات المفقودة. `(MRR المفقود / إجمالي MRR) * 100`'
            ]},
            { type: ContentType.PARAGRAPH, text: '<b>لماذا Revenue Churn أكثر أهمية؟</b> تخيل أنك فقدت 10 عملاء من الخطة الأساسية (10$ لكل منهم) واكتسبت عميلًا واحدًا من خطة المؤسسات (500$). لقد فقدت 9 عملاء (Customer Churn مرتفع)، لكن إيراداتك زادت (Revenue Churn قد يكون سالبًا). التركيز على Revenue Churn يجعلك تهتم بعملائك الأكثر قيمة.'},
            { type: ContentType.NOTE, title: '✅ معدل جيد', text: 'أقل من 5-7% سنويًا لشركات B2B التي تستهدف المؤسسات الكبيرة، وأقل من 3-5% شهريًا لشركات B2C أو التي تستهدف الشركات الصغيرة.'},
            { type: ContentType.HEADING3, text: '3. LTV (Customer Lifetime Value) – القيمة مدى الحياة للعميل' },
            { type: ContentType.PARAGRAPH, text: 'هذا هو إجمالي الإيرادات التي تتوقع الحصول عليها من عميل واحد قبل أن يغادر. إنه يخبرك كم يمكنك أن تنفق لاكتساب عميل جديد.'},
            { type: ContentType.PREFORMATTED_TEXT, text: `LTV = (متوسط الإيراد لكل حساب - ARPA) / (معدل انصراف العملاء)`},
            { type: ContentType.PARAGRAPH, text: '<b>مثال:</b> إذا كان متوسط اشتراكك 50$ شهريًا ومعدل الانصراف 5% (0.05)، فإن LTV = 50 / 0.05 = **1,000$**.'},
            { type: ContentType.HEADING3, text: '4. CAC (Customer Acquisition Cost) – تكلفة جذب عميل' },
            { type: ContentType.PARAGRAPH, text: 'كم يكلفك إقناع شخص ما بأن يصبح عميلاً؟'},
            { type: ContentType.PREFORMATTED_TEXT, text: `CAC = (إجمالي تكاليف التسويق والمبيعات) / (عدد العملاء الجدد)`},
            { type: ContentType.PARAGRAPH, text: '<b>مثال:</b> أنفقت 10,000$ على إعلانات ورواتب فريق التسويق في شهر واحد وجذبت 200 عميل جديد. CAC = 10,000 / 200 = **50$**.'},
            { type: ContentType.HEADING3, text: '5. نسبة LTV:CAC – المقياس الذهبي' },
            { type: ContentType.PARAGRAPH, text: 'هذه النسبة هي التي تحدد ما إذا كان نموذج عملك مربحًا على المدى الطويل.'},
            { type: ContentType.LIST_UNORDERED, items: [
              '<b>< 1:1</b> - أنت تخسر المال مع كل عميل جديد. كارثة.',
              '<b>1:1</b> - أنت تستعيد فقط ما أنفقته. غير مستدام.',
              '<b>3:1</b> - هذه هي النسبة الصحية. لديك ما يكفي من المال لتغطية التكاليف الأخرى (مثل البحث والتطوير) وتحقيق ربح.',
              '<b>> 4:1</b> - نموذج رائع، ولكن قد يعني أنك لا تستثمر بما يكفي في التسويق ويمكنك النمو بشكل أسرع.',
            ]},
            { type: ContentType.HEADING3, text: '6. CAC Payback Period – فترة استرداد تكلفة العميل' },
            { type: ContentType.PARAGRAPH, text: 'كم من الوقت (بالأشهر) يستغرق لاسترداد الأموال التي أنفقتها لاكتساب عميل؟'},
            { type: ContentType.PREFORMATTED_TEXT, text: `Payback Period = CAC / (ARPA * هامش الربح الإجمالي)`},
            { type: ContentType.NOTE, title: '✅ الهدف', text: 'يجب أن تكون هذه الفترة أقل من 12 شهرًا. إذا استغرق الأمر أكثر من عام لاسترداد تكاليف اكتساب العميل، فإنك تخاطر بنفاد السيولة النقدية.'},
          ]
        },
        {
          id: 'part9_ch1_sec4',
          title: '9.3 أدوات التحليلات في SaaS',
          icon: '🧰',
          content: [
            {
              type: ContentType.PARAGRAPH, text: 'اختيار الأداة المناسبة يعتمد على مرحلة شركتك، ميزانيتك، وعمق التحليل الذي تحتاجه. إليك مقارنة بين الخيارات الشائعة:'
            },
            {
              type: ContentType.PARAGRAPH, text: `<div class="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
    
    <!-- Google Analytics 4 -->
    <div class="bg-white border border-stone-200 rounded-lg p-5 shadow-sm flex flex-col">
        <h4 class="text-lg font-bold text-stone-800">Google Analytics 4</h4>
        <p class="text-sm text-stone-500 mb-3">تحليلات الموقع</p>
        <div class="flex-grow space-y-2 text-sm">
            <p><strong>المميزات:</strong> مجاني، تكامل ممتاز مع Google Ads.</p>
            <p><strong>العيوب:</strong> لا يركز على المستخدم الفردي، ضعيف في تحليل Funnel و Retention داخل التطبيق.</p>
        </div>
        <p class="mt-4 pt-3 border-t text-xs font-semibold text-sky-700">الأنسب لـ: الشركات في مرحلة مبكرة لتتبع مصادر الزيارات.</p>
    </div>

    <!-- Mixpanel -->
    <div class="bg-white border border-stone-200 rounded-lg p-5 shadow-sm flex flex-col">
        <h4 class="text-lg font-bold text-stone-800">Mixpanel</h4>
        <p class="text-sm text-stone-500 mb-3">تحليلات المنتج (Event-Based)</p>
        <div class="flex-grow space-y-2 text-sm">
            <p><strong>المميزات:</strong> تحليل Funnel و Retention قوي جدًا، سهل الاستخدام.</p>
            <p><strong>العيوب:</strong> باهظ الثمن على نطاق واسع.</p>
        </div>
        <p class="mt-4 pt-3 border-t text-xs font-semibold text-sky-700">الأنسب لـ: شركات SaaS التي تركز على تحسين تجربة المنتج.</p>
    </div>
    
    <!-- Amplitude -->
    <div class="bg-white border border-stone-200 rounded-lg p-5 shadow-sm flex flex-col">
        <h4 class="text-lg font-bold text-stone-800">Amplitude</h4>
        <p class="text-sm text-stone-500 mb-3">تحليلات المنتج (Event-Based)</p>
        <div class="flex-grow space-y-2 text-sm">
            <p><strong>المميزات:</strong> خطة مجانية سخية، تحليلات سلوكية وتنبؤية قوية.</p>
            <p><strong>العيوب:</strong> منحنى تعلم حاد، قد يكون معقدًا للمبتدئين.</p>
        </div>
        <p class="mt-4 pt-3 border-t text-xs font-semibold text-sky-700">الأنسب لـ: الشركات القائمة على البيانات التي تحتاج فهمًا عميقًا للسلوك.</p>
    </div>

    <!-- PostHog -->
    <div class="bg-white border border-stone-200 rounded-lg p-5 shadow-sm flex flex-col">
        <h4 class="text-lg font-bold text-stone-800">PostHog</h4>
        <p class="text-sm text-stone-500 mb-3">منصة متكاملة (مفتوحة المصدر)</p>
        <div class="flex-grow space-y-2 text-sm">
            <p><strong>المميزات:</strong> استضافة ذاتية، تحليلات، تسجيل جلسات، A/B testing.</p>
            <p><strong>العيوب:</strong> يتطلب إدارة فنية إذا تم استضافته ذاتيًا.</p>
        </div>
        <p class="mt-4 pt-3 border-t text-xs font-semibold text-sky-700">الأنسب لـ: الشركات التقنية التي تريد حلاً شاملاً وتحكمًا كاملاً بالبيانات.</p>
    </div>

    <!-- Hotjar/Clarity -->
    <div class="bg-white border border-stone-200 rounded-lg p-5 shadow-sm flex flex-col">
        <h4 class="text-lg font-bold text-stone-800">Hotjar / Microsoft Clarity</h4>
        <p class="text-sm text-stone-500 mb-3">تحليلات نوعية</p>
        <div class="flex-grow space-y-2 text-sm">
            <p><strong>المميزات:</strong> خرائط حرارية (Heatmaps)، تسجيلات الجلسات، استبيانات.</p>
            <p><strong>العيوب:</strong> لا يقدم تحليلات كمية عميقة.</p>
        </div>
        <p class="mt-4 pt-3 border-t text-xs font-semibold text-sky-700">الأنسب لـ: فهم "لماذا" يفعل المستخدمون ما يفعلونه وتحسين الواجهة.</p>
    </div>
</div>`
            },
          ]
        },
        {
          id: 'part9_ch1_sec5',
          title: '9.4 بناء نظام تتبع داخلي: من العميل إلى الخادم',
          icon: '🧩',
          content: [
            {
              type: ContentType.PARAGRAPH, text: 'بناء نظام تتبع خاص بك يمنحك المرونة والتحكم الكامل. المبدأ الأساسي هو إرسال "أحداث" (Events) من الواجهة الأمامية إلى نقطة نهاية مخصصة في الواجهة الخلفية، والتي تقوم بتخزينها في قاعدة بيانات تحليلية.'
            },
            {
              type: ContentType.HEADING3,
              text: '1. تتبع الأحداث في الواجهة الأمامية (JavaScript)'
            },
            {
              type: ContentType.CODE_EXPLANATION,
              language: 'javascript',
              codeTitle: 'دالة تتبع عامة وموثوقة',
              code: `// services/analytics.js
export function trackEvent(eventName, properties = {}) {
  // لا تقم بالتتبع في بيئة التطوير المحلية
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', { eventName, properties });
    return;
  }

  // إثراء الحدث ببيانات إضافية
  const eventData = {
    name: eventName,
    properties: {
      ...properties,
      current_url: window.location.pathname,
      screen_width: window.innerWidth,
    },
    // يمكن استرداد هذه من سياق المصادقة
    user_id: window.currentUser?.id, 
    tenant_id: window.currentTenant?.id,
  };

  // إرسال البيانات إلى الخادم
  // استخدام navigator.sendBeacon هو الأفضل لأنه يضمن إرسال الطلب حتى لو أغلق المستخدم الصفحة
  if (navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(eventData)], { type: 'application/json' });
    navigator.sendBeacon('/api/analytics/track', blob);
  } else {
    // كخيار احتياطي للمتصفحات القديمة
    fetch('/api/analytics/track', {
      method: 'POST',
      body: JSON.stringify(eventData),
      headers: { 'Content-Type': 'application/json' },
      keepalive: true // لضمان الإرسال عند مغادرة الصفحة
    });
  }
}

// أمثلة على الاستخدام في مكونات React
// trackEvent('page_viewed', { page_name: 'dashboard' });
// trackEvent('task_created', { project_id: 'prj-123' });`,
              explanations: [
                { lines: '3-6', explanation: 'من المهم تجنب إرسال أحداث تحليلية من بيئة التطوير المحلية للحفاظ على بيانات الإنتاج نظيفة.'},
                { lines: '9-15', explanation: 'إثراء كل حدث ببيانات سياقية مثل عنوان URL الحالي أو معرف المستخدم يزيد من قيمة التحليل لاحقًا.'},
                { lines: '21-24', explanation: '`navigator.sendBeacon` هو الخيار الأمثل لإرسال بيانات التحليلات لأنه مصمم خصيصًا لهذا الغرض ويعمل بشكل غير متزامن دون التأثير على أداء الصفحة.'}
              ]
            },
            {
              type: ContentType.HEADING3,
              text: '2. تسجيل الأحداث في الخادم (Node.js + PostgreSQL)'
            },
            { type: ContentType.PARAGRAPH, text: 'نقطة النهاية يجب أن تكون سريعة جدًا وألا تقوم بمعالجة ثقيلة. الخيار الأفضل هو وضع الحدث في قائمة انتظار للمعالجة لاحقًا.'},
            {
              type: ContentType.CODE_BLOCK,
              language: 'javascript',
              codeTitle: 'API Endpoint + Queue (BullMQ)',
              code: `// server.js
const { Pool } = require('pg');
const { Queue } = require('bullmq');

const analyticsQueue = new Queue('analytics-events', { connection: { host: 'redis' }});
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.post('/api/analytics/track', (req, res) => {
  // أضف الحدث إلى قائمة الانتظار للمعالجة غير المتزامنة
  analyticsQueue.add('process-event', req.body);
  // أعد استجابة 202 Accepted على الفور
  res.status(202).send();
});

// worker.js - عامل منفصل يقوم بمعالجة قائمة الانتظار
const { Worker } = require('bullmq');

new Worker('analytics-events', async job => {
  const { name, properties, user_id, tenant_id } = job.data;
  await pool.query(
    'INSERT INTO events(name, properties, user_id, tenant_id) VALUES($1, $2, $3, $4)',
    [name, properties, user_id, tenant_id]
  );
});`
            },
            {
              type: ContentType.HEADING3,
              text: '3. تصميم جدول الأحداث (SQL)'
            },
            {
              type: ContentType.CODE_BLOCK,
              language: 'sql',
              codeTitle: 'Events Table for PostgreSQL',
              code: `CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    properties JSONB, -- استخدام JSONB يسمح بالبحث داخل الخصائص بكفاءة
    user_id UUID,
    tenant_id UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- إنشاء فهارس على الأعمدة التي يتم الاستعلام عنها بشكل متكرر
CREATE INDEX idx_events_name ON events (name);
CREATE INDEX idx_events_user_id ON events (user_id);
CREATE INDEX idx_events_created_at ON events (created_at);
-- فهرس GIN للبحث داخل حقل JSONB
CREATE INDEX idx_events_properties ON events USING GIN (properties);
`
            },
          ]
        },
        {
          id: 'part9_ch1_sec6',
          title: '9.5 بناء لوحة تحكم تحليلية (Analytics Dashboard)',
          icon: '📈',
          content: [
            { type: ContentType.HEADING3, text: '1. المقاييس الأساسية في اللوحة'},
            { type: ContentType.PARAGRAPH, text: 'لوحة التحكم الجيدة يجب أن تجيب على أهم الأسئلة في نظرة واحدة:'},
            { type: ContentType.LIST_UNORDERED, items: [
              '<b>ما هو إيرادي الشهري المتكرر (MRR) وكيف يتغير؟</b> (رسم بياني خطي)',
              '<b>ما هو معدل الانصراف (Churn Rate)؟</b> (مقياس واحد كبير)',
              '<b>كم عدد العملاء الجدد هذا الشهر؟</b> (مقياس واحد كبير)',
              '<b>من هم المستخدمون الأكثر نشاطًا؟</b> (جدول)',
              '<b>ما هي الميزات الأكثر استخدامًا؟</b> (رسم بياني شريطي)',
            ]},
            { type: ContentType.HEADING3, text: '2. أكواد عملية: عرض مخطط MRR (React + Python)'},
            { type: ContentType.CODE_BLOCK, language: 'jsx', codeTitle: 'Frontend Widget (React + Recharts)',
            code: `import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function MRRChartWidget() {
  const [data, setData] = useState([]); // format: [{ month: 'Jan', mrr: 1200 }, ...]

  useEffect(() => {
    fetch('/api/analytics/mrr-over-time')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="widget">
      <h3>نمو MRR</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => \`$\${value/1000}k\`}/>
          <Tooltip formatter={(value) => \`$\${value.toLocaleString()}\`}/>
          <Line type="monotone" dataKey="mrr" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}`},
            { type: ContentType.CODE_BLOCK, language: 'python', codeTitle: 'Backend Endpoint (Python/Flask + SQL)',
            code: `@app.route('/api/analytics/mrr-over-time')
def get_mrr_over_time():
    # هذا الاستعلام لـ PostgreSQL. قد يختلف في قواعد بيانات أخرى.
    query = """
    SELECT 
        to_char(date_trunc('month', created_at), 'YYYY-MM') as month,
        SUM(price_in_cents) as monthly_revenue
    FROM subscriptions
    WHERE status = 'active' OR (status = 'canceled' AND canceled_at > date_trunc('month', created_at))
    GROUP BY 1
    ORDER BY 1;
    """
    result = db.execute(query)
    # Format data for the chart
    formatted_data = [{'month': row['month'], 'mrr': int(row['monthly_revenue'] / 100)} for row in result]
    return jsonify(formatted_data)`},
          ]
        },
        {
          id: 'part9_ch1_sec7',
          title: '9.6 A/B Testing: تحسين القرارات بالتجربة',
          icon: '🔬',
          content: [
            { type: ContentType.PARAGRAPH, text: 'الآراء الشخصية يمكن أن تكون قاتلة. A/B Testing هو الطريقة الوحيدة لمعرفة ما ينجح حقًا. إنها تجربة علمية تقارن بين نسختين من شيء ما (صفحة، زر، نص) لمعرفة أيهما يحقق نتيجة أفضل.'},
            { type: ContentType.HEADING3, text: 'خطوات إجراء A/B Test ناجح'},
            { type: ContentType.LIST_UNORDERED, items: [
              '<b>1. تحديد فرضية واضحة:</b> "نعتقد أن تغيير لون الزر إلى الأخضر سيزيد من نسبة النقر لأنه يبرز أكثر."',
              '<b>2. تصميم النسختين (A و B).</b>',
              '<b>3. توزيع المستخدمين عشوائيًا:</b> 50% يرون النسخة A، و 50% يرون النسخة B.',
              '<b>4. جمع البيانات:</b> تتبع عدد المشاهدات والنقرات لكل نسخة.',
              '<b>5. تحليل النتائج بثقة إحصائية:</b> لا يكفي أن تكون النسخة B أفضل بنسبة 1%. يجب أن تكون النتيجة ذات **دلالة إحصائية (Statistical Significance)**، مما يعني أنها لم تحدث بالصدفة. عادة ما يتم استهداف مستوى ثقة 95%.',
              '<b>6. اتخاذ القرار وتنفيذ الفائز.</b>',
            ]},
            { type: ContentType.HEADING4, text: '🎯 دراسة حالة: كيف زادت Humana التحويلات بنسبة 433%'},
            { type: ContentType.PARAGRAPH, text: 'شركة التأمين Humana كان لديها بانر واحد كبير في صفحتها الرئيسية. كانت فرضيتهم أن الزوار المختلفين يحتاجون إلى مسارات مختلفة. قاموا باختبار نسخة جديدة تحتوي على مسارات واضحة ("أبحث عن خطة لنفسي"، "أنا وسيط"، "أبحث عن خطط لأصحاب العمل"). <b>النتيجة:</b> النسخة الجديدة زادت من النقرات بنسبة 433% لأنها وجهت كل شريحة من الجمهور مباشرة إلى ما تبحث عنه. <b>الدرس:</b> التخصيص والتوجيه الواضح يفوزان دائمًا.'},
          ]
        },
        {
          id: 'part9_ch1_sec8',
          title: '9.7 حالات دراسية متقدمة: دروس من العمالقة',
          icon: '🏢',
          content: [
              {
                type: ContentType.HEADING4, text: '🎯 Notion: النمو القائم على القوالب'
              },
              {
                type: ContentType.PARAGRAPH, text: 'أدركت Notion أن المستخدمين الجدد غالبًا ما يواجهون "رعب الصفحة البيضاء". بدلاً من تحليل النقرات فقط، قاموا بتحليل **استخدام القوالب (Templates)**. اكتشفوا أن المستخدمين الذين يبدأون بقالب (مثل "قائمة مهام" أو "ويكي الفريق") هم أكثر احتمالاً للبقاء والتحول إلى عملاء مدفوعين. نتيجة لذلك، قاموا بوضع معرض القوالب في صميم تجربة المستخدم الأولى (Onboarding)، مما سهل على المستخدمين الوصول إلى "لحظة الإدراك" بسرعة.'
              },
              {
                type: ContentType.HEADING4, text: '🎯 Netflix: قوة A/B Testing للصور المصغرة'
              },
              {
                type: ContentType.PARAGRAPH, text: 'تستخدم Netflix البيانات بشكل مهووس لتحسين كل جانب من جوانب تجربتها. أحد أشهر الأمثلة هو اختبار A/B للصور المصغرة (Thumbnails) للأفلام والمسلسلات. لنفس العرض، قد يرون المستخدمون المختلفون صورًا مختلفة. Netflix تتتبع أي صورة تؤدي إلى أعلى نسبة نقر ومشاهدة، ثم تعتمدها كصورة افتراضية. هذا التحسين الدقيق والمستمر يزيد من وقت المشاهدة والاحتفاظ بالعملاء بشكل كبير.'
              },
          ]
        },
        {
          id: 'part9_ch1_sec9',
          title: 'الخلاصة وتمارين تطبيقية',
          icon: '📚',
          content: [
            { type: ContentType.PARAGRAPH, text: 'تحليل البيانات في SaaS ليس مجرد مهمة يقوم بها "محلل البيانات". إنها **ثقافة** يجب أن تتبناها الشركة بأكملها. إنها العقلية التي تقول: "دعنا لا نجادل، دعنا نختبر". إنها المحرك الذي يحول التخمين إلى معرفة، والمعرفة إلى نمو.'},
            { type: ContentType.PARAGRAPH, text: 'من خلال هذا الفصل، تعلمت كيف تبني وتستخدم لوحة أجهزة القياس الخاصة بك. أنت الآن جاهز ليس فقط لقيادة الطائرة، بل لتوجيهها نحو وجهتها بثقة ودقة.'},
            { type: ContentType.HEADING3, text: '📝 تمارين تطبيقية'},
            { type: ContentType.DEFINITION_LIST, definitionItems: [
                { term: '1. حساب مؤشرات SaaS', definition: 'لديك شركة SaaS بها 1000 عميل في بداية الشهر. متوسط الاشتراك 30$. خلال الشهر، اكتسبت 150 عميلًا جديدًا، وقام 50 عميلًا حاليًا بالترقية مما أضاف 500$ إلى MRR. غادر 80 عميلاً. تكاليف التسويق والمبيعات كانت 10,000$. **احسب:** New MRR، Churned MRR، Net New MRR، Customer Churn Rate، LTV، CAC، ونسبة LTV:CAC.'},
                { term: '2. تصميم مخطط Funnel', definition: 'صمم مخطط Funnel لتحليل تفعيل المستخدم في تطبيق إدارة مهام. يجب أن يتضمن الخطوات: (1) التسجيل، (2) إنشاء أول مشروع، (3) إنشاء أول مهمة، (4) دعوة زميل واحد على الأقل. ما هي نسبة التحويل التي ستعتبرها "جيدة" بين كل خطوة؟'},
                { term: '3. كتابة استعلام SQL', definition: 'اكتب استعلام SQL لجدول `events` الذي يعرض أكثر 10 ميزات (أسماء أحداث) استخدامًا في آخر 30 يومًا.'},
                { term: '4. تحليل حالة انصراف', definition: 'تلاحظ أن معدل الانصراف لديك يرتفع. ما هي أول 3 أسئلة ستطرحها، وما هي البيانات التي ستبحث عنها في تحليلاتك لتشخيص المشكلة؟'},
                { term: '5. تصميم اختبار A/B', definition: 'صمم اختبار A/B لصفحة التسعير. **الفرضية:** "نعتقد أن إضافة خطة سنوية مع خصم 20% ستزيد من LTV لأنها تشجع على الالتزام طويل الأمد". **المتغيرات:** صفحة التسعير الحالية (A) مقابل الصفحة مع الخيار السنوي (B). **المقاييس الأساسية:** معدل التحويل إلى الخطة السنوية، متوسط الإيرادات لكل عميل جديد (ARPU).'}
            ]}
          ]
        }
      ]
    }
  ]
};
