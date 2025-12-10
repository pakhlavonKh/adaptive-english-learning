// analytics_service/logger.js

class SystemLogger {
    
    /**
     * Simulates an asynchronous logging task.
     * It uses a slight delay to prove it runs in the "background".
     */
    logAccessAsync(userId, action) {
        // Node.js'de "Fire and Forget" mantığı:
        // We're returning to the promisse, but the calling place won't 'await' it.
        return new Promise((resolve) => {
            setTimeout(() => {
                const timestamp = new Date().toISOString();
                console.log(`[SYSTEM LOG] User: ${userId} | Action: ${action} | Time: ${timestamp}`);
                resolve(true);
            }, 100); // A small delay (To feel the asynchronity)
        });
    }
}

module.exports = new SystemLogger();