import type { Metadata } from "next";
import OverOnsContent from "./OverOnsContent";

export const metadata: Metadata = {
  title: "Over Ons",
  description:
    "Leer meer over SchilderPro – meer dan 15 jaar vakmanschap in schilderwerk. Betrouwbaar, persoonlijk en professioneel.",
};

export default function OverOnsPage() {
  return <OverOnsContent />;
}
