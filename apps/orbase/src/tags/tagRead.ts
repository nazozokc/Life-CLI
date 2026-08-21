import { readFile } from "node:fs/promises";
import { ROOT_DIR } from "../constant/app";

export const tagRead = async (): Promise<void> => {
  const read = await readFile(`${ROOT_DIR}/tags.json`, "utf-8");
  const parse = JSON.parse(read);

  return parse;
};
