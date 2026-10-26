import type { Content } from "../pl";

/** English copy. Must mirror the shape of `src/content/pl`. */
export const en: Content = {
  meta: {
    title: "Smashing Views — LIVE stream visibility",
    description:
      "Support for the visibility of LIVE broadcasts and social media content. Facebook LIVE packages with clear pricing and flexible duration.",
    pricingTitle: "Facebook LIVE pricing — package calculator",
    pricingDescription:
      "Configure a Facebook LIVE package: viewer count and duration. Clear prices in PLN and individual quotes for other services.",
    contactTitle: "Contact — let's talk about your campaign",
    contactDescription:
      "Send an inquiry about a package or a quote. Include the platform, viewer count, duration and the public link to your broadcast.",
  },
  nav: {
    home: "Home",
    pricing: "Pricing",
    contact: "Contact",
    cta: "See the offer",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skip: "Skip to content",
  },
  footer: {
    tagline: "Support for the visibility of LIVE broadcasts and social media content.",
    navTitle: "Navigation",
    contactTitle: "Contact",
    legalTitle: "Legal",
    contactMissing: "Contact details are being added. Please use the contact form.",
    contactFormLink: "Contact form",
    disclaimer:
      "Smashing Views is not affiliated with, endorsed by, or sponsored by Facebook, Meta, YouTube, Instagram or TikTok. Platform names belong to their respective owners.",
    rights: "All rights reserved.",
    legal: {
      privacy: "Privacy policy",
      terms: "Terms",
      platforms: "Platform disclosure",
    },
  },
  hero: {
    eyebrow: "Smashing Views / Live visibility",
    lines: ["YOUR BROADCAST.", "GREATER", "VISIBILITY."],
    sub: "Support for the visibility of LIVE broadcasts and social media content. Choose the solution that fits your campaign.",
    ctaPrimary: "See the offer",
    ctaSecondary: "Get in touch",
    demoNote: "Data in this visualization is illustrative only",
    scroll: "Scroll",
    panel: {
      live: "LIVE",
      viewers: "Viewers (demo)",
      activity: "Activity (demo)",
      nodes: "Audience nodes",
      card1: "Session peak",
      card2: "Duration",
      nodesUnit: "nodes",
      card3: "Network",
    },
  },
  services: {
    eyebrow: "01 / Offer",
    title: ["VISIBILITY IN THE", "DIGITAL WORLD."],
    intro: "Four service areas. Each delivered to a clear specification — platform, quantity, time.",
    items: [
      {
        id: "fb-live",
        name: "Facebook LIVE",
        short: "Packages based on the number of simultaneous viewers and the duration of the service.",
        detail: "From 100 to 1000 viewers, from 60 to 150 minutes. Prices in the calculator.",
        cta: "Configure a package",
        href: "/pricing#kalkulator",
      },
      {
        id: "yt-live",
        name: "YouTube LIVE",
        short: "Viewer-count services for live broadcasts.",
        detail: "Scope and terms agreed individually, quote on request.",
        cta: "Ask for an offer",
        href: "/pricing#uslugi",
      },
      {
        id: "video",
        name: "Video visibility",
        short: "Services supporting views of video content on selected platforms.",
        detail: "Availability depends on the platform and the current service catalog.",
        cta: "Ask for an offer",
        href: "/pricing#uslugi",
      },
      {
        id: "social",
        name: "Social media",
        short: "Additional services for Facebook, Instagram, TikTok and YouTube.",
        detail: "Scope follows the current catalog and availability.",
        cta: "Ask for an offer",
        href: "/pricing#uslugi",
      },
    ],
  },
  demo: {
    eyebrow: "02 / Service demo",
    title: ["CONFIGURE", "YOUR LIVE."],
    label: "Interactive service demo",
    notice:
      "This is a simulation of package configuration. It is not a real broadcast or a representation of genuine user activity.",
    selectLabel: "Choose an illustrative viewer count",
    viewersUnit: "viewers",
    params: {
      platform: "Platform",
      viewers: "Viewers",
      duration: "Duration",
      price: "Price (60 min)",
    },
    timeline: "Broadcast timeline",
    cta: "Check available packages",
  },
  process: {
    eyebrow: "03 / Process",
    title: ["SIMPLE PROCESS.", "CLEAR OFFER."],
    steps: [
      {
        n: "01",
        title: "Choose a service",
        text: "Select the platform, viewer quantity and desired duration.",
      },
      {
        n: "02",
        title: "Send the details",
        text: "Provide the public link and key broadcast information. We never ask for your account password.",
      },
      {
        n: "03",
        title: "Agree the delivery",
        text: "You receive confirmation of availability, price and next steps.",
      },
    ],
    note: "We never ask for your account password.",
  },
  why: {
    eyebrow: "04 / Why us",
    title: ["WE DESIGN", "VISIBILITY."],
    items: [
      { title: "Clear packages and prices", text: "The full price matrix is public. You see the amount before you write." },
      { title: "Flexible duration", text: "From 60 to 150 minutes — matched to the length of your broadcast." },
      { title: "Multiple platforms", text: "Facebook, YouTube, Instagram and TikTok in one place." },
      { title: "Simple inquiry", text: "One form. The configuration from the calculator is carried over automatically." },
      { title: "Clear specification", text: "Platform, quantity, time and price — nothing hidden." },
      { title: "Individual campaigns", text: "Unusual viewer count or schedule? Let's talk." },
    ],
  },
  preview: {
    eyebrow: "05 / Pricing",
    title: ["EXAMPLE", "PACKAGES."],
    note: "Facebook LIVE examples for the stated duration. Price depends on the chosen viewer count and time — see the full matrix in the pricing page.",
    viewers: "viewers",
    minutes: "minutes",
    cta: "Full pricing",
    pick: "Choose this package",
  },
  finalCta: {
    title: ["READY FOR", "YOUR NEXT LIVE?"],
    text: "Check the available options and plan your campaign.",
    primary: "See pricing",
    secondary: "Write to us",
  },
  pricing: {
    eyebrow: "Pricing / Facebook LIVE",
    title: ["CHOOSE", "YOUR PACKAGE."],
    sub: "Clear prices and flexible options for your broadcast.",
    calc: {
      title: "Package calculator",
      viewers: "Number of viewers",
      duration: "Duration",
      minutes: "minutes",
      viewersUnit: "viewers",
      platform: "FACEBOOK LIVE",
      summary: "Summary",
      total: "Price",
      cta: "Ask about this package",
      note: "We confirm the final price and delivery terms in our reply to your inquiry.",
      meter: "Configuration visual",
    },
    matrix: {
      title: "Full price matrix",
      sub: "Every combination of viewer count and duration.",
      corner: "Time / viewers",
      select: "Select configuration",
    },
    additional: {
      eyebrow: "Other services",
      title: ["OTHER", "PLATFORMS."],
      sub: "Scope and availability are agreed individually.",
      quote: "Individual quote",
      cta: "Ask for an offer",
    },
    faq: {
      eyebrow: "FAQ",
      title: ["COMMON", "QUESTIONS."],
      items: [
        {
          q: "How do I choose the right package?",
          a: "Start with the planned length of your broadcast and the viewer count you want shown on the counter. In the calculator you change both and see the price instantly. If you are unsure, describe your campaign in the form and we will advise.",
        },
        {
          q: "Do I need to give you my account password?",
          a: "No. We never ask for a password or access to your account. A public link to the broadcast or content is enough.",
        },
        {
          q: "What information is needed for delivery?",
          a: "The platform, a public link to the broadcast or content, the desired viewer count, duration, and the planned date and time. We settle the rest in our reply to your inquiry.",
        },
        {
          q: "Can I order a custom viewer count?",
          a: "Yes, as long as the service limits allow it. Choose “Other service” in the form and describe your need — we will prepare an individual quote or tell you the variant is unavailable.",
        },
        {
          q: "Do you support other platforms?",
          a: "Besides Facebook LIVE you can ask about YouTube LIVE, Facebook video, Instagram and TikTok. Availability depends on the current service catalog, so quotes are individual.",
        },
        {
          q: "How can I get in touch before ordering?",
          a: "Through the form on the Contact page. An inquiry is not an order or a commitment to pay — it starts a conversation about the details.",
        },
        {
          q: "Do the services guarantee organic audiences?",
          a: "No. The ordered viewer count is a service parameter, not a guarantee of unique, genuinely interested people, engagement, sales or organic reach growth. The viewer counter is a service metric, not a measure of organic audience. We are not affiliated with any platform and their terms may restrict such services — the decision to use them is yours.",
        },
      ],
    },
  },
  contact: {
    eyebrow: "Contact",
    title: ["LET'S TALK ABOUT", "YOUR", "CAMPAIGN."],
    sub: "Tell us what you need. We will reply with availability, price and next steps.",
    form: {
      title: "Inquiry form",
      name: "Full name",
      email: "Email address",
      company: "Company name (optional)",
      platform: "Platform / service",
      platformPlaceholder: "Select…",
      viewers: "Viewer quantity (optional)",
      duration: "Duration (optional)",
      date: "Broadcast date and time (optional)",
      link: "Public link to the broadcast or content (optional)",
      linkHint: "Public links only. Never share passwords.",
      message: "Message",
      consent:
        "I consent to the processing of my data in order to reply to my inquiry, in accordance with the Privacy policy.",
      submit: "Send inquiry",
      sending: "Sending…",
      prefill: "Package details filled in from pricing",
      prefillPrice: "Price from the calculator",
      anyOption: "Not selected",
      success: {
        title: "Inquiry sent",
        text: "Thank you. We will reply after reviewing the details.",
        again: "Send another inquiry",
      },
      failure: "We could not send your inquiry. Please try again in a moment.",
      notConfigured:
        "Form delivery is not configured on the server yet. Your inquiry was not sent.",
      rateLimited: "Too many attempts. Please wait a moment and try again.",
      errors: {
        name: "Enter your full name (min. 2 characters).",
        email: "Enter a valid email address.",
        platform: "Select a platform or service.",
        message: "Write a message (min. 10 characters).",
        consent: "Consent is required to send the inquiry.",
        link: "Enter a valid URL starting with https://",
        viewers: "Enter the viewer count as a whole number.",
      },
    },
    info: {
      title: "Contact details",
      missing: "Additional contact details will be published soon. The form is the fastest way to reach us.",
    },
  },
  intro: { skip: "Skip" },
  lang: { label: "Language", pl: "Polski", en: "English", switchTo: "Przełącz na polski" },
  legal: {
    privacy: {
      title: "Privacy policy",
      notice: "WORKING DRAFT — requires legal review before publication. This text is not a complete privacy policy.",
      sections: [
        {
          h: "Data controller",
          p: "[TO BE COMPLETED: full name, address and contact details of the personal data controller.]",
        },
        {
          h: "Scope and purpose of processing",
          p: "Data submitted in the contact form (name, email, optionally company name, link, inquiry details) is processed to reply to your inquiry. [TO BE COMPLETED: legal basis, retention period, recipients, data subject rights.]",
        },
        {
          h: "Cookies and analytics",
          p: "The site currently uses no analytics or advertising tools. It only uses sessionStorage to show the welcome animation once per session. [TO BE COMPLETED when analytics are added.]",
        },
      ],
    },
    terms: {
      title: "Terms",
      notice: "WORKING DRAFT — requires legal review before publication. This text is not a complete set of terms.",
      sections: [
        {
          h: "Nature of the services",
          p: "The services concern supporting the visibility of broadcasts and content. Ordered values (e.g. viewer count) are service parameters and do not imply unique, interested people, engagement, sales or organic growth.",
        },
        {
          h: "Inquiries",
          p: "The contact form is for inquiries only. Sending an inquiry is not an order or a commitment to pay.",
        },
        {
          h: "Further provisions",
          p: "[TO BE COMPLETED: seller details, payment rules, liability, complaints, withdrawal rights, governing law.]",
        },
      ],
    },
    platforms: {
      title: "Platform disclosure",
      notice: "Working information — requires review.",
      sections: [
        {
          h: "No affiliation",
          p: "Smashing Views is not affiliated with Facebook, Meta Platforms, Instagram, TikTok or YouTube (Google) and is not authorised or endorsed by them. All names and trademarks belong to their owners.",
        },
        {
          h: "Platform terms",
          p: "The terms of social platforms may restrict or prohibit services that support visibility statistics. The client assesses whether using the service complies with the chosen platform's terms and bears the associated risk.",
        },
        {
          h: "Metrics versus audiences",
          p: "The viewer count in a package is a service parameter. We do not guarantee organic audiences, engagement, sales or any specific effect on platform algorithms.",
        },
      ],
    },
  },
  notFound: { title: "Page not found", back: "Back to home" },
};
