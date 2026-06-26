const { exec } = require("child_process");

const cache = new Map();

function resolveStreamUrl(videoId) {
    return new Promise((resolve, reject) => {

        if (cache.has(videoId)) {
            return resolve(cache.get(videoId));
        }

        const url = `https://www.youtube.com/watch?v=${videoId}`;

        exec(
            `yt-dlp -f ba -g "${url}"`,
            { maxBuffer: 10 * 1024 * 1024 },
            (err, stdout, stderr) => {

                if (err) {
                    console.error(stderr || err.message);
                    return reject(new Error("Failed to get stream"));
                }

                const streamUrl = stdout.trim();

                if (!streamUrl) {
                    return reject(new Error("No stream URL returned"));
                }

                cache.set(videoId, streamUrl);

                resolve(streamUrl);
            }
        );
    });
}