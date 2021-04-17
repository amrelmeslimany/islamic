let fixd;
class Hijri {
    constructor(year, month, day) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.toFixed = this.hijriToFixed;
        this.toString = this.hijriToString;
    }
    hijriToFixed() {
        return (
            this.day +
            Math.ceil(29.5 * (this.month - 1)) +
            (this.year - 1) * 354 +
            Math.floor((3 + 11 * this.year) / 30) +
            227015 -
            1
        );
    }
    hijriToString() {
        let months = new Array(
            "محرم",
            "صفر",
            "ربيع أول",
            "ربيع ثانى",
            "جمادى أول",
            "جمادى ثانى",
            "رجب",
            "شعبان",
            "رمضان",
            "شوال",
            "ذو القعدة",
            "ذو الحجة"
        );
        return this.day + " " + months[this.month - 1] + " " + this.year;
    }

    static isGregLeapYear(year) {
        return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    }
    static gregToFixed(year, month, day) {
        let a = Math.floor((year - 1) / 4);
        let b = Math.floor((year - 1) / 100);
        let c = Math.floor((year - 1) / 400);
        let d = Math.floor((367 * month - 362) / 12);
        let e;
        if (month <= 2) e = 0;
        else if (month > 2 && this.isGregLeapYear(year)) e = -1;
        else e = -2;
        return 1 - 1 + 365 * (year - 1) + a - b + c + d + e + day;
    }
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

/* The Hijery Date */

function addDateHejryToPage() {
    let tod = new Date();
    let y = tod.getFullYear();
    let m = tod.getMonth();
    let d = tod.getDate();
    m++;
    fixd = Hijri.gregToFixed(y, m, d);
    let h = new Hijri(1421, 11, 28);
    h = fixedToHijri(fixd);
    document.querySelector(".calender-hejry").insertAdjacentHTML("beforeend", `<span class="hjr-date">${h.toString()}</span>`);
}