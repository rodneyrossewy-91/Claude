import type { Metadata } from "next";
import PortfolioContent from "./PortfolioContent";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Bekijk ons portfolio van uitgevoerde schilderprojecten. Binnenschilderwerk, buitenschilderwerk, spuitwerk en meer voor particulieren en bedrijven.",
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
