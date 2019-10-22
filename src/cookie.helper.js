import cuid from "cuid"
import { when, is, find, get, startsWith, pipe, split } from "@mutantlove/m"

const setCookie = () => {
  const newCookie = cuid()
  const date = new Date()
  const daysToExpire = 3500

  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000)
  document.cookie = `mutant=${newCookie}; path=/; expires=${date.toGMTString()}`

  return newCookie
}

export const getSessionCookie = () =>
  pipe(
    split("; "),
    find(startsWith("mutant=")),
    when(
      is,
      pipe(
        split("="),
        get(1)
      ),
      setCookie
    )
  )(document.cookie)
