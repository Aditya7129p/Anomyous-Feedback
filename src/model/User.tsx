import { Schema } from "mongoose"
import mongoose, {Document} from "mongoose"

export interface Message extends Document{
    content: string;
    createdAt: Date;
}
const MessageScheme: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})



export interface User extends Document{
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    verifycode: string;
    verifycodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[]
}
const userSchema: Schema<User> = new Schema({
    firstname: {
        type: String,
        required: [true, "First name is required"]
    },
    lastname: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email address is required"],
        unique: true,
        match: [/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, 'Please use a valid email address']
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    verifycode: {
        type: String,
        required: [true, "Verify code is required"]
    },
    verifycodeExpiry: {
        type: Date,
        required: [true, "Verify code expiry is required"]
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    messages: [MessageScheme]
})