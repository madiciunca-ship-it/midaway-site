// /api/invoice-smartbill.mjs
export async function createSmartBillInvoice({ order }) {
    const provider = (process.env.INVOICE_PROVIDER || "none").toLowerCase();
    if (provider !== "smartbill") {
      // momentan nu emitem factură automat
      return null;
    }
  
    // Când ai cont: aici pui codul real de la SmartBill + env-urile lor.
    // return { id: "...", number: "MID/2025/00012", pdfLink: "https://..." };
  
    return null;
  }
  