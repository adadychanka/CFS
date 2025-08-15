import { format } from "date-fns";

export const formatCreatedAtDate = (date: Date | string) => {
  return format(date, "yyyy-MM-dd");
};
