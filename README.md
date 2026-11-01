# Portfolio

React va Tailwind CSS bilan yaratilgan shaxsiy portfolio.

## Ishga tushirish

```bash
npm start
```

Production build:

```bash
npm run build
```

## Tuzilishi

```text
public/
  favicon.ico
src/
  assets/
    images/
      projects/
    icons/
  components/
    Navbar.jsx
    Hero.jsx
    Skills.jsx
    Animations.jsx
    AvatarCard.jsx
    Projects.jsx
    Contact.jsx
    Footer.jsx
    animations/
      AnimationOne.jsx
      AnimationTwo.jsx
      AnimationThree.jsx
  App.jsx
  main.jsx
  index.css
  index.js
tailwind.config.js
```

`src/components/Skills.jsx` ko'nikmalarni ikki tomonga cheksiz siljitadi. Scroll animatsiyalari `App.jsx` ichidagi `IntersectionObserver` orqali boshqariladi; harakatni kamaytirish sozlamasi yoqilgan bo'lsa, animatsiyalar o'chadi.

`src/components/Animations.jsx` CSS shakllarning uchishi, tushishi va aylanib dumalashini namoyish etadi. Navbar'da ushbu bo'limga o'tuvchi `#animations` havolasi bor.

Loyiha rasmlarini `public/assets/images/projects/project-1.jpg` kabi joylang, so'ng `src/components/Projects.jsx` ichidagi `projects` ro'yxatida sarlavha, tavsif va demo/GitHub URL qiymatlarini kiriting. URL bo'sh bo'lsa, karta havola tugmasi o'rniga eslatma ko'rsatadi.

`src/components/Contact.jsx` dagi aloqa formasi FormSubmit AJAX orqali xabarlarni `CONTACT_EMAIL` manziliga yuboradi; email ilovasi kerak emas. Birinchi yuborishdan keyin FormSubmit kelgan tasdiqlash xatini qabul qiluvchi pochta qutisidan tasdiqlang.

Styled Components loader animatsiyalari `src/components/animations/AnimationOne.jsx`, `AnimationTwo.jsx` va `AnimationThree.jsx` fayllarida. Ular `Animations.jsx` bo'limida ishlatiladi; uchinchi animatsiya yozuvini `<AnimationThree text="Developer" />` ko'rinishida almashtirish mumkin.

Styled Components paketi `styled-components` hisoblanadi. Uchinchi animatsiyaning matnini `AnimationThree` komponentidagi `text` prop orqali, tezligini komponent ichidagi `3.2s` qiymati orqali o'zgartiring.

Rasm va ikon fayllarini `src/assets/images/` hamda `src/assets/icons/` papkalariga qo'shing. CRA uchun `src/index.js` kirish ko'prigi bo'lib, `src/main.jsx`ni yuklaydi.
