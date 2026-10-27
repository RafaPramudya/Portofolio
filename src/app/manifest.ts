import type { MetadataRoute } from "next";
import { manifestContent } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: manifestContent.name,
    short_name: manifestContent.shortName,
    description: manifestContent.description,
    start_url: manifestContent.startUrl,
    display: manifestContent.display,
    background_color: manifestContent.backgroundColor,
    theme_color: manifestContent.themeColor,
    icons: [manifestContent.icon],
  };
}
