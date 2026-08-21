import { addNote } from "../../note/addnote.ts";
import { input } from "@inquirer/prompts";

export const add = async (): Promise<void> => {
  const filename = await input({
    message: "Enter a file name",
  });

  await addNote(filename);
};
