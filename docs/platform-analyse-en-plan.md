# Aanvragen- en aansluitplatform DEVISION — analyse, architectuur en status

Dit document hoort bij de Zite-werkruimte **Security Technology Registration** (apps *Aanmelding 3B* = formulier/werkomgeving voor installatiebedrijven en *Aanmeldingen beheer* = intern beheerportaal). De broncode staat in die Zite-werkruimte; dit document beschrijft de analyse, de gekozen architectuur, de migraties en de stand van zaken.

---

## 1. Analyse van de bestaande applicatie (fase 1)

### Wat er al was en werkte
| Onderdeel | Waar | Beoordeling |
|---|---|---|
| Aanmeldformulier per installatiebedrijf (eigen link, huisstijl, assortiment) | app *Aanmelding 3B* | Behouden, uitgebreid |
| Klantregistratie: KvK-zoekfunctie (KVKBase), PDOK-adrescontrole, postcode per land, IBAN-controle | formulier, `server/kvk.ts`, `api/zoekAdres.ts`, `lib/form.ts` | Hergebruikt in alle nieuwe flows |
| Centrale tarievenlijst + assortiment/afwijkende prijzen per partner, indexatie | tabel *Diensten*, *Partnertarieven* | Hergebruikt als centrale artikellijst voor offertes en wizards |
| Prijsberekening (jaar/maand/eenmalig/gebruik) | `lib/tarief.ts` | Hergebruikt, uitgebreid met korting per regel |
| PDF + e-mail naar meldkamer | `server/aanmeldingPdf.ts` | Hergebruikt, uitgebreid met offertevariant |
| Medewerkers, vestigingen, opvolgbedrijven, afrekening (provisie/inkoop) | beheer | Behouden; medewerkers kregen rol en persoonlijke link |
| Statusbeheer (Nieuw → In behandeling → Aangesloten / Opgezegd / Geannuleerd) | tabel *Aanmeldingen*.Status | Behouden en gekoppeld aan de nieuwe fase |
| Wijzigingen/opzeggingen, logboek, dashboard | beheer | Behouden |

### Wat ontbrak
- Geen offertes, offerteversies of klantacceptatie: het formulier was een directe aanmelding bij de meldkamer.
- Geen identiteit per medewerker (alleen een gedeelde link per installatiebedrijf), dus geen rollen of rechten.
- Geen klant- of locatie-entiteit: klantgegevens stonden alleen op de aanmelding.
- Geen workflow tussen sales, monteur en meldkamer, geen herinneringen, geen wizards.

### Geraakte processen
De bestaande aanmelding (partnerlink → meldkamer) mocht niet breken. Die loopt nu als één van de routes door dezelfde centrale aanvraag.

---

## 2. Architectuur (fase 2)

**Uitgangspunt: één centrale aanvraag = de bestaande tabel *Aanmeldingen*.** Er is geen nieuwe applicatie en geen dubbele aanvraagtabel. Het aanvraagnummer is het bestaande referentienummer (`CODE-JAAR-NNNN`).

| Begrip | Opslag |
|---|---|
| Klant | nieuwe tabel *Klanten* (per installatiebedrijf; dedup op KvK, anders op naam) |
| Installatielocatie | nieuwe tabel *Locaties* (per klant; dedup op postcode + adres) |
| Aanvraag | bestaande tabel *Aanmeldingen* + velden Fase, Vorige fase, Bron, Salesmedewerker, Monteur, Klant, Locatie, Installatiedatum, Technische gegevens, Technisch gereed op, Meldkamergegevens, Gewijzigd op, Idempotentiesleutel |
| Offerte (versies) | nieuwe tabel *Offertes*: momentopname van regels, prijzen, kortingen, eenmalig/periodiek, wizarduitkomsten; status Concept/Verzonden/Geaccepteerd/Afgewezen/Vervangen |
| Installatie | technische velden op de aanvraag (fases Installatie in voorbereiding … Technisch gereed) |
| Actieve aansluiting | aanvraag in fase *Aansluiting actief* (bestaande status *Aangesloten* blijft gevuld) |
| Diensten van de aanvraag | bestaande tabel *Aanmeldregels* (+ kortingspercentage) |
| Herinneringen | nieuwe tabel *Herinneringen* (uniek per offerte + volgnummer) |
| Wizardregels | nieuwe tabel *Wizardregels* (versie, status, geldig vanaf, bron, definitie) |
| Instellingen | *Partners*.Instellingen (afwijkingen) + *Instellingen*.STANDAARD_PARTNERINSTELLINGEN (algemene standaard) |
| Activiteiten/historie | bestaande tabel *Logboek* |

**Gedeelde code** (`packages/components`), zodat formulier en beheer dezelfde regels gebruiken:
- `lib/workflow.ts`: fases, uitzonderingen, overgangen met rollen, eerstvolgende actie, instellingen met standaardwaarden en samenvoegen.
- `server/aanvraag.ts`: `wisselFase()` met rechten, eisen en automatische acties; offerteversies; herinneringen plannen, stoppen en verwerken; klant/locatie; meldkameraanmelding.
- `server/detail.ts`: detail- en overzichtsweergave van een aanvraag.
- `lib/wizard.ts`: generieke wizard-engine en validatie van regelsets.
- `lib/tarief.ts`, `server/aanmeldingPdf.ts`: verplaatst uit het formulier; de oude paden werken via re-exports.

Er is **bewust geen aparte workflow-engine** gebouwd. Het is een data-gedreven overgangstabel, per installatiebedrijf overschrijfbaar via de instellingen (rechten per fase). Dat is de basis waarop later een engine kan aansluiten.

### Rollen en toegang
- **Beheer (Devision)**: interne Zite-app, alleen voor organisatieleden; mag alle overgangen.
- **Persoonlijke link per medewerker** (`?sleutel=<code medewerker>`): rol *Sales*, *Monteur* of *Sales en monteur*. Iedere endpoint leidt installatiebedrijf en rol op de server af uit de link en filtert op het installatiebedrijf.
- **Algemene link van het installatiebedrijf**: het bestaande aanmeldformulier, ongewijzigd. Geeft geen toegang tot de werkomgeving.

### Workflow
Nieuwe aanvraag → Klantgegevens in behandeling → Producten en diensten geselecteerd → Offerte opgesteld → Offerte verzonden ⇄ Offerte aanpassen → Akkoord klant → Installatie in voorbereiding → Installatie in uitvoering → Technisch gereed → Aanmelding meldkamer → Wachten op bevestiging meldkamer → Aansluiting actief → Afgerond.

Uitzonderingen: Afgewezen, Geannuleerd, Onvolledig, Wacht op aanvullende gegevens (hervatten keert terug naar de vorige fase), Opgezegd.

Automatische acties:
- **Offerte verzonden**: herinneringen plannen.
- **Offerte aanpassen, Akkoord klant, Afgewezen, Geannuleerd**: herinneringen stoppen.
- **Akkoord klant**: offerte op Geaccepteerd, andere versies op Vervangen, dienstenlijst uit de offerte, monteurs mailen (instelbaar).
- **Aanmelding meldkamer**: PDF en mail naar de meldkamer, zoals voorheen.
- **Aansluiting actief en Opgezegd**: datum zetten, optioneel mail.

Elke overgang wordt vastgelegd met wie, wanneer en eventuele notitie.

### Migratie (uitgevoerd, herhaalbaar, niets verwijderd)
- De 13 bestaande aanmeldingen kregen een fase op basis van hun status (Nieuw → Aanmelding meldkamer), bron *Partnerformulier*, plus een klant (12 nieuw) en een locatie (9 nieuw).
- Medewerkers kregen rol *Sales en monteur* en een persoonlijke code.
- 9 diensten kregen hun artikelcode uit de naam (bijv. `CS.51.SR2`).

---

## 3. Gebouwd (fase 3)

1. **Centrale aanvraag en overzicht Nieuwe aansluitingen** (beheer, vervangt het tabblad Aanmeldingen):
   - zoeken, sorteren en filteren op installatiebedrijf, statusgroep, sales, monteur en periode;
   - export van het overzicht én van alle velden;
   - detailpagina met workflow-indicator, acties en tabbladen (klant, diensten, offertes en herinneringen, installatie, meldkamer, documenten, activiteiten).
2. **Centrale workflow**:
   - rechten per rol, ook op de server gecontroleerd;
   - verplichte gegevens per stap;
   - automatische acties en logboek.
3. **Offertes met versiebeheer**:
   - *Offerte aanpassen* opent het bestaande formulier met alles ingevuld;
   - een nieuwe versie overschrijft nooit een verzonden of geaccepteerde versie;
   - prijzen worden altijd op de server uit de centrale tarievenlijst gehaald;
   - korting per regel, boven het maximum alleen door Devision;
   - offerte-PDF.
4. **Overdracht naar monteur**:
   - na akkoord ziet de monteur de opdracht met alle gegevens;
   - hij vult alleen technische gegevens aan, met tussentijds opslaan;
   - commerciële gegevens zijn voor hem niet wijzigbaar.
5. **Monteur meldt zelfstandig aan** via *Nieuwe aanvraag* (bestaand formulier met KvK, postcode en de controle op bestaande klant, adres en lopende aanvraag).
   - Als het installatiebedrijf dat toestaat, gaat de aanvraag direct naar de meldkamer.
   - Anders gaat de aanvraag naar sales voor een offerte.
6. **Monteursformulier per installatiebedrijf**:
   - velden verplicht, optioneel of verborgen;
   - eigen technische vragen;
   - huisstijl en assortiment uit de bestaande partnerinstellingen.
7. **Wizardarchitectuur**:
   - Meldkamerdiensten: bestaande selectie.
   - WePrevent en VRKI: generieke engine met beslisregels per versie, die alleen naar de centrale artikellijst verwijst.
8. **Offerteherinneringen**: elk uur verwerkt en per installatiebedrijf instelbaar (aan/uit, eerste na x dagen, tussenpoos, maximum, e-mail en/of melding in de werkomgeving, escalatie). Ze stoppen automatisch, worden nooit dubbel verstuurd, en mislukte herinneringen zijn zichtbaar en opnieuw uit te voeren.
9. **Instellingen**: algemene standaard plus afwijkingen per installatiebedrijf (alleen de afwijkingen worden opgeslagen); medewerkers met rol en persoonlijke link; overzicht Automatiseringen.

### Nog niet operationeel (structuur staat klaar; geen inhoud verzonnen)
- **Monteursformulier volgens mock-up**: de indeling en vormgeving volgen zodra de mock-up er is. Nu gebruikt het formulier de bestaande velden plus de instelbare vragen.
- **WePrevent-wizard**: vragen, producten en beslisregels ontbreken nog. Invoeren gaat via Beheer → Instellingen → Wizards. Activeren kan pas met een geldige regelset en een bronvermelding.
- **VRKI-risicoklasse-wizard**: beslisregels uit de officiële VRKI-documentatie nog in te voeren, met versie, ingangsdatum en bron.

---

## 4. Getest (fase 4)

Live tests op het publieke formulier, met een tijdelijk test-installatiebedrijf (na afloop opgeruimd):
- de bestaande formulieren van 3B, TKS en Detec: laden en stap 1 → 2;
- **salesflow**:
  - aanvraag met offerte, korting en toelichting;
  - offerte verzonden: herinneringen gepland;
  - offerte aanpassen: alles vooraf ingevuld; versie 2, versie 1 blijft bewaard;
  - akkoord: versie 2 geaccepteerd, versie 1 vervangen, herinneringen gestopt, diensten overgenomen;
- **monteurflow** op smartphonebreedte:
  - opdracht zichtbaar met de ontbrekende verplichte velden;
  - tussentijds opslaan;
  - inplannen → gestart → technisch gereed;
- **rechten en gegevensscheiding**, direct op de API:
  - een monteur kan geen meldkamerstappen zetten en geen offertes maken;
  - sales kan geen technische gegevens opslaan;
  - de algemene link geeft geen toegang tot de werkomgeving;
  - een medewerker van een ander installatiebedrijf krijgt "niet gevonden";
- **betrouwbaarheid**:
  - een dubbele verzending met dezelfde sleutel maakt geen tweede aanvraag;
  - te hoge korting wordt geweigerd zonder halve aanvraag;
- **offerte-PDF**: gecontroleerd op opmaak.

Bewust niet in productie getest, omdat er dan echte mails uitgaan:
- het versturen naar de meldkamer (zelfde bestaande code als voorheen);
- e-mailherinneringen naar echte adressen.

Het beheerportaal is intern (login vereist) en is getypecheckt, maar niet in de browser doorgeklikt.

---

## Uitbreiding: geïntegreerde sales- en monteursworkflow (oktober 2026)

### Uitgangspunt
Eén aansluitdossier (tabel **Aanmeldingen**) met twee instaproutes en drie gescheiden gegevenslagen:

| Laag | Waar opgeslagen | Leidend |
|---|---|---|
| 1. Commercieel (verkocht) | `Aanmeldingen.Commerciele Afspraak` (vastgelegd bij *Akkoord klant* of bij directe aanmelding) + geaccepteerde offerteversie (`Offertes`) | Sales |
| 2. Technisch (geïnstalleerd) | `Aanmeldingen.Technische Gegevens` (installatiedossier, versie 2) + `Waarschuwingsadressen` (contactpersonen) | Monteur |
| 3. Operationeel (actief) | Nieuwe tabellen `Meldkameraansluitingen` en `Aansluitdiensten` | Meldkamer (later: koppeling) |

### Monteursproces (op basis van het prototype "Devision installateursportaal")
Acht stappen, tussentijds opgeslagen en te hervatten: Opdracht · Klantgegevens · Commerciële afspraken · Technische installatie (paneelprofiel, transmissiepad, zones, vragen per installatiebedrijf, bijlagen) · Meldkamergegevens (contactpersonen met bellen/sms/technisch/sleutelhouder/codewoord, openingstijden en inschakelregels, surveillance, codepas) · Installatiecontrole en testen (installatiedatum, verbinding, looptest per zone) · Afwijkingen · Oplevering.

- **Route A**: goedgekeurde salesopdracht; gegevens vooraf ingevuld met herkomstlabels (Overgenomen / Gecontroleerd / Gewijzigd / Nieuw).
- **Route B**: *Nieuwe aansluiting aanmaken* door de monteur (bestaand formulier met KvK, postcode, bestaande-klantcontrole, dienstselectie) met vastgelegd klantakkoord; herkomst *Directe aanmelding monteur*. Is de offertefase verplicht voor het installatiebedrijf, dan gaat de aanvraag eerst naar sales en kan de monteur de installatie al vastleggen.
- **Oplevering**: volledige controle op de server; zonder commerciële afwijkingen → *Technisch gereed* → *Aanmelding meldkamer* (operationeel: *Gereed voor activering*). Met afwijkingen (ander transmissiepad, niet geïnstalleerde of aanvullende diensten, overige met commerciële gevolgen) → nieuwe fase *Wacht op commerciële beoordeling*. Sales keurt goed (aanvullingen verwerkt in de afspraak, offerte blijft ongewijzigd) of stuurt terug.
- **Actief** alleen via *Aansluiting actief* door beheer (bevoegde gebruiker); operationele status verder: activering mislukt, inactief, weer actief, afgesloten.
- **Wijzigingshistorie**: oud → nieuw in het logboek bij stapwissel/opslaan.
- **Codewoorden**: op verzoek gewoon zichtbaar opgeslagen (veld *Codewoord* bij Waarschuwingsadressen), zichtbaar voor monteur en beheer; niet opgenomen in e-mails of PDF.
- **Surveillance** die afwijkt van de verkochte opvolging (wel/geen of ander bedrijf) is een commerciële afwijking: reden verplicht, sales beoordeelt, bij goedkeuring vastgelegd als aanvulling op de afspraak.

### Overzichten
- Werkomgeving sales: Open, Offertes, Goedgekeurd, In uitvoering, Beoordeling nodig, Technisch afgerond, Actief, Afgesloten.
- Werkomgeving monteur: Beschikbaar, Mijn installaties, Concepten, Ontbrekende gegevens, Opgeleverd + knop *Nieuwe aansluiting aanmaken*.
- Beheer *Nieuwe aansluitingen*: extra filters Afwijkingen ter beoordeling, Gereed voor activering, Activering mislukt, Nog niet actief, Operationeel actief.
- Beheer *Aansluitbeheer* (nieuw): operationele aansluitingen, kerncijfers, maandrapportage (nieuw/geactiveerd/inactief/afgesloten) en CSV.
- Vergelijking *Verkocht · Geïnstalleerd · Actief* in werkomgeving en beheer.

### Evalink en facturatie: voorbereid, niet gekoppeld
- Er is in de applicatie **geen bestaande Evalink-koppeling** gevonden. Velden *Extern Systeem*, *Extern Id*, *Sync Status*, *Sync Fout*, *Laatste Sync* zijn aanwezig; referenties worden handmatig vastgelegd met controle op dubbele objecten. Automatische synchronisatie volgt pas met API-specificaties en toegangsgegevens.
- `Aansluitdiensten` registreert actieve diensten met *Actief vanaf/tot* en *Factureerbaar vanaf* (bewust leeg tot facturatieregels zijn vastgesteld).

### Migratie
- Velden toegevoegd (Aanmeldingen: Commerciele Afspraak; fase *Wacht op commerciële beoordeling*; bron *Directe aanmelding monteur*; Waarschuwingsadressen: Bellen, SMS, Technisch, Codewoord).
- Bestaande contactpersonen: Bellen en SMS aan. 13 bestaande aanvragen in *Aanmelding meldkamer* kregen een operationele aansluiting *Gereed voor activering*.
- Oude monteursformulier (TechnischFormulier/bewaarTechnisch) vervangen door het installatiedossier.

### Testresultaten (live, testbedrijf ZZTEST, daarna verwijderd)
A salesopdracht overnemen ✓ · B directe aanmelding ✓ · C offerte aanpassen v1→v2 ✓ · D afwijkende configuratie → beoordeling → goedkeuring met meerwerk ✓ · E opgeleverd = gereed voor activering, niet actief ✓ · F activering bevestigd, actieve diensten aangemaakt ✓ · G tussentijds opslaan en hervatten ✓ · H rapportage telt alleen operationeel actief ✓ · I idempotent, geen dubbele klant/aanvraag ✓ · J onvolledige oplevering en verkeerde rol geweigerd met duidelijke melding ✓. Toegang: ander installatiebedrijf 404, monteur kan geen akkoord of goedkeuring zetten, sales kan dossier niet wijzigen ✓. Mobiel (390 px) doorlopen ✓. Meldkamermails zijn in de test onderschept, niet verstuurd.

## Meldkamerwerkplek en rollen (beheerportaal)

- **Pagina Meldkamer** (werkbak): alle aansluitingen met operationele status *Gereed voor activering*, *Activering in behandeling* of *Activering mislukt*; filters Nieuw binnen, Mijn werk, In behandeling, Activering mislukt; oudste eerst met wachttijd, installateur/monteur, opgepakt door en checklistvoortgang.
- **Activeringspaneel** bij de aanvraag: oppakken / loslaten / overnemen (oppakken zet de fase op *Wachten op bevestiging meldkamer*), checklist (site, receiver + Site ID, zones, contacten/codewoorden/regels, testmelding, looptest) met per vinkje wie en wanneer, Site ID, receiver-account, IP-adres/poort en aansluitnummer.
- **Aansluiting actief** kan pas met complete checklist en Site ID (gecontroleerd op de server).
- **Terugkoppeling** naar het installatiebedrijf (e-mail aan monteur, sales en aanmelder + zichtbaar in de werkomgeving): *Paneelgegevens* (Site ID, profiel, receiver, IP/poort), *Gegevens ontbreken* (optioneel dossier terug naar de monteur), *Activering mislukt* (operationele status), *Bericht*.
- **Rollen** (tabel *Beheergebruikers*, beheerbaar onder Instellingen → Gebruikers en rollen): Beheer (alles), Meldkamer (werkbak, aanvragen, activeren), Administratie (aanvragen, aansluitbeheer, wijzigingen, logboek, statussen). Menu per rol; configuratie-endpoints vereisen Beheer op de server. Wie niet in de lijst staat, houdt volledige toegang.

## Bekijk als (beheerportaal)

- Alleen voor de rol Beheer: keuzelijst "Bekijk als" rechtsboven.
- **Rol / collega** (Meldkamer, Administratie, gebruikers uit Gebruikers en rollen): alleen een weergave van menu, startpagina en "Mijn werk". Handelingen en serverrechten blijven die van de beheerder.
- **Partnermedewerker**: opent in een nieuw tabblad de werkomgeving precies zoals die medewerker hem ziet (eigen installatiebedrijf, eigen rol). Tijdelijke link van 2 uur (Beheersessie met "Alleen Lezen"). Alle wijzigende endpoints weigeren (`magWijzigen`), knoppen zijn verborgen en het meekijken wordt gelogd.

## Partnerportaal

- In de werkomgeving van het installatiebedrijf (formulier-app), alleen via de **persoonlijke link** van een medewerker met de schakelaar **Partnerportaal** (beheer → Medewerkers). Niet via de gedeelde partnerlink.
- Tabbladen: Dashboard, Aanvragen (alle aanvragen van het eigen bedrijf, ook voor een monteur), Aansluitingen (operationele status, diensten, jaarwaarde), Wijzigingen (status van doorgegeven wijzigingen/opzeggingen) en Nieuwe aanvraag.
- Dashboard: actieve aansluitingen met jaarwaarde, open offertes, in installatie, bij de meldkamer; "Vraagt aandacht" (beoordeling nodig, gegevens ontbreken, activering mislukt, offerte ≥14 dagen zonder reactie, akkoord zonder monteur ≥7 dagen); grafiek over 12 maanden; laatst gewijzigd.
- Geen instellingen, tarieven, medewerkers of logboek. Acties blijven per rol (sales/monteur); het portaal geeft alleen extra inzage.
- Endpoint `getPartnerportaal` filtert op het eigen bedrijf. `listMedewerkers` (bevat persoonlijke links) is nu alleen voor de rol Beheer.
- **Team** (partnerportaal): collega's van het eigen bedrijf toevoegen/bewerken (rol, vestiging, actief, portaal), persoonlijke link kopiëren of vernieuwen. Alleen binnen het eigen bedrijf; je eigen toegang uitzetten kan niet; meekijken vanuit beheer is alleen lezen. Acties in het logboek met "(portaal)".
- **Excel-export** van de aansluitingen (CSV met puntkomma's en UTF-8, opent direct in Excel), volgens het gekozen filter en de zoekterm.

## Site vooraf voorbereiden (meldkamer)

- Na akkoord (Akkoord klant / Installatie in voorbereiding / in uitvoering, en bij een directe monteursaanmelding met akkoord) krijgt de aansluiting de operationele status **In voorbereiding**.
- Bij inplannen of verzetten van de installatie krijgt de meldkamer een e-mail ("Site voorbereiden" / "Installatie verzet") met de datum.
- Werkbak Meldkamer: filters **Voorbereiden** (paneelgegevens nog niet bij de monteur, gesorteerd op installatiedatum, rood bij ≤3 dagen) en **Voorbereid**.
- Activeringspaneel in voorbereiding: alleen de checklistpunten "site aangemaakt" en "receiver/Site ID" (de rest na de installatie), Site ID / receiver / IP-poort, en "Na opslaan direct naar de monteur sturen" (standaard aan). Verstuurt alleen als de gegevens nieuw of gewijzigd zijn (vingerafdruk `paneel` in de terugkoppeling).
- Monteur: in het dossier (stap Technische installatie) een groen blok met Site ID, receiver en IP/poort, of een melding dat ze nog komen.
- Evalink: de site wordt nu nog handmatig aangemaakt. **Later:** via de Evalink-API de site (inactief) automatisch aanmaken en Site ID / receivergegevens terugschrijven. De velden (Extern systeem, Extern Id, Sync Status, Sync Fout, Laatste Sync, Bevestigingsbron "Systeemkoppeling") liggen al klaar. Gebruik dan de echte API-documentatie van Evalink, geen aannames.

## Na de installatie: finale controle, klantonboarding en commerciële kansen

**Bestaande flow ongewijzigd.** Fases, meldkamerwerkplek en activering blijven zoals ze waren. Eén extra voorwaarde: "Aansluiting actief" (de operationele vrijgave) kan pas na goedkeuring van de finale controle.

1. Monteur levert op (Technisch gereed), zoals nu.
2. **Sales** bevestigt in de werkomgeving de definitief geïnstalleerde componenten en extra diensten (blok "Controle na de installatie").
3. **Administratie** (rol Administratie of Beheer) doet de **finale controle** in het aansluitdossier: 8 controlepunten (wie/wanneer), opmerking, Goedkeuren / Terug naar Sales / Terug naar monteur. Wordt opgeslagen als JSON in `Aanmeldingen.Finale Controle`, met historie. Terug naar de monteur zet de fase terug naar "Installatie in uitvoering", maar nooit als de aansluiting al operationeel is. Opnieuw opleveren of de bevestiging van sales zet de controle weer op "Te controleren".
4. Na goedkeuring bevestigt een bevoegde medewerker "Aansluiting actief" (bestaande stap).
5. Bij operationele status **Actief** start automatisch een **onboardingtaak** (tabel `Onboarding`, één per aanvraag). Een fout bij het aanmaken blokkeert de vrijgave nooit.
6. **Onboarding** (menu): statussen Nog te bellen / Contactpoging uitgevoerd / Terugbellen gepland / In behandeling / Afgerond. In het belscherm: klant en contactpersoon met telefoon, vragenlijst per categorie met automatische opslag en een voortgangsbalk, belpogingen (Bereikt / Geen gehoor / Voicemail / Verkeerd nummer), notities, vervolgacties, terugbeldatum, verantwoordelijke en historie. Afronden kan pas als alle verplichte vragen zijn beantwoord. Gewijzigde antwoorden blijven in de historie staan.
7. **Commerciële kansen** (tabel `Commerciele Kansen`): automatisch bij een signalerend antwoord (bijv. "behoefte aan alarmopvolging" = Ja) of met de hand. Ze staan in het aansluitdossier en het logboek, en de salesmedewerker krijgt een e-mail. Sales ziet ze in de werkomgeving en kan de status bijwerken. Er wordt nooit iets automatisch geactiveerd.

**Vragenlijst** (Instellingen → Onboardingvragen, rol Beheer): vragen toevoegen, wijzigen, verwijderen of deactiveren; categorie en volgorde; verplicht/optioneel; type Ja/nee, Meerkeuze, Tekst of Opmerking; voorwaardelijk tonen (na vraag X bij antwoord Y); signaal (Klantvraag → open actie, Commerciële kans → opvolgtaak sales). Antwoorden bewaren een kopie van de vraagtekst. Bij de start gevuld met de standaardvragen A–D en vervolgvragen.

**Dashboard**: tegels "Na de installatie" (wacht op finale controle, onboarding nodig, afgerond, terugbelacties, klanten met vragen, commerciële kansen); elke tegel opent het overzicht, en van daaruit open je het dossier.

**Rechten (server-side)**: controle, onboarding en kansen: Administratie of Beheer. Vragenlijst: Beheer. Sales-bevestiging: rol sales via de persoonlijke link. Meekijken vanuit beheer: alleen lezen.

## Onboarding als begeleid klantgesprek (oktober 2026)

De ja/nee-vragenlijst (categorieën A–D) is vervangen door een stapsgewijze gesprekswizard. De aansluitflow en de scheiding tussen operationele status en onboardingstatus zijn ongewijzigd; het onboardinggesprek kan een aansluiting nooit blokkeren.

**Opbouw van het scherm**
- Bovenaan staat een klantkaart: klant, object, contactpersoon met belknop, datum van activering, installateur, afgenomen diensten en status.
- Daaronder staat de voortgang per stap.
- In het midden staat het gespreksvenster met voorbeeldtekst, dossiergegevens en snelle keuzes.
- Onderaan staan de knoppen Vorige, Volgende, *Opslaan en later hervatten* en *Gesprek afronden*.
- Alles wordt automatisch opgeslagen, ook de huidige stap (veld Stap), zodat het gesprek later bij dezelfde stap verder kan.

**Stappen (standaard)**
1. **Welkom en contactmoment**
   - Komt het gesprek gelegen? Keuzes: ja / terugbelafspraak / andere contactpersoon / geen gehoor, voicemail of verkeerd nummer.
   - Bevoegdheid vaststellen: de klant noemt het codewoord en de server controleert het (`controleerCodewoord`). Het codewoord komt nooit in de browser. Telefoonnummers van contactpersonen blijven afgeschermd tot de bevoegdheid is vastgesteld.
2. **Installatie-ervaring**: vier uitkomsten. Bij een vraag, probleem of openstaand werk ontstaat automatisch een vervolgactie met afdeling, urgentie en notitie.
3. **Meldkamerdienstverlening**
   - Toont de werkelijk afgenomen diensten (actieve aansluitdiensten plus de afgesproken alarmopvolging).
   - Drie controlepunten: alarm, ongewenst alarm en bereikbaarheid. Keuzes: besproken / uitleg gegeven / vervolgactie nodig / n.v.t. Er is ook een knop "Alles besproken en duidelijk".
4. **Contactpersonen en alarmprocedure**
   - Toont de contactpersonen in waarschuwingsvolgorde.
   - Is iets onjuist, dan ontstaat een wijzigingsaanvraag (Wijzigingen, soort Waarschuwingsadressen, status Nieuw) in de bestaande autorisatieprocedure. Waarschuwingsgegevens worden nooit direct overschreven.
5. **Behoefteanalyse**: adviserende vragen over alarmopvolging en videoverificatie. Ze worden verborgen als de klant die dienst al afneemt. Bij interesse ontstaat één commerciële kans per dienst, met een opvolgtaak voor sales.
6. **Samenvatting en afronding**
   - Er wordt automatisch een samenvatting opgesteld, die de medewerker kan corrigeren.
   - Resultaten:
     - Succesvol: alleen zonder open acties.
     - Gedeeltelijk: alleen met een open actie.
     - Terugbelafspraak: datum verplicht.
     - Niet bereikbaar: de onboarding blijft open.
   - Essentiële onderdelen moeten besproken zijn. Open commerciële kansen mogen blijven bestaan.

**Centraal beheer (Instellingen → Onboardingvragen)**
- Soorten onderdelen: Gesprekstekst, Controlepunt, Gesloten vraag, Open vraag, Actievraag en Commerciële vraag.
- Per onderdeel in te stellen:
  - stap en volgorde;
  - toelichting of gesprekstekst;
  - antwoorden;
  - voorwaarde ("alleen na vraag X bij antwoord A | B");
  - signaal: vervolgactie, wijziging gegevens, commerciële kans of bevoegdheid;
  - afdeling, ook per antwoord;
  - "niet tonen als de klant al afneemt";
  - essentieel voor afronden.
- Gespreksteksten vullen [medewerker], [klant], [contactpersoon], [installateur], [meldkamer], [aansluitnummer] en [acties] in.
- Op een eigen regel tonen [diensten], [contactpersonen] en [identificatie] dossiergegevens.
- Antwoorden bewaren de vraagtekst van toen, zodat latere wijzigingen de historie niet raken.

**Geen dubbele taken**
- Er is één automatische actie per vraag (veld `bron`).
- Een open actie met dezelfde tekst wordt niet nog een keer aangemaakt.
- Wijzigt het antwoord, dan vervalt de actie.
- Een wijzigingsaanvraag wordt bijgewerkt zolang hij nog Nieuw is.
- Per dienst is er één lopende kans.

**Data**
- Onboarding: velden Stap, Resultaat en Samenvatting.
- Onboardingvragen: velden Toelichting, Verberg Bij Dienst en Afdeling, plus nieuwe type- en signaalopties.
- De 15 oude ja/nee-vragen zijn vervangen door 21 onderdelen. Er waren nog geen gegeven antwoorden.

**Getest** (tijdelijke ZZTEST-data, daarna verwijderd):
- niet bereikbaar;
- terugbelafspraak;
- tevreden klant, snel afgerond;
- probleem met een opvolgtaak bij Techniek;
- onjuist contact: één wijzigingsaanvraag, die bij nieuwe tekst wordt bijgewerkt;
- klant met alarmopvolging krijgt geen verkoopvraag;
- interesse: één kans, ook na een gewijzigd antwoord;
- open actie: alleen "gedeeltelijk afgerond";
- codewoord juist en onjuist.

Telstar (DETEC-2026-0023) is ongewijzigd en staat nog op Nog te bellen.

**Open punt:** voor "Hoe bereikt de klant de juiste afdeling" staan in de applicatie alleen het meldkameradres (alarmcentrale@devision.nl) en de gegevens van het installatiebedrijf. Telefoonnummers van de administratie en de meldkamer kunnen in de toelichting van dat onderdeel worden aangevuld.

## Technische audit en performance (28 oktober 2026)

**Gemeten**
- Data is klein: 15 aanvragen, 105 diensten, 124 partnertarieven en 81 logregels. Traagheid komt dus niet van de datavolumes.
- Datakwaliteit (via SQL): geen losse regels, contacten, aansluitingen, offertes of diensten. Geen aanvraag met meerdere aansluitingen of zonder partner, geen dubbele klantnamen. Alle koppelingen met de partner zijn compleet.
- Endpointlogs:
  - de verwerkingstijd per verzoek is meestal 100–900 ms;
  - daar komt per verzoek 200–1600 ms opstarttijd van het platform bij, waar wij geen invloed op hebben. Het aantal verzoeken en wachtrondes is daarom de grootste knop.
  - zwaarst waren getAanvraag (21 databasecalls), getAansluiting (17), bewaarOnboarding (12, 1,5 s) en getDiensten (tot 2,1 s).
- In de partnerapp begon elk verzoek met twee volledige tabelscans na elkaar (partners en daarna medewerkers) om de link te controleren.

**Doorgevoerd** (commit 228b1ed)
- *Partnerapp, sleutelcontrole:* partners en medewerkers worden tegelijk opgehaald. Dat scheelt bij elk verzoek met een persoonlijke link een wachtronde.
- *Gerichte queries per installatiebedrijf* in plaats van hele tabellen, in:
  - getDiensten, mijnOverzicht, kansenWerk, submitWijziging, bepaalAanmelder;
  - laadRijen (werklijst, portaal);
  - controleerBestaand, vindOfMaakKlant en vindOfMaakLocatie.

  Dit is sneller en geeft strengere gegevensscheiding. Het voorkomt ook gemiste dubbelen zodra er meer dan 2000 records zijn.
- *Beheer:*
  - getAansluiting haalt het detail en de partnerinstellingen parallel op;
  - laadOnboarding doet geen dubbele contactquery meer;
  - de lijsten voor "Bekijk als" worden pas geladen als de keuzelijst opengaat (twee verzoeken minder bij elke start).
- *Beveiliging:* 15 leesendpoints in het beheerportaal hadden geen rolcontrole en hebben die nu.
  - Een uitgeschakelde gebruiker wordt geweigerd (getest).
  - De KVK-status is alleen voor Beheer.
- *Regressietest per partner:* de werklijst is identiek aan voorheen, er zijn geen gegevens van andere partners zichtbaar, de medewerker wordt correct herkend en de dubbelcontrole werkt.

**Aanbevolen (oorspronkelijk; inmiddels uitgevoerd, zie hieronder)**
1. Klant- en adresgegevens staan zowel op de aanvraag als in Klanten/Locaties. Advies: Klanten/Locaties als bron, met de aanvraag als momentopname. Dit is een migratie.
2. JSON-velden (technischeGegevens, commercieleAfspraak, finaleControle, onboarding) zijn niet doorzoekbaar en niet te filteren. Splits ze pas uit als er rapportages over nodig zijn.
3. Lijst-endpoints laden nu alles (limiet 2000) en filteren in de code. Bij groei: paginering en filteren aan de serverkant voor de werkbakken en Aansluitbeheer.
4. Er zijn 9 verlopen beheersessies. Advies: automatisch opruimen na 30 dagen (het logboek bewaart de audit).
5. Opslaan in de onboarding laadt na elke klik het hele gesprek opnieuw. Een lichter antwoord kan de wachttijd per klik verder verlagen.

**Uitgevoerd na akkoord (28 oktober 2026)**

*Volledigheid van opvragingen*
- De gedeelde helper `alles()` haalt tabellen in pagina's van 1000 op. Dat geldt voor 59 opvragingen die eerder bij 2000 records afkapten. Getest met paginering, ook in combinatie met filters.
- Het logboekoverzicht haalt alleen het laatste halfjaar op en toont daarvan de nieuwste 500 regels. Per dossier blijft de volledige historie beschikbaar.

*Toegang tot het beheerportaal*
- Wie niet in Beheergebruikers staat, heeft geen toegang.
- Bij het eerste bezoek ontstaat een toegangsverzoek: een uitgeschakelde regel die in Instellingen → Gebruikers met het label "toegangsverzoek" verschijnt.
- Vangnet: zolang er geen enkele actieve beheerder in de lijst staat, houdt iedereen in de organisatie toegang.

*Opruimen, klantgegevens en controle*
- Beheersessies die langer dan 30 dagen verlopen zijn, worden door de uurlijkse taak opgeruimd.
- De klantkaart en de locatie zijn de centrale bron. Ze worden bijgewerkt met nieuwe of gewijzigde naam, type, e-mail, KvK (aanvullen), plaats en land, en worden nooit leeggemaakt. Er waren geen afwijkingen tussen aanvragen en klantkaarten.
- Nieuw veld *Controle Status* op Aanmeldingen (filterbaar), gevuld vanuit de finale controle. Bestaande dossiers zijn aangevuld.

*Onboarding*
- Opslaan hergebruikt het bijgewerkte record en de vragenlijst in plaats van opnieuw te laden. Getest: het resultaat is gelijk aan opnieuw laden.

*Bewust niet gedaan*
- Paginering in de schermen zelf. Bij het huidige aantal (15 dossiers) levert dat niets op, en de server haalt al alles volledig en gepagineerd op. Zinvol vanaf enkele honderden dossiers per lijst.

## Optimalisatie aansluitplatform – fase 1 (28 oktober 2026)

**Al goed ingericht (ongewijzigd)**
- Datamodel:
  - Klant → Locaties → Meldkameraansluiting, met het aanvraagdossier als centrale koppeling.
  - Contactpersonen, offertes (versies als momentopname), installatie (JSON), onboarding en kansen hangen allemaal aan dat dossier.
  - Alle koppelingen zijn compleet.
- Partnerrechten worden bij elke serveractie gecontroleerd. Getest met directe verzoeken op het dossier van een ander bedrijf: getAanvraag, controleSales en wisselFase weigeren.
- Performance en paginering zijn in de vorige ronde opgelost.

**Uitgevoerd** (commit 219a769)
- *Klantgegevens hergebruiken:*
  - Is een klant of adres al bekend, dan neemt "Klantgegevens overnemen" de klant-, contact- en factuurgegevens over uit de laatste aanvraag van die klant (via de bestaande `klantUitDetail`).
  - Bij hetzelfde adres worden ook de contactpersonen overgenomen, zonder codewoorden en alleen als er nog niets is ingevuld.
  - De gedeelde partnerlink krijgt geen verwijzingen naar dossiers.
- *Tijdelijke beheerlink:* de kansen zijn beperkt tot die ene aanvraag, en indienen van wijzigingsverzoeken is geblokkeerd.

**Volgende fase: prioriteiten**
1. Conflictdetectie: weigeren bij een verouderde versie (via het veld bijgewerkt-op) voor offerte, installatie en beheer.
2. Technisch controleoverzicht van mislukte e-mails, PDF's en automatiseringen, met "opnieuw uitvoeren". Herinneringen hebben dit al; dat breidt uit naar de rest.
3. Vrijgavecheck "testmelding verwerkt", met een uitzondering die alleen met een verplichte reden kan.

## Optimalisatie aansluitplatform – fase 2 (28 oktober 2026)

**Vrijgave**
- Eerste activering gaat alleen via de fase "Aansluiting actief". Die vereist nu:
  - een meldkameraansluiting met afgeronde checklist (inclusief testmelding en Site ID);
  - een goedgekeurde finale controle;
  - klantnaam, installatieadres en contactpersoon.
- Uitzondering: alleen de rol Beheer, met een verplichte reden. Die komt in het logboek als "Uitzondering: …".
- De stappenvolgorde (magOvergang) kan nooit worden overgeslagen.

**Offerte versus installatie**
- `prijsImpact()` (lib/installatie) rekent per regel uit wat erbij komt, wat vervalt en wat afwijkt, met het verschil per jaar en eenmalig. Het resultaat staat in detail.prijsimpact.
- Getoond in het beheerdossier en in de sales-beoordeling (component `workflow/PrijsImpact`).
- Bij hogere kosten of een afwijkende regel verschijnt de melding "nieuw akkoord nodig".
- Vergeleken wordt altijd met de vastgelegde afspraak (de geaccepteerde offerte). Die verandert nooit.

**Gelijktijdig bewerken**
- Installatiedossier: detail.installatieVersie is een vingerafdruk van technischeGegevens. bewaarInstallatie weigert met CONFLICT bij een verouderde basis. In de wizard stopt dan de autosave en verschijnt een herlaadknop.
- Offerte: basisVersie is de nieuwste versie bij het openen. Bestaat er intussen een nieuwere, dan volgt CONFLICT.

**Fouten**
- `meldFout()` (server/fouten) legt mislukte e-mails, PDF's, onboarding, dossier sluiten, fasewissels en dergelijke vast in het logboek (onderdeel Automatisering). Sleutels worden weggemaskeerd.
- Automatiseringen toont per fout het dossier, met de knoppen "Opnieuw" (meldkamer, onboarding; idempotent) en "Afgehandeld" (wordt gelogd).

**Getest:** vrijgave zonder gegevens geweigerd; korte reden geweigerd; Meldkamer-rol geweigerd; stap overslaan geweigerd; Beheer met reden geslaagd en gelogd; bedragberekening; oud tabblad geweigerd en nieuwe versie geslaagd; fout zichtbaar, opnieuw uitgevoerd en daarna verdwenen.

## Optimalisatie aansluitplatform – fase 3 (28 oktober 2026)

**Al aanwezig (ongewijzigd)**
- *Sales:* werklijst met de filters Offertes, Goedgekeurd, In uitvoering, Beoordeling nodig en Actief (met tellers), de banner "Offertes om op te volgen" en commerciële kansen.
- *Monteur:* de filters Beschikbaar, Mijn installaties, Concepten en Ontbrekende gegevens, en de knop "Nieuwe aansluiting".
- *Partnerbeheerder:* partnerportaal met dashboard, aansluitingen (met Excel-export), wijzigingen en team.
- *Beheer:* commerciële KPI's en grafieken, plus tegels voor controle en onboarding.

**Toegevoegd**
- *Werkvoorraad "Vraagt aandacht"* (getProcesoverzicht, Werkvoorraad.tsx), met de tegels:
  - gereed voor vrijgave (controle goedgekeurd en checklist compleet);
  - bij de meldkamer;
  - commerciële beoordeling;
  - onvolledig;
  - installaties lopend;
  - onboarding open;
  - geactiveerd in de afgelopen 30 dagen.

  Klik een tegel voor de dossiers en een dossier om het direct te openen.
- *Procesrapportage* (Beheer/Administratie):
  - de gemiddelde doorlooptijd per fase, berekend uit de logregels "Fase A → B";
  - per installatiepartner: lopend, aangesloten, gemiddelde doorlooptijd en afwijkingen;
  - totalen voor wacht op vrijgave, afwijkingen, onboarding afgerond en succesvol, en vrijgaven als uitzondering.

  Er worden geen extra gegevens opgeslagen.
- *Mobiel:*
  - Getest op 390 px via een tijdelijke meekijksessie, die daarna is verwijderd. Werklijst, dossier en monteurwizard hebben geen horizontale scroll en geven geen fouten.
  - De klantnaam in de werklijst wordt niet meer afgekapt.
  - De wizard toont de legenda "velden met * zijn verplicht" en tijdens meekijken de juiste melding over opslaan.

## Optimalisatie aansluitplatform – fase 4: voorbereiding externe koppelingen (28 oktober 2026)

**Drie lagen, nu vergelijkbaar** (`dienstLagen()` in server/aansluiting, getoond in het dossier onder Producten en diensten):
1. *Afgesproken:* de vastgelegde afspraak (geaccepteerde offerte), aangevuld met latere aanvullingen (goedgekeurde installatieafwijkingen en dienstwijzigingen met klantakkoord). Een vervallen regel vervangt de dienst; de nieuwe stand staat in "toegevoegd".
2. *Actief:* de lopende aansluitdiensten.
3. *Factureerbaar:* actieve diensten met een "factureerbaar vanaf" op of vóór vandaag.

Mogelijke statussen: In orde, Afgesproken maar niet actief, Actief zonder afspraak, Aantal wijkt af, Nog niet factureerbaar.

**Referenties voor latere koppelingen** (alle optioneel, niets gekoppeld):

| Systeem | Waar vastgelegd |
|---|---|
| Meldkamer (Evalink) | Meldkameraansluitingen: Extern systeem, Extern ID en Sync status (bestond al) |
| Financiële administratie | Klanten: Debiteurnummer. Partners: Debiteurnummer (bij inkoop). Aansluitdiensten: Factuur Referentie en Factureerbaar Vanaf. Diensten: Artikelcode (bestond al) |
| CRM | Klanten: CRM ID |

Debiteur- en CRM-nummers staan op de centrale klantkaart, gelden dus voor alle aansluitingen van die klant, en worden gecontroleerd op dubbelen. Factureerbaar vanaf kan niet vóór de activering liggen. Alle wijzigingen komen in het logboek.

**Later bij een koppeling:** gebruik bij elke synchronisatie eerst de bestaande referentie (Extern ID, Debiteurnummer, Factuur Referentie), zodat er geen dubbele objecten ontstaan. Gebruik Sync status / Sync fout / Laatste sync bij Meldkameraansluitingen voor de status per koppeling.
