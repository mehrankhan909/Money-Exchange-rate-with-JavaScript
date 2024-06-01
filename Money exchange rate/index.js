const BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=cur_live_S9r6nGbWrbW4GGAoyiL2Tq8bef8K9lKPIamQpYgP&currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const toCurr = document.querySelector("#to");
const msg = document.querySelector(".peak");

for (let select of dropdowns) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      newOption.classList.add("country");
      select.append(newOption);
    }
    }

    const updateExchangeRate = async () => {
        let amount = document.querySelector(".input");
        let amtVal = amount.value;
        try{
          if (amtVal === "" || amtVal < 1) {
            amtVal = 1;
            amount.value = "1";
          }
          if (Number(amtVal) > 0) {
          const fromCurr = document.querySelector("#from");
        console.log(fromCurr.value)
        const URL = `${BASE_URL}=${toCurr.value.toUpperCase()}&base_currency=${fromCurr.value.toUpperCase()}`;
        let response = await fetch(URL);
        let data = await response.json();
        let insideData = JSON.parse(JSON.stringify(data.data));
        let value = insideData[`${toCurr.value}`]["value"];
        let finalAmount = (amtVal * value).toFixed(4);
        
        msg.innerText = `${amtVal} ${fromCurr.value.toUpperCase()} = ${finalAmount} ${toCurr.value}`;
        }else {
          msg.innerText = "Invalid input value. Please enter a number greater than 0.";
        }
      }
        catch(db){
          msg.innerText = "Something went wrong or maybe your package is finished";
        }
};
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
  });

