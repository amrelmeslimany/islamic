export class ARTICLESS {
    constructor() {
        // ! Articles (Title And Body)
        /*
        *   لاضافه مقاله او لمسح مقاله
        *   title  ستضع عنوان المقاله فى 
        *   body وتضع جسم المقاله فى ال  
        *   {} وهما الاثنين تضعهم بين هذين القوسين
        *   ,  وتفرق بين مقاله ومقاله بالعلامه الفصله هذة 
        !   ملاحظات :
        ?   يجب ان يكون عنوان المقاله مثل الذى ستضعه فى اللينك فى صفحة المقالات                          -
        ?  عند (صندوق المقالات الاخرى) the-article ستجد شرح كيف تضف عنوان المقاله فى اللينك فى صفحه     -
        *   شرح مختصر كيف تضع عنوان المقاله فى اللينك او الراابط
        * 1 ) the-article.html اسم الصفحه والذى سكيون  href  ستضع فى 
        * 2 ) (the-article?title=articel name) : ستضع بعد اسم الصفحه علامه استفهام + كلمه (تايتل) +عنوان المقاله ---- مثال
        *   سيكون الرابط هكذا
        *   <a href="the-article.html?title=المقاله واحد"></a>
        */
        this.articles = [{
                title: "المقاله واحد",
                body: `
        هذة تكون المقاله الاولي او المقاله واحد أتيه من رابط الموقع            
        هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى
        المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى <b>المقاله</b> الذى سيتم بطه كتابته هنا
        يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته
        هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم
        كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى
        سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله
        الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى
        المقاله الذى سيتم كتابته
    
    `
            },
            {
                title: "المقاله اثنين",
                body: `
        هذة تكون المقاله الثانيه او المقاله اثنان أتيه من رابط الموقع            
        هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى
        المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم بطه كتابته هنا
        يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته
        هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم
        كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى
        سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله
        الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى
        المقاله الذى سيتم كتابته
    
    `
            },
            {
                title: "المقاله ثلاثه",
                body: `
        هذة تكون المقاله الثالثه او المقاله ثلاثه أتيه من رابط الموقع            
        هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى
        المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم بطه كتابته هنا
        يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته
        هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم
        كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى
        سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله
        الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى المقاله الذى سيتم كتابته هنا يكون محتوى
        المقاله الذى سيتم كتابته
    
    `
            }
        ];
    }
    get getArticles() {
        return this.articles;
    }
}