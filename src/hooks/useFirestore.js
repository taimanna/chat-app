import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase/config'

function useFirestore(dataName, condition) {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    let collectionRef = collection(db, dataName)
    /**
     * {
     *  fieldName,
     *  operator,
     *  compareValue,
     * }
     */

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        setDocuments([])
        return
      }

      collectionRef = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue),
        orderBy('createdAt')
      )
    }

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))

      setDocuments(documents)
    })

    return unsubscribe
  }, [condition, dataName])

  return documents
}

export default useFirestore
