"use client";

import Surat from "@/app/components/Surat";
import { useEffect, useState } from "react";

interface Props {
  data: string[];
}

export default function PreviewClient({ data }: Props) {
  const form = data.join("/");

  const [finalForm, setFinalForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchDecryptedData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/view", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ encryptedData: form }),
        });

        const result = await response.json();

        if (result.success) {
          setFinalForm(result.data);
        } else {
          setError(result.message || "Failed to decrypt data");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchDecryptedData();
  }, [form]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {finalForm && <Surat formData={finalForm} />}
    </div>
  );
}
