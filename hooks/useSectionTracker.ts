import { useEffect, useState } from "react";

export function useSectionTracker(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(
    sectionIds[0] || ""
  );

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window))
      return;

    let currentVisible = activeSection;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            const id = entry.target.id;
            if (id && id !== currentVisible) {
              currentVisible = id;
              setActiveSection(id);

              // Update URL hash without forcing jump scroll
              if (window.history.replaceState) {
                window.history.replaceState(null, "", `#${id}`);
              }

              // Dispatch telemetry event for analytics (Vercel Analytics / custom gtag)
              try {
                if ((window as any).va) {
                  (window as any).va("event", {
                    name: "section_view",
                    data: { section: id },
                  });
                }
                window.dispatchEvent(
                  new CustomEvent("khb_section_view", {
                    detail: { section: id },
                  })
                );
              } catch (e) {
                // Ignore analytics dispatch errors
              }
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -50% 0px",
        threshold: [0.3],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
}
