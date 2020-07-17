<!-- markdownlint-disable first-line-h1 line-length no-inline-html -->

# next <img src="src/logo.png" alt="MutantNext Logo" align="right"/>

Official browser tracking library for the Mutant Workspace.

<!-- vim-markdown-toc GFM -->

* [Install](#install)
* [Use](#use)
  * [`set`](#set)
  * [`track`](#track)
  * [API](#api)
* [Cookies](#cookies)
* [Collected data](#collected-data)
* [Develop](#develop)
* [Changelog](#changelog)

<!-- vim-markdown-toc -->

## Install

```bash
npm install @mutant-ws/next
```

## Use

### `set`

Attach data to `track` calls. Find the `productId` from your [profile page](https://getmutant.com/me), in the install section of your product.

```js
import { set } from "@mutant-ws/next"

set({
  productId: "UUID",
})
```

You can run `set` multiple times.

Ex. Attach `userId` to `track` calls after a successful login.

```js
import { set } from "@mutant-ws/next"

const login = ({ email, password }) =>
  POST("/login", { body: { email, password } }).then(({ id }) => {
    set({
      userId: id,
    })
  })
```

### `track`

Record an event your application.

* `name` is required - Name of the event that you'll use to plot inside Mutant. An error will be thrown if not passed.
* `productId` - You can either set `productId` once via `set` or explicitly add it to the `track` call.

> If using [BEM](http://getbem.com/naming) for naming events, when plotting an event, the legend label will only show the M (modifier) part of BEM. Ex. for `page__section--login`, only `login` will be displayed.

```js
import { track } from "@mutant-ws/next"

track("page.section.action-name", {
  context: "data such as",
  userId: "can be added to",
  events: "by adding it here",
})
```

### API

Make a `POST` at `https://api.mutant.love/track` with the same requirements as the `track` method (`name` and `productId` required).

Ex. Tracking CI deployment success and failure.

```bash
curl \
  --header "Content-Type: application/json" \
  --data '{"name": "ci.success", "productId": "uuid"}' \
  https://api.mutant.love/track
```

## Cookies

* `mutant` - Unique client id. Created if not present.

## Collected data

We automatically collect the following data with every event.

* Screen size: width and height of viewport and screen
* User agent
* URL
* Referrer
* IP
* Timestamp

## Develop

```bash
git clone git@github.com:mutant-ws/next.git && \
  cd next && \
  npm run setup

# run tests (any `*.test.js`) once
npm test

# watch `src` folder for changes and run test automatically
npm run tdd
```

## Changelog

See the [releases section](https://github.com/mutant-ws/next/releases) for details.
