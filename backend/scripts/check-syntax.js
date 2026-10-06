import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const roots = ["server.js", "src"];

const collectJavaScriptFiles = (path) => {
  const stats = statSync(path);

  if (stats.isFile()) {
    return path.endsWith(".js") ? [path] : [];
  }

  return readdirSync(path).flatMap((entry) =>
    collectJavaScriptFiles(join(path, entry)),
  );
};

const files = roots.flatMap(collectJavaScriptFiles);

for (const file of files) {
  const result = spawnSync(process.execPath, ["--check", file], {
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status);
  }
}
