const { execFile } = require("child_process");
const path = require("path");

const cache = new Map();

function resolveStreamUrl(videoId) {
    return new Promise((resolve, reject) => {

        const cached = cache.get(videoId);

        if (cached && cached.expires > Date.now()) {
            return resolve(cached.url);
        }

        if (cached) {
            cache.delete(videoId);
        }

        const url = `https://www.youtube.com/watch?v=${videoId}`;

        const ytDlp = path.join(process.cwd(), "yt-dlp");

        execFile(
            ytDlp,
            [
                "--js-runtimes",
                "deno",
                "-f",
                "ba",
                "-g",
                url
            ],
            {
                env: {
                    ...process.env,
                    PATH: `${process.env.HOME}/.deno/bin:${process.env.PATH}`
                }
            },
            (err, stdout, stderr) => {

                if (err) {
                    console.error("yt-dlp error:");
                    console.error(stderr || err.message);

                    return reject(
                        new Error("Failed to get stream")
                    );
                }

                const streamUrl = stdout.trim();

                console.log("Stream URL:", streamUrl);

                if (!streamUrl) {
                    return reject(
                        new Error("No stream URL returned")
                    );
                }

                cache.set(videoId, {
                    url: streamUrl,
                    expires: Date.now() + 10 * 60 * 1000
                });

                resolve(streamUrl);
            }
        );
    });
}

module.exports = {
    resolveStreamUrl
};