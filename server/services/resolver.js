const { execFile } = require("node:child_process");
const cache = new Map();
const pending = new Map();
const path = require("node:path");
const fs = require("node:fs");

const localExecutable = path.join(process.cwd(), "bin", "yt-dlp");

const YT_DLP_PATH =
    process.env.YT_DLP_PATH ||
    (fs.existsSync(localExecutable) ? localExecutable : "yt-dlp");
    
console.log("Current directory:", process.cwd());
console.log("Expected executable:", localExecutable);
console.log("YT_DLP_PATH environment:", process.env.YT_DLP_PATH);
console.log("Selected executable:", YT_DLP_PATH);
console.log("Local executable exists:", fs.existsSync(localExecutable));
function resolveStreamUrl(videoId) {
    if (!/^[A-Za-z0-9_-]{11}$/.test(videoId || "")) {
        return Promise.reject(new Error("Invalid YouTube video id"));
    }
    const cached = cache.get(videoId);
    if (cached && cached.expires > Date.now()) return Promise.resolve(cached.url);
    cache.delete(videoId);
    if (pending.has(videoId)) return pending.get(videoId);
    const request = new Promise((resolve, reject) => {
        execFile(YT_DLP_PATH, [
            "--ignore-config", "--no-playlist", "--no-warnings",
            "--socket-timeout", "10", "--retries", "1",
            "--extractor-retries", "1", "--no-cache-dir",
            "-f", "bestaudio[ext=m4a]/bestaudio", "--get-url",
            `https://www.youtube.com/watch?v=${videoId}`
        ], { timeout: 45000, maxBuffer: 1024 * 1024 }, (err, stdout, stderr) => {
            if (err) {
                console.error("yt-dlp extraction failed:", stderr || err.message);
                return reject(new Error(err.code === "ENOENT"
                    ? "yt-dlp executable not found; set YT_DLP_PATH"
                    : "yt-dlp could not resolve audio; check the server terminal"));
            }
            const url = stdout.trim().split(/\r?\n/)[0];
            try {
                if (new URL(url).protocol !== "https:") throw new Error();
            } catch { return reject(new Error("yt-dlp returned no valid audio URL")); }
            cache.set(videoId, { url, expires: Date.now() + 5 * 60 * 1000 });
            resolve(url);
        });
    });
    pending.set(videoId, request);
    request.finally(() => pending.delete(videoId)).catch(() => {});
    return request;
}
module.exports = { resolveStreamUrl };
