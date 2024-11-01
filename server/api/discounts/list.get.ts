import {discountSchema} from "~/server/models/discount.schema";

export default defineEventHandler(async (event) => {
    try {
        return await discountSchema.find().populate('affectedServices')

    } catch (e) {
        return {
            status: '400',
            message: e.message
        }
    }
})