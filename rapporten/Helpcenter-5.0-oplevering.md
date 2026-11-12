# DEVISION Interactive Help Center 5.0 – opleverrapport (fase 1 t/m 6)

Stand: 12 november 2026.

| Onderdeel | Waarde |
|---|---|
| Workspace | Security Technology Registration (Zite) |
| Apps | Aanmeldingen beheer (`q2yedas16g`), Aanmelding 3B (`kvha4p1c4b`) |
| Commits | `c0d0d6b` (fase 1–4), `3530e25` en `ece7806` (fase 5–6) |
| Gebouwd en getest | Ja |
| Gepubliceerd | **Ja**, na akkoord op 12 november 2026 |

## Samenvatting

**Gebouwd:**
- Een rolafhankelijk Help Center in beide apps.
- Een contextuele hulpknop op elk scherm.
- De dossiergestuurde procescoach "Wat moet ik nu doen?".
- Handleidingbeheer, met documentatiecontrole tegen de code, feedback en gebruiksstatistiek.

**Uitgangspunt:** er is geen tweede procesmodel. De coach en de artikelen lezen de bestaande workflowcode:
- fasen en overgangen (`lib/workflow.ts`);
- wat er ontbreekt per overgang (`ontbrekendVoor`);
- de procesdefinities en procesuitleg uit Procesbeheer;
- de paginalijst van het beheerportaal.

**Nog niet gebouwd** (fase 5 t/m 7, zie onder): interactieve rondleidingen, Learning Academy, AI-assistent en kennistoetsen.

---

## A. Fase 1 – Inventarisatie

### Beheerportaal

De lijst hieronder is uit de code gegenereerd (`lib/beheerpaginas.ts`). In de laatste kolom staat het aantal artikelen dat bij het scherm hoort.

| Scherm | Route | Rollen | Functie | Proces | Artikelen |
|---|---|---|---|---|---|
| Dashboard | `?p=dashboard` | Beheer, Meldkamer, Administratie | Werkvoorraad, procesrapportage en commerciële cijfers | — | 1 |
| Procesbeheer | `?p=procesbeheer` | Beheer, Administratie | Alle processen, waar elk dossier staat | — | 1 |
| Inzichten | `?p=inzichten` | Beheer, Administratie | Kwaliteit, doorlooptijden, behoud, partnerprestaties, audit | — | 1 |
| Mijn processen | `?p=processen` | Beheer, Meldkamer | Dossiers waarvoor jij eindverantwoordelijk bent | — | 1 |
| Aansluiting inrichten | `?p=meldkamer` | Beheer, Meldkamer, Administratie | Site voorbereiden, inrichten en testen | — | 1 |
| Nieuwe aansluitingen | `?p=aansluitingen` | Beheer, Meldkamer, Administratie | Alle aanvragen tot actieve aansluiting | — | 1 |
| Aansluitbeheer | `?p=aansluitbeheer` | Beheer, Meldkamer, Administratie | Actieve en komende aansluitingen | — | 1 |
| Klanten | `?p=klanten` | Beheer, Meldkamer, Administratie | Klanten, adressen, dossiers | — | 1 |
| Installatieplanning | `?p=planning` | Beheer, Administratie | Installaties per monteur | — | 1 |
| Wijzigingen | `?p=wijzigingen` | Beheer, Meldkamer, Administratie | Wijzigingen en opzeggingen | Service en mutaties | 3 |
| Eerste controle | `?p=eerste` | Beheer, Administratie | Klaarzetten na klantakkoord | Aansluiting | 3 |
| Finale controle | `?p=controle` | Beheer, Administratie | Inrichten, testen, controleren, activeren | Aansluiting | 3 |
| Onboarding | `?p=onboarding` | Beheer, Administratie | Welkomstgesprekken en nazorg | Aansluiting | 3 |
| Facturatie | `?p=facturatie` | Beheer, Administratie | Factuurregels, runs, rapportage | Contract, Financieel | 7 |
| Objectcodes | `?p=objectcodes` | Beheer, Administratie | Objectcodes bij opvolgbedrijven | — | 1 |
| Codepassen | `?p=codepassen` | Beheer, Administratie | Codepassen uitleveren | — | 1 |
| Producttaken | `?p=producttaken` | Beheer, Meldkamer, Administratie, IT | Taken per team bij verkochte producten | Aansluiting | 3 |
| Productacties | `?p=productacties` | Beheer | Instellen wat bij een product hoort | — | 1 |
| Factuurgegevens | `?p=factuurproducten` | Beheer | Boekhoudgegevens per product | Artikel- en prijsbeheer | 3 |
| Artikelen | `?p=artikelen` | Beheer | Centrale artikellijst | Artikel- en prijsbeheer | 3 |
| Partnerreferenties | `?p=partnerreferenties` | Beheer | Artikelcodes van partners | — | 1 |
| Financiële controles | `?p=controles` | Beheer, Administratie | Afwijkingen in artikelen en facturatie | Financieel | 3 |
| Partners | `?p=partners` | Beheer | Onboarding, huisstijl, templates, vrijgave | Partnerbeheer | 5 |
| Documenten | `?p=documenten` | Beheer | Documentenbibliotheek en pakketten | Documentbeheer | 5 |
| Tarieven | `?p=tarieven` | Beheer | Tarieven en assortiment per partner | Artikel, Partner | 6 |
| Opvolgbedrijven | `?p=opvolgbedrijven` | Beheer | Bedrijven voor alarmopvolging | — | 1 |
| Medewerkers | `?p=medewerkers` | Beheer | Medewerkers van partners, persoonlijke links | Partnerbeheer | 3 |
| Logboek | `?p=logboek` | Beheer | Alle wijzigingen met wie en wanneer | — | 1 |
| Verzonden mails | `?p=mails` | Beheer, Administratie | Verzonden mails en status | — | 1 |
| Instellingen | `?p=instellingen` | Beheer | Organisaties, ketens, normtijden | — | 1 |
| Handleiding & Help | `?p=help` | Alle rollen | **Nieuw** | — | — |
| Handleidingbeheer | `?p=handleidingbeheer` | Beheer | **Nieuw** | — | 1 |

Schermen met maar 1 artikel hebben alleen een korte schermuitleg, uit de omschrijving in de code. Uitgebreide stap-voor-stap-handleidingen ontbreken daar nog. Ze kunnen worden toegevoegd via Handleidingbeheer.

### Partnerportaal

Uit `App.tsx`. Wie welk menu ziet, wordt op de server afgedwongen.

| Scherm | Partnerportaal (beheerder) | Sales zonder portaal | Monteur zonder portaal | Gedeelde partnerlink |
|---|---|---|---|---|
| Taken (dossiers) | ✓ | ✓ | ✓ (alleen eigen opdrachten) | — |
| Dashboard, Aansluitingen, Planning, Facturen, Producten, Team | ✓ | — | — | — |
| Klanten | ✓ | ✓ | — | — |
| Nieuwe aanvraag / aanmelding | ✓ | ✓ | ✓ | ✓ |
| Wijziging of opzegging | (via Aansluitingen) | ✓ | ✓ | ✓ |
| Documenten | ✓ | ✓ | ✓ | — |
| Handleiding & Help | ✓ **nieuw** | ✓ **nieuw** | ✓ **nieuw** | — |

Wizardstappen van een aanvraag: Klant & object → Diensten → Procedures → Opvolging & contactpersonen → WePrevent. Bij monteur, spoed en "zonder offerte" lopen er afwijkende routes.

### Proces, statussen en overgangen

**Fasen:** 15 hoofdfasen en 5 uitzonderingen (`lib/workflow.ts`).

**Overgangen:** 22, elk met de rollen die hem mogen uitvoeren. Het partnerportaal filtert daar nog extra op: opleveren loopt via het installatiedossier, en installeren kan pas als de eerste controle klaar is.

**Werk dat parallel loopt aan de hoofdroute:**
- eerste controle;
- producttaken per team;
- finale controle;
- meldkameraansluiting;
- onboarding;
- wijzigingen;
- taakoverdracht.

**Afwijkende routes in de code:**
- spoed;
- directe aanmelding door de monteur;
- zonder offerte;
- offerte herzien;
- afwijking na installatie (commerciële beoordeling);
- controle teruggestuurd;
- pauze;
- opzegging;
- heractivering.

### Expliciet onbekend of niet gebouwd

- In Procesbeheer staan als **voorstel** (niet gebouwd): goedkeuring prijswijziging, apart klantcontract genereren, toewijzing van wijzigingen aan een medewerker. Daar is geen handleiding voor gemaakt.
- **Deels gebouwd:** kans of aanvraag (geen leadregistratie), Exact Online (alleen export). Het artikel meldt dat.
- **Uitleg per scherm in het partnerportaal:** er bestaat geen omschrijving per portaalscherm in de code. Het portaal krijgt daarom alleen procesartikelen per scherm; schermuitleg is nog te configureren.
- **Formuliervelden en validaties per veld** zijn niet als aparte artikelen vastgelegd.

---

## B. Architectuur (fase 2)

| Onderdeel | Bestand | Rol |
|---|---|---|
| Kennisstructuur (KnowledgeArticle, Audience, HelpContext) | `packages/components/help/kennis.ts` | Artikelen afgeleid uit de code, rollen, schermkoppeling, zoeken met synoniemen, veelgestelde vragen |
| Opslag | Tabellen **Helpartikelen**, **Helpfeedback**, **Helpgebruik** | Status, versie, historie, bronversie (vingerafdruk van de code) |
| Server Help Center | `packages/components/server/help.ts` | Rolfilter (portaal nooit intern), feedback, gebruik zonder persoonsgegevens, documentatiecontrole |
| ProcessContext, NextAction, ProcessBlocker | `packages/components/server/procescoach.ts` | Alleen-lezen uitleeslaag over de workflow; geen eigen statusmachine |
| Interface (gedeeld) | `packages/components/help/HelpCentrum.tsx`, `Artikel.tsx`, `ProcesCoach.tsx` | Eén component voor beide apps, met de huisstijl van elke app (partnerkleuren in het portaal) |
| Endpoints beheer | `helpcentrum`, `helpTerugmelding`, `getProcescoach`, `helpBeheer`, `bewaarHelpartikel` | Rechten via de bestaande beheerrollen |
| Endpoints portaal | `helpcentrum`, `helpTerugmelding`, `getProcescoach` | Rechten via de persoonlijke link; de coach gebruikt de toegangscontrole en acties van `getAanvraag` |

## C. Wat werkt en hoe ver het getest is

| Onderdeel | Status |
|---|---|
| Menu-item **Handleiding & Help** in beide apps | Gebouwd, typecheck in orde; **niet in de browser bekeken** (zie G) |
| Startpagina: zoeken, processen, veelgestelde vragen, favorieten, recent, alle onderwerpen, Nieuw in DEVISION (beheer) | Gebouwd; zoeklogica getest |
| Rolfilter op de server | **Volledig getest** |
| Contextuele hulpknop per scherm | Gebouwd, niet in de browser getest |
| Procescoach in het dossier (beheer en portaal) | **Endpoints volledig getest op alle 6 dossiers**; interface niet in de browser getest |
| Feedback (ja/nee, reden, opmerking) | **Volledig getest** |
| Handleidingbeheer: bewerken, versies, ter controle, publiceren, archiveren, voorstel uit de code | **Endpoints volledig getest**; interface niet in de browser getest |
| Documentatiecontrole tegen de code | **Getest**: herkende de nieuwe pagina Handleidingbeheer automatisch |
| Gebruiksstatistiek en verbetersignalen (pas vanaf 3 meldingen) | Gebouwd en getest |
| Bewaartermijn voor anoniem gebruik (180 dagen) | Gebouwd, niet apart getest |

## D. Rollen en welke artikelen ze zien

**Beheerportaal:**
- **Beheer:** alle gepubliceerde artikelen.
- **Administratie, Meldkamer, IT:** de artikelen voor hun rol.

**Partnerportaal:**
- **Partnerbeheerder:** medewerker met het partnerportaal.
- **Sales.**
- **Monteur.**
- Een gebruiker met meerdere rollen ziet de combinatie.
- Het portaal geeft **nooit** een artikel terug dat alleen interne rollen heeft.

**Stand van de kennisbank:** 79 artikelen.
- 64 zijn gepubliceerd (alleen intern).
- 15 artikelen voor partners staan **ter controle**. Partners zien die pas na jouw goedkeuring in Handleidingbeheer.

## E. Procescoach

| Wat de coach toont | Bron in de code |
|---|---|
| Huidige status en sinds wanneer | Fase en datum van de laatste fasewissel |
| Herkende route | Spoed, directe aanmelding, zonder offerte, offerte herzien, afwijking na installatie, controle teruggestuurd, pauze, opgezegd |
| Voortgang in 6 stappen | Zelfde logica als de voortgangsbalk |
| Wie aan zet is en wat er moet gebeuren | `VOLGENDE_ACTIE` |
| "Jij bent aan zet" of "X is aan zet; voor jou is er nu niets te doen" | Eigen acties en eigen rol |
| Wat jij kunt doen, met wat daarvoor ontbreekt | De knoppen uit het dossier en `ontbrekendVoor` |
| Waarom het dossier niet verder kan, en wie het oplost | Alleen feiten uit het systeem, zoals de eerste controle voor de installatie, de checklist, de finale controle, producttaken en onboarding |
| Werk dat tegelijk loopt | Partners zien geen interne details |
| Historie | Fasewissels; partners zien geen namen van medewerkers |
| Instructies bij deze stap | Gekoppelde artikelen |

**Getest met het voorbeeld uit de opdracht:**

| Dossier | Monteur | Sales |
|---|---|---|
| DETEC-0050 | Jij bent aan zet, 8 ontbrekende punten | De monteur is aan zet |
| DETEC-0090 | Sales is aan zet, geen knop om goed te keuren | Jij bent aan zet: afwijkingen beoordelen |

De coach voert niets uit. Gegevens die niet zijn vastgelegd worden niet als feit getoond. Twee gevallen zijn daarvoor tijdens het testen gecorrigeerd: een oude eerste controle en een lege finale controle.

## F. Rondleidingen

**Nog niet gebouwd.** De opdracht vraagt om stabiele `data-tour-id`-markeringen in de schermen en een veilige demonstratiemodus. Dat raakt veel bestaande schermen en is fase 5.

## G. AI-assistent

**Niet gebouwd en niet als werkend gepresenteerd.** Er is geen AI-koppeling ingesteld voor deze apps. Daarom is er nu een slimme zoekfunctie: rangschikking op titel, samenvatting, zoekwoorden en inhoud, met synoniemen en veelgestelde vragen.

Zite heeft wel AI-velden, die AI-credits van de organisatie kosten. Een echte vraag-en-antwoordassistent vraagt eerst een besluit over de leverancier en de kosten.

## H. Beveiliging: uitgevoerde tests

- Medewerkers van 4 andere partners openden de coach op DETEC-dossiers: **24 keer geweigerd, 0 lekken**.
- Het portaal geeft geen enkel artikel terug dat alleen interne rollen heeft.
- Een concept en een gearchiveerd artikel zijn onzichtbaar voor partners.
- Verwijzingen naar artikelen die je niet mag zien worden weggefilterd.
- Beheeracties zonder de rol Beheer worden geweigerd.
- **Zoektermen zonder persoonsgegevens:** e-mailadressen en reeksen van 4 of meer cijfers worden vervangen.
- **Gebruik en feedback:** alleen rol en app, geen namen of dossiers.
- **Regressie:** 20 vingerafdrukken van beheerendpoints zijn identiek vóór en na de bouw.
- Alle testrecords (ZZTEST) zijn verwijderd en gecontroleerd.

**Niet getest:**
- de interface in een echte browser (mobiel, tablet, desktop) en toegankelijkheid volgens WCAG. De interface volgt wel de bestaande componenten, het Sheet-paneel en de toetsenbordnavigatie;
- een sales-medewerker zonder portaal: die bestaat niet in de huidige data.

## I. Openstaande punten

| Prioriteit | Punt | Waarom open |
|---|---|---|
| 1 | Jouw akkoord om te **publiceren**, en de **15 partnerartikelen** controleren en publiceren | De opdracht zegt: geen productiepublicatie zonder toestemming |
| 1 | Browsertest van de interface op mobiel en desktop | Kan pas op een gepubliceerde of preview-versie met inlog |
| 2 | Fase 5: rondleidingen (`data-tour-id`, engine, demonstratiemodus) | Raakt veel schermen; moet gefaseerd |
| 2 | Fase 6: Learning Academy per rol, voortgang, kennistoetsen | Vraagt een extra tabel Leervoortgang en inhoud per module |
| 2 | Uitleg per scherm in het partnerportaal en per formulierveld | Staat niet in de code; moet geschreven en gecontroleerd worden |
| 3 | AI-assistent | Vraagt een besluit over leverancier en kosten |
| 3 | Documentatiecontrole uitbreiden naar velden en knoppen | Dan moeten schermen die metadata vastleggen (samen met `data-tour-id`) |
| 3 | Proactieve tips ("je gebruikt dit voor het eerst") | Na de rondleidingen, om meldingsmoeheid te voorkomen |

## J. Resultaat

**Voor gebruikers:**
- In elk dossier staat met één klik waar het staat, wie aan zet is, wat er ontbreekt en wat zij zelf kunnen doen.
- Op elk scherm is er hulp.
- Er is één doorzoekbare handleiding per rol.

**Voor beheerders:**
- Handleidingen bijwerken zonder code.
- Gecontroleerd publiceren, met versiehistorie.
- Automatische signalering als de code verandert.
- Feedback en zoekvragen zonder resultaat als verbeterbron.

---

## Update – fase 5 en 6 (12 november 2026)

**Status:** gepubliceerd na akkoord.

### F. Rondleidingen

| Onderdeel | Status |
|---|---|
| **Engine** (`help/Rondleiding.tsx`), zie hieronder | Gebouwd en in de browser getest |
| **Rondleidingen** (`help/leren.ts`), zie hieronder | Gebouwd |
| **Eenmalig aanbod** "Nieuw hier?" bij het eerste bezoek | Getest |

**De engine:**
- stabiele `data-tour`-ankers en vaste veld-id's;
- een uitsparing rond het onderdeel, de rest van het scherm gedimd;
- uitleg naast het onderdeel, of rechtsonder bij grote onderdelen;
- op mobiel staat de uitleg onderaan;
- Vorige, Volgende, Overslaan, Opnieuw starten en Afsluiten (ook met Esc en de pijltjestoetsen);
- de voortgang wordt bewaard;
- navigatie tussen schermen;
- netjes doorgaan als een onderdeel ontbreekt;
- de engine klikt nergens zelf op en bewaart niets, dus er worden geen gegevens gewijzigd.

**De vijf rondleidingen:**
- Kennismaking met het beheerportaal;
- Een dossier lezen en afhandelen (beheer);
- Kennismaking met het portaal;
- Een nieuwe aanvraag invullen;
- Een dossier lezen (portaal).

Opties als "Niet nu" en "Niet meer tonen" worden onthouden.

**Browsertest in het portaal**, op desktop en iPhone-formaat:
- de kennismaking, van begin tot eind;
- de aanvraagrondleiding: die navigeert zelf naar het formulier.

**Fout gevonden en opgelost:** bij grote onderdelen viel de uitlegkaart buiten beeld.

**Op mobiel** zitten de menuknoppen in het menu dat dicht staat. Die stappen worden daarom overgeslagen en de rondleiding gaat netjes verder.

**Niet in de browser getest:** de rondleidingen in het beheerportaal. Dat vraagt een Zite-login.

### Learning Academy

**Zeven leertrajecten:** Sales, Monteur, Partnerbeheer, Administratie, Meldkamer, IT en Beheer. Elk traject bestaat uit gepubliceerde handleidingen en rondleidingen.

**Voortgang** wordt per gebruiker bewaard in de tabel **Leervoortgang**:
- in het beheer per e-mailadres, in het portaal per medewerker;
- Devision die meekijkt legt niets vast.

**Kennischecks:** 56 vragen, afgeleid uit de procesdefinities. Ze vragen wie een stap uitvoert en welke stap erna volgt, en lopen dus automatisch gelijk met de code.

**Server getest:** markeren, dubbele invoer voorkomen, en een andere medewerker ziet de voortgang niet.

**Browser getest:** een voltooide rondleiding telt mee in de trajecten.

**Let op:** de partnertrajecten bevatten nu alleen rondleidingen. De handleidingen erin verschijnen zodra de 15 partnerartikelen in Handleidingbeheer zijn gepubliceerd.

### Statistiek

Handleidingbeheer toont nu ook:
- per rondleiding hoe vaak hij is voltooid en afgebroken;
- per leertraject het aantal gebruikers en afgeronde onderdelen.

### Nog open

1. **Partnerartikelen:** de 15 artikelen controleren en publiceren. Dat is jouw beslissing.
2. **AI-assistent:** vraagt een besluit over leverancier en kosten.
3. **Rondleidingen beheren zonder code:** ze staan nu in de code, net als de processtappen.
4. **Documentatiecontrole op formuliervelden en knoppen.**
5. **Rondleidingen in het beheerportaal** testen in de browser.
6. **Leervoortgang bij een adreswijziging:** gaat nog niet automatisch mee als het e-mailadres van een beheerder wijzigt.

---

## Update: drie aanvullingen (12 november 2026)

**Status:** gepubliceerd. Commit `b85f89c`.

### 1. Rondleidingen beheren zonder code

Nieuw tabblad **Handleidingbeheer → Rondleidingen**. Je kunt per rondleiding:
- teksten, volgorde, rollen, duur en aan/uit aanpassen;
- stappen toevoegen, verwijderen of verschuiven;
- een nieuwe rondleiding aanmaken;
- een concept bewaren, publiceren of terugzetten naar de standaard uit de code, met historie.

Een stap kan alleen wijzen naar een bekend ankerpunt in de applicatie. De server controleert dat ook.

De apps halen de gepubliceerde rondleidingen van de server, gefilterd op app en rol. Zolang er niets is gepubliceerd, geldt de standaard uit de code.

**Getest op de server:**
- het concept was niet zichtbaar; na publiceren stond het direct live;
- terugzetten naar de standaard werkte;
- een onbekend ankerpunt werd geweigerd;
- een monteur zag alleen portaalrondleidingen.

**Niet in de browser getest:** het bewerkscherm. Dat vraagt een Zite-login.

### 2. Documentatiecontrole op velden en knoppen

De controle vergelijkt nu ook deze onderdelen met de vorige momentopname:
- fase-knoppen in het dossier (`OVERGANGEN`);
- het menu van het beheerportaal;
- velden en stappen van het installatiedossier;
- de eerste controle, de finale controle en de meldkamerchecklist;
- de velden van het aanvraagformulier, met verplicht of optioneel.

Die laatste levert het partnerportaal zelf aan (instelling `HELP_BRON_PORTAAL`, bijgewerkt als iemand het Help Center opent). Dat zijn 56 velden.

Wijzigt er iets, dan krijgen de bijbehorende artikelen de status "Controle nodig", met de reden in de versiehistorie. Rondleidingen die naar een verdwenen onderdeel wijzen, worden gemeld.

**Getest:** een gesimuleerde verwijderde knop, gewijzigde taak en nieuw veld werden alle drie gevonden. Precies de 6 geraakte artikelen werden gemarkeerd; dat is na de test teruggezet.

**Beperking:** losse knoppen en velden op schermen die niet in deze lijsten staan, worden niet bewaakt. Denk aan knoppen op beheerpagina's en velden van partner- of medewerkerbeheer. Daarvoor moeten die schermen eerst een vaste lijst krijgen.

### 3. Leervoortgang bij een adreswijziging

De bestaande omzetting bij een gewijzigd e-mailadres (`zetEmailOm`) neemt nu ook de Leervoortgang mee.

**Getest:** de voortgang ging mee naar het nieuwe adres, zonder bijwerkingen elders.

### Regressie

De 20 vingerafdrukken van de beheerendpoints zijn identiek. Alle testgegevens zijn verwijderd.
