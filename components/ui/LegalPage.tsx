import styles from "./legal.module.css";

const legalLinks = [
  ["Privacy", "/privacy.html"],
  ["Terms", "/terms.html"],
  ["Cookies", "/cookies.html"],
  ["Refunds", "/refunds.html"],
] as const;

export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className={styles.page}>
      <a className={styles.back} href="/">AVENGERS: DOOMSDAY</a>
      <p className={styles.kicker}>PROJECT INFORMATION</p>
      <h1>{title}</h1>
      <p className={styles.updated}>Last updated: 28 September 2026</p>
      <article>{children}</article>
      <nav aria-label="Legal pages">
        <a href="/">Experience</a>
        {legalLinks.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </nav>
    </main>
  );
}

