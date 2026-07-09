import { Command } from "commander";

import { spreadTask } from "../../task/taskTable.ts";

export const listCommand = new Command("list").action(() => {
  spreadTask();
});
