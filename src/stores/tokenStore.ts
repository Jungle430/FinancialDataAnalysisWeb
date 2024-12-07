import { type Token } from "@/types/token"
import { defineStore } from "pinia"
import { ref } from "vue"

export const TokenStore = defineStore('token', () => {
  const token = ref<Token>(null);
  const setToken = (tk: string): void => { token.value = tk; };
  const getToken = (): Token => { return token.value };
  return {
    setToken,
    getToken
  }
})
