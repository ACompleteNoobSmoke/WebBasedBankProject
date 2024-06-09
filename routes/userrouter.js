const express = require('express');
const BankUser = require('../model/BankUserModel');
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
const router = express.Router();

//Route to check the login information passed
//Finds user from Database
router.post('/logininfo', async(req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;
    const user = await BankUser.findOne({
        "userName": userName.toString(),
        "passWord": password.toString()
    })

    let redirect = (user != null) ? `/api/v1/${user.id}/profilepage` :'/api/v1/login'

    res.redirect(redirect);
})


//Route to register the user information
router.post('/registerinfo', async(req, res) => {
    console.log(req.body);
    const exists = await userExists(req.body.userName)
    if(!exists){
        const newBankUser = new BankUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            passWord: req.body.password,
            checking: 2000,
            saving: 2000
        })
        saveCover(newBankUser, req.body.cover)
        try{
            const user = await newBankUser.save();
            return res.redirect(`/api/v1/${user.id}/profilepage`);
        }catch{
           return res.redirect('/api/v1/registration')
        }
    } 
    res.redirect('/api/v1/registration')
})

//Route to the user profile page
router.get('/:id/profilepage', async (req, res) => {
    try{
        const user = await BankUser.findById(req.params.id);
        res.render('userView/profilepage', {user: user});
    }catch{
        console.log('err')
    }
})


/******************** Helper Methods(Start) ********************/

async function userExists(userName){
    let exists = false;
    userName = userName.toUpperCase();
    const existingUsers =  await BankUser.find({});
    existingUsers.forEach(user => {
        if(userName === user.userName.toUpperCase()) exists = true; 
    })
   return exists;
}


function saveCover(bankUser, coverEncoded){
    if(coverEncoded == null) return;
    const cover = JSON.parse(coverEncoded)
    if(cover != null && imageMimeTypes.includes(cover.type)){
        bankUser.coverImage = new Buffer.from(cover.data, 'base64')
        bankUser.coverImageType = cover.type
    }
}

/******************** Helper Methods(End) ********************/

module.exports = router;