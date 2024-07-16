/**
 * TODO : ADD RESET PASSWORD AND RESEND EMAIL
 */
const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const hashPassword = require("../service/hashPassword");
const sendEmail = require("../service/sendEmail");
const { default: mongoose } = require("mongoose");
const router = express.Router();

require("dotenv").config();

const secretKey = process.env.JWT_SECRET;

router.get('/user', async (req , res)=>{
    try{
        const cookie = req.cookies['authToken']
        if(!cookie){
            return res.status(500).json({
                message : 'no cookie'
            })
        }
        const claims = jwt.decode(cookie , secretKey )
        if(!claims){
            return res.status(401).json({
                message : 'user not authorized'
            })
        }
        const user = await User.findById(claims.id)
        const { password: userPassword,verificationToken ,verificationTokenExpireDate, ...data } = user.toObject();

        res.json({ user: data });

    }catch(e){
        return res.status(401).json({
            message:"unauthenticated"
            
        })
    }
})




router.post("/login", async (req, res) => {
    let { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ message: "Email or password is wrong" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
        return res.status(400).json({ message: "Email or password is wrong" });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        secretKey,
        { expiresIn: process.env.JWT_EXPIRE_IN }
    );

    res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        //sameSite: "strict",
        maxAge : 1000 * 60 * 60 * 24 * 15 //15 days
    });

    const { password: userPassword,verificationToken ,verificationTokenExpireDate, ...data } = user.toObject();

    return res.status(200).json({
        message: "the user is successfully in ",
        ok: true,
        user: data,
    });
});

router.post("/register", async (req, res) => {
    
    const { name, email, age, password } = req.body;

    const emailExists = await isEmailExist(email);
    if (emailExists) {
        return res.status(400).json({ message: "Email already exists" });
    }

    //hash password to store it in database
    const hashedPassword = await hashPassword(password);

    //create user
    let user = new User({
        name: name,
        email: email,
        age: age,
        password: hashedPassword,
        role: "user",
    });

    //token to verify the email before send in it
    const token = jwt.sign(
        { id: user.id, email: user.email },
        secretKey,
        { expiresIn: parseInt(process.env.JWT_VERIFY_EMAIL_EXPIRE_AFTER),}
    );

    const expireDate = parseInt(process.env.JWT_VERIFY_EMAIL_EXPIRE_AFTER);

    if (isNaN(expireDate)) {
        return res
            .status(415)
            .json({ message: "type error in expire date from security token" });
    }

    user.verificationToken = token;
    user.verificationTokenExpireDate = Date.now() + expireDate * 1000;

    //style and email info
 


    const object = "Verify Email";
    const verifyLink = `${process.env.FRONT_END_URL}/verify?token=${token}&userId=${user.id}`;
    const message = `
      
        Hi ${user.name},
  
        We just need to verify your email address before you can continue.
  
        Verify your email address <a href="${verifyLink}">Link</a>
  
        Thanks! The [company] team
      
    `;

    await sendEmail(email, object, message);

    await user.save();

    res.status(200).json({ message: "Verification email sent!" });
});

router.post("/verify/:id/:token", async (req, res) => {
    const { id, token } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (Date.now() > user.verificationTokenExpireDate) {
            return res.status(400).json({ message: "The link is expired" });
        }

        try {
            const decoded = jwt.verify(token, secretKey);
            if (decoded.id !== user._id.toString() || decoded.email !== user.email) {
                return res.status(400).json({ message: "Invalid verification link" });
            }
        } catch (error) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        if (user.verificationToken !== token) {
            return res.status(400).json({ message: "Invalid verification link" });
        }

        user.verified = true;
        user.verificationToken = null;
        user.verificationTokenExpireDate = null;
        await user.save();


        const token = jwt.sign(
            { id: user.id, email: user.email },
            secretKey,
            { expiresIn: process.env.JWT_EXPIRE_IN }
        );
        
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            //sameSite: "strict",
            maxAge : 1000 * 60 * 60 * 24 * 15 //15 days
        });

        return res.status(200).json({ message: "User verified successfully" , user:user , ok:true});
    } catch (error) {
        return res.status(500).json({ message: "Error verifying user", error });
    }
});

router.post('/logout',(res , req)=>{
    res.cookie('authToken' , {maxAge:0})
})


async function isEmailExist(email) {
    try {
        // Find a user with the provided email
        const existingUser = await User.findOne({ email: email });
        
        // Return true if a user is found, false otherwise
        return existingUser ? true : false;
    } catch (error) {
        console.error("Error checking email existence:", error);
        throw error; // Re-throw the error for appropriate handling
    }
}

module.exports = router;
