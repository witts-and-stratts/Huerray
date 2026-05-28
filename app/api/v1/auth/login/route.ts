import { NextRequest, NextResponse } from "next/server";
import { verifyTurnstileToken } from "@/lib/turnstile-server";

export async function POST(request: NextRequest) {
  const turnstileToken = request.headers.get("x-turnstile-token");

  if (!turnstileToken) {
    return NextResponse.json(
      { success: false, message: "Security check is required. Please solve the captcha challenge." },
      { status: 400 }
    );
  }

  const isValid = await verifyTurnstileToken(turnstileToken);
  if (!isValid) {
    return NextResponse.json(
      { success: false, message: "Security check verification failed. Please try again." },
      { status: 400 }
    );
  }

  // Proxy the request to the actual backend endpoint
  const targetBaseUrl = process.env.API_PROXY_TARGET || "https://backend.huerray.de/api/v1";
  const targetUrl = `${targetBaseUrl}/auth/login`;

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    // Exclude Host header and Turnstile token header to prevent conflicts
    if (key.toLowerCase() !== "host" && key.toLowerCase() !== "x-turnstile-token") {
      headers.set(key, value);
    }
  });

  const bodyText = await request.text();

  try {
    const backendRes = await fetch(targetUrl, {
      method: "POST",
      headers,
      body: bodyText,
    });

    const data = await backendRes.text();

    return new NextResponse(data, {
      status: backendRes.status,
      headers: backendRes.headers,
    });
  } catch (err: any) {
    console.error("Login proxy error:", err);
    return NextResponse.json(
      { success: false, message: `Failed to connect to authentication server: ${err.message}` },
      { status: 500 }
    );
  }
}
