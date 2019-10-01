import { fetch as fetchPolyfill } from "whatwg-fetch"
import { is, isEmpty } from "@mutantlove/m"

import { getSessionCookie } from "./cookie.helper"

const settings = {
  productId: null,
  host: "https://mutant.love",
  other: {},
}

export const setup = ({ productId, host, ...rest } = {}) => {
  settings.other = rest

  if (is(productId)) {
    settings.productId = productId
  }

  if (is(host)) {
    settings.host = host
  }
}

export const track = (name, other = {}) => {
  const fetchFn = is(window.fetch) ? window.fetch : fetchPolyfill

  if (isEmpty(settings.productId)) {
    throw new Error(
      `MutantNext: "productId" value "${settings.productId}" is invalid. Needs to be a UUID with the product ID. Get the value from the product setting page`
    )
  }

  if (isEmpty(name)) {
    throw new Error(
      `MutantNext: "name" value "${name}" is invalid. Needs to be a string. We're using BEM for event naming, it's working fine till now`
    )
  }

  return fetchFn(`${settings.host}/track`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      sessionId: getSessionCookie(),
      productId: settings.productId,
      default: {
        url: window.location.href,
        screen: `${window.screen.width}x${window.screen.height}`,
        scroll: `${window.pageXOffset}x${window.pageYOffset}`,
        viewport: `${Math.max(
          document.documentElement.clientWidth,
          window.innerWidth || 0
        )}x${Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        )}`,
      },
      user: {
        ...settings.other,
        ...other,
      },
    }),
  })
}
