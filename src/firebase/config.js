import { initializeApp } from 'firebase/app'
import { getAuth, FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: 'AIzaSyDqaQiDT1dcSEKwu54bme0tgtX30DI8NWY',
  authDomain: 'chat-room-36c5f.firebaseapp.com',
  projectId: 'chat-room-36c5f',
  storageBucket: 'chat-room-36c5f.appspot.com',
  messagingSenderId: '454887724529',
  appId: '1:454887724529:web:1beefcab2d57ef5c2f2050',
  measurementId: 'G-RHK67C5KD7',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const auth = getAuth()

const fbProvider = new FacebookAuthProvider()
const ggProvider = new GoogleAuthProvider()

export { db, auth, fbProvider, ggProvider }
