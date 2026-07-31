import { input } from "@inquirer/prompts";
import { writeTask } from "../../task/writeTask.ts";
import { readTask } from "../../task/readTask.ts";
import { randomUUID } from "crypto";

export const add = async (): Promise<void> => {
  const head = await input({
    message: "task head",
  });

  const text = await input({
    message: "task text",
  });

  const date = await input({
    message: "goal date",
  });

  const task = await readTask();
  task.push({
    id: randomUUID(),
    head,
    text,
    date,
    done: false,
    createdAt: new Date(),
  });

  await writeTask(task);
};
