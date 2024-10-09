export default defineEventHandler(async (event) => {
    try {
        // Use aggregation to group by status and count the number of documents for each status
        const counts = await aptsSchema.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        return {
            status: 'success',
            counts: counts,
        };

    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
        };
    }
});