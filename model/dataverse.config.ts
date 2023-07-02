export const config = {
  slug: "etrade",
  name: "TradeverseEcommerce",
  logo: "https://example.com/logo.png",
  website: "http://localhost:3000",
  defaultFolderName: "Untitled",
  description: "A marketplace for trading various products.",
  models: [
    {
      isPublicDomain: false,
      schemaName: "post.graphql",
      encryptable: ["text", "images", "videos"],
    },
    {
      isPublicDomain: true,
      schemaName: "store.graphql",
    },
  ],
  ceramicUrl: null,
};
