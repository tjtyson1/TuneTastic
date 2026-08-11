const https = require("https");
const fs = require("fs");

function download(url, filename) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filename);

        https.get(url, response => {
            if (response.statusCode >= 300 && response.statusCode < 400) {
                return download(response.headers.location, filename)
                    .then(resolve)
                    .catch(reject);
            }

            response.pipe(file);

            file.on("finish", () => {
                file.close();
                fs.chmodSync(filename, 0o755);
                resolve();
            });
        }).on("error", reject);
    });
}

async function main() {
    console.log("Downloading yt-dlp...");

    await download(
        "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp",
        "yt-dlp"
    );

    console.log("yt-dlp installed");
}

main().catch(console.error);