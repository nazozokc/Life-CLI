import { writeFile } from "node:fs/promises";
import { ROOT_DIR } from "../constant/app.ts";

export const tagSave = async (tags: string[]): Promise<void> => {
  await writeFile(`${ROOT_DIR}/tags.json`, tags, "utf-8");
};
