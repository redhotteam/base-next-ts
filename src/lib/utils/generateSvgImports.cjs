const fs = require("fs").promises;
const path = require("path");

async function getAllSvgFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return getAllSvgFiles(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".svg")) {
        return fullPath;
      } else {
        return [];
      }
    }),
  );

  return files.flat();
}

const generateIndexFile = async () => {
  try {
    const [, , svgFolderPath, iconsIndexPath] = process.argv;

    const cwd = process.cwd();
    const resolvedSvgFolderPath = path.join(cwd, svgFolderPath);
    const resolvedIconsIndexPath = path.join(cwd, iconsIndexPath);

    const publicPath = path.join(cwd, "public");

    const svgFiles = await getAllSvgFiles(resolvedSvgFolderPath);

    const variableDeclarations = svgFiles.map((fullPath) => {
      const relativeToPublic = path
        .relative(publicPath, fullPath)
        .replace(/\\/g, "/");
      const fileName = path.basename(fullPath, ".svg").replace(/-/g, "_");
      return `const ${fileName} = "/${relativeToPublic}";`;
    });

    const exportStatements = [
      "export default {",
      ...svgFiles.map((fullPath) => {
        const fileName = path.basename(fullPath, ".svg").replace(/-/g, "_");
        return `  ${fileName},`;
      }),
      "};",
    ];

    const code = [...variableDeclarations, "", ...exportStatements].join("\n");

    await fs.writeFile(resolvedIconsIndexPath, code, "utf-8");
    console.log("Index file generated successfully.");
  } catch (error) {
    console.error("Error generating index file:", error);
  }
};

generateIndexFile();
