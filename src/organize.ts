import * as fs from "fs";
import * as path from "path";
const dirctoryPath = "./src/files";

const fileTypes: { [key: string]: string[] } = {
  image: [".jpg", ".jpeg", ".png", ".gif"],
  documents: [".pdf", ".docx", ".doc", ".txt"],
  audio: [".mp3", ".wav"],
  video: [".mp4", ".mp3", ".mp2", ".mkv", ".avi"],
  code: [".js", ".ts", ".html", ".prisma", ".json"],
};

const organizafiles = (directory: string) => {
  fs.readdir(directory, (err: any, files: any) => {
    if (err) {
      console.log("Error reading directory: ", err);
      return;
    }

    files.forEach((file: any) => {
      const filePath = path.join(directory, file);
      const fileExtension = path.extname(file).toLowerCase();

      let targetFolder = null;
      for (const [folder, extensions] of Object.entries(fileTypes)) {
        if (extensions.includes(fileExtension)) {
          targetFolder = folder;
          break;
        }
      }

      if (targetFolder) {
        const folderPath = path.join(directory, targetFolder);
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath);
        }

        const targetFilePath = path.join(folderPath, file);
        fs.rename(filePath, targetFilePath, (err) => {
          if (err) {
            console.log(`Error moving file ${file}`, err);
          } else {
            console.log(`Move ${file} to ${targetFolder}`);
          }
        });
      }
    });
  });
};

organizafiles(dirctoryPath);
