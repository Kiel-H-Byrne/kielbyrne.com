import React, { useEffect, useRef } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import { GA_TRACKING_ID, pageview, trackScrollDepth, trackEvent } from "@/lib/gtag";

export const GoogleAnalytics: React.FC = () => {
  const router = useRouter();
  const trackedDepths = useRef<Set<number>>(new Set());

  // Track virtual pageviews on route change
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
      trackedDepths.current.clear();
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // Track scroll depth milestones (25%, 50%, 75%, 90%, 100%)
  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const winHeight = window.innerHeight;
          const docHeight = document.documentElement.scrollHeight;
          const totalScrollable = docHeight - winHeight;

          if (totalScrollable <= 0) {
            ticking = false;
            return;
          }

          const currentPercentage = Math.round((scrollTop / totalScrollable) * 100);
          const milestones = [25, 50, 75, 90, 100];

          for (const milestone of milestones) {
            if (currentPercentage >= milestone && !trackedDepths.current.has(milestone)) {
              trackedDepths.current.add(milestone);
              trackScrollDepth(milestone, router.asPath);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [router.asPath]);

  // Global outbound link delegation listener
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target || !target.href) return;

      const href = target.href;
      const isExternal =
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:");

      if (isExternal && !href.includes(window.location.hostname)) {
        trackEvent({
          action: "outbound_click",
          category: "outbound_navigation",
          label: target.innerText?.trim() || href,
          destination_url: href,
          link_text: target.innerText?.trim() || "",
        });
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, []);

  return (
    <>
      {/* Global Site Tag (gtag.js) */}
      {GA_TRACKING_ID ? (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true
                });
              `,
            }}
          />
        </>
      ) : (
        <Script
          id="google-analytics-fallback"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
            `,
          }}
        />
      )}
    </>
  );
};

export default GoogleAnalytics;
