// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "main",
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "src/content/pages",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      },
      {
        name: "post",
        label: "Blog Posts & Events",
        path: "src/content/posts",
        format: "mdx",
        defaultItem: () => {
          return {
            title: "New Event",
            date: (/* @__PURE__ */ new Date()).toISOString(),
            category: "event"
          };
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: ["event", "practice", "news", "race"],
            required: true
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true
          }
        ]
      },
      {
        name: "settings",
        label: "Site Settings",
        path: "src/content/settings",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "string",
            name: "siteName",
            label: "Site Name",
            required: true
          },
          {
            type: "string",
            name: "tagline",
            label: "Tagline"
          },
          {
            type: "string",
            name: "description",
            label: "Site Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "facebookUrl",
            label: "Facebook URL"
          },
          {
            type: "string",
            name: "instagramUrl",
            label: "Instagram URL"
          },
          {
            type: "string",
            name: "contactEmail",
            label: "Contact Email"
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
