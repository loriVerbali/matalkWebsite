const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

// Read the JSON file
const jsonData = JSON.parse(
  fs.readFileSync("./src/components/TasteOfMatalk.json", "utf8")
);

// Create the tabletImages directory if it doesn't exist
const tabletImagesDir = "./public/tabletImages";
if (!fs.existsSync(tabletImagesDir)) {
  fs.mkdirSync(tabletImagesDir, { recursive: true });
}

// Function to download a file with redirect handling
function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https:") ? https : http;

    const request = protocol.get(url, (response) => {
      // Handle redirects (301, 302, 303, 307, 308)
      if (
        response.statusCode >= 300 &&
        response.statusCode < 400 &&
        response.headers.location
      ) {
        console.log(
          `🔄 Redirecting ${filename}.png to: ${response.headers.location}`
        );
        downloadFile(response.headers.location, filename)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const filePath = path.join(tabletImagesDir, `${filename}.png`);
      const fileStream = fs.createWriteStream(filePath);

      response.pipe(fileStream);

      fileStream.on("finish", () => {
        fileStream.close();
        console.log(`✅ Downloaded: ${filename}.png`);
        resolve();
      });

      fileStream.on("error", (err) => {
        fs.unlink(filePath, () => {}); // Delete the file if there was an error
        reject(err);
      });
    });

    request.on("error", (err) => {
      reject(err);
    });

    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

// Extract all image details from the JSON
const imageDetails = [];

jsonData.forEach((question) => {
  question.answers.forEach((answer) => {
    if (answer.image_details) {
      imageDetails.push({
        filename: answer.image_details.file_name,
        url: answer.image_details.image_link,
      });
    }
  });
});

console.log(`Found ${imageDetails.length} images to download`);

// Download all images
async function downloadAllImages() {
  const downloadPromises = imageDetails.map(({ filename, url }) =>
    downloadFile(url, filename).catch((err) => {
      console.error(`❌ Failed to download ${filename}.png:`, err.message);
      return null;
    })
  );

  await Promise.all(downloadPromises);
  console.log("\n🎉 Download process completed!");
}

// Start the download process
downloadAllImages().catch(console.error);
