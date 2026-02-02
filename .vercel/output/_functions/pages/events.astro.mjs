import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_DYawapiQ.mjs';
import { $ as $$Layout } from '../chunks/Layout_BnlNgcIv.mjs';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const weekday = [{"day":"Tuesday","time":"6:00 PM - 8:00 PM"}];
const weekend = [{"day":"Saturday","time":"8:00 AM - 10:00 AM"}];
const location = "Lake Mead - Horsepower Cove";
const seasonalNote = "Practice times may vary seasonally. Check our social media for updates!";
const practiceData = {
  weekday,
  weekend,
  location,
  seasonalNote,
};

const $$Events = createComponent(($$result, $$props, $$slots) => {
  const { weekday, weekend, location, seasonalNote } = practiceData;
  const postsDir = join(process.cwd(), "src/content/posts");
  let posts = [];
  try {
    const files = readdirSync(postsDir);
    posts = files.filter((file) => file.endsWith(".md") || file.endsWith(".mdx")).map((file) => {
      const content = readFileSync(join(postsDir, file), "utf-8");
      const frontmatterMatch = content.match(/---[\r\n]+([\s\S]*?)[\r\n]+---/);
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const title = frontmatter.match(/title:\s*(.+?)[\r\n]/)?.[1]?.trim() || "Untitled";
        const date = frontmatter.match(/date:\s*(.+?)[\r\n]/)?.[1]?.trim() || "";
        const category = frontmatter.match(/category:\s*(.+?)[\r\n]/)?.[1]?.trim() || "news";
        const slug = file.replace(/\.(md|mdx)$/, "");
        return { title, date, category, slug };
      }
      return null;
    }).filter(Boolean).sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (e) {
    console.error("Error loading posts:", e);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Events & Calendar - 9th Island OCC", "data-astro-cid-ro7pgs3h": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-gradient-to-b from-[var(--color-ocean-blue)] to-[var(--color-ocean-dark)] text-white py-16" data-astro-cid-ro7pgs3h> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-astro-cid-ro7pgs3h> <h1 class="text-5xl font-bold mb-4" data-astro-cid-ro7pgs3h>Events & Calendar</h1> <p class="text-xl opacity-90" data-astro-cid-ro7pgs3h>Stay updated on practices, races, and club happenings</p> </div> </div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-astro-cid-ro7pgs3h> <!-- Regular Practice Schedule --> <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-8 mb-12 border-2 border-blue-200" data-astro-cid-ro7pgs3h> <h2 class="text-3xl font-bold mb-6 text-gray-900 flex items-center" data-astro-cid-ro7pgs3h> <svg class="w-8 h-8 mr-3 text-[var(--color-ocean-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ro7pgs3h> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-astro-cid-ro7pgs3h></path> </svg>
Regular Practice Schedule
</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-astro-cid-ro7pgs3h> <div class="bg-white rounded-lg p-6 shadow-md" data-astro-cid-ro7pgs3h> <h3 class="text-xl font-bold mb-4 text-[var(--color-ocean-blue)]" data-astro-cid-ro7pgs3h>Weekday Practices</h3> <div class="space-y-3" data-astro-cid-ro7pgs3h> ${weekday.map((practice) => renderTemplate`<div class="flex justify-between items-center border-b pb-2" data-astro-cid-ro7pgs3h> <span class="font-semibold text-gray-700" data-astro-cid-ro7pgs3h>${practice.day}</span> <span class="text-gray-600" data-astro-cid-ro7pgs3h>${practice.time}</span> </div>`)} </div> <p class="text-sm text-gray-500 mt-4" data-astro-cid-ro7pgs3h>📍 ${location}</p> </div> <div class="bg-white rounded-lg p-6 shadow-md" data-astro-cid-ro7pgs3h> <h3 class="text-xl font-bold mb-4 text-[var(--color-ocean-blue)]" data-astro-cid-ro7pgs3h>Weekend Practices</h3> <div class="space-y-3" data-astro-cid-ro7pgs3h> ${weekend.map((practice) => renderTemplate`<div class="flex justify-between items-center border-b pb-2" data-astro-cid-ro7pgs3h> <span class="font-semibold text-gray-700" data-astro-cid-ro7pgs3h>${practice.day}</span> <span class="text-gray-600" data-astro-cid-ro7pgs3h>${practice.time}</span> </div>`)} </div> <p class="text-sm text-gray-500 mt-4" data-astro-cid-ro7pgs3h>📍 ${location}</p> </div> </div> <p class="text-center mt-6 text-gray-700" data-astro-cid-ro7pgs3h> <strong data-astro-cid-ro7pgs3h>Note:</strong> ${seasonalNote} </p> </div> <!-- Category Filter --> <div class="flex flex-wrap gap-4 justify-center mb-12" data-astro-cid-ro7pgs3h> <button class="event-filter active px-6 py-2 rounded-full font-semibold transition" data-category="all" data-astro-cid-ro7pgs3h>
All Events
</button> <button class="event-filter px-6 py-2 rounded-full font-semibold transition" data-category="race" data-astro-cid-ro7pgs3h>
Races
</button> <button class="event-filter px-6 py-2 rounded-full font-semibold transition" data-category="event" data-astro-cid-ro7pgs3h>
Events
</button> <button class="event-filter px-6 py-2 rounded-full font-semibold transition" data-category="practice" data-astro-cid-ro7pgs3h>
Special Practices
</button> <button class="event-filter px-6 py-2 rounded-full font-semibold transition" data-category="news" data-astro-cid-ro7pgs3h>
News
</button> </div> <!-- Events Grid --> ${posts.length === 0 ? renderTemplate`<div class="text-center py-12 bg-gray-50 rounded-lg" data-astro-cid-ro7pgs3h> <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ro7pgs3h> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-astro-cid-ro7pgs3h></path> </svg> <p class="text-gray-600 text-lg mb-2" data-astro-cid-ro7pgs3h>No events posted yet</p> <p class="text-gray-500" data-astro-cid-ro7pgs3h>Check back soon or follow us on social media for updates!</p> </div>` : renderTemplate`<div id="events-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-astro-cid-ro7pgs3h> ${posts.map((post) => renderTemplate`<a${addAttribute(`/events/${post.slug}`, "href")} class="event-item bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition block"${addAttribute(post.category, "data-category")} data-astro-cid-ro7pgs3h> <div${addAttribute(`h-2 ${post.category === "race" ? "bg-red-500" : post.category === "practice" ? "bg-blue-500" : post.category === "event" ? "bg-green-500" : "bg-gray-500"}`, "class")} data-astro-cid-ro7pgs3h></div> <div class="p-6" data-astro-cid-ro7pgs3h> <div class="flex items-center gap-2 mb-3" data-astro-cid-ro7pgs3h> <span${addAttribute(`px-3 py-1 rounded-full text-xs font-bold uppercase ${post.category === "race" ? "bg-red-100 text-red-700" : post.category === "practice" ? "bg-blue-100 text-blue-700" : post.category === "event" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`, "class")} data-astro-cid-ro7pgs3h> ${post.category} </span> </div> <h2 class="text-2xl font-bold mb-3 text-gray-900" data-astro-cid-ro7pgs3h>${post.title}</h2> <div class="flex items-center text-gray-600 text-sm mb-4" data-astro-cid-ro7pgs3h> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ro7pgs3h> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-astro-cid-ro7pgs3h></path> </svg> ${new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </div> <div class="flex items-center text-[var(--color-ocean-blue)] font-semibold" data-astro-cid-ro7pgs3h>
Read More
<svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ro7pgs3h> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-astro-cid-ro7pgs3h></path> </svg> </div> </div> </a>`)} </div>`} <!-- Social Media Feed --> <div class="mt-16 bg-gray-50 rounded-lg p-8" data-astro-cid-ro7pgs3h> <h2 class="text-3xl font-bold mb-6 text-gray-900 text-center" data-astro-cid-ro7pgs3h>Follow Us for Live Updates</h2> <p class="text-center text-gray-600 mb-6" data-astro-cid-ro7pgs3h>
Get real-time updates on practices, weather conditions, and last-minute changes
</p> <div class="flex justify-center gap-6" data-astro-cid-ro7pgs3h> <a href="https://www.facebook.com/profile.php?id=61555487985276" target="_blank" rel="noopener" class="btn-ocean px-8 py-3 rounded-lg flex items-center gap-2" data-astro-cid-ro7pgs3h> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-ro7pgs3h> <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" data-astro-cid-ro7pgs3h></path> </svg>
Facebook
</a> <a href="https://www.instagram.com/9thislandocc/" target="_blank" rel="noopener" class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:opacity-90 transition flex items-center gap-2" data-astro-cid-ro7pgs3h> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-ro7pgs3h> <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" data-astro-cid-ro7pgs3h></path> </svg>
Instagram
</a> </div> </div> </div> ` })}  ${renderScript($$result, "K:/AI-Projects/9thisland/src/pages/events.astro?astro&type=script&index=0&lang.ts")}`;
}, "K:/AI-Projects/9thisland/src/pages/events.astro", void 0);

const $$file = "K:/AI-Projects/9thisland/src/pages/events.astro";
const $$url = "/events";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Events,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
