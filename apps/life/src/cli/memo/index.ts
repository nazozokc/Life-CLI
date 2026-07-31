import { Command } from "commander";

export const memocommand = (program: Command): void => {
  const memo = program.command("memo");

  memo.command("add");
  memo.command("edit");
  memo.command("del");
};
