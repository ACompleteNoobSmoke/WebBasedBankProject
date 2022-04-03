const express = require('express');
const BankUser = require('../model/BankUserModel');
const router = express.Router();

router.get('/:id/deposit', async(req, res) => {
    let user;
    try{
        user = await BankUser.findById(req.params.id);
        res.render('userView/transactionpage', {
            transactionType: "DEPOSIT",
            user: user,   
        });    
    }catch{
        if(user == null)
           return res.redirect('/');
        res.redirect(`/user/${user.id}/profilepage`);
    }
})

router.post('/:id/DEPOSIT', async(req, res) => {
    let user;
    try{
        user = await BankUser.findById(req.params.id);
        depositTransaction(req, user);
        await user.save();
        res.redirect(`/account/${user.id}/deposit`);
    }catch{
        if(user == null)
            return res.redirect('/');
        res.redirect(`/user/${user.id}/profilepage`);
    }
})

router.get('/:id/withdraw', async(req, res) => {
    let user;
    try{
        user = await BankUser.findById(req.params.id);
        res.render('userView/transactionpage', {
            transactionType: "WITHDRAW",
            user: user, 
        });
    }catch{
        if(user == null)
            return res.redirect('/');
        res.redirect(`/user/${user.id}/profilepage`);
    }
})

router.post('/:id/WITHDRAW', async(req, res) => {
    let user;
    try{
        user = await BankUser.findById(req.params.id);
        withdrawTransaction(req, user);
        await user.save();
        res.redirect(`/account/${user.id}/withdraw`);
    }catch{
        if(user == null)
            return res.redirect('/');
        res.redirect(`/user/${user.id}/profilepage`);
    }
})



/******************** Helper Methods(Start) ********************/

function transactionFunds(accountType, req, user){
    let currentAmount = ( accountType== "Checking") ? user.checking : user.saving;
    let transactionAmount = req.body.transactionAmount;
    return {
        "currentAmount" : convertToNumber(currentAmount),
        "transactionAmount": convertToNumber(transactionAmount)
    }
}

function depositTransaction(req, user){
    let accountType = req.body.accountType;
    let fundsObject = transactionFunds(accountType, req, user);
    let newAmount = additionFunction(fundsObject.currentAmount, fundsObject.transactionAmount);
    if(accountType == "Checking"){
        user.checking = newAmount;
        return;
    }
    user.saving = newAmount;   
}

function withdrawTransaction(req, user){
    let accountType = req.body.accountType;
    let fundsObject = transactionFunds(accountType, req, user);
    let newAmount = subtractionFunction(fundsObject.currentAmount, fundsObject.transactionAmount);
    if(accountType == "Checking"){
        user.checking = newAmount;
        return;
    }
    user.saving = newAmount;   
}

function convertToNumber(convertThis){
    return Number(convertThis);
}

function additionFunction(amount1, amount2){
    return amount1 + amount2;
}

function subtractionFunction(amount1, amount2){
    if(amount2 <= amount1){
        return amount1 - amount2;
    }
    return amount1;
}

/******************** Helper Methods(End) ********************/

module.exports = router;

