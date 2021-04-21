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

/* عمل الوضع الليلي */
const dark_btn = document.querySelector(".bottom-nav .dark-point"),
  light_btn = document.querySelector(".bottom-nav .white-point");
dark_btn.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelectorAll('meta[content="#115973"]').forEach((mt) => {
    mt.remove();
  });
  barColor("#2a3b41");
  light_btn.style.pointerEvents = "auto";
  dark_btn.style.pointerEvents = "none";
  document.head.insertAdjacentHTML(
    "beforeend",
    `<link rel="stylesheet" href="css/dark-style.css">`
  );
  document
    .querySelector(".times-salah iframe")
    .setAttribute(
      "src",
      "https://timesprayer.today/widget_frame.php?frame=2&sound=true&id=1843&theme=w3-black"
    );
  localStorage.setItem("darkMode", "true");
});
light_btn.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelectorAll('meta[content="#2a3b41"]').forEach((mt) => {
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
  document
    .querySelector(".times-salah iframe")
    .setAttribute(
      "src",
      "https://timesprayer.today/widget_frame.php?frame=2&sound=true&id=1843&theme=w3-light-gray"
    );
  localStorage.setItem("darkMode", "false");
});
// 1- خاصة بالصفحة الريسيه =====================================

/* تعديل الزر الخاص باللايك */
const btn_like = document.querySelector(".footer-fn.likes .btn-like");
btn_like.addEventListener("click", (e) => {
  e.preventDefault();
  btn_like.setAttribute("disabled", "true");
  btn_like.innerHTML = `<span class="like-self">جزاك الله خيراً</span><i class="fas fa-heart mr-1 add-animation-scale"></i>`;
});
/* تعديل القائمه المنسدله */
const list_btn =
    document.querySelector(".list-nav .fa-bars") ||
    document.querySelector(".list-nav"),
  close_btn_list = document.querySelector(
    ".dropdown-list-clalender .list-close "
  ),
  gsap_anm = gsap.to(".dropdown-list-clalender", {
    duration: 1,
    height: "100%",
    paused: true,
    ease: "slow(0.7,0.7,false)",
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
  historyDate();
  /* اظهار قائمة الاذاعات */
  /* Right Nav FN */
  rightNavFN();
  /* اضافة تنشيط الى الاذاعة الذى تعمل */
  const all_sounds = document.querySelectorAll(
      ".dropdown-playlist .list-sounds .sound-item"
    ),
    btn_controls_bx = document.querySelector(".controlls-radio"),
    play_btn = document.querySelector(
      ".app-radio .controlls-radio .players .play-btn"
    ),
    refresh_btn = document.querySelector(
      ".app-radio .controlls-radio .settings-additions .reload-btn"
    ),
    note_btn = document.querySelector(".bottom-nav .note-listen"),
    note_box = document.querySelector(".write-note");
  let radio_audio = document.querySelector(
    ".app-radio .controlls-radio .players #radio-audio"
  );
  if (all_sounds) {
    all_sounds.forEach((sound) => {
      sound.querySelector(".title").addEventListener("click", () => {
        all_sounds.forEach((s) => s.classList.remove("active"));
        sound.classList.add("active");
      });
      sound.addEventListener("click", function (c) {
        c.preventDefault();
        c.stopPropagation();
        // --------
        let radioLink = this.dataset.radio,
          name_radio = this.querySelector("a.title").textContent.trim();
        radio_audio.src = radioLink;
        play_btn.click();
        document.querySelector(".information-audio h4").innerHTML = name_radio;
      });
    });
  }
  /* اضافه مسافه اسفل الكونترولز الازرار */

  btn_controls_bx.style.bottom = bottom_nav.offsetHeight + "px";
  /* تشغيل الاذاعو واضافه الصوت والخ */
  if (play_btn) {
    play_btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (radio_audio.paused) {
        radio_audio.play();
        this.innerHTML = `<i class="fas add-animation-scale  fa-pause"></i>`;
      } else {
        radio_audio.pause();
        this.innerHTML = `<i class="fas add-animation-scale  fa-play"></i>`;
      }
    });
  }
  radio_audio.onended = () => {
    play_btn.innerHTML = `<i class="fas add-animation-scale  fa-play"></i>`;
  };

  /* عمل تحديث للصفحة فى زر الريفرش */

  if (refresh_btn) {
    refresh_btn.addEventListener("click", () => {
      radio_audio.currentTime = 0;
    });
  }

  /* اظهار الملاحظات */

  if (note_btn) {
    note_btn.addEventListener("click", function (e) {
      e.preventDefault();
      note_box.classList.toggle("active");
    });
  }
  /* عمل لون لخلفية الناف الاعلى على حسب ال سكرول */
  window.onscroll = function () {
    makeBackGround();
  };
  /* اظهار التاريخ الهجرى */
  addDateHejryToPage();
}

/* 3- صفحة المجلات 
    -- والكروت
    -- والتفريغات
    -- السلاسل الدعويه
    -- والمقطافات
                        ============================================ */
if (
  location.href.search("books.html") > -1 ||
  location.href.search("cards.html") > -1 ||
  location.href.search("discharges.html") > -1 ||
  location.href.search("prayer-chains.html") > -1 ||
  location.href.search("leaflets.html") > -1
) {
  /* Color The Navbar */
  makeBackGround();
  window.onscroll = () => {
    makeBackGround();
  };
  /* Right Nav FN */
  rightNavFN();
  /* Displaying Discription For Book */
  const books = document.querySelectorAll(
      ".books-libs .book-self .btn-di.info"
    ),
    book_dsc_info = document.querySelectorAll(".books-libs .book-discrption");

  books.forEach((book) => {
    book.addEventListener("click", function (e) {
      e.preventDefault();
      let link_mark = book.parentElement.parentElement.querySelector(
        ".link-book"
      );
      let selector = document.querySelector(
          `.books-libs .book-discrption.${this.dataset.bkinfo}`
        ),
        gs_anm_3_st = gsap.to(
          `.books-libs .book-discrption.${this.dataset.bkinfo}`,
          {
            duration: 1,
            scaleY: 1,
            height: "auto",
            paused: true,
            ease: "slow(0.7,0.7,false)",
            display: "block",
          }
        );
      gs_anm_3_end = gsap.to(
        `.books-libs .book-discrption.${this.dataset.bkinfo}`,
        {
          duration: 1,
          scaleY: 0,
          height: 0,
          paused: true,
          ease: "slow(0.7,0.7,false)",
          display: "none",
        }
      );
      books.forEach((ele_bk) => {
        ele_bk.parentElement.parentElement
          .querySelectorAll(".link-book")
          .forEach((ln_bk) => {
            ln_bk.classList.remove("active");
          });
      });

      link_mark.classList.toggle("active");

      book_dsc_info.forEach((ds) => {
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
  document
    .querySelectorAll(".book-discrption .close-btn-inf")
    .forEach((close) => {
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
    throttle: 500,
  });
  /* Animtion Img When Loading OF Book */
  document.querySelectorAll(".book-self").forEach((bk) => {
    gsap.to(`.${bk.classList.value}`, {
      duration: 1,
      scale: 1,
      stagger: 0.3,
      delay: 1,
    });
  });
  /* Open Fahrs Function And Most Reading */
  fahrsAndBest();
}
/*
    4- صفحة المقالات 
    --  صفحة الفوائد 
    --  صفحة الصوتيات 
    --  صفحة الدروس 
                    ============================================
*/
if (
  location.href.search("articles.html") > -1 ||
  location.href.search("benefits.html") > -1 ||
  location.href.search("fatwas.html") > -1 ||
  location.href.search("audios.html") > -1 ||
  location.href.search("lessons.html") > -1
) {
  /* Color The Navbar */
  makeBackGround();
  window.onscroll = () => {
    makeBackGround();
  };
  /* Right Nav FN */
  rightNavFN();
  /* Make Rating FN */
  const all_ratings = document.querySelectorAll(
    ".articles-section .star-rating"
  );
  let rating_array = [];
  all_ratings.forEach(function (rating, pr_id) {
    rating.querySelectorAll("span").forEach(function (star) {
      star.addEventListener("click", function () {
        if (confirm(`متاكد (النجوم = ${this.dataset.rating}) ؟`)) {
          [...rating.children].forEach((r_s) => {
            if (r_s.classList.contains("active")) {
              r_s.classList.remove("active");
              r_s.removeAttribute("class");
            }
          });
          rating_array.push({
            id: pr_id,
            stN: this.dataset.rating,
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
              stN: this.dataset.rating,
            });
            localStorage.setItem("rating", JSON.stringify(strg_data));
          }
        }
        // Save Rating In Browser
      });
    });
  });

  /*  if rating localstorage exists */
  if (localStorage.getItem("rating") != null) {
    let strg_data = JSON.parse(localStorage.getItem("rating"));
    all_ratings.forEach(function (rt_element, pr_id) {
      strg_data.forEach((sr_d) => {
        if (sr_d.id == pr_id) {
          rt_element.querySelectorAll("span").forEach((star_s) => {
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
  const all_headers = document.querySelectorAll(
    ".articles-section .article-title a"
  );
  all_headers.forEach((head_element) => {
    // ------
    let header_array = head_element.innerText.split(" ");
    if (header_array.length > 3) {
      head_element.innerText = header_array.slice(0, 2).join(" ") + "...";
    } else if (head_element.innerText.length > 14) {
      head_element.innerText = head_element.innerText.slice(0, 14) + "...";
    }
  });
  /* Make Searching In Articles */
  const ancient_articles = document.querySelectorAll(
    ".articles-section .article-bx"
  );
  let search_bx = document.querySelector(".header .search-bx"),
    sr_input = search_bx.querySelector("input");
  search_bx.querySelector(".search").addEventListener("click", function (e) {
    e.preventDefault();
    // ----

    ancient_articles.forEach((anc_artcle) => {
      let anc_titles = anc_artcle.querySelector(".article-title a").innerText;

      if (anc_titles.indexOf(sr_input.value) > -1) {
        anc_artcle.parentElement.style.display = "";
      } else {
        anc_artcle.parentElement.style.display = "none";
      }
    });
  });
  /* Make Tree Active When Click (Alfahrs) */
  const alfahrs_list_articles = document.querySelectorAll(
    ".alfahrs-list .ol-main-pr .main-li"
  );
  alfahrs_list_articles.forEach((li_pr) => {
    li_pr.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      li_pr.classList.toggle("active");
    });
  });
}

// 5- صفحة الاذكار ============================================
let data_font_color_bg = {
  fontSize: 16,
  fontColor: "default",
  bgColor: "default",
};
if (location.href.search("azkar.html") > -1) {
  /* Select Sort Of Azkar You ganna read */
  const azkar_btn = document.querySelectorAll(".footer-two .link-ch-ad"),
    azkar_box = document.querySelectorAll(".azkars-section .az-bx"),
    azkar_copy_btns = document.querySelectorAll(
      ".azkars-section .az-bx .az-self .options .copy-content"
    ),
    azkar_counter_btns = document.querySelectorAll(
      ".azkars-section .az-bx .az-self .options .changable-counter"
    ),
    azkar_plps_btns = document.querySelectorAll(
      ".azkars-section .az-bx .az-self .options .run-player"
    ),
    plus_font = document.querySelector(".bottom-nav .n-links-box .plus-up"),
    minus_font = document.querySelector(".bottom-nav .n-links-box .minus-down"),
    platte_font_colors = document.querySelectorAll(
      ".dropdown-playlist .sound-item .list-colors .color-item"
    );
  /* Color The Navbar */
  makeBackGround();
  window.onscroll = () => {
    makeBackGround();
  };
  /* Right Nav FN */
  rightNavFN();
  /* Make The FN */
  azkar_btn.forEach(function (az_bt) {
    //-----
    az_bt.addEventListener("click", function (c) {
      //-----
      c.preventDefault();
      //-----
      azkar_box.forEach((az_bx) => {
        az_bx.classList.remove("active");
      });
      //-----
      document
        .querySelector(`.azkars-section ${this.dataset.azkar}`)
        .classList.toggle("active");
    });
  });
  /* Make Copy Function */
  azkar_copy_btns.forEach(function (cp_az) {
    //----
    cp_az.addEventListener("click", function (c) {
      c.preventDefault();
      // -----
      makeCopy(
        this,
        this.parentElement.parentElement.querySelector(".text-az")
      );
    });
  });
  /* Counter FN */
  azkar_counter_btns.forEach((co_bt) => {
    //----
    let counter = 0;
    co_bt.addEventListener("click", function () {
      let small_number = document.createElement("small");
      small_number.className = "anm-number";
      counter++;
      small_number.innerText = counter;
      this.innerText = counter;
      this.appendChild(small_number);
      //-----
      this.parentElement.parentElement.parentElement
        .querySelectorAll(".az-self")
        .forEach((az_s) => {
          let element = az_s.querySelector(".stopping-mark");
          if (element) {
            element.remove();
          }
        });
      //-----
      let stop_mark = document.createElement("span");
      stop_mark.className = "stopping-mark";
      this.parentElement.parentElement.appendChild(stop_mark);
    });
    co_bt.addEventListener("dblclick", function () {
      let small_number = document.createElement("small");
      small_number.className = "anm-number";
      counter = 0;
      small_number.innerText = counter;
      this.innerText = counter;
      this.appendChild(small_number);
    });
  });
  /* Play The Audio And The Pause */
  azkar_plps_btns.forEach((pp_bt) => {
    pp_bt.addEventListener("click", function () {
      //-----
      let the_audio = this.parentElement.querySelector("audio");
      if (the_audio.paused) {
        the_audio.play();
        this.innerHTML = `<i class="fas fa-pause add-animation-scale"></i>`;
      } else {
        the_audio.pause();
        this.innerHTML = `<i class="fas fa-play add-animation-scale"></i>`;
      }
    });
    /* If Ended */
    pp_bt.parentElement.querySelector("audio").onended = () => {
      pp_bt.innerHTML = `<i class="fas fa-play add-animation-scale"></i>`;
    };
  });
  /* Increas Size Of Font */
  let font_size = 16;
  plus_font.addEventListener("click", (c) => {
    c.preventDefault();
    font_size += 1;
    azkar_box.forEach((az_bx) => {
      az_bx.querySelectorAll(".az-self .text-az").forEach((tx) => {
        if (font_size >= 55) {
          font_size = 55;
        }
        tx.style.fontSize = font_size + "px";
      });
    });
    data_font_color_bg.fontSize = font_size;
    getAndPutLocal("fs", data_font_color_bg.fontSize);
  });
  minus_font.addEventListener("click", (c) => {
    c.preventDefault();
    font_size -= 1;
    azkar_box.forEach((az_bx) => {
      az_bx.querySelectorAll(".az-self .text-az").forEach((tx) => {
        if (font_size <= 0) {
          font_size = 1;
          tx.style.fontSize = font_size + "px";
        } else {
          tx.style.fontSize = font_size + "px";
        }
      });
    });

    data_font_color_bg.fontSize = font_size;
    getAndPutLocal("fs", data_font_color_bg.fontSize);
  });
  /* Add Colors To Plattes And Active Class In Top Nav To Change Font */
  platte_font_colors.forEach((plt) => {
    // ------
    plt.style.backgroundColor = plt.dataset.color;
    // ------
    plt.addEventListener("click", function (e) {
      e.preventDefault();
      // ------
      this.parentElement.querySelectorAll("li").forEach((co) => {
        co.classList.remove("active");
      });
      // ------
      this.classList.add("active");
      // ------

      if (this.parentElement.classList.contains("font-plt")) {
        // ------
        let selected = this.dataset.color;
        // ------
        data_font_color_bg.fontColor = selected;
        // ------
        getAndPutLocal("fc", data_font_color_bg.fontColor);
        // ------
        azkar_box.forEach((az_bx) => {
          // ------
          az_bx.querySelectorAll("header").forEach((head) => {
            head.style.color = selected;
          });
          // ---
          if (selected == "default") {
            // ------
            az_bx.querySelectorAll("header").forEach((head) => {
              head.style.color = "";
            });
          }
        });
      } else {
        let selected = this.dataset.color;
        data_font_color_bg.bgColor = selected;
        getAndPutLocal("fb", data_font_color_bg.bgColor);
        azkar_box.forEach((az_bx) => {
          // ------
          az_bx.querySelectorAll("header").forEach((head) => {
            head.style.backgroundColor = selected;
          });
          if (selected == "default") {
            // ------
            az_bx.querySelectorAll("header").forEach((head) => {
              head.style.backgroundColor = "";
            });
          }
        });
      }
    });
  });
  /* Save Style To LocalStorage */
  let get_style = localStorage.getItem("styleAzkar");
  if (get_style != null) {
    let data_from_local = JSON.parse(get_style);
    // Add Active To Color In Platte From Local
    platte_font_colors.forEach((pl_c) => {
      // -----

      if (pl_c.parentElement.classList.contains("font-plt")) {
        if (pl_c.dataset.color == data_from_local.fontColor) {
          pl_c.parentElement.querySelectorAll("li").forEach((co) => {
            if (co.classList.contains("active")) {
              co.classList.remove("active");
            }
          });
          pl_c.classList.add("active");
        }
      } else {
        if (pl_c.dataset.color == data_from_local.bgColor) {
          pl_c.parentElement.querySelectorAll("li").forEach((co) => {
            if (co.classList.contains("active")) {
              co.classList.remove("active");
            }
          });
          pl_c.classList.add("active");
        }
      }
    });
    // Background Color
    azkar_box.forEach((az_bx) => {
      // ------
      az_bx.querySelectorAll("header").forEach((head) => {
        head.style.backgroundColor = data_from_local.bgColor;
        head.style.color = data_from_local.fontColor;
        head.style.fontSize = data_from_local.fontSize + "px";
      });
      if (data_from_local.bgColor == "default") {
        // ------
        az_bx.querySelectorAll("header").forEach((head) => {
          head.style.backgroundColor = "";
        });
      }
      if (data_from_local.fontColor == "default") {
        az_bx.querySelectorAll("header").forEach((head) => {
          head.style.color = "";
        });
      }
    });
  }
}

// 6- صفحة المقاله بمفردها ========================================
if (
  location.href.search("the-article.html") > -1 ||
  location.href.search("the-benefit.html") > -1 ||
  location.href.search("the-fatwa.html") > -1
) {
  /* Color The Navbar */
  makeBackGround();
  window.onscroll = () => {
    makeBackGround();
  };
  /* Right Nav FN */
  rightNavFN();
  // ---------
  const articles_text_inner = document.querySelector(
      ".the-article-section .article-inner"
    ),
    articles_text_outer = document.querySelector(
      ".the-article-section .article-outer-parent .the-article-self"
    ),
    art_tx_ou_parent = articles_text_outer.parentElement.parentElement,
    plus_btn = document.querySelector(".bottom-nav .link-nav.plus-up"),
    minus_btn = document.querySelector(".bottom-nav .link-nav.minus-down"),
    changes = document.querySelectorAll(".font-change-size"),
    search_bx = document.querySelector(".header .search-bx"),
    arrow_up_inner = document.querySelector(".scroll-up-inner"),
    arrow_up = document.querySelector(".scroll-up"),
    page_name = document.querySelector(".header .page-name"),
    page_title_head = document.querySelector("head title"),
    search_founded_ele = document.querySelector(
      ".header .founded-search .founded-number"
    );
  let font_size = 16;
  if (location.href.search("the-article.html") > -1) {
    getDataFromFiles(
      "./articles-data.js",
      "ARTICLES",
      "المقاله",
      "articles.html",
      "مقالات"
    );
  } else if (location.href.search("the-benefit.html") > -1) {
    getDataFromFiles(
      "./benefits-data.js",
      "BENEFITS",
      "فائده",
      "benefits.html",
      "الفوائد"
    );
  } else if (location.href.search("the-fatwa.html") > -1) {
    getDataFromFiles(
      "./fatwas-data.js",
      "FATWAS",
      "فتوى",
      "fatwas.html",
      "الفتاوى"
    );
  }
  /* Function To Get Data form files */
  function getDataFromFiles(fileName, variableName, pgN, pgLink, pgsN) {
    const URL_PARAMS = new URLSearchParams(window.location.search);
    if (URL_PARAMS.has("title")) {
      let title_link = URL_PARAMS.get("title");
      import(fileName).then((data) => {
        const ARTICLESS = data[variableName];
        ARTICLESS.forEach((article) => {
          if (article.title === title_link) {
            page_name.textContent = title_link;
            articles_text_outer.querySelector("h3").textContent = title_link;
            articles_text_inner.querySelector(".the-article-self").innerHTML =
              article.body;
            articles_text_outer.querySelector("p").innerHTML = article.body;
            page_title_head.textContent = `تطبيق موقع ميراث الأنبياء | ${title_link}`;
            const original_text = article.body;
            /* Searching In Article */
            const article_text = articles_text_inner.querySelector(
              "p.the-article-self"
            );
            search_bx
              .querySelector(".search.icon")
              .addEventListener("click", (c) => {
                c.preventDefault();
                // ----------
                const input_search_val = search_bx.querySelector("input").value;
                let regex_search = new RegExp(`(${input_search_val})`, "g");
                if (input_search_val != "") {
                  if (regex_search.test(article_text.textContent)) {
                    let newText = article_text.textContent.replace(
                      regex_search,
                      `<strong class="found-search" style="font-size:1.2rem">${input_search_val}</strong>`
                    );
                    article_text.innerHTML = newText;
                    let findElements = document.querySelectorAll(
                      ".found-search"
                    );
                    search_founded_ele.textContent = findElements.length;
                    search_founded_ele.parentElement.classList.add("active");
                    if (findElements.length == 1) {
                      findElements[0].scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    } else {
                      window.scrollTo({
                        top: findElements[1].offsetTop - 50,
                        behavior: "smooth",
                      });
                    }
                  } else {
                    search_founded_ele.parentElement.classList.add("active");
                    search_founded_ele.textContent = 0;
                    article_text.innerHTML = original_text;
                    setTimeout(() => {
                      search_founded_ele.parentElement.classList.remove(
                        "active"
                      );
                    }, 3000);
                  }
                } else {
                  article_text.innerHTML = original_text;
                  search_founded_ele.parentElement.classList.remove("active");
                }
              });
          }
        });
      });
    } else {
      page_name.textContent = `عنوان ${pgN}`;
      page_title_head.textContent = `تطبيق موقع ميراث الأنبياء | عنوان ${pgN}`;
      articles_text_inner.querySelector(
        ".the-article-self"
      ).innerHTML = `من فضلك اذهب لصفحة <a href=${pgLink} class="art-link font-change-color">${pgsN}</a><br> او فى الاسفل ستجد ${pgsN} أخرى`;
      articles_text_outer.querySelector(
        "p"
      ).innerHTML = `من فضلك اذهب لصفحة <a href=${pgLink} class="art-link font-change-color ">${pgsN}</a><br> او فى الاسفل ستجد ${pgsN} أخرى`;
    }
  }

  /* Add Active On Article Which will read */
  articles_text_inner
    .querySelector(".the-article-self")
    .addEventListener("click", () => {
      art_tx_ou_parent.classList.add("active");
    });
  /* Remove Active On Article Which will read */
  articles_text_outer.addEventListener("click", () => {
    art_tx_ou_parent.classList.remove("active");
  });
  /* Gooo Up When Scrolling Down */
  if (arrow_up || arrow_up_inner) {
    arrow_up.addEventListener("click", () => {
      document.querySelector(".article-outer-parent").scrollTo({
        top: document.querySelector(".the-article-self").offsetLeft,
        behavior: "smooth",
      });
    });
    arrow_up_inner.addEventListener("click", () => {
      window.scrollTo({
        top: document.querySelector(".article-inner").offsetLeft,
        behavior: "smooth",
      });
    });
  }
  /* Copy The Content */
  articles_text_inner
    .querySelector(".copy-and-share .ln-cs.copy")
    .addEventListener("click", function (c) {
      c.preventDefault();
      // --------
      makeCopy(this, articles_text_inner.querySelector(".the-article-self"));
    });
  /* Add Colors To Platte  And Change Elements*/
  addColorsToPlatte();
  /* Change Font Size*/
  plus_btn.addEventListener("click", (c) => {
    c.preventDefault();
    font_size += 1;
    changes.forEach((tx) => {
      if (font_size >= 55) {
        font_size = 55;
      }
      tx.style.fontSize = font_size + "px";
    });
    data_font_color_bg.fontSize = font_size;
    getAndPutLocal("fs", data_font_color_bg.fontSize);
  });
  minus_btn.addEventListener("click", (c) => {
    c.preventDefault();
    font_size -= 1;
    changes.forEach((tx) => {
      if (font_size <= 0) {
        font_size = 1;
        tx.style.fontSize = font_size + "px";
      } else {
        tx.style.fontSize = font_size + "px";
      }
    });
    data_font_color_bg.fontSize = font_size;
    getAndPutLocal("fs", data_font_color_bg.fontSize);
  });
  /* Get Data */
  getFontColorBgSizeLocalStorage();
}

// 7- اسماء الله الحسني ========================================
if (location.href.search("allah-names.html") > -1) {
  const plus_btn = document.querySelector(".bottom-nav .link-nav.plus-up"),
    minus_btn = document.querySelector(".bottom-nav .link-nav.minus-down"),
    changes = document.querySelectorAll(".font-change-size"),
    search_bx = document.querySelector(".header .search-bx"),
    list_names_bx = document.querySelectorAll(".allah-names-section .box-name"),
    catch_all_definations = document.querySelector(".catch-all-definations"),
    alsalf_part = document.querySelector(".footer-two .alsalf"),
    salaf_box = document.querySelector(".box-salaf"),
    salaf_content = salaf_box.querySelector(".bxs-th .content"),
    salaf__content_html = salaf_content.innerHTML,
    nozzom_part = document.querySelector(".footer-two .nozzom");
  let font_size = 16,
    length_arr = [];
  /* Color The Navbar */
  makeBackGround();
  window.onscroll = () => {
    makeBackGround();
  };
  /* Right Nav FN */
  rightNavFN();
  /* Add Colors To Platte  And Change Elements*/
  addColorsToPlatte();
  /* Change Font Size*/
  plus_btn.addEventListener("click", (c) => {
    c.preventDefault();
    font_size += 1;
    changes.forEach((tx) => {
      if (font_size >= 55) {
        font_size = 55;
      }
      tx.style.fontSize = font_size + "px";
    });
    data_font_color_bg.fontSize = font_size;
    getAndPutLocal("fs", data_font_color_bg.fontSize);
  });
  minus_btn.addEventListener("click", (c) => {
    c.preventDefault();
    font_size -= 1;
    changes.forEach((tx) => {
      if (font_size <= 0) {
        font_size = 1;
        tx.style.fontSize = font_size + "px";
      } else {
        tx.style.fontSize = font_size + "px";
      }
    });
    data_font_color_bg.fontSize = font_size;
    getAndPutLocal("fs", data_font_color_bg.fontSize);
  });
  /* Get Data */
  getFontColorBgSizeLocalStorage();
  /* Search In Names */
  search_bx
    .querySelector(".search.icon")
    .addEventListener("click", function (c) {
      c.preventDefault();
      length_arr = [];
      // ----------------
      const search_value = search_bx.querySelector("input").value.trim(),
        search_founded_ele = document.querySelector(
          ".header .founded-search .founded-number"
        );
      // ----------------
      list_names_bx.forEach((name_bx, i) => {
        let text_name = name_bx.querySelector(".allah-name").textContent,
          regex_search = new RegExp(`(${search_value})`, "g");
        // ------------
        if (search_value != "") {
          if (regex_search.test(text_name)) {
            length_arr.push(i);
            name_bx.parentElement.style.display = "";
            search_founded_ele.innerHTML = length_arr.length;
            search_founded_ele.parentElement.classList.add("active");
          } else {
            name_bx.parentElement.style.display = "none";
            if (length_arr.length == 0) {
              search_founded_ele.innerHTML = 0;
            }
            search_founded_ele.parentElement.classList.add("active");
          }
        } else {
          name_bx.parentElement.style.display = "";
          search_founded_ele.parentElement.classList.remove("active");
        }
      });
    });
  /* Open Definition Box */
  list_names_bx.forEach((bx) => {
    // -----------------
    catch_all_definations.querySelectorAll(".box-def").forEach((df) => {
      df.classList.remove("active");
      df.querySelector(".close-box").addEventListener("click", function () {
        df.classList.remove("active");
        // -----------------
      });
    });
    // -----------------
    bx.querySelector(".allah-name").addEventListener("click", function () {
      openDefBox(this);
    });
    // -----------------
    bx.querySelector(".exc-mark").addEventListener("click", function () {
      openDefBox(this);
    });
    // -----------------
    bx.querySelector(".run-audio").addEventListener("click", function () {
      let audio_tag = this.parentElement.querySelector("audio");
      if (audio_tag.paused) {
        audio_tag.play();
        this.innerHTML = `<i class="fas fa-pause add-animation-scale"></i>`;
      } else {
        audio_tag.pause();
        this.innerHTML = `<i class="fas fa-play add-animation-scale"></i>`;
      }
    });
    bx.querySelector("audio").onended = () => {
      bx.querySelector(
        ".run-audio"
      ).innerHTML = `<i class="fas fa-play add-animation-scale"></i>`;
    };
  });

  /* The Defnintion Box Handle */
  catch_all_definations.querySelectorAll(".box-def").forEach((dfBox) => {
    // -------------- Copy FN
    dfBox.querySelector(".copy-btn").addEventListener("click", function () {
      let parent = this.parentElement.parentElement,
        contents_array = [];
      parent.querySelectorAll(".bxs-th").forEach((cn) => {
        contents_array.push(cn.textContent.trim());
      });
      let will_copy = contents_array.join(" -------- ").trim();
      makeCopy(this, will_copy);
    });
    // -------------- Play - - Pause
    dfBox.querySelector(".run-audio").addEventListener("click", function () {
      let audio_tag = this.parentElement.querySelector("audio");
      if (audio_tag.paused) {
        audio_tag.play();
        this.innerHTML = `<i class="fas fa-pause add-animation-scale"></i>`;
      } else {
        audio_tag.pause();
        this.innerHTML = `<i class="fas fa-play add-animation-scale"></i>`;
      }
    });
    dfBox.querySelector("audio").onended = () => {
      dfBox.querySelector(
        ".run-audio"
      ).innerHTML = `<i class="fas fa-play add-animation-scale"></i>`;
    };
    // -------------- Searching
    dfBox
      .querySelector(".search-bx .icon")
      .addEventListener("click", function () {
        let search_value = this.parentElement
            .querySelector("input")
            .value.trim(),
          search_founded_ele = dfBox.querySelector(
            ".founded-search .founded-number"
          ),
          finded_n = 0;

        // ------
        this.parentElement.parentElement
          .querySelectorAll(".fr-search")
          .forEach((txt) => {
            let instance = new Mark(txt);
            instance.unmark();
            instance.mark(search_value, {
              className: "found-search-now",
              done: function (d) {
                finded_n += d;
                search_founded_ele.innerHTML = finded_n;
                search_founded_ele.parentElement.classList.add("active");
              },
            });
            if (search_value == "") {
              search_founded_ele.parentElement.classList.remove("active");
            }
          });
      });
  });
  /*  ALSALF Part */
  alsalf_part.addEventListener("click", function (c) {
    c.preventDefault();
    salaf_box.classList.add("active");
  });
  // -------------
  salaf_box.querySelector(".close-box").addEventListener("click", function () {
    salaf_box.classList.remove("active");
  });
  // -------------
  salaf_box.querySelector(".copy-btn").addEventListener("click", function () {
    makeCopy(this, salaf_content);
  });
  // -------------
  salaf_box
    .querySelector(".search.icon")
    .addEventListener("click", function () {
      let search_value = this.parentElement.querySelector("input").value,
        text_content = salaf_content.textContent,
        regex_search = new RegExp(`(${search_value})`, "g"),
        search_founded_ele = salaf_box.querySelector(
          ".founded-search .founded-number"
        );

      // ------------
      if (search_value != "") {
        if (regex_search.test(text_content)) {
          // --------------
          let newText = text_content.replace(
            regex_search,
            `<strong class="found-search" style="font-size:1.2rem">${search_value}</strong>`
          );

          // ----------
          salaf_content.innerHTML = newText;
          // ----------
          let finded_search = this.parentElement.parentElement.querySelectorAll(
            ".found-search"
          ).length;
          search_founded_ele.innerHTML = finded_search;
          search_founded_ele.parentElement.classList.add("active");
        } else {
          salaf_content.innerHTML = salaf__content_html;
          search_founded_ele.innerHTML = 0;
          search_founded_ele.parentElement.classList.add("active");
        }
      } else {
        salaf_content.innerHTML = salaf__content_html;
        search_founded_ele.parentElement.classList.remove("active");
      }
    });
  // -------------
  nozzom_part.addEventListener("click", function (c) {
    c.preventDefault();
    let audio = this.querySelector("audio");
    if (audio.paused) {
      this.querySelector("i").classList.remove("fa-play");
      this.querySelector("i").classList.add("fa-pause");
      audio.play();
    } else {
      this.querySelector("i").classList.add("fa-play");
      this.querySelector("i").classList.remove("fa-pause");
      audio.pause();
    }
  });
  nozzom_part.querySelector("audio").onended = function () {
    nozzom_part.querySelector("i").classList.add("fa-play");
    nozzom_part.querySelector("i").classList.remove("fa-pause");
  };
  /* Functions */
  function openDefBox(thisE) {
    thisE.parentElement.parentElement.parentElement
      .querySelectorAll(".box-name")
      .forEach((bxN) => {
        bxN.classList.remove("active");
      });
    thisE.parentElement.classList.add("active");
    catch_all_definations.querySelectorAll(".box-def").forEach((df) => {
      df.classList.remove("active");
    });
    catch_all_definations
      .querySelector(`${thisE.dataset.definition}`)
      .classList.add("active");
  }
}
// 8- السنن ========================================
if (location.href.search("sonan.html") > -1) {
  const plus_btn = document.querySelector(".bottom-nav .link-nav.plus-up"),
    minus_btn = document.querySelector(".bottom-nav .link-nav.minus-down"),
    changes = document.querySelectorAll(".font-change-size"),
    search_bx = document.querySelector(".header .search-bx"),
    header_pg = document.querySelector(".header .page-name"),
    footer_two = document.querySelectorAll(
      ".footer-two .catch-them .link-ch-ad"
    ),
    parent_sonan = document.querySelectorAll(".sonan-section .sonan-boxs"),
    all_sonan_content = document.querySelectorAll(
      ".all-sonan-bx-cn .parent-bx"
    );
  let font_size = 16;
  /* اضافة التاريخ والوقت */
  historyDate();
  addDateHejryToPage();
  /* Color The Navbar */
  makeBackGround();
  window.onscroll = () => {
    makeBackGround();
  };
  /* Right Nav FN */
  rightNavFN();
  /* Add Colors To Platte  And Change Elements*/
  addColorsToPlatte();
  /* Change Font Size*/
  plus_btn.addEventListener("click", (c) => {
    c.preventDefault();
    font_size += 1;
    changes.forEach((tx) => {
      if (font_size >= 55) {
        font_size = 55;
      }
      tx.style.fontSize = font_size + "px";
    });
    data_font_color_bg.fontSize = font_size;
    getAndPutLocal("fs", data_font_color_bg.fontSize);
  });
  minus_btn.addEventListener("click", (c) => {
    c.preventDefault();
    font_size -= 1;
    changes.forEach((tx) => {
      if (font_size <= 0) {
        font_size = 1;
        tx.style.fontSize = font_size + "px";
      } else {
        tx.style.fontSize = font_size + "px";
      }
    });
    data_font_color_bg.fontSize = font_size;
    getAndPutLocal("fs", data_font_color_bg.fontSize);
  });
  /* Get Data */
  getFontColorBgSizeLocalStorage();
  /* Open Sonan box will you choose */
  footer_two.forEach((link) => {
    link.addEventListener("click", function (c) {
      c.preventDefault();
      parent_sonan.forEach((pS) => {
        pS.classList.remove("active");
      });
      document
        .querySelector(`.sonan-section ${this.dataset.boxsonan}`)
        .classList.add("active");
      header_pg.textContent = this.textContent;
    });
  });
  /* When Click On The Sona Button */
  parent_sonan.forEach((pSona) => {
    pSona.querySelectorAll(".bx-sn-bt").forEach((c_btn) => {
      c_btn.addEventListener("click", function (c) {
        c.preventDefault();
        // -----------------
        let content = this.dataset.boxcontent,
          childrenSona = this.parentElement.parentElement.parentElement,
          element_sona_content = childrenSona.querySelector(`${content}`),
          btn_parent = this.parentElement.parentElement.querySelectorAll(
            ".bx-sn-bt"
          );
        // -----------------
        btn_parent.forEach((btn) => {
          btn.classList.remove("active");
        });
        // -----------------
        this.classList.add("active");
        // -----------------

        all_sonan_content.forEach((sona) => {
          sona.classList.remove("active");
        });
        // -----------------
        element_sona_content.classList.add("active");
        // -----------------
        setTimeout(function () {
          window.scrollTo({
            top: element_sona_content.offsetTop,
          });
        }, 500);

        // -----------------
        element_sona_content.querySelectorAll(".close-box").forEach((cl_bx) => {
          cl_bx.addEventListener("click", function (c) {
            c.preventDefault();
            element_sona_content.classList.remove("active");
          });
        });
      });
    });
  });

  /* Search In Names */
  search_bx
    .querySelector(".search.icon")
    .addEventListener("click", function (c) {
      c.preventDefault();
      // ----------------
      const search_value = search_bx.querySelector("input").value.trim(),
        search_founded_ele = document.querySelector(
          ".header .founded-search .founded-number"
        ),
        length_f = [];
      // ----------------
      all_sonan_content.forEach((s) => s.classList.remove("active"));
      // ----------------
      document
        .querySelectorAll(".sonan-section .sonan-boxs.active .bx-sn-bt")
        .forEach((name_bx, i) => {
          let text_name = name_bx.textContent.trim(),
            regex_search = new RegExp(`(${search_value})`, "g");
          // ------------
          if (search_value != "") {
            if (regex_search.test(text_name)) {
              name_bx.parentElement.style.display = "";
              length_f.push(i);

              search_founded_ele.innerHTML = length_f.length;
              search_founded_ele.parentElement.classList.add("active");
            } else {
              name_bx.parentElement.style.display = "none";
              if (length_f.length == 0) {
                search_founded_ele.innerHTML = 0;
              }
              search_founded_ele.parentElement.classList.add("active");
            }
          } else {
            name_bx.parentElement.style.display = "";
            search_founded_ele.parentElement.classList.remove("active");
          }
        });
    });
  // -------------- Searching
  all_sonan_content.forEach((active_box) => {
    // --------------------
    active_box
      .querySelector(".search-bx .search.icon")
      .addEventListener("click", function () {
        let search_value = this.parentElement
            .querySelector("input")
            .value.trim(),
          search_founded_ele = active_box.querySelector(
            ".founded-search .founded-number"
          ),
          finded_n = 0;

        // ------
        this.parentElement.parentElement.parentElement
          .querySelectorAll(".content-p")
          .forEach((txt) => {
            let instance = new Mark(txt);
            instance.unmark();
            instance.mark(search_value, {
              className: "found-search-now",
              done: function (d) {
                finded_n += d;
                search_founded_ele.innerHTML = finded_n;
                search_founded_ele.parentElement.classList.add("active");
              },
            });
            if (search_value == "") {
              search_founded_ele.parentElement.classList.remove("active");
            }
          });
      });
    // --------------------
    active_box.querySelectorAll(".options .copy").forEach((c_btn) => {
      c_btn.addEventListener("click", function (c) {
        c.preventDefault();
        // -----------
        let selected_text = this.parentElement.parentElement.querySelector(
          ".content-p"
        );
        // -----------
        makeCopy(this, selected_text);
      });
    });
    // -------------------
    active_box.querySelectorAll(".options .aduio-play").forEach((au_b) => {
      au_b.addEventListener("click", function () {
        let audio_tag = this.parentElement.querySelector("audio");
        if (audio_tag.paused) {
          audio_tag.play();
          this.innerHTML = `<i class="fas fa-pause add-animation-scale"></i>`;
        } else {
          audio_tag.pause();
          this.innerHTML = `<i class="fas fa-play add-animation-scale"></i>`;
        }
      });
      au_b.parentElement.querySelector("audio").onended = () => {
        au_b.innerHTML = `<i class="fas fa-play add-animation-scale"></i>`;
      };
    });
  });
}
// 9- الدروس  ========================================
if (location.href.search("lesson.html") > -1) {
  /* Get Id From Link */
  const URL_PARAMS = new URLSearchParams(window.location.search),
    audio_box = document.querySelector(
      ".audio-lessions-section .container-fluid"
    );

  if (URL_PARAMS.has("lessonid")) {
    let title_link = URL_PARAMS.get("lessonid");
    import(`./lessons.js`).then((data) => {
      const LessonsData = data["lessons"];
      LessonsData.forEach((le_dt) => {
        if (le_dt["id"] == title_link) {
          le_dt.pageContent.forEach((elementL) => {
            let lessonP = document.createElement("div");
            lessonP.className = "audio-box";
            lessonP.innerHTML = `
                  <!-- الصوت نفسه او رابط الصوت -->
                  <audio src=${elementL.lessonAudioLink}></audio>
                  <h4 class="title">${elementL.lessonTitle}</h4>
                  <!-- الاعدادت -->
                  <div class="options">
                      <span class="option audio-play"><i class="fas fa-play"></i></span>
                      <a href="#" class=" option audio-share"><i class="fas fa-share"></i></a>
                      <a href=${elementL.lessonDownloadLink} download class="option audio-download"><i class="fas fa-download"></i>الدرس</a>
                      <a href=${elementL.tafrighLink} download class="option audio-download-tfregha"><i class="fas fa-download"></i>
                          التفريغ</a>
                  </div>
                  `;
            audio_box.append(lessonP);
          });
        }
      });
    });
  } else {
    let lessonP = document.createElement("div");
    lessonP.className = "audio-box";
    lessonP.innerHTML = `
    <h4 class="title">من فضلك اذهب الى <a href="lessons.html" class="title">صفحة الدروس</a></h4>
          `;
    audio_box.append(lessonP);
  }

  /* Color The Navbar */
  makeBackGround();
  window.onscroll = () => {
    makeBackGround();
  };
  /* Right Nav FN */
  rightNavFN();

  /* Functions */
  setTimeout(() => {
    const search_bx = document.querySelector(".header .search-bx"),
      audio_box_dom = document.querySelectorAll(
        ".audio-lessions-section .audio-box"
      );
    /* Search In Names */
    search_bx
      .querySelector(".search.icon")
      .addEventListener("click", function (c) {
        c.preventDefault();
        // ----------------
        const search_value = search_bx.querySelector("input").value.trim(),
          search_founded_ele = document.querySelector(
            ".header .founded-search .founded-number"
          ),
          length_f = [];
        // ----------------
        audio_box_dom.forEach((name_bx, i) => {
          let text_name = name_bx.querySelector(".title").textContent.trim(),
            regex_search = new RegExp(`(${search_value})`, "g");
          // ------------
          if (search_value != "") {
            if (regex_search.test(text_name)) {
              name_bx.querySelector(".title").parentElement.style.display = "";
              length_f.push(i);
              search_founded_ele.innerHTML = length_f.length;
              search_founded_ele.parentElement.classList.add("active");
            } else {
              name_bx.querySelector(".title").parentElement.style.display =
                "none";
              if (length_f.length == 0) {
                search_founded_ele.innerHTML = 0;
              }
              search_founded_ele.parentElement.classList.add("active");
            }
          } else {
            name_bx.querySelector(".title").parentElement.style.display = "";
            search_founded_ele.parentElement.classList.remove("active");
          }
        });
      });
    /* Play The Audio */
    audio_box_dom.forEach((audio_bx) => {
      let audio_tag = audio_bx.querySelector("audio"),
        audio_btn = audio_bx.querySelector(".options .audio-play");
      //-------------
      // -----------------
      if (audio_btn) {
        audio_btn.addEventListener("click", function () {
          if (audio_tag.paused) {
            audio_tag.play();
            this.innerHTML = `<i class="fas fa-pause add-animation-scale"></i>`;
          } else {
            audio_tag.pause();
            this.innerHTML = `<i class="fas fa-play add-animation-scale"></i>`;
          }
        });
      }
      if (audio_tag) {
        audio_tag.onended = () => {
          audio_btn.innerHTML = `<i class="fas fa-play add-animation-scale"></i>`;
        };
      }
    });
  }, 200);
}
// Basics
/* History */
function historyDate() {
  try {
    time_is_widget.init({
      Mecca_z439: {
        template: "TIME",
        time_format: "12hours:minutes:seconds",
      },
    });
  } catch (e) {
    document.querySelector(".hejry-time .calender-hejry").insertAdjacentHTML(
      "beforeend",
      `
            <span>مشكله فى اظهار الوقت</span>
            `
    );
  }
}
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
    playlist_close_btn = document.querySelector(
      ".dropdown-playlist .playlist-close"
    ),
    gsap_anm_2 = gsap.to(".dropdown-playlist", {
      duration: 1,
      height: "100%",
      paused: true,
      ease: "slow(0.7,0.7,false)",
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
    most_reading_btn = document.querySelector(
      ".bottom-nav .link-nav.most-reading"
    ),
    fahrs_list = document.querySelector(".alfahrs-list"),
    most_reading_list = document.querySelector(".most-reading-list");
  let gs_anm_4 = gsap.to(`.alfahrs-list`, {
      duration: 1,
      height: 200,
      paddingTop: "0.4rem",
      paddingBottom: "0.4rem",
      paused: true,
      ease: "slow(0.7,0.7,false)",
    }),
    gs_anm_5 = gsap.to(`.most-reading-list`, {
      duration: 1,
      height: 200,
      paddingTop: "0.4rem",
      paddingBottom: "0.4rem",
      paused: true,
      ease: "slow(0.7,0.7,false)",
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
/* الوان البار */
function barColor(color) {
  document.head.querySelector('[name="keywords"]').insertAdjacentHTML(
    "afterend",
    `

<meta name="theme-color" content=${color}>

<meta name="msapplication-navbutton-color" content=${color}>

<meta name="apple-mobile-web-app-status-bar-style" content=${color}>
`
  );
}
/* Copy Method */
function makeCopy(btn, textEl) {
  let the_azkar = textEl,
    textArea = document.createElement("textarea");
  if (typeof the_azkar === "object") {
    textArea.value = the_azkar.textContent;
  } else {
    textArea.value = the_azkar;
  }
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("Copy");
  btn.innerHTML = `<i class="fas fa-check add-animation-scale "></i>`;
  setTimeout((_) => {
    btn.innerHTML = `<i class="fas fa-copy add-animation-scale "></i>`;
  }, 2000);
  textArea.remove();
}
/* Add Color To Platte */
function addColorsToPlatte() {
  const platte_font_colors = document.querySelectorAll(
      ".dropdown-playlist .sound-item .list-colors .color-item"
    ),
    font_color = document.querySelectorAll(".font-change-color"),
    bg_color = document.querySelectorAll(".bg-change-color");
  platte_font_colors.forEach((plt) => {
    // ------
    plt.style.backgroundColor = plt.dataset.color;
    // ------
    plt.addEventListener("click", function (e) {
      e.preventDefault();
      // ------
      this.parentElement.querySelectorAll("li").forEach((co) => {
        co.classList.remove("active");
      });
      // ------
      this.classList.add("active");
      // ------
      if (this.parentElement.classList.contains("font-plt")) {
        // ------
        let selected = this.dataset.color;
        // ------
        data_font_color_bg.fontColor = selected;
        // ------
        getAndPutLocal("fc", data_font_color_bg.fontColor);
        // ------
        font_color.forEach((el) => {
          el.style.color = selected;
        });
        // ------
        if (selected === "default") {
          // ------
          font_color.forEach((el) => {
            el.style.color = "";
          });
        }
      } else {
        let selected = this.dataset.color;
        data_font_color_bg.bgColor = selected;
        getAndPutLocal("fb", data_font_color_bg.bgColor);
        bg_color.forEach((ele) => {
          ele.style.backgroundColor = selected;
        });
        if (selected === "default") {
          // ------
          bg_color.forEach((ele) => {
            ele.style.backgroundColor = "";
          });
        }
      }
    });
  });
}

/* Get And Set Style To LocalStorage */
function getAndPutLocal(sort, data_change) {
  let get_style = localStorage.getItem("styleAzkar");
  if (get_style != null) {
    let data = JSON.parse(get_style);
    if (sort == "fc") {
      data.fontColor = data_change;
    } else if (sort == "fs") {
      data.fontSize = data_change;
    } else if (sort == "fb") {
      data.bgColor = data_change;
    }
    localStorage.setItem("styleAzkar", JSON.stringify(data));
  } else {
    localStorage.setItem("styleAzkar", JSON.stringify(data_font_color_bg));
  }
}

/* Get And put them into the body */
function getFontColorBgSizeLocalStorage() {
  const platte_font_colors = document.querySelectorAll(
      ".dropdown-playlist .sound-item .list-colors .color-item"
    ),
    font_color = document.querySelectorAll(".font-change-color"),
    bg_color = document.querySelectorAll(".bg-change-color"),
    fonts_size = document.querySelectorAll(".font-change-size");

  /* Save Style To LocalStorage */
  let get_style = localStorage.getItem("styleAzkar");
  if (get_style != null) {
    let data_from_local = JSON.parse(get_style);
    // Add Active To Color In Platte From Local
    platte_font_colors.forEach((pl_c) => {
      // -----
      if (pl_c.parentElement.classList.contains("font-plt")) {
        if (pl_c.dataset.color == data_from_local.fontColor) {
          pl_c.parentElement.querySelectorAll("li").forEach((co) => {
            if (co.classList.contains("active")) {
              co.classList.remove("active");
            }
          });
          pl_c.classList.add("active");
        }
      } else {
        if (pl_c.dataset.color == data_from_local.bgColor) {
          pl_c.parentElement.querySelectorAll("li").forEach((co) => {
            if (co.classList.contains("active")) {
              co.classList.remove("active");
            }
          });
          pl_c.classList.add("active");
        }
      }
    });
    // Background Color
    // ------
    font_color.forEach((color) => {
      color.style.color = data_from_local.fontColor;
    });
    bg_color.forEach((color) => {
      color.style.backgroundColor = data_from_local.bgColor;
    });
    fonts_size.forEach((f) => {
      f.style.fontSize = data_from_local.fontSize + "px";
    });
    if (data_from_local.bgColor == "default") {
      // ------
      bg_color.forEach((color) => {
        color.style.backgroundColor = "";
      });
    }
    if (data_from_local.fontColor == "default") {
      font_color.forEach((color) => {
        color.style.color = data_from_local.fontColor;
      });
    }
  }
}
