import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import { saveDocumentLocally, getDocumentLocally } from './index-db';
import firebaseConfig from '../../configs/firebase-config';

export const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.apps[0];

export const saveDocument = (collectionPath, documentId, data) => {
  if (navigator.onLine) {
    return firebaseApp
      .firestore()
      .collection(collectionPath)
      .doc(documentId)
      .set(data);
  }

  return saveDocumentLocally(collectionPath, documentId, data);
};

export const getDocument = async (collectionPath, documentId) => {
  if (navigator.onLine) {
    const doc = await firebaseApp
      .firestore()
      .collection(collectionPath)
      .doc(documentId)
      .get();
    const docData = doc.data();

    await saveDocumentLocally(collectionPath, documentId, docData);
    return docData;
  }

  return getDocumentLocally(collectionPath, documentId);
};

export const getAllDocumentsInCollection = async collectionPath => {
  const snapshot = await firebase
    .firestore()
    .collection(collectionPath)
    .get();

  return await Promise.all(
    snapshot.docs.map(async doc => {
      const data = doc.data();
      data.id = doc.id;
      data.collectionPath = collectionPath;
      await saveDocumentLocally(collectionPath, doc.id, data);
      return data;
    })
  );
};
