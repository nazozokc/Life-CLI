import { readTask } from "./readfile.ts";
import { writeTask } from "./writefile.ts";

export const deleteTask = async (id: string): Promise<void> => {
  const tasks = await readTask();

  const filteredTasks = tasks.filter((task) => task.id !== id);

  await writeTask(filteredTasks);
};
