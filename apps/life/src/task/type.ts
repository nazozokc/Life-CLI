import { homedir } from "os";

export type Task = {
  id: "string";
  head: "string";
  text: "string";
  date: "string";
  done: "boolean";
};

export const taskdir = `${homedir()}/.life/task`;
