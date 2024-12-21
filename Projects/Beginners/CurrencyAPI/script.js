const fromAmount = document.querySelector('.amount'); //uper ka input
const convertedAmount = document.querySelector('.convertedAmount'); // niche ka input
const fromCurrency = document.querySelector('.fromCurrency'); //uper ka select
const toCurrency = document.querySelector('.toCurrency');
//niche ka select
const result = document.querySelector('.result'); //result
const converterContainer = document.querySelector('.converter-container');

//Array of currencies 
const countries = [
    { code: "USD", name: "United States Dollar" },
    { code: "INR", name: "Indian Rupee" },
    { code: "AED", name: "United Arab Emirates Dirham" },
    { code: "AFN", name: "Afghan Afghani" },
    { code: "ALL", name: "Albanian Lek" },
    { code: "DZD", name: "Algerian Dinar" },
    { code: "ARS", name: "Argentine Peso" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "AZN", name: "Azerbaijani Manat" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "BGN", name: "Bulgarian Lev" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CLP", name: "Chilean Peso" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "COP", name: "Colombian Peso" },
    { code: "CZK", name: "Czech Koruna" },
    { code: "DKK", name: "Danish Krone" },
    { code: "EGP", name: "Egyptian Pound" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound Sterling" },
    { code: "HUF", name: "Hungarian Forint" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "ILS", name: "Israeli New Shekel" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "KES", name: "Kenyan Shilling" },
    { code: "KRW", name: "South Korean Won" },
    { code: "KWD", name: "Kuwaiti Dinar" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "MYR", name: "Malaysian Ringgit" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "PEN", name: "Peruvian Nuevo Sol" },
    { code: "PHP", name: "Philippine Peso" },
    { code: "PLN", name: "Polish Zloty" },
    { code: "QAR", name: "Qatari Rial" },
    { code: "RON", name: "Romanian Leu" },
    { code: "RUB", name: "Russian Ruble" },
    { code: "SAR", name: "Saudi Riyal" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "THB", name: "Thai Baht" },
    { code: "TRY", name: "Turkish Lira" },
    { code: "TWD", name: "Taiwan Dollar" },
    { code: "UAH", name: "Ukrainian Hryvnia" },
    { code: "UGX", name: "Ugandan Shilling" },
    { code: "VND", name: "Vietnamese Dong" },
    { code: "ZAR", name: "South African Rand" }
];

//showing the currencies in the select tag
countries.forEach( country => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');

    option1.value = option2.value = country.code;
    option1.textContent =  option2.textContent =`${country.code} (${country.name})`;

    //fromCurrency - uper ka input ka select
    fromCurrency.appendChild(option1);
    //toCurrency - niche ka input ka select
    toCurrency.appendChild(option2);

    //setting default values
    fromCurrency.value = "USD";
    toCurrency.value = "INR";
});


// function to get Exchange rate using API
const getExchangeRate = async ()=>{

    result.textContent = `Fetching exchangerate........`;
    const amount = parseFloat(fromAmount.value);  //id floating value is given parsing it into normal value
    const fromCR = fromCurrency.value;
    const toCR = toCurrency.value;

    try {
         //Fetch data from API
    const response = await fetch(`https://open.er-api.com/v6/latest/${fromCR}`);
    const data = await response.json();
    
    const conversionRate = data.rates[toCR];
    const convertedAmt = (amount*conversionRate).toFixed(2);
    
    if(typeof conversionRate === 'undefined'){
        result.textContent = `Exchangerate  data for the selected country is not available`;
        convertedAmount = "";
    } else{
        convertedAmount.value = convertedAmt;
        result.textContent = `${amount} ${fromCR} = ${convertedAmt} ${toCR}`;
    }
    console.log(data);

    } catch (error) {
        converterContainer.innerHTML = `<h2>Error while fetching the exchange rates!!!</h2>`;
    }
   
}

getExchangeRate();
//fetching exchange rate when user inputs
fromAmount.addEventListener('input',getExchangeRate);

//fetching exchange rate when user change currency
fromCurrency.addEventListener('change',getExchangeRate);
toCurrency.addEventListener('change',getExchangeRate);

window.addEventListener('load',getExchangeRate);