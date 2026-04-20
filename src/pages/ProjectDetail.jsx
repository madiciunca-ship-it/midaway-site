import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import projects from "../data/projects";
import { getSiteLanguage, setSiteLanguage } from "../utils/siteLanguage";

const backPillStyle = {
  display: "inline-flex",
  alignItems: "center",
  padding: "8px 12px",
  borderRadius: 999,
  border: "1px solid var(--accent)",
  color: "var(--secondary)",
  textDecoration: "none",
  fontWeight: 500,
  background: "transparent",
};

const segBtnStyle = (active) => ({
  padding: "8px 14px",
  border: "none",
  background: active ? "var(--accent)" : "transparent",
  color: active ? "#fff" : "#444",
  cursor: "pointer",
  fontWeight: 700,
});

function getProjectTranslation(p, lang) {
  if (lang === "ro") {
    return {
      title: p.title,
      tagline: p.tagline,
      body: p.body,
      links: p.links,
    };
  }

  const map = {
    editura: {
      title: "Midaway Publishing House",
      tagline: "Independent books — from lived reality into fiction.",
      body: [
        "We publish travel journals, essays, short fiction, and selected translations from the cultures encountered along the way.",
        "We look for living literature: texts that spark dialogue, courage, and closeness. Every book is shaped with care — from editing to print — so that it may endure.",
        "• What we publish: travel journals and memoirs; essays and literature of ideas; short fiction and narrative nonfiction; selected translations from places that remain less charted.",
        "• How we work: attentive curation and careful editing; clear typographic design, quality paper, and sustainable print runs; local printing and close attention to the material form of the book; respect for the author through editorial contracts, transparency, and thoughtful promotion.",
        "Collections:",
        "• Travel Journals (journeys that change a life)",
        "• Essays in Motion (ideas that illuminate the present)",
        "• Living Fiction (short prose that breathes)",
      ],
      links: [
        { label: "Explore the books", href: "/carti" },
        { label: "Send us your manuscript", href: "/contact?subject=Manuscris" },
      ],
    },

    autori: {
      title: "Midaway Authors",
      tagline: "Independent voices writing the world.",
      body: [
        "Midaway Authors is the place where each writer’s voice begins to take form. We look for living, honest texts — writing brave enough to see the world from real and unguarded angles.",
        "We publish both emerging authors and established writers, as long as what they write feels alive, courageous, and meaningful.",
        "• What we offer authors: a dedicated editor, honest feedback, a clear editorial process, attentive typographic design, sustainable print runs, and integrated promotion.",
        "• What we are looking for: travel journals, memoirs, essays, short fiction, and narrative nonfiction — texts that create dialogue and human closeness.",
        "If you would like to join us, send us a manuscript or a proposal. Tell us why it matters to you that this book should come into the world now.",
      ],
      links: [
        { label: "See the authors’ books", href: "/carti" },
        { label: "Become a Midaway author", href: "/autori?lang=ro#devino" },
        { label: "Interviews & media", href: "/multimedia" },
      ],
    },

    biblioteca: {
      title: "Midaway Library",
      tagline: "A place where books return to the community.",
      body: [
        "The Midaway Library is more than an archive. We imagine it as a living space for reading — both digital and physical — where texts keep circulating and readers keep meeting.",
        "We are building a digital library of fragments, essays, and freely accessible selections. Alongside them, we are adding bonus materials and carefully curated recommendations.",
        "We are also preparing a physical reading room (coming soon), with themed gatherings and open shelves for those who step through our door.",
        "How you can contribute: suggest titles, donate books for the shared shelf, or tell us what you would love to read next.",
      ],
      links: [
        { label: "Browse the books", href: "/carti" },
        { label: "Fragments & readings", href: "/blog" },
        {
          label: "Suggest a title",
          href: "/contact?subject=Propunere%20Biblioteca%20Midaway",
        },
      ],
    },

    evenimente: {
      title: "Events & Retreats",
      tagline: "Spaces for writing, breathing, and living encounters.",
      body: [
        "Midaway events bring together people who write, read, and live close to the meaning of things. Each retreat is a breathing pause — a place where silence has work to do and words begin to flow again.",
        "We organise writing workshops, meetings with authors, and open conversations about books and the creative process. Every participant becomes part of a living circle of learning, exploration, and mutual support.",
        "Midaway creative residencies offer time, space, and quiet to writers who are in the middle of making something. Each edition has its own theme, its own inspiring place, and a small yet intense community.",
        "The programme is short and carefully shaped: imagination exercises, walks, conversations, and moments of reflection. It is a way back to writing, but also a way back to yourself.",
        "All Midaway events are created in the spirit of the publishing house — authentic, simple, and deeply human.",
      ],
      links: [
        { label: "See the calendar", href: "/evenimente" },
        {
          label: "Register for the next retreat",
          href: "/contact?subject=Retreat%20Midaway",
        },
        {
          label: "Propose a workshop",
          href: "/contact?subject=Propunere%20Workshop",
        },
      ],
    },

    media: {
      title: "Media Projects",
      tagline: "Podcasts, interviews, and short documentary formats.",
      body: [
        "We document authentic voices from travel, alternative education, and the creative process.",
        "Podcasts, interviews, short documentary pieces, and small moving stories gathered from the road of the world.",
      ],
      links: [
        { label: "See Multimedia", href: "/multimedia" },
        { label: "Suggest a guest", href: "/contact" },
      ],
    },

    sustinere: {
      title: "Join the community",
      tagline: "A community for those who believe in words, beauty, and meaningful work.",
      body: [
        "Midaway grows through people. We are looking for collaborators, cultural partners, and kindred spirits who want to join us in editorial projects, events, and media work.",
        "If you are an author, editor, translator, graphic designer, photographer, bookseller, or simply someone who loves books — write to us. We build thoughtful projects, with a natural rhythm and close attention to detail.",
        "We are open to partnerships with libraries, cultural centres, festivals, or schools for workshops, launches, and educational programmes.",
        "You can contribute with ideas, expertise, spaces, logistical resources, or support for printing and distribution. What matters most is that everything brings real value to the community.",
      ],
      links: [
        {
          label: "Propose a collaboration",
          href: "/contact?subject=Propunere%20colaborare%20Midaway",
        },
        {
          label: "Become a cultural partner",
          href: "/contact?subject=Parteneriat%20cultural",
        },
        { label: "Join the community", href: "/contact?subject=Join%20the%20Midaway%20community" },
      ],
    },
  };

  return (
    map[p.id] || {
      title: p.title,
      tagline: p.tagline,
      body: p.body,
      links: p.links,
    }
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const p = projects.find((x) => x.id === id);

  const [lang, setLang] = useState(() =>
  getSiteLanguage(["projects.detail.lang", "projects.lang"])
);

useEffect(() => {
  if (typeof window !== "undefined") {
    setSiteLanguage(lang, ["projects.detail.lang", "projects.lang"]);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }
}, [lang, id]);

  const ui =
    lang === "en"
      ? {
          notFoundTitle: "This project does not exist",
          notFoundText: "Back to",
          projects: "the Midaway Vision",
          backProjects: "← Back to the Midaway Vision",
          backTop: "↑ Back to top",
          guideRo:
            "Pentru versiunea în limba română, poți schimba limba din selectorul RO / EN.",
          guideEn:
            "For the Romanian version, you can switch the language using the RO / EN.",
          plansTitle: "Membership plans",
          popular: "Popular",
          signUp: "Join",
          questions: "Questions",
          donateNow: "Donate now",
          explorer: "Explorer",
          traveler: "Traveler",
          storyteller: "Storyteller",
          perMonth: "/ month",
          planExplorer: [
            "Extended monthly newsletter",
            "Preview excerpts",
            "“Midaway Supporter” badge",
          ],
          planTraveler: [
            "Everything in Explorer",
            "Complimentary eBooks (quarterly selection)",
            "Access to online gatherings",
          ],
          planStoryteller: [
            "Everything in Traveler",
            "Institutional licence (1 library/centre)",
            "VIP access to launches & Q&A sessions",
          ],
        }
      : {
          notFoundTitle: "Proiectul nu există",
          notFoundText: "Înapoi la",
          projects: "Viziune",
          backProjects: "← Înapoi la Viziune",
          backTop: "↑ Înapoi sus",
          guideRo:
            "Pentru versiunea în limba engleză, poți schimba limba din selectorul RO / EN.",
          guideEn:
            "For the English version, you can switch the language using the RO / EN.",
          plansTitle: "Planuri de abonament",
          popular: "Popular",
          signUp: "Înscrie-te",
          questions: "Întrebări",
          donateNow: "Donează acum",
          explorer: "Explorator",
          traveler: "Călător",
          storyteller: "Povestitor",
          perMonth: "/ lună",
          planExplorer: [
            "Newsletter lunar extins",
            "Fragmente în premieră",
            "Badge „Susținător Midaway”",
          ],
          planTraveler: [
            "Tot din Explorator",
            "Ebook-uri cadou (selecție trimestrială)",
            "Acces la întâlniri online",
          ],
          planStoryteller: [
            "Tot din Călător",
            "Licență instituțională (1 bibliotecă/centru)",
            "Acces VIP la lansări & sesiuni Q&A",
          ],
        };

  if (!p) {
    return (
      <div className="container" style={{ padding: "40px 16px" }}>
        <h1 className="font-cormorant">{ui.notFoundTitle}</h1>
        <p>
          {ui.notFoundText}{" "}
          <Link to="/proiecte" style={{ color: "var(--accent)", textDecoration: "none" }}>
            {ui.projects}
          </Link>
          .
        </p>
      </div>
    );
  }

  const translated = useMemo(() => getProjectTranslation(p, lang), [p, lang]);

  const isSupport = p.id === "sustinere";
  const showPlans = isSupport && p.showPlans === true;

  return (
    <>
      <div className="container" style={{ paddingTop: 24, paddingBottom: 22 }}>
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to="/proiecte" style={backPillStyle}>
            {ui.backProjects}
          </Link>

          <div
            role="group"
            aria-label="Project detail language switch"
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
            marginTop: 20,
            marginBottom: 0,
            textAlign: "center",
            color: "#2b2b2b",
            fontSize: 17,
            lineHeight: 1.7,
          }}
        >
          {ui.guideRo}
          <br />
          {ui.guideEn}
        </p>
      </div>

      <div className="proj-hero" style={{ backgroundImage: `url(${p.cover})` }}>
  <div className="proj-hero-overlay" />
  <div
    className="container"
    style={{
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <h1
      className="font-cormorant"
      style={{
        color: "#fff",
        margin: 0,
        display: "flex",
        gap: 12,
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: 34 }}>{p.emoji}</span> {translated.title}
    </h1>

    <p
      style={{
        color: "#fff",
        opacity: 0.92,
        marginTop: 8,
        textAlign: "center",
      }}
    >
      {translated.tagline}
    </p>
  </div>
</div>

      <div className="container" style={{ padding: "24px 0 48px", maxWidth: 900 }}>
        {translated.body.map((para, i) => (
          <p key={i} style={{ lineHeight: 1.8 }}>
            {para}
          </p>
        ))}

        {showPlans && (
          <>
            <h2 id="planuri" className="font-cormorant" style={{ marginTop: 24 }}>
              {ui.plansTitle}
            </h2>

            <div className="plan-grid">
              <div className="plan-card">
                <h3 className="plan-title">{ui.explorer}</h3>
                <div className="plan-price">
                  5 € {ui.perMonth}
                </div>
                <ul className="plan-ul">
                  {ui.planExplorer.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <div className="plan-actions">
                  <a className="btn" href="/contact?subject=Explorator%20-%20Abonament">
                    {ui.signUp}
                  </a>
                  <a className="btn-outline" href="/contact?subject=Explorator%20-%20Întrebări">
                    {ui.questions}
                  </a>
                  <Link to="/donatii" className="btn-danger">
                    {ui.donateNow}
                  </Link>
                </div>
              </div>

              <div
                className="plan-card"
                style={{ position: "relative", border: "1px solid #f1d6d6" }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    background: "var(--accent)",
                    color: "#fff",
                    padding: "4px 10px",
                    borderRadius: 999,
                    fontSize: 12,
                  }}
                >
                  {ui.popular}
                </span>
                <h3 className="plan-title">{ui.traveler}</h3>
                <div className="plan-price">
                  10 € {ui.perMonth}
                </div>
                <ul className="plan-ul">
                  {ui.planTraveler.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <div className="plan-actions">
                  <a className="btn" href="/contact?subject=Călător%20-%20Abonament">
                    {ui.signUp}
                  </a>
                  <a className="btn-outline" href="/contact?subject=Călător%20-%20Întrebări">
                    {ui.questions}
                  </a>
                  <Link to="/donatii" className="btn-danger">
                    {ui.donateNow}
                  </Link>
                </div>
              </div>

              <div className="plan-card">
                <h3 className="plan-title">{ui.storyteller}</h3>
                <div className="plan-price">
                  20 € {ui.perMonth}
                </div>
                <ul className="plan-ul">
                  {ui.planStoryteller.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <div className="plan-actions">
                  <a className="btn" href="/contact?subject=Povestitor%20-%20Abonament">
                    {ui.signUp}
                  </a>
                  <a className="btn-outline" href="/contact?subject=Povestitor%20-%20Întrebări">
                    {ui.questions}
                  </a>
                  <Link to="/donatii" className="btn-danger">
                    {ui.donateNow}
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
          {translated.links.map((l, i) => (
            <Link key={i} to={l.href} className="btn" style={{ textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
        </div>

        <div
          style={{
            marginTop: 24,
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Link to="/proiecte" style={backPillStyle}>
            {ui.backProjects}
          </Link>

          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            style={backPillStyle}
          >
            {ui.backTop}
          </a>
        </div>
      </div>
    </>
  );
}