import service from "@/utils/request"

export function login(phone: string, password: string) {
  return service({
    url: '/user/login',
    method: 'post',
    data: {
      'phone': phone,
      'password': password
    }
  })
}
