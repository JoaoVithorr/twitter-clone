import User from '../models/user.model.js'

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


    } catch (error) {
        console.error(error.message)
    }
};

export const login = async (req, res) => {
    res.json({
        data: "You hit the login end point"
    })
};

export const logout = async (req, res) => {
    res.json({
        data: "You hit the logout end point"
    })
}
