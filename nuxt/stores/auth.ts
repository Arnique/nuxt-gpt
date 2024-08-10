import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, UserCredential } from 'firebase/auth'
import { awaiter } from '~/shared/utilz'
import type { IApiResponse, IUser } from '~/shared/types'
import type { AsyncData } from '#app'

type ApiReq = {
  busy: boolean,
  error: null | any
}

export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig()
  const FirebaseApp = initializeApp(config.public.fb)
  const auth = getAuth(FirebaseApp)
  const user = ref<IUser|undefined>()

  // auth.onAuthStateChanged(user => {
  //   if (user) initUser()
  // })

  async function handleLogin(cred: UserCredential) {
    const provider = cred.providerId
    const token = await cred.user.getIdToken()
    const url = `/api/login?p=${provider}&t=${token}`
    
    window.location.replace(url)
  }

  async function googleLogin() {
    const provider = new GoogleAuthProvider();
    const [err, data] = await awaiter(signInWithPopup(auth, provider))

    if (err) console.error(err)
    if (data) handleLogin(data)
  }

  async function githubLogin() {
    const provider = new GithubAuthProvider()
    provider.addScope('repo');
    const [err, data] = await awaiter(signInWithPopup(auth, provider))

    if (err) console.error(err)
    if (data) handleLogin(data)
  }

  function setUser(v: any) {
    if (!user.value) return
    user.value = Object.assign(user.value, v)
  }

  async function initUser() {
    const { data, error } = await useFetch<IApiResponse<IUser>>('/api/user')

    if (data.value) {
      user.value = data.value?.data
    }

    if (error.value) {
      throw error.value
    }
  }

  function logout() {
    const url = '/api/logout'
    window.location.replace(url)
  }

  return {
    googleLogin,
    githubLogin,
    logout,
    initUser,
    user,
    setUser
  }
})