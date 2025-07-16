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

    // تعيين التبويبة النشطة عند تحميل الصفحة
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
            
            // تحديث URL بدون إعادة تحميل الصفحة
            window.history.pushState(null, '', `#${targetTabId}`);

            // التمرير إلى أعلى الصفحة بعد تغيير التبويبة
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
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
