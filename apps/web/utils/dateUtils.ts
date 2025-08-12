import { format } from "date-fns";

export const formatDatebyYearMonthDays = (date: Date | string) => {
  return format(date, "yyyy-MM-dd");
};
