/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  i18n: {
    locales: ["default", "en", "pt" /*"es", "tl", "cn"*/],
    defaultLocale: "default",
    localeDetection: false,
  },
};

module.exports = nextConfig;
