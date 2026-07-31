import { checkbox } from "@inquirer/prompts";
import { deletememo } from "../../memo/deletememo.ts";
import { MEMO_DIR } from "../../constant/app.ts";
import { readdir } from "node:fs/promises";
import { consola } from "consola";

export const del = async (): Promise<void> => {
  try {
    const dir = await readdir(MEMO_DIR);
    const choices = [];

    for (const sel of dir) {
      choices.push({
        name: sel, // 画面に表示される
        value: sel, // 選択時に返ってくる値
      });
    }

    const selected = await checkbox({
      message: "select memo",
      choices,
    });

    for (const file of selected) {
      await deletememo(file);
    }
  } catch (error) {
    consola.error(error);
  }
};
