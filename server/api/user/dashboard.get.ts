export default defineEventHandler(async (event) => {
    try {
        // Fetch all users
        const allUsers = await userSchema.find();

        // Get the total count of users
        const totalUsersCount = allUsers.length;

        // Get the last 5 users by slicing the array
        const lastFiveUsers = allUsers.slice(-5);

        return {
            status: 'success',
            totalCount: totalUsersCount,
            lastFiveUsers: lastFiveUsers,
        };

    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
        };
    }
});
