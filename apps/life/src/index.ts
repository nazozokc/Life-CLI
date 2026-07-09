import { Command } from "commander";

import { taskCommand } from "./commands/task";
import { memoCommand } from "./commands/memo";

const program = new Command();

program.name("life");

program.addCommand(taskCommand);
program.addCommand(memoCommand);

program.parse();
