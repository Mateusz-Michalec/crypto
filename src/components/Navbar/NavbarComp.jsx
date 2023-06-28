import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { Container, Navbar, Nav, Stack } from "react-bootstrap";
import "./Navbar.scss";

export default function NavbarComp() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  function closeMenu(e) {
    if (
      !e.target.classList.contains("navbar-toggler") &&
      !e.target.classList.contains("navbar-toggler-icon")
    )
      setExpanded(false);
  }

  useEffect(() => {
    document.body.addEventListener("click", (e) => closeMenu(e));

    return () => document.body.removeEventListener("click", closeMenu);
  }, []);

  useEffect(() => {
    if (expanded) setExpanded(false);
  }, [location.pathname]);

  return (
    <Navbar
      expand="lg"
      variant="dark"
      expanded={expanded}
      className="bg-dark-blue px-2 px-lg-0 text-white py-4 pt-lg-5 align-items-lg-start"
    >
      <Container fluid className="flex-lg-column align-items-lg-start px-lg-0">
        <Navbar.Brand className="px-lg-5 me-1">
          <Link to="/">
            <Stack direction="horizontal" gap={3}>
              <img className="logo" src={logo} alt="Crypto Logo" />
              <span className="fs-3 brand">Crypto</span>
            </Stack>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setExpanded(!expanded)}
          aria-controls="navbar-nav"
        />
        <Navbar.Collapse
          id="navbar-nav"
          className="navbar-nav-collapse text-silver"
        >
          <Nav className="fs-6 flex-lg-column px-lg-0 pt-lg-3">
            <Nav.Link
              onClick={() => setExpanded(false)}
              as={Link}
              to="/"
              className="px-5"
            >
              <i className="bi bi-house me-3" />
              <span>Home</span>
            </Nav.Link>
            <Nav.Link
              onClick={() => setExpanded(false)}
              as={Link}
              to="/cryptocurrencies"
              className="px-5"
            >
              <i className="bi bi-currency-bitcoin me-3" />
              <span>Kryptowaluty</span>
            </Nav.Link>

            <Nav.Link
              onClick={() => setExpanded(false)}
              as={Link}
              to="/news"
              className="px-5"
            >
              <i className="bi bi-cursor me-3" />
              <span>Newsy</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
