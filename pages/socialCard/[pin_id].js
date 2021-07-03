import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import SocialCardStyle from "./social_card.module.css";
import { Fab, Action } from "react-tiny-fab";
import useToast from "../../hooks/useToast";
import { parseCookies } from "nookies";
import firebase from "../../lib/firebase";
import BgCard from "../../components/BackgroundCard";

export default function SocialCard(props) {
  const [bg, setBg] = React.useState(2);

  const [nome, setNome] = React.useState("");
  const [facebook, setFacebook] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [instagram, setInstagram] = React.useState("");
  const [whatsapp, setWhatsapp] = React.useState("");
  const [pix, setPix] = React.useState("");
  const [site, setSite] = React.useState("");
  const [tiktok, setTikTok] = React.useState("");
  const [endereco, setEndereco] = React.useState("");
  const [youtube, setYoutube] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [facebookValido, setFacebookValido] = React.useState(true);
  const [telefoneValido, setTelefoneValido] = React.useState(true);
  const [instagramValido, setInstagramValido] = React.useState(true);
  const [whatsappValido, setWhatsappValido] = React.useState(true);
  const [pixValido, setPixValido] = React.useState(true);
  const [siteValido, setSiteValido] = React.useState(true);
  const [tiktokValido, setTikTokValido] = React.useState(true);
  const [enderecoValido, setEnderecoValido] = React.useState(true);
  const [youtubeValido, setYoutubeValido] = React.useState(true);
  const [emailValido, setEmailValido] = React.useState(true);

  const router = useRouter();

  const { pin_id } = router.query;
  const { uid } = props.user;

  const { showToast, handleDevide } = useToast();

  const handleSave = React.useCallback(() => {
    const data = (() => {
      const result = {};

      if (facebookValido) {
        result.facebook = facebook;
      }
      if (telefoneValido) {
        result.telefone = telefone;
      }
      if (instagramValido) {
        result.instagram = instagram;
      }
      if (whatsappValido) {
        result.whatsapp = whatsapp;
      }
      if (pixValido) {
        result.pix = pix;
      }
      if (siteValido) {
        result.site = site;
      }
      if (tiktokValido) {
        result.tiktok = tiktok;
      }
      if (enderecoValido) {
        result.endereco = endereco;
      }
      if (youtubeValido) {
        result.youtube = youtube;
      }
      if (emailValido) {
        result.email = email;
      }

      return {
        bg,
        nome,
        pinId: pin_id,
        userId: uid,
        ...result,
      };
    })();

    firebase
      .firestore()
      .collection("perfis")
      .where("pinId", "==", pin_id)
      .where("userId", "==", uid)
      .get()
      .then((perfil) => {
        if (perfil.empty) {
          return firebase.firestore().collection("perfis").doc().set(data);
        }

        return perfil.docs[0].ref.update(data);
      })
      .then((_) => {
        showToast({
          type: "success",
          message: "perfil salvo com sucesso",
        });
      })
      .catch((err) => {
        showToast({
          type: "error",
          message: "Ocorreu um erro ao registrar suas alterações!",
        });
      });
  }, [
    pin_id,
    uid,
    facebookValido,
    telefoneValido,
    instagramValido,
    whatsappValido,
    pixValido,
    siteValido,
    tiktokValido,
    enderecoValido,
    youtubeValido,
    emailValido,
    bg,
    nome,
    facebook,
    telefone,
    instagram,
    whatsapp,
    pix,
    site,
    tiktok,
    endereco,
    youtube,
    email,
    showToast,
  ]);

  const handleAlterBG = React.useCallback(() => {
    setBg((oldBg) => {
      if (oldBg === 6) return 1;
      return oldBg + 1;
    });
  }, []);

  const handleExibirCartao = React.useCallback(() => {
    router.push(`/card/${pin_id}`);
  }, [router, pin_id]);

  const handleChangeData = React.useCallback((data) => {
    const {
      email,
      endereco,
      facebook,
      instagram,
      nome,
      pix,
      site,
      telefone,
      tiktok,
      whatsapp,
      youtube,
      bg,
    } = data;

    if (facebook) {
      setFacebook(facebook);
    } else {
      setFacebook("");
    }

    if (instagram) {
      setInstagram(instagram);
    } else {
      setInstagram("");
    }

    if (nome) {
      setNome(nome);
    } else {
      setNome("");
    }
    if (pix) {
      setPix(pix);
    } else {
      setPix("");
    }
    if (site) {
      setSite(site);
    } else {
      setSite("");
    }
    if (telefone) {
      setTelefone(telefone);
    } else {
      setTelefone("");
    }
    if (tiktok) {
      setTikTok(tiktok);
    } else {
      setTikTok("");
    }
    if (whatsapp) {
      setWhatsapp(whatsapp);
    } else {
      setWhatsapp("");
    }

    if (youtube) {
      setYoutube(youtube);
    } else {
      setYoutube("");
    }

    if (email) {
      setEmail(email);
    } else {
      setEmail("");
    }
    if (endereco) {
      setEndereco(endereco);
    } else {
      setEndereco("");
    }

    if (bg) {
      setBg(bg);
    } else {
      setBg(1);
    }
  }, []);

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

  const handleLinksBlur = React.useCallback(
    (e, type) => {
      if(!e) return true;

      const re =
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
      const linkIsValid = re.test(e);

      if (!linkIsValid) {
        showToast({
          type: "error",
          message: `Link do ${type} com formato inválido!`,
        });

        return false;
      }
    },
    [showToast]
  );

  const handleEmailBlur = React.useCallback(
    (e) => {
      setEmailValido(true);
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const emailIsValid = re.test(e);
      if (!emailIsValid) {
        showToast({
          type: "error",
          message: "Email inválido !",
        });

        setEmailValido(false);
      }
    },
    [showToast]
  );

  const handlePhoneBlur = React.useCallback(
    (ph, type) => {
      const isValidNumber = String(ph.trim());
      if (isNaN(isValidNumber)) {
        showToast({
          type: "error",
          message: `Insira somente números no campo de ${type}`,
        });

        return false;
      }
    },
    [showToast]
  );

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("pins")
      .where("pinId", "==", pin_id)
      .where("userId", "==", uid)
      .get()
      .then((profile) => {
        if (profile.empty) {
          showToast({
            type: "error",
            message: "Pin não registrado!",
          });

          router.push("/sorry");
        }
      });

    const handler = firebase
      .firestore()
      .collection("perfis")
      .where("pinId", "==", pin_id)
      .where("userId", "==", uid)
      .onSnapshot((observer) => {
        if (observer.empty) return;

        handleChangeData(observer.docs[0].data());
      });

    return () => handler;
  }, [pin_id, uid, handleChangeData, showToast, router]);

  return (
    <>
      <main className={SocialCardStyle.container}>
        <Fab
          style={{ bottom: 0, right: 0 }}
          icon="SID"
          mainButtonStyles={{
            backgroundColor: "#5E43C3",
          }}
          alwaysShowTitle
          event="click"
        >
          <Action
            style={{
              backgroundColor: "#00A2DC",
            }}
            text="Mudar Background"
            onClick={handleAlterBG}
          >
            <i className="fas fa-copy"></i>
          </Action>
          <Action
            style={{
              backgroundColor: "#00A2DC",
            }}
            text="Ver cartão"
            onClick={handleExibirCartao}
          >
            <i className="fas fa-copy"></i>
          </Action>
        </Fab>
        <BgCard bg={bg}>
          <section className={SocialCardStyle.WrapperImgProfile}>
            <div className={SocialCardStyle.ContainerImgProfile}>
              <Image
                src="data:image/jpeg;base64,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"
                alt="profile"
                className="rounded"
                width="full"
                height="full"
              />
            </div>
          </section>
          <section className={SocialCardStyle.ContainerName}>
            <div className="input-group mb-3">
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="form-control"
                placeholder="Nome do cartão"
                aria-label="Nome do cartão"
              />
            </div>
          </section>
          <section className={SocialCardStyle.ContainerInfos}>
            <div className="input-group mb-3">
              <input
                type="text"
                value={facebook}
                onBlur={(e) => {
                  setFacebookValido(true);
                  if (!handleLinksBlur(e.target.value, 'Facebook')) {
                    setFacebookValido(false);
                  }
                }}
                onChange={(e) => setFacebook(e.target.value)}
                className="form-control"
                placeholder="Facebook"
                aria-label="Facebook"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="number"
                value={telefone}
                onBlur={(e) => handlePhoneBlur(e.target.value)}
                onChange={(e) => setTelefone(e.target.value)}
                className="form-control"
                placeholder="Telefone"
                aria-label="Telfone"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                value={instagram}
                onBlur={(e) => {
                  setInstagramValido(true);
                  if(!handleLinksBlur(e.target.value, 'Instagram')) {
                    setInstagramValido(false);
                  }
                }}
                onChange={(e) => setInstagram(e.target.value)}
                className="form-control"
                placeholder="Instagram"
                aria-label="Instagram"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="number"
                value={whatsapp}
                onBlur={(e) => handlePhoneBlur(e.target.value)}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="form-control"
                placeholder="Whatsapp"
                aria-label="Whatsapp"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                value={pix}
                onChange={(e) => setPix(e.target.value)}
                className="form-control"
                placeholder="Pix"
                aria-label="Pix"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                value={site}
                onBlur={(e) => {
                  setEmailValido(true)
                  if(!handleLinksBlur(e.target.value, 'Site')) {
                    setEmailValido(false)
                  }
                }}
                onChange={(e) => setSite(e.target.value)}
                className="form-control"
                placeholder="Site"
                aria-label="Site"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                value={tiktok}
                onBlur={(e) => {
                  setTelefoneValido(true);
                  if(!handleLinksBlur(e.target.value, 'Tik Tok')) {
                    setTikTokValido(false);
                  }
                }}
                onChange={(e) => setTikTok(e.target.value)}
                className="form-control"
                placeholder="Tik Tok"
                aria-label="Tik Tok"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                value={endereco}
                onBlur={(e) => {
                  setEnderecoValido(true)
                  if(!handleLinksBlur(e.target.value, 'Endereço')) {
                    setEnderecoValido(false);
                  }
                }}
                onChange={(e) => setEndereco(e.target.value)}
                className="form-control"
                placeholder="Endereço (google maps)"
                aria-label="Endereço"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                value={youtube}
                onBlur={(e) => {
                  setYoutubeValido(true)
                  if(!handleLinksBlur(e.target.value, 'Youtube')) {
                    setYoutubeValido(false) 
                  }
                }}
                onChange={(e) => setYoutube(e.target.value)}
                className="form-control"
                placeholder="Link Youtube"
                aria-label="Youtube"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                value={email}
                onBlur={(e) => handleEmailBlur(e.target.value)}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Email"
                aria-label="Email"
              />
            </div>
          </section>
          <section className={SocialCardStyle.ContainerButtons}>
            <div className={SocialCardStyle.SaveButtonWrapper}>
              <button
                onClick={handleSave}
                type="button"
                className="btn btn-primary btn-lg"
              >
                Salvar alterações
              </button>
            </div>
          </section>
        </BgCard>
      </main>
    </>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const invalidOperation = () => {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    };

    const cookies = parseCookies(ctx);

    if (!cookies?.token) {
      return invalidOperation();
    }

    const { token } = cookies;

    return {
      props: {
        user: JSON.parse(token),
      },
    };
  } catch (err) {
    console.log("erroo ", err);
    ctx.res.writeHead(302, { Location: "/sory" });
    ctx.res.end();
    return { props: {} };
  }
}
