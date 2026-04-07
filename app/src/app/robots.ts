import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: "https://meuspeptideos.com.br/sitemap.xml",
    host: "https://meuspeptideos.com.br",
  };
}
