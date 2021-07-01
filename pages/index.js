import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Input from "../components/Input";
import Button from "../components/Button";
import Wrapper from "../components/Wrapper";
import SocialLinks from "../components/SocialLinks";
import useToast from "../hooks/useToast";
import useAuth from "../hooks/useAuth";

const FormLoginInputs = ({
  handleLogin,
  handleRegister,
  handleFacebookAuth,
  handleGoogleAuth,
  handleForgotPassword,
  register = false,
}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [remenberCredentials, setRemenberCredentials] = React.useState(false);
  const [formState, setFormState] = React.useState("login");

  const Register = React.useMemo(
    () => (
      <div className="form-group mb-3">
        <label htmlFor="cfg-pwd">Confirmar sua senha: </label>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          className="form-control"
          id="cfg-pwd"
        />
      </div>
    ),
    [confirmPassword]
  );

  const handleChangeForm = React.useCallback(() => {
    if (formState === "login" && !register) return;

    setFormState((old) => (old === "login" ? "register" : "login"));
  }, [formState, register]);

  const handleSubmit = React.useCallback(() => {
    if (formState === "login") {
      const sucess = handleLogin({
        email,
        password,
      });

      console.log(sucess);
      if (sucess) {
        if (remenberCredentials && email && password) {
          localStorage.setItem(
            "@seja-sid",
            JSON.stringify({
              remenberItens: {
                email,
                password,
              },
            })
          );
        }
      }

      return;
    }

    const sucess = handleRegister({
      email,
      password,
      confirmPassword,
    });

    if (sucess) {
      if (remenberCredentials && email && password) {
        localStorage.setItem(
          "@seja-sid",
          JSON.stringify({
            remenberItens: {
              email,
              password,
            },
          })
        );
      }
    }
  }, [
    confirmPassword,
    email,
    formState,
    handleLogin,
    handleRegister,
    password,
    remenberCredentials,
  ]);

  React.useEffect(() => {
    const itens = localStorage.getItem("@seja-sid");

    if (itens) {
      const { remenberItens } = JSON.parse(itens);

      const { email, password } = remenberItens;
      setEmail(email);
      setPassword(password);
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        padding: "10px 30px",
        textAlign: "left",
      }}
    >
      <div className="form-group mb-3">
        <label htmlFor="email">Endereço de email:</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
          id="email"
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="pwd">Sua senha: </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
          id="pwd"
        />
      </div>
      {formState === "register" && Register}
      <div className="checkbox">
        <label>
          <input
            value={remenberCredentials}
            onChange={(_) => setRemenberCredentials((old) => !old)}
            type="checkbox"
          />{" "}
          Lembrar credênciais
        </label>
      </div>
      <div
        className="d-grid gap-2"
        style={{
          width: "100%",
          padding: 20,
        }}
      >
        <button className="btn btn-primary btn-lg" onClick={handleSubmit}>
          Enviar
        </button>
        {register && (
          <button
            className="btn btn-secondary btn-lg"
            onClick={handleChangeForm}
          >
            {formState === "register" ? "Voltar" : "Registrar-se"}
          </button>
        )}
        <button onClick={handleFacebookAuth} className="fb btn">
          <i className="fab fa-facebook-f"></i> Entrar com facebook
        </button>
        <button onClick={handleGoogleAuth} className="google btn">
          <i className="fab fa-google"></i> Entrar com google
        </button>
        <section
          style={{
            padding: 20,
            textAlign: "center",
          }}
        >
          <button
            onClick={handleForgotPassword}
            className="forgot text-muted"
            href="#"
          >
            Esqueceu sua senha?
          </button>
        </section>
      </div>
    </div>
  );
};

export default function Home() {
  const [pinError, setPinError] = React.useState(false);

  const [pinUsuario, setPinUsuario] = React.useState("");
  const [userId, setUserId] = React.useState("");

  const [pinValido, setPinValido] = React.useState(false);

  const inputPinREF = React.useRef(null);
  const reEmailValidate = React.useMemo(() => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }, []);

  const router = useRouter();

  const {
    loading,
    signWithEmailAndPassword,
    registerWithEmailAndPassword,
    siginWithGoogle,
    siginWithFacebook,
    pinValidate,
  } = useAuth();

  const { showToast, handleDevide } = useToast();
  async function handleValidatePin() {
    const pin = inputPinREF.current?.value;
    setPinError(false);

    if (!pin) {
      setPinError(true);
      return;
    }

    pinValidate({
      pin,
    }).then((isValid) => {
      if (!isValid) {
        setPinError(true);
        showToast({
          type: "error",
          message: "código pin inválido",
        });

        return;
      }

      if (typeof isValid === "string") {
        setUserId(isValid);
      }

      setPinValido(true);
      setPinUsuario(pin);
      return;
    });
  }

  const handleLogin = React.useCallback(
    ({ email, password }) => {
      let error = false;

      if (password.length < 5) {
        showToast({
          type: "error",
          message: "Senha não pode ser menor que 5 digítos",
        });
        error = true;
      }

      if (!reEmailValidate.test(email)) {
        showToast({
          type: "error",
          message: "Formato do e-mail inválido",
        });
        error = true;
      }

      if (error) return false;

      //email, password, userId="", pin
      return signWithEmailAndPassword({
        email,
        password,
        userId,
        pin: pinUsuario,
      })
        .then((_) => {
          console.log("logado com sucesso e vinculado");
          return true;
        })
        .catch((err) => {
          console.log(err.message)
          showToast({
            type: "error",
            message: 'Credênciais inválidas',
          });

          return false;
        });
    },
    [pinUsuario, reEmailValidate, showToast, signWithEmailAndPassword, userId]
  );

  const handleRegister = React.useCallback(
    ({ email, password, confirmPassword }) => {
      let error = false;
      if (password.length < 5) {
        showToast({
          type: "error",
          message: "Senha não pode ser menor que 5 digítos",
        });
        error = true;
      }

      if (password !== confirmPassword) {
        showToast({
          type: "error",
          message: "Senhas não conferem",
        });
        error = true;
      }

      if (!reEmailValidate.test(email)) {
        showToast({
          type: "error",
          message: "Formato do e-mail inválido",
        });
        error = true;
      }

      if (error) return false;

      return registerWithEmailAndPassword({
        email,
        password,
        pin: pinUsuario,
      })
        .then((isValid) => {
          console.log("registrado e vinculado");
          return true;
        })
        .catch((err) => {
          if (
            err.message ===
            "The email address is already in use by another account."
          ) {
            showToast({
              type: "error",
              message: "Essa conta já esta vinculada a um código PIN",
            });
          } else {
            showToast({
              type: "error",
              message: "Usuário inválido",
            });
          }

          return false;
        });
    },
    [pinUsuario, reEmailValidate, registerWithEmailAndPassword, showToast]
  );

  const handleGoogleAuth = React.useCallback(() => {
    siginWithGoogle({
      userId,
      pin: pinUsuario,
    })
      .then((_) => {
        console.log("logado com sucesso e vinculado");
        return true;
      })
      .catch((err) => {
        console.log("asdfasdfse ", err);
        showToast({
          type: "error",
          message: err,
        });

        return false;
      });
  }, [siginWithGoogle, userId, pinUsuario, showToast]);

  const handleFacebookAuth = React.useCallback(() => {
    siginWithFacebook({
      userId,
      pin: pinUsuario,
    })
      .then((_) => {
        console.log("logado com sucesso e vinculado");
        return true;
      })
      .catch((err) => {
        showToast({
          type: "error",
          message: err,
        });

        return false;
      });
  }, [siginWithFacebook, userId, pinUsuario, showToast]);

  const FormInicial = () => {
    return (
      <>
        <Input
          error={pinError}
          onChange={(e) => setPinId(e)}
          ref={inputPinREF}
          placehold="Pin"
        />
        <Button label="Validar" onClick={handleValidatePin} />
      </>
    );
  };

  React.useEffect(() => {
    function converterTipoDeDispositivo() {
      handleDevide({
        device: navigator.maxTouchPoints,
      });
    }

    window.addEventListener("resize", (_) => {
      converterTipoDeDispositivo();
    });

    converterTipoDeDispositivo();
  }, [handleDevide]);

  return (
    <div>
      <Head>
        <title>Entre na plataforma</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main">
        <Wrapper title="SID">
          {loading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <>
              {pinValido ? (
                <FormLoginInputs
                  handleLogin={handleLogin}
                  handleRegister={handleRegister}
                  handleFacebookAuth={handleFacebookAuth}
                  handleGoogleAuth={handleGoogleAuth}
                  register={!userId}
                />
              ) : (
                <FormInicial />
              )}
            </>
          )}
        </Wrapper>
      </div>
    </div>
  );
}
