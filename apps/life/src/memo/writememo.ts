import { writeFile, mkdir } from "node:fs/promises";
import { MEMO_DIR } from "../constant/app.ts";
import openEditor from "open-editor";
import { join } from "node:path";

export const writememo = async (filename: string): Promise<void> => {
  await mkdir(MEMO_DIR, { recursive: true });
  const path = join(MEMO_DIR, `${filename}.md`);

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
