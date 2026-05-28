// Replaces Scandinavian/Cyrillic homoglyphs with standard ASCII characters
function sanitizeKey(key: string | null | undefined): string {
  if (!key) return "";
  let clean = key.trim();
  
  // Strip any wrapping single or double quotes
  if (clean.startsWith('"') && clean.endsWith('"')) {
    clean = clean.slice(1, -1);
  }
  if (clean.startsWith("'") && clean.endsWith("'")) {
    clean = clean.slice(1, -1);
  }
  
  // Replace Scandinavian slash O with standard zero
  if (clean.startsWith("Øx")) {
    clean = "0x" + clean.slice(2);
  }
  
  // Replace Cyrillic homoglyphs that look identical to ASCII characters
  const homoglyphs: Record<string, string> = {
    'А': 'A', // Cyrillic capital A
    'а': 'a', // Cyrillic small a
    'В': 'B', // Cyrillic capital Ve
    'Е': 'E', // Cyrillic capital E
    'е': 'e', // Cyrillic small e
    'К': 'K', // Cyrillic capital Ka
    'к': 'k', // Cyrillic small ka
    'М': 'M', // Cyrillic capital Em
    'Н': 'H', // Cyrillic capital En
    'О': 'O', // Cyrillic capital O
    'о': 'o', // Cyrillic small o
    'Р': 'P', // Cyrillic capital Er
    'р': 'p', // Cyrillic small er
    'С': 'C', // Cyrillic capital Es
    'с': 'c', // Cyrillic small es
    'Т': 'T', // Cyrillic capital Te
    'Х': 'X', // Cyrillic capital Kha
    'х': 'x', // Cyrillic small kha
  };
  
  return clean.split('').map(char => homoglyphs[char] || char).join('');
}

/**
 * Server-side helper to verify Cloudflare Turnstile token.
 */
export async function verifyTurnstileToken(token: string | null | undefined): Promise<boolean> {
  if (!token) {
    console.warn("Turnstile: Token is missing");
    return false;
  }

  // Support both correct and typoed versions of environment variables for absolute safety
  const rawSecretKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SECRET_KEY || 
                       process.env.NEXT_PUBILC_CLOUDFLARE_SECRET_KEY || 
                       process.env.CLOUDFLARE_SECRET_KEY;

  const secretKey = sanitizeKey(rawSecretKey);

  if (!secretKey) {
    console.error("Turnstile: Secret key is not defined in environment variables");
    return false;
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Turnstile: siteverify responded with status ${response.status}`);
      return false;
    }

    const data = await response.json();
    
    if (data.success) {
      return true;
    } else {
      console.warn("Turnstile: Verification failed with errors:", data["error-codes"]);
      return false;
    }
  } catch (error) {
    console.error("Turnstile: Verification exception:", error);
    return false;
  }
}

