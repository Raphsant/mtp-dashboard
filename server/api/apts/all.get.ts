import {aptsSchema} from "~/server/models/apts.schema";
import {carSchema} from "~/server/models/car.schema";

export default defineEventHandler(async (event) => {
    try {
        return await aptsSchema.find().populate('userId carId')

    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
        };
    }
});