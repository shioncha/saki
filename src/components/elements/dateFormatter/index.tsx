import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function DateFormatter({ date }: { date: string | undefined }) {
  if (!date) return null;
  return <time dateTime={date}>{dayjs(date).format('YYYY.MM.DD')}</time>
}