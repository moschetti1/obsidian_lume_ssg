import lume from "lume/mod.ts";
import nav from "lume/plugins/nav.ts";
import { copy } from "https://deno.land/std@0.197.0/fs/copy.ts";
import { emptyDir } from "https://deno.land/std@0.197.0/fs/empty_dir.ts";

await emptyDir("./assets")
await copy("../assets", "./assets", {overwrite:true})  

const site = lume();

site.copy("assets")
site.copy("css")

site.use(nav(/* Options */));

export default site;
