import { getTodayDate } from "@/app/utils/dateFormatter";
import { FormData } from "@/app/types";
import { useState, useCallback } from "react";

export const useFormData = () => {
  const [formData, setFormData] = useState<FormData>({
    pt: "",
    nama: "",
    id: "",
    mulai: "",
    selesai: "",
    jumlah: 0,
    klasifikasi: "",
    tanggal: getTodayDate(),
    lokasi: "",
    desc: "",
    sectionHead: "",
  });

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      pt: "",
      nama: "",
      id: "",
      mulai: "",
      selesai: "",
      jumlah: 0,
      klasifikasi: "",
      tanggal: getTodayDate(),
      lokasi: "",
      desc: "",
      sectionHead: "",
    });
  }, []);

  return {
    formData,
    updateField,
    resetForm,
  };
};
