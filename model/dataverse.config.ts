export const config = {
  slug: "ecommerce",
  name: "TradeverseOfficialEcommerce",
  logo: "https://example.com/logo.png",
  website: "https://tradeverse-particle.vercel.app",
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
    {
      isPublicDomain: true,
      schemaName: "notification.graphql",
    },
  ],
  ceramicUrl: null,
};
