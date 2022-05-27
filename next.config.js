/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  i18n: {
    locales: ["default", "en", "pt", "tl" /*"es", "cn"*/],
    defaultLocale: "default",
    localeDetection: false,
  },
};

module.exports = nextConfig;
