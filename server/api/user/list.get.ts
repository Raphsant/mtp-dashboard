import mongoose from "mongoose";
import {userSchema} from "~/server/models/user.schema";

export default defineEventHandler(async (event) => {
    return await userSchema.find({}).select('-password').populate('cars')
})