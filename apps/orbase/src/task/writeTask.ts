import { writeFile, mkdir } from "node:fs/promises";
import { type Task } from "./type.ts";
import { TASK_DIR } from "../constant/app.ts";

export const writeTask = async (task: Task): Promise<void> => {
  await mkdir(TASK_DIR, { recursive: true });
  const format = JSON.stringify(task, null, 2);
  await writeFile(`${TASK_DIR}/${task.id}.json`, format, "utf-8");
};
