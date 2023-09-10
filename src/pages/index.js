import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../firebase/firebaseConfig';


const generateHTML = (data, i) => {
  const { html_tag, content, styles } = data;
  const className = styles || '';
  const uniqueKey = `elem-${i}`;
  
  if (Array.isArray(content)) {
    return React.createElement(
      html_tag,
      { key: uniqueKey, className },
      content.map((item, index) => generateHTML(item, `${uniqueKey}-${index}`))
    );
  } else if (typeof content === 'object') {
    return React.createElement(
      html_tag,
      { key: uniqueKey, className },
      generateHTML(content, uniqueKey)
    );
  } else {
    return React.createElement(
      html_tag,
      { key: uniqueKey, className },
      content
    );
  }
};


export default function Home() {
  const [contentData, setContentData] = useState(null);
  const db = getFirestore(app);

  useEffect(() => {
    const docRef = doc(db, 'home', 'home_doc'); // reference to a document

    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        setContentData(docSnap.data().content);
      } else {
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  }, [db]);

  return (
    <div>
      {contentData && contentData.map((data, index) => generateHTML(data, index))}
    </div>
  );
}
