import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const COLORS = {
  burgundy: "#8b2c34",
  cream: "#fffaf3",
  line: "#eadfd5",
  text: "#2b2522",
  muted: "#746964",
  teal: "#2a9d8f",
};

export default function EventConfirmation() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id") || "";

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    document.title = "Plată confirmată · Midaway";
  }, []);

  const copyReference = async () => {
    try {
      await navigator.clipboard.writeText(sessionId);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.cream,
        color: COLORS.text,
        padding: "40px 16px",
        display: "grid",
        placeItems: "center",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 680,
          background: "#fff",
          border: `1px solid ${COLORS.line}`,
          borderRadius: 24,
          padding: "34px 26px",
          textAlign: "center",
          boxShadow: "0 18px 46px rgba(0,0,0,.09)",
        }}
      >
        <img
          src="/logo-midaway.png"
          alt="Midaway"
          style={{
            height: 76,
            width: "auto",
            borderRadius: 14,
            marginBottom: 18,
          }}
        />

        <div
          aria-hidden="true"
          style={{
            width: 64,
            height: 64,
            margin: "0 auto 18px",
            borderRadius: 999,
            background: "#e9f7f1",
            color: COLORS.teal,
            display: "grid",
            placeItems: "center",
            fontSize: 34,
            fontWeight: 900,
          }}
        >
          ✓
        </div>

        <h1
          className="font-cormorant"
          style={{
            margin: 0,
            fontSize: "clamp(34px, 6vw, 48px)",
            lineHeight: 1.05,
          }}
        >
          Plata a fost înregistrată
        </h1>

        <p
          style={{
            margin: "18px auto 0",
            maxWidth: 540,
            color: COLORS.muted,
            fontSize: 17,
            lineHeight: 1.7,
          }}
        >
          Îți mulțumim pentru comandă. Confirmarea și codul pentru
          ridicarea cărților de la standul Midaway vor fi trimise pe
          adresa de email folosită la plată.
        </p>

        <div
          style={{
            marginTop: 24,
            padding: 18,
            borderRadius: 16,
            background: COLORS.cream,
            border: `1px solid ${COLORS.line}`,
            textAlign: "left",
            lineHeight: 1.7,
          }}
        >
          <strong>Ce urmează</strong>

          <div style={{ marginTop: 10 }}>
            ✓ Verifică emailul de confirmare.
          </div>

          <div>
            ✓ Prezintă emailul sau codul QR la standul Midaway.
          </div>

          <div>
            ✓ Cărțile se ridică direct de la stand, fără taxă de
            livrare.
          </div>

          <div>
            ✓ Factura fiscală va fi transmisă ulterior pe email.
          </div>
        </div>

        {sessionId && (
          <div
            style={{
              marginTop: 22,
              color: COLORS.muted,
              fontSize: 13,
            }}
          >
            <div>Referință plată:</div>

            <code
              style={{
                display: "block",
                marginTop: 6,
                padding: "9px 10px",
                background: "#f7f4f2",
                borderRadius: 10,
                overflowWrap: "anywhere",
              }}
            >
              {sessionId}
            </code>

            <button
              type="button"
              onClick={copyReference}
              style={{
                marginTop: 10,
                padding: "9px 14px",
                borderRadius: 999,
                border: `1px solid ${COLORS.line}`,
                background: "#fff",
                color: COLORS.text,
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              {copied ? "Copiat ✓" : "Copiază referința"}
            </button>
          </div>
        )}

        <p
          style={{
            margin: "24px 0 0",
            color: COLORS.burgundy,
            fontWeight: 800,
          }}
        >
          Ne vedem la Gaudeamus Sibiu!
        </p>
      </section>
    </div>
  );
}