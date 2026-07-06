import { Command } from "commander";
import { consola } from "consola";
import { read, write, done, del } from "./src/fs.ts";

const runCLI = () => {
  const program = new Command();

  program.name("memo").description("memo cli tool").version("1.0.0");

  program
    .command("add")
    .argument("<text>")
    .action((text) => {
      const memos = read();
      memos.push({
        id: memos.length + 1,
        text: text,
      });

      write(memos);
    });

  program.command("list").action(() => {
    const memos = read();
    consola.log(memos);
  });

  program
    .command("done")
    .argument("<number>")
    .action((number) => {
      done(Number(number));
    });

  program
    .command("delete")
    .argument("<number>")
    .action((number) => {
      del(Number(number));
    });

  program.parse();
};

runCLI();
