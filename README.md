# Zeit (Handy)

Installierbare Web-App (PWA) fürs iPhone, gleiches Icon und Look wie die Zeit-Mac-App.

- **Heute / Aufgaben / Sperren:** Punkte, Arbeits-Timer (Bildschirm bleibt an), YouTube/Instagram/TikTok-Limits (Timer in der App), 10-Videos-Sperre.
- **Umsatz / Agenten:** kommen vom Mac über einen *privaten* Daten-Speicher (`snapshot.json`).
- **Zurück an den Mac:** die Handy-Zeiten (`phone.json`) zeigt die Desktop-App bei „Handy“.
- Aufs iPhone: Seite in Safari öffnen → Teilen → „Zum Home-Bildschirm“.

## Mit dem Mac verbinden (Einstellungen ⚙︎ → „Verbindung zum Mac“)

Die App funktioniert auch ohne Verbindung; nur Umsatz und Agenten brauchen sie.

1. GitHub → Settings → Developer settings → *Fine-grained personal access tokens* → Generate new token.
2. *Repository access:* **Only select repositories** → genau `chrismhn/zeit-daten` wählen (sonst meldet GitHub „nicht gefunden“).
3. *Permissions → Repository → Contents:* **Read and write** (Lesen allein reicht für Umsatz, aber dann kommen die Handy-Zeiten nicht zurück).
4. Token kopieren, in der App einfügen, „Verbinden“. Die App sagt genau, was nicht stimmt (ungültig, kein Zugriff, nur Leserecht, Repo fehlt).

Der Schlüssel bleibt nur auf dem Gerät und ist **nicht** in der Sicherungsdatei enthalten.

Grenzen: Eine Web-App kann andere Apps nicht sperren und Bildschirmzeit nicht lesen. Webseiten-Sperre: Filter-Profil (`Zeit-Filter.mobileconfig`) + Bildschirmzeit.

Mac-Seite: `export-snapshot.py --sync` (alle 5 min per `de.chrismohn.zeit.handy-sync.plist`).

## Postkasten (Claude ↔ Handy)

Die App holt im Daten-Repo `inbox.json` ab und schickt ihren Stand als `state.json` zurück.

`inbox.json` (wird von Claude oder dir im Repo `zeit-daten` abgelegt):

```json
{
  "messages": [{"id": "m1", "date": "2026-11-05", "text": "Guten Morgen!"}],
  "todos":    [{"id": "t1", "title": "Lieferanten-Fragen senden", "area": "MySolv", "prio": "hoch"}]
}
```

- Nachrichten erscheinen auf „Heute", bis du „Gelesen" tippst.
- Aufgaben landen einmal in „Aufgaben" (die `id` verhindert Duplikate).
- `state.json`: Aufgaben, Punkte und Tageswerte, höchstens alle 2 Minuten.

## Handy-Test (zum Abhaken, 5 Minuten)

Vorher: App ganz schließen (im App-Wechsler wegwischen) und vom Home-Bildschirm neu öffnen.

- [ ] **1. Verbindung:** ⚙︎ öffnen. Oben bei „Status" steht grün „verbunden · vor … min". *(Rot? Text merken und an Claude schicken.)*
- [ ] **2. Nachricht von Claude:** Auf „Heute" steht oben eine blaue Karte „Hallo von Claude!". Tippe auf „Gelesen", dann verschwindet sie.
- [ ] **3. Umsatz:** Tab „Umsatz" zeigt Zahlen (nicht „wartet auf den Mac"). Wähle „30 Tage": dort steht eine Summe über 0 €.
- [ ] **4. Aufgabe:** Unter „Aufgaben" eine Aufgabe anlegen und abhaken (+Punkte). Nach etwa 3 Minuten steht sie in `state.json` im Repo `zeit-daten`.
- [ ] **5. Arbeits-Timer:** „Arbeit starten", eine Minute warten, „Beenden" (bei Frage „Ich gebe auf" eintippen). Der Bildschirm ging nicht aus. In `phone.json` steht jetzt eine Arbeitszeit über 0.

Alles abgehakt = die App läuft rundum. Wenn ein Punkt nicht klappt: Screenshot an Claude.

Annahmen der Nacht-Prüfung: Der Mac-Dienst läuft weiter alle 5 Minuten; die Test-Nachricht `hallo-1` liegt in `zeit-daten/inbox.json`. Kaputte oder leere Dateien vom Mac zeigen jetzt eine verständliche Meldung statt eines Absturzes, und der letzte gute Stand bleibt sichtbar.
