import Table from "cli-table3";
import { consola } from "consola";
import { readTask } from "./readfile.ts";
import { type Task } from "./type.ts";

export const spreadTask = (get?: Task[]): void => {
  const list = get ?? readTask();

  if (list.length === 0) {
    consola.info("No tasks found");
    return;
  }

  const table = new Table({
    head: ["name", "date", "tags"],
  });

  for (const taskread of list) {
    table.push([
      String(taskread.task),
      String(taskread.date),
      String(taskread.tags.join(" | ")),
  };
 
  consola.log(table.toString());
};
