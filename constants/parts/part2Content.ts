
import { Part, ContentType } from '../../types';

export const part2: Part = {
  id: 'part2',
  partTitle: 'الباب الثاني: نماذج الأعمال والاستراتيجيات المالية',
  icon: '💰',
  chapters: [
    {
      id: 'part2_chapter1',
      chapterTitle: 'نماذج الأعمال في أنظمة SaaS – من التسعير إلى الربحية',
      sections: [
        {
          id: 'part2_ch1_sec1',
          title: 'مقدمة: لماذا نموذج العمل هو جوهر نجاح أي نظام SaaS؟',
          icon: '📌',
          content: [
            {
              type: ContentType.PARAGRAPH,
              text: 'عندما تُطلق منتجًا تقنيًا، فإن <b>الجودة وحدها لا تكفي</b>. قد يكون لديك أفضل تطبيق في العالم، لكن إن لم تُحدد <b>كيف تربح منه</b>، فستفشل.',
            },
            {
              type: ContentType.PARAGRAPH,
              text: 'في عالم <b>SaaS (Software as a Service)</b>، لا يُنظر إلى البرمجيات كمنتج يُباع لمرة واحدة، بل كـ <b>خدمة مستمرة تُدرّ دخلًا متكررًا (Recurring Revenue)</b>. وهذا يتطلب <b>نموذج عمل (Business Model)</b> دقيق، يُجيب على أسئلة حاسمة:',
            },
            {
                type: ContentType.LIST_UNORDERED,
                items: [
                    'كيف نُسعّر الخدمة؟',
                    'هل نُقدّم نسخة مجانية؟',
                    'ما هي خطط الاشتراك؟',
                    'كيف نُحافظ على العملاء؟',
                    'كيف نُحقق الربح على المدى الطويل؟'
                ]
            },
            {
              type: ContentType.PARAGRAPH,
              text: 'في هذا الفصل، لن نكتفِ بسرد النماذج النظرية، بل سنغوص في:',
            },
            {
                type: ContentType.LIST_UNORDERED,
                items: [
                    '<b>تحليل عميق لكل نموذج أعمال SaaS</b>.',
                    '<b>أمثلة واقعية من شركات مثل Slack، Notion، Zoom، وStripe</b>.',
                    '<b>أكواد عملية لإدارة الاشتراكات والفواتير</b>.',
                    '<b>حالات دراسية تُظهر نجاحات وإخفاقات في التسعير</b>.',
                    '<b>أدوات حسابية لتحديد الربحية (MRR، LTV، CAC)</b>.',
                    '<b>تمارين تطبيقية</b> تُعدك لاتخاذ قرارات استراتيجية.'
                ]
            },
            {
                type: ContentType.PARAGRAPH,
                text: 'بعد قراءة هذا الفصل، ستكون قادرًا على:\n1. اختيار النموذج الأمثل لفكرتك.\n2. تصميم هيكل تسعير يجذب العملاء ويُدرّ الأرباح.\n3. بناء نظام داخلي لإدارة الاشتراكات.\n4. تحليل الربحية بدقة.\n5. تجنب الأخطاء الشائعة في نماذج الأعمال.'
            }
          ],
        },
        {
          id: 'part2_ch1_sec2',
          title: 'ما هو نموذج العمل في SaaS؟ التعريف والأساسيات',
          icon: '🔍',
          content: [
            { type: ContentType.HEADING3, text: '📘 التعريف البسيط' },
            {
              type: ContentType.PARAGRAPH,
              text: '<b>نموذج العمل (Business Model)</b> في SaaS هو <b>الخطة التي تُحدد كيف يُحقق النظام الأرباح</b> من خلال تقديم الخدمة عبر الإنترنت.<br/><br/>ببساطة: "كيف تُحوّل المستخدم إلى عميل يدفع؟"',
            },
            { type: ContentType.HEADING3, text: '🧩 مكونات نموذج العمل في SaaS' },
            { type: ContentType.PARAGRAPH, text: 'نموذج العمل لا يقتصر على "كم تأخذ من العميل"، بل يتضمن عدة عناصر متداخلة:' },
            { type: ContentType.PREFORMATTED_TEXT, text: 
`| العنصر | الوصف |
|--------|------|
| **القيمة المقترحة (Value Proposition)** | ما المشكلة التي تحلها للعميل؟ |
| **الفئة المستهدفة (Target Audience)** | من هو العميل المثالي؟ |
| **نظام التسعير (Pricing Model)** | كيف تُحدد السعر؟ (شهري، سنوي، حسب الاستخدام) |
| **قناة التوزيع (Distribution Channel)** | كيف يصل العميل إلى الخدمة؟ (مباشر، عبر شركاء) |
| **نموذج الإيراد (Revenue Model)** | كيف تربح؟ (اشتراك، عمولة، إعلانات) |
| **تكلفة الاستحواذ (Customer Acquisition Cost - CAC)** | كم تدفع لجذب عميل واحد؟ |
| **مدة بقاء العميل (Customer Lifetime - LTV)** | كم من الوقت يبقى العميل مشتركًا؟ |`
            },
            { type: ContentType.HEADING3, text: '🏗️ نموذج كانفاس الأعمال (Business Model Canvas) لنظام SaaS' },
            { type: ContentType.PARAGRAPH, text: 'لتنظيم هذه العناصر، نستخدم <b>نموذج كانفاس الأعمال (Business Model Canvas)</b>، وهو أداة شهيرة طوّرها <b>أليكسندر أودامير</b>.'},
            { type: ContentType.PARAGRAPH, text: 'فيما يلي مثال تطبيقي على <b>نموذج كانفاس لنظام SaaS لإدارة المهام</b>:'},
            {
              type: ContentType.PARAGRAPH,
              text: `<div class="bg-stone-50 my-6 p-4 rounded-lg border border-stone-200 shadow-sm font-sans" dir="rtl">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <!-- Value Proposition -->
        <div class="md:col-span-2 p-4 bg-amber-100 border border-amber-200 rounded-lg text-center">
            <h4 class="font-bold text-amber-800 text-lg mb-2">💡 القيمة المقترحة</h4>
            <p class="text-amber-900">"نظام بسيط لإدارة المهام الجماعية بدون تعقيد"</p>
        </div>

        <!-- Customer Side -->
        <div class="space-y-4">
            <div class="p-4 bg-sky-50 border border-sky-200 rounded-lg">
                <h4 class="font-bold text-sky-800 mb-2">👥 العملاء المستهدفون</h4>
                <p class="text-sm text-sky-900">فرق العمل عن بعد، المبتدئون في إدارة المشاريع.</p>
            </div>
            <div class="p-4 bg-sky-50 border border-sky-200 rounded-lg">
                <h4 class="font-bold text-sky-800 mb-2">🤝 علاقات العملاء</h4>
                <p class="text-sm text-sky-900">دعم فني عبر البريد، دروس فيديو، مجتمع.</p>
            </div>
            <div class="p-4 bg-sky-50 border border-sky-200 rounded-lg">
                <h4 class="font-bold text-sky-800 mb-2">🚚 قنوات التسويق</h4>
                <p class="text-sm text-sky-900">فيسبوك، Google Ads، محتوى تعليمي على يوتيوب.</p>
            </div>
        </div>
        
        <!-- Business Side -->
        <div class="space-y-4">
            <div class="p-4 bg-stone-100 border border-stone-200 rounded-lg">
                <h4 class="font-bold text-stone-800 mb-2">⚙️ الأنشطة الأساسية</h4>
                <p class="text-sm text-stone-700">تطوير النظام، التحديثات، دعم العملاء.</p>
            </div>
            <div class="p-4 bg-stone-100 border border-stone-200 rounded-lg">
                <h4 class="font-bold text-stone-800 mb-2">📦 الموارد الأساسية</h4>
                <p class="text-sm text-stone-700">فريق تطوير، خوادم سحابية، واجهة برمجة.</p>
            </div>
            <div class="p-4 bg-stone-100 border border-stone-200 rounded-lg">
                <h4 class="font-bold text-stone-800 mb-2">🔗 شراكات</h4>
                <p class="text-sm text-stone-700">Stripe (الدفع)، AWS (الاستضافة)، Mailchimp (البريد).</p>
            </div>
        </div>

        <!-- Financials -->
        <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 class="font-bold text-red-800 mb-2">💸 هيكل التكاليف</h4>
                <p class="text-sm text-red-900">3000$ شهريًا (رواتب، استضافة، تسويق).</p>
            </div>
            <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 class="font-bold text-green-800 mb-2">💰 مصدر الإيراد</h4>
                <p class="text-sm text-green-900">اشتراكات شهرية: 10$ للمستخدم، 80$ للفرق.</p>
            </div>
        </div>

    </div>
</div>`
            },
            { type: ContentType.NOTE, text: '🔹 هذا النموذج يُساعدك على رؤية الصورة الكاملة قبل البدء في البرمجة.' },
          ],
        },
        {
            id: 'part2_ch1_sec3',
            title: 'نماذج الإيراد الشائعة في SaaS',
            icon: '💰',
            content: [
                { type: ContentType.HEADING3, text: '1. الاشتراك الشهري/السنوي (Subscription-Based Pricing)'},
                { type: ContentType.HEADING4, text: '📌 الوصف'},
                { type: ContentType.PARAGRAPH, text: 'النموذج الأكثر شيوعًا في SaaS. يدفع العميل <b>مبلغًا ثابتًا شهريًا أو سنويًا</b> للوصول إلى الخدمة.'},
                { type: ContentType.HEADING4, text: '✅ المميزات'},
                { type: ContentType.LIST_UNORDERED, items: ['دخل متكرر (Recurring Revenue).', 'سهولة التنبؤ بالإيرادات.', 'يُشجع على تحسين تجربة المستخدم (لبقاء العميل).']},
                { type: ContentType.HEADING4, text: '❌ العيوب'},
                { type: ContentType.LIST_UNORDERED, items: ['إذا توقف العميل عن الدفع، يفقد الوصول.', 'يحتاج إلى نظام دفع تلقائي.']},
                { type: ContentType.HEADING4, text: '🏢 أمثلة واقعية'},
                { type: ContentType.LIST_UNORDERED, items: ['<b>Netflix</b>: 15$ شهريًا.', '<b>Spotify</b>: 10$ شهريًا.', '<b>Trello</b>: 5$ لكل مستخدم شهريًا.']},
                { type: ContentType.NOTE, title: '💡 درس من Trello', text: 'Trello استخدم نموذج <b>Freemium</b> (نسخة مجانية + نسخ مدفوعة). النسخة المجانية جذبت الملايين، والنسخة المدفوعة (Business Class) حققت أرباحًا عالية من الفرق المؤسسية.'},
                
                { type: ContentType.HEADING3, text: '2. النسخة المجانية (Freemium)'},
                { type: ContentType.HEADING4, text: '📌 الوصف'},
                { type: ContentType.PARAGRAPH, text: 'تُقدّم نسخة <b>محدودة مجانًا</b>، وتحث المستخدم على الترقية إلى نسخة مدفوعة للحصول على ميزات إضافية.'},
                { type: ContentType.HEADING4, text: '✅ المميزات'},
                { type: ContentType.LIST_UNORDERED, items: ['جذب عدد كبير من المستخدمين.', 'تقليل عتبة الدخول (Barrier to Entry).', 'يمكن أن ينتشر بشكل فيروسي (Viral Growth).']},
                { type: ContentType.HEADING4, text: '❌ العيوب'},
                { type: ContentType.LIST_UNORDERED, items: ['معظم المستخدمين يبقون في النسخة المجانية.', 'تكلفة استضافة المستخدمين المجانيين عالية.']},
                { type: ContentType.HEADING4, text: '🏢 أمثلة واقعية'},
                { type: ContentType.LIST_UNORDERED, items: ['<b>Dropbox</b>: 2GB مجانًا، 10$ شهريًا للتخزين الإضافي.', '<b>Notion</b>: نسخة مجانية للأفراد، 8$ للمستخدم شهريًا للفرق.', '<b>Canva</b>: نسخة مجانية، 12.99$ شهريًا للوصول إلى القوالب المميزة.']},
                { type: ContentType.NOTE, title: '📊 دراسة حالة: كيف نجح Notion في نموذج Freemium؟', text: '- <b>الاستراتيجية</b>: جعل النسخة المجانية مفيدة جدًا.\n- <b>التحفيز على الترقية</b>: ميزات مثل "الوصول إلى التاريخ"، "التكاملات المتقدمة"، "التحكم في الصلاحيات".\n- <b>النتائج</b>: أكثر من 20 مليون مستخدم، 30% منهم مدفوعون.'},
                { type: ContentType.NOTE, text: '🔹 <b>الدرس</b>: النسخة المجانية يجب أن تكون <b>ذات قيمة حقيقية</b>، لكن تُظهر بوضوح "ما يفتقده المستخدم".'},

                { type: ContentType.HEADING3, text: '3. التجربة المجانية (Free Trial)'},
                { type: ContentType.HEADING4, text: '📌 الوصف'},
                { type: ContentType.PARAGRAPH, text: 'يُسمح للمستخدم باستخدام الخدمة <b>مجانًا لفترة محدودة</b> (7 أو 14 أو 30 يومًا)، ثم يُطلب منه الدفع.'},
                { type: ContentType.NOTE, title: '💡 درس من HubSpot', text: 'HubSpot يُقدّم تجربة 14 يومًا <b>بدون طلب بطاقة ائتمان في البداية</b>، لكن بعد 10 أيام، يُرسل بريدًا:\n"لإكمال التجربة، يرجى إدخال معلومات الدفع."\nهذا يقلل من التخويف، ويزيد من عدد من يبدأون التجربة.'},

                { type: ContentType.HEADING3, text: '4. الدفع حسب الاستخدام (Usage-Based Pricing)'},
                { type: ContentType.NOTE, title: '📊 دراسة حالة: كيف نجح Stripe في نموذج الدفع حسب الاستخدام؟', text: '- <b>الاستراتيجية</b>: لا حد أدنى، لا تكلفة ثابتة.\n- <b>الشفافية</b>: لوحة تحكم تُظهر كل معاملة.\n- <b>النتائج</b>: أصبح Stripe المزود المفضل للشركات الناشئة.'},
                { type: ContentType.NOTE, text: '🔹 <b>الدرس</b>: الشفافية + البساطة = ثقة العميل.'},

                { type: ContentType.HEADING3, text: '5. نموذج العمولة (Commission-Based)'},
                { type: ContentType.PARAGRAPH, text: 'تُقدّم منصة تربط بين طرفين (مثل بائع ومشتري)، وتُأخذ عمولة من كل عملية.'},
                
                { type: ContentType.HEADING3, text: '6. نموذج الإعلانات (Ad-Supported)'},
                { type: ContentType.PARAGRAPH, text: 'الخدمة مجانية، والدخل يأتي من عرض إعلانات داخل التطبيق.'},
            ]
        },
        {
            id: 'part2_ch1_sec4',
            title: 'مقارنة بين نماذج الإيراد: أيها الأفضل؟',
            icon: '📊',
            content: [
                 { type: ContentType.PARAGRAPH, text: `<div class="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
    
    <!-- Subscription -->
    <div class="bg-sky-50 border border-sky-200 rounded-lg p-4 shadow">
        <h4 class="font-bold text-sky-800 text-lg mb-2">🤝 الاشتراك الثابت</h4>
        <p class="text-sm text-sky-900 mb-2"><strong>مناسب لـ:</strong> المنتجات البسيطة والفرق الصغيرة.</p>
        <p class="text-sm text-sky-900 mb-2"><strong>لا يناسب:</strong> الشركات ذات الاستخدام المتغير.</p>
        <p class="text-sm text-sky-900 font-semibold"><strong>مثال ناجح:</strong> Trello</p>
    </div>

    <!-- Freemium -->
    <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 shadow">
        <h4 class="font-bold text-amber-800 text-lg mb-2">🎁 Freemium</h4>
        <p class="text-sm text-amber-900 mb-2"><strong>مناسب لـ:</strong> جذب جمهور واسع، المنتجات المعقدة.</p>
        <p class="text-sm text-amber-900 mb-2"><strong>لا يناسب:</strong> إذا كانت التكلفة التشغيلية عالية.</p>
        <p class="text-sm text-amber-900 font-semibold"><strong>مثال ناجح:</strong> Notion</p>
    </div>

    <!-- Free Trial -->
    <div class="bg-teal-50 border border-teal-200 rounded-lg p-4 shadow">
        <h4 class="font-bold text-teal-800 text-lg mb-2">⏳ Free Trial</h4>
        <p class="text-sm text-teal-900 mb-2"><strong>مناسب لـ:</strong> المنتجات المعقدة، B2B.</p>
        <p class="text-sm text-teal-900 mb-2"><strong>لا يناسب:</strong> إذا كان التسويق ضعيفًا.</p>
        <p class="text-sm text-teal-900 font-semibold"><strong>مثال ناجح:</strong> HubSpot</p>
    </div>

    <!-- Usage-Based -->
    <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4 shadow">
        <h4 class="font-bold text-indigo-800 text-lg mb-2">⚡ الدفع حسب الاستخدام</h4>
        <p class="text-sm text-indigo-900 mb-2"><strong>مناسب لـ:</strong> البنية التحتية، الأدوات التقنية.</p>
        <p class="text-sm text-indigo-900 mb-2"><strong>لا يناسب:</strong> إذا كان الاستخدام غير متوقع.</p>
        <p class="text-sm text-indigo-900 font-semibold"><strong>مثال ناجح:</strong> Stripe</p>
    </div>

    <!-- Commission -->
    <div class="bg-lime-50 border border-lime-200 rounded-lg p-4 shadow">
        <h4 class="font-bold text-lime-800 text-lg mb-2">🛍️ العمولة</h4>
        <p class="text-sm text-lime-900 mb-2"><strong>مناسب لـ:</strong> الأسواق (Marketplaces).</p>
        <p class="text-sm text-lime-900 mb-2"><strong>لا يناسب:</strong> إذا لم يكن هناك تدفق معاملات.</p>
        <p class="text-sm text-lime-900 font-semibold"><strong>مثال ناجح:</strong> Shopify</p>
    </div>

    <!-- Ad-Supported -->
    <div class="bg-rose-50 border border-rose-200 rounded-lg p-4 shadow">
        <h4 class="font-bold text-rose-800 text-lg mb-2">📢 الإعلانات</h4>
        <p class="text-sm text-rose-900 mb-2"><strong>مناسب لـ:</strong> الجمهور الواسع.</p>
        <p class="text-sm text-rose-900 mb-2"><strong>لا يناسب:</strong> إذا كانت التجربة حساسة.</p>
        <p class="text-sm text-rose-900 font-semibold"><strong>مثال ناجح:</strong> Spotify</p>
    </div>
</div>`},
                { type: ContentType.NOTE, text: '🔹 <b>الخلاصة</b>: لا يوجد نموذج "أفضل"، بل <b>نموذج مناسب للفكرة والجمهور</b>.'},
            ]
        },
        {
            id: 'part2_ch1_sec5',
            title: 'استراتيجيات التسعير: كيف تُحدد السعر؟',
            icon: '💵',
            content: [
                 { type: ContentType.HEADING3, text: '1. التسعير القائم على القيمة (Value-Based Pricing)'},
                 { type: ContentType.PARAGRAPH, text: 'تُحدد السعر حسب <b>القيمة التي يحصل عليها العميل</b>، وليس التكلفة.'},
                 { type: ContentType.NOTE, title: 'مثال', text: '- برنامج يوفر لشركة <b>10,000$ شهريًا</b> في التوفير.\n- يمكنك تسعيره بـ <b>1,000$ شهريًا</b>، وهو ما يزال صفقة ممتازة.'},

                 { type: ContentType.HEADING3, text: '2. التسعير القائم على التكلفة (Cost-Plus Pricing)'},
                 { type: ContentType.PARAGRAPH, text: 'تُضيف هامش ربح على التكلفة التشغيلية. هذا النموذج <b>محدود</b>، ويُستخدم غالبًا في البداية.'},
                 
                 { type: ContentType.HEADING3, text: '3. التسعير التنافسي (Competitive Pricing)'},
                 { type: ContentType.PARAGRAPH, text: 'تُحدد السعر بناءً على ما يفعله المنافسون. لكنه قد يؤدي إلى <b>حرب أسعار</b> تُدمر الربحية.'},
            ]
        },
        {
            id: 'part2_ch1_sec6',
            title: 'تصميم هياكل التسعير: الخطط والمستويات',
            icon: '🧩',
            content: [
                { type: ContentType.HEADING3, text: '1. الخطط المتدرجة (Tiered Pricing)' },
                { type: ContentType.PARAGRAPH, text: 'عدة خطط بأسعار مختلفة، كل منها يحتوي على ميزات أكثر. إليك مثال معاصر لتسعير أداة مثل Notion:'},
                { type: ContentType.PARAGRAPH, text: `<div class="my-8 grid grid-cols-1 lg:grid-cols-3 gap-8 font-sans">
    <!-- Free Plan -->
    <div class="border rounded-lg p-6 shadow-sm flex flex-col">
      <h3 class="text-2xl font-bold">مجاني</h3>
      <p class="text-stone-500 mt-2">ابدأ بتنظيم كل جانب من جوانب عملك وحياتك.</p>
      <p class="my-6"><span class="text-4xl font-bold">$0</span></p>
      <button class="w-full bg-stone-800 text-white py-2 rounded-lg hover:bg-stone-700">ابدأ الآن</button>
      <ul class="mt-6 space-y-3 text-sm text-stone-600">
        <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>صفحات وكتل غير محدودة</li>
        <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>مشاركة مع 10 ضيوف</li>
        <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>7 أيام من تاريخ الصفحات</li>
      </ul>
    </div>

    <!-- Plus Plan -->
    <div class="border-2 border-amber-500 rounded-lg p-6 shadow-lg flex flex-col relative">
      <div class="absolute top-0 -translate-y-1/2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">الأكثر شيوعًا</div>
      <h3 class="text-2xl font-bold">Plus</h3>
      <p class="text-stone-500 mt-2">مكان مركزي لتخطيط ومتابعة مشاريع فريقك.</p>
      <p class="my-6"><span class="text-4xl font-bold">$8</span><span class="text-stone-500"> / مستخدم / شهر</span></p>
      <button class="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600">جرّب Plus مجانًا</button>
      <ul class="mt-6 space-y-3 text-sm text-stone-600">
        <li class="flex items-center gap-2 font-bold"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>كل شيء في الخطة المجانية، بالإضافة إلى:</li>
        <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>مشاركة مع 100 ضيف</li>
        <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>30 يومًا من تاريخ الصفحات</li>
        <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>مساحة رفع ملفات غير محدودة</li>
      </ul>
    </div>

    <!-- Business Plan -->
    <div class="border rounded-lg p-6 shadow-sm flex flex-col">
      <h3 class="text-2xl font-bold">Business</h3>
      <p class="text-stone-500 mt-2">لإدارة عدة فرق وأدوات باستخدام أدوات تحكم متقدمة.</p>
      <p class="my-6"><span class="text-4xl font-bold">$15</span><span class="text-stone-500"> / مستخدم / شهر</span></p>
      <button class="w-full bg-stone-800 text-white py-2 rounded-lg hover:bg-stone-700">تواصل مع المبيعات</button>
      <ul class="mt-6 space-y-3 text-sm text-stone-600">
        <li class="flex items-center gap-2 font-bold"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>كل شيء في خطة Plus، بالإضافة إلى:</li>
        <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>مساحات فريق خاصة</li>
        <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>تصدير PDF بالجملة</li>
        <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>تحليلات متقدمة للصفحات</li>
      </ul>
    </div>
</div>` },

                { type: ContentType.HEADING3, text: '2. التسعير القائم على المستخدم (Per-User Pricing)' },
                { type: ContentType.PARAGRAPH, text: 'كل مستخدم إضافي يُكلّف مبلغًا إضافيًا. مثال: Slack.'},

                { type: ContentType.HEADING3, text: '3. التسعير القائم على الميزات (Feature-Based Pricing)' },
                { type: ContentType.PARAGRAPH, text: 'كل ميزة متقدمة تُضاف بسعر إضافي. مثال: Zoom.'},
            ]
        },
        {
            id: 'part2_ch1_sec7',
            title: 'بناء نظام إدارة الاشتراكات: من الداخل',
            icon: '🧱',
            content: [
                { type: ContentType.HEADING3, text: '1. تصميم قاعدة البيانات'},
                { type: ContentType.CODE_BLOCK, language: 'sql', code:
`-- جدول الخطط
CREATE TABLE plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50), -- "Basic", "Pro", "Enterprise"
    price DECIMAL(10,2),
    features JSONB,
    billing_cycle VARCHAR(10) -- "monthly", "yearly"
);

-- جدول الاشتراكات
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    plan_id INTEGER REFERENCES plans(id),
    status VARCHAR(20) DEFAULT 'active', -- active, canceled, paused
    start_date TIMESTAMP,
    next_billing_date TIMESTAMP,
    stripe_subscription_id VARCHAR(255)
);`
                },
                {
                    type: ContentType.PARAGRAPH,
                    text: '<b>شرح الكود:</b> يشرح هذا الكود تصميم قاعدة البيانات الأساسية لإدارة الاشتراكات. أهميته تكمن في فصل "الخطط" (ما تبيعه) عن "الاشتراكات" (ما يشتريه العميل). حقل `stripe_subscription_id` هو المفتاح لربط نظامك الداخلي بـ Stripe، مما يسمح لك بمزامنة الحالة بين النظامين. يُستخدم هذا الهيكل كنواة لأي نظام فوترة في SaaS.'
                },
                { type: ContentType.HEADING3, text: '2. دمج Stripe لإدارة الاشتراكات (Python)'},
                { type: ContentType.CODE_BLOCK, language: 'python', code:
`import stripe
stripe.api_key = "sk_test_..."

def create_subscription(customer_id, price_id):
    try:
        subscription = stripe.Subscription.create(
            customer=customer_id,
            items=[{"price": price_id}],
            payment_behavior="default_incomplete"
        )
        return subscription
    except stripe.error.CardError as e:
        return {"error": "بطاقة ائتمان غير صالحة"}
    except stripe.error.RateLimitError as e:
        return {"error": "الطلب مكرر، حاول لاحقًا"}
    except stripe.error.InvalidRequestError as e:
        return {"error": "طلب غير صحيح"}
    except Exception as e:
        return {"error": "حدث خطأ غير متوقع"}

# مثال استخدام
sub = create_subscription("cus_123", "price_pro_monthly")
if "error" not in sub:
    print("تم الاشتراك بنجاح!")`
                },
                {
                    type: ContentType.PARAGRAPH,
                    text: '<b>شرح الكود:</b> يوضح هذا الكود كيفية إنشاء اشتراك جديد في Stripe برمجيًا. فائدته هي أتمتة عملية تحويل المستخدم من التجربة المجانية إلى المدفوعة. يُستخدم هذا الكود في الواجهة الخلفية عندما يكمل المستخدم نموذج الدفع. التعامل مع الأخط المختلفة (مثل بطاقة غير صالحة) ضروري لتوفير تجربة مستخدم واضحة.'
                },
                { type: ContentType.HEADING3, text: '3. تحديث حالة الاشتراك عند دفع الفاتورة (Webhook)'},
                 { type: ContentType.CODE_BLOCK, language: 'python', code:
`from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, 'whsec_...'
        )
    except ValueError:
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError:
        return HttpResponse(status=400)

    if event['type'] == 'invoice.payment_succeeded':
        subscription_id = event['data']['object']['subscription']
        # تحديث الحالة في قاعدة البيانات
        Subscription.objects.filter(stripe_subscription_id=subscription_id).update(
            status='active',
            next_billing_date=event['data']['object']['next_payment_attempt']
        )

    return HttpResponse(status=200)`
                },
                {
                    type: ContentType.PARAGRAPH,
                    text: '<b>شرح الكود:</b> يمثل هذا الكود نقطة نهاية Webhook، وهي الطريقة التي يُعلم بها Stripe نظامك بالأحداث (مثل نجاح الدفع). أهميته حاسمة: لا يجب أن تعتمد على نتيجة طلب API الأولي، بل على هذه الإشعارات الموثوقة لتحديث حالة الاشتراك في قاعدة بياناتك. هذا يضمن أن نظامك دائمًا متزامن مع Stripe، حتى لو انقطع اتصال المستخدم.'
                },
                {
                  type: ContentType.NOTE,
                  title: 'مشروع عملي: تكامل بوابة الدفع',
                  text: 'جرب عملية الدفع باستخدام Stripe في هذا المثال التفاعلي. ستحتاج إلى استبدال المفتاح العام المؤقت في الكود (`PK_test_...`) بالمفتاح الخاص بك من لوحة تحكم Stripe. (ملاحظة: يتطلب هذا المشروع تشغيل خادم خلفي مصاحب على `localhost:5000` ليعمل بشكل صحيح).',
                },
                {
                    type: ContentType.PROJECT_PAYMENT_GATEWAY
                },
                {
                    type: ContentType.PARAGRAPH,
                    text: 'بعد إتمام عملية الدفع، يتم عادةً إعادة توجيه المستخدم إلى صفحة شكر، حيث يتم التحقق من حالة الطلب في الخلفية وتسليم المنتج الرقمي. المشروع التالي يحاكي هذه العملية.'
                },
                {
                    type: ContentType.PROJECT_DIGITAL_PRODUCT
                },
            ]
        },
        {
            id: 'part2_ch1_sec8',
            title: 'المؤشرات المالية الأساسية في SaaS',
            icon: '📈',
            content: [
                { type: ContentType.HEADING3, text: '1. MRR (Monthly Recurring Revenue) – الإيراد الشهري المتكرر'},
                { type: ContentType.PREFORMATTED_TEXT, text: 'MRR = Σ (سعر الخطة × عدد المشتركين)'},
                { type: ContentType.HEADING3, text: '2. Churn Rate – معدل ترك العملاء'},
                { type: ContentType.PREFORMATTED_TEXT, text: 'Churn Rate = (عدد العملاء الذين ألغوا / إجمالي العملاء في البداية) × 100'},
                { type: ContentType.NOTE, text: '🔹 <b>معدل جيد</b>: أقل من 3% شهريًا.'},
                { type: ContentType.HEADING3, text: '3. LTV (Lifetime Value) – القيمة مدى الحياة للعميل'},
                { type: ContentType.PREFORMATTED_TEXT, text: 'LTV = متوسط الإيراد الشهري للعميل / معدل الانصراف'},
                { type: ContentType.HEADING3, text: '4. CAC (Customer Acquisition Cost) – تكلفة جذب عميل'},
                { type: ContentType.PREFORMATTED_TEXT, text: 'CAC = (إجمالي التسويق + المبيعات) / عدد العملاء الجدد'},
                { type: ContentType.HEADING3, text: '5. نسبة LTV/CAC'},
                { type: ContentType.NOTE, title: 'القاعدة', text: 'إذا كانت <b>LTV > 3 × CAC</b>، فالنموذج مربح.'},
            ]
        },
        {
            id: 'part2_ch1_sec9',
            title: 'حالات دراسية: دروس من النجاح والإخفاق',
            icon: '📊',
            content: [
                { type: ContentType.HEADING3, text: '🎯 الحالة 1: كيف نجح Slack في التسعير؟'},
                { type: ContentType.LIST_UNORDERED, items: ['<b>الاستراتيجية</b>: نموذج <b>Freemium</b> مع تركيز على الفرق.', '<b>التحفيز على الترقية</b>: ميزات مثل "أرشيف الرسائل"، "التكاملات".', '<b>النتائج</b>: 10 مليون مستخدم، 30% معدل تحويل.']},
                { type: ContentType.HEADING3, text: '🎯 الحالة 2: لماذا فشل Google Reader؟'},
                { type: ContentType.LIST_UNORDERED, items: ['<b>النموذج</b>: خدمة مجانية بالكامل.', '<b>لا إيراد</b>: لا اشتراكات، لا إعلانات.', '<b>النتيجة</b>: إغلاق الخدمة عام 2013.']},
                { type: ContentType.NOTE, text: '🔹 <b>الدرس</b>: الخدمة المجانية تحتاج إلى دعم من منتجات أخرى.'},
            ]
        },
        {
            id: 'part2_ch1_sec10',
            title: 'التحديات الشائعة في نماذج الأعمال وحلولها',
            icon: '🧩',
            content: [
                { type: ContentType.PARAGRAPH, text: `<div class="my-6 space-y-4 font-sans">
    <!-- High Churn -->
    <div class="bg-stone-50 border border-stone-200 rounded-lg p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4">
      <div class="flex-shrink-0">
        <div class="bg-red-100 text-red-700 rounded-full h-12 w-12 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" /></svg>
        </div>
      </div>
      <div class="flex-grow">
        <h4 class="font-bold text-red-800">التحدي: الانصراف العالي (High Churn)</h4>
        <p class="text-sm text-stone-600 mt-1"><strong>السبب:</strong> تجربة سيئة، لا قيمة كافية، دعم فني ضعيف.</p>
        <p class="text-sm text-stone-800 font-semibold mt-2"><strong>الحل:</strong> تحسين دعم العملاء، إرسال رسائل تذكير بالميزات، بناء مجتمع للمستخدمين.</p>
      </div>
    </div>
    
    <!-- Low Conversion -->
    <div class="bg-stone-50 border border-stone-200 rounded-lg p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4">
      <div class="flex-shrink-0">
        <div class="bg-amber-100 text-amber-700 rounded-full h-12 w-12 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        </div>
      </div>
      <div class="flex-grow">
        <h4 class="font-bold text-amber-800">التحدي: انخفاض التحويل (Low Conversion)</h4>
        <p class="text-sm text-stone-600 mt-1"><strong>السبب:</strong> تجربة التسجيل معقدة، القيمة غير واضحة، السعر مرتفع.</p>
        <p class="text-sm text-stone-800 font-semibold mt-2"><strong>الحل:</strong> تبسيط التسجيل، إضافة دليل تفاعلي (Onboarding)، تقديم تجربة مجانية.</p>
      </div>
    </div>

    <!-- Billing Issues -->
    <div class="bg-stone-50 border border-stone-200 rounded-lg p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4">
      <div class="flex-shrink-0">
        <div class="bg-sky-100 text-sky-700 rounded-full h-12 w-12 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
        </div>
      </div>
      <div class="flex-grow">
        <h4 class="font-bold text-sky-800">التحدي: الفواتير المفاجئة</h4>
        <p class="text-sm text-stone-600 mt-1"><strong>السبب:</strong> الدفع حسب الاستخدام بدون تنبيه، عدم وضوح سياسة التجديد.</p>
        <p class="text-sm text-stone-800 font-semibold mt-2"><strong>الحل:</strong> إرسال تنبيهات عبر البريد عند اقتراب الحد الأقصى، لوحة تحكم واضحة للاستهلاك.</p>
      </div>
    </div>
</div>`
                }
            ]
        },
        {
            id: 'part2_ch1_sec11',
            title: 'الخلاصة',
            icon: '📚',
            content: [
                { type: ContentType.PARAGRAPH, text: 'نموذج العمل في SaaS ليس خيارًا تكتيكيًا، بل <b>استراتيجية حياة أو موت</b> لأي منتج.'},
                { type: ContentType.PARAGRAPH, text: 'من خلال هذا الفصل، تعلمت:'},
                { type: ContentType.LIST_UNORDERED, items: [
                    'أنواع نماذج الإيراد (Freemium، Subscription، Usage-Based).',
                    'كيف تُصمم هيكل تسعير فعّال.',
                    'كيف تبني نظام إدارة اشتراكات باستخدام Stripe.',
                    'كيف تحسب MRR، Churn، LTV، CAC.',
                    'دروس من شركات ناجحة وفاشلة.'
                ]},
                { type: ContentType.PARAGRAPH, text: 'في الفصل القادم، سننتقل إلى <b>الجانب التقني: تصميم نظام SaaS متعدد المستأجرين (Multi-Tenant Architecture)</b>.'}
            ]
        },
        {
          id: 'part2_ch1_sec12',
          title: 'تمارين تطبيقية',
          icon: '📝',
          content: [
            { type: ContentType.HEADING2, text: 'التمرين الأول: تصميم نموذج كانفاس لفكرة SaaS' },
            { type: ContentType.HEADING3, text: 'الفكرة: "LingoFlow" – منصة SaaS لترجمة وتوطين وثائق البرامج' },
            { type: ContentType.PARAGRAPH, text: '<b>القيمة المقترحة:</b> أتمتة عملية ترجمة وتحديث وثائق المطورين (Developer Docs) وواجهات المستخدم (UI Strings) بشكل مستمر باستخدام الذكاء الاصطناعي، مع الحفاظ على تناسق المصطلحات التقنية.'},
            {
              type: ContentType.PARAGRAPH,
              text: `<div class="bg-stone-50 my-6 p-4 rounded-lg border border-stone-200 shadow-sm font-sans" dir="rtl">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <!-- Value Proposition -->
        <div class="md:col-span-2 p-4 bg-amber-100 border border-amber-200 rounded-lg text-center">
            <h4 class="font-bold text-amber-800 text-lg mb-2">💡 القيمة المقترحة</h4>
            <p class="text-amber-900">"ترجمة وتوطين مستمر ومؤتمت لوثائق البرامج، مدعوم بالذكاء الاصطناعي."</p>
        </div>

        <!-- Customer Side -->
        <div class="space-y-4">
            <div class="p-4 bg-sky-50 border border-sky-200 rounded-lg">
                <h4 class="font-bold text-sky-800 mb-2">👥 العملاء المستهدفون</h4>
                <p class="text-sm text-sky-900">شركات البرمجيات (B2B SaaS)، المطورون المستقلون، مديرو المنتجات.</p>
            </div>
            <div class="p-4 bg-sky-50 border border-sky-200 rounded-lg">
                <h4 class="font-bold text-sky-800 mb-2">🤝 علاقات العملاء</h4>
                <p class="text-sm text-sky-900">دعم فني عبر Slack، وثائق ممتازة، مجتمع للمطورين.</p>
            </div>
            <div class="p-4 bg-sky-50 border border-sky-200 rounded-lg">
                <h4 class="font-bold text-sky-800 mb-2">🚚 قنوات التسويق</h4>
                <p class="text-sm text-sky-900">تكامل مع GitHub Marketplace، محتوى تقني (SEO)، رعاية النشرات الإخبارية للمطورين.</p>
            </div>
        </div>
        
        <!-- Business Side -->
        <div class="space-y-4">
            <div class="p-4 bg-stone-100 border border-stone-200 rounded-lg">
                <h4 class="font-bold text-stone-800 mb-2">⚙️ الأنشطة الأساسية</h4>
                <p class="text-sm text-stone-700">تطوير التكاملات (GitHub, GitLab)، تحسين نماذج الذكاء الاصطناعي، دعم العملاء.</p>
            </div>
            <div class="p-4 bg-stone-100 border border-stone-200 rounded-lg">
                <h4 class="font-bold text-stone-800 mb-2">📦 الموارد الأساسية</h4>
                <p class="text-sm text-stone-700">مهندسو برمجيات، واجهة برمجة تطبيقات للترجمة (e.g., DeepL)، بنية تحتية سحابية.</p>
            </div>
            <div class="p-4 bg-stone-100 border border-stone-200 rounded-lg">
                <h4 class="font-bold text-stone-800 mb-2">🔗 شراكات</h4>
                <p class="text-sm text-stone-700">GitHub, Atlassian (Jira), مزودو خدمات الترجمة بالذكاء الاصطناعي.</p>
            </div>
        </div>

        <!-- Financials -->
        <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 class="font-bold text-red-800 mb-2">💸 هيكل التكاليف</h4>
                <p class="text-sm text-red-900">تكاليف API للترجمة، رواتب الفريق، استضافة سحابية، تسويق.</p>
            </div>
            <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 class="font-bold text-green-800 mb-2">💰 مصدر الإيراد</h4>
                <p class="text-sm text-green-900">اشتراكات شهرية متدرجة بناءً على عدد الكلمات المترجمة والمشاريع.</p>
            </div>
        </div>

    </div>
</div>`
            },
            
            { type: ContentType.HEADING2, text: 'التمرين الثاني: تحليل نموذج تسعير خدمة SaaS' },
            { type: ContentType.HEADING3, text: 'تحليل نموذج تسعير أداة Figma' },
            { type: ContentType.PARAGRAPH, text: 'Figma هي أداة تصميم واجهات مستخدم وتجربة مستخدم (UI/UX) تعاونية تعمل بالكامل في المتصفح. نموذج تسعيرها هو مثال كتابي على استراتيجية النمو المعتمد على المنتج (PLG).'},
            { type: ContentType.DEFINITION_LIST, definitionItems: [
               { term: '1. الخطة المجانية (Starter Plan)', definition: '<b>الوصف:</b> سخية جدًا، تسمح بـ 3 ملفات تصميم و 3 ملفات FigJam مع عدد غير محدود من المتعاونين. <b>الهدف الاستراتيجي:</b> إزالة أي حاجز أمام المستخدم الجديد لتجربة المنتج. إنها أداة تسويق فيروسية قوية، حيث يمكن لأي شخص البدء ومشاركة عمله، مما يعرض المنتج لشبكة أوسع من المستخدمين المحتملين (المطورين، مديري المنتجات).'},
               { term: '2. الخطة الاحترافية (Professional Plan)', definition: '<b>السعر:</b> حوالي 12$ لكل محرر/شهريًا. <b>المحفز للترقية:</b> القيد على عدد الملفات. عندما يبدأ المستقلون أو الفرق الصغيرة في العمل على أكثر من 3 مشاريع، يصبح تنظيم عملهم صعبًا، مما يجعل الترقية ضرورة للحفاظ على الإنتاجية. هذه الخطة تضيف أيضًا ميزات أساسية للفرق مثل مكتبات المكونات المشتركة.'},
               { term: '3. خطة المؤسسات (Organization Plan)', definition: '<b>السعر:</b> حوالي 45$ لكل محرر/شهريًا. <b>المحفز للترقية:</b> الأمان والتحكم. تستهدف هذه الخطة الشركات الكبيرة التي تحتاج إلى ميزات مثل تسجيل الدخول الموحد (SSO)، تحليلات التصميم، والتحكم المتقدم في الصلاحيات. القيمة هنا ليست في أداة التصميم نفسها، بل في إدارة نظام التصميم على نطاق المؤسسة.'},
            ]},
            { type: ContentType.NOTE, title: 'التحليل الاستراتيجي', text: 'نجاح Figma يكمن في ربط التسعير مباشرة بالقيمة التي يحصل عليها العميل في كل مرحلة. الخطة المجانية تركز على **الاستكشاف الفردي والانتشار الفيروسي**. الخطة الاحترافية تركز على **إنتاجية الفريق الصغير**. خطة المؤسسات تركز على **الحوكمة والأمان للشركات الكبيرة**. كل خطة تحل مشكلة مختلفة لشريحة مختلفة من الجمهور.'},

            { type: ContentType.HEADING2, text: 'التمرين الثالث: كتابة كود لإنشاء اشتراك Stripe' },
            { type: ContentType.HEADING3, text: 'الحل المقترح: دالة Python لإنشاء اشتراك جديد' },
            { type: ContentType.PARAGRAPH, text: 'هذا الكود يفترض أن لديك مستخدمًا مسجلاً في قاعدة بياناتك وأن الواجهة الأمامية قد أرسلت `payment_method_id` بعد أن أدخل المستخدم تفاصيل بطاقته.'},
            { type: ContentType.CODE_EXPLANATION,
               language: 'python',
               codeTitle: 'إنشاء اشتراك Stripe لمستخدم جديد',
               code: `import stripe
import os

# قم بتعيين مفتاح Stripe السري من متغيرات البيئة
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")

def create_stripe_subscription_for_user(user_id, email, name, payment_method_id, price_id):
    """
    إنشاء عميل واشتراك جديد في Stripe لمستخدم معين.
    """
    try:
        # 1. ابحث عن العميل أو أنشئ واحدًا جديدًا لتجنب التكرار
        existing_customers = stripe.Customer.list(email=email, limit=1).data
        if existing_customers:
            customer = existing_customers[0]
        else:
            customer = stripe.Customer.create(
                email=email,
                name=name,
                metadata={'app_user_id': user_id} # مهم جدًا للربط بين النظامين
            )
        
        # 2. ربط وسيلة الدفع بالعميل
        stripe.PaymentMethod.attach(payment_method_id, customer=customer.id)
        stripe.Customer.modify(
            customer.id,
            invoice_settings={'default_payment_method': payment_method_id}
        )

        # 3. إنشاء الاشتراك
        subscription = stripe.Subscription.create(
            customer=customer.id,
            items=[{'price': price_id}],
            expand=['latest_invoice.payment_intent'] # للحصول على client_secret إذا تطلب الأمر تأكيدًا إضافيًا
        )
        
        # 4. (خطوة حاسمة) حفظ المعرفات في قاعدة بياناتك
        # updateUserInDB(user_id, stripe_customer_id=customer.id, stripe_subscription_id=subscription.id)
        
        return {"success": True, "subscription": subscription}

    except stripe.error.StripeError as e:
        # التعامل مع أخطاء Stripe بشكل آمن
        return {"success": False, "error": e.user_message or str(e)}
`,
               explanations: [
                   { lines: '14-20', explanation: 'قبل إنشاء عميل جديد، من الأفضل دائمًا التحقق مما إذا كان موجودًا بالفعل بنفس البريد الإلكتروني لتجنب إنشاء سجلات مكررة في Stripe.' },
                   { lines: '23-28', explanation: 'هذه الخطوة المكونة من جزأين تربط وسيلة الدفع التي قدمها المستخدم بالعميل وتعينها كوسيلة دفع افتراضية للفواتير المستقبلية.' },
                   { lines: '31-35', explanation: 'هنا يتم إنشاء الاشتراك الفعلي. طلب `expand` يسمح لنا بالحصول على معلومات إضافية في نفس استدعاء API، مما يقلل من عدد الطلبات.'},
                   { lines: '38', explanation: 'بعد نجاح العملية في Stripe، من الضروري حفظ معرف العميل والاشتراك في قاعدة بياناتك المحلية. هذا يسمح لك بربط الأحداث المستقبلية (من Webhooks) بالمستخدم الصحيح في نظامك.' }
               ]
            },

            { type: ContentType.HEADING2, text: 'التمرين الرابع: حساب MRR وChurn Rate' },
            { type: ContentType.HEADING3, text: 'السيناريو المعطى' },
            { type: ContentType.LIST_UNORDERED, items: [
                'عدد العملاء في بداية الشهر: 100 عميل.',
                '5 عملاء منهم ألغوا اشتراكهم.',
            ]},
            { type: ContentType.NOTE, title: 'إضافة تفاصيل للتحليل', text: 'لجعل الحساب أكثر واقعية، سنفترض أن العملاء موزعون على خطتين سعريتين مختلفتين، وأن العملاء الذين ألغوا اشتراكهم كانوا جميعًا من الخطة الأقل سعرًا.'},
            { type: ContentType.PARAGRAPH, text: '<b>التوزيع المفترض:</b><br/>- 80 عميلاً على الخطة الأساسية بسعر 10$ شهريًا.<br/>- 20 عميلاً على الخطة الاحترافية بسعر 25$ شهريًا.<br/>- 5 عملاء الذين ألغوا كانوا جميعًا من الخطة الأساسية (10$).'},
            { type: ContentType.HEADING3, text: '1. حساب الإيراد الشهري المتكرر (MRR) في بداية الشهر' },
            { type: ContentType.PREFORMATTED_TEXT, text: 
`MRR = (عدد عملاء الخطة الأساسية × سعرها) + (عدد عملاء الخطة الاحترافية × سعرها)
MRR = (80 × 10$) + (20 × 25$)
MRR = 800$ + 500$
MRR = 1300$`
            },
            { type: ContentType.PARAGRAPH, text: 'إجمالي الإيراد الشهري المتكرر في بداية الشهر كان <b>1300$</b>.'},
            { type: ContentType.HEADING3, text: '2. حساب معدل انصراف العملاء (Customer Churn Rate)' },
            { type: ContentType.PREFORMATTED_TEXT, text: 
`Customer Churn Rate = (عدد العملاء الذين ألغوا / إجمالي العملاء في البداية) × 100
Customer Churn Rate = (5 / 100) × 100
Customer Churn Rate = 5%`
            },
            { type: ContentType.PARAGRAPH, text: 'معدل انصراف العملاء لهذا الشهر هو <b>5%</b>.'},
            { type: ContentType.HEADING3, text: '3. حساب معدل انصراف الإيرادات (Revenue Churn Rate)' },
            { type: ContentType.PARAGRAPH, text: 'أولاً، نحسب الإيرادات المفقودة (Churned MRR):'},
            { type: ContentType.PREFORMATTED_TEXT, text: 
`Churned MRR = عدد العملاء الذين ألغوا × سعر خطتهم
Churned MRR = 5 × 10$
Churned MRR = 50$`
            },
            { type: ContentType.PARAGRAPH, text: 'ثانياً، نحسب النسبة المئوية لانصراف الإيرادات:'},
            { type: ContentType.PREFORMATTED_TEXT, text: 
`Revenue Churn Rate = (Churned MRR / إجمالي MRR في البداية) × 100
Revenue Churn Rate = (50$ / 1300$) × 100
Revenue Churn Rate ≈ 3.85%`
            },
            { type: ContentType.PARAGRAPH, text: 'معدل انصراف الإيرادات لهذا الشهر هو حوالي <b>3.85%</b>.'},
            { type: ContentType.NOTE, title: 'التحليل والاستنتاج', text: 'لاحظ أن معدل انصراف الإيرادات (3.85%) أقل من معدل انصراف العملاء (5%). هذا مؤشر إيجابي نسبيًا، لأنه يعني أن العملاء الذين غادروا كانوا من ذوي القيمة الأقل. إذا كان العملاء الذين غادروا من الخطة الاحترافية، لكان انصراف الإيرادات أعلى بكثير. هذا يوضح لماذا يعتبر تتبع Revenue Churn أكثر أهمية لفهم الصحة المالية الحقيقية لنظام SaaS.'},

            { type: ContentType.HEADING2, text: 'التمرين الخامس: تصميم هيكل تسعير لتطبيق إدارة مهام' },
            { type: ContentType.HEADING3, text: 'هيكل تسعير مقترح لتطبيق "TaskZen"' },
            { type: ContentType.PARAGRAPH, text: 'الفلسفة وراء هذا التصميم هي جذب المستخدمين الأفراد من خلال خطة مجانية قوية (PLG)، ثم تحويل الفرق الصغيرة والشركات من خلال تقديم ميزات تعاون وأمان متقدمة كقيمة إضافية واضحة.'},
            { type: ContentType.PREFORMATTED_TEXT, text: 
`| | مجاني (Free) | احترافي (Pro) | أعمال (Business) |
|---|---|---|---|
| **السعر** | 0$ | 8$ لكل مستخدم/شهريًا | 15$ لكل مستخدم/شهريًا |
| **الجمهور المستهدف** | الأفراد، الطلاب، الاستخدام الشخصي | الفرق الصغيرة، المستقلون، الشركات الناشئة | الأقسام، الشركات المتوسطة والكبيرة |
| **الميزة الفاصلة** | **التنظيم الأساسي** | **التعاون المتقدم** | **التحكم والأمان** |
|---------------------|--------------------------------|--------------------------------------|-----------------------------------------|
| **المشاريع** | 3 مشاريع | غير محدود | غير محدود |
| **المهام** | غير محدود | غير محدود | غير محدود |
| **المستخدمون** | مستخدم واحد فقط | حتى 15 مستخدم | غير محدود |
| **التكاملات** | تكاملات أساسية (Google Calendar) | تكاملات متقدمة (Slack, GitHub) | تكاملات مخصصة (API Access) |
| **التقارير** | - | لوحة تحكم أساسية | تقارير متقدمة وتصدير بيانات |
| **الأمان** | - | - | تسجيل الدخول الموحد (SSO) |
| **الدعم** | مجتمع فقط | دعم عبر البريد الإلكتروني | دعم ذو أولوية |`
           },
           { type: ContentType.HEADING3, text: 'المنطق الاستراتيجي وراء كل خطة' },
           { type: ContentType.DEFINITION_LIST, definitionItems: [
               { term: '1. الخطة المجانية (Free)', definition: '<b>الهدف:</b> اكتساب أكبر عدد ممكن من المستخدمين. القيد على **3 مشاريع** هو "جدار دفع" (paywall) معقول. عندما يبدأ المستخدم في إدارة جوانب متعددة من حياته أو عمله، سيصل إلى هذا الحد بسرعة ويشعر بالحاجة إلى الترقية.' },
               { term: '2. الخطة الاحترافية (Pro)', definition: '<b>الهدف:</b> تحويل المستخدمين الأفراد إلى فرق. القيمة الأساسية هنا هي **التعاون**. إضافة مستخدمين والتكامل مع أدوات الفريق مثل Slack يجعل التطبيق "لزجًا" (sticky) ويصعب التخلي عنه. السعر (8$) يجعله في متناول معظم الفرق الصغيرة.' },
               { term: '3. خطة الأعمال (Business)', definition: '<b>الهدف:</b> البيع للمؤسسات. القيمة هنا ليست في إدارة المهام، بل في **الحوكمة والأمان والتحكم**. ميزات مثل SSO وتقارير الاستخدام المتقدمة هي متطلبات أساسية لأي قسم تقنية معلومات في شركة كبيرة، وهم على استعداد للدفع مقابلها.' },
           ]},
          ]
      }
      ],
    },
  ],
};