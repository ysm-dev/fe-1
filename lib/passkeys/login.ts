import { assert } from "utils/assert"

export const login = async () => {
  const uuid = new TextEncoder().encode(crypto.randomUUID())

  const auth = await navigator.credentials.get({
    publicKey: {
      challenge: uuid,
      rpId: window.location.hostname,
      userVerification: "preferred",
    },
  })

  assert(auth, "Credential not found")

  return auth.id.slice(0, 8)
}
