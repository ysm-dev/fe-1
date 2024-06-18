import { customAlphabet } from "nanoid"

// base32 (32 characters) without 0,1,8,9
const alphabet = `ABCDEFGHIJKLMNOPQRSTUVWXYZ234567`.toLowerCase()

export const nanoid = (len: number) => customAlphabet(alphabet, len)()
