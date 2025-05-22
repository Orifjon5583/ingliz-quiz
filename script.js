document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const button = item.querySelector('.accordion-button');
        const openIcon = item.querySelector('.open-icon');
        const closeIcon = item.querySelector('.close-icon');
        // Kontentni topishda ehtiyot bo'lish kerak:
        // Agar .accordion-content har doim .accordion-button dan keyin kelsa:
        const content = button.nextElementSibling;
        // Yoki .accordion-item ichidan qidirsak:
        // const content = item.querySelector('.accordion-content');


        if (!button || !openIcon || !closeIcon || !content || !content.classList.contains('accordion-content')) {
            console.error('Akkordeon uchun kerakli elementlar topilmadi yoki kontent xato:', item);
            return;
        }

        // Boshlang'ich holat: yopiq
        button.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
        if (closeIcon) closeIcon.style.display = 'none';
        if (openIcon) openIcon.style.display = 'inline';

        openIcon.addEventListener('click', function (event) {
            event.stopPropagation();

            const isCurrentlyExpanded = button.getAttribute('aria-expanded') === 'true';
            if (isCurrentlyExpanded) return; // Agar allaqachon ochiq bo'lsa (bu holat bo'lmasligi kerak, lekin himoya uchun)

            // Boshqa barcha ochiq akkordeonlarni yopish
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherButton = otherItem.querySelector('.accordion-button');
                    // const otherContent = otherItem.querySelector('.accordion-content');
                    const otherContent = otherButton.nextElementSibling; // Yuqoridagi kabi
                    const otherOpenIcon = otherItem.querySelector('.open-icon');
                    const otherCloseIcon = otherItem.querySelector('.close-icon');

                    if (otherButton && otherContent && otherOpenIcon && otherCloseIcon && otherButton.getAttribute('aria-expanded') === 'true') {
                        otherButton.setAttribute('aria-expanded', 'false');
                        if(otherContent.classList.contains('accordion-content')) otherContent.classList.remove('open'); // 'open' klassini olib tashlash
                        otherContent.style.maxHeight = null;
                        otherOpenIcon.style.display = 'inline';
                        otherCloseIcon.style.display = 'none';
                    }
                }
            });

            // Joriy akkordeonni ochish
            button.setAttribute('aria-expanded', 'true');
            content.classList.add('open'); // 'open' klassini qo'shish
            content.style.maxHeight = content.scrollHeight + "px";
            openIcon.style.display = 'none';
            closeIcon.style.display = 'inline';
        });

        closeIcon.addEventListener('click', function (event) {
            event.stopPropagation();

            const isCurrentlyExpanded = button.getAttribute('aria-expanded') === 'true';
            if (!isCurrentlyExpanded) return; // Agar allaqachon yopiq bo'lsa

            // Joriy akkordeonni yopish
            button.setAttribute('aria-expanded', 'false');
            content.classList.remove('open'); // 'open' klassini olib tashlash
            content.style.maxHeight = null;
            openIcon.style.display = 'inline';
            closeIcon.style.display = 'none';
        });
    });
});





