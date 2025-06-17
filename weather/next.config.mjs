/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    TAVILY_SEARCH_API_KEY: process.env.TAVILY_SEARCH_API_KEY,
  },
};

export default nextConfig;
