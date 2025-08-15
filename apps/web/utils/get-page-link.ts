/**
 * Generates a paginated link by setting the "page" parameter in the given URL search parameters.
 * @param searchParams
 * @param page
 */
export const getPageLink = (searchParams: URLSearchParams, page: number) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set("page", String(page));
  return `?${params.toString()}`;
};
