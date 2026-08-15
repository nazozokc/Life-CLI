import { cli } from "gunshi";
import { taskCommand } from "./cli/task/index.ts";
import { noteCommand } from "./cli/note/index.ts";

const commands = {
  task: taskCommand,
  memo: noteCommand,
};

await cli(commands, {
  name: "life",
  description: "CLI management to life",
});
