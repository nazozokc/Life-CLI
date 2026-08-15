import { homedir } from "os";
import { join } from "node:path";

export const CLI_COMMAND_NAME = "life";
export const TASK_DIR = join(`${homedir()}`, ".life", "task");
export const NOTE_DIR = join(`${homedir()}`, ".life", "note");
