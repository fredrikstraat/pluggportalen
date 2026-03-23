# plugg.pro

En enkel startsida for laxhjalpsappar. Portalen ar just nu framfor allt ett nav dar vi kan samla och lank a vidare till olika appar allt eftersom de blir klara.

## Kom igang

1. Installera beroenden:

```bash
npm install
```

2. Starta frontend i utvecklingslage:

```bash
npm run dev
```

3. Starta API/server separat:

```bash
npm run dev:server
```

4. Eller kor bada samtidigt:

```bash
npm run dev:full
```

## Miljovariabler

Skapa en `.env` med samma nycklar som i `.env.example` om du vill anvanda OpenAI live.

## Nuvarande riktning

Startsidan ar medvetet enkel:

- plugg.pro ar en portalstart
- sidan visar kort for appar som Matematik, Geografi, Historia och Biologi
- varje kort kan senare fa en riktig lank till en separat app

## Deploy pa Render

Projektet ar forberett for en enda Render web service via `render.yaml`.

Byggkommando:

```bash
npm install && npm run build
```

Startkommando:

```bash
npm start
```

## Viktiga mappar

- `src/App.jsx` - den enkla portalstartsidan
- `src/data/portalApps.js` - appkort och startsidans innehall
- `server.mjs` - samma Node-service som skoter API och SPA-fallback
- `docs/portal-architecture.md` - enkel informationsarkitektur for portalstarten
