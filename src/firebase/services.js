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

export function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
  str = str.replace(/Đ/g, 'D')

  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, '') // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư

  str = str.replace(/ + /g, ' ')
  str = str.trim()

  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ')
  return str
}

// tao keywords cho displayName, su dung cho search
export const generateKeywords = (displayName) => {
  // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
  // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
  const name = removeVietnameseTones(displayName)
    .toLowerCase()
    .split(' ')
    .filter((word) => word)

  const nameHaveTone = displayName
    .toLowerCase()
    .split(' ')
    .filter((word) => word)

  const mapAndGenKeywords = (name) => {
    const length = name.length
    let flagArray = []
    let result = []
    let stringArray = []

    /**
     * khoi tao mang flag false
     * dung de danh dau xem gia tri
     * tai vi tri nay da duoc su dung
     * hay chua
     **/
    for (let i = 0; i < length; i++) {
      flagArray[i] = false
    }

    const createKeywords = (name) => {
      const arrName = []
      let curName = ''
      name.split('').forEach((letter) => {
        curName += letter
        arrName.push(curName)
      })
      return arrName
    }

    function findPermutation(k) {
      for (let i = 0; i < length; i++) {
        if (!flagArray[i]) {
          flagArray[i] = true
          result[k] = name[i]

          if (k === length - 1) {
            stringArray.push(result.join(' '))
          }

          findPermutation(k + 1)
          flagArray[i] = false
        }
      }
    }

    findPermutation(0)

    const keywords = stringArray.reduce((acc, cur) => {
      const words = createKeywords(cur)
      return [...acc, ...words]
    }, [])

    return new Set(keywords)
  }

  const uniqueSet = new Set([...mapAndGenKeywords(name), ...mapAndGenKeywords(nameHaveTone)])

  const uniqueKeywords = [...uniqueSet]

  return uniqueKeywords
}
