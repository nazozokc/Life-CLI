import type { Command } from "gunshi";

export const diaryCommand: Command = {
  name: "diary",
  description: "Record a diary entry",

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
