import { openDB } from 'idb';

const getDB = () => {
  return openDB('firecache', '1.0', {
    upgrade: db => {
      db.createObjectStore('collections');
      db.createObjectStore('state');
    },
  });
};

export const saveDocumentLocally = async (collectionPath, documentId, data) => {
  const db = await getDB();

  if (collectionPath[collectionPath.length - 1] !== '/') {
    collectionPath += '/';
  }

  console.log(collectionPath);
  console.log(data);
  console.log(documentId);

  data.documentId = documentId;

  return db.put('collections', data, collectionPath + documentId);
};

export const getDocumentLocally = async (collectionPath, documentId) => {
  const db = await getDB();

  if (documentId !== undefined) {
    if (collectionPath[collectionPath.length - 1] !== '/') {
      collectionPath += '/';
    }
    return db.get('collections', collectionPath + documentId);
  }

  return db.get('collections', collectionPath);
};

export const deleteDocumentLocally = async (collectionPath, documentId) => {
  const db = await getDB();

  if (collectionPath[collectionPath.length - 1] !== '/') {
    collectionPath += '/';
  }

  return db.delete(collectionPath, collectionPath + documentId);
};

export const getTotalLocalCollections = async () => {
  const db = await openDB('firecache', '1.0');
  return db.getAllKeys('collections');
};

export async function saveSettings(settingsData) {
  const db = await getDB();
  return db.put('state', settingsData, 'settings');
}

export async function getSettings() {
  const db = await getDB();
  return db.get('state', 'settings');
}

export async function getFirstCollectionKey() {
  const db = await getDB();
  return db.getFromIndex('collections', 0);
}

export async function getFieldAppState() {
  const db = await getDB();
  return db.get('state', 'fieldAppState');
}

export async function saveFieldAppState(fieldAppState) {
  const db = await getDB();
  return db.put('state', fieldAppState, 'fieldAppState');
}
