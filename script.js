document.addEventListener('DOMContentLoaded', function () {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        // Joriy tugma uchun belgilarni topish
        const openIcon = button.querySelector('.open-icon');
        const closeIcon = button.querySelector('.close-icon');
        // Joriy tugma uchun kontentni topish
        const content = button.nextElementSibling; // Tugmadan keyingi element - kontent

        // Agar kontent topilmasa yoki kerakli klassga ega bo'lmasa, xatolik chiqarib, keyingisiga o'tish
        if (!content || !content.classList.contains('accordion-content')) {
            console.error('Akkordeon kontenti topilmadi yoki noto\'g\'ri klassga ega:', button);
            return;
        }
        
        // Belgilarning boshlang'ich holati ("X" yashiringan)
        if (closeIcon) closeIcon.style.display = 'none';
        if (openIcon) openIcon.style.display = 'inline'; // "+" ko'rinadigan bo'lishiga ishonch hosil qilish
        // Tugmaning boshlang'ich aria-expanded holati
        button.setAttribute('aria-expanded', 'false');


        button.addEventListener('click', function () {
            // Joriy tugma kengaytirilganmi (ochiqmi)?
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Avval barcha BOSHQA akkordeonlarni yopish
            accordionButtons.forEach(otherButton => {
                if (otherButton !== this) { // Agar bu joriy tugma bo'lmasa
                    const otherContent = otherButton.nextElementSibling;
                    const otherOpenIcon = otherButton.querySelector('.open-icon');
                    const otherCloseIcon = otherButton.querySelector('.close-icon');

                    // Agar boshqa elementlar mavjud bo'lsa, ularni qayta ishlash
                    if (otherContent && otherContent.classList.contains('accordion-content')) {
                        otherButton.setAttribute('aria-expanded', 'false');
                        otherContent.classList.remove('open');
                        // Animatsiya yopilishi uchun max-height ni tozalash
                        otherContent.style.maxHeight = null; 
                        
                        // Boshqa tugmalarning belgilarini "yopiq" holatga qaytarish
                        if (otherOpenIcon) otherOpenIcon.style.display = 'inline';
                        if (otherCloseIcon) otherCloseIcon.style.display = 'none';
                    }
                }
            });

            // Endi joriy akkordeonni almashtirish
            if (isExpanded) {
                // Joriy akkordeonni yopish
                this.setAttribute('aria-expanded', 'false');
                content.classList.remove('open');
                content.style.maxHeight = null; // Animatsiya yopilishi uchun
                if (openIcon) openIcon.style.display = 'inline'; // "+" ni ko'rsatish
                if (closeIcon) closeIcon.style.display = 'none';  // "X" ni yashirish
            } else {
                // Joriy akkordeonni ochish
                this.setAttribute('aria-expanded', 'true');
                content.classList.add('open');
                // Ochilish animatsiyasi uchun max-height ni o'rnatish.
                // scrollHeight kontentning haqiqiy balandligini beradi.
                content.style.maxHeight = content.scrollHeight + "px";
                if (openIcon) openIcon.style.display = 'none';   // "+" ni yashirish
                if (closeIcon) closeIcon.style.display = 'inline'; // "X" ni ko'rsatish
            }
        });
    });
});