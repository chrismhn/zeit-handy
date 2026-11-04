# Zeit (Handy)

Installierbare Web-App (PWA) fürs iPhone, gleiches Icon und Look wie die Zeit-Mac-App.

- **Heute / Aufgaben / Sperren:** Punkte, Arbeits-Timer, YouTube/Instagram/TikTok-Limits (Timer in der App), 10-Videos-Sperre.
- **Umsatz / Agenten:** kommen vom Mac über einen *privaten* Daten-Speicher (`snapshot.json`).
- **Zurück an den Mac:** die Handy-Zeiten (`phone.json`) zeigt die Desktop-App bei „Handy“.
- Aufs iPhone: Seite in Safari öffnen → Teilen → „Zum Home-Bildschirm“.

Grenzen: Eine Web-App kann andere Apps nicht sperren und Bildschirmzeit nicht lesen. Webseiten-Sperre: Filter-Profil (`Zeit-Filter.mobileconfig`) + Bildschirmzeit.

Mac-Seite: `export-snapshot.py --sync` (alle 5 min per `de.chrismohn.zeit.handy-sync.plist`).
