import {defineMongooseModel} from "#nuxt/mongoose";
import {carSchema} from "~/server/models/car.schema";


export const userSchema = defineMongooseModel({
    name: 'User',
    schema: {
        email: {
            type: 'string',
            unique: true,
        },
        name: 'string',
        password: {
            type: 'string'
        },
        picture: {
            type: 'string'
        },
        cars: [{
            type: 'ObjectId',
            ref: carSchema
        }],
        apts: [{
            type: 'ObjectId',
            ref: 'Apt'
        }]
    },
    hooks(schema) {
        schema.pre('save', function (this, next) {
            if (this.password && this.email)
                next()

            throw createError({
                statusCode: 500,
                statusMessage: 'validation failed',
            })
        })
    },
})
