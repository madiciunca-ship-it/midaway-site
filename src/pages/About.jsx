// src/pages/About.jsx
import React from "react"; 
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ marginTop: 0 }}>🌸 Despre Midaway</h1>

      <p style={{ color: "#555", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
        Eu sunt <strong>Mida Malena</strong> – scriitoare, călătoare și povestitoare.
        <br />
        <br />
        Midaway este o <strong>editură independentă</strong> și un spațiu deschis pentru
        povești vii – texte care nasc dialog, curaj și apropiere. A pornit din drum
        și din nevoia de a aduna voci care nu se aud destul, de a le oferi un loc în
        care cuvântul devine drum și întâlnire.
        <br />
        <br />
        În cei doi ani de rătăcire prin Asia am înțeles că nu ne alegem poveștile –
        <em> ele ne aleg pe noi</em>. Că uneori trebuie să te pierzi cu totul, ca să începi
        cu adevărat. Și că lumea nu se poate cunoaște decât trăind-o, cu rucsacul
        în spate și sufletul deschis.
        <br />
        <br />
        MIDAWAY s-a născut din această certitudine: să facem loc textelor care
        rămân. Curatoriere atentă, editare îngrijită, design tipografic clar, tiraje
        sustenabile și respect pentru autor – acestea sunt reperele noastre.
        <br />
        <br />
        Așa am început: cu pași mici, cu întrebări mari și cu o singură certitudine –
        că fiecare pas poate deveni o poveste. Și fiecare poveste – un început
        pentru altcineva.
        <br />
        <br />
        Bine ai venit în Midaway. O lume care se clădește pe curaj, libertate și
        adevăr. Pas cu pas.
        <br />
        <br />
        Mida Malena
      </p>

      <p style={{ marginTop: 16, lineHeight: 1.7 }}>
        Totul a pornit dintr-o întrebare simplă:{" "}
        <em>„Ce se întâmplă cu visul când ajungi să-l trăiești?”</em>.
        Am ales necunoscutul în locul confortului și am pornit la drum. Din aceste
        experiențe s-au născut cărți, articole și proiecte care astăzi alcătuiesc Midaway.
      </p>

      <blockquote
        style={{
          margin: "20px 0",
          padding: "12px 16px",
          background: "#f9f9f9",
          borderLeft: "4px solid #ccc",
        }}
      >
        „Singurul lucru pe care îl putem pierde este Timpul.”
      </blockquote>

      <h2>✨ Ce este Midaway?</h2>
      <ul style={{ lineHeight: 1.9 }}>
        <li>✍️ <strong>Editură</strong> pentru jurnale de drum, eseuri, proză scurtă și traduceri curate</li>
        <li>🖋️ <strong>Autori Midaway</strong> – vocile independente care scriu lumea</li>
        <li>📚 <strong>Biblioteca Midaway</strong> – fragmente, lecturi și o arhivă vie pentru comunitate</li>
        <li>🎙️ <strong>Conținut media</strong> – podcasturi, interviuri și minidocumentare</li>
        <li>🌄 <strong>Evenimente & Retreaturi</strong> – spații pentru scris, respirație și întâlniri vii</li>
        <li>🤝 <strong>Implică-te</strong> – colaborări și parteneriate culturale care dau sens</li>
      </ul>

      <p style={{ marginTop: 20, lineHeight: 1.7 }}>
        Dacă vrei să afli mai multe, explorează secțiunile site-ului sau scrie-ne prin{" "}
        <Link
          to="/contact"
          style={{ color: "#0077cc", textDecoration: "none" }}
        >
          pagina de contact
        </Link>
        .
      </p>
    </div>
  );
}
