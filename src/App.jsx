import "./App.scss";
import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Layout from "./components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Home = lazy(() => import("./pages/Home"));
const Cryptocurrencies = lazy(() => import("./pages/Cryptocurrencies"));
const CryptoDetails = lazy(() => import("./pages/CryptoDetails"));
const News = lazy(() => import("./pages/News"));

export default function App() {
  return (
    <Suspense>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
          <Route path="/crypto/:coinId" element={<CryptoDetails />} />
          <Route path="/news" element={<News />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
