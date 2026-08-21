import { readFile } from "node:fs/promises";
import { ROOT_DIR } from "../constant/app";
import type { TagType } from "./tagSave";

export const tagRead = async (): Promise<TagType> => {
  const read = await readFile(`${ROOT_DIR}/tags.json`, "utf-8");
  const parse = JSON.parse(read);
  return parse;
};
