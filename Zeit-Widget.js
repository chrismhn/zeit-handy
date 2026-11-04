// Zeit – Home-Bildschirm-Widget für die kostenlose App „Scriptable“.
// Zeigt Umsatz heute, 30 Tage vs. Monatsziel und einen Motivationssatz (Daten vom Mac).
//
// Einrichten:
//  1. Scriptable aus dem App Store laden (kostenlos).
//  2. Neues Skript anlegen, diesen Text einfügen, Name „Zeit“.
//  3. Einmal im Skript auf ▶ tippen: Zugangsschlüssel (nur Lesen reicht) eintragen.
//  4. Home-Bildschirm lange drücken → + → Scriptable → Widget wählen → Skript „Zeit“.
const REPO = "chrismhn/zeit-daten";
const GOAL = 5000;
const KEY = "zeit-token";
const QUOTES = [
  "Erst die Arbeit. Dann der Porsche.", "Disziplin schlägt Motivation.", "Heute 1 % besser reicht.",
  "Nicht fühlen. Machen.", "Wer heute scrollt, zahlt morgen.", "Dein zukünftiges Ich schaut zu.",
  "Mach die Aufgabe, vor der du dich drückst.", "Umsatz kommt von Handlung, nicht von Hoffnung."
];

let token = Keychain.contains(KEY) ? Keychain.get(KEY) : null;
if (!token && !config.runsInWidget) {
  const a = new Alert();
  a.title = "Zugangsschlüssel";
  a.message = "Einmal eintragen. Er bleibt in der Schlüsselbund-Ablage dieser App.";
  a.addSecureTextField("github_pat_…");
  a.addAction("Speichern");
  await a.present();
  token = a.textFieldValue(0).trim();
  if (token) Keychain.set(KEY, token);
}

const eur = n => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

async function load() {
  const r = new Request("https://api.github.com/repos/" + REPO + "/contents/snapshot.json");
  r.headers = { Authorization: "Bearer " + token, Accept: "application/vnd.github.raw+json" };
  return await r.loadJSON();
}
function total(snap, per) {
  const shop = (snap.shopify || []).reduce((a, s) => a + ((s[per] || {}).sales || 0), 0);
  return shop + (((snap.resale || {})[per] || {}).sales || 0);
}

const w = new ListWidget();
const g = new LinearGradient();
g.colors = [new Color("#1a1a3a"), new Color("#050508")];
g.locations = [0, 1];
w.backgroundGradient = g;
w.setPadding(14, 14, 14, 14);

try {
  const snap = await load();
  const today = total(snap, "today"), month = total(snap, "month");
  const q = QUOTES[Math.floor(Date.now() / 864e5) % QUOTES.length];

  const t1 = w.addText("UMSATZ HEUTE");
  t1.font = Font.semiboldSystemFont(10); t1.textColor = new Color("#ffffff", 0.6);
  const t2 = w.addText(eur(today));
  t2.font = Font.boldSystemFont(30); t2.textColor = Color.white();
  w.addSpacer(4);
  const t3 = w.addText("30 Tage: " + eur(month) + " / " + eur(GOAL));
  t3.font = Font.mediumSystemFont(12); t3.textColor = new Color("#0a84ff");
  w.addSpacer();
  const t4 = w.addText(q);
  t4.font = Font.semiboldSystemFont(12); t4.textColor = new Color("#ffc457"); t4.minimumScaleFactor = 0.7;
  w.refreshAfterDate = new Date(Date.now() + 15 * 60 * 1000);
} catch (e) {
  const t = w.addText("Keine Verbindung zum Mac-Speicher");
  t.font = Font.mediumSystemFont(12); t.textColor = Color.red();
}

if (config.runsInWidget) Script.setWidget(w); else await w.presentMedium();
Script.complete();
