// Shared helpers for server-action forms (newsletter, contact, future checkout forms).

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
  /** Submitted values echoed back so fields can be refilled (React resets forms after an action). */
  values?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle", message: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string) {
  return value.length <= 254 && EMAIL_RE.test(value);
}

export function field(formData: FormData, name: string, maxLength = 500) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

/**
 * Cheap bot protection: a hidden "website" field humans never fill, and a minimum
 * time between the form loading and being submitted (skipped if JavaScript didn't run).
 */
export function looksLikeBot(formData: FormData, minMs = 2500) {
  if (field(formData, "website")) return true;
  const startedAt = Number(field(formData, "startedAt"));
  return startedAt > 0 && Date.now() - startedAt < minMs;
}

export const isProduction = process.env.NODE_ENV === "production";
