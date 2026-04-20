import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getSiteLanguage, setSiteLanguage } from "../utils/siteLanguage";

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

const inputStyle = {
  padding: "12px 14px",
  border: "1px solid #ddd",
  borderRadius: 12,
  fontSize: 15,
  background: "#fff",
  width: "100%",
  boxSizing: "border-box",
};

const socialBtnStyle = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  textDecoration: "none",
  color: "#111",
  background: "#fff",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
};

const segBtnStyle = (active) => ({
  padding: "8px 14px",
  border: "none",
  background: active ? "var(--accent)" : "transparent",
  color: active ? "#fff" : "#444",
  cursor: "pointer",
  fontWeight: 700,
});

export default function Contact() {
  const [searchParams] = useSearchParams();
  const subjectPreset = searchParams.get("subject") || "";

  const [lang, setLang] = useState(() => getSiteLanguage(["contact.lang"]));

  const [status, setStatus] = useState("");
  const [statusColor, setStatusColor] = useState("#666");

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 900;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSiteLanguage(lang, ["contact.lang"]);
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [lang]);

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 900);
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const ui =
    lang === "en"
      ? {
          backHome: "← Back to Home",
          backTop: "↑ Back to top",
          title: "📬 Contact Midaway",
          subtitle: "Where good ideas meet people willing to listen.",
          guideRo:
            "Pentru mesaje în limba română, poți schimba limba din selectorul RO / EN de mai sus.",
          guideEn:
            "For messages in Romanian, you can switch the language using the RO / EN selector above..",
          intro1:
            "Write to us if you want to publish, collaborate, or simply talk about books and journeys.",
          intro2:
            "At Midaway, we believe in real encounters – with people, ideas, and projects waiting to come alive.",
          intro3:
            "Whether you have a manuscript, a story, a question, or an intention, we’ll be glad to hear from you.",
          intro4:
            "Every message can open a door to a new story.",
          emailLine: "Midaway Publishing House – where words become a road.",
          replyTitle: "Response time",
          replyText:
            "We usually reply within 24–48 hours on working days.",
          socialsTitle: "Find us here too",
          formTitle: "Send us a message",
          formIntro:
            "If your message is about a collaboration or a manuscript, feel free to include as many details as you need.",
          name: "Your name",
          email: "Your email",
          subject: "Subject (optional)",
          message: "Your message",
          submit: "Send message",
          sending: "Sending…",
          success: "Thank you! Your message has been sent ✔︎",
          error:
            "Oops, I couldn't send your message. Please try again or write directly to contact@midaway.ro.",
          instagram: "Instagram",
          facebook: "Facebook",
          youtube: "YouTube",
          introTitle: "Let’s talk",
          editorCardTitle: "Who will read your message",
          editorCardRole: "Editorial coordination at Midaway",
          editorCardText:
            "Messages sent through this page are read and reviewed with care. If you write to us about a manuscript, a collaboration, or an idea, I will most likely be one of the first people to read your message.",
        }
      : {
          backHome: "← Înapoi la Acasă",
          backTop: "↑ Înapoi sus",
          title: "📬 Contact Midaway",
          subtitle: "Unde ideile bune găsesc oameni care le ascultă.",
          guideRo:
            "Pentru mesaje în limba engleză, poți schimba limba din selectorul RO / EN de mai sus.",
          guideEn:
            "For messages in English, you can switch the language using the RO / EN selector above.",
          intro1:
            "Scrie-ne dacă vrei să publici, să colaborăm sau doar să povestim despre cărți și drumuri.",
          intro2:
            "La Midaway credem în întâlniri adevărate – cu oameni, cu idei și cu proiecte care așteaptă să prindă viață.",
          intro3:
            "Fie că ai un manuscris, o poveste, o întrebare sau o intenție, ne bucurăm să te cunoaștem.",
          intro4:
            "Fiecare mesaj poate deschide o ușă spre o poveste nouă.",
          emailLine: "Editura Midaway – locul unde cuvântul devine drum.",
          replyTitle: "Timp de răspuns",
          replyText:
            "De obicei răspundem în 24–48 de ore, în zilele lucrătoare.",
          socialsTitle: "Ne găsești și aici",
          formTitle: "Trimite-ne un mesaj",
          formIntro:
            "Dacă mesajul tău este despre o colaborare sau despre un manuscris, poți include cât de multe detalii simți că sunt necesare.",
          name: "Nume",
          email: "Email",
          subject: "Subiect (opțional)",
          message: "Mesajul tău",
          submit: "Trimite mesajul",
          sending: "Se trimite…",
          success: "Mulțumim! Mesajul a fost trimis ✔︎",
          error:
            "Ups, nu am putut trimite mesajul. Încearcă din nou sau scrie direct la contact@midaway.ro.",
          instagram: "Instagram",
          facebook: "Facebook",
          youtube: "YouTube",
          introTitle: "Hai să vorbim",
          editorCardTitle: "Cine îți răspunde",
          editorCardRole: "Coordonare editorială Midaway",
          editorCardText:
            "Mesajele trimise prin această pagină ajung într-un spațiu atent citit și gestionat. Dacă ne scrii despre un manuscris, o colaborare sau o idee, cel mai probabil eu voi fi una dintre primele persoane care îți citesc mesajul.",
        };

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(ui.sending);
    setStatusColor("#666");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      subject: fd.get("subject"),
      message: fd.get("message"),
      botfield: fd.get("botfield") || "",
    };

    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const out = await r.json();

      if (r.ok && out.ok) {
        setStatus(ui.success);
        setStatusColor("green");
        form.reset();
      } else {
        throw new Error(out.error || "Eroare la trimitere");
      }
    } catch (err) {
      console.error(err);
      setStatus(ui.error);
      setStatusColor("crimson");
    }
  }

  return (
    <div
      className="container"
      style={{
        padding: isMobile ? "20px 0 40px" : "32px 0 48px",
        maxWidth: 1200,
      }}
    >
      <div style={{ marginTop: -8, marginBottom: 18 }}>
        <Link to="/" style={sectionNavStyle}>
          {ui.backHome}
        </Link>
      </div>

      <header
        className="font-cormorant"
        style={{
          textAlign: "center",
          marginBottom: isMobile ? 20 : 24,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: isMobile ? 36 : 44,
            lineHeight: 1.1,
          }}
        >
          {ui.title}
        </h1>

        <p
          style={{
            color: "var(--secondary)",
            marginTop: 10,
            fontSize: isMobile ? 17 : 18,
            lineHeight: 1.5,
          }}
        >
          {ui.subtitle}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 14,
            marginBottom: 14,
          }}
        >
          <div
            role="group"
            aria-label="Contact language switch"
            style={{
              display: "inline-flex",
              border: "1px solid #ddd",
              borderRadius: 999,
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <button onClick={() => setLang("ro")} style={segBtnStyle(lang === "ro")}>
              RO
            </button>
            <button onClick={() => setLang("en")} style={segBtnStyle(lang === "en")}>
              EN
            </button>
          </div>
        </div>

        <p
          className="font-cormorant"
          style={{
            marginTop: 0,
            marginBottom: 22,
            textAlign: "center",
            color: "#2b2b2b",
            fontSize: isMobile ? 16 : 18,
            lineHeight: 1.7,
            padding: isMobile ? "0 6px" : 0,
          }}
        >
          {ui.guideRo}
          <br />
          {ui.guideEn}
        </p>

        <div
          style={{
            height: 2,
            background: "#d5b56f",
            opacity: 0.6,
            marginTop: 16,
          }}
        />
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "minmax(280px, 1fr) minmax(320px, 1.15fr)",
          gap: isMobile ? 18 : 24,
          alignItems: "start",
        }}
      >
        <section
          style={{
            background: "#fffef9",
            border: "1px solid #ece7df",
            borderRadius: 18,
            padding: isMobile ? 18 : 22,
            boxShadow: "0 8px 22px rgba(0,0,0,.05)",
          }}
        >
          <h2
            className="font-cormorant"
            style={{
              marginTop: 0,
              marginBottom: 14,
              fontSize: isMobile ? 24 : 28,
              lineHeight: 1.15,
            }}
          >
            {ui.introTitle}
          </h2>

          <div style={{ display: "grid", gap: 14, lineHeight: 1.8, color: "#2b2b2b" }}>
            <p style={{ margin: 0 }}>{ui.intro1}</p>
            <p style={{ margin: 0 }}>{ui.intro2}</p>
            <p style={{ margin: 0 }}>{ui.intro3}</p>
            <p style={{ margin: 0 }}>{ui.intro4}</p>
          </div>

          <div
            style={{
              marginTop: 18,
              padding: "14px 16px",
              borderRadius: 14,
              background: "#fff",
              border: "1px solid #eee3d4",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 6 }}>✉️ Email</div>
            <a
              href="mailto:contact@midaway.ro"
              style={{ color: "var(--secondary)", textDecoration: "none" }}
            >
              contact@midaway.ro
            </a>
            <div style={{ marginTop: 6, color: "#666", fontSize: 14 }}>
              {ui.emailLine}
            </div>
          </div>

          <div
            style={{
              marginTop: 14,
              padding: "14px 16px",
              borderRadius: 14,
              background: "#fff",
              border: "1px solid #eee3d4",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 6 }}>⏳ {ui.replyTitle}</div>
            <div style={{ color: "#666", fontSize: 14 }}>{ui.replyText}</div>
          </div>

          <div style={{ marginTop: 18 }}>
            <div
              className="font-cormorant"
              style={{ marginBottom: 10, fontSize: 22, color: "#2b2b2b" }}
            >
              {ui.socialsTitle}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a
                href="https://www.instagram.com/midaway.official/"
                target="_blank"
                rel="noopener noreferrer"
                style={socialBtnStyle}
              >
                📸 {ui.instagram}
              </a>
              <a
                href="https://www.facebook.com/share/1B9AJBjdX1/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                style={socialBtnStyle}
              >
                👍 {ui.facebook}
              </a>
              <a
                href="https://www.youtube.com/channel/UCKos5McBc44j6dViovnKiZw"
                target="_blank"
                rel="noopener noreferrer"
                style={socialBtnStyle}
              >
                ▶️ {ui.youtube}
              </a>
            </div>
          </div>
        </section>

        <section
          style={{
            background: "#fffef9",
            padding: isMobile ? 18 : 24,
            borderRadius: 18,
            border: "1px solid #ece7df",
            boxShadow: "0 8px 22px rgba(0,0,0,.05)",
          }}
        >
          <h2
            className="font-cormorant"
            style={{
              marginTop: 0,
              marginBottom: 8,
              fontSize: isMobile ? 24 : 28,
              lineHeight: 1.15,
            }}
          >
            {ui.formTitle}
          </h2>

          <p style={{ marginTop: 0, color: "#666", lineHeight: 1.7 }}>
            {ui.formIntro}
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: 10,
              display: "grid",
              gap: 12,
            }}
          >
            <input type="text" name="name" placeholder={ui.name} required style={inputStyle} />

            <input
              type="email"
              name="email"
              placeholder={ui.email}
              required
              style={inputStyle}
            />

            <input
              type="text"
              name="subject"
              placeholder={ui.subject}
              defaultValue={subjectPreset}
              style={inputStyle}
            />

            <textarea
              name="message"
              placeholder={ui.message}
              rows={7}
              required
              style={{
                ...inputStyle,
                resize: "vertical",
                width: "100%",
                boxSizing: "border-box",
              }}
            />

            <input
              type="text"
              name="botfield"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <button
              type="submit"
              className="btn"
              style={{
                justifySelf: "start",
                width: isMobile ? "100%" : "auto",
              }}
            >
              {ui.submit}
            </button>

            <p style={{ margin: 0, color: statusColor }}>{status}</p>
          </form>
        </section>
      </div>

      <div
        style={{
          marginTop: 28,
          background: "#fffef9",
          border: "1px solid #ece7df",
          borderRadius: 18,
          padding: isMobile ? 18 : 22,
          boxShadow: "0 8px 22px rgba(0,0,0,.05)",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "120px 1fr",
          gap: 18,
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: isMobile ? 96 : 120,
            height: isMobile ? 96 : 120,
            borderRadius: "50%",
            overflow: "hidden",
            background: "#f3efe8",
            border: "1px solid #e8dfd0",
            justifySelf: isMobile ? "center" : "start",
          }}
        >
          <img
            src="/images/contact-editor.jpg"
            alt="Midaway editorial contact"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        <div style={{ textAlign: isMobile ? "center" : "left" }}>
          <div
            className="font-cormorant"
            style={{
              fontSize: isMobile ? 24 : 28,
              marginBottom: 6,
              color: "#2b2b2b",
              lineHeight: 1.15,
            }}
          >
            {ui.editorCardTitle}
          </div>

          <div
            style={{
              fontWeight: 700,
              color: "var(--secondary)",
              marginBottom: 8,
            }}
          >
            {ui.editorCardRole}
          </div>

          <p
            style={{
              margin: 0,
              color: "#555",
              lineHeight: 1.7,
            }}
          >
            {ui.editorCardText}
          </p>
        </div>
      </div>

      <div style={{ marginTop: 28, display: "flex", justifyContent: "center" }}>
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