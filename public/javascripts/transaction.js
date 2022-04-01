if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

function ready(){
    let accountType = document.getElementById("accountType");
    accountChange(accountType);
}



function accountChange(accountType){
    let currentAmountChecking = document.getElementById("current-amount-checking");
    let currentAmountSaving = document.getElementById("current-amount-saving");
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