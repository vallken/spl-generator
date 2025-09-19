import puppeteer, { Browser, Page } from "puppeteer-core";
import { NextResponse } from "next/server";
import chromium from "@sparticuz/chromium-min";

export async function GET(req: Request) {
  let browser: Browser | null = null;
  let page: Page | null = null;

  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json(
        { message: "A ?url query-parameter is required" },
        { status: 400 }
      );
    }

    let targetUrl: URL;
    try {
      targetUrl = new URL(url);
      if (!["http:", "https:"].includes(targetUrl.protocol)) {
        return NextResponse.json(
          { message: "Invalid URL protocol. Only HTTP and HTTPS are allowed." },
          { status: 400 }
        );
      }
    } catch {
      return NextResponse.json(
        { message: "Invalid URL format provided." },
        { status: 400 }
      );
    }

    const executablePath = await chromium.executablePath(
      "https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar"
    );

    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath,
    });

    page = await browser.newPage();
    await page.setViewport({ width: 800, height: 708 });
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    await page.waitForSelector(".tujuan");

    const pdf8uint = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    const pdfBuffer = Buffer.from(pdf8uint);

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="page-${Date.now()}.pdf"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error: any) {
    console.error("PDF generation error:", error);

    if (error.message?.includes("timeout")) {
      return NextResponse.json(
        { message: "Request timeout: The page took too long to load" },
        { status: 408 }
      );
    }

    if (error.message?.includes("net::")) {
      return NextResponse.json(
        { message: "Unable to access the provided URL" },
        { status: 400 }
      );
    }

    if (error.message?.includes("websocket")) {
      return NextResponse.json(
        { message: "Browser service temporarily unavailable" },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { message: "An error occurred while generating the PDF" },
      { status: 500 }
    );
  } finally {
    try {
      if (page) await page.close();
      if (browser) await browser.disconnect();
    } catch (cleanupError) {
      console.error("Cleanup error:", cleanupError);
    }
  }
}
