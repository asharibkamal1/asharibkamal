"use server";

import { field, type FormState, isProduction, isValidEmail, looksLikeBot } from "@/shared/lib/forms";
import { isKitConfigured, subscribeToKit } from "./kit";

export async function subscribe(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = field(formData, "email", 254).toLowerCase();
  const firstName = field(formData, "firstName", 60);
  const source = field(formData, "source", 100) || "website";

  if (!isValidEmail(email)) {
    return { status: "error", message: "Please enter a valid email address.", fieldErrors: { email: "Invalid email" }, values: { email } };
  }

  // Pretend success to bots so they don't retry.
  if (looksLikeBot(formData)) {
    return { status: "success", message: "Almost done — check your inbox to confirm." };
  }

  if (!isKitConfigured()) {
    if (isProduction) {
      console.error("[newsletter] KIT_API_KEY / KIT_FORM_ID are not set");
      return { status: "error", message: "Signups are temporarily unavailable. Please try again later." };
    }
    console.info(`[newsletter] (dev, Kit not configured) would subscribe ${email} from "${source}"`);
    return { status: "success", message: "Dev mode: Kit isn't configured yet, so nothing was sent." };
  }

  try {
    await subscribeToKit({ email, firstName });
    return { status: "success", message: "Almost done — check your inbox to confirm your subscription." };
  } catch (error) {
    console.error("[newsletter] subscribe failed", error);
    return { status: "error", message: "Something went wrong. Please try again in a minute." };
  }
}
