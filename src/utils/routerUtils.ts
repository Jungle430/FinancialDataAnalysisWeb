import router from "@/router/index";
import type { RouteLocationRaw } from "vue-router";

export function goto(nextRouter: RouteLocationRaw) {
  router.push(nextRouter);
}
