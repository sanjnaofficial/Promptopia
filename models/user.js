import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email:{
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    username:{
        type: String,
        unique: [true, 'Username already exists!'],
        required: [true, 'Username is required!'],
        match: [
            /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            "Username invalid, it should be 3-20 characters, alphanumeric, and cannot start or end with _ or ."
        ]
    },
    image:{
        type: String
    },
})

const User = models.User || model("User", UserSchema);

export default User;