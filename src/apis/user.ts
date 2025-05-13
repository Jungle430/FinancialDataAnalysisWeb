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

export function getUserInfo() {
  return service({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return service({
    url: '/user/logout',
    method: 'post'
  })
}