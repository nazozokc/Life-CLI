import { unlink } from "node:fs/promises";
import { join } from "path";
import { DIARY_DIR } from "../constant/app.ts";

export const deleteDiary = async (name: string): Promise<void> => {
  await unlink(join(DIARY_DIR, `${name}.md`));
};
