# Firebase Functions

`node - v12.4.0`

## Getting Started

### Setup

1. Set environment variables.
    ```yaml
    # .env
    FIREBASE_DATABASE_URL=""
    ```

2. Set firebase service_account file at `functions/service_account.json`.
  
    - Firebase Console  →  Settings  →  Service accounts  →  Generate new private key

### Start

1. Compiles and hot-reloads for development.
    ```bash
    $ firebase serve --only functions
    ```
    
2. Deploy.
    ```bash
    $ firebase deploy --only functions
    ```

## API

### Available Methods

| Endpoint | Method | Action                     |
| -------- | ------ | -------------------------- |
| /:path   | GET    | Redirect to `path`         |
