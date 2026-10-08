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
  const slug = title.toLowerCase().startsWith("privacy")
    ? "privacy"
    : title.toLowerCase().startsWith("cookie")
      ? "cookies"
      : title.toLowerCase().startsWith("refund")
        ? "refunds"
        : "terms";
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Experience", item: "https://doomsday.antideploy.com/" },
      { "@type": "ListItem", position: 2, name: title, item: `https://doomsday.antideploy.com/${slug}.html` },
    ],
  };
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <a href="/">Experience</a><span aria-hidden="true"> / </span><span aria-current="page">{title}</span>
      </nav>
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

