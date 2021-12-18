const select = document.querySelectorAll('.currency');
const btn = document.getElementById('btn');
const num = document.getElementById('num');
const ans = document.getElementById('ans');
let map = new Map();

fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then((data) => data.json())
    .then((data) => {
        display(data);
    });

function display(data) {
    const bitcoin = data.chartName;
    select[0].innerHTML += `<option value = "${bitcoin}">${bitcoin}</option>`;
    select[1].innerHTML += `<option value = "${bitcoin}">${bitcoin}</option>`;
    const currencies = Object.entries(data.bpi);
    for (let i = 0; i < currencies.length; i++) {
        map.set(currencies[i][0], currencies[i][1].rate_float);
        select[1].innerHTML += `<option value = "${currencies[i][0]}">${currencies[i][0]}</option>`
        select[0].innerHTML += `<option value = "${currencies[i][0]}">${currencies[i][0]}</option>`
    }
    map.set()
}

function convert(currency, anotherCurrency, input) {
    for (const [key, value] of map.entries()) {
        if (anotherCurrency === key) {
            anotherCurrency = value * input;
            ans.value = anotherCurrency.toString();
        } else if (anotherCurrency === "Bitcoin") {
            anotherCurrency = input / value;
            ans.value = anotherCurrency.toString();
        }
    }
}

btn.addEventListener('click', () => {
   let currency = select[0].value;
   let anotherCurrency = select[1].value;
   let input = num.value;
   console.log(currency);

   if (currency !== anotherCurrency && input > 0 && input.toString() !== "") {
       convert(currency, anotherCurrency, input);
   } else if (input < 0 || input.toString() === "") {
       alert("Please enter some value which is bigger or equal to 0 or just a number");
   } else if (currency !== "Bitcoin" || anotherCurrency !== "Bitcoin") {
       alert("Choose different currencies please!");
   } else {
       alert("Choose different currencies please!");
   }
});