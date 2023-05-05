import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './config'

export const addDocument = async (dataName, data) => {
  try {
    addDoc(collection(db, dataName), {
      ...data,
      createdAt: serverTimestamp(),
    })
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}
