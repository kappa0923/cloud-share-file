// functions/index.js
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

exports.trackingUploadLog = functions.storage.object().onFinalize((object) => {
  const resourceState = object.resourceState;

  // 削除済みの場合は処理せず終了
  if (resourceState === 'not_exists') {
    console.info('This is a deletion event.');
    return 0;
  }

  return firestore.collection('logs')
    .add(object)
    .then(() => {
      console.log('Write log success.');
      return
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
});
