// lib/gtag.ts
// Google Analytics 4 (GA4) helper module for kielbyrne.com

export const GA_TRACKING_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
  process.env.NEXT_PUBLIC_GA_ID ||
  "";

// Log events to console in development mode to verify telemetry easily
const isDev = process.env.NODE_ENV === "development";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Track SPA Pageviews on client-side route changes
 */
export const pageview = (url: string, title?: string) => {
  if (typeof window === "undefined") return;

  const pageTitle = title || (typeof document !== "undefined" ? document.title : "");

  if (isDev) {
    console.log(`[GA4 Pageview] ${url} - "${pageTitle}"`);
  }

  if (typeof window.gtag === "function") {
    if (GA_TRACKING_ID) {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
        page_location: window.location.href,
        page_title: pageTitle,
      });
    } else {
      window.gtag("event", "page_view", {
        page_path: url,
        page_location: window.location.href,
        page_title: pageTitle,
      });
    }
  }
};

export interface GTagEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

/**
 * Generic GA event dispatcher
 */
export const trackEvent = ({
  action,
  category = "engagement",
  label,
  value,
  ...rest
}: GTagEvent) => {
  if (typeof window === "undefined") return;

  const eventPayload = {
    event_category: category,
    ...(label ? { event_label: label } : {}),
    ...(typeof value === "number" ? { value } : {}),
    ...rest,
  };

  if (isDev) {
    console.log(`[GA4 Event] ${action}:`, eventPayload);
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", action, eventPayload);
  }
};

/**
 * Track section views as user navigates or scrolls into view
 */
export const trackSectionView = (sectionId: string, sectionTitle?: string) => {
  trackEvent({
    action: "section_view",
    category: "content_engagement",
    label: sectionId,
    section_id: sectionId,
    section_title: sectionTitle || sectionId,
  });
};

/**
 * Track scroll depth milestones (25%, 50%, 75%, 90%, 100%)
 */
export const trackScrollDepth = (depthPercent: number, pagePath?: string) => {
  trackEvent({
    action: "scroll_depth",
    category: "engagement",
    label: `${depthPercent}%`,
    value: depthPercent,
    depth_percent: depthPercent,
    page_path: pagePath || (typeof window !== "undefined" ? window.location.pathname : ""),
  });
};

/**
 * Track navigation clicks (brand, desktop nav, mobile nav drawer)
 */
export const trackNavigation = (
  itemLabel: string,
  destination: string,
  navType: "desktop_nav" | "mobile_nav" | "brand_logo" | "quick_jump" = "desktop_nav"
) => {
  trackEvent({
    action: "nav_click",
    category: "navigation",
    label: `${navType}: ${itemLabel} -> ${destination}`,
    item_label: itemLabel,
    destination,
    nav_type: navType,
  });
};

/**
 * Track Audio Lab interactions (play, pause, seek, complete, download, select track)
 */
export const trackAudioAction = (
  action: "play" | "pause" | "complete" | "seek" | "download" | "select_track" | "mute" | "unmute",
  track: { id?: string; title: string; category?: string; src?: string },
  extra?: { progressPercent?: number; currentTime?: number }
) => {
  trackEvent({
    action: `audio_${action}`,
    category: "audio_lab",
    label: `${track.title} (${action})`,
    track_id: track.id,
    track_title: track.title,
    track_category: track.category,
    audio_action: action,
    ...(extra?.progressPercent !== undefined ? { progress_percent: Math.round(extra.progressPercent) } : {}),
    ...(extra?.currentTime !== undefined ? { current_time: Math.round(extra.currentTime) } : {}),
  });

  // Also send recommended file_download event when downloading audio
  if (action === "download") {
    trackEvent({
      action: "file_download",
      category: "download",
      label: track.title,
      file_name: track.src || `${track.title}.mp3`,
      file_extension: "mp3",
      content_type: "audio",
    });
  }
};

/**
 * Track Persona Carousel interactions
 */
export const trackPersonaAction = (
  action: "view" | "select" | "toggle_autoplay" | "next" | "prev",
  persona: { id: string; name: string; hat?: string; role?: string },
  index?: number
) => {
  trackEvent({
    action: `persona_${action}`,
    category: "persona_carousel",
    label: `${persona.name} (${action})`,
    persona_id: persona.id,
    persona_name: persona.name,
    persona_hat: persona.hat,
    persona_role: persona.role,
    ...(index !== undefined ? { persona_index: index } : {}),
  });
};

/**
 * Track Google Rabbit Hole exploration cards and CTA jumps
 */
export const trackRabbitHoleAction = (
  action: "select_prompt" | "click_cta",
  prompt: { id: string; tag: string; targetId?: string; question?: string }
) => {
  trackEvent({
    action: `rabbit_hole_${action}`,
    category: "rabbit_hole",
    label: `${prompt.tag} (${action})`,
    prompt_id: prompt.id,
    prompt_tag: prompt.tag,
    target_section: prompt.targetId,
  });
};

/**
 * Track Creations & Projects (filtering, live demos, github repos)
 */
export const trackProjectAction = (
  action: "filter_category" | "click_live_demo" | "click_github_source" | "view_card",
  project: { id?: string; title?: string; category?: string; url?: string; filterKey?: string }
) => {
  trackEvent({
    action: `project_${action}`,
    category: "portfolio_creations",
    label: project.title || project.filterKey || action,
    project_id: project.id,
    project_title: project.title,
    project_category: project.category,
    destination_url: project.url,
    filter_key: project.filterKey,
  });
};

/**
 * Track Contact, Lead Funnel, and Channel Portals
 */
export const trackLeadOrChannel = (
  action: "submit_inquiry" | "click_discovery_call" | "click_channel" | "click_cta",
  details: {
    channelName?: string;
    url?: string;
    subject?: string;
    ctaName?: string;
  }
) => {
  trackEvent({
    action: action === "submit_inquiry" ? "generate_lead" : `contact_${action}`,
    category: "conversion_and_leads",
    label: details.channelName || details.ctaName || details.subject || action,
    channel_name: details.channelName,
    destination_url: details.url,
    inquiry_subject: details.subject,
    cta_name: details.ctaName,
  });
};

/**
 * Track Theme Mode Toggle (Light / Dark)
 */
export const trackThemeToggle = (theme: "light" | "dark", source: string = "celestial_toggle") => {
  trackEvent({
    action: "theme_toggle",
    category: "ui_preferences",
    label: `Switch to ${theme}`,
    theme_mode: theme,
    toggle_source: source,
  });
};

/**
 * Track Resume / CV document viewing and PDF downloads
 */
export const trackResumeAction = (
  action: "toggle_view" | "download_pdf",
  docTitle: string,
  docPath?: string
) => {
  trackEvent({
    action: action === "download_pdf" ? "file_download" : "resume_toggle",
    category: "resume_cv",
    label: docTitle,
    document_title: docTitle,
    file_name: docPath,
    file_extension: "pdf",
  });
};
