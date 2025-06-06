import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email']
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
        match: [/^[0-9]{10}$/, 'Please provide a valid phone number'],
    },
    college_name: {
        type: String,
        required: [true, "College name is required"],
        trim: true,
    },
    program: {
        type: String,
        required: [true, "Program name is required"],
        trim: true,
    },
    program_type: {
        type: String,
        required: [true, "Program type is required"],
        trim: true,
    },
    attendance: [{
        date: {
            type: Date,
            required: [true, "Date is required"]
        },
        status: {
            type: String,
            required: [true, "Status is required"],
            trim: true,
            enum: ["Present", "Absent"],
            default: "Absent"
        }
    }],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    skills: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill'
    }

}, { timestamps: true })


export const User = mongoose.models.User || mongoose.model('User', userSchema);