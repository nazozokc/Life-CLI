import { Command } from "commander";

import { taskCommand } from "./commands/task";

const program = new Command();

program.name("life");

program.addCommand(taskCommand);

program.parse();
