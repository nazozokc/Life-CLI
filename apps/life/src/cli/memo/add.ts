import { addMemo } from "../../memo/addmemo.ts";
import { input } from "@inquirer/prompts";

export const add = async (): Promise<void> => {
  const filename = await input({
    message: "ファイル名を入力してください",
  });

  await addMemo(filename);
};
