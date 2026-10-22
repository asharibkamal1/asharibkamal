import "server-only";

// Minimal client for the Kit (ConvertKit) v4 API — https://developers.kit.com
const KIT_API = "https://api.kit.com/v4";

export function isKitConfigured() {
  return Boolean(process.env.KIT_API_KEY && process.env.KIT_FORM_ID);
}

async function kitFetch(path: string, body: unknown) {
  const res = await fetch(`${KIT_API}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Kit-Api-Key": process.env.KIT_API_KEY!,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Kit API ${path} failed: ${res.status} ${text.slice(0, 300)}`);
  }
  return res.json();
}

/**
 * Create (or update) the subscriber, then add them to the signup form.
 * Double opt-in and the incentive email (the lead magnet) follow that form's settings in Kit.
 */
export async function subscribeToKit({ email, firstName }: { email: string; firstName?: string }) {
  await kitFetch("/subscribers", {
    email_address: email,
    first_name: firstName || undefined,
  });
  await kitFetch(`/forms/${process.env.KIT_FORM_ID}/subscribers`, {
    email_address: email,
  });
}
