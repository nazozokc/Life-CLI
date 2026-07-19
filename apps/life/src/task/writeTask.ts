import { writeFile } from "node:fs/promises";
import { taskdir, type Task } from "./type.ts";
import { mkdir } from "node:fs";

export const writeTask = async (task: Task): Promise<void> => {
  await mkdir(taskdir, { recursive: true });
  const format = JSON.stringify(task, null, 2);
  await writeFile(`${taskdir}/${task.id}.json`, format, "utf-8");
};
