import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_CRYPTO_API_URL,
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", import.meta.env.VITE_RAPID_API_KEY);
      headers.set("X-RapidAPI-Host", "coinranking1.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => ({ url: `/coins?limit=${count}` }),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => ({ url: `/coin/${coinId}` }),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) => ({
        url: `coin/${coinId}/history?timePeriod=${timePeriod}`,
      }),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
