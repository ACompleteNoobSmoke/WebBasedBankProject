const express = require('express');
const BankUser = require('../model/BankUserModel');
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
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
        let accountType = req.body.accountType;
        let transactionAmount = req.body.transactionAmount;
        depositTransaction(accountType, transactionAmount, user);
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
        let accountType = req.body.accountType;
        let transactionAmount = req.body.transactionAmount;
        withdrawTransaction(accountType, transactionAmount, user)
        await user.save();
        res.redirect(`/account/${user.id}/withdraw`);
    }catch{
        if(user == null)
            return res.redirect('/');
        res.redirect(`/user/${user.id}/profilepage`);
    }
})

router.get('/:id/transfer', async (req, res) => {
    let user;
    try{
        user = await BankUser.findById(req.params.id);
        res.render('userView/transactionpage', {
            transactionType: "TRANSFER",
            user: user, 
        });
    }catch{
        if(user == null)
            return res.redirect('/')
        res.redirect(`/user/${user.id}/profilepage`);
    }
})

router.post('/:id/transfer', async(req, res) => {
    let user;
    try{
        user = await BankUser.findById(req.params.id);
        transferTransaction(req, user);
        await user.save();
        res.redirect(`/account/${user.id}/transfer`);
    }catch{
        if(user == null)
            return res.redirect('/');
        res.redirect(`/user/${user.id}/profilepage`);
    }
})

router.get('/:id/edit', async(req, res) => {
    let user;
    try {
        user = await BankUser.findById(req.params.id);
        res.render('userView/editpage', {user:user});
    } catch {
        if(user == null)
            return res.redirect('/');
        res.redirect(`/user/${user.id}/profilepage`);
    }
})

router.post('/:id/edit', async(req, res) => {
    let user;
    try {
        user = await BankUser.findById(req.params.id);
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let avatarCover = req.body.cover;
        editFunction(firstName, lastName, avatarCover, user);
    } catch {
        if(user == null)
            return res.redirect('/');
        res.redirect(`/user/${user.id}/profilepage`);
    }
})



/******************** Helper Methods(Start) ********************/

function editFunction(firstName, lastName, avatarCover, user){
    if(firstName !== '' && firstName !== user.firstName){
        user.firstName = firstName;
    }else if(lastName !== '' && lastName !== user.lastName){
        user.lastName = lastName;
    }
    saveCover(user, avatarCover);
}

function transactionFunds(transactionAmount, user){
    return {
        "checkingAmount" : convertToNumber(user.checking),
        "savingAmount": convertToNumber(user.saving),
        "transactionAmount": convertToNumber(transactionAmount)
    };
}

function depositTransaction(accountType, transactionAmount, user){
    let fundsObject = transactionFunds(transactionAmount, user);
    let currentAmount = (accountType == 'Checking') ? fundsObject.checkingAmount : fundsObject.savingAmount;
    let resultAmount = additionFunction(currentAmount, fundsObject.transactionAmount);
    if(accountType == 'Checking'){
        user.checking = resultAmount;
        return;
    }
    user.saving = resultAmount;  
}

function withdrawTransaction(accountType, transactionAmount, user){
    let fundsObject = transactionFunds(transactionAmount, user);
    let currentAmount = (accountType == 'Checking') ? fundsObject.checkingAmount : fundsObject.savingAmount;
    let resultAmount = subtractionFunction(currentAmount, fundsObject.transactionAmount);
    if(accountType == 'Checking'){
        user.checking = resultAmount;
        return;
    }
    user.saving = resultAmount
}

function transferTransaction(req, user){
    let accountType = req.body.accountType;
    let otherAccount = (accountType == 'Checking') ? 'Saving' : 'Checking';
    let currentAmount = (accountType == 'Checking') ? user.checking : user.saving;
    let transactionAmount = req.body.transactionAmount;
    if(transactionAmount <= currentAmount){
      withdrawTransaction(accountType, transactionAmount, user);
      depositTransaction(otherAccount, transactionAmount, user);  
    } 
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

