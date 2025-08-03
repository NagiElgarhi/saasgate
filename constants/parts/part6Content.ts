import { Part, ContentType } from '../../types';

export const part6: Part = {
  id: 'part6',
  partTitle: 'الباب السادس: أنظمة الدفع والاشتراكات',
  icon: '💳',
  chapters: [
    {
      id: 'part6_chapter1',
      chapterTitle: 'الفصل 6: تكامل أنظمة الدفع والاشتراكات في SaaS – من Stripe إلى إدارة الفواتير المعقدة',
      sections: [
        {
          id: 'part6_ch1_sec1',
          title: 'مقدمة: لماذا نظام الدفع هو القلب النابض لأي نظام SaaS؟',
          icon: '📌',
          content: [
            {
              type: ContentType.PARAGRAPH,
              text: 'في عالم <b>SaaS (البرمجيات كخدمة - Software as a Service)</b>، لا يُقاس نجاح النظام فقط بجودة الكود أو جمال التصميم، بل <b>بقدرته على تحويل المستخدم إلى عميل يدفع</b>.',
            },
            {
              type: ContentType.PARAGRAPH,
              text: 'الواجهة الأمامية تجذب، والواجهة الخلفية تُعالج، لكن <b>نظام الدفع (Payment System) هو الذي يُحقق الإيراد</b>.',
            },
            {
              type: ContentType.PARAGRAPH,
              text: 'إذا فشل النظام في:\n- جمع الدفعة الأولى،\n- تجديد الاشتراك تلقائيًا،\n- إرسال فاتورة صحيحة،\n- معالجة استرداد الأموال،\n\nفإن كل ما بنيته سينهار.',
            },
            {
              type: ContentType.PARAGRAPH,
              text: 'في هذا الفصل، لن نكتفِ بشرح "كيف تدمج Stripe"، بل سنغوص في:',
            },
            {
              type: ContentType.LIST_UNORDERED,
              items: [
                '<b>تصميم نظام اشتراكات (Subscriptions) متعدد المستويات</b>.',
                '<b>دمج Stripe وPayPal وPaddle</b>.',
                '<b>أكواد عملية</b> لإدارة الفواتير (Invoices)، التحديثات، والإشعارات.',
                '<b>معالجة حالات معقدة</b>: تغيير الخطة، الإلغاء، الاسترداد، التجديد التلقائي.',
                '<b>الامتثال الضريبي (Tax Compliance)</b>.',
                '<b>حالات دراسية</b> من شركات مثل <b>Notion، Figma، وGitHub</b>.',
                '<b>تمارين تطبيقية</b> لبناء نظام دفع كامل.',
              ],
            },
            {
              type: ContentType.PARAGRAPH,
              text: 'بعد قراءة هذا الفصل، ستكون قادرًا على:',
            },
            {
                type: ContentType.LIST_UNORDERED,
                items: [
                    'بناء نظام اشتراكات قوي وآمن.',
                    'دمج Stripe بشكل كامل (من العميل إلى الخادم).',
                    'إدارة الفواتير، الضرائب، والاستردادات.',
                    'تصميم تجربة دفع سلسة (Checkout Experience).',
                    'تجنب الأخطاء الشائعة التي تُدمّر الثقة بالمنتج.',
                ]
            }
          ],
        },
        {
          id: 'part6_ch1_sec2',
          title: '6.1 لماذا نظام الدفع في SaaS مختلف؟',
          icon: '🔍',
          content: [
            { type: ContentType.HEADING3, text: '📘 الفرق بين الدفع في متجر إلكتروني والدفع في SaaS' },
            { type: ContentType.PARAGRAPH, text: `<div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
    <!-- E-commerce Card -->
    <div class="bg-white border border-stone-200 rounded-lg p-6 shadow-sm">
        <div class="flex items-center gap-3 mb-4">
            <div class="bg-lime-100 text-lime-700 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 class="text-xl font-bold text-stone-800">المتجر الإلكتروني</h3>
        </div>
        <ul class="space-y-2 text-sm text-stone-600">
            <li><strong>نوع الدفع:</strong> لمرة واحدة</li>
            <li><strong>المنتج:</strong> سلعة مادية أو رقمية</li>
            <li><strong>إدارة الاشتراك:</strong> غير مطلوبة</li>
            <li><strong>التجديد التلقائي:</strong> نادر</li>
            <li><strong>الاسترداد:</strong> على أساس المنتج</li>
            <li><strong>الفواتير:</strong> بسيطة</li>
        </ul>
    </div>

    <!-- SaaS Card -->
    <div class="bg-white border border-stone-200 rounded-lg p-6 shadow-sm">
        <div class="flex items-center gap-3 mb-4">
            <div class="bg-sky-100 text-sky-700 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 class="text-xl font-bold text-stone-800">نظام SaaS</h3>
        </div>
        <ul class="space-y-2 text-sm text-stone-600">
            <li><strong>نوع الدفع:</strong> متكرر (شهري/سنوي)</li>
            <li><strong>المنتج:</strong> خدمة مستمرة</li>
            <li><strong>إدارة الاشتراك:</strong> أساسية</li>
            <li><strong>التجديد التلقائي:</strong> إجباري</li>
            <li><strong>الاسترداد:</strong> على أساس الوقت (Prorated)</li>
            <li><strong>الفواتير:</strong> معقدة ومتكررة</li>
        </ul>
    </div>
</div>`},
            { type: ContentType.NOTE, text: '🔹 **الخلاصة**: في SaaS، الدفع ليس "عملية"، بل **علاقة مستمرة مع العميل**.' },
            { type: ContentType.HEADING3, text: '🧩 ما الذي يجب أن يفعله نظام الدفع في SaaS؟' },
            { type: ContentType.PARAGRAPH, text: `<div class="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
    <div class="bg-stone-50 p-4 rounded-lg border border-stone-200 flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        <div><h4 class="font-bold">إنشاء عميل</h4><p class="text-sm text-stone-600">حفظ بيانات العميل والدفع.</p></div>
    </div>
    <div class="bg-stone-50 p-4 rounded-lg border border-stone-200 flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h5V4H4zm0 9h5v5H4v-5zm9-9h5v5h-5V4zm0 9h5v5h-5v-5z" /></svg>
        <div><h4 class="font-bold">إدارة الاشتراكات</h4><p class="text-sm text-stone-600">تفعيل، تعديل، إلغاء، تجديد.</p></div>
    </div>
    <div class="bg-stone-50 p-4 rounded-lg border border-stone-200 flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
        <div><h4 class="font-bold">جمع الدفعات</h4><p class="text-sm text-stone-600">شهريًا، سنويًا، أو حسب الاستخدام.</p></div>
    </div>
    <div class="bg-stone-50 p-4 rounded-lg border border-stone-200 flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        <div><h4 class="font-bold">إرسال الفواتير</h4><p class="text-sm text-stone-600">تلقائيًا، بصيغة PDF، عبر البريد.</p></div>
    </div>
    <div class="bg-stone-50 p-4 rounded-lg border border-stone-200 flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        <div><h4 class="font-bold">معالجة الاستردادات</h4><p class="text-sm text-stone-600">جزئية أو كاملة، مع تسوية حسابية.</p></div>
    </div>
    <div class="bg-stone-50 p-4 rounded-lg border border-stone-200 flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0z" /></svg>
        <div><h4 class="font-bold">الامتثال الضريبي</h4><p class="text-sm text-stone-600">حساب الضرائب تلقائيًا حسب الدولة.</p></div>
    </div>
</div>`},
          ],
        },
        {
          id: 'part6_ch1_sec3',
          title: '6.2 أفضل أدوات الدفع للأنظمة SaaS',
          icon: '🧰',
          content: [
            { type: ContentType.HEADING3, text: '1. **Stripe – الملك غير المُنازع**' },
            { type: ContentType.HEADING4, text: '📌 لماذا Stripe؟' },
            { type: ContentType.LIST_UNORDERED, items: [
                '<b>أفضل واجهة برمجة (API)</b> في السوق.',
                '<b>دعم كامل للإشتراكات، الفواتير، الضرائب، والاستردادات</b>.',
                '<b>متوافق مع أكثر من 135 عملة</b>.',
                '<b>يدعم الدفع عبر Apple Pay، Google Pay، SEPA، وغيرها</b>.',
                '<b>ممتاز للـ Developers</b>.',
            ]},
            { type: ContentType.HEADING4, text: '🏢 أمثلة واقعية' },
            { type: ContentType.LIST_UNORDERED, items: ['<b>Notion</b>', '<b>Figma</b>', '<b>Shopify (في بعض المناطق)</b>', '<b>GitHub (للاشتراكات)</b>', '<b>Canva</b>']},
            { type: ContentType.HEADING4, text: '💡 ميزة فريدة: **بوابة العميل (Customer Portal)**' },
            { type: ContentType.PARAGRAPH, text: 'يسمح للعميل بتغيير خطته، بطاقة الدفع، أو إلغاء الاشتراك من صفحة مخصصة.'},
            { type: ContentType.CODE_BLOCK, language: 'javascript', code: `// إنشاء رابط لبوابة العميل
const { url } = await stripe.billingPortal.sessions.create({
  customer: 'cus_123',
  return_url: 'https://yoursaas.com/account',
});`},

            { type: ContentType.HEADING3, text: '2. **PayPal – الخيار البديل**' },
            { type: ContentType.HEADING4, text: '📌 المميزات' },
            { type: ContentType.LIST_UNORDERED, items: ['معروف عالميًا.', 'مناسب للعملاء الذين لا يثقون ببطاقات الائتمان.']},
            { type: ContentType.HEADING4, text: '❌ العيوب' },
            { type: ContentType.LIST_UNORDERED, items: ['واجهة برمجة أقل تطورًا من Stripe.', 'لا يدعم بعض ميزات الاشتراكات المتقدمة.', 'رسوم أعلى في بعض الدول.']},
            { type: ContentType.HEADING4, text: '🏢 أمثلة' },
            { type: ContentType.LIST_UNORDERED, items: ['بعض أنظمة SaaS الصغيرة.', 'منصات التعليم الإلكتروني.']},

            { type: ContentType.HEADING3, text: '3. **Paddle – الحل المتكامل**' },
            { type: ContentType.HEADING4, text: '📌 المميزات' },
            { type: ContentType.LIST_UNORDERED, items: ['<b>يُدير الدفع، الضرائب، والامتثال نيابة عنك</b>.', '<b>لا تحتاج إلى حساب بنكي في كل دولة</b>.', '<b>يدفع لك مرة واحدة شهريًا بالدولار</b>.']},
            { type: ContentType.HEADING4, text: '❌ العيوب' },
            { type: ContentType.LIST_UNORDERED, items: ['رسوم أعلى (6% + 0.50$ لكل عملية).', 'أقل مرونة من Stripe.']},
            { type: ContentType.HEADING4, text: '🏢 أمثلة' },
            { type: ContentType.LIST_UNORDERED, items: ['<b>Bjango</b> (مطور تطبيقات Mac)', '<b>Setapp</b> (منصة تطبيقات Mac)']},
            
            { type: ContentType.HEADING3, text: '4. **Adyen – للشركات الكبرى**' },
            { type: ContentType.HEADING4, text: '📌 المميزات' },
            { type: ContentType.LIST_UNORDERED, items: ['دعم دفعات ضخمة.', 'تكامل مع أنظمة ERP.']},
            { type: ContentType.HEADING4, text: '❌ العيوب' },
            { type: ContentType.LIST_UNORDERED, items: ['معقد، غير مناسب للشركات الناشئة.']},
          ]
        },
        {
          id: 'part6_ch1_sec4',
          title: '6.3 دمج Stripe: من العميل إلى الخادم',
          icon: '💳',
          content: [
            { type: ContentType.HEADING3, text: '1. **تهيئة Stripe في المشروع**' },
            { type: ContentType.HEADING4, text: '📌 الخطوة 1: إنشاء حساب Stripe' },
            { type: ContentType.PARAGRAPH, text: 'اذهب إلى [https://dashboard.stripe.com](https://dashboard.stripe.com)\nاحصل على:\n- `Publishable Key` (للاستخدام في الواجهة الأمامية)\n- `Secret Key` (للاستخدام في الخادم فقط)'},
            { type: ContentType.HEADING4, text: '📌 الخطوة 2: تثبيت المكتبات' },
            { type: ContentType.CODE_BLOCK, language: 'bash', code: `# Node.js
npm install stripe @stripe/stripe-js

# Python
pip install stripe`},
            { type: ContentType.HEADING3, text: '2. **الواجهة الأمامية: نموذج الدفع (Checkout Form)**' },
            { type: ContentType.CODE_BLOCK, language: 'jsx', code: `// React + Stripe.js
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_...');

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      alert(error.message);
    } else {
      // إرسال paymentMethod.id إلى الخادم
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_method: paymentMethod.id,
          email: 'user@example.com',
          price_id: 'price_pro_monthly'
        })
      });
      const result = await response.json();
      if (result.error) {
        alert(result.error);
      } else {
        alert('تم الاشتراك بنجاح!');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{
        style: {
          base: { fontSize: '16px' }
        }
      }} />
      <button type="submit" disabled={!stripe}>
        اشترك الآن
      </button>
    </form>
  );
}

function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}`},
            { type: ContentType.HEADING3, text: '3. **الخادم: إنشاء اشتراك (Node.js أو Python)**' },
            { type: ContentType.HEADING4, text: '🔹 Python (Flask)' },
            { type: ContentType.CODE_BLOCK, language: 'python', code: `import stripe
from flask import request, jsonify

stripe.api_key = "sk_test_..."

@app.route('/api/create-subscription', methods=['POST'])
def create_subscription():
    data = request.json
    email = data['email']
    payment_method = data['payment_method']
    price_id = data['price_id']

    try:
        # 1. إنشاء عميل
        customer = stripe.Customer.create(
            email=email,
            payment_method=payment_method,
            invoice_settings={
                'default_payment_method': payment_method
            }
        )

        # 2. إنشاء اشتراك
        subscription = stripe.Subscription.create(
            customer=customer.id,
            items=[{"price": price_id}],
            payment_settings={
                'save_default_payment_method': 'on_subscription'
            },
            expand=['latest_invoice.payment_intent']
        )

        # 3. حفظ في قاعدة البيانات
        db.execute("""
            INSERT INTO subscriptions 
            (customer_id, subscription_id, status, price_id, tenant_id)
            VALUES (?, ?, ?, ?, ?)
        """, [
            customer.id, 
            subscription.id, 
            subscription.status,
            price_id,
            get_current_tenant_id()
        ])

        return jsonify({
            'subscription': subscription.id,
            'client_secret': subscription.latest_invoice.payment_intent.client_secret
        })

    except stripe.error.CardError as e:
        return jsonify({'error': e.user_message}), 400
    except Exception as e:
        return jsonify({'error': 'حدث خطأ غير متوقع'}), 500`},
          ]
        },
        {
          id: 'part6_ch1_sec5',
          title: '6.4 إدارة دورة حياة الاشتراك',
          icon: '🔁',
          content: [
            { type: ContentType.HEADING3, text: '1. **التجديد التلقائي (Auto-Renewal)**' },
            { type: ContentType.PARAGRAPH, text: '- يتم تجديد الاشتراك تلقائيًا كل شهر/سنة.\n- Stripe يحاول جمع الدفعة قبل انتهاء الفترة.\n- إذا فشل (بطاقة منتهية)، يُرسل إشعار.'},
            { type: ContentType.NOTE, text: '🔹 **الحل**: إرسال بريد قبل 3 أيام من التجديد.' },

            { type: ContentType.HEADING3, text: '2. **تغيير الخطة (Plan Change)**' },
            { type: ContentType.CODE_BLOCK, language: 'python', code: `def upgrade_plan(subscription_id, new_price_id):
    stripe.Subscription.modify(
        subscription_id,
        items=[{
            "id": stripe.Subscription.retrieve(subscription_id).items.data[0].id,
            "price": new_price_id
        }],
        proration_behavior='always_invoice'  # فوترة فورية للفرق
    )`},

            { type: ContentType.HEADING3, text: '3. **الإلغاء (Cancellation)**' },
            { type: ContentType.CODE_BLOCK, language: 'python', code: `def cancel_subscription(subscription_id):
    stripe.Subscription.delete(subscription_id)`},
            { type: ContentType.NOTE, text: '🔹 **ملاحظة**: يمكن الإلغاء في نهاية الفترة (Cancel at period end).' },

            { type: ContentType.HEADING3, text: '4. **الاسترداد الجزئي (Prorated Refund)**' },
            { type: ContentType.CODE_BLOCK, language: 'python', code: `def refund_subscription(subscription_id):
    subscription = stripe.Subscription.retrieve(subscription_id)
    invoice = stripe.Invoice.retrieve(subscription.latest_invoice)
    
    # استرداد جزئي حسب الوقت المتبقي
    refund = stripe.Refund.create(
        payment_intent=invoice.payment_intent,
        amount=calculate_prorated_amount(subscription)
    )`},
          ]
        },
        {
            id: 'part6_ch1_sec6',
            title: '6.5 إدارة الفواتير (Invoicing)',
            icon: '🧾',
            content: [
              { type: ContentType.HEADING3, text: '1. **إنشاء فاتورة تلقائيًا**' },
              { type: ContentType.PARAGRAPH, text: 'Stripe يُنشئ فاتورة عند:\n- بدء الاشتراك.\n- تجديد الاشتراك.\n- تغيير الخطة.\n- دفع حسب الاستخدام.'},
              
              { type: ContentType.HEADING3, text: '2. **تخصيص الفاتورة**' },
              { type: ContentType.CODE_BLOCK, language: 'python', code: `invoice = stripe.Invoice.create(
    customer=customer_id,
    auto_advance=True,
    custom_fields=[
        {"name": "رقم العميل", "value": "CUST-123"}
    ],
    description="فاتورة اشتراك شهري"
)`},
              
              { type: ContentType.HEADING3, text: '3. **إرسال فاتورة كـ PDF**' },
              { type: ContentType.CODE_BLOCK, language: 'python', code: `# الحصول على رابط الفاتورة
invoice = stripe.Invoice.retrieve('in_123')
pdf_url = invoice.invoice_pdf

# إرسال عبر البريد
send_email(
    to="client@company.com",
    subject="فاتورتك جاهزة",
    body=f"المرفق فاتورتك: {pdf_url}"
)`},
            ]
        },
        {
          id: 'part6_ch1_sec7',
          title: '6.6 الضرائب التلقائية (Tax Automation)',
          icon: '🧮',
          content: [
              { type: ContentType.HEADING3, text: '1. **تمكين الضريبة في Stripe**' },
              { type: ContentType.PARAGRAPH, text: '- اذهب إلى لوحة تحكم Stripe → Tax → ابدأ التسجيل.\n- أدخل عنوان شركتك.\n- Stripe سيحسب الضريبة تلقائيًا حسب موقع العميل.'},
              
              { type: ContentType.HEADING3, text: '2. **حساب الضريبة في الطلب**' },
              { type: ContentType.CODE_BLOCK, language: 'python', code: `# إضافة الضريبة عند إنشاء الاشتراك
subscription = stripe.Subscription.create(
    customer=customer_id,
    items=[{"price": "price_monthly"}],
    add_invoice_items=[{
        "price": "txr_usa_ca_sales_tax",  # معدل ضريبي مسبق
        "quantity": 1
    }]
)`},
              
              { type: ContentType.HEADING3, text: '3. **تصدير التقارير الضريبية**' },
              { type: ContentType.PARAGRAPH, text: '- Stripe يُوفّر تقارير شهرية وسنوية.\n- يمكن التصدير إلى QuickBooks أو Xero.'},
          ]
        },
        {
            id: 'part6_ch1_sec8',
            title: '6.7 Webhooks: الاستجابة لأحداث الدفع',
            icon: '🔔',
            content: [
                { type: ContentType.HEADING3, text: '1. **تهيئة Webhook في Stripe**' },
                { type: ContentType.PARAGRAPH, text: '- اذهب إلى: Developers → Webhooks\n- أضف عنوان URL: `https://yoursaas.com/webhook`\n- اختر الأحداث:'},
                { type: ContentType.LIST_UNORDERED, items: [
                    '`invoice.payment_succeeded`',
                    '`invoice.payment_failed`',
                    '`customer.subscription.deleted`',
                    '`customer.subscription.updated`',
                ]},
                { type: ContentType.HEADING3, text: '2. **معالجة Webhook في الخادم (Python)**' },
                { type: ContentType.CODE_BLOCK, language: 'python', code: `@app.route('/webhook', methods=['POST'])
def stripe_webhook():
    payload = request.get_data()
    sig_header = request.headers.get('Stripe-Signature')

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, 'whsec_...'
        )
    except ValueError:
        return jsonify({'error': 'Invalid payload'}), 400
    except stripe.error.SignatureVerificationError:
        return jsonify({'error': 'Invalid signature'}), 400

    # معالجة الأحداث
    if event['type'] == 'invoice.payment_succeeded':
        handle_payment_succeeded(event)
    elif event['type'] == 'invoice.payment_failed':
        handle_payment_failed(event)
    elif event['type'] == 'customer.subscription.deleted':
        handle_subscription_canceled(event)
    elif event['type'] == 'customer.subscription.updated':
        handle_subscription_updated(event)

    return jsonify({'status': 'success'}), 200`},
                { type: ContentType.HEADING3, text: '3. **وظائف المعالجة**' },
                { type: ContentType.CODE_BLOCK, language: 'python', code: `def handle_payment_succeeded(event):
    invoice = event['data']['object']
    subscription_id = invoice['subscription']
    
    # تحديث حالة الاشتراك
    db.execute("""
        UPDATE subscriptions 
        SET status = 'active', 
            next_billing_date = %s 
        WHERE subscription_id = %s
    """, [invoice['next_payment_attempt'], subscription_id])

    # إرسال بريد تأكيد
    send_email(
        to=get_customer_email(subscription_id),
        subject="تم الدفع بنجاح",
        body="تم تجديد اشتراكك بنجاح!"
    )

def handle_payment_failed(event):
    invoice = event['data']['object']
    send_email(
        to=get_customer_email(invoice['customer']),
        subject="فشل الدفع",
        body="لم نتمكن من جمع الدفعة. يرجى تحديث بطاقة الدفع."
    )`},
            ]
        },
        {
          id: 'part6_ch1_sec9',
          title: '6.8 الأمان في نظام الدفع',
          icon: '🛡️',
          content: [
            { type: ContentType.HEADING3, text: '1. **Never expose your Secret Key**' },
            { type: ContentType.PARAGRAPH, text: '- لا تُخزن `sk_test_...` في الواجهة الأمامية.\n- استخدمها فقط في الخادم.'},
            { type: ContentType.HEADING3, text: '2. **استخدم Webhooks مع التحقق من التوقيع**' },
            { type: ContentType.PARAGRAPH, text: 'تأكد أن الرسالة من Stripe، وليس من هاكر.'},
            { type: ContentType.HEADING3, text: '3. **سجل جميع الأحداث**' },
            { type: ContentType.CODE_BLOCK, language: 'python', code: `log_payment_event(event.type, event.data, timestamp)`},
          ]
        },
        {
          id: 'part6_ch1_sec10',
          title: '6.9 حالات دراسية: دروس من أنظمة SaaS ناجحة',
          icon: '📊',
          content: [
            { type: ContentType.HEADING3, text: '🎯 دراسة حالة 1: **GitHub – إدارة اشتراكات المطورين**' },
            { type: ContentType.PARAGRAPH, text: '- **النموذج**: اشتراك للمؤسسات.\n- **الدفع**: عبر Stripe.\n- **النتائج**: نجاح كبير في السوق التقني.'},
            { type: ContentType.HEADING3, text: '🎯 دراسة حالة 2: **Figma – تجربة دفع سلسة**' },
            { type: ContentType.PARAGRAPH, text: '- **التصميم**: نموذج دفع بسيط، لا تشتيت.\n- **النتائج**: معدل تحويل عالٍ.'},
          ]
        },
        {
          id: 'part6_ch1_sec11',
          title: 'الخلاصة',
          icon: '📚',
          content: [
            { type: ContentType.PARAGRAPH, text: 'نظام الدفع في SaaS ليس مجرد "زر اشترك"، بل **نظام متكامل يُدير العلاقة مع العميل**.'},
            { type: ContentType.PARAGRAPH, text: 'من خلال هذا الفصل، تعلمت:'},
            { type: ContentType.LIST_UNORDERED, items: [
              'دمج Stripe بشكل كامل.',
              'إدارة الاشتراكات، الفواتير، والضرائب.',
              'معالجة الأحداث عبر Webhooks.',
              'تجربة دفع سلسة.',
              'دروس من أنظمة ناجحة.',
            ]},
            { type: ContentType.PARAGRAPH, text: 'في الفصل القادم، سننتقل إلى **إطلاق المنتج وتجربة المستخدم الأولى**.'},
          ]
        },
        {
          id: 'part6_ch1_sec12',
          title: 'تمارين تطبيقية',
          icon: '📝',
          content: [
            { type: ContentType.DEFINITION_LIST, definitionItems: [
              { term: '1. ابني نموذج دفع', definition: 'باستخدام Stripe.js.'},
              { term: '2. اكتب وظيفة إنشاء اشتراك', definition: 'في الخادم.'},
              { term: '3. أدمج Webhook', definition: 'لمعالجة الدفع الناجح.'},
              { term: '4. صمم فاتورة PDF', definition: 'تُرسل تلقائيًا.'},
              { term: '5. أضف دعمًا للضرائب', definition: 'باستخدام Stripe Tax.'},
            ]}
          ]
        }
      ]
    }
  ]
};