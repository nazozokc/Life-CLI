import { Command } from "commander";
import { consola } from "consola";
import { type Task } from "./task/type.ts";
import { appendTask } from "./task/writefile.ts";
import { deleteTask } from "./task/deletefile.ts";
import { readTask } from "./task/readfile.ts";
import { spreadTask } from "./task/taskTable.ts";
import {
  deleteSubscription,
  getSubscriptions,
  writeSubscription,
  tagsSubscription,
} from "./subsc/basefs.ts";
import { spreadSubscription } from "./subsc/table.ts";
import { randomUUID } from "node:crypto";
import { input, select } from "@inquirer/prompts";

const runCLI = () => {
  const program = new Command();
  program.name("life");
  const task = program.command("task");
  const memo = program.command("memo");
  const subsc = program.command("subsc");

  // taskコマンド
  task.command("add").action(async () => {
    const taskname = await input({
      message: "task-name",
    });

    const taskdate = await input({
      message: "task-date",
    });

    const tasktag = await input({
      message: "tag",
    });

    const taskadd: Task = {
      id: randomUUID(),
      task: taskname,
      date: taskdate,
      tag: tasktag
        .split(",")
        .map((n) => n.trim())
        .filter(Boolean),
    };

    await appendTask(taskadd);

    consola.success("task added");
  });

  task.command("delete").action(async () => {
    const tasks = await readTask();

    const selectedTask = await select({
      message: "delete task",
      choices: tasks.map((task) => ({
        name: `${task.task} (${task.date})`,
        value: task.id,
      })),
    });

    await deleteTask(selectedTask);
  });

  task.command("list").action(() => {
    spreadTask();
  });

  //subscコマンド
  subsc.command("list").action(() => {
    spreadSubscription();
  });

  subsc.command("add").action(async () => {
    const name = await input({
      message: "subscription name",
    });

    const price = await input({
      message: "payment subscribe service",
    });

    const currency = await select({
      message: "currency",
      choices: [
        { label: "JPY", value: "JPY" },
        { label: "USD", value: "USD" },
      ],
    });

    const cycle = await select({
      message: "cycle",
      choices: [
        { label: "monthly", value: "monthly" },
        { label: "yearly", value: "yearly" },
      ],
    });

    const tagsInput = await input({
      message: "tags",
    });

    const tag = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const get = getSubscriptions();
    get.push({
      id: Math.max(0, ...get.map((s) => s.id)) + 1,
      name: name,
      price: Number(price),
      currency: currency,
      cycle: cycle,
      tags: tag,
    });

    writeSubscription(get);
  });

  subsc
    .command("delete")
    .argument("<number>")
    .action((number) => {
      deleteSubscription(Number(number));
    });

  subsc
    .command("tags")
    .argument("<...text>")
    .action((text) => {
      const get = tagsSubscription(text);
      spreadSubscription(get);
    });

  program.parse();
};

runCLI();
