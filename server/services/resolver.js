const { execFile } = require("child_process");
const path = require("path");

const cache = new Map();

function resolveStreamUrl(videoId) {
    return new Promise((resolve, reject) => {

        // if (cache.has(videoId)) {
        //     return resolve(cache.get(videoId));
        // }
        const cached = cache.get(videoId);

                if (cached && cached.expires > Date.now()){
                    return resolve(cached.url);
                }
                cache.delete(videoId)

        const url = `https://www.youtube.com/watch?v=${videoId}`;
       const cmd = path.join(process.cwd(), "yt-dlp");
        execFile(
            cmd,["--js-runtimes", "deno", "-f", "ba", "-g", url],
            {
                env: {
                    ...process.env,
                    PATH: `${process.env.HOME}/.deno/bin:${process.env.PATH}`
                }
            },
            (err, stdout, stderr) => {

                if (err) {
                    console.error(stderr || err.message);
                    return reject(new Error("Failed to get stream"));
                }

                const streamUrl = stdout.trim();
                console.log(streamUrl)
                if (!streamUrl) {
                    return reject(new Error("No stream URL returned"));
                }

                cache.set(videoId, 
                    {
                    url: streamUrl,
                expires: Date.now() + 1000 * 60 * 10
                });

                setInterval(() => {
                    const now = Date.now();

                    for (const [videoId, data] of cache.entries()) {
                        if (data.expires <= now) {
                            cache.delete(videoId);
                        }
                    }
}, 60 * 1000); // every minute

                resolve(streamUrl)

                
            }
        );
   }); 
}
module.exports = {
    resolveStreamUrl
}
