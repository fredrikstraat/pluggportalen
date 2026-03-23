# plugg.pro portalarkitektur

## 1. Informationsarkitektur

- `plugg.pro` ar en enkel startsida.
- Startsidan samlar appar som kort.
- Varje kort kan senare peka till en separat app eller undersida.
- Portalens uppgift ar att ge en tydlig ingang, inte att innehalla all funktionalitet sjalv.

## 2. Startsidans roll

- Visa vad plugg.pro ar.
- Visa vilka appar som finns eller ar pa vag.
- Lata barnet eller foraldern snabbt klicka vidare till ratt app.

## 3. Designriktning

- Morkt tema.
- Lugn, ren och mobilvanlig.
- Lite spelkansla i paneler och status, men utan att ta fokus fran innehall.
- Fa sektioner och fa beslut pa forstasidan.

## 4. Appstruktur

- Matematik blir forsta appen att langka in.
- Geografi, historia och biologi kan laggas till efter hand som egna kort.
- Nar en app ar klar uppdateras bara dess lank i startsidans data.

## 5. Tekniskt upplagg

- Frontend: React + Vite
- Server: Express i en enda Node-service
- Deploy: en Render web service via `render.yaml`

## 6. Praktisk fordel med denna version

- Snabbare att fa live.
- Latt att forsta for barn och foraldrar.
- Latt att bygga vidare pa utan att startsidan behover goras om.
