"use server";

import { field, type FormState, isProduction, isValidEmail, looksLikeBot } from "@/shared/lib/forms";
import { budgets, projectTypes } from "./options";
import { isResendConfigured, sendEmail } from "./resend";

export async function sendContactMessage(_prev: FormState, formData: FormData): Promise<FormState> {
  const name = field(formData, "name", 100);
  const email = field(formData, "email", 254).toLowerCase();
  const projectType = field(formData, "projectType", 100);
  const budget = field(formData, "budget", 100);
  const message = field(formData, "message", 5000);
  const values = { name, email, projectType, budget, message };

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2) fieldErrors.name = "Please enter your name.";
  if (!isValidEmail(email)) fieldErrors.email = "Please enter a valid email address.";
  if (!(projectTypes as readonly string[]).includes(projectType)) fieldErrors.projectType = "Please choose a project type.";
  if (budget && !(budgets as readonly string[]).includes(budget)) fieldErrors.budget = "Please choose a budget range.";
  if (message.length < 20) fieldErrors.message = "Please tell me a bit more (at least 20 characters).";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors, values };
  }

  const ok: FormState = { status: "success", message: "Thanks! Your message is on its way — I'll get back to you by email." };
  if (looksLikeBot(formData)) return ok;

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Project type: ${projectType}`,
    `Budget: ${budget || "Not specified"}`,
    "",
    message,
  ].join("\n");

  if (!isResendConfigured()) {
    if (isProduction) {
      console.error("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL are not set");
      return { status: "error", message: "The form is temporarily unavailable. Please email me directly instead.", values };
    }
    console.info(`[contact] (dev, Resend not configured) would send:\n${text}`);
    return { status: "success", message: "Dev mode: Resend isn't configured yet, so the message was only logged." };
  }

  try {
    await sendEmail({ subject: `New enquiry: ${projectType} — ${name}`, text, replyTo: email });
    return ok;
  } catch (error) {
    console.error("[contact] send failed", error);
    return { status: "error", message: "Sorry, sending failed. Please try again or email me directly.", values };
  }
}
