# Nuxt GPT
ChatGPT clone using Nuxt 3 and OpenAi API

## Enviroment variables setup

Please create a .env file in the root of the nuxt app and add the following

```
# Firebase
NUXT_PUBLIC_FB_API_KEY=
NUXT_PUBLIC_FB_APP_ID=
NUXT_PUBLIC_FB_AUTH_DOMAIN=
NUXT_PUBLIC_FB_MESSAGING_SENDER_ID=
NUXT_PUBLIC_FB_PROJECT_ID=
NUXT_PUBLIC_FB_STORAGE_BUCKET=

# OpenAi
NUXT_OPENAI_KEY=

# MISC
NUXT_ADMIN_EMAILS=admin1@email.com,admin2@email.com
NUXT_AUTH_COOKIE=FB_TOKEN
```

## Admin accounts setup
To set the default admin account(s), simply enter the emails separated by a comma in the .env file

```
NUXT_ADMIN_EMAILS=admin1@email.com,admin2@email.com
```

## Auth cookie name
To set the name of the authentication cookie simply enter it in the .env file

```
NUXT_AUTH_COOKIE=FB_TOKEN
```

## Firebase Login Setup

Go to firbase console and create a new project.

In the project settings page look for these config keys and copy them to the .env file

```
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
}
```

## Firebase Admin Setup

Go to the service accounts page for your firebase project and create a new private key.

Download the `serviceAccountKey.json` file produced and copy it to the root of the nuxt app

## OpenAi Setup

Create an account on openai then save the API key in the .env file

```
# OpenAi
NUXT_OPENAI_KEY=
```

## App Setup

Use yarn to install dependancies and run the app

```
yarn install

# Dev
yarn dev

# Build
yarn build
```

For more on Nuxt checkout [nuxt.com/](https://nuxt.com/)

## Database Setup

Drizzle kit is used to manage databases. Use these commands to run migrations

```
yarn dbgen
yarn dbpush
```

To explore the database tables use

```
yarn dbstudio
```