# 📧 إعداد EmailJS للموقع

## الخطوات المطلوبة:

### 1️⃣ إنشاء حساب EmailJS (مجاني)

1. اذهب إلى: **https://www.emailjs.com/**
2. اضغط **Sign Up** وأنشئ حساباً مجانياً
3. سجل الدخول

---

### 2️⃣ إضافة خدمة البريد الإلكتروني

1. من لوحة التحكم، اذهب إلى **Email Services**
2. اضغط **Add New Service**
3. اختر **Gmail** (أو أي خدمة أخرى)
4. اتبع التعليمات لربط حساب Gmail الخاص بك: `Abdelhakkhayari00@gmail.com`
5. احفظ **Service ID** (مثل: `service_abc123`)

---

### 3️⃣ إنشاء قالب البريد الإلكتروني

1. اذهب إلى **Email Templates**
2. اضغط **Create New Template**
3. استخدم هذا القالب:

**Subject:**
```
طلب جديد من موقع LOGPLUS - {{service}}
```

**Content:**
```
مرحباً،

لديك طلب تواصل جديد من موقع LOGPLUS:

الاسم: {{from_name}}
البريد الإلكتروني: {{from_email}}
رقم الهاتف: {{phone}}
الخدمة المطلوبة: {{service}}

الرسالة:
{{message}}

---
تم الإرسال من موقع LOGPLUS
```

4. احفظ **Template ID** (مثل: `template_xyz789`)

---

### 4️⃣ الحصول على Public Key

1. اذهب إلى **Account** → **General**
2. انسخ **Public Key** (مثل: `user_abcXYZ123`)

---

### 5️⃣ تحديث الكود في الموقع

افتح ملف `index.html` وابحث عن:

```javascript
emailjs.init("YOUR_PUBLIC_KEY");
```

استبدل `YOUR_PUBLIC_KEY` بالمفتاح الخاص بك.

---

افتح ملف `script.js` وابحث عن:

```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

استبدل:
- `YOUR_SERVICE_ID` بـ Service ID الخاص بك
- `YOUR_TEMPLATE_ID` بـ Template ID الخاص بك

---

## ✅ مثال على الكود النهائي:

**في index.html:**
```javascript
emailjs.init("user_abcXYZ123");
```

**في script.js:**
```javascript
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

---

## 🎉 انتهى!

الآن عند ملء النموذج والضغط على "Envoyer le message"، سيتم إرسال البريد الإلكتروني مباشرة إلى: **Abdelhakkhayari00@gmail.com**

---

## 📝 ملاحظات:

- ✅ الحساب المجاني يسمح بـ **200 رسالة شهرياً**
- ✅ إذا فشل الإرسال، سيفتح برنامج البريد الإلكتروني تلقائياً (Fallback)
- ✅ يظهر للمستخدم رسالة "Envoi en cours..." أثناء الإرسال
- ✅ يظهر رسالة نجاح أو فشل بعد الإرسال

---

## 🔒 الأمان:

- Public Key آمن للاستخدام في الكود العام
- لا تشارك API Keys الخاصة (Private Keys)
- EmailJS يحمي من إساءة الاستخدام تلقائياً
