import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const cryptoNewsApi = createApi({
  reducerPath: "cyptoNewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_NEWS_API_URL,
    prepareHeaders: (headers) => {
      headers.set("X-BingApis-SDK", true);
      headers.set("X-RapidAPI-Key", import.meta.env.VITE_RAPID_API_KEY);
      headers.set("X-RapidAPI-Host", import.meta.env.VITE_NEWS_RAPIDAPI_HOST);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => ({
        url: `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
      }),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
