export default function Volunteers() {
  return (
    <div style={{ padding: 24 }}>
      <h2>🤝 Devino Voluntar</h2>
      <p>
        Alătură-te proiectelor Midaway. Scriem, explorăm, documentăm, creăm împreună.
      </p>

      <h3 style={{ marginTop: 16 }}>Beneficii</h3>
      <ul style={{ lineHeight: 1.9 }}>
        <li>🌍 Proiecte culturale & călătorii</li>
        <li>✍️ Editorial & storytelling</li>
        <li>🎥 Media & content</li>
        <li>🤝 Comunitate & rețele</li>
      </ul>

      <form
        onSubmit={(e) => { e.preventDefault(); alert("Mulțumim! Formular demo trimis."); }}
        style={{ marginTop: 20, display: "grid", gap: 10, maxWidth: 520 }}
      >
        <input placeholder="Nume" style={inputStyle} />
        <input placeholder="Email" type="email" style={inputStyle} />
        <select style={inputStyle}>
          <option>Interes: Editorial</option>
          <option>Interes: Media</option>
          <option>Interes: Evenimente</option>
          <option>Interes: Erasmus+</option>
        </select>
        <textarea placeholder="Mesaj motivațional" rows={4} style={inputStyle} />
        <button style={btnStyle}>Trimite</button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: 10,
};

const btnStyle = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #111",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
};
