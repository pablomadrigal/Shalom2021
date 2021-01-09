import { auth } from './firebase';

export function signup(email, password) {
    return auth().createUserWithEmailAndPassword(email, password);
}

export function signinRemember(email, password) {
    return auth().setPersistence(auth.Auth.Persistence.LOCAL).then(function() {

        return auth().signInWithEmailAndPassword(email, password);
      })
      .catch(function(error) {
        alert(error.message)
      })
}

export function signinNoRemember(email, password) {
    return auth().setPersistence(auth.Auth.Persistence.SESSION).then(function() {
        return auth().signInWithEmailAndPassword(email, password);
      })
      .catch(function(error) {
        alert(error.message)
      })
}