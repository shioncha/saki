"use client";

import { format, formatDistanceToNow, parseISO } from "date-fns";
import { ja } from "date-fns/locale";

import styles from "./RelativeTime.module.css";

type Props = {
  dateString: string;
};

export function RelativeTime({ dateString }: Props) {
  const date = parseISO(dateString);
  const relative = formatDistanceToNow(date, { addSuffix: true, locale: ja });
  const absolute = format(date, "yyyy年M月d日 HH:mm", { locale: ja });

  return (
    <time
      className={styles.time}
      dateTime={dateString}
      data-tooltip={absolute}
      aria-label={`${relative} (${absolute})`}
      tabIndex={0}
      suppressHydrationWarning
    >
      {relative}
    </time>
  );
}
