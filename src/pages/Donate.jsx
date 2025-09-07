// src/pages/Donate.jsx
export default function Donate() {
    return (
      <div className="container" style={{ padding: "48px 0" }}>
        <h1 className="font-cormorant" style={{ margin: 0 }}>Donează</h1>
        <p style={{ color: "var(--secondary)", marginTop: 8 }}>
          Pagina de donații. Vom completa detaliile bancare după ce ai actele asociației.
        </p>
        <p style={{ marginTop: 16 }}>
          Între timp, ne poți scrie aici:{" "}
          <a href="mailto:contact@midaway.ro">contact@midaway.ro</a>
        </p>
      </div>
    );
  }
  