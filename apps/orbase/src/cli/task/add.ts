import { input } from "@inquirer/prompts";
import { writeTask } from "../../task/writeTask.ts";
import { randomUUID } from "crypto";

export const add = async (): Promise<void> => {
  const title = await input({
    message: "task title",
  });

  const text = await input({
    message: "task text",
  });

  const dueDate = await input({
    message: "goal date",
  });

  const tag = await input({
    message: "set tags",
  });

  const task = {
    id: randomUUID(),
    title,
    text,
    dueDate,
    done: false,
    tag,
    createdAt: new Date().toISOString(),
  };

  await writeTask(task);
};
