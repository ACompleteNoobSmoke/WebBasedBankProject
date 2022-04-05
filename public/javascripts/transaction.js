if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

function ready(){
    let accountType = document.getElementById("accountType");
    //let amountElement = document.getElementsByName("transactionAmount")[0];
    accountChange(accountType);
    //amountMinMax(amountElement);
}



function accountChange(accountType){
    let currentAmountChecking = document.getElementById("current-amount-checking");
    let currentAmountSaving = document.getElementById("current-amount-saving");
    console.log(currentAmountChecking);
    console.log(currentAmountSaving)
    currentAmountSaving.style.display = "none";
    accountType.addEventListener("change", e => {
        if(e.target.value == 'Saving'){
            currentAmountChecking.style.display = "none";
            currentAmountSaving.style.display = "block";
        }else{
            currentAmountChecking.style.display = "block";
            currentAmountSaving.style.display = "none";
        }
    })
}

// function amountMinMax(accountType){
//     let transactionType = document.getElementById("transactionType").innerHTML;
//     let currentAmountChecking = document.getElementById("current-amount-checking");
//     let currentAmountSaving = document.getElementById("current-amount-saving");
//     let checkingAmount = parseInt(currentAmountChecking.innerHTML.split("$")[1]);
//     let savingAmount = parseInt(currentAmountSaving.innerHTML.split("$")[1]);
//     let checkingDisplay = currentAmountChecking.style.display;
//     let savingDisplay = currentAmountSaving.style.display;
//     console.log(checkingAmount);
//     accountType.addEventListener('input', () => {
//         let v = parseInt(this.value);
//         if(transactionType == 'DEPOSIT'){
//             if (v > 2000) this.value = 2000;
//         }else{
//             if(checkingDisplay === 'block'){
//                 if(v > checkingAmount) this.value = checkingAmount;
//             }else if(savingDisplay === 'block'){
//                 if(v > savingAmount) this.value = savingAmount;
//             }
//         }
//     })
// }