import { Command } from "commander";
import { consola } from "consola";
import { version } from "node:os";

const runCLI = () => {
  const program = new Command()
    .description("management life with CLI")
    .version("v0.1.2");

  // task
  const task = program.command("task");

  task.command("add");
  task.command("delete");
  task.command("done");
  task.command("list");
};
