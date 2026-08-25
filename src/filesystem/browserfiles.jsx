const DB_NAME = 'sora-filesystem'
const DB_VERSION = 1
const STORE_NAME = 'files'

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(
      DB_NAME,
      DB_VERSION
    )

    request.onupgradeneeded = () => {
      const db = request.result

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: 'path',
        })
      }
    }

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}


/*
  CREATE FILE
*/

export async function createFile(path, content = '') {

  const db = await openDatabase()

  return new Promise((resolve, reject) => {

    const transaction = db.transaction(
      STORE_NAME,
      'readwrite'
    )

    const store =
      transaction.objectStore(STORE_NAME)

    store.put({
      path,
      name: path.split('/').pop(),
      type: 'file',
      content,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    })

    transaction.oncomplete = () => {
      resolve()
    }

    transaction.onerror = () => {
      reject(transaction.error)
    }
  })
}


/*
  READ ONE FILE
*/

export async function readFile(path) {

  const db = await openDatabase()

  return new Promise((resolve, reject) => {

    const transaction = db.transaction(
      STORE_NAME,
      'readonly'
    )

    const store =
      transaction.objectStore(STORE_NAME)

    const request = store.get(path)

    request.onsuccess = () => {
      resolve(request.result || null)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}


/*
  WRITE / UPDATE FILE
*/

export async function writeFile(
  path,
  content
) {

  const existing = await readFile(path)

  if (!existing) {
    await createFile(path, content)
    return
  }

  const db = await openDatabase()

  return new Promise((resolve, reject) => {

    const transaction = db.transaction(
      STORE_NAME,
      'readwrite'
    )

    const store =
      transaction.objectStore(STORE_NAME)

    store.put({
      ...existing,
      content,
      modifiedAt: Date.now(),
    })

    transaction.oncomplete = () => {
      resolve()
    }

    transaction.onerror = () => {
      reject(transaction.error)
    }
  })
}


/*
  DELETE FILE
*/

export async function deleteFile(path) {

  const db = await openDatabase()

  return new Promise((resolve, reject) => {

    const transaction = db.transaction(
      STORE_NAME,
      'readwrite'
    )

    const store =
      transaction.objectStore(STORE_NAME)

    store.delete(path)

    transaction.oncomplete = () => {
      resolve()
    }

    transaction.onerror = () => {
      reject(transaction.error)
    }
  })
}


/*
  GET ALL FILES
*/

export async function getAllFiles() {

  const db = await openDatabase()

  return new Promise((resolve, reject) => {

    const transaction = db.transaction(
      STORE_NAME,
      'readonly'
    )

    const store =
      transaction.objectStore(STORE_NAME)

    const request = store.getAll()

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}