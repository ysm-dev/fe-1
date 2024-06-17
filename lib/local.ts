import { createStorage } from "unstorage"
import localStorageDriver from "unstorage/drivers/localstorage"
import { isServer } from "utils/isServer"

export const local = createStorage(
  !isServer()
    ? {
        driver: localStorageDriver({ base: "app" }),
      }
    : {},
)
