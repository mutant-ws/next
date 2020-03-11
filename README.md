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
* [Commit messages](#commit-messages)
* [Changelog](#changelog)

<!-- vim-markdown-toc -->

## Install

```bash
npm install @mutant-ws/next
```

## Use

### `set`

Attach data to every `track` call. Find the `productId` from your [profile page](https://getmutant.com/me), in the install section of your product.

```js
import { set } from "@mutant-ws/next"

set({
  productId: "123",
})
```

You can run `set` multiple times.

Ex. `userId` after a successful login.

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

* `name` is required - Name of the event that you'll use to plot inside a card. An error will be thrown if not passed.
* `productId` - You can either set `productId` once via `set` or explicitly add it to the `track` call.

We're using [BEM](http://getbem.com/naming) for event naming, it's working fine till now. Also, when plotting an event in a card, the legend label will only show the M (modifier) part of BEM.

```js
import { track } from "@mutant-ws/next"

track("page__section--action-name", {
  context: "data such as",
  userId: "can be added to",
  events: "by putting it here",
})
```

### API

Make a `POST` at `https://api.mutant.love/track` with the same requirements as before, `name` and `productId` required.

Ex. Tracking CI deployment success and failure.

```bash
curl \
  --header "Content-Type: application/json" \
  --data '{"name": "terminal-test", "productId": "uuid"}' \
  https://api.mutant.love/track
```

## Cookies

* `mutant` - Unique client id. Changes only if manually deleted.

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

## Commit messages

Using Angular's [conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).

```text
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing or correcting existing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

## Changelog

See the [releases section](https://github.com/mutant-ws/next/releases) for details.
