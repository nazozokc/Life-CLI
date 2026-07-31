import { Command } from "commander";
import { add } from "./add.ts";

export const memocommand = (program: Command): void => {
  const memo = program.command("memo");

  memo.command("add").action(async () => {
    await add();
  });
  memo.command("edit");
  memo.command("del").action(async () => {});
};
