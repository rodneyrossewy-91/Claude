import type { Metadata } from "next";
import DienstenContent from "./DienstenContent";

export const metadata: Metadata = {
  title: "Diensten",
  description:
    "Bekijk alle diensten van SchilderPro: binnenschilderwerk, buitenschilderwerk, spuitwerk en houtrot reparatie. Professioneel en met garantie.",
};

export default function DienstenPage() {
  return <DienstenContent />;
}
