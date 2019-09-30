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
  settings.productId = productId

  if (!isEmpty(host)) {
    settings.host = host
  }
}

export const track = (name, other = {}) => {
  const fetchFn = is(window.fetch) ? window.fetch : fetchPolyfill

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
