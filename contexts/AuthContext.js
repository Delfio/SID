import React from "react";
import firebase from "../lib/firebase";

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // vincular userId ao
  const vincularUserIdAoPin = React.useCallback(({ idUser, pin }) => {
    return firebase
      .firestore()
      .collection("pins")
      .where("pinId", "==", pin)
      .get()
      .then((element) => {
        if (element.empty) return false;

        const { userId } = element.docs[0].data();

        // Pin já registrado
        if (userId) return false;

        return Promise.resolve(
          element.docs[0].ref
            .update({
              userId: idUser,
            })
            .then(() => true)
        );
      });
  }, []);

  const siginWithFacebook = React.useCallback(
    ({ userId = "", pin }) => {
      setLoading(true);
      return firebase
        .auth()
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((usr) => {
          return new Promise((resolv, reject) => {
            if (userId) {
              if (usr.user.uid === userId) {
                firebase.auth().signOut();
                setUser(null);

                return reject("usuário não vinculado a este ID");
              }

              return resolv(usr.user);
            }

            return vincularUserIdAoPin({
              idUser: usr.user.uid,
              pin,
            }).then((isValid) => {
              if (!isValid) return reject("PIN inválido"); // isso não é pra acontecer rsrs

              return resolv(usr.user);
            });
          });
        })
        .then((usr) => {
          setUser(usr);
        })
        .finally(() => setLoading(false));
    },
    [vincularUserIdAoPin]
  );

  const siginWithGoogle = React.useCallback(
    ({ userId = "", pin }) => {
      setLoading(true);
      return firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((usr) => {
          return new Promise((resolv, reject) => {
            if (userId) {
              if (usr.user.uid === userId) {
                firebase.auth().signOut();
                setUser(null);

                return reject("usuário não vinculado a este ID");
              }

              return resolv(usr.user);
            }

            return vincularUserIdAoPin({
              idUser: usr.user.uid,
              pin,
            }).then((isValid) => {
              if (!isValid) return reject("PIN inválido"); // isso não é pra acontecer rsrs

              return resolv(usr.user);
            });
          });
        })
        .then((usr) => {
          setUser(usr);
        })
        .finally(() => setLoading(false));
    },
    [vincularUserIdAoPin]
  );

  const signWithEmailAndPassword = React.useCallback(
    ({ email, password, userId }) => {
      setLoading(true);
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((usr) => {
          if (usr.user.uid === userId) {
            firebase.auth().signOut();
            setUser(null);

            return false;
          }
          setUser(usr.user);
          return true;
        })
        .finally(() => {
          setLoading(false);
        });
    },
    []
  );

  const registerWithEmailAndPassword = React.useCallback(
    ({ email, password, pin }) => {
      setLoading(true);
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((usr) => {
          return Promise.resolve(
            vincularUserIdAoPin({
              idUser: usr.user.uid,
              pin,
            }).then(() => usr.user)
          );
        })
        .then((usr) => {
          setUser(usr);
        })
        .finally(() => setLoading(false));
    },
    [vincularUserIdAoPin]
  );

  // valida se o pin existe
  const pinValidate = React.useCallback(({ pin }) => {
    setLoading(true);
    return firebase
      .firestore()
      .collection("pins")
      .where("pinId", "==", pin)
      .get()
      .then((docs) => {
        if (docs.empty) return false;
        const { userId } = docs.docs[0].data();

        console.log(userId);
        // pin registrado porém não atribuido a nenhum usuário
        if (!userId) return true;

        return userId;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        siginWithGoogle,
        siginWithFacebook,
        signWithEmailAndPassword,
        registerWithEmailAndPassword,
        pinValidate,
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;
