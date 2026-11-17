// Compiles frontend/typescript -> frontend/static/js, as small as possible.
//
// Every .ts file directly inside frontend/typescript is a page entry point
// (home.ts -> static/js/home.js). Put shared code in subfolders
// (frontend/typescript/lib/...) and import it; it gets bundled into each
// page that uses it.
//
// Usage: node scripts/build-ts.mjs [--watch]

import { readdirSync } from "node:fs";
import { join } from "node:path";
import * as esbuild from "esbuild";

const srcDir = "frontend/typescript";
const outDir = "frontend/static/js";

const entryPoints = readdirSync(srcDir)
  .filter((name) => name.endsWith(".ts") && !name.endsWith(".d.ts"))
  .map((name) => join(srcDir, name));

/** @type {import("esbuild").BuildOptions} */
const options = {
  entryPoints,
  outdir: outDir,
  bundle: true,
  format: "esm",
  target: "es2022",
  platform: "browser",
  minify: true,          // whitespace + syntax + identifier mangling
  treeShaking: true,
  legalComments: "none", // drop even /*! ... */ and @license comments
  charset: "utf8",
  sourcemap: false,
  drop: ["debugger"],
  logLevel: "info",
};

if (process.argv.includes("--watch")) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
} else {
  await esbuild.build(options);
}
