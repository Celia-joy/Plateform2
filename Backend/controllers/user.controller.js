import User from "../models/User.js"

export const getUsers = async (req, res, next) => {
    try{
        const users = await User.find().select("-password")
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        })
    } 
    catch (error) {
        next(error)
    }
}
export const getUser = async (req, res, next) =>{
    try{
        if(req.params.id !== req.user._id.toString()){
            const error = new Error("You can only view your own profile")
            error.statusCode = 403
            throw error
        }
        const user = await User.findById(req.params.id).select("-password")
        if(!user){
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message:"User fetched successfully",
            data: user
        })
    }
    catch(error){
        next(error)
    }
}

export const updateMe = async (req, res, next) => {
    try {
        const { fullName } = req.body

        if (!fullName || !fullName.trim()) {
            const error = new Error('Name is required')
            error.statusCode = 400
            throw error
        }

        req.user.fullName = fullName.trim()
        await req.user.save()

        res.status(200).json({
            success: true,
            data: {
                _id: req.user._id,
                fullName: req.user.fullName,
                email: req.user.email,
                role: req.user.role,
            },
        })
    }
    catch (error) {
        next(error)
    }
}