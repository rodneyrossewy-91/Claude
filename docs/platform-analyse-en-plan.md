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
