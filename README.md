<!-- markdownlint-disable first-line-h1 line-length -->

# next

> Official tracking library for the Mutant board

---

<!-- vim-markdown-toc GFM -->

* [Install](#install)
* [Setup](#setup)
* [Track](#track)
* [Cookies](#cookies)
* [Develop](#develop)
* [Commit messages](#commit-messages)
* [Changelog](#changelog)

<!-- vim-markdown-toc -->

## Install

```bash
npm install @mutantlove/next
```

## Setup

Link events to your product.

The `productId` field is required. An error will be thrown if using `track` without it.

```js
import { setup } from "@mutantlove/next"

setup({
  productId: "123",
})
```

You can run `setup` multiple times to attach other date to all future `track` calls.

Ex. User ID after a successfull login.

```js
import { setup } from "@mutantlove/next"

const login = ({ email, password }) =>
  POST("/login", { body: { email, password } }).then(({ id }) => {
    setup({
      userId: id,
    })
  })
```

## Track

Use `track` to record an event when something in your application happens.

The `name` parameter is required and an error will be thrown if not passed.

> We're using BEM for event naming, it's working fine till now

```js
import { track } from "@mutantlove/next"

track("page__section--action-name", {
  context: "data such as",
  userId: "can be added to",
  events: "by putting it here",
})
```

## Cookies

The first time the `track` function is called a `mutant` cookie with the session id will be set.

## Develop

```bash
git clone git@github.com:mutantlove/next.git && \
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

See the [releases section](https://github.com/mutantlove/next/releases) for details.
