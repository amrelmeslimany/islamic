// ? اشياء مشتركه فى جميع الصفحات =============================
const bottom_nav = document.querySelector(".bottom-nav");
window.onload = () => {
    let mode_name = localStorage.getItem("darkMode");
    if (mode_name != null) {
        if (mode_name == "true") {
            /* تغيير لون البار الاعلى */
            dark_btn.click();

        } else {
            light_btn.click();
        }
    } else {
        localStorage.setItem("darkMode", "false");
    }

    /* عمل ارتفاع من اسفل الصفحه لاظهار الفوتر */
    document.body.style.paddingBottom = bottom_nav.offsetHeight + "px";

};
/* الوان البار */
function barColor(color) {
    document.head.querySelector('[name="keywords"]').insertAdjacentHTML("afterend", `

<meta name="theme-color" content=${color}>

<meta name="msapplication-navbutton-color" content=${color}>

<meta name="apple-mobile-web-app-status-bar-style" content=${color}>
`);

}
/* عمل الوضع الليلي */
const dark_btn = document.querySelector(".bottom-nav .dark-point"),
    light_btn = document.querySelector(".bottom-nav .white-point");
dark_btn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll('meta[content="#115973"]').forEach(mt => {
        mt.remove();
    });
    barColor("#2a3b41");
    light_btn.style.pointerEvents = "auto";
    dark_btn.style.pointerEvents = "none";
    document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="css/dark-style.css">`);
    document.querySelector(".times-salah iframe").setAttribute("src", "https://timesprayer.today/widget_frame.php?frame=2&sound=true&id=1843&theme=w3-black");
    localStorage.setItem("darkMode", "true");
});
light_btn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll('meta[content="#2a3b41"]').forEach(mt => {
        mt.remove();
    });
    barColor("#115973");
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
    makeBackGround();
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
    /* Right Nav FN */
    rightNavFN();
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
    let fixd;

    function isGregLeapYear(year) {
        return year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
    }

    function gregToFixed(year, month, day) {
        let a = Math.floor((year - 1) / 4);
        let b = Math.floor((year - 1) / 100);
        let c = Math.floor((year - 1) / 400);
        let d = Math.floor((367 * month - 362) / 12);
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
        let months = new Array("محرم", "صفر", "ربيع أول", "ربيع ثانى", "جمادى أول", "جمادى ثانى", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة");
        return this.day + " " + months[this.month - 1] + " " + this.year;
    }

    function fixedToHijri(f) {
        let i = new Hijri(1100, 1, 1);
        i.year = Math.floor((30 * (f - 227015) + 10646) / 10631);
        let i2 = new Hijri(i.year, 1, 1);
        let m = Math.ceil((f - 29 - i2.toFixed()) / 29.5) + 1;
        i.month = Math.min(m, 12);
        i2.year = i.year;
        i2.month = i.month;
        i2.day = 1;
        i.day = f - i2.toFixed() + 1;
        return i;
    }
    let tod = new Date();
    let y = tod.getFullYear();
    let m = tod.getMonth();
    let d = tod.getDate();
    let dow = tod.getDay();
    m++;
    fixd = gregToFixed(y, m, d);
    let h = new Hijri(1421, 11, 28);
    h = fixedToHijri(fixd);
    document.querySelector(".calender-hejry").insertAdjacentHTML("beforeend", `<span class="hjr-date">${h.toString()}</span>`);
    /* عمل لون لخلفية الناف الاعلى على حسب ال سكرول */
    window.onscroll = function() {
        makeBackGround();
    };

}

// 3- صفحة المجلات ============================================
if (location.href.search("books.html") > -1) {
    /* Color The Navbar */
    makeBackGround();
    window.onscroll = () => {
        makeBackGround();
    };
    /* Right Nav FN */
    rightNavFN();
    /* Displaying Discription For Book */
    const books = document.querySelectorAll(".books-libs .book-self .btn-di.info"),
        book_dsc_info = document.querySelectorAll(".books-libs .book-discrption");

    books.forEach(book => {
        book.addEventListener("click", function(e) {
            e.preventDefault();
            let link_mark = book.parentElement.parentElement.querySelector(".link-book");
            let selector = document.querySelector(`.books-libs .book-discrption.${this.dataset.bkinfo}`),
                gs_anm_3_st = gsap.to(`.books-libs .book-discrption.${this.dataset.bkinfo}`, {
                    duration: 1,
                    scaleY: 1,
                    height: "auto",
                    paused: true,
                    ease: "slow(0.7,0.7,false)",
                    display: "block"
                });
            gs_anm_3_end = gsap.to(`.books-libs .book-discrption.${this.dataset.bkinfo}`, {
                duration: 1,
                scaleY: 0,
                height: 0,
                paused: true,
                ease: "slow(0.7,0.7,false)",
                display: "none"
            });
            books.forEach(ele_bk => {
                ele_bk.parentElement.parentElement.querySelectorAll(".link-book").forEach(ln_bk => {
                    ln_bk.classList.remove("active");
                });
            });

            link_mark.classList.toggle("active");

            book_dsc_info.forEach(ds => {
                ds.classList.remove("active");
                ds.removeAttribute("style");
            });
            if (selector.classList.contains("active")) {
                selector.classList.remove("active");
                gs_anm_3_end.play();
            } else {
                selector.classList.add("active");
                window.scrollTo(0, 120);
                gs_anm_3_st.play();
            }
        });
    });
    document.querySelectorAll(".book-discrption .close-btn-inf").forEach(close => {

        let gs_anm_3_end = gsap.to(`.books-libs .book-discrption`, {
            duration: 1,
            scaleY: 0,
            height: 0,
            paused: true,
            ease: "slow(0.7,0.7,false)",
            display: "none",

        });

        close.addEventListener("click", () => {
            gs_anm_3_end.play();
            close.parentElement.classList.remove("active");
            close.parentElement.removeAttribute("style");
        });
    });
    /* Lazing Loaiding Img */
    echo.init({
        offset: -80,
        throttle: 500
    });
    /* Animtion Img When Loading OF Book */
    document.querySelectorAll(".book-self").forEach(bk => {
        gsap.to(`.${bk.classList.value}`, {
            duration: 1,
            scale: 1,
            stagger: 0.3,
            delay: 1
        });
    });
    /* Open Fahrs Function And Most Reading */
    fahrsAndBest();
}
// 4- صفحة المقالات ============================================
if (location.href.search("articles.html") > -1) {
    /* Color The Navbar */
    makeBackGround();
    window.onscroll = () => {
        makeBackGround();
    };
    /* Right Nav FN */
    rightNavFN();
    /* Make Rating FN */
    const all_ratings = document.querySelectorAll(".articles-section .star-rating");
    let rating_array = [];
    all_ratings.forEach(function(rating, pr_id) {
        rating.querySelectorAll("span").forEach(function(star) {
            star.addEventListener("click", function() {
                if (confirm(`Sure ? (Stars = ${this.dataset.rating})`)) {
                    [...rating.children].forEach(r_s => {
                        if (r_s.classList.contains("active")) {
                            r_s.classList.remove("active");
                            r_s.removeAttribute("class");
                        }
                    });
                    rating_array.push({
                        id: pr_id,
                        stN: this.dataset.rating
                    });
                    this.classList.add("active");
                    rating.style.pointerEvents = "none";
                    // Get the existing data
                    let get_rating_local = localStorage.getItem("rating");
                    if (get_rating_local == null) {
                        localStorage.setItem("rating", JSON.stringify(rating_array));
                    } else {
                        let strg_data = JSON.parse(localStorage.getItem("rating"));
                        strg_data.push({
                            id: pr_id,
                            stN: this.dataset.rating
                        });
                        localStorage.setItem("rating", JSON.stringify(strg_data));
                    }
                }
                // Save Rating In Browser
            });
        });
    });
    /* localStorage.setItem("rating", JSON.stringify(rating_array)); */
    /*  if rating localstorage exists */
    if (localStorage.getItem("rating") != null) {
        let strg_data = JSON.parse(localStorage.getItem("rating"));
        all_ratings.forEach(function(rt_element, pr_id) {
            strg_data.forEach(sr_d => {
                if (sr_d.id == pr_id) {
                    rt_element.querySelectorAll("span").forEach(star_s => {
                        if (star_s.dataset.rating == sr_d.stN) {
                            star_s.classList.add("active");
                            rt_element.style.pointerEvents = "none";
                        }
                    });
                }
            });
        });
    }
    /* Open Most Reading Function And Tree */
    fahrsAndBest();
    /* Slice The Header of Articles */
    const all_headers = document.querySelectorAll(".articles-section .article-title a");
    all_headers.forEach(head_element => {
        // ------
        let header_array = head_element.innerText.split(" ");
        if (header_array.length > 3) {
            head_element.innerText = header_array.slice(0, 2).join(" ") + "...";

        } else if (head_element.innerText.length > 14) {
            head_element.innerText = head_element.innerText.slice(0, 14) + "...";
        }
    });
    /* Make Searching In Articles */
    const ancient_articles = document.querySelectorAll(".articles-section .article-bx");
    let search_bx = document.querySelector(".header .search-bx"),
        sr_input = search_bx.querySelector("input");
    search_bx.querySelector(".search").addEventListener("click", function(e) {
        e.preventDefault();
        // ----

        ancient_articles.forEach(anc_artcle => {
            let anc_titles = anc_artcle.querySelector(".article-title a").innerText;
            if (anc_titles.indexOf(sr_input.value) > -1) {
                anc_artcle.parentElement.style.display = "";
            } else {
                anc_artcle.parentElement.style.display = "none";
            }
        });
    });
}



// Basics
/* Coloring The top Navbar */
function makeBackGround() {
    let top_nav = document.querySelector(".top-nav");
    if (window.scrollY >= 80) {
        if (localStorage.getItem("darkMode") == "true") {
            /* الوان الوضع الليلي */
            top_nav.style.backgroundColor = "#2a3b41";
        } else {
            /* الوان الوضع العادى */
            top_nav.style.backgroundColor = "#115973";
        }
    } else {
        top_nav.style.backgroundColor = "transparent";
    }
}

/* Right Nav Function */
function rightNavFN() {
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
}

/* Function Two List In Bottom */
function fahrsAndBest() {
    const fahrs_btn = document.querySelector(".bottom-nav .link-nav.fahrs-links"),
        most_reading_btn = document.querySelector(".bottom-nav .link-nav.most-reading"),
        fahrs_list = document.querySelector(".alfahrs-list"),
        most_reading_list = document.querySelector(".most-reading-list");
    let gs_anm_4 = gsap.to(`.alfahrs-list`, {
            duration: 1,
            height: 200,
            paddingTop: "0.4rem",
            paddingBottom: "0.4rem",
            paused: true,
            ease: "slow(0.7,0.7,false)"
        }),
        gs_anm_5 = gsap.to(`.most-reading-list`, {
            duration: 1,
            height: 200,
            paddingTop: "0.4rem",
            paddingBottom: "0.4rem",
            paused: true,
            ease: "slow(0.7,0.7,false)"
        });
    fahrs_btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (most_reading_list.classList.contains("active")) {
            gs_anm_5.reverse();
            most_reading_list.classList.remove("active");
        }
        if (fahrs_list.classList.contains("active")) {
            gs_anm_4.reverse();
            fahrs_list.classList.remove("active");

        } else {
            gs_anm_4.play();
            fahrs_list.classList.add("active");
        }
    });
    most_reading_btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (fahrs_list.classList.contains("active")) {
            gs_anm_4.reverse();
            fahrs_list.classList.remove("active");
        }
        if (most_reading_list.classList.contains("active")) {
            gs_anm_5.reverse();
            most_reading_list.classList.remove("active");

        } else {
            gs_anm_5.play();
            most_reading_list.classList.add("active");
        }
    });
}