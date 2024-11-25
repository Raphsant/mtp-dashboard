export default defineEventHandler(async (event) => {
    try {
        const {_id} = await readBody(event);
        await discountSchema.findByIdAndDelete(_id)
        return 'OK'
    } catch (e) {
        return {
            status: '400',
            message: e.message,
        };
    }
})