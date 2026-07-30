import { type Task } from "./type.ts";
import { TASK_DIR } from "../constant/app.ts";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

export const readTask = async (): Promise<Task[]> => {
  const dir = TASK_DIR;
  const files = await readdir(dir);
  const result = [];

  for (const file of files) {
    if (!file.endsWith(".json")) continue;

    const text = await readFile(join(dir, file), "utf-8");
    const json = JSON.parse(text);

    result.push(json);
  }

  return result;
};
