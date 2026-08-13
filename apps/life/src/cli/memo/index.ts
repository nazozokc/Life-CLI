import type { Command } from "gunshi";
import { add } from "./add.ts";
import { del } from "./del.ts";
import { edit } from "./edit.ts";

export const memoCommand: Command = {
  name: "memo",
  description: "Manage memos",

  subCommands: {
    add: {
      name: "add",
      run: add,
    },

    edit: {
      name: "edit",
      run: edit,
    },

    del: {
      name: "del",
      run: del,
    },
  },
};
