import { format } from "date-fns";

export const formatDateByYearMonthDays = (date: Date | string) => {
  return format(date, "yyyy-MM-dd");
};
