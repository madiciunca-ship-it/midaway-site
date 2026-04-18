import React, { useState } from "react";
import { Link } from "react-router-dom";
const sectionNavStyle = {
  display: "inline-flex",
  alignItems: "center",
  padding: "10px 14px",
  borderRadius: 999,
  border: "1px solid var(--accent)",
  color: "var(--accent)",
  textDecoration: "none",
  fontWeight: 600,
  background: "#fff",
  boxShadow: "0 2px 10px rgba(0,0,0,.04)",
};

export default function About() {
  const [lang, setLang] = useState("ro");

  const ui =
  lang === "en"
    ? {
        backHome: "← Back to Home",
        backTop: "↑ Back to top",
      }
    : {
        backHome: "← Înapoi la Acasă",
        backTop: "↑ Înapoi sus",
      };
  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
    <div style={{ marginTop: 2, marginBottom: 18 }}>
  <Link to="/" style={sectionNavStyle}>
    {ui.backHome}
  </Link>
</div> 
      
      
      {/* buton switch RO/EN */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: 20,
          gap: 0,
        }}
      >
        <button
          onClick={() => setLang("ro")}
          style={{
            background: lang === "ro" ? "#8b2525" : "#fff",
            color: lang === "ro" ? "#fff" : "#333",
            border: "1px solid #ddd",
            borderRadius: "20px 0 0 20px",
            padding: "6px 14px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          RO
        </button>
        <button
          onClick={() => setLang("en")}
          style={{
            background: lang === "en" ? "#8b2525" : "#fff",
            color: lang === "en" ? "#fff" : "#333",
            border: "1px solid #ddd",
            borderRadius: "0 20px 20px 0",
            padding: "6px 14px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          EN
        </button>
      </div>

      {/* conținut română */}
      {lang === "ro" && (
        <>
          <h1 style={{ marginTop: 0, marginBottom: 40, textAlign: "center" }}>🌸 Despre Midaway</h1>

          <p style={{ color: "#555", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
            Eu sunt <strong>Mida Malena</strong> – scriitoare, călătoare și povestitoare.
            <br />
            <br />
            Midaway este o <strong>editură independentă</strong> și un spațiu deschis pentru
            povești vii – texte care nasc dialog, curaj și apropiere. A pornit dintr-un drum lung
            și din dorința de a aduna voci care nu se aud destul, de a le oferi un loc în
            care cuvântul devine drum și întâlnire.
            <br />
            <br />
            În cei doi ani de rătăcire prin Asia am înțeles că nu ne alegem poveștile –
            <em> ele ne aleg pe noi</em>. Că uneori trebuie să te pierzi cu totul ca să începi
            cu adevărat. Și că lumea nu poate fi cunoscută decât trăind-o: 
            cu rucsacul în spate și cu sufletul deschis.
            <br />
            <br />
            MIDAWAY s-a născut din această certitudine: să facem loc textelor care
            rămân. Curatoriere atentă, editare îngrijită, design tipografic clar, tiraje
            sustenabile și respect pentru autor – acestea sunt reperele noastre.
            <br />
            <br />
            Așa am început: cu pași mici, cu întrebări mari și cu o singură certitudine –
            că fiecare pas poate deveni o poveste. Iar fiecare poveste – un început
            pentru altcineva.
            <br />
            <br />
            Bine ai venit în Midaway. O lume construită pe curaj, libertate și adevăr. Pas cu pas.
            <br />
        
    
          </p>

          <p style={{ marginTop: 16, lineHeight: 1.7 }}>
            Totul a pornit dintr-o întrebare simplă:{" "}
            <em>„Ce se întâmplă cu visul când ajungi să-l trăiești?”</em>.
            Am ales necunoscutul în locul confortului și am pornit la drum. 
            Din aceste experiențe s-au născut cărțile, articolele și proiectele care astăzi conturează Midaway.
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
            – Mida Malena
            </blockquote>

          <h2>✨ Ce este Midaway?</h2>
          <ul style={{ lineHeight: 1.9 }}>
            <li>✍️ <strong>Editură</strong> pentru jurnale de drum, eseuri, proză scurtă și traduceri atent lucrate</li>
            <li>🖋️ <strong>Autori Midaway</strong> – vocile independente care scriu lumea</li>
            <li>📚 <strong>Biblioteca Midaway</strong> – fragmente, lecturi și o arhivă vie pentru comunitate</li>
            <li>🎙️ <strong>Conținut media</strong> – podcasturi, interviuri și minidocumentare</li>
            <li>🌄 <strong>Evenimente & Retreaturi</strong> – spații pentru scris, respirație și întâlniri vii (în curând)</li>
            <li>🌍 <strong>Călători Midaway</strong> – oameni care descoperă lumea cu ochii și cu inima, împărtășind povești de drum</li>
            <li>🧭 <strong>Ghizi & Localnici</strong> – cei care trăiesc locurile și le arată cu autenticitate</li>
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
        </>
      )}

      {/* conținut engleză */}
      {lang === "en" && (
        <>
          <h1 style={{ marginTop: 0, marginBottom: 40, textAlign: "center" }}>🌸 About Midaway</h1>

          <p style={{ color: "#555", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
            I am <strong>Mida Malena</strong> – writer, traveler, and storyteller.
            <br />
            <br />
            Midaway is an <strong>independent publishing house</strong> and an open space for
            living stories – texts that spark dialogue, courage, and connection. It began on a long journey
            and from a desire to gather voices that are not heard often enough, to give them a place
            where words become a path and an encounter.
            <br />
            <br />
            During two years of wandering through Asia, I understood that we do not choose our stories –
            <em> they choose us</em>. That sometimes you have to lose yourself completely to truly begin.
            And that the world can only be known by living it – with a backpack on your shoulders and an open heart.
            <br />
            <br />
            MIDAWAY was born from this certainty: to make room for the texts that endure.
            Careful curation, thoughtful editing, clean typography, sustainable print runs,
            and respect for the author – these are our guiding values.
            <br />
            <br />
            This is how it began: with small steps, big questions, and one clear certainty –
            that every step can become a story. And every story – a beginning for someone else.
            <br />
            <br />
            Welcome to Midaway. A world built on courage, freedom, and truth. Step by step.
            <br />
           
          </p>

          <p style={{ marginTop: 16, lineHeight: 1.7 }}>
            It all started with a simple question:{" "}
            <em>“What happens to the dream once you begin to live it?”</em>
            I chose the unknown over comfort and set out on the road. From these experiences
            came the books, articles, and projects that now shape Midaway.
          </p>

          <blockquote
            style={{
              margin: "20px 0",
              padding: "12px 16px",
              background: "#f9f9f9",
              borderLeft: "4px solid #ccc",
            }}
          >
            “The only thing we can truly lose is Time.”
            – Mida Malena</blockquote>

          <h2>✨ What is Midaway?</h2>
          <ul style={{ lineHeight: 1.9 }}>
            <li>✍️ <strong>Publishing house</strong> for travel journals, essays, short stories, and carefully crafted translations</li>
            <li>🖋️ <strong>Midaway Authors</strong> – independent voices who write the world as they live it</li>
            <li>📚 <strong>Midaway Library</strong> – fragments, readings, and a living archive for the community</li>
            <li>🎙️ <strong>Media content</strong> – podcasts, interviews, and mini-documentaries</li>
            <li>🌄 <strong>Events & Retreats</strong> – spaces for writing, breathing, and real encounters (coming soon)</li>
            <li>🌍 <strong>Midaway Travelers</strong> – people who explore the world with open eyes and open hearts, sharing stories from the road</li>
            <li>🧭 <strong>Guides & Locals</strong> – those who live the place and reveal it with authenticity</li>
            <li>🤝 <strong>Get involved</strong> – cultural partnerships with meaning</li>
          </ul>

          <p style={{ marginTop: 20, lineHeight: 1.7 }}>
            To learn more, explore the sections of the site or reach out through the{" "}
            <Link
              to="/contact"
              style={{ color: "#0077cc", textDecoration: "none" }}
            >
              contact page
            </Link>
            .
          </p>
        </>
      )}
      <div
  style={{
    marginTop: 28,
    display: "flex",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap",
  }}
>
  <Link to="/" style={sectionNavStyle}>
    {ui.backHome}
  </Link>

  <a
    href="#top"
    onClick={(e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }}
    style={sectionNavStyle}
  >
    {ui.backTop}
  </a>
</div>
    </div>
  );
}
