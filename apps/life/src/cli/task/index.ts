import type { Command } from "gunshi";
import { add } from "./add.ts";
import { del } from "./del.ts";
import { taskTable } from "../../task/table.ts";

const Table = async (): Promise<void> => {
  await taskTable();
};

export const taskCommand: Command = {
  name: "task",
  description: "Manage tasks",

  subCommands: {
    add: {
      name: "add",
      run: add,
    },

    del: {
      name: "del",
      run: del,
    },

    list: {
      name: "list",
      run: Table,
    },
  },
};
