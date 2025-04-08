const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
	try {
		//get email from req body
		const email = req.body.email;
		//check user for this email, email validation
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.json({
				success: false,
				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
			});
		}
		//generate token
		const token = crypto.randomUUID();
		//update user by adding token and expiration time
		const updatedDetails = await User.findOneAndUpdate(
			{ email: email },
			{
				token: token,
				resetPasswordExpires: Date.now() + 5*60*1000,
			},
			{ new: true }
		);
		console.log("DETAILS", updatedDetails);
		//create url
		const url = `http://localhost:3000/update-password/${token}`;
		//send mail containing the url
		await mailSender(
			email,
			"Password Reset",
			`Your Link for email verification is ${url}. Please click this url to reset your password.`
		);

		return res.json({
			success: true,
			message:
				"Email Sent Successfully, Please Check Your Email to Continue Further",
		});
	} catch (error) {
		console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while sending reset password mail",
        })
	}
};

exports.resetPassword = async (req, res) => {
	try {
		//data fetch
		const { password, confirmPassword, token } = req.body; //frontend ne token dala hai body ke andar

		//validation
		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}

		//get userDetails from db using token
		const userDetails = await User.findOne({ token: token });
		//if no entry - invalid token
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}
		//token time check
		if (userDetails.resetPasswordExpires < Date.now()) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}

		//hashing password
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		//return response
        return res.status(200).json({
            success:true,
            message:"Password reset successfully",
        })
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Something went wrong while Updating the Password`,
		});
	}
};