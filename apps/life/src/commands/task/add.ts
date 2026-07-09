import { Command } from "commander";
import { input } from "@inquirer/prompts";
import { randomUUID } from "node:crypto";
import { consola } from "consola";

import { appendTask } from "../../task/writefile";
import type { Task } from "../../task/type";

export const addCommand = new Command("add").action(async () => {
  const taskname = await input({
    message: "task-name",
  });

  const taskdate = await input({
    message: "task-date",
  });

  const tasktag = await input({
    message: "tag",
  });

  const task: Task = {
    id: randomUUID(),
    task: taskname,
    date: taskdate,
    tag: tasktag
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean),
  };

  await appendTask(task);

  consola.success("task added");
});
