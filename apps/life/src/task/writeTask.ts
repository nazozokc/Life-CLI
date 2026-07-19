import { writeFile } from "node:fs/promises";
import { type Task } from "./type.ts";
import { mkdir } from "node:fs";
import { TASK_DIR } from "../constant/app.ts";

export const writeTask = async (task: Task): Promise<void> => {
  await mkdir(TASK_DIR, { recursive: true });
  const format = JSON.stringify(task, null, 2);
  await writeFile(`${TASK_DIR}/index.json`, task.id, "utf-8");
  await writeFile(`${TASK_DIR}/${task.id}.json`, format, "utf-8");
};
