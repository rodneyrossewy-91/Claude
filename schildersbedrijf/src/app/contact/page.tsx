import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met SchilderPro voor een gratis en vrijblijvende offerte. Wij reageren binnen 24 uur.",
};

export default function ContactPage() {
  return <ContactContent />;
}
