import { writeFile, mkdir } from "node:fs/promises";
import { DIARY_DIR } from "../constant/app.js";
import openEditor from "open-editor";
import { join } from "node:path";

export const addNote = async (): Promise<void> => {
  const now = new Date();

  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate());

  const filename = join(DIARY_DIR, year, month, `${year}-${month}-${day}.md`);

  const dirname = join(DIARY_DIR, year, month);

  await mkdir(dirname, { recursive: true });

  try {
    await writeFile(filename, "", { flag: "wx" });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
      throw error;
    }
  }

  await openEditor([
    {
      file: filename,
      line: 1,
      column: 1,
    },
  ]);
};
