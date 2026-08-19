import { readFile } from "node:fs/promises";

export const version = async (): Promise<string> => {
  const fileread = await readFile(
    new URL("../package.json", import.meta.url),
    "utf-8",
  );
  const parse = JSON.parse(fileread);

  return parse.version;
};
