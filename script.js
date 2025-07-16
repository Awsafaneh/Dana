document.addEventListener('DOMContentLoaded', function() {
    // كود لتفعيل/تعطيل قائمة التنقل في الجوال (Hamburger Menu)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active'); // لإضافة تأثير الإغلاق (X) للهمبرغر
    });

    // كود لإدارة التبويبات (Tabs)
    const navLinks = document.querySelectorAll('.nav-link, .btn[data-tab-target]'); // يشمل الروابط والأزرار التي تفتح التبويبات
    const tabContents = document.querySelectorAll('.tab-content');

    // دالة لإظهار التبويبة المطلوبة وإخفاء الباقي
    function showTab(targetId) {
        tabContents.forEach(content => {
            if (content.id === targetId) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }

    // تعيين التبويبة النشطة عند تحميل الصفحة (تكون الرئيسية افتراضيًا)
    // تحقق من وجود hash في الرابط، وإلا فاجعل التبويبة الرئيسية هي النشطة
    let initialTab = window.location.hash.substring(1) || 'home';
    showTab(initialTab);
    // وتحديث فئة 'active' للرابط في القائمة
    navLinks.forEach(link => {
        if (link.dataset.tabTarget === initialTab) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // منع الانتقال الافتراضي للرابط

            // إزالة فئة 'active' من جميع روابط التنقل
            navLinks.forEach(item => item.classList.remove('active'));
            // إضافة فئة 'active' للرابط الذي تم النقر عليه
            this.classList.add('active');

            // إظهار التبويبة المستهدفة
            const targetTabId = this.dataset.tabTarget;
            showTab(targetTabId);

            // إغلاق قائمة الجوال إذا كانت مفتوحة
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
            
            // تحديث URL دون إعادة تحميل الصفحة
            window.history.pushState(null, '', `#${targetTabId}`);

            // إذا كان الرابط يؤدي إلى قسم داخل نفس التبويبة، قم بالتمرير إليه بسلاسة
            const targetSection = document.getElementById(targetTabId);
            if (targetSection) {
                 window.scrollTo({
                    top: targetSection.offsetTop - document.querySelector('.header').offsetHeight, // Offset by header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // إضافة منطق التمرير السلس للروابط الداخلية (بخلاف روابط التبويبات)
    // هذا لضمان أن الروابط الداخلية (مثل "احجز الآن" داخل الرئيسية) تعمل بشكل سلس
    document.querySelectorAll('a[href^="#"]:not([data-tab-target])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - document.querySelector('.header').offsetHeight, // Offset by header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // كود لتغيير خلفية الهيدر عند التمرير
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

});