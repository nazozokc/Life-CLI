import { define } from "gunshi";
import { searchindex } from "../../search/search.ts";

export const searchCommand = define({
  name: "search",
  description: "search",

  args: {
    search: {
      type: "positional",
      description: "search",
    },
  },

  async run(ctx) {
    const search = ctx.values.search;

    await searchindex(search);
  },
});
