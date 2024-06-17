import type { Form } from "app/page"
import { local } from "lib/local"
import { assert } from "utils/assert"

type Params = Form

export const signup = async ({ username }: Params) => {
  const host = window.location.hostname
  const uuid = new TextEncoder().encode(crypto.randomUUID())

  const name = `${host} - ${username} (${`${new Date().toISOString()}`
    .slice(0, 16)
    .replace("T", " ")})`

  const credential = await navigator.credentials.create({
    publicKey: {
      attestation: "direct",
      challenge: uuid,
      rp: {
        id: host,
        name: host,
      },
      authenticatorSelection: {
        userVerification: "preferred",
        residentKey: "required",
        requireResidentKey: true,
      },
      extensions: {
        credProps: true,
      },
      user: {
        id: uuid,
        name: name,
        displayName: name,
      },
      pubKeyCredParams: [
        { alg: -7, type: "public-key" },
        { alg: -257, type: "public-key" },
      ],
    },
  })

  assert(credential, "Credential is required")

  await local.setItem("isRegistered", true)

  return credential.id.slice(0, 8)
}
