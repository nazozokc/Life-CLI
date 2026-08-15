#!/usr/bin/env/ node

import { cli, define } from "gunshi";
import { taskCommand } from "./cli/task/index.ts";
import { noteCommand } from "./cli/note/index.ts";

const mainCommand = define({
  name: "life",
  description: "A CLI for managing your life",
});

await cli(process.argv.slice(2), mainCommand, {
  subCommands: {
    task: taskCommand,
    note: noteCommand,
  },
});
