import { input } from "@inquirer/prompts";
import { writeTask } from "../../task/writeTask.ts";
import { tagSave, type TagType } from "../../tags/tagSave.ts";
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
    tag: tag.split(","),
    createdAt: new Date().toISOString(),
  };

  await writeTask(task);

  const tags: TagType = tag.split(",");

  await tagSave(tags);
};
