import { readFile } from "node:fs/promises";
import path from "node:path";

const filename = "Aayush Barmecha Resume.pdf";

export async function GET() {
  const resume = await readFile(path.join(process.cwd(), "public", "resume.pdf"));

  return new Response(resume, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"; filename*=UTF-8''Aayush%20Barmecha%20Resume.pdf`,
    },
  });
}
