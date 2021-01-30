import { auth, db } from './firebase';

export function addAvataaar(avatarState) {
    var user = null;
    if (auth().currentUser) {
        user = auth().currentUser.uid;
        db.ref("/users/" + user + "/avataaar/").set(avatarState);
    }
}

export function addUserName(name) {
    var user = null;
    var info = {
        nombre: name
    };
    if (auth().currentUser) {
        user = auth().currentUser.uid;
        db.ref("/users/" + user).update(info);

        /*console.log("update")
        db.ref("/users/" + user).update(info);
        console.log("write")
        db.ref("/users/" + user + "/nombre/").set(name);*/
    }
}

export function getUserInfo() {
    if (auth().currentUser) {
        var user = auth().currentUser.uid;
        return db.ref('/users/' + user).once('value')
    }else{
        return null;
    }
}

/*export function getAvataaar() {
    if (auth().currentUser) {
        var user = auth().currentUser.uid;
        return db.ref('/users/' + user).once('value')
    }else{
        return null;
    }
}*/

export function getRally() {
    return db.ref('/Rally/')
}

export function getMaterial() {
    return db.ref('/Material/')
}