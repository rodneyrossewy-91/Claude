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

- **Code splitting.** De apps worden als één bundel geladen. Voor snellere eerste schermen kunnen zware schermen apart worden geladen; dat heb ik nog niet gedaan, omdat de laadtijd nu 2 tot 3,5 s is en de winst eerst gemeten moet worden.
- **Beheer als app op het beginscherm.** Het beheer draait op app.zite.com binnen de omgeving van Zite; een eigen app-manifest is daar niet mogelijk. Het partnerportaal is wel installeerbaar (sinds 12 november).
- **Swipe-acties** in lijsten: niet toegevoegd, omdat ze slecht te ontdekken zijn en snel per ongeluk worden geactiveerd.

## Richtlijnen voor nieuwe schermen

1. Gebruik de gedeelde `Button`, `Dialog`, `Sheet`, `Input` en `Select`; die zijn mobiel ingericht.
2. Tabellen hoef je niet apart mobiel te maken: met 3 of meer kolommen worden ze vanzelf kaarten. De eerste kolom wordt de titel van de kaart, dus zet de naam of het onderwerp vooraan. Wil je zelf een indeling, verberg dan kolommen met `hidden sm:table-cell`, of zet `data-geen-kaart` op de tabel.
3. Een rij filterknoppen krijgt de class `chips`.
4. Een vaste balk onderaan krijgt de class `boven-onderbalk`. Een taakscherm met een eigen balk zet `focus-taak` op de body (zie het installatiedossier).
5. Telefoon, e-mail en adres toon je met `Bellen`, `Mailen` en `Route` uit `ui/contact-links`.
6. Breekpunten: sm 640 (kaarten en dialogen), md 768 (iOS-zoom), lg 1024 (zijbalk of onderbalk).
