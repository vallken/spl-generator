"use client";

import FormComponent from "./components/Form";
import { useFormData } from "./hooks/useFormData";

export default function Home() {
  const { formData, updateField } = useFormData();

  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="container">
        <FormComponent formData={formData} updateField={updateField} />
      </div>
    </div>
  );
}
