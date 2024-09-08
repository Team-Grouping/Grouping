# Grouping
**Grouping** is a decentralized Web 3.0 social commerce platform that enables safe and transparent group purchases.
## Quick start

The first things you need to do are cloning this repository and installing its dependencies:

```sh
git clone https://github.com/Team-Grouping/Grouping.git
cd Grouping
pnpm install
cd frontend
pnpm install
```

Next, you need an .env file in frontend folder, containing Firebase privateKeys and Client IDs

```sh
// .env
# FireBase PrivateKeys
NEXT_PUBLIC_FIREBASE_API_KEY="your_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=""
NEXT_PUBLIC_FIREBASE_DATABASE_URL=""

NODE_ENV=production

# Client IDs for different environments
NEXT_PUBLIC_CLIENT_ID_DEVELOPMENT= # Development client ID
NEXT_PUBLIC_CLIENT_ID_PRODUCTION= # Production client ID
```

Once the file exists, run a local dev tool:

```sh
pnpm run dev
```
