import { PageContent } from "../common/types";
import { buildSpecFrom } from "../parsers";
import { OpenAPIObject } from "openapi3-ts";
import debug from "../common/logging";

const debugLog = debug("unmock:content:utils");

let apiCheckResult: boolean;

/**
 * Check if can build a non-trivial OpenAPI spec from the page content. Cache the result to `apiCheckResult` to avoid
 * building spec everytime this is called. This could mean missing some paths not loaded when this is first executed.
 */
export const checkAndCacheApiCheckResult = async (): Promise<boolean> => {
  if (typeof apiCheckResult !== "undefined") {
    debugLog("Cached API check result", apiCheckResult);
    return apiCheckResult;
  }
  apiCheckResult = await checkIfCanParsePathsFromPage();
  return !!apiCheckResult;
};

export const checkIfCanParsePathsFromPage = async (): Promise<
  boolean | undefined
> => {
  let isApi: boolean;
  try {
    const pageContent = getPageContent();
    const spec: OpenAPIObject = await buildSpecFrom(pageContent);
    isApi = Object.keys(spec.paths).length > 0;
  } catch (err) {
    console.error("Failed building OpenAPI spec from page", err);
  }
  return isApi;
};

export const getPageContent = (): PageContent => {
  const body = document.body;
  const textContent = body.innerText || body.textContent;
  const innerHtml = document.documentElement.innerHTML;
  return { title: document.title, innerHtml, textContent };
};
