import { type Token } from "@/types/token"
import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const TokenStore = defineStore('token',
  () => {
    const token = ref<Token>(null);
    function setToken(tk: string): void {
      token.value = tk;
    };
    const getToken = computed(() => token.value);
    return {
      setToken,
      getToken
    }
  },
  {
    persist: true
  }
)
