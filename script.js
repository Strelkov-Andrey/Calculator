let sbp = [0.7,0.4,0.2];
let digital_rub = [0.3,0.2];
let equiring = 2.5;

//var sum = 100000;

var res_sbp;
var res_dr;
var res_eq;

//const type = 4.1;
//const period = 3;


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
        const sum = Number(document.getElementById('amount').value);

        const result = calculate(
            type,
            period,
            sum
        );
        localStorage.setItem(
            'calcResult',
            JSON.stringify({
                result,
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
    switch (type) {
    case 2.1:
    case 2.2:
    case 2.3:
    case 2.4:
    case 2.5:
    case 2.6:
    case 2.7:
    case 2.8:
    case 2.9:
        res_sbp = period * (sum * sbp[1] / 100),
        res_dr = period * (sum * digital_rub[0] / 100),
        res_eq = period * (sum * equiring / 100)
        return {res_sbp,res_dr,res_eq};

    case 3.1:
        res_sbp = period * (sum * sbp[0] / 100),
        res_dr = period * (sum * digital_rub[0] / 100),
        res_eq = period * (sum * equiring / 100)
        return {res_sbp,res_dr,res_eq};

    case 4.1:
        res_sbp = period * (sum * sbp[2] / 100),
        res_dr = period * (sum * digital_rub[1] / 100),
        res_eq = period * (sum * equiring / 100)
        return {res_sbp,res_dr,res_eq};
  default:
    console.log("Error");
}
}

function getType(type){
    switch (type) {
    case 2.1:
        return "Образование"
    case 2.2:
        return "Благотворительность"
    case 2.3:
        return "Транспорт"
    case 2.4:
        return "Телеком"
    case 2.5:
        return "Потребительские товары"
    case 2.6:
        return "Медицина"
    case 2.7:
        return "Страхование"
    case 2.8:
        return "Инвестиционные фонды, УК, НПФ"
    case 2.9:
        return "Самозанятый"
    case 3.1:
        return "ЖКХ"
    case 4.1:
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
