import { Command } from "commander";

export const taskcommand = (program: Command): void => {
  const task = program.command("task");

  task.command("add");
  task.command("del");
  task.command("list");
};
