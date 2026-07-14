import { writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "out");
const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0;url=/es/" />
    <link rel="canonical" href="/es/" />
    <title>Redirecting…</title>
  </head>
  <body>
    <p><a href="/es/">Continuar / Continue</a></p>
  </body>
</html>
`;

writeFileSync(join(outDir, "index.html"), html);
console.log("Wrote out/index.html → /es/");
