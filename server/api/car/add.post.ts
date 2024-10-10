import {userSchema} from "~/server/models/user.schema";
import {caarSchema} from "~/server/models/caar.schema";
import mongoose from "mongoose";


export default defineEventHandler(async (event) => {

    try {
        const {make, model, year, tires} = await readBody(event);
        const email = await getAuth(event)
        const user = await userSchema.findOne({email}).select('-password')
        const newCar = new caarSchema({make, model, year, tires, owner: user?._id})
        await newCar.save()
        await userSchema.findByIdAndUpdate(user?._id, {$push:{cars: newCar._id}})
        return 'OK'
    }catch (e) {
        console.error(e)
    }
})