import { TASK_DIR, NOTE_DIR, DIARY_DIR } from "../constant/app.ts";
import { readFile, readdir } from "node:fs/promises";
import { join } from "path";
import { consola } from "consola";

export const search = async (search: string): Promise<void> => {
  const task = await readdir(TASK_DIR, "utf-8");

  for (const task_file of task) {
    const path = join(TASK_DIR, task_file);
    const task = await readFile(path, "utf-8");

    if (task.includes(search)) {
      consola.log(path);
      consola.log(task);
    }
  }

  const notes = await readdir(NOTE_DIR, "utf-8");
  for (const note_file of notes) {
    const path = join(NOTE_DIR, note_file);
    const content = await readFile(path, "utf-8");

    if (content.includes(search)) {
      consola.log(path);
      consola.log(content);
    }
  }

  const diary = await readdir(DIARY_DIR, "utf-8");
  for (const year of diary) {
    const read = await readdir(join(DIARY_DIR, year));
    for (const month of read) {
      const path = join(DIARY_DIR, year, month);
      const files = await readFile(path, "utf-8");

      if (files.includes(search)) {
        consola.log(path);
        consola.log(files);
      }
    }
  }
};
