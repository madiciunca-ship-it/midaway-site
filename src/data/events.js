// src/data/events.js

import { BOOKS } from "./books.js";

// -----------------------------------------------------
// Configurația permanentă pentru canalul TÂRG
// -----------------------------------------------------
//
// Pentru fiecare carte, în books.js poți adăuga:
//
// targ: {
//   visible: true,
//   price: 55,
//   launch: false,
// }
//
// Dacă nu există configurația "targ":
// - cartea NU este afișată automat;
// - trebuie activată explicit cu visible: true.
//
// Astfel, un titlu nou nu poate fi vândut accidental
// înainte să-i stabilești prețul și disponibilitatea.
//
// Pentru cărțile active, prețul este individual.
// Nu folosim un preț unic pentru toate volumele.

function getTargBooks() {
  return BOOKS.filter((book) => {
    return (
      book?.targ?.visible === true &&
      book?.availability?.PAPERBACK === true &&
      book?.hidden !== true
    );
  }).map((book) => ({
    bookId: book.id,
    visible: true,
    price: book.targ.price,
    launch: book.targ.launch === true,
    initialStock: 0,
  }));
}

export const EVENTS = [
  // ---------------------------------------------------
  // GAUDEAMUS SIBIU 2026 — CONFIGURAȚIE ISTORICĂ
  // Nu modificăm identificatorul, prețul sau stocurile.
  // ---------------------------------------------------
  {
    id: "gaudeamus-sibiu-2026",
    slug: "gaudeamus-sibiu-2026",
    title: "Gaudeamus Sibiu 2026",

    active: true,

    currency: "RON",
    unitPrice: 55,

    pickupOnly: true,
    invoiceLater: true,

    pickupMessage:
      "Prezintă confirmarea plății la standul Midaway pentru ridicarea cărților.",

    invoiceMessage:
      "Factura fiscală va fi trimisă ulterior la adresa de email folosită pentru comandă, după încheierea evenimentului.",

    books: [
      {
        bookId: "maya-bro-si-hakuna-matata-ro",
        initialStock: 80,
        visible: true,
      },
      {
        bookId: "iubeste-ma-dar-nu-ma-poseda-ro",
        initialStock: 30,
        visible: true,
      },
      {
        bookId: "thailanda-1-ro",
        initialStock: 30,
        visible: true,
      },
      {
        bookId: "vietnam-2-ro",
        initialStock: 30,
        visible: true,
      },
      {
        bookId: "focuri-care-nu-ating-ro",
        initialStock: 30,
        visible: true,
      },
      {
        bookId: "indonezia-2-ro",
        initialStock: 30,
        visible: true,
      },
      {
        bookId: "indonezia-1-ro",
        initialStock: 30,
        visible: true,
      },
      {
        bookId: "vietnam-ro",
        initialStock: 30,
        visible: true,
      },
      {
        bookId: "o-zi-ro",
        initialStock: 30,
        visible: true,
      },
    ],
  },

  // ---------------------------------------------------
  // TÂRG — CANAL UNIVERSAL, PERMANENT
  // Același QR pentru orice târg.
  // ---------------------------------------------------
  {
    id: "targ",
    slug: "targ",
    title: "Cărți Midaway la târg",

    // Îl activăm după adaptarea checkout-ului,
    // webhook-ului și testarea fluxului complet.
    active: false,

    currency: "RON",

    pickupOnly: true,
    invoiceLater: true,

    pickupMessage:
      "Prezintă confirmarea plății la standul Midaway pentru ridicarea cărților.",

    invoiceMessage:
      "Factura fiscală va fi trimisă ulterior la adresa de email folosită pentru comandă.",

    books: getTargBooks(),

    // Pachetele vor fi conectate în pasul dedicat.
    bundles: [],
  },
];

export function findEventBySlug(slug) {
  return (
    EVENTS.find(
      (event) =>
        String(event.slug) === String(slug) ||
        String(event.id) === String(slug)
    ) || null
  );
}