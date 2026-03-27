# Eesti statistika viktoriiin

Viktoriinirakendus, mis testib sinu teadmisi Eesti statistika kohta. Tehud React + TypeScript + Vite stackiga.

## Kuidas käivitada

```bash
npm install
npm run dev
```

Avaneb http://localhost:5173

## Testid

E2E testid on kirjutatud Playwrightiga.

```bash
npx playwright install
npm run test:e2e
```

Dev server peab testide ajal jooksma (Playwright käivitab selle ise).

## Kujundus

Disain põhineb Statistikaameti CVI-l (https://brand.stat.ee). Kasutusel on Roboto font ja Statistikaameti must-valge-hall värvipalett. Tagasiside värvid (roheline/punane) on võetud CVI tagasiside värvide alt.

## Stack

- React 18
- TypeScript
- Vite
- Playwright
