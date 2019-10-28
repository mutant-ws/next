import { is, isEmpty } from "@mutantlove/m"

import { getSessionCookie } from "./cookie.helper"

const textToJSON = source => {
  try {
    return JSON.parse(source)
  } catch (error) {
    return source
  }
}

const settings = {
  productId: null,
  host: "https://api.mutant.love",
  other: {},
}

export const set = ({ productId, host, ...rest } = {}) => {
  settings.other = isEmpty(rest) ? {} : rest

  if (is(productId)) {
    settings.productId = productId
  }

  if (is(host)) {
    settings.host = host
  }
}

export const track = (name, { productId: oneTimeProductId, ...other } = {}) => {
  const productId = is(oneTimeProductId) ? oneTimeProductId : settings.productId

  if (isEmpty(productId)) {
    throw new Error(
      `MutantNext: "productId" value not found. Neither settings (via set) nor call specific value found. Get ID of your product from the Product Setting page.`
    )
  }

  if (isEmpty(name)) {
    throw new Error(
      `MutantNext: "name" value "${name}" is invalid. Needs to be a string. We're using BEM for event naming, it's working fine till now`
    )
  }

  const xhr = new XMLHttpRequest()

  return new Promise((resolve, reject) => {
    xhr.open("POST", `${settings.host}/track`)
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8")

    xhr.send(
      JSON.stringify({
        name,
        sessionId: getSessionCookie(),
        productId,
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
      })
    )

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve({ status: xhr.status, response: textToJSON(xhr.response) })
      } else {
        reject({ status: xhr.status, response: textToJSON(xhr.response) })
      }
    })

    xhr.addEventListener("error", () => {
      reject({ status: xhr.status, response: textToJSON(xhr.response) })
    })
  })
}
