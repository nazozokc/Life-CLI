import { writeFile, mkdir } from "node:fs/promises";
import { NOTE_DIR } from "../constant/app.js";
import openEditor from "open-editor";
import { join } from "node:path";

export const addNote = async (filename: string): Promise<void> => {
  await mkdir(NOTE_DIR, { recursive: true });
  const path = join(NOTE_DIR, `${filename}.md`);

  try {
    await writeFile(path, "", { flag: "wx" });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
      throw error;
    }
  }

  await openEditor([
    {
      file: path,
      line: 1,
      column: 1,
    },
  ]);
};
