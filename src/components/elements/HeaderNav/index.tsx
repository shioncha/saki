"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Category } from "@/types/article";

import styles from "./HeaderNav.module.css";

type HeaderNavProps = {
  categories: Category[];
};

export function HeaderNav({ categories }: HeaderNavProps) {
  const pathname = usePathname();

  return (
    <ul className={styles.nav}>
      <li className={styles.navItem}>
        <Link
          href="/"
          className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
        >
          Home
        </Link>
      </li>
      {categories.map((category) => {
        const href = `/category/${category.id}`;
        const isActive = pathname === href;

        return (
          <li key={category.id} className={styles.navItem}>
            <Link
              href={`/category/${category.id}`}
              className={`${styles.link} ${isActive ? styles.active : ""}`}
            >
              {category.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
