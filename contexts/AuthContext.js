import React from "react";
import firebase from "../lib/firebase";
import nookies, { parseCookies } from "nookies";

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
              if (usr.user.uid !== userId) {
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
              if (usr.user.uid !== userId) {
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
        .finally(() => setLoading(false));
    },
    [vincularUserIdAoPin]
  );

  const signWithEmailAndPassword = React.useCallback(
    ({ email, password, userId = "", pin }) => {
      setLoading(true);
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((usr) => {
          return new Promise((resolv, reject) => {
            if (userId) {
              if (usr.user.uid !== userId) {
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
        .finally(() => {
          setLoading(false);
        });
    },
    [vincularUserIdAoPin]
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
        // pin registrado porém não atribuido a nenhum usuário
        if (!userId) return true;

        return userId;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const signOut = React.useCallback(() => {
    return firebase.auth().signOut();
  }, []);

  React.useEffect(() => {
    return firebase.auth().onIdTokenChanged((usr) => {
      setLoading(true);

      try {
        if (!usr) {
          console.log(usr);
          setUser(null);
          nookies.set(undefined, "token", "", {
            path: "/",
          });

          return;
        }
        const tokenAuth = parseCookies(undefined, ["token"]);
        if (!tokenAuth?.token) {
          return nookies.set(undefined, "token", JSON.stringify(usr), {
            path: "/",
            secure: true,
            maxAge: 10 * 60 * 4, //4 horas
          });
        }
      } finally {
        setLoading(false);
      }
    });
  }, []);

  React.useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebase.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000); // forçar revalidação de 10 em 10 minutos

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        siginWithGoogle,
        siginWithFacebook,
        signWithEmailAndPassword,
        registerWithEmailAndPassword,
        pinValidate,
        signOut,
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
