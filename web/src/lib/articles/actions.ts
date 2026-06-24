"use server";

import { updateTag } from "next/cache";
import { ARTICLES_TAG } from "./server";

export async function revalidateArticles() {
  updateTag(ARTICLES_TAG);
}
