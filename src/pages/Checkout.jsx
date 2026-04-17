// src/pages/Checkout.jsx
import React, { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import { BOOKS } from "../data/books";
import { Link } from "react-router-dom";

// endpoint Formspree (rămâne aici dacă vrei cândva, dar NU îl mai folosim în UI)
const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/mrbaajzn";

export default function Checkout() {
  const { items, total, clear } = useCart();
  const [error, setError] = useState(null);
  const checkoutLang =
  String(items?.[0]?.lang || "").toUpperCase() === "EN" ? "en" : "ro";

const t =
  checkoutLang === "en"
    ? {
        pageTitle: "Checkout",
        empty: "Your cart is empty.",
        summary: "Order summary",
        total: "Total",
        servicesTitle: "Services",
        servicesText: "scheduling & delivery based on the agreed terms. Cancellation policy:",
        seeHere: "see here",
        missingFiles: "The selected digital files are not currently available.",
        termsIntro: "I agree with the",
        terms: "Terms and Conditions",
        cookies: "Cookie Policy",
        privacy: "Privacy Policy",
        digitalConsent:
          "I agree to the start of digital delivery before the legal withdrawal period expires and I understand that I lose my right of withdrawal after download.",
        details: "Details",
        companyInvoice: "I want an invoice for a company",
        optional: "(optional)",
        companyName: "Company name",
        taxId: "VAT / Tax ID",
        reg: "Registration no. (optional)",
        address: "Address",
        city: "City",
        state: "State / County",
        country: "Country (ex. RO)",
        companyHelp: "*Minimum fields for company invoice:",
        payNow: "💳 Pay now with card (Stripe)",
        mustAgree: "Please accept the",
        digitalDelivery: "digital delivery",
        secure: "Payments are processed securely via Stripe.",
        emptyAlert: "Your cart is empty!",
        missingFilesError:
          "Some digital products are missing files. Please come back when they are uploaded.",
        legalAlert:
          "Please accept the legal consent before payment.",
        stripeError:
          "There was an error while starting the payment.",
        networkError: "A network error occurred.",
        mixedCurrencies:
          "Complete separate orders for RON (RO) and EUR (EN).",
      }
    : {
        pageTitle: "Finalizare comandă",
        empty: "Coșul este gol.",
        summary: "Sumar produse",
        total: "Total",
        servicesTitle: "Servicii",
        servicesText: "programare & prestare în baza termenilor agreați. Politica de anulare:",
        seeHere: "vezi aici",
        missingFiles: "Momentan nu sunt disponibile fișiere pentru produsele selectate.",
        termsIntro: "Sunt de acord cu",
        terms: "Termenii și condițiile",
        cookies: "Politica de cookies",
        privacy: "Politica de confidențialitate",
        digitalConsent:
          "Sunt de acord cu începerea livrării digitale înainte de expirarea termenului legal de retragere și înțeleg că îmi pierd dreptul de retragere după descărcare.",
        details: "Detalii",
        companyInvoice: "Doresc factură pe firmă",
        optional: "(opțional)",
        companyName: "Denumire firmă",
        taxId: "CUI (ex. RO12345678)",
        reg: "Reg. Com. (opțional)",
        address: "Adresă",
        city: "Oraș",
        state: "Județ / Stat",
        country: "Țară (ex. RO)",
        companyHelp: "*Câmpurile minime pentru factură pe firmă:",
        payNow: "💳 Plătește acum cu cardul (Stripe)",
        mustAgree: "Te rugăm bifează",
        digitalDelivery: "livrare digitală",
        secure: "Plățile sunt procesate securizat prin Stripe.",
        emptyAlert: "Coșul este gol!",
        missingFilesError:
          "Pentru unele produse digitale lipsesc fișierele. Te rugăm revino când sunt încărcate.",
        legalAlert:
          "Te rugăm să bifezi consimțământul legal înainte de plată.",
        stripeError:
          "A apărut o eroare la inițierea plății.",
        networkError: "A apărut o eroare de rețea.",
        mixedCurrencies:
          "Finalizează separat comenzile pentru RON (RO) și EUR (EN).",
      };

  // --- helperi pentru tipuri ---
  const isServiceItem = (it) =>
    String(it?.fulfillment || it?.format || "").toLowerCase() === "service";

    const isDigitalItem = (it) => {
      const f = String(it?.fulfillment || "").toLowerCase();
      if (f === "digital") return true;
    
      const fmt = String(it?.format || "").toUpperCase();
      return ["PDF", "EPUB", "AUDIOBOOK", "AUDIO"].includes(fmt);
    };
    

  // --- flaguri coș ---
  const hasService = (items || []).some(isServiceItem);
  const hasDigital = (items || []).some(isDigitalItem);

  // --- verificăm fișiere doar pentru PRODUSE DIGITALE care există în BOOKS ---
  const hasMissingFiles = (items || []).some((it) => {
    const isDigital = isDigitalItem(it);


    const book = BOOKS.find((b) => b.id === it.id);
    if (!book) return false; // servicii (svc-*) sau item necunoscut: nu afișăm banner

    const fmt = String(it.format || "").toUpperCase();
    if (fmt === "PDF") return !book?.files?.PDF;
    if (fmt === "EPUB") return !book?.files?.EPUB;
    if (fmt === "AUDIOBOOK") return !book?.files?.AUDIOBOOK;
    return false;
  });

  // Banner doar dacă există cel puțin un digital cu fișiere lipsă
  const showFilesWarning = hasMissingFiles;

  // consimțământ legal
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeDigital, setAgreeDigital] = useState(false);

  // ------ FACTURĂ PE FIRMĂ (opțional) ------
  const [invoiceCompany, setInvoiceCompany] = useState(false);
  const [company, setCompany] = useState({
    name: "",
    taxId: "",
    reg: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  // trimitem meta doar dacă checkbox-ul e bifat + avem câmpuri minime
  const customerMeta =
    invoiceCompany && company.name && company.taxId
      ? {
          type: "company",
          name: company.name,
          taxId: company.taxId,
          reg: company.reg || "",
          address: company.address || "",
          city: company.city || "",
          state: company.state || "",
          country: company.country || "RO",
        }
      : null;

  // 🔒 Butonul Stripe e activ DOAR dacă:
  //  - ai bifat termeni
  //  - dacă există digitale, ai bifat și consimțământul digital
  //  - și NU lipsesc fișiere digitale
  const canPay = agreeTerms && (!hasDigital || agreeDigital) && !hasMissingFiles;

  // determină moneda din item sau (fallback) din books.js
  const currencyOf = (i) => {
    const direct = (i?.currency || "").toUpperCase();
    if (direct === "RON" || direct === "EUR") return direct;
    const b = BOOKS.find((x) => x.id === i?.id);
    return (b?.currency || "RON").toUpperCase();
  };

  const primaryCurrency = items.length ? currencyOf(items[0]) : "RON";

  const orderText = useMemo(() => {
    if (items.length === 0) return "Coș gol.";
    return items
      .map((i) => {
        const cur = currencyOf(i);
        return `${i.title} – ${i.format}${i.lang ? ` ${i.lang}` : ""} × ${
          i.qty
        } = ${i.price * i.qty} ${cur}`;
      })
      .join("\n");
  }, [items]);

  // Stripe
  const payWithCard = async () => {
    if (!items.length) return alert(t.emptyAlert);

    // blocăm explicit dacă lipsesc fișiere digitale
    if (hasMissingFiles) {
      setError(t.missingFilesError);
      return;
    }
    if (!canPay) {
      alert(t.legalAlert);
      return;
    }

    try {
      setError(null);

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customerMeta, // <— trimitem doar dacă există (altfel e null)
        }),
      });

      if (res.status === 409) {
        const data = await res.json().catch(() => ({}));
        setError(
          data?.error ||
          t.mixedCurrencies
        );
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || t.stripeError);
        return;
      }

      const { url } = await res.json();
      if (url) window.location.href = url;
      else setError("Nu am primit URL-ul de plată de la Stripe.");
    } catch (e) {
      console.error(e);
      setError(t.networkError);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1>{t.pageTitle}</h1>

      {items.length === 0 ? (
        <p>{t.empty}</p>
      ) : (
        <>
          <h3>{t.summary}</h3>
          <ul style={{ paddingLeft: 18 }}>
            {items.map((i) => (
              <li key={i.key}>
                {i.title} — {i.format}
                {i.lang ? ` ${i.lang}` : ""} × {i.qty} — {i.price * i.qty}{" "}
                {currencyOf(i)}
              </li>
            ))}
          </ul>
          <p>
            <strong>
            {t.total}: {total} {primaryCurrency}
            </strong>
          </p>

          {/* mesaj informativ doar dacă există servicii în coș */}
          {hasService && (
            <div
              style={{
                marginTop: 12,
                padding: 12,
                border: "1px dashed #e6c200",
                background: "#fffbea",
                borderRadius: 10,
                color: "#5c4b00",
                fontSize: 13,
              }}
            >
              <strong>{t.servicesTitle}:</strong> {t.servicesText}{" "}
              <a
                href="/politica-anulare"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#7a5b00" }}
              >
                {t.seeHere}
              </a>
              .
            </div>
          )}

          {/* banner fișiere lipsă – doar pentru produse digitale */}
          {showFilesWarning && (
            <div
              style={{
                margin: "12px 0",
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid #f0b7b7",
                background: "#ffecec",
                color: "#a52828",
                fontSize: 14,
              }}
            >
              {t.missingFiles}
            </div>
          )}

          {/* banner eroare Stripe, dacă e cazul */}
          {error && (
            <div
              style={{
                margin: "12px 0",
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid #f3d2d2",
                background: "#fff0f0",
                color: "#b42318",
                fontSize: 14,
              }}
            >
              {error}
            </div>
          )}

          {/* consimțământ legal */}
          <div
            style={{
              marginTop: 16,
              padding: 12,
              border: "1px solid #eee",
              borderRadius: 12,
              background: "#fff",
            }}
          >
            {/* ✅ Termeni, cookies, confidențialitate */}
            <label style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
             <span style={{ fontSize: 13, lineHeight: 1.4 }}>
  {checkoutLang === "en" ? (
    <>
      I agree with the{" "}
      <Link to="/termeni" style={{ color: "var(--accent)" }}>
        Terms and Conditions
      </Link>
      ,{" "}
      <Link to="/politica-cookies" style={{ color: "var(--accent)" }}>
        Cookie Policy
      </Link>{" "}
      and{" "}
      <Link
        to="/politica-confidentialitate"
        style={{ color: "var(--accent)" }}
      >
        Privacy Policy
      </Link>
      .
    </>
  ) : (
    <>
      Sunt de acord cu{" "}
      <Link to="/termeni" style={{ color: "var(--accent)" }}>
        Termenii și condițiile
      </Link>
      ,{" "}
      <Link to="/politica-cookies" style={{ color: "var(--accent)" }}>
        Politica de cookies
      </Link>{" "}
      și{" "}
      <Link
        to="/politica-confidentialitate"
        style={{ color: "var(--accent)" }}
      >
        Politica de confidențialitate
      </Link>
      .
    </>
  )}
</span>
            </label>

            {/* ✅ Acord pentru conținut digital */}
            {hasDigital && (
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  marginTop: 10,
                }}
              >
                <input
                  type="checkbox"
                  checked={agreeDigital}
                  onChange={(e) => setAgreeDigital(e.target.checked)}
                />
                <span style={{ fontSize: 13, lineHeight: 1.4 }}>
  {checkoutLang === "en" ? (
    <>
      I agree to the start of digital delivery before the legal withdrawal
      period expires and I understand that I lose my right of withdrawal
      after download. (
      <Link to="/politica-descarcare" style={{ color: "var(--accent)" }}>
        Details
      </Link>
      )
    </>
  ) : (
    <>
      Sunt de acord cu începerea livrării digitale înainte de expirarea
      termenului legal de retragere și înțeleg că îmi pierd dreptul de
      retragere după descărcare. (
      <Link to="/politica-descarcare" style={{ color: "var(--accent)" }}>
        Detalii
      </Link>
      )
    </>
  )}
</span>
              </label>
            )}
          </div>

          {/* ——— Facturez pe firmă (opțional) ——— */}
          <div
            style={{
              marginTop: 12,
              padding: 12,
              border: "1px solid #e6f0f0",
              borderRadius: 12,
              background: "#f9fbfb",
            }}
          >
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={invoiceCompany}
                onChange={(e) => setInvoiceCompany(e.target.checked)}
              />
              <span style={{ fontWeight: 600 }}>{t.companyInvoice}</span>
              <span style={{ fontSize: 12, color: "#666", marginLeft: 6 }}>
              {t.optional}
              </span>
            </label>

            {invoiceCompany && (
              <div
                style={{
                  marginTop: 10,
                  padding: 12,
                  borderRadius: 10,
                  background: "#14746f14",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gap: 10,
                    gridTemplateColumns: "1fr 1fr",
                  }}
                >
                  <input
                    placeholder={t.companyName}
                    value={company.name}
                    onChange={(e) =>
                      setCompany({ ...company, name: e.target.value })
                    }
                    style={field}
                  />
                  <input
                    placeholder={t.taxId}
                    value={company.taxId}
                    onChange={(e) =>
                      setCompany({ ...company, taxId: e.target.value })
                    }
                    style={field}
                  />
                  <input
                    placeholder={t.reg}
                    value={company.reg}
                    onChange={(e) =>
                      setCompany({ ...company, reg: e.target.value })
                    }
                    style={field}
                  />
                  <input
                    placeholder={t.address}
                    value={company.address}
                    onChange={(e) =>
                      setCompany({ ...company, address: e.target.value })
                    }
                    style={field}
                  />
                  <input
                    placeholder={t.city}
                    value={company.city}
                    onChange={(e) =>
                      setCompany({ ...company, city: e.target.value })
                    }
                    style={field}
                  />
                  <input
                    placeholder={t.state}
                    value={company.state}
                    onChange={(e) =>
                      setCompany({ ...company, state: e.target.value })
                    }
                    style={field}
                  />
                  <input
                    placeholder={t.country}
                    value={company.country}
                    onChange={(e) =>
                      setCompany({
                        ...company,
                        country: e.target.value.toUpperCase(),
                      })
                    }
                    style={field}
                  />
                </div>

                <div style={{ fontSize: 12, color: "#666", marginTop: 8 }}>
                {t.companyHelp} <strong>{checkoutLang === "en" ? "Company name" : "Denumire"}</strong> {checkoutLang === "en" ? "and" : "și"} <strong>{checkoutLang === "en" ? "VAT / Tax ID" : "CUI"}</strong>.
                </div>
              </div>
            )}
          </div>

          {/* ——— Buton Stripe ——— */}
          <button
            type="button"
            onClick={payWithCard}
            disabled={!canPay}
            style={{
              marginTop: 12,
              padding: "12px",
              borderRadius: 10,
              background: "#2a9d8f",
              color: "#fff",
              border: "none",
              fontWeight: 700,
              cursor: "pointer",
              opacity: canPay ? 1 : 0.6,
            }}
          >
            {t.payNow}
          </button>

          {!canPay && (
  <div
    style={{
      marginTop: 8,
      padding: "10px 12px",
      borderRadius: 10,
      background: "#fff7e6",
      border: "1px solid #ffe2b3",
      color: "#7a4b00",
      fontSize: 13,
      lineHeight: 1.4,
    }}
  >
    {checkoutLang === "en" ? (
      <>
        Please accept the <strong>Terms and Conditions</strong>
        {hasDigital ? (
          <>
            {" "}
            and the <strong>digital delivery</strong> consent
          </>
        ) : null}
        {!hasMissingFiles
          ? "."
          : " (and come back when the digital files are available)."}
      </>
    ) : (
      <>
        Te rugăm bifează <strong>Termenii și condițiile</strong>
        {hasDigital ? (
          <>
            {" "}
            și acordul pentru <strong>livrare digitală</strong>
          </>
        ) : null}
        {!hasMissingFiles
          ? "."
          : " (și revino când fișierele digitale sunt disponibile)."}
      </>
    )}
  </div>
)}

          <p
            style={{
              marginTop: 8,
              textAlign: "center",
              fontSize: 12,
              color: "var(--secondary)",
            }}
          >
            {t.secure}
          </p>
        </>
      )}
    </div>
  );
}

const field = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
};
