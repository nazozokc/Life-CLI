import { unlink } from "node:fs/promises";
import { join } from "path";
import { MEMO_DIR } from "../constant/app";

export const deleteMemo = async (name: string): Promise<void> => {
  await unlink(join(MEMO_DIR, `${name}.md`));
};
