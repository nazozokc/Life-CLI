import { Command } from "commander";
import { notImplemented } from "../../constant/notImplemented.ts";
import { add } from "./add.ts";
import { del } from "./del.ts";

export const memoCommand = (program: Command): void => {
  const memo = program.command("memo");

  memo.command("add").action(add);
  memo.command("edit").action(notImplemented);
  memo.command("del").action(del);
};
