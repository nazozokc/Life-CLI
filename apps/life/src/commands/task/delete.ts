import { Command } from "commander";
import { select } from "@inquirer/prompts";

import { readTask } from "../../task/readfile";
import { deleteTask } from "../../task/deletefile";

export const deleteCommand = new Command("delete").action(async () => {
  const tasks = await readTask();

  const selected = await select({
    message: "delete task",
    choices: tasks.map((task) => ({
      name: `${task.task} (${task.date})`,
      value: task.id,
    })),
  });

  await deleteTask(selected);
});
