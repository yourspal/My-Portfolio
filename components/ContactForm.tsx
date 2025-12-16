"use client";

import { useState } from "react";
import { submitContact } from "@/app/actions/contact";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("loading");

    const result = await submitContact(formData);

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <input
        name="name"
        placeholder="Your Name"
        className="w-full p-3 bg-gray-900 border border-gray-700 rounded"
      />

      <input
        name="email"
        type="email"
        placeholder="Your Email"
        className="w-full p-3 bg-gray-900 border border-gray-700 rounded"
      />

      <textarea
        name="message"
        placeholder="Your Message"
        rows={5}
        className="w-full p-3 bg-gray-900 border border-gray-700 rounded"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <p className="text-green-400">
          Message sent successfully!
        </p>
      )}

      {status === "error" && (
        <p className="text-red-400">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
