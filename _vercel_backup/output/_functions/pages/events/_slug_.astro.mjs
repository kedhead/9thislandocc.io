import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, u as unescapeHTML } from '../../chunks/astro/server_DYawapiQ.mjs';
import { $ as $$Layout } from '../../chunks/Layout_BnlNgcIv.mjs';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
function getStaticPaths() {
  const postsDir = join(process.cwd(), "src", "content", "posts");
  try {
    if (!readdirSync) {
      console.error("readdirSync not available");
      return [];
    }
    const files = readdirSync(postsDir);
    console.log("Found files:", files);
    const paths = files.filter((file) => file.endsWith(".md") || file.endsWith(".mdx")).map((file) => {
      try {
        const content = readFileSync(join(postsDir, file), "utf-8");
        const frontmatterMatch = content.match(/---[\r\n]+([\s\S]*?)[\r\n]+---/);
        const bodyMatch = content.match(/---[\r\n]+[\s\S]*?[\r\n]+---[\r\n]+([\s\S]*)/);
        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];
          const title = frontmatter.match(/title:\s*(.+?)[\r\n]/)?.[1]?.trim() || "Untitled";
          const date = frontmatter.match(/date:\s*(.+?)[\r\n]/)?.[1]?.trim() || "";
          const category = frontmatter.match(/category:\s*(.+?)[\r\n]/)?.[1]?.trim() || "news";
          const imageMatch = frontmatter.match(/image:\s*(.+?)(?:[\r\n]|$)/)?.[1]?.trim();
          const image = imageMatch || "";
          const body = bodyMatch ? bodyMatch[1].trim() : "";
          const slug = file.replace(/\.(md|mdx)$/, "");
          console.log("Generated path for:", slug, "with title:", title);
          return {
            params: { slug },
            props: { title, date, category, image, body }
          };
        } else {
          console.log("No frontmatter match for:", file);
        }
      } catch (err) {
        console.error("Error reading file:", file, err);
      }
      return null;
    }).filter(Boolean);
    console.log("Total paths generated:", paths.length);
    return paths;
  } catch (e) {
    console.error("Error in getStaticPaths:", e);
    return [];
  }
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const { title, date, category, image, body } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${title} - 9th Island OCC`, "data-astro-cid-jugqba64": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-gradient-to-b from-[var(--color-ocean-blue)] to-[var(--color-ocean-dark)] text-white py-16" data-astro-cid-jugqba64> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" data-astro-cid-jugqba64> <a href="/events" class="inline-flex items-center text-white/80 hover:text-white mb-6 transition" data-astro-cid-jugqba64> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-jugqba64> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-astro-cid-jugqba64></path> </svg>
Back to Events
</a> <div class="mb-4" data-astro-cid-jugqba64> <span${addAttribute(`px-3 py-1 rounded-full text-xs font-bold uppercase ${category === "race" ? "bg-red-500" : category === "practice" ? "bg-blue-500" : category === "event" ? "bg-green-500" : "bg-gray-500"}`, "class")} data-astro-cid-jugqba64> ${category} </span> </div> <h1 class="text-5xl font-bold mb-4" data-astro-cid-jugqba64>${title}</h1> <div class="flex items-center text-white/80 text-lg" data-astro-cid-jugqba64> <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-jugqba64> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-astro-cid-jugqba64></path> </svg> ${new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </div> </div> </div> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-astro-cid-jugqba64> ${image && renderTemplate`<div class="mb-8 rounded-lg overflow-hidden shadow-lg" data-astro-cid-jugqba64> <img${addAttribute(image, "src")}${addAttribute(title, "alt")} class="w-full h-auto" data-astro-cid-jugqba64> </div>`} <article class="prose prose-lg max-w-none" data-astro-cid-jugqba64> <div class="bg-white rounded-lg shadow-lg p-8" data-astro-cid-jugqba64> <div data-astro-cid-jugqba64>${unescapeHTML(body.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br />"))}</div> </div> </article> <div class="mt-12 flex gap-4" data-astro-cid-jugqba64> <a href="/events" class="btn-ocean px-8 py-3 rounded-lg font-semibold inline-flex items-center" data-astro-cid-jugqba64> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-jugqba64> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-astro-cid-jugqba64></path> </svg>
Back to All Events
</a> <a href="/contact" class="btn-lava px-8 py-3 rounded-lg font-semibold" data-astro-cid-jugqba64>
Contact Us
</a> </div> </div> ` })} `;
}, "K:/AI-Projects/9thisland/src/pages/events/[slug].astro", void 0);

const $$file = "K:/AI-Projects/9thisland/src/pages/events/[slug].astro";
const $$url = "/events/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
