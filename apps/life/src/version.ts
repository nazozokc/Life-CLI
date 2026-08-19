import { readFile } from "node:fs/promises";

export const version = async (): Promise<number> => {
  const fileread = await readFile("../package.json", "utf-8");
  const parse = JSON.parse(fileread);

  const ver = parse.version;

  return ver;
};
