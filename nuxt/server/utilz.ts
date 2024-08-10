import fbAdmin, { ServiceAccount } from 'firebase-admin'
import { IFirebaseToken } from '~/shared/types'
import fbKey from '../serviceAccountKey.json'
const serviceAccount = fbKey as ServiceAccount
import { getApiError } from '~/shared/utilz'

fbAdmin.initializeApp({
  credential: fbAdmin.credential.cert(serviceAccount)
});

export function verifyFirebaseJWT(token: string): Promise<[any, null]|[null, IFirebaseToken]> {
  return new Promise(async (resolve) => {
    try {
      const decoded = await fbAdmin.auth().verifyIdToken(token) as IFirebaseToken
      resolve([null, decoded])
    } catch (error) {
      resolve([getApiError(error), null])
    }
  })
}
