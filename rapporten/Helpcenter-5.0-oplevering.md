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

---

## Update: Help Center en procescoach afgemaakt, kwaliteit en zekerheid (12 november 2026)

**Status:** gepubliceerd. Commits `2d6d50f` en `bbb9ad7`.

| Onderdeel | Wat er is gebouwd | Getest |
|---|---|---|
| **Procescoach in meer schermen** | Wijzigingen en opzeggingen (beheer en portaal), werkbak Eerste controle. De finale controle en de meldkamer openen het dossier al, en hadden de coach dus al | Wijzigingscoach op de bestaande opzegging; 4 van 4 keer geweigerd voor andere partners |
| **Uitleg per portaalscherm** | 11 concept-artikelen (Taken, Dashboard, Aansluitingen, Klanten, Planning, Facturen, Documenten, Producten, Team, Nieuwe aanvraag, Wijziging), ter controle | Inhoud gebaseerd op de schermen zelf |
| **Veldtips** | Onderdeel `VeldTip` bij Bellen, Technisch, Codewoord en Sleutelhouder. Een tip verschijnt alleen met een gepubliceerd artikel `tip:<veld>`. Concepten voor Bellen en Codewoord. Sleutelhouder en Technisch staan niet in de code beschreven: die tekst vul je zelf in | Typecheck in orde |
| **Schermafbeeldingen** | 6 echte screenshots bij 7 handleidingen (dashboard, Taken, nieuwe aanvraag, wijziging, procescoach, installatiedossier op de telefoon). Klantnamen, adressen, postcodes, telefoonnummers, e-mailadressen, partnerlogo, referenties en bedragen zijn onleesbaar gemaakt | Tijdens het maken werd elk opslag- en indienverzoek geblokkeerd; geen dossier gewijzigd |
| **Nachtelijke regressietest** | Portaal om 02:43: partnerscheiding, procescoach, wijzigingscoach en Help Center, hooguit 1 keer per 20 uur. Beheer om 03:13: 20 kernfuncties, coach per dossier, afscherming van het Help Center, documentatiecontrole en de uitslag van de portaaltest. Een afwijking komt in de dagelijkse foutmelding; kaart in Automatiseringen | Eerste echte run: portaal 68 controles zonder lek; beheer 5 van 5 groen |
| **Testlijst beheerportaal** | `rapporten/Testlijst-beheerportaal.md` en in het Help Center (rol Beheer): 14 stappen, ongeveer 10 minuten | n.v.t. |
| **Toegankelijkheid** | Paginataal `nl`; tekst in de huisstijlkleur krijgt automatisch een leesbare tint (minstens 4,5:1) | Eigen controle op 6 schermen: geen knoppen of velden zonder naam, geen afbeeldingen zonder alt-tekst, zichtbare focus bij het tabben |

**Open beslissing toegankelijkheid:** witte tekst op lichte partnerkleuren (bij DETEC 2,26:1) en witte tekst op DEVISION-groen (3,0:1) halen niet de vereiste 4,5:1. Dit raakt de huisstijl zelf. Er zijn twee mogelijkheden:
- donkere tekst op lichte knoppen;
- een iets donkerdere knopkleur.

**Niet automatisch:** de browsertest van het portaal draait niet 's nachts, omdat Zite geen browser heeft. Die doe ik bij grotere wijzigingen.

---

## Update: Eventlog uit Evalink (12 november 2026)

**Status:** gebouwd en gepubliceerd, maar **nog niet gekoppeld**. De aanroep naar Evalink volgt zodra de API-gegevens er zijn. Zite-commit `d5ee68d`.

**Wat er is:**
- Een kaart **Eventlog** in het dossier, in het beheer (Nieuwe aansluitingen) en in het partnerportaal, vanaf de fase "Aanmelding meldkamer".
- Niets wordt vooraf geladen. Je klikt op **Ophalen**. De standaardperiode is 24 uur; je kunt ook 3, 7 of 30 dagen kiezen.
- Live opgehaald en nergens bewaard. De kolom "Door" (wie een melding afhandelde) zie je alleen in het beheer.
- Zolang de koppeling er niet is, staat er eerlijk "nog niet gekoppeld aan Evalink". Er worden geen voorbeeld-events getoond.
- Een dossier zonder Site ID krijgt de melding dat er nog geen site is.

**Afscherming:**
- In het beheer mogen alleen de rollen Beheer, Meldkamer en Administratie de eventlog opvragen.
- In het portaal zie je alleen de eventlog van aansluitingen van je eigen partner. Dit wordt gecontroleerd met dezelfde toegangscontrole als bij het openen van het dossier.
- De nachtelijke portaaltest controleert dit elke nacht.

**Getest:**
- Beheer, 6 DETEC-dossiers: 3 keer "niet gekoppeld" (site aanwezig) en 3 keer "geen site". De standaard is 24 uur; een ongeldige periode wordt geweigerd.
- Portaal: eigen partner krijgt een status. Medewerkers van andere partners werden 8 van 8 keer geweigerd.

**Nodig om te koppelen (aan te leveren door Rodney):**
1. De API-beschrijving van Evalink: welk endpoint geeft de eventhistorie van een site, met welke velden.
2. Het Company ID.
3. Bevestiging dat ons Site ID gelijk is aan de site in Evalink. Of anders: welk ID we wel moeten gebruiken.
4. De API-sleutel. Die zet je zelf in Zite als omgevingsvariabele (`ZITE_EVALINK_API_URL`, `ZITE_EVALINK_COMPANY_ID`, `ZITE_EVALINK_API_TOKEN`). Niet via de chat.

Daarna is het één functie (`haalUitEvalink` in `packages/components/server/eventlog.ts`) en één schakelaar (`EVALINK_AANROEP_GEBOUWD`).

---

## Update: tools voor monteur, sales en eigenaar (12 november 2026)

**Status:** gebouwd en gepubliceerd. Zite-commit `9e8b35f`. De onderdelen 1, 2 en 7 halen hun gegevens uit Evalink en tonen tot die koppeling er is eerlijk "nog niet gekoppeld". Onderdeel 8 werkt nu al met de eigen gegevens.

| # | Onderdeel | Waar | Wat het doet | Getest |
|---|---|---|---|---|
| 1 | **Doormeldtest** | Installatiedossier, stap 6 (monteur) | Test starten, zones laten melden, Controleren: zones die bij de meldkamer binnenkwamen worden afgevinkt bij de looptest. Elke controle komt in de historie (bewijs van de oplevering). Zonder koppeling vinkt de monteur de looptest zelf af, zoals nu | 0050 en 0076: "geen site"; buiten de installatiefase en voor andere partners geweigerd |
| 2 | **Testmodus meldkamer** | Dossier (portaal: monteur; beheer: Beheer, Meldkamer en Administratie) | Aansluiting 1, 2, 4 of 8 uur in test zetten, of eruit halen, met een bevestigingsvraag. In het beheer is bij aanzetten een toelichting verplicht (met wie en waarom afgestemd, bijvoorbeeld telefonisch met de monteur). Aan, uit en de toelichting komen in de historie | 0016: "niet gekoppeld"; sales, meekijken en andere partners geweigerd; ongeldige duur geweigerd |
| 7 | **Maandrapport** | Klanten → klant met een actieve aansluiting (partnerportaal en sales) | PDF per maand (laatste 12 maanden): per adres en aansluiting het aantal meldingen per soort. Geen namen van meldkamermedewerkers | DETEC-klant: "niet gekoppeld"; dezelfde klant via een andere partner: "Klant niet gevonden"; toekomstige maand geweigerd |
| 8 | **Wat komt terug, en per monteur** | Partnerportaal → dashboard, onder "Hoe loopt het proces?" (laadt pas bij openklikken) | Terugsturen door de administratie (naar sales of monteur, met toelichting en link naar het dossier) en per monteur: opgeleverd, in één keer goed, teruggestuurd, loopt nu | DETEC: 2 monteurs (3 en 1 opgeleverd, gelijk aan de 4 technisch gerede dossiers); geen dossiers van andere partners |

De doorlooptijd, offertes met akkoord en "in één keer goed" stonden al op het dashboard ("Hoe loopt het proces?"); onderdeel 8 vult dat aan.

**Nachtelijke test:** de portaaltest controleert nu ook of testmodus en doormeldtest voor andere partners geweigerd worden.

**Nodig van Evalink (naast wat de eventlog al nodig heeft):**
- Of de API een site tijdelijk in test kan zetten en de stand kan teruggeven. Dan worden `zetTestmodusInEvalink` en `testmodusUitEvalink` ingevuld en gaat `EVALINK_TESTMODUS_GEBOUWD` aan.
- In welk formaat Evalink het zonenummer in een event geeft. De doormeldtest vergelijkt nu het nummer uit het installatiedossier, waarbij voorloopnullen niet meetellen ("007" = "7").
- Welke soorten events Evalink gebruikt. Het maandrapport telt per soort zoals Evalink die geeft.

---

## Update: gebruiksgemak voor monteur, sales en administratie (12 november 2026)

**Status:** gebouwd en gepubliceerd. Zite-commits `359e9ad` en de tekstcorrectie daarna.

| Onderdeel | Waar | Wat het doet | Getest |
|---|---|---|---|
| **Portaal als app** | Mijn profiel | Op het beginscherm zetten; de app opent schermvullend met de persoonlijke link. Android: knop; iPhone: uitleg via Delen. Waarschuwing: alleen op je eigen telefoon | Browser: manifest, iconen en uitleg aanwezig, geen fouten |
| **Foto maken en verkleinen** | Bijlagen (installatiedossier en aanvraag) | Knop "Foto maken" opent de camera. Foto's boven 0,6 MB gaan verkleind mee (langste zijde 2000 px, JPEG): ca. 0,3 tot 0,8 MB in plaats van 4 tot 8 MB | Typecheck; niet op een echte telefoon getest |
| **Vandaag** | Werklijst van de monteur | Eigen installaties van vandaag en morgen, met Navigeren en Bel contactpersoon | Alleen eigen dossiers; afgeronde dossiers vallen weg. Er was geen lopende installatie voor vandaag of morgen om het positieve geval te tonen |
| **Dossier zonder bereik** | Installatiedossier | Zonder verbinding blijft de invoer op het toestel en gaat mee zodra er bereik is. Bij heropenen: Terugzetten of Weggooien. **Codewoorden worden nooit op het toestel bewaard** | Typecheck; niet met echt verbindingsverlies getest |
| **Meerdere adressen** | Klanten → klant | Per bekend adres zonder aansluiting of nieuw adres (postcode + huisnummer, met filiaalnummer bij een keten) een concept met dezelfde klant-, factuurgegevens en diensten. Niets wordt ingediend | Browser: concept aangemaakt en daarna verwijderd |
| **Klantherinnering** | Automatisering (elk uur), instelling per partner onder Herinneringen | De klant krijgt na 5 en 10 dagen een herinnering met dezelfde akkoordlink, zonder prijzen. Alleen als sales de offerte via het portaal mailde, de offerte nog openstaat en geldig is. Standaard aan | Er staan nu geen verzonden offertes open, dus er is niets verstuurd; het versturen zelf is niet getest |
| **Eerste controle** | Werkbak Eerste controle | Aansluitnummer vinkt zich af zodra het is ingevuld. Klantgegevens: automatische controles (naam, KVK, adres, contactpersoon, diensten); als alles klopt staat het vinkje alvast aan (uit te zetten). Na afronden opent het volgende open dossier | DETEC-2026-0090: alle 5 controles groen |
| **Meldingen** | Bel-icoon naast de paginatitel | Gebeurtenissen van de laatste 14 dagen op dossiers waar je sales of monteur bent, door anderen. Alleen de korte actie, geen details of bedragen. "Gezien" per toestel | 8 medewerkers: alleen eigen dossiers, geen bedragen; browser: lijst opent |

**Niet gedaan:** "opslaan en volgende" in de finale controle; die zit in het dossier zelf en heeft geen lijst om naar door te gaan.

---

## Update: handleidingen, procesbeschrijving en rondleiding bijgewerkt (12 november 2026)

**Procesbeschrijving (Procesbeheer, versie 1.1):** de stappen Klantgegevens, Verzonden en opvolging, Eerste controle, Werkvoorbereiding en planning, Installatie en oplevering en Activering beschrijven nu de nieuwe functies. Wat nog op Evalink wacht, staat er als "zodra Evalink is gekoppeld". De uitleg per stap is aangevuld.

**Handleidingen die uit het processchema volgen:** de documentatiecontrole vond 6 gewijzigde stappen en heeft ze opnieuw opgebouwd. De 4 die partners zien staan ter controle; de 2 interne (Eerste controle, Activering) zijn gepubliceerd.

**Nieuwe handleidingen:**

| Handleiding | Voor | Status |
|---|---|---|
| Het portaal als app op je telefoon | Portaal (alle rollen) | Ter controle |
| Op locatie: Vandaag, foto's en werken zonder bereik | Monteur | Ter controle |
| Doormeldtest en testmodus | Monteur | Ter controle |
| Eventlog van een aansluiting | Portaal en intern | Ter controle |
| Maandrapport voor je klant | Sales, partnerbeheerder | Ter controle |
| Aanvragen voor meerdere adressen of filialen | Sales, partnerbeheerder | Ter controle |
| Meldingen (bel-icoon) | Portaal (alle rollen) | Ter controle |
| Wat komt terug, en per monteur | Partnerbeheerder | Ter controle |
| Eventlog en testmodus in het beheer | Beheer, Administratie, Meldkamer | Gepubliceerd (graag nakijken) |
| Eerste controle: automatische controles en volgende dossier | Administratie | Gepubliceerd (graag nakijken) |
| Herinnering aan de klant bij een openstaande offerte | Beheer | Gepubliceerd (graag nakijken) |

**Bijgewerkt:** de schermhandleidingen Klanten, Dashboard en Taken (ter controle) en de Testlijst na een update (4 nieuwe stappen, ook in `rapporten/Testlijst-beheerportaal.md`).

**Rondleiding en Academy:** de rondleiding "Kennismaking met het portaal" heeft een stap Meldingen. De nieuwe handleidingen staan als modules in de Sales-, Monteur-, Partnerbeheer-, Administratie- en Meldkamer-Academy. Een module verschijnt pas als de handleiding is gepubliceerd.

**Documentatiecontrole:** na deze update geen verschillen meer.

**Stand in het Help Center:** 36 handleidingen ter controle en 68 gepubliceerd (geteld in de database).

---

## Update: testomgeving voor collega's (13 november 2026)

**Status:** gebouwd en gepubliceerd. Zite-commit `6adc9f2`. Er staan nu geen testers of testgegevens in; Rodney maakt de testers zelf aan.

**Hoe het werkt:**
- Beheer → Werk → **Testen**. Beheer voegt een tester toe met naam en e-mailadres. Per tester worden drie accounts gemaakt in de testpartner "ZZTEST Beveiliging": Sales, Monteur en Partnerbeheerder. "Links mailen" stuurt de tester zijn drie persoonlijke links.
- De tester opent vanuit Testen elke rol in een **vast eigen tabblad**, zonder inloggen of wisselen. Bovenaan staat een gekleurde balk: blauw voor Sales, oranje voor Monteur, paars voor Partnerbeheerder. De rol staat ook in de tabtitel, bijvoorbeeld "[Monteur] Aanvragen".
- **Testdossiers:** per dossier wie aan zet is, met knoppen om het dossier direct in de juiste rol te openen of "In beheer" voor de stappen van Devision.
- **Mails:** in de mailtestmodus gaan mails aan een tester naar de tester zelf. Tip voor testers: gebruik je eigen e-mailadres als e-mail van de klant.
- **Na de test:** "Testomgeving verwijderen" toont eerst wat er weggaat. Na het intypen van VERWIJDER gaat alles weg: testpartner, accounts, dossiers en alles wat eraan hangt.

**Veiligheid:**
- De testpartner ziet geen echte dossiers en echte partners zien geen testdossiers (getest in beide richtingen).
- Voor de testpartner worden **nooit factuurregels** gemaakt, dus er gaat niets naar een factuurrun of Exact.
- De testpartner telt niet mee in de gemiddelden van partners.
- Verwijderen raakt alleen de partner met code ZZTEST die in de testomgeving is vastgelegd.

**Getest:**
- Met een tijdelijke tester: testpartner met 105 diensten, drie accounts met de juiste rol en de juiste toegang tot het portaal, testdossier met "aan zet: eerste controle", en een rolbalk en tabtitel per rol (browser).
- Daarna de testomgeving verwijderd via de nieuwe functie. Partner, accounts, dossier, assortiment, historie en instelling waren weg, het DETEC-dossier was ongemoeid. Zonder het woord VERWIJDER weigert de functie.

**Update 14 november:** de tester krijgt automatisch de rol Administratie in het beheer (alleen als hij nog geen toegang had). Bij uitzetten of verwijderen wordt dat precies teruggedraaid. De rol Meldkamer is niet nodig, want Administratie mag alle stappen van Devision. "Links mailen" stuurt nu een volledige instructiemail met testscenario; met "Voorbeeld van de mail naar mij" zie je hem eerst zelf.

**Nog te doen door Rodney:** de 4 testers toevoegen. Voor het beheerportaal moeten ze lid zijn van de Zite-organisatie. De handleiding "Het portaal testen met collega's" staat in het Help Center (intern, gepubliceerd).

---

## Update: Eigenaar/directie en klanten voor de monteur (14 november 2026)

- **"Partnerbeheerder" heet voortaan "Eigenaar/directie".** Dat is de medewerker van het installatiebedrijf met de schakelaar Partnerportaal (dashboard, planning, facturen, producten, team). De naam is aangepast in Team en Medewerkers (label en schakelaar), in Handleidingbeheer, Documentbeheer en Rondleidingen, in de Academy ("Academy eigenaar/directie"), in de testomgeving en de instructiemail, en in 4 handleidingen. De interne sleutel blijft, zodat bestaande handleidingen en documentrechten werken.
- **Monteurs zien Klanten:** alleen inzien, met adressen, dossiers en contactgegevens, ook in de navigatie onderaan. Het maandrapport en "Aanvragen voor meerdere adressen" blijven voor sales en eigenaar/directie.
- **Getest:** met een tijdelijke ZZTEST-monteur zonder Partnerportaal bij DETEC. Hij zag 6 klanten, het maandrapport werd geweigerd, en daarna is hij verwijderd. De handleiding Klanten staat nu ook voor de monteur en is aangevuld (ter controle).

---

## Update: Site voorbereiden via Evalink (14 november 2026)

**Status:** gebouwd en gepubliceerd, maar **nog niet gekoppeld**. De aanroep naar Evalink volgt zodra de API-gegevens er zijn.

- **Instellingen → Receivers:** per paneelprofiel de schakelaar "Automatisch via Evalink".
- **Site voorbereiden** (bij paneelprofielen waar dat aanstaat, zolang er nog geen Site ID is): de knop **"Site aanmaken in Evalink"**. Die maakt de site inactief aan, vult Site ID, receiver-account en IP-adres met poort in, vinkt "Site aangemaakt" en "Receiver ingesteld" af, en legt het vast in de historie. Daarna kunnen de paneelgegevens zoals altijd naar de monteur.
- **Receivers zonder koppeling:** zoals nu, handmatig.
- **Getest:** een dossier met een bestaand Site ID wordt geweigerd (geen tweede site), zonder de instelling wordt het geweigerd, en met de instelling volgt "nog niet gekoppeld" zonder wijzigingen. De tijdelijke instelling is weer verwijderd.

**Nodig van Evalink:** welke receivers dit ondersteunen, het endpoint om een site (inactief) met receiverinstelling aan te maken, welke gegevens Evalink nodig heeft (klant, adres, aansluitnummer, paneeltype, transmissiepad?), en wat terugkomt (Site ID, intern ID, receiver-account, IP en poort). Daarna wordt `maakSiteInEvalink` ingevuld en `EVALINK_SITE_GEBOUWD` aangezet.
