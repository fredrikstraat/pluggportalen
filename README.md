# plugg.pro

Portal for laxhjalpsappar med en gemensam startsida, amnesroutes under samma app och OpenAI som coach och rattning.

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

- `src/App.jsx` - portalens startsida och routing
- `src/data/subjects.js` - amnesdata och ateranvandbar pedagogisk struktur
- `src/lib/api.js` - frontendens API-anrop
- `server.mjs` - samma Node-service som skoter API och SPA-fallback
- `docs/portal-architecture.md` - informationsarkitektur och produktgrund
