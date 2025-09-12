/**
 * Generates pagination meta based on given items array
 */
export const paginate = <T>(items: T[], page: number, limit: number) => {
  const total = items.length;
  const pages = Math.ceil(total / limit);
  const safePage = Math.max(1, Math.min(page, pages));

  const skip = (safePage - 1) * limit;
  const end = skip + limit;

  return {
    items: items.slice(skip, end),
    pagination: {
      limit,
      page: safePage,
      total,
      pages,
    },
  };
};
