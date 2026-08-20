import type { Command } from "gunshi";
import { searchString } from "../../search/stringSearch.ts";

export const searchCommand: Command = {
  name: "search",
  description: "search",

  subCommands: {
    string: {
      name: "string",
      args: {
        search: {
          type: "positional",
          description: "search",
        },
      },

      async run(ctx) {
        const search = ctx.values.search;

        await searchString(search);
      },
    },
  },
};
