import { consola } from "consola";
import { Command } from "commander";
import { load, save, deleteTask, doneTask, type Task } from "./fs";

const runCLI = () => {
  const program = new Command();

  program.name("task").description("task management cli tool").version("0.1.0");

  program
    .command("add")
    .argument("<text>")
    .action(async (text) => {
      const newTask: Task = {
        id: Date.now(),
        text,
        done: false,
      };

      const tasks = await load();
      tasks.push(newTask);
      await save(tasks);
      consola.success(`Task added: ${text}`);
    });

  program.command("list").action(async () => {
    const tasks = await load();
    if (tasks.length === 0) {
      consola.info("No tasks found");
      return;
    }
    tasks.forEach((task) => {
      const checkbox = task.done ? "[x]" : "[ ]";
      consola.log(`${checkbox} ${task.id}: ${task.text}`);
    });
  });

  program
    .command("delete")
    .argument("<id>")
    .action(async (id: string) => {
      const taskId = Number(id);
      if (isNaN(taskId)) {
        consola.error("Invalid task ID");
        return;
      }
      await deleteTask(taskId);
      consola.success(`Task ${id} deleted`);
    });

  program
    .command("done")
    .argument("<id>")
    .action(async (id: string) => {
      const taskId = Number(id);
      if (isNaN(taskId)) {
        consola.error("Invalid task ID");
        return;
      }
      await doneTask(taskId);
      consola.success(`Task ${id} marked as done`);
    });

  program.parseAsync();
};

runCLI();
