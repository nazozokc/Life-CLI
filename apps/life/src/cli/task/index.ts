import { Command } from "commander";
import { add } from "./add.ts";
import { del } from "./del.ts";
import { taskTable } from "../../task/table.ts";

export const taskCommand = (program: Command): void => {
  const task = program.command("task");

  task.command("add").action(add);
  task.command("del").action(del);
  task.command("edit").action(edit);
  task.command("list").action(async () => {
    await taskTable();
  });
};
