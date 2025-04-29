import { User } from "../models/User.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, phone, college_name, program, program_type } = req.body;

        console.debug("user credential received ==> ", req.body)
        if (!name || !email || !phone || !college_name || !program || !program_type) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const exisitingUser = await User.findOne({ $or: [{ email }, { phone }] })
        
        console.debug("exisitingUser found ==> ", exisitingUser)
        if (exisitingUser) {
            return res.status(400).json({ message: "User already exists", success: false });
        }
        
        const user = await User.create({
            name,
            email,
            phone,
            college_name,
            program,
            program_type
        });

        console.debug("user created ==> ", user)

        return res.status(201).json({ message: "User registered successfully", success: true, user });
    } catch (err) {
        console.error("Error while registering user", err);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}