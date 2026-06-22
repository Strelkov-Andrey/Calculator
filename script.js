let sbp = [0.7,0.4,0.2];
let digital_rub = [0.3,0.2];
let equiring = [1.2, 2.5];

//var sum = 100000;

var res_sbp;
var res_dr;
var res_eq_min;
var res_eq_max;

//const type = 4.1;
//const period = 3;
document
    .getElementById('calculatorForm')
    .addEventListener('submit', function(event) {

        const selectedType =
            document.querySelector('input[name="type"]:checked');

        const error =
            document.getElementById('activityError');

        if (!selectedType) {

            event.preventDefault();

            error.classList.add('show');

            document
                .querySelector('.type-list')
                .scrollIntoView({
                    behavior:'smooth',
                    block:'center'
                });

            return;
        }

        error.classList.remove('show');
});

document
.querySelectorAll('.activity-group')
.forEach(group => {

    group.addEventListener('toggle', function () {

        if (!this.open) return;

        document
            .querySelectorAll('.activity-group')
            .forEach(other => {

                if (other !== this) {
                    other.removeAttribute('open');
                }

            });

    });

});

document
    .querySelectorAll('input[name="type"]')
    .forEach(radio => {

        radio.addEventListener('change', function() {

            const activityName =
                this.closest('.radio-item')
                    .querySelector('span')
                    .textContent
                    .trim();

            // Обновляем главный блок выбора
            document.getElementById(
                'selectedActivity'
            ).textContent =
                'Выбрано: ' + activityName;

            // Очищаем все подписи групп
            document
                .querySelectorAll('.selected-item')
                .forEach(item => {
                    item.textContent = '';
                });

            // Ищем родительскую группу
            const group =
                this.closest('.activity-group');

            // Если пункт находится внутри details
            if (group) {

                const badge =
                    group.querySelector('.selected-item');

                if (badge) {
                    badge.textContent =
                        '✓ ' + activityName;
                }

            }

        });

    });

    


document
    .getElementById('calculatorForm')
    .addEventListener('submit', function(e) {

        e.preventDefault();

        const type = Number(
            document.querySelector(
                'input[name="type"]:checked'
            ).value
        );
        const period = Number(
            document.querySelector(
                'input[name="period"]:checked'
            ).value
        );
        const sum = Number(document.getElementById('amount').dataset.rawValue);

        const result = calculate(
            type,
            period,
            sum
        );
        
        
let sbpTariff;
let drTariff;
let eqTariff_min = equiring[0];
let eqTariff_max = equiring[1];

switch (type) {

    case 211:
    case 212:
    case 213:
    case 214:
    case 215:
    case 216:
    case 217:
    case 218:    
    case 221:
    case 222:
    case 223:
    case 224:
    case 231:
    case 232:
    case 241:
    case 242:
    case 243:
    case 244:
    case 245:
    case 246:
    case 247:
    case 25:
    case 26:
    case 27:
    case 28:
        sbpTariff = sbp[1];
        drTariff = digital_rub[0];
        break;

    case 31:
        sbpTariff = sbp[0];
        drTariff = digital_rub[0];
        break;

    case 41:
        sbpTariff = sbp[2];
        drTariff = digital_rub[1];
        break;
}
        localStorage.setItem(
            'calcResult',
            JSON.stringify({
                result,
                sbpTariff,
                drTariff,
                eqTariff_min,
                eqTariff_max,
                amount: sum,
                period: period,
                type: type,
             amountFormatted:
            sum.toLocaleString('ru-RU') + ' ₽',

        periodName:
            getPeriod(period),

        typeName:
            getType(type)
    })
            
        );
         
        window.location.href = 'result.html';
    });
function calculate(type, period, sum){
    res_eq_min = period * (sum * equiring[0] / 100);
	res_eq_min = res_eq_min * (1 + 22 / 100 );
    res_eq_max = period * (sum * equiring[1] / 100);
	res_eq_max = res_eq_max * (1 + 22 / 100 );
    switch (type) {
    case 211:
    case 212:
    case 213:
    case 214:
    case 215:
    case 216:
    case 217:
    case 218:    
    case 221:
    case 222:
    case 223:
    case 224:
    case 231:
    case 232:
    case 241:
    case 242:
    case 243:
    case 244:
    case 245:
    case 246:
    case 247:
    case 25:
    case 26:
    case 27:
    case 28:
        res_sbp = period * (sum * sbp[1] / 100),
        res_dr = period * (sum * digital_rub[0] / 100)
        return {res_sbp,res_dr,res_eq_min, res_eq_max};

    case 31:
        res_sbp = period * (sum * sbp[0] / 100),
        res_dr = period * (sum * digital_rub[0] / 100)
        return {res_sbp,res_dr,res_eq_min, res_eq_max};

    case 41:
        res_sbp = period * (sum * sbp[2] / 100),
        res_dr = period * (sum * digital_rub[1] / 100)
        return {res_sbp,res_dr,res_eq_min, res_eq_max};
  default:
    console.log("Error");
}
}

function getType(type){
    switch (type) {
    case 211:
        return "Служба скорой помощи"
    case 212:
        return "Медицинское оборудование и расходные материалы"
    case 213:
        return "Услуги врачей"
    case 214:
        return "Оптика, оптические товары и очки"
    case 215:
        return "Госпитали, больницы"
    case 216:
        return "Школы, колледжи, университеты профессиональные училища"
    case 217:
        return "Иные учебные заведения"
    case 218:
        return "Услуги ухода за детьми"
    case 221:
        return "Пригородные и местные пассажирские перевозки, включая электропоезда, маршрутные такси"
    case 222:
        return "Регулярные пассажирские автобусные перевозки"
    case 223:
        return "Такси"
    case 224:
        return "АЗС"
    case 231:
        return "Услуги связи"
    case 232:
        return "Услуги телеграфной связи"
    case 241:
        return "Предприятия быстрого питания, закусочные, буфеты"
    case 242:
        return "Бытовая техника и электроника"
    case 243:
        return "Бакалейные магазины, супермаркеты, универмаги, оптово-розничные гипермаркеты"
    case 244:
        return "Одежда и аксессуары, обувные магазины"
    case 245:
        return "Магазины спорттоваров"
    case 246:
        return "Товары для дома, магазины игрушек"
    case 247:
        return "Книжные магазины"
    case 25:
        return "Благотворительные, общественные организации,социальные службы"
    case 26:
        return "Страхование"
    case 27:
        return "Инвестиционные фонда, УК, НПФ"
    case 28:
        return "Аптеки"
    case 41:
        return "ЖКУ"
    case 31:
        return "Иное"
  default:
    console.log("Error");
}
}
function getPeriod(period){
    switch (period) {
    case 1:
        return "Месяц"
    case 3:
        return "Квартал"
    case 12:
        return "Год"
  default:
    console.log("Error");
}
}
