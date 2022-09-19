/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  i18n: {
    locales: ["en", "pt", "tl" /*"es", "cn"*/],
    defaultLocale: "en",
    localeDetection: false,
  },
};

module.exports = nextConfig;
