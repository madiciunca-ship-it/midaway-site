import React, { useEffect } from "react";

const COLORS = {
  burgundy: "#8b2c34",
  cream: "#fffaf3",
  line: "#eadfd5",
  text: "#2b2522",
  muted: "#746964",
  teal: "#2a9d8f",
};

export default function EventConfirmation() {
  

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    document.title = "Plată confirmată · Midaway";
  }, []);

  

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
  Îți mulțumim pentru comandă. Confirmarea plății și numărul
  comenzii vor fi trimise la adresa de email folosită la plată.
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
  ✓ La stand, prezintă emailul sau numărul comenzii.
</div>

<div>
  ✓ Cărțile se ridică direct de la stand, fără taxă de livrare.
</div>

<div>
  ✓ După predarea cărților vei primi un email de confirmare.
</div>

<div>
  ✓ Factura fiscală va fi transmisă ulterior pe email.
</div>
        </div>

        

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