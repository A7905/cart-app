// client/src/Success.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Success() {
  const [status, setStatus] = useState("verifying");
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const session_id = params.get("session_id");

    if (!session_id) {
      setStatus("no-session-id");
      return;
    }

    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/verify-payment`, {
          params: { session_id },
        });
        setStatus("done");
        setDetails(data);
      } catch (err) {
        setStatus("error");
        setDetails({ error: err?.response?.data?.error || err.message });
      }
    })();
  }, [setStatus]);

  if (status === "verifying") return <div>Verifying payment...</div>;
  if (status === "no-session-id") return <div>No session_id in URL. Cannot verify.</div>;
  if (status === "error") return <div>Error verifying payment: {JSON.stringify(details)}</div>;

  return (
    <div className="flex flex-col justify-center align-center mx-auto">
      <h2>Payment Verification</h2>
      <p>Payment status: <strong>{details?.payment_status ? "successs" : "failed"}</strong></p>
      <p>Session id: {details?.id}</p>
      <p>Amount total (smallest unit): {details?.amount_total}</p>
      <p>Currency: {details?.currency}</p>
      <pre style={{ whiteSpace: "pre-wrap", background: "#f3f3f3", padding: 8 }}>
        {JSON.stringify(details?.payment_intent || details?.raw || details, null, 2)}
      </pre>
    </div>
  );
}
