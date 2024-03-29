const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/registration', (req, res) => {
    res.render('bankView/registrationpage', {errorMessage: ''});
})

router.get('/login', (req, res) => {
    res.render('bankView/loginpage', {errorMessage: ''});
})



module.exports = router;