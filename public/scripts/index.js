// index.js
'use strict';

/**
 * @desc CloudShare.
 */
class CloudShare {
  /**
   * @desc Constructor
   */
  constructor() {
    this.checkSetup();

    this.fileDropDiv = document.getElementById("file-drop-area");
    this.fileNameLabel = document.getElementById("file-name");
    this.uploadButton = document.getElementById('file-upload-button');
    this.fileLink = document.getElementById('file-link');

    this.uploadButton.addEventListener('click', this.uploadClicked.bind(this));

    this.initFirebase();
  }

  /**
  * @desc Firebaseの初期設定
  */
  initFirebase() {
    this.storageRef = firebase.storage().ref();
  }

  /**
   * エリア内へのファイルドロップ時のイベントハンドラー
   * @param {Object} event dropイベント
   */
  onDrop(event) {
    console.log(event);
    event.preventDefault();
    this.fileDropDiv.classList.remove('onenter');

    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (event.dataTransfer.items[i].kind === 'file') {
          const file = event.dataTransfer.items[i].getAsFile();
          this.file = file;
          this.fileName = file.name;
          this.fileNameLabel.innerText = file.name;
          console.log('items... file[' + i + '].name = ' + file.name);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        console.log('files... file[' + i + '].name = ' + event.dataTransfer.files[i].name);
      }
    }
  }

  /**
   * エリア内でファイルをドラッグで入ったときのイベントハンドラー
   * @param {Object} event dragenterイベント
   */
  onDragEnter(event) {
    console.log(event);
    event.preventDefault();
    this.fileDropDiv.classList.add('onenter');
  }

  /**
   * エリア内からドラッグで外に出たときのイベントハンドラー
   * @param {Object} event ondragleaveイベント
   */
  onDragLeave(event) {
    console.log(event);
    event.preventDefault();
    this.fileDropDiv.classList.remove('onenter');
  }

  /**
   * エリア内でドラッグしたときのイベントハンドラー
   * @param {Object} event ondragoverイベント
   */
  onDragOver(event) {
    event.preventDefault();
  }

  /**
   * アップロードボタンを押したときの挙動
   * @param {Object} event uploadイベントハンドラー
   */
  uploadClicked(event) {
    event.preventDefault();
    if (!this.file) {
      console.error('File not found.');
      window.alert('ファイルをドロップしてください。');
      return;
    }

    // TODO: アップロード処理を実装
  }

  /**
   * @desc firebaseが正常にロードされているかのチェック
   */
  checkSetup() {
    if (!window.firebase
      || !(firebase.app instanceof Function)
      || !firebase.app().options) {
      window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions and make ' +
        'sure you are running the codelab using `firebase serve`');
    }
  }
}

window.onload = () => {
  // Initializes CloudShare class.
  window.cloudShare = new CloudShare();
};