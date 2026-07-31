import { Command } from "commander";
import { taskCommand } from "./cli/task/index.ts";
import { memoCommand } from "./cli/memo/index.ts";

const runCLI = () => {
  const program = new Command("life").description("CLI management to life");

  taskCommand(program);
  memoCommand(program);

  program.parse();
};

runCLI();
