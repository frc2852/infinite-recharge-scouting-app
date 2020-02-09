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

  data.documentId = documentId;

  return db.put('collections', data, collectionPath + documentId);
};

export const getDocumentLocally = async (collectionPath, documentId) => {
  const db = await getDB();

  if (collectionPath[collectionPath.length - 1] !== '/') {
    collectionPath += '/';
  }

  return db.get('collections', collectionPath + documentId);
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
