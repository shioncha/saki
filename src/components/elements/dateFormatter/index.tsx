import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export function DateFormatter({ date }: { date: string | undefined }) {
  if (!date) return null;
  return <time dateTime={date}>{dayjs(date).format('YYYY.MM.DD')}</time>
}