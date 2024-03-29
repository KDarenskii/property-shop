# Интернет-магазин недвижимости

Приложение предназначено для выбора и покупки объектов недвижимости

## Запуск приложения

С рабочей версией проекта можно ознакомиться по ссылке: https://kdarenskii.github.io/property-shop/                         
(приложение было опубликовано с помощью сервиса [GitHub Pages](https://pages.github.com/))

#### Чтобы локально запустить приложение, необходимо:

1.  Перейти в папку `client`, с помощью терминала и команды `npm i` установить все необходимые зависимости.
2.  В папке `client/src` создать файл `.env.local` и поместить в него следующую строку: `REACT_APP_BASE_URL=https://dust-bronze-guava.glitch.me/`.
3.  Командой `npm start` произвести запуск приложения.

#### Чтобы использовать локальный сервер, необходимо дополнительно:

1. В папке `client/src` в файле `.env.local` добавить (изменить) строку `REACT_APP_BASE_URL=http://localhost:3500/`
2. Перейти в папку `server`, с помощью терминала и команды `npm i` установить все необходимые зависимости.
3. Командой `npm start` запустить сервер.
4. В папке `client` повторно запустить приложение командой `npm start`.

Серверные данные будут находиться в папке `server/data/db.json`.

## Используемые ресурсы и инструменты

### Клиентская часть

-   [React (документация)](https://reactjs.org/docs/getting-started.html)

-   [TypeScript (документация)](https://www.typescriptlang.org/docs/)

-   [Redux Toolkit (документация)](https://redux-toolkit.js.org/)

-   [React Router (документация)](https://reactrouter.com/en/main)

-   [Formik (документация)](https://formik.org/docs/overview)

-   [Yup (репозиторий)](https://github.com/jquense/yup)

-   [Axios (документация)](https://axios-http.com/ru/docs/intro)

-   [Classnames (репозиторий)](https://github.com/JedWatson/classnames)

-   [React-Toastify (репозиторий)](https://github.com/fkhadra/react-toastify)

-   [Sass (документация)](https://sass-lang.com/documentation/)

-   [Ahooks (документация)](https://ahooks.js.org/guide)

### Серверная часть

-   [JSON Server (репозиторий)](https://github.com/typicode/json-server) - Fake REST API
-   [JSON Server Auth (репозиторий)](https://github.com/jeremyben/json-server-auth) - JWT authentication middleware for JSON Server

Cервер размещен с помощью сервиса [Glitch](https://glitch.com/)

## Demo
![shop1](https://github.com/KDarenskii/property-shop/assets/111995279/6321be46-78f9-44f1-a4ed-3bf6175fa831)

![shop2](https://github.com/KDarenskii/property-shop/assets/111995279/ec99e1f3-6b4f-400d-91fa-f420074f0b4e)

![shop3](https://github.com/KDarenskii/property-shop/assets/111995279/45e90f2a-5470-4875-ab35-df3462df7a8b)

![shop4](https://github.com/KDarenskii/property-shop/assets/111995279/183e4f3b-4a55-47fc-a054-8d7fe85253f9)

![shop5](https://github.com/KDarenskii/property-shop/assets/111995279/bc6c1abe-6f53-468f-b3cb-f36b81da148e)
