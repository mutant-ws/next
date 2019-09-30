<!-- markdownlint-disable first-line-h1 line-length -->

# next

> Official tracking library for the Mutant board

---

<!-- vim-markdown-toc GFM -->

* [Install](#install)
* [Develop](#develop)
* [Use](#use)
  * [Setup](#setup)
  * [Track](#track)
* [Cookies](#cookies)
* [Commit messages](#commit-messages)
* [Changelog](#changelog)

<!-- vim-markdown-toc -->

## Install

```bash
npm install @mutantlove/next
```

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

## Use

### Setup

Before your application starts.

```js
import { setConfig } from "@mutantlove/next"

setConfig({
  productId: "123",
})
```

### Track

When something happens.

```js
import { track } from "@mutantlove/next"

track("page__section--action-name", {
  context: "data such as",
  userId: "can be added to",
  events: "by putting it here",
})
```

## Cookies

When running `setConfig` the first time, a `mutant` cookie will be set with the session id.

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
