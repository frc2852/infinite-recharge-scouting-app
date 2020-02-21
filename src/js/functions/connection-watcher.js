import { getTotalLocalCollections, getDocumentLocally } from "./index-db";
import { saveRobotEventDocumentsToFirestore } from "./firebase-app";

export default () => {
    window.addEventListener("online", async () => {
        const collections = await getTotalLocalCollections();
        const docPromises = collections
            .filter(collectionPath => collectionPath.indexOf('robots') > -1)
            .map(async collectionPath => {
                const doc = await getDocumentLocally(collectionPath);
                doc.documentPath = collectionPath;
                return doc; 
            });

        const docs = await Promise.all(docPromises);
        
        try {
            await saveRobotEventDocumentsToFirestore(docs);
        } catch(e) {
            console.error(e);
        }
    });
}
