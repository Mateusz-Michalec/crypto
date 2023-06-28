import React from "react";
import { Row, Col, Stack } from "react-bootstrap";
import { useGetCryptosQuery } from "../services/cryptoApi";
import millify from "millify";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import { HomeSection } from "../components";

export default function Home() {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <div className="loader" />;

  return (
    <>
      <header>
        <h1 className="mb-4">Światowe statystyki kryptowalut</h1>
        <Row>
          <Col>
            <Stack gap={4}>
              <div>
                <h5 className="text-secondary opacity-75">Kryptowaluty</h5>
                <span className="fs-4">{globalStats?.totalCoins}</span>
              </div>

              <div>
                <h5 className="text-secondary opacity-75">
                  Kapitalizacja rynkowa
                </h5>
                <span className="fs-4">
                  {millify(globalStats?.totalMarketCap)}
                </span>
              </div>

              <div>
                <h5 className="text-secondary opacity-75">Rynki</h5>
                <span className="fs-4">
                  {millify(globalStats?.totalMarkets)}
                </span>
              </div>
            </Stack>
          </Col>
          <Col>
            <Stack gap={4}>
              <div>
                <h5 className="text-secondary opacity-75">Waluty</h5>
                <span className="fs-4">
                  {millify(globalStats?.totalExchanges)}
                </span>
              </div>

              <div>
                <h5 className="text-secondary opacity-75">24h volume</h5>
                <span className="fs-4">
                  {millify(globalStats?.total24hVolume)}
                </span>
              </div>
            </Stack>
          </Col>
        </Row>
      </header>

      <HomeSection
        title="Top 10 kryptowalut na świecie"
        path="/cryptocurrencies"
        content={<Cryptocurrencies simplified={true} />}
      />

      <HomeSection
        title="Najnowsze wiadomości - kryptowaluty"
        path="/news"
        content={<News simplified={true} />}
      />
    </>
  );
}
