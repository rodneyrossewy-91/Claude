import type { Metadata } from "next";
import ReviewsContent from "./ReviewsContent";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Lees de beoordelingen van onze klanten. SchilderPro scoort gemiddeld een 9.2 op basis van 350+ reviews.",
};

export default function ReviewsPage() {
  return <ReviewsContent />;
}
