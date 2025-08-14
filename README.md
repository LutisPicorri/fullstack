# Phonebook Backend (Part 3)

Backend for the Phonebook app, deployed on Render.

- Online API: https://the-phonebook-tgtt.onrender.com/
- Health check: open the root URL, it should show “Phonebook API is running”.

## API Endpoints

- GET `/api/persons` → list all persons (JSON)
- GET `/api/persons/:id` → fetch one person
- POST `/api/persons` → create a person `{ name, number }`
- DELETE `/api/persons/:id` → remove a person
- GET `/info` → info page with total count and server time (HTML)

## Quick Test (browser/Postman/REST Client)

```http
GET https://the-phonebook-tgtt.onrender.com/api/persons
```

```http
GET https://the-phonebook-tgtt.onrender.com/info
```

```http
POST https://the-phonebook-tgtt.onrender.com/api/persons
Content-Type: application/json

{
  "name": "John Test",
  "number": "123-456"
}
```

```http
DELETE https://the-phonebook-tgtt.onrender.com/api/persons/1
```

Keep the service logs open in Render while testing to spot any issues quickly.

## Local Development

Backend:

```bash
cd part3
npm install
npm run dev
```

Frontend (optional, not deployed in this part):

```bash
cd part2/phonebook
npm install
npm run dev
```

- During local dev, the frontend proxies `/api/*` to the backend (see `part2/phonebook/vite.config.js`).
- If you want the frontend to use the cloud API temporarily, set `baseUrl` in `part2/phonebook/src/personService.js` to `https://the-phonebook-tgtt.onrender.com/api/persons`.

## Notes

- Backend listens on the Render-provided `PORT`.
- CORS is enabled for development and deployment.

