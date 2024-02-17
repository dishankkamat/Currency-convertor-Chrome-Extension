const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for(let select of dropdowns)
{
    for ( currcode in countryList)
    {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value=currcode;
        if(select.name == "from" && currcode == "USD")
        {
            newoption.selected= "selected";
        }
        else if (select.name == "to" && currcode == "INR")
        {
            newoption.selected= "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};



const updateexchangerate = async() =>{
    let amount = document.querySelector(".amount input");
    let amountvalue = amount.value;
    console.log(amountvalue);
    if(amountvalue =="" || amountvalue <1){
        amountvalue =1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let Data = await response.json();
    let rate = Data[tocurr.value.toLowerCase()];
    
    

    let finalamount = amountvalue * rate;
    msg.innerText = `${amountvalue} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
};

window.addEventListener("load", () =>{
    updateexchangerate();
});

btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    updateexchangerate();
    
});