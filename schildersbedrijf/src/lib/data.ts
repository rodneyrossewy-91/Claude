export const reviews = [
  { id: 1, name: "Jan de Vries", city: "Amsterdam", stars: 5, quote: "Uitstekend werk geleverd! Het team was punctueel, netjes en het resultaat is prachtig. De kozijnen zien er als nieuw uit.", werkzaamheden: "Buitenschilderwerk", date: "november 2024" },
  { id: 2, name: "Maria Bakker", city: "Utrecht", stars: 5, quote: "Zeer tevreden met het binnenschilderwerk. Strakke afwerking, geen druipsporen en de kleur advies was perfect. Zeker een aanrader!", werkzaamheden: "Binnenschilderwerk", date: "oktober 2024" },
  { id: 3, name: "Peter Smit", city: "Rotterdam", stars: 5, quote: "Na jaren van uitgesteld onderhoud heeft Van der Berg onze gevel volledig vernieuwd. Professioneel, snel en voor een eerlijke prijs.", werkzaamheden: "Gevelrenovatie", date: "september 2024" },
  { id: 4, name: "Anneke van den Berg", city: "Den Haag", stars: 4, quote: "Goed werk aan onze winkelruimte. Het spuitwerk is vlekkeloos en het team werkte heel netjes met beschermingsdoek. Zou ze zeker aanbevelen.", werkzaamheden: "Spuitwerk zakelijk", date: "augustus 2024" },
  { id: 5, name: "Thomas Janssen", city: "Haarlem", stars: 5, quote: "Houtrot probleem volledig opgelost. Ze hebben alles keurig gerepareerd en daarna direct geschilderd. Top vakmanschap!", werkzaamheden: "Houtrot reparatie", date: "juli 2024" },
  { id: 6, name: "Lisa Vermeer", city: "Leiden", stars: 5, quote: "Onze woning van de jaren 70 ziet er nu uit als nieuw. Prachtig kleuradvies gekregen en het resultaat overtreft onze verwachtingen.", werkzaamheden: "Buitenschilderwerk", date: "juni 2024" },
  { id: 7, name: "Robert Hendriks", city: "Delft", stars: 5, quote: "Al voor de derde keer gebruik gemaakt van Van der Berg. Altijd betrouwbaar, altijd kwaliteit. De schilders zijn vriendelijk en werken snel.", werkzaamheden: "Binnenschilderwerk", date: "mei 2024" },
  { id: 8, name: "Sandra Koops", city: "Amstelveen", stars: 4, quote: "Professioneel bedrijf. Ze kwamen hun afspraken na en leverden mooi werk. De offerte was duidelijk en er kwamen geen verrassingen achteraf.", werkzaamheden: "Kozijnen schilderen", date: "april 2024" },
];

export const portfolioProjects = [
  { id: 1, title: "Herenhuis Amsterdam-Zuid", location: "Amsterdam", category: "Buitenschilderwerk", type: "Particulier", description: "Volledige renovatie van een jaren-30 herenhuis. Gevel, kozijnen en dakranden volledig hersteld en geschilderd.", materials: "Sikkens BuitenLatex, Sigma S2U, epoxy houtrotreparatie", gradient: "from-[#1E3A8A] to-[#2563EB]" },
  { id: 2, title: "Kantoorpand Utrecht Centrum", location: "Utrecht", category: "Buitenschilderwerk", type: "Zakelijk", description: "Groot kantoorcomplex van 5 verdiepingen volledig gespoten. Strakke afwerking met industriële coating.", materials: "Sigma AquaDur Renovatie, primer Histor", gradient: "from-[#1F2937] to-[#374151]" },
  { id: 3, title: "Luxe villa Wassenaar", location: "Wassenaar", category: "Binnenschilderwerk", type: "Particulier", description: "Complete binnenschildering van een luxe villa. 14 kamers volledig gerenoveerd met premium verfsoorten.", materials: "Farrow & Ball, Little Greene premium emulsie", gradient: "from-[#FBBF24] to-[#F59E0B]" },
  { id: 4, title: "Winkelpand Rotterdam", location: "Rotterdam", category: "Binnenschilderwerk", type: "Zakelijk", description: "Spuitwerk en schilderwerk voor een moderne retailruimte. Strakke wanden en plafonds voor een premium uitstraling.", materials: "Sigma S2U, spuitbare muurverf Histor", gradient: "from-[#1E3A8A] to-[#1F2937]" },
  { id: 5, title: "Rijtjeswoningen Haarlem", location: "Haarlem", category: "Buitenschilderwerk", type: "Particulier", description: "Buitenschilderwerk voor een blok van 8 rijtjeswoningen. Kozijnen, deuren en gevelbeplating vernieuwd.", materials: "Sikkens Rubbol AZ Plus, Histor Maximum", gradient: "from-[#064E3B] to-[#065F46]" },
  { id: 6, title: "Restaurant Den Haag", location: "Den Haag", category: "Binnenschilderwerk", type: "Zakelijk", description: "Interieurproject voor een nieuw restaurant. Decoratieve schildertechnieken en premium afwerking.", materials: "Ecos paints, Kansai Paint premium lak", gradient: "from-[#7C3AED] to-[#6D28D9]" },
];

export const services = [
  {
    id: 1,
    slug: "binnenschilderwerk",
    title: "Binnenschilderwerk",
    subtitle: "Muren, plafonds, kozijnen en deuren",
    description: "Wij verzorgen professioneel binnenschilderwerk voor particulieren en bedrijven. Van een enkelvoudige kamer tot een complete woning of kantoorpand — wij leveren altijd strak en duurzaam werk.",
    werkwijze: ["Gratis inspectie en offerte op maat", "Gedegen voorbereiding: schuren, plamuren en grunderen", "Professionele uitvoering met premium verfsoorten", "Oplevering inclusief eindcontrole en nawerk"],
    voordelen: ["Strakke afwerking zonder strepen of druipsporen", "Kleuradvies inbegrepen", "Eigen materiaalgarantie", "Werken ook in bewoonde ruimtes"],
    faq: [{ q: "Hoe lang duurt het schilderen van een kamer?", a: "Een gemiddelde kamer schilderen we in één dag. Inclusief voorbereiding rekenen we 1-2 dagen per kamer." }, { q: "Welke verfsoorten gebruiken jullie?", a: "Wij werken met A-merken zoals Sikkens, Sigma en Histor. We adviseren de beste keuze voor uw situatie." }],
    icon: "home",
  },
  {
    id: 2,
    slug: "buitenschilderwerk",
    title: "Buitenschilderwerk",
    subtitle: "Gevels, kozijnen, dakranden en houtwerk",
    description: "Buitenschilderwerk vraagt om duurzame materialen en vakkundige voorbereiding. Wij zorgen voor een waterbestendige, UV-resistente afwerking die jaren meegaat.",
    werkwijze: ["Volledige inspectie van het buitenwerk", "Reiniging, ontvetting en schuren van alle oppervlakken", "Houtrotreparatie waar nodig", "Aanbrengen van primer en meerdere verflagen"],
    voordelen: ["Minimaal 5 jaar schildergarantie", "Gebruik van weerbestendige buitenverf", "Inclusief houtrotreparatie", "Bescherming én uitstraling verbeterd"],
    faq: [{ q: "Wanneer is het beste moment voor buitenschilderwerk?", a: "Het ideale seizoen is april t/m oktober bij droog weer boven 8°C. Wij plannen altijd in het juiste weersvenster." }, { q: "Geef jullie garantie?", a: "Ja, wij bieden 5 jaar garantie op het buitenschilderwerk bij gebruik van onze aanbevolen verfproducten." }],
    icon: "building",
  },
  {
    id: 3,
    slug: "spuitwerk",
    title: "Spuitwerk",
    subtitle: "Strak en efficiënt resultaat",
    description: "Met professioneel spuitwerk bereiken we een vlekkeloos glad resultaat op grote oppervlakken. Ideaal voor renovatieprojecten, nieuwbouw en zakelijke interieurs.",
    werkwijze: ["Volledige afdekking van ruimte en meubilair", "Schuren en gronderen van alle te spuiten vlakken", "Spuiten met airless spuitapparatuur", "Nacontrole en eventueel bijwerken"],
    voordelen: ["Perfecte, strakke afwerking", "Sneller dan traditioneel schilderen", "Geschikt voor grote oppervlakken", "Industriële kwaliteit voor iedere ruimte"],
    faq: [{ q: "Is spuitwerk geschikt voor mijn woning?", a: "Spuitwerk is ideaal voor nieuwbouw en renovatieprojecten waar ruimtes leeg zijn. Wij adviseren u graag." }, { q: "Hoe lang duurt het voor het spuitwerk droog is?", a: "Afhankelijk van het product is het spuitwerk na 2-4 uur droog voor aanraking en na 24 uur volledig hard." }],
    icon: "spray",
  },
  {
    id: 4,
    slug: "houtrot-reparatie",
    title: "Houtrot Reparatie",
    subtitle: "Duurzame oplossingen voor beschadigd hout",
    description: "Houtrot is een veelvoorkomend probleem bij buitenkozijnen en dakranden. Wij repareren duurzaam met hoogwaardige epoxy systemen — zonder kostbaar houtwerk te vervangen.",
    werkwijze: ["Inspectie en beoordeling van de houtrotschade", "Verwijderen van aangetast houtweefsel", "Behandeling met houtrot converter en primer", "Opvullen met tweecomponent epoxy pasta en afwerken"],
    voordelen: ["Goedkoper dan complete vervanging", "Duurzame oplossing tot 15+ jaar", "Behandeling tegen nieuwe houtrot", "Direct overschilderbaar"],
    faq: [{ q: "Is houtrotreparatie altijd mogelijk?", a: "In de meeste gevallen wel. Alleen bij meer dan 50% aangetast houtwerk raden we vervanging aan." }, { q: "Hoe lang gaat een houtrotreparatie mee?", a: "Bij correcte uitvoering en goed onderhoud gaat een epoxy reparatie 10-15 jaar mee." }],
    icon: "tool",
  },
];

export const teamMembers = [
  { id: 1, name: "Erik van der Berg", role: "Directeur & Uitvoerder", bio: "Met meer dan 20 jaar ervaring in het schildersvak heeft Erik Van der Berg Schilderwerken opgericht met één missie: het leveren van topkwaliteit schilderwerk met persoonlijke aandacht.", initials: "EB" },
  { id: 2, name: "Mark Visser", role: "Senior Schilder", bio: "Mark is onze specialist buitenschilderwerk en houtrotreparatie. Met zijn oog voor detail en jarenlange ervaring zorgt hij altijd voor een perfecte afwerking.", initials: "MV" },
  { id: 3, name: "Dylan Vermeer", role: "Schilder & Spuitwerker", bio: "Dylan is gespecialiseerd in spuitwerk en decoratief schilderwerk. Zijn precisie en snelheid maken hem onmisbaar bij onze zakelijke projecten.", initials: "DV" },
];

export const timeline = [
  { year: "2009", title: "Oprichting", description: "Erik van der Berg richt het bedrijf op vanuit zijn passie voor vakmanschap en kwaliteit." },
  { year: "2012", title: "Eerste grote project", description: "Renovatie van een appartementencomplex in Amsterdam — het begin van onze zakelijke tak." },
  { year: "2016", title: "Uitbreiding team", description: "Het team groeit naar 5 vaste medewerkers en we investeren in professioneel spuitmateriaal." },
  { year: "2020", title: "Online aanwezigheid", description: "Lancering van onze nieuwe website en het opbouwen van een online portfolio van 200+ projecten." },
  { year: "2024", title: "15 jaar jubileum", description: "We vieren 15 jaar Van der Berg Schilderwerken met meer dan 500 afgeronde projecten en 98% tevreden klanten." },
];
