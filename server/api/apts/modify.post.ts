import {aptsSchema} from "~/server/models/apts.schema";
import {userSchema} from "~/server/models/user.schema";
import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig(event)
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "noreplymobiletirepro@gmail.com",
                pass: config.pass,
            },
        });
        const {id, status, email} = await readBody(event)
        const appointment = await aptsSchema.findByIdAndUpdate(id, {status: status})
        const newApt = await aptsSchema.findById(id).populate('userId').populate('carId');


        if (await newApt) {
            const clientmail = await transporter.sendMail({
                from: '', // sender address
                to: email, // list of receivers
                subject: `Mobile Tire Pro - Appointment set to ${status}`, // Subject line
                text: `Your appointment has been set to: ${status} `, // plain text body
                //html: "<b>Your appointment has been booked.</b>", // html body
            });
            return {
                status: 'success',
                newApt
            };
        }

    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
        };
    }
});