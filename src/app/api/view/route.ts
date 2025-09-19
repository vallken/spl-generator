import { NextResponse } from "next/server";

import { decryptFormData, validateFormData } from "@/app/utils/encrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { encryptedData } = body;
    console.log(body);

    if (!encryptedData || typeof encryptedData !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Missing or invalid encrypted data parameter",
        },
        { status: 400 }
      );
    }
    const formData = decryptFormData(encryptedData);
    console.log("🚀 ~ POST ~ formData:", formData);

    return NextResponse.json(
      {
        success: true,
        data: formData,
        message: "Data decrypted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Decryption error:", error);
    NextResponse.json(
      {
        success: false,
        message: "Failed to decrypt data. Invalid or corrupted encrypted data.",
      },
      { status: 500 }
    );
  }
}
