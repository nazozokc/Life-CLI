import { Command } from "commander";

import { addCommand } from "./add";
import { deleteCommand } from "./delete";
import { listCommand } from "./list";

export const taskCommand = new Command("task")
  .addCommand(addCommand)
  .addCommand(deleteCommand)
  .addCommand(listCommand);

