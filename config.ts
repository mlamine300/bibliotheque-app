const config = {
  env: {
    prodApiEndPoint: process.env.NEXT_PROD_API_ENDPOINT!,
    apiEndPoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    databaseUrl: process.env.DATABASE_URL!,
    imagekit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLICKEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      privateKey: process.env.IMAGEKIT_PRIVATEKEY!,
    },
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_REST_URL!,
      redisToken: process.env.UPSTASH_REDIS_REST_TOKEN!,
      qstashUrl: process.env.UPSTASH_QSTASH_URL!,
      qstashToken: process.env.UPSTASH_QSTASH_TOKEN!,
    },
    emailJs: {
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
    },
  },
};
export default config;
