import { e as createComponent, m as maybeRenderHead, l as renderScript, r as renderTemplate, k as renderComponent } from '../chunks/astro/server_DYawapiQ.mjs';
import { $ as $$Layout } from '../chunks/Layout_BnlNgcIv.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$InstagramFeed = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="instagram-feed" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> <!-- Loading State --> <div class="animate-pulse bg-gray-200 aspect-square rounded-lg"></div> <div class="animate-pulse bg-gray-200 aspect-square rounded-lg"></div> <div class="animate-pulse bg-gray-200 aspect-square rounded-lg"></div> <div class="animate-pulse bg-gray-200 aspect-square rounded-lg"></div> </div> ${renderScript($$result, "K:/AI-Projects/9thisland/src/components/InstagramFeed.astro?astro&type=script&index=0&lang.ts")}`;
}, "K:/AI-Projects/9thisland/src/components/InstagramFeed.astro", void 0);

const $$Gallery = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Photo Gallery - 9th Island OCC" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-gradient-to-b from-[var(--color-ocean-blue)] to-[var(--color-ocean-dark)] text-white py-16"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> <h1 class="text-5xl font-bold mb-4">Photo Gallery</h1> <p class="text-xl opacity-90">Capturing our paddling journey</p> </div> </div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"> <!-- Instagram Feed Section --> <div class="mt-16"> <h2 class="text-3xl font-bold mb-8 text-gray-900 text-center">Latest from Instagram</h2> <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8 border-2 border-purple-200"> <div class="text-center mb-6"> <a href="https://www.instagram.com/9thislandocc/" target="_blank" rel="noopener" class="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold"> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path> </svg>
Follow @9thislandocc
</a> </div> <!-- Instagram Feed (Custom Integration) --> <div class="bg-white rounded-lg p-6"> ${renderComponent($$result2, "InstagramFeed", $$InstagramFeed, {})} </div> </div> </div> </div> ` })}`;
}, "K:/AI-Projects/9thisland/src/pages/gallery.astro", void 0);

const $$file = "K:/AI-Projects/9thisland/src/pages/gallery.astro";
const $$url = "/gallery";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Gallery,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
