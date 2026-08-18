import { deleteDiary } from "../../diary/deleteDiary.ts";
import { DIARY_DIR } from "../../constant/app.ts";
import { join } from "path";
import { access } from "node:fs/promises";
import consola from "consola";

export const del = async (day: string): Promise<void> => {
  const [year, month, date] = day.split("-");

  const filename = join(
    DIARY_DIR,
    String(year),
    String(month),
    `${year}${month}${date}.md`,
  );

  try {
    await access(filename);
  } catch (error) {
    consola.error("No such file or directory");
    return;
  }

  await deleteDiary(filename);
};
