# Later oppakken – aanmeldplatform Devision

Bewust uitgesteld. Niet bouwen zonder akkoord van Rodney.

## Aanmeldingen opsplitsen in deeltabellen (database-audit, fase E)

**Status:** uitgesteld op 11 november 2026.

**Wat:**
- De brede tabel Aanmeldingen opsplitsen in losse tabellen voor Installatie (technische gegevens), Controles (eerste en finale controle) en Commerciële afspraak.
- Elke deeltabel krijgt één koppeling naar het dossier.

**Al gedaan:**
- Klanten en locaties staan op één plek (tabellen Klanten en Locaties).
- Elke aanvraag wordt automatisch gekoppeld.
- Er is een klantoverzicht in het beheer en in het partnerportaal.

**Waarom uitgesteld:**
- Het raakt ongeveer 93 endpoints, plus het portaal en de automatiseringen.
- Het levert nu geen meetbare snelheid op: alle metingen blijven onder 0,2 s, en de lijsten halen al alleen de velden op die ze tonen.
- De schermen blijven er hetzelfde uitzien.
- Zite heeft geen transacties. Opslaan over meerdere tabellen heeft daardoor herstel-logica nodig.
- De partnerscheiding moet per nieuwe tabel opnieuw worden ingericht en getest.

**Wanneer oppakken:**
- als de dagelijkse performancemeting (Automatiseringen) groei of vertraging laat zien;
- of als de dossiers zo groot worden dat onderhoud lastig wordt;
- of als er een koppeling komt die losse delen nodig heeft, bijvoorbeeld een aparte installatie-API.

**Hoe:**
- Per tabel in kleine stappen.
- Vooraf en achteraf vingerafdrukken vergelijken (`apps/aanmeldingen-beheer/src/tests/vergelijk.ts`).
- De partnerscheidingstest draaien (`apps/aanmelding-3b/src/tests/partnerscheiding.ts`).
- Eerst testen met ZZTEST-records.

## Automatiseringen voor later (besloten 14 november 2026)

- **Objectcode automatisch aanvragen bij het opvolgbedrijf.** Nu vraagt de administratie de objectcode handmatig aan. Daarvoor is nodig hoe het opvolgbedrijf aanvragen ontvangt (API, vast mailformaat of portaal) en hoe de objectcode terugkomt.
- **Zones en contactpersonen automatisch naar Evalink.** Na het aanmaken van de site de zones en de contactpersonen met codewoorden doorzetten. Daarvoor is de Evalink-API nodig, met het zone- en contactformaat. Codewoorden gaan alleen versleuteld en rechtstreeks naar Evalink, nooit via mail of meldingen.

## Andere open punten bij Rodney

- `ZITE_CODEWOORD_SLEUTEL` instellen. Daarna `versleutelCodewoorden` en `zetSleutelsOm` opnieuw draaien.
- De KVK API-sleutel roteren.
- Btw-code, grootboek en frequentie aanleveren voor de 3 factuurregels van DETEC-2026-0016. Daarna het afboeken van een factuurrun van begin tot eind testen.
- Echte e-mailadressen invullen en MAIL_TESTMODUS uitzetten.
- Paginering op de server pas bouwen als de performancemeting groei laat zien.
- Evalink koppelen (eventlog, doormeldtest, testmodus, maandrapport en site aanmaken): welke receivers automatisch een site kunnen krijgen, API-beschrijving, Company ID, bevestiging Site ID, of testmodus via de API kan, het zoneformaat in events, en de API-sleutel (als omgevingsvariabele in Zite) aanleveren.
