# Mobiele ervaring – oplevering (13 november 2026)

Status: geïmplementeerd en gepubliceerd in het partnerportaal en het beheerportaal. Zite-commits `9a5d0fc` (fundament) en `abff93f` (schermcorrecties).

## Wat is geïmplementeerd

### Fundament, centraal en gedeeld door beide apps

Dit geldt automatisch ook voor nieuwe schermen.

| Onderdeel | Waar | Wat het doet |
|---|---|---|
| **Navigatie onderaan** | `packages/components/ui/onderbalk.tsx` | Tot 1024 px breed: de 4 belangrijkste onderdelen voor de rol, met tellers. "Meer" opent alle onderdelen als tegels in een paneel van onderen. De balk verdwijnt als het toetsenbord openstaat en tijdens het installatiedossier. Hij houdt rekening met de rand van de iPhone. |
| **Mobiele basisregels** | `packages/components/mobiel.css` | Tikvlakken van minimaal 44 px op touchschermen; vinkjes en schakelaars krijgen een onzichtbaar groter tikvlak. Invoervelden zijn op de telefoon 16 px, zodat de iPhone niet inzoomt. Verder: ruimte voor de onderbalk, minder beweging als het systeem dat vraagt, lange knopteksten die afbreken, en filterknoppen als één schuifbare rij (`.chips`). |
| **Tabellen als kaarten** | `packages/components/lib/tabelkaarten.ts` + CSS | Onder 640 px wordt elke tabel met 3 of meer kolommen per rij een kaart met "kolom: waarde". Tabellen die al zelf mobiel zijn ingericht blijven tabel; met `data-geen-kaart` kun je dat ook afdwingen. Tabelrollen blijven staan voor schermlezers. |
| **Dialogen als paneel van onderen** | `ui/dialog.tsx`, `ui/alert-dialog.tsx` | Op de telefoon schuift een dialoog van onderen in, met een sluitknop van 44 px. Vanaf 640 px blijft hij gecentreerd zoals voorheen. |
| **Bellen, mailen, navigeren** | `ui/contact-links.tsx` | In de gegevenslijsten van dossiers, in klanten, team en contactpersonen: telefoon als belknop, e-mail als maillink, installatieadres als route. |

### Navigatie per rol

| App | Onderbalk | Onder "Meer" |
|---|---|---|
| Partnerportaal (partnerbeheerder) | Dashboard · Taken · Nieuw · Klanten | Aansluitingen, Planning, Facturen, Documenten, Producten, Team, Help, Mijn profiel |
| Partnerportaal (sales of monteur) | De eerste 4 van: Taken, Nieuw, Klanten, Aansluitingen, Planning, Documenten, Help | De rest, plus Mijn profiel |
| Beheerportaal | De eerste 4 van: Dashboard, Dossiers, Eerste controle, Inrichten, Taken, Finale controle, Klanten, Help (wat de rol mag zien) | Alle pagina's van de rol, "Wat is er nieuw" en het gebruikersmenu |

Zoeken in het beheer blijft rechtsboven in de kopregel.

### Correcties per scherm

- **Taken (portaal):** 11 filterknoppen staan nu op één schuifbare rij in plaats van een half scherm.
- **Dossier:** de lange actieknop ("Afwijkingen goedkeuren en aanmelden") breekt af in plaats van buiten de kaart te lopen.
- **Documenten:** de categorienaam loopt niet meer onder de labels.
- **Producten:** blijft een eigen mobiele indeling (de omzetting naar kaarten sloeg deze tabel terecht over).
- **Installatiedossier:** de onderbalk wijkt voor de eigen balk met Concept, Vorige en Volgende.
- **Bel en hulpknop:** tikvlak van 44 px.
- **Segmenten en filters in het beheer** (Nieuwe aansluitingen, Inrichten, Handleidingbeheer): één schuifbare rij.
- **Bulkacties, rondleiding en wizardnavigatie:** blijven boven de onderbalk.

## Opgelost na melding (14 november)

- **Rondleiding op de telefoon** liep langs alle stappen zonder iets aan te wijzen en eindigde na ongeveer 20 seconden bij Afronden. Oorzaak: de stappen wezen naar de menu-items van de zijbalk, die op mobiel is vervangen door de onderbalk. Nu wijst een stap naar het knopje in de onderbalk, of naar "Meer" met de uitleg dat het daar staat. De uitlegkaart staat bovenin als het knopje onderin zit. Getest: de portaalrondleiding (9 stappen) op iPhone-formaat; alle stappen worden aangewezen.

## Getest

Getest met Playwright op het live partnerportaal met DETEC-accounts (sales en monteur). Opslaan en indienen waren geblokkeerd, dus er is niets gewijzigd.

- **Breedtes:** 320, 375, 414, 768 en 1280 px.
- **Visuele controle op iPhone-formaat:** Meer-paneel, Taken, Nieuwe aanvraag, hulppaneel, Producten, Documenten, dossier en installatiedossier.
- **Schermen:** Taken, Dashboard, Aansluitingen, Klanten, Planning, Facturen, Documenten, Producten, Team, Handleiding & Help, Nieuwe aanvraag, dossier (sales), dossier (monteur) en installatiedossier.

| Meting (alle mobiele breedtes samen) | Voor | Na |
|---|---|---|
| Schermen met horizontaal scrollen | 0 | 0 |
| Tikvlakken kleiner dan 44 px | 1.008 | 77 |
| Invoervelden kleiner dan 16 px (iOS-zoom) | 588 | 3 |
| JavaScript-fouten in de console | 0 | 0 |
| Laadtijd tot het eerste scherm | 1,9 – 3,3 s | 2,2 – 3,4 s (geen verschil buiten de meetruis) |

De resterende kleine tikvlakken zijn vooral e-mailadressen in een zin en de stapbolletjes van de wizard (28 px breed, 44 px hoog). Links in een zin vallen onder de uitzondering van WCAG 2.5.8.

Desktop (1280 px): geen overflow en geen fouten. De zijbalk, de tabellen en de gecentreerde dialogen zijn ongewijzigd.

## Niet getest

- **Beheerportaal in de browser.** Het zit achter de Zite-login en die kan ik niet gebruiken. De wijzigingen zijn gedeelde componenten (onderbalk, dialogen, tabelkaarten, CSS) en zijn met de typecheck gecontroleerd. Graag op de telefoon nalopen:
  - Dashboard, Nieuwe aansluitingen, een dossier, Eerste controle en Inrichten;
  - een tabel als kaart, bijvoorbeeld Logboek of Tarieven.
- **Echte apparaten.** Getest met browseremulatie, niet op een echte iPhone of Android-telefoon. Toetsenbordgedrag, safe areas en camera graag even zelf proberen.
- **Liggend (landscape).** Niet apart gemeten.
- **Traag netwerk.** Niet gesimuleerd.

## Nog openstaand

- **Snelheid (onderzocht op 13 november):** de code van het portaal is 1,7 MB (436 KB ingepakt) en is binnen in 0,9 – 1,3 s. De meeste wachttijd zit niet in de code maar in de opvragen bij Zite: op de server zelf duren ze 0,05 – 0,9 s, maar in de browser 1 – 5 s, en dat varieert sterk per keer.
  - **Doorgevoerd:** de dashboardgegevens worden één keer opgehaald in plaats van twee keer; meldingen en de documententeller worden pas na het eerste scherm opgehaald; de klantpagina's worden apart geladen.
  - **Gemeten (iPhone-formaat):** eerste scherm 1,6 – 3,8 s, dashboard gevuld 3,9 – 6,8 s. Voor de wijziging: 2,8 – 3,7 s en 3,9 – 6,5 s. Het verschil valt binnen de spreiding van Zite.
  - **Doorgevoerd op 14 november:** (1) één opstart-aanroep (`opstart`) haalt diensten, profiel, aanvragen, concepten, kansen, dashboard en prestaties in één keer op, met dezelfde toegangscontrole per onderdeel; (2) de vorige stand staat op het toestel en wordt meteen getoond, met "Bijwerken…" tot de verse stand er is. Dat gebeurt maximaal 7 dagen, per medewerker, en niet bij meekijken of via de algemene partnerlink.
  - **Gemeten na deze stap (iPhone-formaat):** eerste bezoek dashboard gevuld na 2,4 – 3,0 s (vlak na publiceren 4,9 – 5,4 s); opnieuw openen 0,9 – 1,6 s; 2 aanroepen bij het openen in plaats van 9. Taken, tellers en dashboard werken met en zonder bewaarde stand, zonder fouten in de console.
- **Beheer als app op het beginscherm:** sinds 13 november mogelijk via q2yedas16g.zite.so (eigen icoon en schermvullend). Na het installeren log je één keer in binnen de app. Niet getest op een echt toestel, omdat het achter de inlog van Zite zit.
- **Swipe-acties** in lijsten: niet toegevoegd, omdat ze slecht te ontdekken zijn en snel per ongeluk worden geactiveerd.

## Richtlijnen voor nieuwe schermen

1. Gebruik de gedeelde `Button`, `Dialog`, `Sheet`, `Input` en `Select`; die zijn mobiel ingericht.
2. Tabellen hoef je niet apart mobiel te maken: met 3 of meer kolommen worden ze vanzelf kaarten. De eerste kolom wordt de titel van de kaart, dus zet de naam of het onderwerp vooraan. Wil je zelf een indeling, verberg dan kolommen met `hidden sm:table-cell`, of zet `data-geen-kaart` op de tabel.
3. Een rij filterknoppen krijgt de class `chips`.
4. Een vaste balk onderaan krijgt de class `boven-onderbalk`. Een taakscherm met een eigen balk zet `focus-taak` op de body (zie het installatiedossier).
5. Telefoon, e-mail en adres toon je met `Bellen`, `Mailen` en `Route` uit `ui/contact-links`.
6. Breekpunten: sm 640 (kaarten en dialogen), md 768 (iOS-zoom), lg 1024 (zijbalk of onderbalk).
