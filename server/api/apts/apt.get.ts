import {aptsSchema} from "~/server/models/apts.schema";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        return await aptsSchema.findById(query.id).populate('userId').populate('carId');

    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
        };
    }
});