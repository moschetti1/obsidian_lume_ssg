import { extract, test } from "https://deno.land/std@0.195.0/front_matter/any.ts";
import { walk } from "https://deno.land/std@0.194.0/fs/walk.ts";

export default async function* () {

    for await (const dirEntry of walk("..", {exts:[".md"], includeDirs:true})) {
        if (
			!dirEntry.isDirectory && 
			!dirEntry.path.includes(".lume")
		){
            const text = await Deno.readTextFile(dirEntry.path);
            let cleanPath = dirEntry.path
		    .replace("..","")
		    .replace(".md","/")
		    .split(" ").join("_")
		    .toLowerCase()
            const {body, attrs} = test(text) ? extract(text) : {body:text, attrs:{}};

            if (!attrs.draft){
				yield {
					url: cleanPath,
					layout: "layouts/content.njk",
					title: dirEntry.name.replace(".md",""),
					templateEngine:"md",
					body,
					...attrs
				}
			}
			
            
        }
    }
	 
}