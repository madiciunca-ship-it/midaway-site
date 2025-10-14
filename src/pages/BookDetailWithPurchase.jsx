// src/pages/BookDetailWithPurchase.jsx
import React from "react";
import { useParams } from "react-router-dom";
import BookDetail from "./BookDetail"; // componenta TA existentă (nemodificată)
import BookPurchasePanel from "../components/BookPurchasePanel";

export default function BookDetailWithPurchase() {
  const { id } = useParams();

  return (
    <div>
      {/* randăm pagina originală exact cum e */}
      <BookDetail />

      {/* adăugăm panel-ul de cumpărare sub ea */}
      <BookPurchasePanel bookId={id} />
    </div>
  );
}
