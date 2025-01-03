import { fetchApi } from "@lib/api";
import type { Post, PostData } from "../interfaces/post";
import type { Site, SiteData } from "../interfaces/site";
import type { CategriesData } from "@interf/category";

const nativePostsData: PostData[] = await fetchApi<PostData[]>({
  endpoint: "posts",
  query: {
    // "filters[site][name]": "Meddiah",
    sort: "updatedAt:desc",
    populate: "*",
  },
  wrappedByKey: "data",
});

const siteData: SiteData[] = await fetchApi<SiteData[]>({
  endpoint: "sites",
  query: {
    "filters[name]": "Meddiah",
    populate: "*",
  },
  wrappedByKey: "data",
});


export const nativePosts: Post[] = nativePostsData.map((post) => {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    categories: post.categories.map(
      (category) => category?.name || "",
    ),
    imageUrl: post.image?.url || null,
    imageWidth: post.image?.width || null,
    imageHeight: post.image?.height || null,
    imageSmallUrl:
      post.image?.formats?.small?.url || null,
    imageSmallWidth:
      post.image?.formats?.small?.width || null,
    imageSmallHeight:
      post.image?.formats?.small?.height || null,
    imageMediumUrl:
      post.image?.formats?.medium?.url || null,
    imageMediumWidth:
      post.image?.formats?.medium?.width || null,
    imageMediumHeight:
      post.image?.formats?.medium?.height || null,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    publishedAt: post.publishedAt,
  };
});

export const site: Site[] = siteData.map((site) => {
  return {
    id: site.id,
    name: site.name,
    slug: site.slug,
    termsOfAgreement: site?.termsOfAgreement,
    privacyPolicy: site?.privacyPolicy,
    dmcapolicy: site?.dmcapolicy,
    cookiePolicy: site?.cookiePolicy,
    // logoUrl: site.attributes.logo.data.attributes.url,
    // logoWidth: site.attributes.logo.data.attributes.width,
    // logoHeight: site.attributes.logo.data.attributes.height,
    // logoSmallUrl:
      // site.attributes.logo.data.attributes.formats?.small?.url || null,
    // logoSmallWidth:
      // site.attributes.logo.data.attributes.formats?.small?.width || null,
    // logoSmallHeight:
      // site.attributes.logo.data.attributes.formats?.small?.height || null,
    createdAt: site.createdAt,
    updatedAt: site.updatedAt,
  };
});

export const categories: CategriesData[] = await fetchApi<CategriesData[]>({
  endpoint: "categories",
  query: {
    // "filters[name]": "Meddiah",
    populate: "*",
  },
  wrappedByKey: "data",
});
