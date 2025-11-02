
export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem('codrx_user')
}

export function loginUser(email: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('codrx_user', email)
  }
}

export function logoutUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('codrx_user')
  }
}
