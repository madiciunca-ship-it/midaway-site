// src/data/events.js

export const EVENTS = [
    {
      id: "gaudeamus-sibiu-2026",
      slug: "gaudeamus-sibiu-2026",
      title: "Gaudeamus Sibiu 2026",
  
      // Pagina poate fi construită și testată, dar nu este încă publică.
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
        ]
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