import * as firebase from 'firebase';  
//ProdDb
const config = {  
    apiKey: "AIzaSyAgcvAlmTb95qMuzGkTju9x_Xw29JYlrtY",
    authDomain: "bhamhockey-5bb48.firebaseapp.com",
    databaseURL: "https://bhamhockey-5bb48.firebaseio.com",
    projectId: "bhamhockey-5bb48",
    storageBucket: "bhamhockey-5bb48.appspot.com",
    messagingSenderId: "683337115923"
};

//TestDb
// const config = {
//     apiKey: "AIzaSyAQgKie-iuLuPg1RjK7-fOKwh-OmpoS3aE",
//     authDomain: "physicianhub.firebaseapp.com",
//     databaseURL: "https://physicianhub.firebaseio.com",
//     projectId: "physicianhub",
//     storageBucket: "physicianhub.appspot.com",
//     messagingSenderId: "443501841460",
//     appId: "1:443501841460:web:c19d96dbd120f120"
// }

export default class Firebase{
    static auth;
    static registrationInfo = {
        displayName: "",
        email: "",
        
    };

    static init() {
        firebase.initializeApp(config);
        //Firebase.auth = firebase.auth();
    }
}
