import ImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { createClient } from "next-sanity";

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2022-03-25",
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
  })

const builder = ImageUrlBuilder(client)

export const urlFor = (source: SanityImageSource) => builder.image(source)