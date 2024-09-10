import User from "../models/user.model";

export const getUserProfile = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username }).select("-password")
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }
        return res.status(200).json({user})
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
};

export const followUnfollowUser = async (req, res) => {
    try {
        
    } catch (error) {
        return  res.status(500).json({error: "Internal server error"})
    }   
}