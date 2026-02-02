import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_DYawapiQ.mjs';
import { $ as $$Layout } from '../chunks/Layout_BnlNgcIv.mjs';
export { renderers } from '../renderers.mjs';

const hero = {"heading":"About Us","tagline":"Bringing the spirit of aloha to the desert"};
const introduction = {"title":"Welcome to 9th Island OCC","content":"9th Island Outrigger Canoe Club brings the spirit of aloha and Hawaiian outrigger canoe paddling tradition to Las Vegas. We are a community of paddlers dedicated to the sport of outrigger canoe racing and the cultural traditions that come with it."};
const mission = {"title":"Our Mission","description":"We strive to:","items":["Promote the sport of outrigger canoe paddling","Build a strong ohana (family) of paddlers","Share Hawaiian culture and traditions","Compete in regional and national races","Welcome paddlers of all skill levels"]};
const activities = {"title":"What We Do","items":[{"name":"Practice Sessions","description":"Regular training on Lake Mead"},{"name":"Racing","description":"Compete in regional and national outrigger canoe races"},{"name":"Community Events","description":"Beach cleanups, cultural celebrations, and social gatherings"},{"name":"Beginner Programs","description":"Introduction to outrigger paddling for new members"}]};
const coaches = {"title":"Our Coaching Staff","staff":[{"name":"Head Coach","title":"Coming Soon","photo":"","bio":"Contact us to learn more about our experienced coaching team."},{"name":"Assistant Coach","title":"Coming Soon","photo":"","bio":"Our coaches bring years of paddling experience and aloha spirit."}]};
const joinUs = {"title":"Join Us","content":"Whether you're an experienced paddler or completely new to the sport, we welcome you to our ohana. Contact us to learn more about joining 9th Island OCC."};
const aboutData = {
  hero,
  introduction,
  mission,
  activities,
  coaches,
  joinUs,
};

const $$About = createComponent(($$result, $$props, $$slots) => {
  const { hero, introduction, mission, activities, coaches, joinUs } = aboutData;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "About Us - 9th Island OCC" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-gradient-to-b from-[var(--color-ocean-blue)] to-[var(--color-ocean-dark)] text-white py-16"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> <h1 class="text-5xl font-bold mb-4">${hero.heading}</h1> <p class="text-xl opacity-90">${hero.tagline}</p> </div> </div> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"> <article class="prose prose-lg max-w-none"> <h2 class="text-4xl font-bold mb-6 text-gray-900">${introduction.title}</h2> <p class="text-lg text-gray-700 mb-6"> ${introduction.content} </p> <h3 class="text-3xl font-bold mb-4 mt-12 text-gray-900">${mission.title}</h3> <p class="text-gray-700 mb-4">${mission.description}</p> <ul class="list-disc list-inside space-y-2 text-gray-700 mb-8 ml-4"> ${mission.items.map((item) => renderTemplate`<li>${item}</li>`)} </ul> <h3 class="text-3xl font-bold mb-4 mt-12 text-gray-900">${activities.title}</h3> <div class="space-y-4 mb-8"> ${activities.items.map((activity) => renderTemplate`<div> <p class="text-gray-700"> <strong class="text-gray-900">${activity.name}:</strong> ${activity.description} </p> </div>`)} </div> <h3 class="text-3xl font-bold mb-6 mt-12 text-gray-900">${coaches.title}</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"> ${coaches.staff.map((coach) => renderTemplate`<div class="bg-gray-50 rounded-lg p-6"> <div class="text-center mb-4"> ${coach.photo ? renderTemplate`<img${addAttribute(coach.photo, "src")}${addAttribute(coach.name, "alt")} class="w-32 h-32 rounded-full mx-auto mb-4 object-cover">` : renderTemplate`<div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center"> <span class="text-gray-400 text-sm">Add Photo</span> </div>`} <h4 class="text-xl font-bold text-gray-900">${coach.name}</h4> <p class="text-[var(--color-ocean-blue)] font-semibold">${coach.title}</p> </div> <p class="text-gray-600 text-sm text-center"> ${coach.bio} </p> </div>`)} </div> <h3 class="text-3xl font-bold mb-4 mt-12 text-gray-900">${joinUs.title}</h3> <p class="text-lg text-gray-700 mb-8"> ${joinUs.content} </p> <div class="text-center mt-12"> <a href="/membership" class="inline-block btn-lava px-8 py-4 rounded-full text-lg font-semibold mr-4">
Become a Member
</a> <a href="/contact" class="inline-block btn-ocean px-8 py-4 rounded-full text-lg font-semibold">
Get in Touch
</a> </div> </article> </div> ` })}`;
}, "K:/AI-Projects/9thisland/src/pages/about.astro", void 0);

const $$file = "K:/AI-Projects/9thisland/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
