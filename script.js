/* ==========================================================================
   MCA – Menoufia Courses Academy
   ملف البرمجة والتفاعل الرئيسي (Vanilla JavaScript)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // رقم واتساب الأكاديمية بصيغة دولية (مصر +20)
    const ACADEMY_WHATSAPP = "201500104599";

    /* ==================== 1. قائمة الموبايل (Mobile Hamburger Menu) ==================== */
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        const icon = hamburger.querySelector("i");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
    });

    // إغلاق القائمة تلقائياً عند الضغط على أي رابط
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            const icon = hamburger.querySelector("i");
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-times");
        });
    });

    /* ==================== 2. فلترة الكورسات (Course Filtering) ==================== */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const courseCards = document.querySelectorAll(".course-card");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // إزالة التفعيل من جميع الأزرار وتفعيل الزر المضغوط
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            courseCards.forEach((card) => {
                const categories = card.getAttribute("data-category");
                if (filterValue === "all" || categories.includes(filterValue)) {
                    card.classList.remove("hide");
                } else {
                    card.classList.add("hide");
                }
            });
        });
    });

    /* ==================== 3. زر "تفاصيل الكورس" ينقل للنموذج ويحدد الكورس تلقائياً ==================== */
    const detailButtons = document.querySelectorAll(".btn-details");
    const courseSelect = document.getElementById("course");
    const categorySelect = document.getElementById("category");
    const contactSection = document.getElementById("contact");

    detailButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const selectedCourse = btn.getAttribute("data-course");
            const selectedTarget = btn.getAttribute("data-target");

            // تحديد الكورس والفئة تلقائياً في نموذج التسجيل
            if (courseSelect) courseSelect.value = selectedCourse;
            if (categorySelect && selectedTarget) categorySelect.value = selectedTarget;

            // الانتقال السلس إلى قسم التسجيل
            contactSection.scrollIntoView({ behavior: "smooth" });
        });
    });

    /* ==================== 4. الأسئلة الشائعة (FAQ Accordion) ==================== */
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach((header) => {
        header.addEventListener("click", () => {
            const currentItem = header.parentElement;
            const isActive = currentItem.classList.contains("active");

            // إغلاق جميع العناصر الأخرى ليبقى عنصر واحد مفتوحاً
            document.querySelectorAll(".accordion-item").forEach((item) => {
                item.classList.remove("active");
            });

            if (!isActive) {
                currentItem.classList.add("active");
            }
        });
    });

    /* ==================== 5. التحقق من النموذج والإرسال عبر WhatsApp ==================== */
    const registrationForm = document.getElementById("registration-form");
    const formFeedback = document.getElementById("form-feedback");

    registrationForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // قراءة القيم المدخلة
        const fullName = document.getElementById("fullName").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const age = document.getElementById("age").value.trim();
        const category = document.getElementById("category").value;
        const course = document.getElementById("course").value;
        const message = document.getElementById("message").value.trim();

        // التحقق من صحة البيانات (Validation)
        if (fullName.length < 3) {
            showFeedback("يرجى إدخال الاسم بالكامل بشكل صحيح.", "error");
            return;
        }

        const egyptPhoneRegex = /^01[0125][0-9]{8}$/;
        if (!egyptPhoneRegex.test(phone)) {
            showFeedback("يرجى إدخال رقم هاتف مصري صحيح مكون من 11 رقماً.", "error");
            return;
        }

        if (!age || age < 5 || age > 80) {
            showFeedback("يرجى إدخال عمر صحيح (بين 5 و 80 سنة).", "error");
            return;
        }

        if (!category) {
            showFeedback("يرجى اختيار الفئة (أطفال / كبار).", "error");
            return;
        }

        if (!course) {
            showFeedback("يرجى اختيار الكورس المطلوب.", "error");
            return;
        }

        // تجهيز نص رسالة الواتساب
        const whatsappText =
            `السلام عليكم إدارة MCA Academy (أ/ أحمد فتحي)%0A` +
            `أرغب في التسجيل في برنامج تدريبي جديد:%0A` +
            `--------------------------------%0A` +
            `👤 *الاسم:* ${encodeURIComponent(fullName)}%0A` +
            `📱 *رقم الهاتف:* ${encodeURIComponent(phone)}%0A` +
            `🎂 *العمر:* ${encodeURIComponent(age)} سنة%0A` +
            `👥 *الفئة:* ${encodeURIComponent(category)}%0A` +
            `📚 *الكورس المطلوب:* ${encodeURIComponent(course)}%0A` +
            (message ? `📝 *رسالة إضافية:* ${encodeURIComponent(message)}%0A` : "") +
            `--------------------------------`;

        showFeedback("جاري تحويلك إلى تطبيق واتساب لإرسال بيانات التسجيل...", "success");

        // فتح رابط واتساب في نافذة جديدة
        const whatsappURL = `https://wa.me/${ACADEMY_WHATSAPP}?text=${whatsappText}`;
        window.open(whatsappURL, "_blank");
    });

    function showFeedback(text, type) {
        formFeedback.textContent = text;
        formFeedback.className = `form-feedback ${type}`;
    }

    /* ==================== 6. زر العودة للأعلى وتفعيل الرابط النشط ==================== */
    const backToTopBtn = document.getElementById("back-to-top");
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        // إظهار أو إخفاء زر العودة للأعلى
        if (window.scrollY > 400) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }

        // تحديث الرابط النشط في شريط التنقل أثناء التمرير
        let currentSection = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* ==================== 7. حركات الظهور عند التمرير (Scroll Animations) ==================== */
    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.15 }
    );

    fadeElements.forEach((el) => observer.observe(el));
});