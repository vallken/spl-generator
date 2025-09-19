import CryptoJS from "crypto-js";
import { FormData } from "../types";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

export const encryptFormData = (formData: FormData): string => {
  try {
    const jsonString = JSON.stringify(formData);
    const encrypted = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
    return encrypted;
  } catch (error) {
    console.error("Error encrypting form data:", error);
    throw new Error("Failed to encrypt form data");
  }
};

export const decryptFormData = (encryptedData: string): FormData => {
  try {
    const decoded = decodeURIComponent(encryptedData);
    const bytes = CryptoJS.AES.decrypt(decoded, SECRET_KEY);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedString) {
      throw new Error("Failed to decrypt data");
    }

    const formData: FormData = JSON.parse(decryptedString);

    return formData;
  } catch (error) {
    console.error("Error decrypting form data:", error);
    throw new Error("Failed to decrypt form data");
  }
};

export const generateEncryptedLink = (formData: FormData): string => {
  const encryptedData = encryptFormData(formData);
  return encryptedData;
};

export const validateFormData = (data: any): data is FormData => {
  const requiredFields: (keyof FormData)[] = [
    "pt",
    "nama",
    "mulai",
    "selesai",
    "jumlah",
    "klasifikasi",
    "tanggal",
    "lokasi",
    "sectionHead",
    "desc",
  ];

  if (typeof data !== "object" || data === null) {
    return false;
  }

  return requiredFields.every(
    (field) => field in data && typeof data[field] === "string"
  );
};
