import { defineStore } from 'pinia'
import { api } from 'boot/axios'
export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  email: string
  password: string
  password_confirmation: string
}

type User = {
  id?: string
  name?: string
  email?: string
  [key: string]: unknown
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async signup(payload: RegisterPayload) {
      const { data } = await api.post('/auth/signup', payload)

      this.token = data.data.token
      this.user = data.data.user

      localStorage.setItem('token', this.token)
      localStorage.setItem('user', JSON.stringify(this.user))
    },

    async login(payload: LoginPayload) {
      const { data } = await api.post('/auth/login', payload)

      this.token = data.data.token
      this.user = data.data.user

      localStorage.setItem('token', this.token)
      localStorage.setItem('user', JSON.stringify(this.user))
    },

    logout() {
      this.token = ''
      this.user = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})
