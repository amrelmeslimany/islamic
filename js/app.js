// ? اشياء مشتركه فى جميع الصفحات =============================
window.onload = () => {
    let mode_name = localStorage.getItem("darkMode");
    if (mode_name != null) {
        if (mode_name == "true") {
            dark_btn.click();
        } else {
            light_btn.click();
        }
    } else {
        localStorage.setItem("darkMode", "false");
    }
};
/* عمل الوضع الليلي */
const dark_btn = document.querySelector(".bottom-nav .dark-point"),
    light_btn = document.querySelector(".bottom-nav .white-point");
dark_btn.addEventListener("click", (e) => {
    e.preventDefault();
    light_btn.style.pointerEvents = "auto";
    dark_btn.style.pointerEvents = "none";
    document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="css/dark-style.css">`);
    localStorage.setItem("darkMode", "true");
});
light_btn.addEventListener("click", (e) => {
    e.preventDefault();
    dark_btn.style.pointerEvents = "auto";
    light_btn.style.pointerEvents = "none";
    if (document.querySelectorAll("[href='css/dark-style.css']")) {
        document.querySelectorAll("[href='css/dark-style.css']").forEach((el) => {
            el.remove();
        });
    }
    localStorage.setItem("darkMode", "false");
});
// 1- خاصة بالصفحة الريسيه =====================================
/* عمل ارتفاع من اسفل الصفحه لاظهار الفوتر */
const bottom_nav = document.querySelector(".bottom-nav");
document.body.style.paddingBottom = bottom_nav.offsetHeight + "px";
/* تعديل الزر الخاص باللايك */
const btn_like = document.querySelector('.footer-fn.likes .btn-like');
btn_like.addEventListener("click", (e) => {
    e.preventDefault();
    btn_like.setAttribute("disabled", "true");
    btn_like.innerHTML = `<span class="like-self">جزاك الله خيراً</span><i class="fas fa-heart mr-1 add-animation-scale"></i>`;
});
/* تعديل القائمه المنسدله */
const list_btn = document.querySelector(".list-nav .fa-bars"),
    close_btn_list = document.querySelector(".dropdown-list-clalender .list-close "),
    gsap_anm = gsap.to(".dropdown-list-clalender", {
        duration: 1,
        height: "100%",
        paused: true,
        ease: "slow(0.7,0.7,false)"
    });
if (list_btn) {
    list_btn.addEventListener("click", (e) => {
        e.preventDefault();
        gsap_anm.play();
    });
}

close_btn_list.addEventListener("click", (e) => {
    e.preventDefault();
    gsap_anm.reverse();
});
// 2- صفحة الاذاعة =============================================
if (location.href.search("radio.html") > -1) {
    /* اضافة التاريخ والوقت */
    try {
        time_is_widget.init({
            Mecca_z439: {
                template: "TIME<br>DATE",
                date_format: "dayname, monthname dnum, year",
                time_format: "12hours:minutes:seconds"
            }
        });
    } catch (e) {
        document.querySelector(".hejry-time .calender-hejry").insertAdjacentHTML("beforeend", `
        <span>مشكله فى اظهار الوقت</span>
        `);
    }
    /* اظهار قائمة الاذاعات */
    const btn_playlist = document.querySelector(".top-nav .playlist svg"),
        playlist_close_btn = document.querySelector(".dropdown-playlist .playlist-close"),
        gsap_anm_2 = gsap.to(".dropdown-playlist", {
            duration: 1,
            height: "100%",
            paused: true,
            ease: "slow(0.7,0.7,false)"
        });
    if (btn_playlist && playlist_close_btn) {
        btn_playlist.addEventListener("click", (e) => {
            e.preventDefault();
            gsap_anm_2.play();
        });
        playlist_close_btn.addEventListener("click", (e) => {
            e.preventDefault();
            gsap_anm_2.reverse();
        });
    }
    /* اضافة تنشيط الى الاذاعة الذى تعمل */
    const all_sounds = document.querySelectorAll(".dropdown-playlist .list-sounds .sound-item");
    if (all_sounds) {
        all_sounds.forEach(sound => {
            sound.querySelector(".title").addEventListener("click", () => {
                all_sounds.forEach(s => s.classList.remove("active"));
                sound.classList.add("active");
            });
        });
    }
    /* اضافه مسافه اسفل الكونترولز الازرار */
    const btn_controls_bx = document.querySelector(".controlls-radio");
    btn_controls_bx.style.bottom = bottom_nav.offsetHeight + "px";
}