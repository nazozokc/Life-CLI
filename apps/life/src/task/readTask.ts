import { type Task } from "./type.ts";
import { TASK_DIR } from "../constant/app.ts";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

export const readTask = async (): Promise<Task[]> => {
  try {
    const dir = TASK_DIR;
    const files = await readdir(dir);
    const result = [];

    for (const file of files) {
      if (!file.endsWith(".json")) continue;

      const text = await readFile(join(dir, file), "utf-8");
      const parse = JSON.parse(text);

      result.push(parse);
    }

    return result;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
};
