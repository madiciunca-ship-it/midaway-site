// src/pages/Contact.jsx
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const subjectPreset = searchParams.get("subject") || "";

  const [status, setStatus] = useState("");
  const [statusColor, setStatusColor] = useState("#666");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Se trimite…");
    setStatusColor("#666");

    const form = e.currentTarget;
    const fd = new FormData(form);

    // Mapăm câmpurile pe ce așteaptă API-ul /api/contact
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      subject: fd.get("subject"),
      message: fd.get("message"),
      // honeypot anti-bot (ascuns)
      botfield: fd.get("botfield") || ""
    };

    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const out = await r.json();

      if (r.ok && out.ok) {
        setStatus("Mulțumim! Mesajul a fost trimis ✔︎");
        setStatusColor("green");
        form.reset();
      } else {
        throw new Error(out.error || "Eroare la trimitere");
      }
    } catch (err) {
      console.error(err);
      setStatus(
        "Ups, nu am putut trimite mesajul. Încearcă din nou sau scrie direct la contact@midaway.ro."
      );
      setStatusColor("crimson");
    }
  }

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

      {/* Formular de contact – trimite la /api/contact (fără Formspree) */}
      <form
        onSubmit={handleSubmit}
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
        {/* Nume, Email, Subiect, Mesaj: numele câmpurilor sunt ce așteaptă API-ul */}
        <input type="text" name="name" placeholder="Nume" required style={inputStyle} />
        <input type="email" name="email" placeholder="Email" required style={inputStyle} />

        <input
          type="text"
          name="subject"
          placeholder="Subiect (opțional)"
          defaultValue={subjectPreset}
          style={inputStyle}
        />

        <textarea
          name="message"
          placeholder="Mesajul tău"
          rows={6}
          required
          style={inputStyle}
        />

        {/* Honeypot anti-bot (ascuns în CSS) */}
        <input
          type="text"
          name="botfield"
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

        <button type="submit" className="btn" style={{ justifySelf: "start" }}>
          Trimite mesajul
        </button>

        {/* Status UX */}
        <p style={{ margin: 0, color: statusColor }}>{status}</p>
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
