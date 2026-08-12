import type { Command } from "gunshi";
import { notImplemented } from "../../constant/notImplemented.ts";
import { add } from "./add.ts";
import { del } from "./del.ts";

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
      run: notImplemented,
    },

    del: {
      name: "del",
      run: del,
    },
  },
};
