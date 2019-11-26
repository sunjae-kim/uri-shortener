# Vue + Firebase Url Shortener

Firebase 의 Realtime Database + Vue 로 빌드된 url shortener 프로젝트 입니다.

[functions](https://github.com/Sunjae-Kim/firebase-url-shortener/tree/master/functions) 는 Express + Realtime Database 로 만들어진 Rest API 입니다.

## Get Started

### Install

1. Install node modules
    ```bash
    $ npm install
    ```

2. Set environment variables
    ```python
    # .env
    FIREBASE_API_KEY=""
    FIREBASE_DATABASE_URL=""
    FIREBASE_PROJECT_ID=""
    ```


### Start & Build

1. Start with Webpack Development Server
    ```bash
    $ npm run start
    ```

2. Build with Webpack
    ```bash
    $ npm run build
    ```
    - this will build the application in `dist/`


### Deploy

1. Serve built Application in Local. **Do this After build.**
    ```bash
    $ firebase serve --only hosting
    ```

2. Deploy
    ```bash
    $ npm run deploy
    ```
