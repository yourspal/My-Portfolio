"use server";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description:
      "Contact Tarun Pal for full stack development opportunities and collaborations.",
  };
  

export async function submitContact(formData: FormData) {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const message = formData.get("message")?.toString();

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required" };
  }

  // Later: send email / store in DB
  console.log({ name, email, message });

  return { success: true };
}
