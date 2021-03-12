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
    document.querySelector(".times-salah iframe").setAttribute("src", "https://timesprayer.today/widget_frame.php?frame=2&sound=true&id=1843&theme=w3-black");
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
    document.querySelector(".times-salah iframe").setAttribute("src", "https://timesprayer.today/widget_frame.php?frame=2&sound=true&id=1843&theme=w3-light-gray");
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
const list_btn = document.querySelector(".list-nav .fa-bars") || document.querySelector(".list-nav"),
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
                /* <br>DATE */
                template: "TIME",
                /* date_format: "dayname, monthname dnum, year", */
                time_format: "12hours:minutes:seconds"
            }
        });
    } catch (e) {
        document.querySelector(".hejry-time .calender-hejry").insertAdjacentHTML("beforeend", `
        <span>مشكله فى اظهار الوقت</span>
        `);
    }
    /* اظهار قائمة الاذاعات */
    const btn_playlist = document.querySelector(".top-nav .playlist i"),
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
    /* تشغيل الاذاعو واضافه الصوت والخ */
    const play_btn = document.querySelector(".app-radio .controlls-radio .players .play-btn"),
        create_auido = document.createElement("audio");
    create_auido.src = "https://radio.al7eah.net/8028/;";
    if (play_btn) {
        play_btn.addEventListener("click", function(e) {
            e.preventDefault();
            if (play_btn.classList.contains("active")) {
                this.classList.remove("active");
                create_auido.pause();
                this.innerHTML = `<i class="fas add-animation-scale  fa-play"></i>`;
            } else {
                this.classList.add("active");
                create_auido.play();
                this.innerHTML = `<i class="fas add-animation-scale  fa-pause"></i>`;
            }
        });
    }
    /* عمل تحديث للصفحة فى زر الريفرش */
    const refresh_btn = document.querySelector(".app-radio .controlls-radio .settings-additions .reload-btn");
    if (refresh_btn) {
        refresh_btn.addEventListener("click", () => {
            create_auido.currentTime = 0;
        });
    }

    /* اظهار الملاحظات */
    const note_btn = document.querySelector(".bottom-nav .note-listen"),
        note_box = document.querySelector(".write-note");
    if (note_btn) {
        note_btn.addEventListener("click", function(e) {
            e.preventDefault();
            if (this.classList.contains("active")) {
                this.classList.remove("active");
                note_box.style.display = "none";
            } else {
                this.classList.add("active");
                note_box.style.display = "block";
            }

        });
    }

    /* اظهار التاريخ الهجرى */
    var fixd;

    function isGregLeapYear(year) {
        return year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
    }

    function gregToFixed(year, month, day) {
        var a = Math.floor((year - 1) / 4);
        var b = Math.floor((year - 1) / 100);
        var c = Math.floor((year - 1) / 400);
        var d = Math.floor((367 * month - 362) / 12);
        if (month <= 2)
            e = 0;
        else if (month > 2 && isGregLeapYear(year))
            e = -1;
        else
            e = -2;
        return 1 - 1 + 365 * (year - 1) + a - b + c + d + e + day;
    }

    function Hijri(year, month, day) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.toFixed = hijriToFixed;
        this.toString = hijriToString;
    }

    function hijriToFixed() {
        return this.day + Math.ceil(29.5 * (this.month - 1)) + (this.year - 1) * 354 + Math.floor((3 + 11 * this.year) / 30) + 227015 - 1;
    }

    function hijriToString() {
        var months = new Array("محرم", "صفر", "ربيع أول", "ربيع ثانى", "جمادى أول", "جمادى ثانى", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة");
        return this.day + " " + months[this.month - 1] + " " + this.year;
    }

    function fixedToHijri(f) {
        var i = new Hijri(1100, 1, 1);
        i.year = Math.floor((30 * (f - 227015) + 10646) / 10631);
        var i2 = new Hijri(i.year, 1, 1);
        var m = Math.ceil((f - 29 - i2.toFixed()) / 29.5) + 1;
        i.month = Math.min(m, 12);
        i2.year = i.year;
        i2.month = i.month;
        i2.day = 1;
        i.day = f - i2.toFixed() + 1;
        return i;
    }
    var tod = new Date();
    var y = tod.getFullYear();
    var m = tod.getMonth();
    var d = tod.getDate();
    var dow = tod.getDay();
    m++;
    fixd = gregToFixed(y, m, d);
    var h = new Hijri(1421, 11, 28);
    h = fixedToHijri(fixd);
    document.querySelector(".calender-hejry").insertAdjacentHTML("beforeend", `<span class="hjr-date">${h.toString()}</span>`);
}