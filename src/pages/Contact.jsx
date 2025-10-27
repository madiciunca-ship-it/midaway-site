// src/pages/Contact.jsx
import React from "react";
import { useSearchParams } from "react-router-dom";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const subjectPreset = searchParams.get("subject") || "";

  return (
    <div className="container" style={{ padding: "32px 0 48px", maxWidth: 900 }}>
      <header className="font-cormorant" style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: 40 }}>📬 Contact</h1>
        <p style={{ color: "var(--secondary)", marginTop: 8 }}>
          Scrie-ne dacă vrei să publici, să colaborezi sau doar să povestim despre cărți.
          Ne bucurăm să descoperim oameni, idei și proiecte care vor să prindă viață.
        </p>
        <p style={{ color: "var(--secondary)", marginTop: 4 }}>
          ✉️{" "}
          <a href="mailto:contact@midaway.ro" style={{ color: "var(--secondary)" }}>
            contact@midaway.ro
          </a>{" "}
          • Editura Midaway – locul unde cuvântul devine drum.
        </p>
      </header>

      {/* Social links */}
      <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <a
          href="https://www.instagram.com/midaway.official/"
          target="_blank"
          rel="noopener noreferrer"
          style={socialBtnStyle}
        >
          📸 Instagram
        </a>
        <a
          href="https://www.facebook.com/share/1B9AJBjdX1/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
          style={socialBtnStyle}
        >
          👍 Facebook
        </a>
        <a
          href="https://www.youtube.com/channel/UCKos5McBc44j6dViovnKiZw"
          target="_blank"
          rel="noopener noreferrer"
          style={socialBtnStyle}
        >
          ▶️ YouTube
        </a>
      </div>

      {/* Formular de contact (Formspree) */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const data = new FormData(form);

          const res = await fetch("https://formspree.io/f/mrbaajzn", {
            method: "POST",
            headers: { Accept: "application/json" },
            body: data,
          });

          if (res.ok) {
            alert("Mulțumim! Mesajul a fost trimis ✅");
            form.reset();
          } else {
            alert("Ups, nu am putut trimite mesajul. Mai încearcă sau scrie la contact@midaway.ro");
          }
        }}
        style={{
          marginTop: 16,
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 6px 16px rgba(0,0,0,.06)",
          display: "grid",
          gap: 12,
        }}
      >
        <input type="text" name="nume" placeholder="Nume" required style={inputStyle} />
        <input type="email" name="email" placeholder="Email" required style={inputStyle} />

        {/* Subiect precompletat din ?subject=... */}
        <input
          type="text"
          name="subiect"
          placeholder="Subiect"
          defaultValue={subjectPreset}
          style={inputStyle}
        />

        <textarea name="mesaj" placeholder="Mesajul tău" rows={6} required style={inputStyle} />

        {/* Subject pentru emailul primit în Formspree (include preset dacă există) */}
        <input
          type="hidden"
          name="_subject"
          value={`Mesaj nou de pe midaway.ro` + (subjectPreset ? ` – ${subjectPreset}` : "")}
        />

        {/* Antispam simplu */}
        <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

        <button type="submit" className="btn" style={{ justifySelf: "start" }}>
          Trimite mesajul
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: 10,
  fontSize: 14,
};

const socialBtnStyle = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  textDecoration: "none",
  color: "#111",
  background: "#fff",
};
