// src/pages/EventCheckout.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BOOKS } from "../data/books";
import { findEventBySlug } from "../data/events";

const COLORS = {
  burgundy: "#8b2c34",
  gold: "#d4a017",
  teal: "#2a9d8f",
  cream: "#fffaf3",
  line: "#eadfd5",
  text: "#2b2522",
  muted: "#746964",
};

function getBookCover(book) {
  return (
    book?.cover ||
    book?.coverUrl ||
    book?.image ||
    book?.extraImage ||
    (Array.isArray(book?.images) ? book.images[0] : null) ||
    null
  );
}

export default function EventCheckout() {
  const { slug } = useParams();
  const location = useLocation();

  const event = findEventBySlug(slug);

  // Cât timp active:false, pagina poate fi văzută doar cu ?preview=1
  const previewMode =
    new URLSearchParams(location.search).get("preview") === "1";

  const canView = Boolean(event && (event.active || previewMode));

  const eventBooks = useMemo(() => {
    if (!event) return [];

    return event.books
      .filter((entry) => entry.visible !== false)
      .map((entry) => {
        const book = BOOKS.find(
          (item) => String(item.id) === String(entry.bookId)
        );

        if (!book) return null;

        return {
          ...entry,
          book,
        };
      })
      .filter(Boolean);
  }, [event]);

  const [quantities, setQuantities] = useState({});
  const [step, setStep] = useState("books");
const [loading, setLoading] = useState(false);
const [checkoutError, setCheckoutError] = useState("");

  useEffect(() => {
    // Pagina nu trebuie indexată de Google.
    const previousTitle = document.title;
    document.title = event
      ? `${event.title} · Midaway`
      : "Eveniment Midaway";

    let robots = document.querySelector('meta[name="robots"]');
    const hadRobots = Boolean(robots);
    const previousRobots = robots?.getAttribute("content") || "";

    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }

    robots.setAttribute("content", "noindex, nofollow");

    return () => {
      document.title = previousTitle;

      if (!robots) return;

      if (hadRobots) {
        robots.setAttribute("content", previousRobots);
      } else {
        robots.remove();
      }
    };
  }, [event]);

  const changeQuantity = (bookId, delta, stock) => {
    setQuantities((current) => {
      const existing = Number(current[bookId] || 0);
      const next = Math.max(0, Math.min(stock, existing + delta));

      return {
        ...current,
        [bookId]: next,
      };
    });
  };

  if (!event) {
    return (
      <div style={{ padding: 32, textAlign: "center" }}>
        <h1>Evenimentul nu există.</h1>
      </div>
    );
  }

  if (!canView) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: COLORS.cream,
          padding: 24,
        }}
      >
        <div
          style={{
            maxWidth: 520,
            background: "#fff",
            border: `1px solid ${COLORS.line}`,
            borderRadius: 20,
            padding: 28,
            textAlign: "center",
            boxShadow: "0 12px 34px rgba(0,0,0,.08)",
          }}
        >
          <img
            src="/logo-midaway.png"
            alt="Midaway"
            style={{
              height: 64,
              width: "auto",
              borderRadius: 12,
              marginBottom: 16,
            }}
          />

          <h1 style={{ margin: "0 0 12px" }}>
            Evenimentul nu este activ.
          </h1>

          <p style={{ color: COLORS.muted, margin: 0 }}>
            Pagina va deveni disponibilă în perioada evenimentului.
          </p>
        </div>
      </div>
    );
  }

  const totalQuantity = eventBooks.reduce(
    (sum, entry) => sum + Number(quantities[entry.bookId] || 0),
    0
  );

  const totalAmount = totalQuantity * Number(event.unitPrice || 0);
  const selectedItems = eventBooks
  .map(({ bookId, book }) => ({
    bookId,
    title: book.title,
    quantity: Number(quantities[bookId] || 0),
  }))
  .filter((item) => item.quantity > 0);

const startStripeCheckout = async () => {
  if (selectedItems.length === 0 || loading) return;

  setLoading(true);
  setCheckoutError("");

  try {
    const response = await fetch("/api/create-event-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: event.id,
        items: selectedItems.map(({ bookId, quantity }) => ({
          bookId,
          quantity,
        })),
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data?.error || "Nu am putut iniția plata. Încearcă din nou."
      );
    }

    if (!data?.url) {
      throw new Error("Stripe nu a returnat adresa paginii de plată.");
    }

    window.location.assign(data.url);
  } catch (error) {
    setCheckoutError(
      error?.message || "A apărut o eroare la inițierea plății."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.cream,
        color: COLORS.text,
        padding: "24px 14px 48px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1080, margin: "0 auto" }}>
        <header
          style={{
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          <img
            src="/logo-midaway.png"
            alt="Midaway"
            style={{
              height: 72,
              width: "auto",
              borderRadius: 14,
              marginBottom: 12,
            }}
          />

          <h1
            className="font-cormorant"
            style={{
              margin: 0,
              fontSize: "clamp(34px, 6vw, 54px)",
              lineHeight: 1.05,
            }}
          >
            {event.title}
          </h1>

          <p
            style={{
              margin: "10px 0 0",
              color: COLORS.burgundy,
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            {event.unitPrice} {event.currency} / exemplar
          </p>

          {previewMode && !event.active && (
            <div
              style={{
                display: "inline-block",
                marginTop: 12,
                padding: "5px 12px",
                borderRadius: 999,
                background: "#fff0c7",
                color: "#7a5700",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              MOD PREVIZUALIZARE
            </div>
          )}
        </header>

        {step === "books" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 18,
          }}
        >
          {eventBooks.map(({ bookId, initialStock, book }) => {
            const quantity = Number(quantities[bookId] || 0);
            const cover = getBookCover(book);

            return (
              <article
                key={bookId}
                style={{
                  background: "#fff",
                  border: `1px solid ${COLORS.line}`,
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 10px 28px rgba(0,0,0,.07)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >

{bookId === "maya-bro-si-hakuna-matata-ro" && (
  <div
    style={{
      position: "absolute",
      top: 8,
left: 8,
      zIndex: 2,
      padding: "5px 10px",
      borderRadius: 999,
      background: COLORS.burgundy,
      color: "#fff",
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: ".6px",
      boxShadow: "0 5px 14px rgba(0,0,0,.18)",
    }}
  >
    LANSARE
  </div>
)}

                <div
                  style={{
                    minHeight: 260,
                    background: "#f7f1e9",
                    display: "grid",
                    placeItems: "center",
                    padding: 16,
                  }}
                >
                  {cover ? (
                    <img
                      src={cover}
                      alt={book.title}
                      style={{
                        width: "100%",
                        height: 260,
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  ) : (
                    <div style={{ color: COLORS.muted }}>
                      Copertă indisponibilă
                    </div>
                  )}
                </div>

                <div
                  style={{
                    padding: 18,
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <h2
                    className="font-cormorant"
                    style={{
                      margin: 0,
                      fontSize: 23,
                      lineHeight: 1.15,
                    }}
                  >
                    {book.title}
                  </h2>

                  <div
                    style={{
                      marginTop: 10,
                      color: COLORS.muted,
                      fontSize: 14,
                    }}
                  >
                   Disponibil la stand
                  </div>

                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: 18,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 14,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        changeQuantity(bookId, -1, initialStock)
                      }
                      disabled={quantity === 0}
                      aria-label={`Scade cantitatea pentru ${book.title}`}
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 999,
                        border: `1px solid ${COLORS.line}`,
                        background:
                          quantity === 0 ? "#eee" : "#fff",
                        cursor:
                          quantity === 0 ? "not-allowed" : "pointer",
                        fontSize: 24,
                        fontWeight: 700,
                      }}
                    >
                      −
                    </button>

                    <strong
                      style={{
                        minWidth: 34,
                        textAlign: "center",
                        fontSize: 24,
                      }}
                    >
                      {quantity}
                    </strong>

                    <button
                      type="button"
                      onClick={() =>
                        changeQuantity(bookId, 1, initialStock)
                      }
                      disabled={quantity >= initialStock}
                      aria-label={`Crește cantitatea pentru ${book.title}`}
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 999,
                        border: "none",
                        background: COLORS.teal,
                        color: "#fff",
                        cursor:
                          quantity >= initialStock
                            ? "not-allowed"
                            : "pointer",
                        fontSize: 24,
                        fontWeight: 700,
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        )}

{step === "review" && (
  <section
    style={{
      maxWidth: 760,
      margin: "0 auto",
      background: "#fff",
      border: `1px solid ${COLORS.line}`,
      borderRadius: 22,
      padding: "clamp(20px, 4vw, 34px)",
      boxShadow: "0 12px 34px rgba(0,0,0,.08)",
    }}
  >
    <h2
      className="font-cormorant"
      style={{
        margin: "0 0 8px",
        fontSize: 34,
        textAlign: "center",
      }}
    >
      Confirmă comanda
    </h2>

    <p
      style={{
        margin: "0 0 24px",
        textAlign: "center",
        color: COLORS.muted,
        lineHeight: 1.6,
      }}
    >
      Datele pentru facturare și plata vor fi completate în pagina
      securizată Stripe.
    </p>

    <div style={{ display: "grid", gap: 12 }}>
      {selectedItems.map((item) => {
        const lineTotal =
          item.quantity * Number(event.unitPrice || 0);

        return (
          <div
            key={item.bookId}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 18,
              padding: "14px 0",
              borderBottom: `1px solid ${COLORS.line}`,
            }}
          >
            <div>
              <strong style={{ lineHeight: 1.4 }}>
                {item.title}
              </strong>

              <div
                style={{
                  marginTop: 4,
                  color: COLORS.muted,
                  fontSize: 14,
                }}
              >
                {item.quantity} × {event.unitPrice} {event.currency}
              </div>
            </div>

            <strong style={{ whiteSpace: "nowrap" }}>
              {lineTotal} {event.currency}
            </strong>
          </div>
        );
      })}
    </div>

    <div
      style={{
        marginTop: 22,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "end",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <div>
        <div style={{ color: COLORS.muted }}>
          Total cărți: {totalQuantity}
        </div>

        <div style={{ fontSize: 32, fontWeight: 800 }}>
          {totalAmount} {event.currency}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          onClick={() => {
            setCheckoutError("");
            setStep("books");
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
          disabled={loading}
          style={{
            padding: "13px 18px",
            borderRadius: 14,
            border: `1px solid ${COLORS.line}`,
            background: "#fff",
            color: COLORS.text,
            fontWeight: 800,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          ← Înapoi la cărți
        </button>

        <button
          type="button"
          onClick={startStripeCheckout}
          disabled={loading}
          style={{
            padding: "13px 20px",
            borderRadius: 14,
            border: "none",
            background: loading
              ? "#b9b3b0"
              : COLORS.burgundy,
            color: "#fff",
            fontWeight: 800,
            cursor: loading ? "wait" : "pointer",
          }}
        >
          {loading
            ? "Se pregătește plata…"
            : "Continuă la plata securizată"}
        </button>
      </div>
    </div>

    {checkoutError && (
      <div
        role="alert"
        style={{
          marginTop: 18,
          padding: "12px 14px",
          borderRadius: 12,
          background: "#fff0f0",
          border: "1px solid #e4b5b5",
          color: "#8b2c34",
          lineHeight: 1.5,
        }}
      >
        {checkoutError}
      </div>
    )}

    <div
      style={{
        marginTop: 22,
        padding: 16,
        borderRadius: 14,
        background: COLORS.cream,
        color: COLORS.muted,
        lineHeight: 1.65,
        fontSize: 14,
      }}
    >
      <div
  style={{
    marginBottom: 10,
    color: COLORS.text,
    fontWeight: 800,
    fontSize: 16,
  }}
>
  Ridicare
</div>

<div>✓ Cărțile se ridică direct de la standul Midaway.</div>
<div>✓ Nu se percepe taxă de livrare.</div>
<div>✓ Prezintă confirmarea plății primită pe email.</div>
<div>✓ Factura fiscală va fi transmisă ulterior pe email.</div>
    </div>
  </section>
)}

{step === "books" && (
        <section
          style={{
            position: "sticky",
            bottom: 12,
            marginTop: 28,
            background: "#fff",
            border: `1px solid ${COLORS.line}`,
            borderRadius: 20,
            boxShadow: "0 14px 38px rgba(0,0,0,.14)",
            padding: 18,
            display: "flex",
            gap: 16,
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ color: COLORS.muted, fontSize: 14 }}>
              Total cărți: {totalQuantity}
            </div>

            <div style={{ fontSize: 28, fontWeight: 800 }}>
              {totalAmount} {event.currency}
            </div>
          </div>

          <button
            type="button"
            disabled={totalQuantity === 0}
            onClick={() => {
              setCheckoutError("");
              setStep("review");
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
            style={{
              minWidth: 220,
              padding: "14px 20px",
              border: "none",
              borderRadius: 14,
              background:
                totalQuantity > 0 ? COLORS.burgundy : "#d8d4d2",
              color: "#fff",
              fontSize: 17,
              fontWeight: 800,
              cursor:
                totalQuantity > 0 ? "pointer" : "not-allowed",
            }}
          >
            Continuă comanda
          </button>
        </section>
        )}

        
      </div>
    </div>
  );
}