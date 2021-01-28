import { auth, db } from './firebase';

export function addAvataaar(avatarState) {
    var user = null;
    if (auth().currentUser) {
        user = auth().currentUser.uid;
        db.ref("/users/" + user + "/avataaar/").set(avatarState);
    }
}

export function addUserInfo(nombre) {
    var user = null;
    if (auth().currentUser) {
        user = auth().currentUser.uid;
        db.ref("/users/" + user + "/nombre/").set(nombre);
    }
}

export function getAvataaar() {
    if (auth().currentUser) {
        var user = auth().currentUser.uid;
        return db.ref('/users/' + user).once('value')
    }else{
        return null;
    }
}

export function getRally() {
    return db.ref('/Rally/').once('value')
}