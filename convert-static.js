const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "out");

// دالة لمشي على كل الملفات داخل فولدر recursively
function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      walkDir(fullPath);
    } else if (stats.isFile() && path.extname(file) === ".html" && file !== "index.html") {
      // اسم الملف بدون .html
      const name = path.basename(file, ".html");
      const parentDir = path.dirname(fullPath);
      const newDir = path.join(parentDir, name);

      // أنشئ فولدر جديد بنفس اسم الملف
      if (!fs.existsSync(newDir)) fs.mkdirSync(newDir);

      // حرك الملف إلى newDir/index.html
      fs.renameSync(fullPath, path.join(newDir, "index.html"));
    }
  });
}

// شغل الدالة على فولدر out
walkDir(outDir);

console.log("✅ All HTML files converted to folder/index.html structure!");
