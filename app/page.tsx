import Experience from "@/components/Experience";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: "Avengers: Doomsday Cinematic Scroll Experience",
        url: "https://doomsday.antideploy.com/",
        author: { "@type": "Person", name: "Dwij Kansagara", url: "https://about-me.antideploy.com/" },
        description: "A non-commercial cinematic interface study built with Next.js, Three.js and GSAP.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Is this an official Marvel website?", acceptedAnswer: { "@type": "Answer", text: "No. It is an independent, non-commercial fan interface study by Dwij Kansagara." } },
          { "@type": "Question", name: "How was the experience built?", acceptedAnswer: { "@type": "Answer", text: "It uses Next.js, React Three Fiber, Three.js and GSAP for a scroll-controlled cinematic presentation." } },
        ],
      },
    ],
  };

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><Experience /></>;
}
