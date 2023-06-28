import React from "react";
import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomeSection({ title, path, content }) {
  return (
    <section className="mt-5">
      <header className="mb-4">
        <Stack
          direction="horizontal"
          className="justify-content-between flex-wrap"
        >
          <h1>{title}</h1>
          <Link to={path} className="text-primary">
            Pokaż więcej
          </Link>
        </Stack>
      </header>
      {content}
    </section>
  );
}
