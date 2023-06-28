import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import millify from "millify";
import { Row, Col, Form, ListGroup, Container } from "react-bootstrap";
import HTMLReactParser from "html-react-parser";
import LineChart from "../components/LineChart";

export default function CryptoDetails() {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory, isFetching: isFetching2 } =
    useGetCryptoHistoryQuery({
      coinId,
      timePeriod,
    });
  const cryptoDetails = data?.data?.coin;

  if (isFetching || isFetching2) return <div className="loader" />;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Cena w dolarach",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <i className="bi bi-currency-dollar" />,
    },
    {
      title: "Miejsce",
      value: cryptoDetails?.rank,
      icon: <i className="bi bi-hash" />,
    },

    {
      title: "Kapitalizacja rynku",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <i className="bi bi-currency-dollar" />,
    },
    {
      title: "Dzienna średnia",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <i className="bi bi-trophy" />,
    },
  ];

  const genericStats = [
    {
      title: "Liczba rynków",
      value: cryptoDetails?.numberOfMarkets,
      icon: <i className="bi bi-graph-up" />,
    },
    {
      title: "Liczba wymian",
      value: cryptoDetails?.numberOfExchanges,
      icon: <i className="bi bi-arrow-down-up" />,
    },
    {
      title: "Zatwierdzona dostawa",
      value: cryptoDetails?.supply?.confirmed ? (
        <i className="bi bi-check fw-bold" />
      ) : (
        <i className="bi bi-x fw-bold" />
      ),
      icon: <i className="bi bi-info-circle" />,
    },
    {
      title: "Całkowite zaopatrzenie",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <i className="bi bi-info-circle" />,
    },
    {
      title: "W obiegu",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <i className="bi bi-info-circle" />,
    },
  ];

  return (
    <Container>
      <h1 className="text-center">
        {cryptoDetails.name} ({cryptoDetails.symbol})
      </h1>
      <p className="text-secondary text-center">
        {cryptoDetails.name} - statystyki w dolarach amerykańskich.
      </p>

      <Form.Select
        aria-label="Wybór przedziału czasowego"
        value={timePeriod}
        className="w-25 mx-auto"
        onChange={(e) => setTimePeriod(e.target.value)}
      >
        {time.map((period) => (
          <option key={period} value={period}>
            {period}
          </option>
        ))}
      </Form.Select>

      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />

      <Row className="mt-0 g-5 justify-content-evenly">
        <Col xs={12} sm={8} md={7} xl={5} xxl={4}>
          <h3 className="mb-3">{cryptoDetails.name} statystki</h3>
          <ListGroup>
            {stats.map(({ icon, title, value }) => (
              <ListGroup.Item
                key={title}
                className="d-flex justify-content-between border-0 rounded-0 hover-color border-bottom"
              >
                <div className="text-secondary">
                  {icon} <span className="ms-1">{title}</span>
                </div>
                <span className="fw-bold">{value}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col xs={12} sm={8} md={7} xl={5} xxl={4}>
          <h3 className="mb-3">Pozostałe statystki</h3>
          <ListGroup>
            {genericStats.map(({ icon, title, value }) => (
              <ListGroup.Item
                key={title}
                className="d-flex justify-content-between border-0 rounded-0 hover-color border-bottom"
              >
                <div className="text-secondary">
                  {icon} <span className="ms-1">{title}</span>
                </div>
                <span className="fw-bold">{value}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col xs={12} sm={8} md={7}>
          <h4 className="mb-3">Czym jest {cryptoDetails.name}?</h4>
          <p className="mb-0">{HTMLReactParser(cryptoDetails.description)}</p>
        </Col>

        <Col xs={12} sm={8} md={7}>
          <h4 className="mt-5 mb-3">{cryptoDetails.name} - linki</h4>
          <ListGroup className="mb-5 mx-auto">
            {cryptoDetails.links.map((link) => (
              <Link key={link.url} to={link.url}>
                <ListGroup.Item className="d-flex justify-content-between border-0 rounded-0 hover-color border-bottom">
                  <span>{link.type}</span>
                  <span>{link.name} </span>
                </ListGroup.Item>
              </Link>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
