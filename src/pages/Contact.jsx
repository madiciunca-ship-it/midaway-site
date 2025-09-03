import React from "react";

export default function Contact() {
  return (
    <div style={{ padding: 24, maxWidth: 700, margin: "0 auto" }}>
      <h1 style={{ marginTop: 0 }}>📬 Contact</h1>
      <p style={{ color: "#555", marginBottom: 20 }}>
        Pentru evenimente, colaborări sau întrebări, scrie-mi aici. Îți voi răspunde cât mai curând.
      </p>

      {/* Date de contact directe */}
      {/* Social links */}
<div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
  <a
    href="https://www.instagram.com/midaway.official/" // schimbă cu pagina ta
    target="_blank"
    rel="noopener noreferrer"
    style={{
      padding: "10px 12px",
      borderRadius: 10,
      border: "1px solid #ddd",
      textDecoration: "none",
      color: "#111",
      background: "#fff",
    }}
  >
    📸 Instagram
  </a>
  <a
    href="https://www.facebook.com/share/1B9AJBjdX1/?mibextid=wwXIfr" // schimbă cu pagina ta
    target="_blank"
    rel="noopener noreferrer"
    style={{
      padding: "10px 12px",
      borderRadius: 10,
      border: "1px solid #ddd",
      textDecoration: "none",
      color: "#111",
      background: "#fff",
    }}
  >
    👍 Facebook
  </a>
  <a
    href="https://www.youtube.com/channel/UCKos5McBc44j6dViovnKiZw" // schimbă cu canalul tău
    target="_blank"
    rel="noopener noreferrer"
    style={{
      padding: "10px 12px",
      borderRadius: 10,
      border: "1px solid #ddd",
      textDecoration: "none",
      color: "#111",
      background: "#fff",
    }}
  >
    ▶️ YouTube
  </a>
</div>


      {/* Formular de contact */}
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
      alert("Mulțumesc! Mesajul a fost trimis ✅");
      form.reset();
    } else {
      alert("Ups, nu am putut trimite mesajul. Mai încearcă sau scrie la contact@midaway.ro");
    }
  }}
  style={{ display: "grid", gap: 12 }}
>
  <input type="text" name="nume" placeholder="Nume" required style={inputStyle} />
  <input type="email" name="email" placeholder="Email" required style={inputStyle} />
  <input type="text" name="subiect" placeholder="Subiect" style={inputStyle} />
  <textarea name="mesaj" placeholder="Mesajul tău" rows={5} required style={inputStyle} />
  {/* opțional: subiect implicit pentru emailul primit */}
  <input type="hidden" name="_subject" value="Mesaj nou de pe midaway.ro" />
  {/* opțional: antispam simplu */}
  <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
  <button type="submit" style={btnStyle}>Trimite mesajul</button>
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

const btnStyle = {
  padding: "12px 16px",
  borderRadius: 10,
  border: "none",
  background: "#111",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};
