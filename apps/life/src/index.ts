#!/usr/bin/env/ node

import { cli, define } from "gunshi";
import { taskCommand } from "./cli/task/index.ts";
import { noteCommand } from "./cli/note/index.ts";
import { diaryCommand } from "./cli/diary/index.ts";

const mainCommand = define({
  name: "life",
  description: "A CLI for managing your life",
  version: "0.1.6",
});

await cli(process.argv.slice(2), mainCommand, {
  subCommands: {
    task: taskCommand,
    note: noteCommand,
    diary: diaryCommand,
  },
});
