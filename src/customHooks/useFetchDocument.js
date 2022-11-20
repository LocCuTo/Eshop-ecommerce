import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../firebase/config';

const useFetchDocument = (collecttionName, documentID) => {
    const [document, setDocument] = useState(null);

    const getDocument = async () => {
        const docRef = doc(db, collecttionName, documentID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log('Document data: ', docSnap.data());
            const obj = {
                id: documentID,
                ...docSnap.data(),
            };
            setDocument(obj);
        } else {
            toast.error('Document not found');
        }
    };

    useEffect(() => {
        getDocument();
    }, []);

    return { document };
};

export default useFetchDocument;
