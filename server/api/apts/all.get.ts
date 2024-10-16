import {aptsSchema} from "~/server/models/apts.schema";

export default defineEventHandler(async (event) => {
    try {
        return await aptsSchema.find().populate('userId').populate('carId');

    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
        };
    }
});