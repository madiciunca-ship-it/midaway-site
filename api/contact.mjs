import nodemailer from "nodemailer";

const required = (v) => (typeof v === "string" ? v.trim() : "");
const clamp = (s, n = 1000) => (s.length > n ? s.slice(0, n) : s);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const { name, email, subject, message, botfield } = req.body || {};

    // honeypot anti-bot
    if (botfield) return res.status(200).json({ ok: true });

    // validare minimă
    const _name = clamp(required(name), 120);
    const _email = clamp(required(email), 200);
    const _subject = clamp(required(subject || "Mesaj de pe site"), 200);
    const _message = clamp(required(message), 4000);

    if (!_name || !_email || !_message) {
      return res
        .status(400)
        .json({ ok: false, error: "Te rugăm să completezi toate câmpurile obligatorii." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(_email)) {
      return res.status(400).json({ ok: false, error: "Adresă de email invalidă." });
    }

    // transporter (Google Workspace SMTP)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // e-mail intern (către tine)
    const toAddress = process.env.CONTACT_TO || process.env.EMAIL_USER;
    const site = process.env.SITE_URL || "https://midaway.ro";

    const htmlInternal = `
      <h2>Mesaj nou din formularul de contact</h2>
      <p><b>Nume:</b> ${escapeHtml(_name)}</p>
      <p><b>Email:</b> ${escapeHtml(_email)}</p>
      <p><b>Subiect:</b> ${escapeHtml(_subject)}</p>
      <p><b>Mesaj:</b></p>
      <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(_message)}</pre>
      <hr/>
      <p>Trimis de pe <a href="${site}">${site}</a></p>
    `;

    await transporter.sendMail({
      from: `"Midaway Contact" <${process.env.EMAIL_USER}>`,
      to: toAddress,
      replyTo: _email,
      subject: `[Contact] ${_subject}`,
      text: plainText(_name, _email, _subject, _message, site),
      html: htmlInternal,
    });

    // AUTORESPONDER către client
    const htmlAuto = `
      <p>Salut, ${escapeHtml(_name)} 👋</p>
      <p>Mulțumim — am primit mesajul tău și revenim în 24–48h.</p>
      <p><b>Subiect:</b> ${escapeHtml(_subject)}</p>
      <p><b>Mesajul tău:</b></p>
      <blockquote style="border-left:3px solid #eee;padding-left:12px;">${escapeHtml(_message)}</blockquote>
      <p>Cu drag,<br/>Echipa Midaway<br/><a href="${site}">${site}</a></p>
    `;

    await transporter.sendMail({
      from: `"Midaway" <${process.env.EMAIL_USER}>`,
      to: _email,
      subject: "Am primit mesajul tău – Midaway",
      text: `Salut, ${_name}\n\nMulțumim — am primit mesajul tău și revenim în 24–48h.\n\nSubiect: ${_subject}\n\nMesajul tău:\n${_message}\n\nCu drag,\nEchipa Midaway\n${site}`,
      html: htmlAuto,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return res.status(500).json({ ok: false, error: "A apărut o eroare. Te rugăm încearcă din nou." });
  }
}

// helpers
function plainText(name, email, subject, message, site) {
  return [
    "Mesaj nou din formularul de contact",
    `Nume: ${name}`,
    `Email: ${email}`,
    `Subiect: ${subject}`,
    "Mesaj:",
    message,
    "",
    `Trimis de pe ${site}`,
  ].join("\n");
}

function escapeHtml(str = "") {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
