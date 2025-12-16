import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen px-8 py-24 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Contact Me</h1>

      <p className="text-gray-400 mb-10">
        Have a project in mind or want to work together?  
        Fill out the form below and I’ll get back to you.
      </p>

      <ContactForm />
    </main>
  );
}
