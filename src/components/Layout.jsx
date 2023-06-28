import React from "react";
import { Outlet } from "react-router-dom";

import { Navbar, Footer } from ".";
import { Container } from "react-bootstrap";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="py-4 py-lg-5 px-4 px-lg-5 ">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
}
