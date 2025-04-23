import dayjs from "dayjs";

export function formatedDate(date){
  const newDate = dayjs(date).format("DD MMMM, YYYY")
  return newDate
}