const express = require('express');
const router = express.Router();
const { check , validationResult} = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
// @route  POST /todos
// @desc   Test route
// @access PUblic


router.post('/', [check('name', 'Name is required').not().isEmpty(),
     check('email', 'Please include a valid email').isEmail(),
     check('password', 'Please enter a password with 6 or more characters').isLength({
        min : 6
     })

], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({ errors });
    }
    console.log(req.body);
    const { name , email, password} = req.body;
    try{
        let user = await User.findOne({ email : email });
        console.log(' User ', user);
        if(user)
        {
            return res.status(400).json({msg : 'User already exists '});
        }

        user = new User({
            name ,
            email ,
            password
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        console.log('User Password' , user);
        await user.save();
        return res.status(200).json("User registered ");

    }
    catch(err)
    {
        console.log(err.message);
        res.status(500).send('Server error');
    }
    
})

module.exports = router;