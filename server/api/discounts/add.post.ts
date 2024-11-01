import {discountSchema} from "~/server/models/discount.schema";
import {servicesSchema} from "~/server/models/services.schema";

export default defineEventHandler(async (event) => {
    try {
        const {isActive, percentage, validUntil, affectedServices, name, description} = await readBody(event)
        const newDiscount = new discountSchema({isActive, percentage, validUntil, affectedServices, name, description})
        await newDiscount.save()
        console.log(affectedServices)
        for (let service of affectedServices){
            console.log(service)
            await servicesSchema.findByIdAndUpdate(service, {$push: {discounts: newDiscount._id}})
        }
        return 'OK'


    } catch (e) {
        return {
            status: '400',
            message: e.message
        }
    }
})