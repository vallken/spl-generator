import { useState } from "react";
import { FormData } from "../types";
import { generateEncryptedLink } from "../utils/encrypt";
import { PdfDownloadButton } from "./DownloadButton";

interface Props {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
  errors?: Partial<Record<keyof FormData, string>>;
  onSubmit?: () => void;
  onReset?: () => void;
}

const FormComponent: React.FC<Props> = ({
  formData,
  updateField,
  errors = {},
  onReset,
}) => {
  const [isSubmit, setIsSubmitting] = useState<boolean>(false);
  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [baseUrl, setBaseUrl] = useState<string>("");

  const handleChange = (field: keyof typeof formData, value: string) => {
    updateField(field, value);
    if (isSubmit) setIsSubmitting(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      setBaseUrl(window.location.origin);
      const encryptedLink = generateEncryptedLink(formData);
      setGeneratedLink(encryptedLink);
    } catch (error) {
      console.error("Error generating encrypted link:", error);
      alert("Gagal membuat encrypted link. Silakan coba lagi.");
    }
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
        <h1 className="text-2xl font-bold text-center">Form Data Entry</h1>
        <p className="text-center text-blue-100 mt-2">
          Silakan lengkapi semua field yang diperlukan
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-b-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PT */}
          <div className="space-y-2">
            <label
              htmlFor="pt"
              className="block text-sm font-semibold text-gray-700"
            >
              PT <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="pt"
              name="pt"
              value={formData.pt}
              onChange={(e) => handleChange("pt", e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.pt ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Masukkan nama PT"
            />
            {errors.pt && <p className="text-red-500 text-sm">{errors.pt}</p>}
          </div>

          {/* Nama */}
          <div className="space-y-2">
            <label
              htmlFor="nama"
              className="block text-sm font-semibold text-gray-700"
            >
              ID Card <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={(e) => handleChange("id", e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.nama ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Masukkan ID Card"
            />
            {errors.nama && (
              <p className="text-red-500 text-sm">{errors.nama}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="nama"
              className="block text-sm font-semibold text-gray-700"
            >
              Nama <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={(e) => handleChange("nama", e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.nama ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Masukkan nama"
            />
            {errors.nama && (
              <p className="text-red-500 text-sm">{errors.nama}</p>
            )}
          </div>

          {/* Waktu Mulai */}
          <div className="space-y-2">
            <label
              htmlFor="mulai"
              className="block text-sm font-semibold text-gray-700"
            >
              Waktu Mulai <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="mulai"
              name="mulai"
              value={formData.mulai}
              onChange={(e) => handleChange("mulai", e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.mulai ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.mulai && (
              <p className="text-red-500 text-sm">{errors.mulai}</p>
            )}
          </div>

          {/* Waktu Selesai */}
          <div className="space-y-2">
            <label
              htmlFor="selesai"
              className="block text-sm font-semibold text-gray-700"
            >
              Waktu Selesai <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="selesai"
              name="selesai"
              value={formData.selesai}
              onChange={(e) => handleChange("selesai", e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.selesai ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.selesai && (
              <p className="text-red-500 text-sm">{errors.selesai}</p>
            )}
          </div>

          {/* Jumlah */}
          <div className="space-y-2">
            <label
              htmlFor="jumlah"
              className="block text-sm font-semibold text-gray-700"
            >
              Jumlah <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="jumlah"
              name="jumlah"
              value={formData.jumlah}
              onChange={(e) => handleChange("jumlah", e.target.value)}
              min="1"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.jumlah ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Masukkan jumlah"
            />
            {errors.jumlah && (
              <p className="text-red-500 text-sm">{errors.jumlah}</p>
            )}
          </div>

          {/* Klasifikasi */}
          <div className="space-y-2">
            <label
              htmlFor="klasifikasi"
              className="block text-sm font-semibold text-gray-700"
            >
              Klasifikasi <span className="text-red-500">*</span>
            </label>
            <select
              id="klasifikasi"
              name="klasifikasi"
              value={formData.klasifikasi}
              onChange={(e) => handleChange("klasifikasi", e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.klasifikasi
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            >
              <option value="">Pilih Klasifikasi</option>
              <option value="Mat. Handling">Material Handling</option>
              <option value="Slop recovery">Slop Recovery</option>
            </select>
            {errors.klasifikasi && (
              <p className="text-red-500 text-sm">{errors.klasifikasi}</p>
            )}
          </div>

          {/* Tanggal */}
          <div className="space-y-2">
            <label
              htmlFor="tanggal"
              className="block text-sm font-semibold text-gray-700"
            >
              Tanggal <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="tanggal"
              name="tanggal"
              value={formData.tanggal}
              onChange={(e) => handleChange("tanggal", e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.tanggal ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.tanggal && (
              <p className="text-red-500 text-sm">{errors.tanggal}</p>
            )}
          </div>

          {/* Lokasi */}
          <div className="space-y-2">
            <label
              htmlFor="lokasi"
              className="block text-sm font-semibold text-gray-700"
            >
              Lokasi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lokasi"
              name="lokasi"
              value={formData.lokasi}
              onChange={(e) => handleChange("lokasi", e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.lokasi ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Masukkan lokasi"
            />
            {errors.lokasi && (
              <p className="text-red-500 text-sm">{errors.lokasi}</p>
            )}
          </div>
        </div>

        {/* Section Head */}
        <div className="mt-6 space-y-2">
          <label
            htmlFor="sectionHead"
            className="block text-sm font-semibold text-gray-700"
          >
            Section Head <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="sectionHead"
            name="sectionHead"
            value={formData.sectionHead}
            onChange={(e) => handleChange("sectionHead", e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.sectionHead
                ? "border-red-500 bg-red-50"
                : "border-gray-300"
            }`}
            placeholder="Masukkan nama section head"
          />
          {errors.sectionHead && (
            <p className="text-red-500 text-sm">{errors.sectionHead}</p>
          )}
        </div>

        {/* Deskripsi */}
        <div className="mt-6 space-y-2">
          <label
            htmlFor="desc"
            className="block text-sm font-semibold text-gray-700"
          >
            Deskripsi <span className="text-red-500">*</span>
          </label>
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={(e) => handleChange("desc", e.target.value)}
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical ${
              errors.desc ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
            placeholder="Masukkan deskripsi detail..."
          />
          {errors.desc && <p className="text-red-500 text-sm">{errors.desc}</p>}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-4 mt-8 space-y-2 sm:space-y-0">
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg 
               hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg 
               hover:from-blue-700 hover:to-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
          <div className="w-full sm:w-auto">
            <PdfDownloadButton
              targetUrl={baseUrl + "/preview/" + generatedLink}
              isSubmit={isSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
