import { Command } from "commander";
import { add } from "./add.ts";
import { del } from "./del.ts";

export const memocommand = (program: Command): void => {
  const memo = program.command("memo");

  memo.command("add").action(add);
  memo.command("edit").action(() => {
    console.log("Not implemented");
  });
  memo.command("del").action(del);
};
