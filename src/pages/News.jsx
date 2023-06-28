import React, { useState } from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { Row, Card, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { useGetCryptosQuery } from "../services/cryptoApi";

export default function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 10,
  });
  const { data: cryptos } = useGetCryptosQuery(100);

  if (isFetching) return <div className="loader" />;

  const placeholderImg =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  return (
    <>
      {!simplified ? (
        <>
          <Form.Select
            aria-label="Wybór kryptowaluty"
            placeholder="Wybierz kryptowalutę"
            className="w-auto mx-auto mb-5"
            value={newsCategory}
            onChange={(e) => setNewsCategory(e.target.value)}
          >
            <option value="Wybierz kryptowalutę">Wybierz kryptowalutę</option>
            {cryptos?.data?.coins?.map((crypto) => (
              <option key={crypto.symbol} value={crypto.name}>
                {crypto.name}
              </option>
            ))}
          </Form.Select>
        </>
      ) : null}
      <Row className="g-5">
        {cryptoNews.value.map((article) => (
          <Col md={6} key={article.datePublished}>
            <Link to={article.url}>
              <Card className="h-100 pt-2 hover-shadow border rounded-0">
                <Card.Header className="d-flex  gap-4">
                  <img
                    src={
                      article?.image?.thumbnail?.contentUrl || placeholderImg
                    }
                    alt="news"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <span className="fw-bold">{article.name}</span>
                </Card.Header>

                <Card.Body>
                  <p>
                    {article.description > 100
                      ? `${article.description.substring(0, 100)}...`
                      : article.description}
                  </p>
                </Card.Body>
                <Card.Footer className="text-muted d-flex gap-2 justify-content-end">
                  <img
                    src={
                      article?.provider[0]?.image?.thumbnail?.contentUrl ||
                      placeholderImg
                    }
                    style={{ width: "20px" }}
                    alt="Provider"
                  />
                  <span style={{ fontSize: "0.85rem" }}>
                    {moment(article.datePublished).startOf("ss").fromNow()}
                  </span>
                </Card.Footer>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}
