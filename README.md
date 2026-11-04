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
