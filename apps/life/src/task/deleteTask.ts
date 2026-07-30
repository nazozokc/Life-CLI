import { unlink } from "node:fs/promises";
import { join } from "node:path";
import { TASK_DIR } from "../constant/app.ts";

export const deleteTask = async (id: string): Promise<void> => {
  await unlink(join(TASK_DIR, `${id}.json`));
};
