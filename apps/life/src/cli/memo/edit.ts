import { join } from "node:path";
import { openEditor } from "open-editor";
import { MEMO_DIR } from "../../constant/app.ts";

export const edit = async (filename: string): Promise<void> => {
  const path = join(MEMO_DIR, `${filename}.md`);
  await openEditor([
    {
      file: path,
      line: 1,
      column: 1,
    },
  ]);
};
