import { Download, Loader2 } from "lucide-react";
import { useState } from "react";

interface PdfDownloadButtonProps {
  targetUrl?: string;
  filename?: string;
  onStart?: () => void;
  onSuccess?: (blob: Blob) => void;
  onError?: (error: string) => void;
  isSubmit: boolean;
}

export const PdfDownloadButton: React.FC<PdfDownloadButtonProps> = ({
  targetUrl,
  filename,
  isSubmit,
  onStart,
  onSuccess,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const downloadPdf = async (url: string) => {
    setIsLoading(true);
    setError("");
    onStart?.();

    try {
      const response = await fetch(
        `/api/pdf-generator?url=${encodeURIComponent(url)}`,
        {
          method: "GET",
          headers: {
            Accept: "application/pdf",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;

      const defaultFilename = `surat-${
        new Date().toISOString().split("T")[0]
      }-${Date.now()}.pdf`;
      link.download = filename || defaultFilename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);

      onSuccess?.(blob);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to generate PDF";
      setError(errorMessage);
      onError?.(errorMessage);
      console.error("PDF download error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const currentUrl = window.location.href;
    const urlToDownload = targetUrl || currentUrl;
    downloadPdf(urlToDownload);
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleDownload}
        disabled={!isSubmit}
        className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Download className="w-5 h-5" />
        )}
        <span>{isLoading ? "Generating PDF..." : "Download as PDF"}</span>
      </button>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="text-blue-600 text-sm bg-blue-50 p-3 rounded-lg border border-blue-200">
          Please wait, generating your PDF document...
        </div>
      )}
    </div>
  );
};
