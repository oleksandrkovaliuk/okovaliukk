import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Oleksandr Kovaliuk",
    short_name: "Oleksandr Kovaliuk",
    description: "Senior Frontend Engineer",
    start_url: "https://okovaliukk.dev",
    display: "standalone",
    background_color: "#F6F6F3",
    theme_color: "#F6F6F3",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
