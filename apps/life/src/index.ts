import { Command } from "commander";
import { taskcommand } from "./cli/task/index.ts";
import { memocommand } from "./cli/memo/index.ts";

const runCLI = () => {
  const program = new Command("life").description("CLI management to life");

  taskcommand(program);
  memocommand(program);
};

runCLI();
