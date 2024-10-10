import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
    try {
        const { credentials } = await readBody(event);
        const { email } = credentials;
        const usersCollection = mongoose.connection.db.collection('users');

        const user = await usersCollection.findOne({ email });

        if (!user) {
            throw createError({
                statusMessage: 'User not found',
                statusCode: 404,
            });
        } else if (!user.admin) {
            throw createError({
                statusMessage: 'Unauthorized access',
                statusCode: 401,
            });
        }

        await setAuth(event, user.email);
        return {
            loggedIn: true,
            user: user.email,
        };
    } catch (error) {
        throw error.statusCode
            ? error
            : createError({
                statusMessage: 'An error has occurred',
                statusCode: 500,
            });
    }
});
