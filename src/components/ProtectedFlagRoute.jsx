// src/components/ProtectedFlagRoute.jsx
import { Navigate } from "react-router-dom";

/**
 * Randează `element` doar dacă `flag` === true,
 * altfel redirecționează la Home.
 */
export default function ProtectedFlagRoute({ flag, element }) {
  if (!flag) return <Navigate to="/" replace />;
  return element;
}
