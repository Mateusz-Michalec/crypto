import React, { useEffect, useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Card, Col, Container, FormControl, Row } from "react-bootstrap";
import millify from "millify";
import { Link } from "react-router-dom";

export default function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(data?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCryptos(
      data?.data?.coins.filter((crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  if (isFetching) return <div className="loader" />;

  return (
    <>
      {!simplified ? (
        <FormControl
          className="mb-5 w-auto mx-auto text-center"
          placeholder="Szukaj kryptowalut"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      ) : null}

      <Row className="g-5">
        {cryptos?.map((crypto) => {
          const isPlus = millify(crypto.change) >= 0;
          return (
            <Col sm={6} xl={4} xxl={3} key={crypto.symbol}>
              <Link to={`/crypto/${crypto.uuid}`}>
                <Card className="h-100 hover-shadow">
                  <Card.Header className="d-flex justify-content-between">
                    <span className="fw-bold">
                      {crypto.rank + ". " + crypto.name}
                    </span>
                    <img
                      src={crypto.iconUrl}
                      alt={crypto.name}
                      style={{ width: "20px", objectFit: "contain" }}
                    />
                  </Card.Header>
                  <Card.Body>
                    <p>Cena: {millify(crypto.price)}</p>
                    <p>Kapitalizacja rynku: {millify(crypto.marketCap)}</p>
                    <p>
                      Zmiana dzienna:{" "}
                      <span
                        className={`${isPlus ? "text-success" : "text-danger"}`}
                      >
                        {millify(crypto.change)}%
                        <span>
                          {isPlus
                            ? String.fromCharCode(9650)
                            : String.fromCharCode(9660)}
                        </span>
                      </span>
                    </p>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
