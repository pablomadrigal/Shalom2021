import { auth, db } from './firebase';

export function addUserInfo(Name, LastName) {
    if (!auth.currentUser) {
        return alert('Not authorized')
    }
    //var user = auth.currentUser.uid;
    return db.ref(`users/`).set({
        user: {
            name: Name,
            lastName: LastName
        }
    });
}

export function addNewMask(id) {
    var user = null;
    if (auth().currentUser) {
        user = auth().currentUser.uid;
        db.ref("/users/" + user + "/masks/" + id).set(0);
    }
    var mask = {
        userId: user,
        maskUses: 50
    }
    db.ref("/masks/" + id).set(mask);
}

export function updateMaskUses(id) {

}