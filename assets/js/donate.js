
// FAQ摺疊
const chevron = document.querySelectorAll(".FAQ__chevron__left");
const faqQuestion = document.querySelectorAll(".FAQ__content__items__question");
const faqAnswer = document.querySelectorAll(".FAQ__content__items__answer");


faqQuestion.forEach(function (item, index) {
    item.addEventListener('click', function (e) {
        if (chevron[index].classList.contains('FAQarrowOpen')) {
            chevron[index].classList.remove('FAQarrowOpen');
            faqAnswer[index].classList.add('FAQclose');
            faqAnswer[index].classList.remove('FAQopen');
        } else {
            chevron[index].classList.add('FAQarrowOpen');
            faqAnswer[index].classList.remove('FAQclose');
            faqAnswer[index].classList.add('FAQopen');

        }
    });
});
