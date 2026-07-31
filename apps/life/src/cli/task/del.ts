import { checkbox } from "@inquirer/prompts";
import { readTask } from "../../task/readTask.ts";
import { deleteTask } from "../../task/deleteTask.ts";
import consola from "consola";

export const del = async (): Promise<void> => {
  try {
    const dir = await readTask();
    const choices = [];

    for (const sel of dir) {
      choices.push({
        name: sel.head, // 画面に表示される
        value: sel.id, // 選択時に返ってくる値
      });
    }

    const selected = await checkbox({
      message: "select Task",
      choices,
    });

    for (const file of selected) {
      await deleteTask(file);
    }
  } catch (error) {
    consola.error(error);
  }
};
