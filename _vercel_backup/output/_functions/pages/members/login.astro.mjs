import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DYawapiQ.mjs';
import { $ as $$Layout } from '../../chunks/Layout_BnlNgcIv.mjs';
export { renderers } from '../../renderers.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Members Login - 9th Island OCC" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-gradient-to-b from-[var(--color-ocean-blue)] to-[var(--color-ocean-dark)] text-white py-16"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> <h1 class="text-4xl font-bold mb-4">Members Area</h1> <p class="text-xl opacity-90">Please enter the club password to access</p> </div> </div> <div class="max-w-md mx-auto px-4 py-16"> <div class="bg-white rounded-lg shadow-lg p-8"> <form id="login-form" class="space-y-6"> <div> <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
Club Password
</label> <input type="password" id="password" name="password" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-ocean-blue)] focus:border-transparent" placeholder="Enter password"> </div> <div id="error-message" class="hidden text-red-600 text-sm bg-red-50 p-3 rounded">
Incorrect password. Please try again.
</div> <button type="submit" class="w-full btn-ocean font-semibold py-3 px-6 rounded-lg">
Access Members Area
</button> </form> </div> <p class="text-center mt-6 text-gray-500 text-sm">
Forgot the password? Ask a coach or board member.
</p> </div> ` })} ${renderScript($$result, "K:/AI-Projects/9thisland/src/pages/members/login.astro?astro&type=script&index=0&lang.ts")}`;
}, "K:/AI-Projects/9thisland/src/pages/members/login.astro", void 0);

const $$file = "K:/AI-Projects/9thisland/src/pages/members/login.astro";
const $$url = "/members/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
