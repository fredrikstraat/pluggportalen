# plugg.pro portalarkitektur

## 1. Informationsarkitektur

- `plugg.pro` ar portalens gemensamma startsida och varumarkesyta.
- Varje amne lever som en egen route under samma app: `/matematik`, `/geografi`, `/historia`, `/biologi`.
- Samma amnesskal anvands i alla routes:
  - amnesintro
  - lugn startuppgift
  - coachning
  - rattning
  - nasta steg
- En gemensam backend under samma Render-service exponerar:
  - `/api/status`
  - `/api/coach`
  - `/api/evaluate`

## 2. Startsidans designriktning

- Morkt tema med lugna kontraster och tydliga paneler.
- Mobil forst: korta sektioner, stora tryckytor och enkel navigation.
- Latt spelkansla genom uppdrag, faser och progression, men utan att ta fokus fran innehall.
- Startsidan ska svara pa tre fragor direkt:
  - vad ar plugg.pro
  - vilket amne kan jag starta med nu
  - hur fungerar stodet

## 3. Routingstruktur

- `/` visar portalens oversikt och leder vidare till amnena.
- `/:subjectSlug` renderar respektive amne via gemensam amnesmall.
- SPA-routing hanteras i klienten med `react-router-dom`.
- Backend fallback i `server.mjs` gor att Render kan servera samma app pa alla amnesroutes.

## 4. Varfor Matematik blir forsta amnet

- Matematik ar tydligt att demonstrera i ett kort startflode.
- Coachning och rattning blir enkla att testa redan i forsta versionen.
- Samma struktur gar sedan att kopiera till fler amnen utan ny teknisk grund.
- Den nuvarande demo-uppgiften visar hela kedjan:
  - uppgift
  - ledtrad
  - svar
  - rattning
  - nasta steg

## 5. Tekniskt upplagg

- Frontend: React + Vite
- Routing: `react-router-dom`
- Server: Express i en enda Node-service
- AI: OpenAI Responses API for coachning och rattning
- Deploy: en Render web service via `render.yaml`

## 6. OpenAI-val for version 1

- Standardmodellen ar satt till `gpt-5-mini` for att ge en bra balans mellan kvalitet, hastighet och kostnad for korta coach- och rattningsfloden.
- Responses API passar bra eftersom samma endpoint kan anvandas for bade fri text och strukturerad bedomning.
- Strukturerade outputs ar forberedda i rattningsflodet sa att frontend kan fa ett stabilt svar med `verdict`, `feedback` och `nextStep`.

Kallor:

- OpenAI Responses API: https://platform.openai.com/docs/api-reference/responses/get?lang=javascript
- OpenAI Structured Outputs: https://platform.openai.com/docs/guides/structured-outputs
- OpenAI model docs: https://platform.openai.com/docs/models/gpt-5
