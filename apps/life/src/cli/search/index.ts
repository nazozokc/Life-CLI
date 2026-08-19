import type { Command } from "gunshi";

export const searchCommand: Command = {
  name: "search",
  description: "search",

  args: {
    year: {
      type: "positional",
      description: "year",
      required: false,
    },
    month: {
      type: "positional",
      description: "month",
      required: false,
    },
  },

  async run(ctx) {
    const search = ctx.values.search;
  },
};
