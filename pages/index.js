import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Input from "../components/Input";
import Button from "../components/Button";
import Wrapper from "../components/Wrapper";
import SocialLinks from "../components/SocialLinks";
import useToast from "../hooks/useToast";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const [loginError, setLoginError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [pinError, setPinError] = React.useState(false);

  const [pinUsuario, setPinUsuario] = React.useState("");
  const [userId, setUserId] = React.useState("");

  const [pinValido, setPinValido] = React.useState(false);

  const inputPinREF = React.useRef(null);
  const inputEmailREF = React.useRef(null);
  const inputPasswordREF = React.useRef(null);
  const inputConfirmPasswordREF = React.useRef(null);

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

  // showToast({
  //   type: 'error',
  //   message: 'toast ja em uso!'
  // });
  // showToast({
  //   type: 'success',
  //   message: 'toast validado com sucesso!'
  // });

  async function handleLogin() {
    let error = false;
    const password = inputPasswordREF.current?.value;
    const email = inputEmailREF.current?.value;

    const reEmailValidate =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (password.length < 5) {
      setPasswordError(true);
      error = true;
    }

    if (email.length === 0 || !reEmailValidate.test(email)) {
      setLoginError(true);
      error = true;
    }

    if (error) return;

    if (userId) {
      signWithEmailAndPassword({
        email,
        password,
        userId,
      })
        .then((isValid) => {
          console.log("logado com sucesso e vinculado");
        })
        .catch((err) => {
          showToast({
            type: "error",
            message: "Usuário inválido!",
          });
        });
    } else {
      registerWithEmailAndPassword({
        email,
        password,
        pin: pinUsuario,
      })
        .then((isValid) => {
          console.log("registrado e vinculado");
        })
        .catch((err) => {
          showToast({
            type: "error",
            message: "Usuário inválido!",
          });
        });
    }
  }

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

  const handleGoogleAuth = React.useCallback(() => {
    console.log("asdfgasd");
    siginWithGoogle({
      userId,
      pin: pinUsuario
    })
  }, [siginWithGoogle, userId, pinUsuario]);

  const handleFacebookAuth = React.useCallback(() => {
    siginWithFacebook({
      userId,
      pin: pinUsuario
    })
  }, [siginWithFacebook, pinUsuario, userId]);

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

  const FormLogin = () => {
    return (
      <>
        <Input error={false} ref={inputEmailREF} placehold="E-mail" />
        <Input
          error={false}
          type="password"
          ref={inputPasswordREF}
          placehold="Sua senha"
        />
        {!userId && (
          <Input
            error={false}
            type="password"
            ref={inputConfirmPasswordREF}
            placehold="Confirmar senha"
          />
        )}

        <Button label="Entrar" onClick={handleLogin} />
        <section
          style={{
            padding: 20,
          }}
        >
          <a className="forgot text-muted" href="#">
            Esqueceu sua senha?
          </a>
        </section>
        <SocialLinks
          onFacebookClick={handleFacebookAuth}
          onGoogleClick={handleGoogleAuth}
        />
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
          <p className="text-muted">
            {userId ? "Entre com suas credênciais" : "Registre sua conta"}
          </p>

          {loading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <>{pinValido ? <FormLogin /> : <FormInicial />}</>
          )}
        </Wrapper>
      </div>
    </div>
  );
}
