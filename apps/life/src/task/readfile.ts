import { taskFile, type Task } from "./type.ts";
import { readFile } from "node:fs/promises";
import { consola } from "consola";

export const readTask = async (): Promise<Task[]> => {
  try {
    const text = await readFile(taskFile, "utf-8");

    const items: Task[] = text
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line));

    return items;
  } catch {
    consola.error("failed to read jsonl file");
    return [];
  }
};
