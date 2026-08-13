import { cli } from "gunshi";
import { taskCommand } from "./cli/task/index.ts";
import { memoCommand } from "./cli/memo/index.ts";

const commands = {
  task: taskCommand,
  memo: memoCommand,
};

await cli(commands, {
  name: "life",
  description: "CLI management to life",
});
