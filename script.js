/*==================================================
SAMIRA TRAVEL
script.js
==================================================*/


/*==================================================
PRELOADER
==================================================*/

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    if(preloader){

        preloader.style.opacity = "0";

        setTimeout(() => {

            preloader.style.display = "none";

        },500);

    }

});


/*==================================================
STICKY NAVBAR
==================================================*/

const header = document.getElementById("header");

function stickyNavbar(){

    if(!header) return;

    if(window.scrollY > 80){

        header.classList.add("sticky");

    }else{

        header.classList.remove("sticky");

    }

}

window.addEventListener("scroll", stickyNavbar);

stickyNavbar();


/*==================================================
MOBILE MENU
==================================================*/

const menuToggle = document.querySelector(".menu-toggle");

const navMenu = document.querySelector(".nav-menu");

if(menuToggle && navMenu){

    menuToggle.addEventListener("click",()=>{

        navMenu.classList.toggle("active");

        menuToggle.classList.toggle("active");

        // Ganti icon hamburger ↔ X
        const icon = menuToggle.querySelector("i");

        if(icon){

            if(navMenu.classList.contains("active")){

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-times");

            }else{

                icon.classList.remove("fa-times");

                icon.classList.add("fa-bars");

            }

        }

    });

}

/*==================================================
HERO SLIDER
==================================================*/

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
const heroPrev = document.querySelector(".hero-prev");
const heroNext = document.querySelector(".hero-next");

let heroIndex = 0;
let heroInterval = null;

/*==================================================
COUNTER ANIMATION
==================================================*/

const counters = document.querySelectorAll(".counter-number");

let counterPlayed = false;

/*==================================================
TESTIMONIAL SLIDER
==================================================*/

const testimonialItems = document.querySelectorAll(".testimonial-item");
const testimonialDots = document.querySelectorAll(".testimonial-dots span");
const testimonialPrev = document.querySelector(".testimonial-prev");
const testimonialNext = document.querySelector(".testimonial-next");

let testimonialIndex = 0;
let testimonialInterval = null;

/*==================================================
FAQ ACCORDION
==================================================*/

const faqItems = document.querySelectorAll(".faq-item");

/*---------------------------------------
FAQ Accordion
---------------------------------------*/

faqItems.forEach((item)=>{

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if(!question || !answer) return;

    question.addEventListener("click",()=>{

        const isActive = item.classList.contains("active");

        // Tutup semua FAQ
        faqItems.forEach((faq)=>{

            faq.classList.remove("active");

            const faqAnswer = faq.querySelector(".faq-answer");

            if(faqAnswer){

                faqAnswer.style.maxHeight = null;

            }

        });

        // Jika sebelumnya belum aktif, buka FAQ yang dipilih
        if(!isActive){

            item.classList.add("active");

            answer.style.maxHeight = answer.scrollHeight + "px";

        }

    });

});

/*==================================================
GALLERY LIGHTBOX
==================================================*/

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox img");
const lightboxClose = document.querySelector(".lightbox-close");

let currentGalleryIndex = 0;

/*==================================================
SCROLL ANIMATION
==================================================*/

const animatedElements = document.querySelectorAll(

".fade-up, .fade-left, .fade-right"

);

/*==================================================
BACK TO TOP
==================================================*/

const backToTop = document.getElementById("backToTop");

/*==================================================
SMOOTH SCROLL
==================================================*/

const smoothLinks = document.querySelectorAll(

'a[href^="#"]'

);

/*---------------------------------------
Smooth Scroll
---------------------------------------*/

smoothLinks.forEach(link=>{

    link.addEventListener("click",(e)=>{

        const targetID = link.getAttribute("href");

        if(targetID === "#") return;

        const targetSection = document.querySelector(targetID);

        if(!targetSection) return;

        e.preventDefault();

        const headerHeight = header ? header.offsetHeight : 90;

        const targetPosition =
            targetSection.offsetTop - headerHeight;

        window.scrollTo({

            top:targetPosition,

            behavior:"smooth"

        });

    });

});

/*---------------------------------------
Tampilkan / Sembunyikan Tombol
---------------------------------------*/

function toggleBackToTop(){

    if(!backToTop) return;

    if(window.scrollY > 300){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");

    }

}

window.addEventListener("scroll", toggleBackToTop);

toggleBackToTop();


/*---------------------------------------
Klik Tombol
---------------------------------------*/

if(backToTop){

    backToTop.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/*---------------------------------------
Intersection Observer
---------------------------------------*/

const animationObserver = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translate(0,0)";

animationObserver.unobserve(entry.target);

}

});

},

{

threshold:.15,

rootMargin:"0px 0px -80px 0px"

}

);

/*---------------------------------------
Inisialisasi
---------------------------------------*/

animatedElements.forEach(element=>{

animationObserver.observe(element);

});

/*---------------------------------------
Buka Lightbox
---------------------------------------*/

function openLightbox(index){

    if(!lightbox || !lightboxImage || galleryItems.length === 0) return;

    currentGalleryIndex = index;

    const img = galleryItems[index].querySelector("img");

    if(!img) return;

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}

/*---------------------------------------
Tutup Lightbox
---------------------------------------*/

function closeLightbox(){

    if(!lightbox) return;

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}

/*---------------------------------------
Gambar Berikutnya
---------------------------------------*/

function nextGallery(){

    currentGalleryIndex++;

    if(currentGalleryIndex >= galleryItems.length){

        currentGalleryIndex = 0;

    }

    openLightbox(currentGalleryIndex);

}

/*---------------------------------------
Gambar Sebelumnya
---------------------------------------*/

function prevGallery(){

    currentGalleryIndex--;

    if(currentGalleryIndex < 0){

        currentGalleryIndex = galleryItems.length - 1;

    }

    openLightbox(currentGalleryIndex);

}

/*---------------------------------------
Klik Thumbnail
---------------------------------------*/

galleryItems.forEach((item,index)=>{

    item.addEventListener("click",()=>{

        openLightbox(index);

    });

});

/*---------------------------------------
Tombol Close
---------------------------------------*/

if(lightboxClose){

    lightboxClose.addEventListener("click",closeLightbox);

}

/*---------------------------------------
Klik Area Gelap
---------------------------------------*/

if(lightbox){

    lightbox.addEventListener("click",(e)=>{

        if(e.target === lightbox){

            closeLightbox();

        }

    });

}

/*---------------------------------------
Keyboard
---------------------------------------*/

document.addEventListener("keydown",(e)=>{

    if(!lightbox || !lightbox.classList.contains("active")) return;

    switch(e.key){

        case "Escape":

            closeLightbox();

            break;

        case "ArrowRight":

            nextGallery();

            break;

        case "ArrowLeft":

            prevGallery();

            break;

    }

});


/*---------------------------------------
Buka FAQ Pertama Saat Halaman Dibuka
(Hapus bagian ini jika ingin semua FAQ
tertutup saat pertama kali dibuka)
---------------------------------------*/

if(faqItems.length){

    const firstAnswer = faqItems[0].querySelector(".faq-answer");

    faqItems[0].classList.add("active");

    if(firstAnswer){

        firstAnswer.style.maxHeight = firstAnswer.scrollHeight + "px";

    }

}


/*---------------------------------------
Menampilkan Testimoni
---------------------------------------*/

function showTestimonial(index){

    if(testimonialItems.length === 0) return;

    if(index >= testimonialItems.length){

        testimonialIndex = 0;

    }else if(index < 0){

        testimonialIndex = testimonialItems.length - 1;

    }else{

        testimonialIndex = index;

    }

    testimonialItems.forEach(item=>{

        item.classList.remove("active");

    });

    testimonialDots.forEach(dot=>{

        dot.classList.remove("active");

    });

    testimonialItems[testimonialIndex].classList.add("active");

    if(testimonialDots.length){

        testimonialDots[testimonialIndex].classList.add("active");

    }

}


/*---------------------------------------
Next
---------------------------------------*/

function nextTestimonial(){

    showTestimonial(testimonialIndex + 1);

}


/*---------------------------------------
Previous
---------------------------------------*/

function prevTestimonial(){

    showTestimonial(testimonialIndex - 1);

}


/*---------------------------------------
Auto Slide
---------------------------------------*/

function startTestimonialSlider(){

    stopTestimonialSlider();

    testimonialInterval = setInterval(()=>{

        nextTestimonial();

    },5000);

}


/*---------------------------------------
Stop
---------------------------------------*/

function stopTestimonialSlider(){

    if(testimonialInterval){

        clearInterval(testimonialInterval);

    }

}


/*---------------------------------------
Button Next
---------------------------------------*/

if(testimonialNext){

    testimonialNext.addEventListener("click",()=>{

        nextTestimonial();

        startTestimonialSlider();

    });

}


/*---------------------------------------
Button Prev
---------------------------------------*/

if(testimonialPrev){

    testimonialPrev.addEventListener("click",()=>{

        prevTestimonial();

        startTestimonialSlider();

    });

}


/*---------------------------------------
Dot Indicator
---------------------------------------*/

testimonialDots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        showTestimonial(index);

        startTestimonialSlider();

    });

});


/*---------------------------------------
Pause Saat Hover
---------------------------------------*/

const testimonialSlider = document.querySelector(".testimonial-slider");

if(testimonialSlider){

    testimonialSlider.addEventListener("mouseenter",()=>{

        stopTestimonialSlider();

    });

    testimonialSlider.addEventListener("mouseleave",()=>{

        startTestimonialSlider();

    });

}


/*---------------------------------------
Inisialisasi
---------------------------------------*/

if(testimonialItems.length){

    showTestimonial(0);

    startTestimonialSlider();

}

/*---------------------------------------
Animasi Counter
---------------------------------------*/

function startCounterAnimation(){

    if(counterPlayed) return;

    counterPlayed = true;

    counters.forEach(counter=>{

        const target = parseInt(counter.getAttribute("data-target")) || 0;

        const duration = 2000;

        const stepTime = 20;

        const increment = Math.max(1, Math.ceil(target / (duration / stepTime)));

        let current = 0;

        const timer = setInterval(()=>{

            current += increment;

            if(current >= target){

                current = target;

                clearInterval(timer);

            }

            counter.textContent = current.toLocaleString("id-ID");

        },stepTime);

    });

}


/*---------------------------------------
Intersection Observer
---------------------------------------*/

const counterSection = document.querySelector(".counter");

if(counterSection){

    const counterObserver = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                startCounterAnimation();

                counterObserver.unobserve(entry.target);

            }

        });

    },{

        threshold:0.4

    });

    counterObserver.observe(counterSection);

}

/*---------------------------------------
Menampilkan Slide
---------------------------------------*/

function showHeroSlide(index){

    if(heroSlides.length === 0) return;

    if(index >= heroSlides.length){

        heroIndex = 0;

    }else if(index < 0){

        heroIndex = heroSlides.length - 1;

    }else{

        heroIndex = index;

    }

    heroSlides.forEach((slide)=>{

        slide.classList.remove("active");

    });

    heroDots.forEach((dot)=>{

        dot.classList.remove("active");

    });

    heroSlides[heroIndex].classList.add("active");

    if(heroDots.length){

        heroDots[heroIndex].classList.add("active");

    }

}

/*---------------------------------------
Slide Berikutnya
---------------------------------------*/

function nextHeroSlide(){

    showHeroSlide(heroIndex + 1);

}

/*---------------------------------------
Slide Sebelumnya
---------------------------------------*/

function prevHeroSlide(){

    showHeroSlide(heroIndex - 1);

}

/*---------------------------------------
Auto Slider
---------------------------------------*/

function startHeroSlider(){

    stopHeroSlider();

    heroInterval = setInterval(()=>{

        nextHeroSlide();

    },5000);

}

/*---------------------------------------
Stop Slider
---------------------------------------*/

function stopHeroSlider(){

    if(heroInterval){

        clearInterval(heroInterval);

    }

}

/*---------------------------------------
Button Next
---------------------------------------*/

if(heroNext){

    heroNext.addEventListener("click",()=>{

        nextHeroSlide();

        startHeroSlider();

    });

}

/*---------------------------------------
Button Prev
---------------------------------------*/

if(heroPrev){

    heroPrev.addEventListener("click",()=>{

        prevHeroSlide();

        startHeroSlider();

    });

}

/*---------------------------------------
Dot Indicator
---------------------------------------*/

heroDots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        showHeroSlide(index);

        startHeroSlider();

    });

});

/*---------------------------------------
Pause Saat Mouse Hover
---------------------------------------*/

const heroSection = document.querySelector(".hero");

if(heroSection){

    heroSection.addEventListener("mouseenter",()=>{

        stopHeroSlider();

    });

    heroSection.addEventListener("mouseleave",()=>{

        startHeroSlider();

    });

}

/*---------------------------------------
Inisialisasi
---------------------------------------*/

if(heroSlides.length){

    showHeroSlide(0);

    startHeroSlider();

}

/*==================================================
TUTUP MENU SAAT LINK DIKLIK
==================================================*/

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        if(navMenu){

            navMenu.classList.remove("active");

        }

        if(menuToggle){

            menuToggle.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            if(icon){

                icon.classList.remove("fa-times");

                icon.classList.add("fa-bars");

            }

        }

    });

});


/*==================================================
TUTUP MENU SAAT KLIK DI LUAR
==================================================*/

document.addEventListener("click",(e)=>{

    if(!menuToggle || !navMenu) return;

    const insideMenu = navMenu.contains(e.target);

    const insideButton = menuToggle.contains(e.target);

    if(!insideMenu && !insideButton){

        navMenu.classList.remove("active");

        menuToggle.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        if(icon){

            icon.classList.remove("fa-times");

            icon.classList.add("fa-bars");

        }

    }

});

/*==================================================
FORM KONTAK
==================================================*/

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const nama = document.getElementById("namaLengkap").value.trim();
        const whatsapp = document.getElementById("nomorWhatsapp").value.trim();
        const paket = document.getElementById("pilihPaket").value.trim();
        const pesan = document.getElementById("pesanAnda").value.trim();

        if (!nama || !whatsapp) {

            alert("Mohon lengkapi Nama dan Nomor WhatsApp terlebih dahulu.");

            return;

        }

        let message = `Assalamu'alaikum, saya ingin bertanya tentang paket Umroh Samira Travel.%0A%0A`;
        message += `Nama: ${encodeURIComponent(nama)}%0A`;
        message += `No. WhatsApp: ${encodeURIComponent(whatsapp)}%0A`;

        if (paket) {
            message += `Paket: ${encodeURIComponent(paket)}%0A`;
        }

        if (pesan) {
            message += `Pesan: ${encodeURIComponent(pesan)}`;
        }

        window.open(`https://wa.me/6281210094869?text=${message}`, "_blank");

        contactForm.reset();

    });

}

/*==================================================
INISIALISASI SEMUA FITUR
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    // Navbar
    stickyNavbar();

    // Hero Slider
    if (heroSlides.length) {
        showHeroSlide(0);
        startHeroSlider();
    }

    // Counter
    if (counterSection) {
        // IntersectionObserver akan menjalankan sendiri
    }

    // Testimonial
    if (testimonialItems.length) {
        showTestimonial(0);
        startTestimonialSlider();
    }

    // FAQ sudah diinisialisasi di atas (FAQ pertama otomatis terbuka),
    // jadi tidak perlu direset ulang di sini.

    // Back To Top
    toggleBackToTop();

});