import {userSchema} from "~/server/models/user.schema";


export default defineEventHandler(async (event) => {
    try {
        const {_id} = await readBody(event);
        console.log(_id)
        await userSchema.findByIdAndDelete(_id)
        return {message: 'User deleted successfully'}
    } catch (e) {
        console.error(e.message)
        return {message: e.message}
    }
})