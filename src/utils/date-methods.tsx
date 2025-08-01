import { Text } from "@react-pdf/renderer";
import { format, isValid, parse } from "date-fns";

export const getPlaceholder = (text: string) => (
  <Text style={{ color: "#888" }}>{text}</Text>
);

export const formatDate = (date: string) => {
  if (!date) return "";
  const parsedDate = parse(date, "yyyy-MM", new Date());
  if (!isValid(parsedDate)) return "";
  return format(parsedDate, "MM/yyyy");
};
