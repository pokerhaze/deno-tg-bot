export async function healthCheck() {
    return {
        status: "healthy",
        timestamp: new Date().toISOString(),
    };
}