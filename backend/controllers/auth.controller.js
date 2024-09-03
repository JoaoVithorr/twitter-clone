import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';

export const signup = async (req, res) => {
    try {
        const {username, fullName, email, password} = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if(!emailRegex.test(email)) {
            return res.status(400).json({error: "Invalid email format."})
        }

        const existingUser = await User.findOne({ username });
        if(existingUser) {
            return res.status(400).json({error: "Username is already in use."})
        }

        const existingEmail = await User.findOne({ email });
        if(existingEmail) {
            return res.status(400).json({error: "Email is already in use."})
        }

        if(password.lenght < 6) {
            return res.status(400).json({error: "Password must have at least 6 characters"})
        }

        // encrypting passwords
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt) // using the salt variable to define how much rounds of encrypting

        const newUser = new User({
            fullName: fullName,
            username: username, 
            email: email, 
            password: hashPassword
        });

        if(newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save(); 

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
                bio: newUser.bio, 
                link: newUser.link,
                followers: newUser.followers,
                following: newUser.following
        })} else {
            res.status(400).json({error: "Invalid user data"})
        }

    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
};

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid credentials"})
        };

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profileImg: newUser.profileImg,
            coverImg: newUser.coverImg,
            bio: newUser.bio, 
            link: newUser.link,
            followers: newUser.followers,
            following: newUser.following
        })

    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0
        })
        res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({error: "Internal server error"})
    }
};