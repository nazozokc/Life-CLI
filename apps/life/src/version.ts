import { readFile } from "node:fs/promises";

type packagejson = {
  version: string;
};

export const version = async (): Promise<string> => {
  const fileread = await readFile(
    new URL("../package.json", import.meta.url),
    "utf-8",
  );
  const parse: packagejson = JSON.parse(fileread);

  return parse.version;
};
