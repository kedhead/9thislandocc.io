import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DYawapiQ.mjs';
import { $ as $$Layout } from '../chunks/Layout_BnlNgcIv.mjs';
/* empty css                                        */
export { renderers } from '../renderers.mjs';

const $$SimpleAdmin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Simple Admin - Edit Content", "data-astro-cid-u4te725l": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-6xl mx-auto px-4 py-12" data-astro-cid-u4te725l> <h1 class="text-4xl font-bold mb-8" data-astro-cid-u4te725l>Simple Content Editor</h1> <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8" data-astro-cid-u4te725l> <p class="text-yellow-700" data-astro-cid-u4te725l> <strong data-astro-cid-u4te725l>Quick Edit Guide:</strong> To edit content on your site, you can manually edit these files in your project:
</p> </div> <div class="space-y-8" data-astro-cid-u4te725l> <!-- Site Settings --> <div class="bg-white rounded-lg shadow-md p-6" data-astro-cid-u4te725l> <h2 class="text-2xl font-bold mb-4 text-gray-900" data-astro-cid-u4te725l>Site Settings</h2> <p class="text-gray-600 mb-4" data-astro-cid-u4te725l>Edit: <code class="bg-gray-100 px-2 py-1 rounded" data-astro-cid-u4te725l>src/content/settings/site.json</code></p> <div class="space-y-2 text-sm" data-astro-cid-u4te725l> <p data-astro-cid-u4te725l><strong data-astro-cid-u4te725l>Site Name:</strong> 9th Island Outrigger Canoe Club</p> <p data-astro-cid-u4te725l><strong data-astro-cid-u4te725l>Tagline:</strong> Paddling Together, Building Ohana</p> <p data-astro-cid-u4te725l><strong data-astro-cid-u4te725l>Facebook:</strong> https://www.facebook.com/profile.php?id=61555487985276</p> <p data-astro-cid-u4te725l><strong data-astro-cid-u4te725l>Instagram:</strong> https://www.instagram.com/9thislandocc/</p> </div> </div> <!-- Blog Posts --> <div class="bg-white rounded-lg shadow-md p-6" data-astro-cid-u4te725l> <h2 class="text-2xl font-bold mb-4 text-gray-900" data-astro-cid-u4te725l>Blog Posts & Events</h2> <p class="text-gray-600 mb-4" data-astro-cid-u4te725l>Location: <code class="bg-gray-100 px-2 py-1 rounded" data-astro-cid-u4te725l>src/content/posts/</code></p> <div class="bg-blue-50 p-4 rounded-lg" data-astro-cid-u4te725l> <h3 class="font-bold mb-2" data-astro-cid-u4te725l>How to Add a New Post:</h3> <ol class="list-decimal list-inside space-y-2 text-sm" data-astro-cid-u4te725l> <li data-astro-cid-u4te725l>Create a new file in <code data-astro-cid-u4te725l>src/content/posts/</code> (e.g., <code data-astro-cid-u4te725l>my-event.mdx</code>)</li> <li data-astro-cid-u4te725l>Copy this template:</li> </ol> <pre class="bg-gray-800 text-white p-4 rounded mt-4 overflow-x-auto" data-astro-cid-u4te725l><code data-astro-cid-u4te725l>---
title: Your Event Title Here
date: 2024-11-17T00:00:00.000Z
category: event
image: /uploads/event-photo.jpg
---

Write your event details here. You can use:

- **Bold text** with double asterisks
- *Italic text* with single asterisks
- Lists like this one
- [Links](https://example.com)

## Headings with ##

And paragraphs separated by blank lines.</code></pre> </div> </div> <!-- Pages --> <div class="bg-white rounded-lg shadow-md p-6" data-astro-cid-u4te725l> <h2 class="text-2xl font-bold mb-4 text-gray-900" data-astro-cid-u4te725l>Pages (About, etc.)</h2> <p class="text-gray-600 mb-4" data-astro-cid-u4te725l>Location: <code class="bg-gray-100 px-2 py-1 rounded" data-astro-cid-u4te725l>src/content/pages/</code></p> <p class="text-sm text-gray-600" data-astro-cid-u4te725l>Edit <code data-astro-cid-u4te725l>about.mdx</code> to change the About page content.</p> </div> <!-- Images --> <div class="bg-white rounded-lg shadow-md p-6" data-astro-cid-u4te725l> <h2 class="text-2xl font-bold mb-4 text-gray-900" data-astro-cid-u4te725l>Upload Images</h2> <p class="text-gray-600 mb-4" data-astro-cid-u4te725l>Location: <code class="bg-gray-100 px-2 py-1 rounded" data-astro-cid-u4te725l>public/uploads/</code></p> <div class="bg-green-50 p-4 rounded-lg" data-astro-cid-u4te725l> <h3 class="font-bold mb-2" data-astro-cid-u4te725l>How to Add Images:</h3> <ol class="list-decimal list-inside space-y-2 text-sm" data-astro-cid-u4te725l> <li data-astro-cid-u4te725l>Place your image files in the <code data-astro-cid-u4te725l>public/uploads/</code> folder</li> <li data-astro-cid-u4te725l>Reference them in posts as: <code data-astro-cid-u4te725l>/uploads/your-image.jpg</code></li> <li data-astro-cid-u4te725l>Supported formats: JPG, PNG, GIF, WebP</li> </ol> </div> </div> <!-- Quick Actions --> <div class="bg-white rounded-lg shadow-md p-6" data-astro-cid-u4te725l> <h2 class="text-2xl font-bold mb-4 text-gray-900" data-astro-cid-u4te725l>Recommended Editors</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-astro-cid-u4te725l> <div class="border rounded-lg p-4" data-astro-cid-u4te725l> <h3 class="font-bold mb-2" data-astro-cid-u4te725l>VS Code (Free)</h3> <p class="text-sm text-gray-600 mb-2" data-astro-cid-u4te725l>Best for technical users</p> <a href="https://code.visualstudio.com/" target="_blank" class="text-blue-600 hover:underline text-sm" data-astro-cid-u4te725l>
Download →
</a> </div> <div class="border rounded-lg p-4" data-astro-cid-u4te725l> <h3 class="font-bold mb-2" data-astro-cid-u4te725l>Notepad / TextEdit</h3> <p class="text-sm text-gray-600 mb-2" data-astro-cid-u4te725l>Built into Windows/Mac</p> <p class="text-sm text-gray-500" data-astro-cid-u4te725l>Already installed on your computer</p> </div> </div> </div> <!-- Using TinaCMS --> <div class="bg-white rounded-lg shadow-md p-6" data-astro-cid-u4te725l> <h2 class="text-2xl font-bold mb-4 text-gray-900" data-astro-cid-u4te725l>For Advanced Users: TinaCMS</h2> <p class="text-gray-600 mb-4" data-astro-cid-u4te725l>
To use the visual editor (TinaCMS), you'll need to set up a free account at
<a href="https://tina.io" target="_blank" class="text-blue-600 hover:underline" data-astro-cid-u4te725l>tina.io</a> </p> <div class="bg-gray-50 p-4 rounded-lg" data-astro-cid-u4te725l> <h3 class="font-bold mb-2" data-astro-cid-u4te725l>Setup Steps:</h3> <ol class="list-decimal list-inside space-y-2 text-sm text-gray-700" data-astro-cid-u4te725l> <li data-astro-cid-u4te725l>Go to <a href="https://tina.io" target="_blank" class="text-blue-600 hover:underline" data-astro-cid-u4te725l>tina.io</a> and create account</li> <li data-astro-cid-u4te725l>Create a new project and connect to your GitHub</li> <li data-astro-cid-u4te725l>Get your Client ID and Token</li> <li data-astro-cid-u4te725l>Add them to a <code data-astro-cid-u4te725l>.env</code> file in your project root</li> <li data-astro-cid-u4te725l>Access the admin at <code data-astro-cid-u4te725l>/admin/index.html</code></li> </ol> </div> </div> </div> <div class="mt-12 text-center" data-astro-cid-u4te725l> <a href="/" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition" data-astro-cid-u4te725l>
← Back to Website
</a> </div> </div> ` })} `;
}, "K:/AI-Projects/9thisland/src/pages/simple-admin.astro", void 0);

const $$file = "K:/AI-Projects/9thisland/src/pages/simple-admin.astro";
const $$url = "/simple-admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$SimpleAdmin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
