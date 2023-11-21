import React from "react";
import { Stack, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto ">
      <Container className="text-center">
        <img src={logo} alt="Crypto logo" style={{ width: "40px" }} />
        <p className="brand">Crypto 2023</p>
        <hr className="w-50 mx-auto" />
        <Stack
          direction="horizontal"
          className="justify-content-center mt-3"
          gap={4}
        >
          <Link to="/"> Home</Link>
          <Link to="/cryptocurrencies"> Kryptowaluty</Link>
          <Link to="/currencies"> Waluty</Link>
          {/* <Link to="/news"> Newsy</Link> */}
        </Stack>
      </Container>
    </footer>
  );
}
