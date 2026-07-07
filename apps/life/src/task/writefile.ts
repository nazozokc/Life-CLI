import { appendFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { taskFile, type Task } from "./type.js";

export const appendTask = async (task: Task): Promise<void> => {
  await mkdir(path.dirname(taskFile), { recursive: true });

  await appendFile(taskFile, JSON.stringify(task) + "\n", "utf-8");
};

export const writeTask = async (tasks: Task[]): Promise<void> => {
  const jsonl = tasks.map((n) => JSON.stringify(n)).join("\n");

  await writeFile(taskFile, jsonl, "utf-8");
};
