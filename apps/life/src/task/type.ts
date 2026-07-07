import { homedir } from "os";

export type Task = {
  id: string;
  task: string;
  date: string;
  tag: string[];
};

export const taskFile = `${homedir()}/.life/task/task.jsonl`;
