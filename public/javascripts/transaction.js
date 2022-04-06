if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

function ready(){
    let accountType = document.getElementById("accountType");
    let pageHeaders = document.getElementsByClassName('page-header')[0];
    let pageheaderArray = ['PROFILE', 'DEPOSIT', 'WITHDRAW', 'TRANSFER', 'EDIT PROFILE'];
    accountChange(pageHeaders, accountType);
    modifyHeaderNav(pageHeaders, pageheaderArray);
}

function modifyHeaderNav(pageHeaders, pageheaderArray){
    let headerLinks = document.getElementsByClassName('header-links')[0];
    if(pageheaderArray.includes(pageHeaders.innerHTML)){
        console.log(pageHeaders.innerHTML);
        headerLinks.style.visibility = "hidden";
    }else{
        headerLinks.style.visibility = "visible";
    }
}


function accountChange(pageHeaders, accountType){
    let transactionHeader = ['DEPOSIT', 'WITHDRAW', 'TRANSFER'];
    if(transactionHeader.includes(pageHeaders.innerHTML)){
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
}