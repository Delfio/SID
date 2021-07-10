import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import SocialCardStyle from "./social_card.module.css";
import { Fab, Action } from "react-tiny-fab";
import useToast from "../../hooks/useToast";
import { parseCookies } from "nookies";
import firebase from "../../lib/firebase";
import BgCard from "../../components/BackgroundCard";
import Head from 'next/head';

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
  const [imgProfileCard, setImgProfileCard] = React.useState(
    "/img/avatar-default.png"
  );

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

  const profileInputRef = React.useRef(null);
  const router = useRouter();

  const { pin_id } = router.query;
  const { uid } = props.user;

  const { showToast, handleDevide } = useToast();

  const formatDataForSave = React.useCallback(() => {
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

    return data;
  }, [
    bg,
    email,
    emailValido,
    endereco,
    enderecoValido,
    facebook,
    facebookValido,
    instagram,
    instagramValido,
    nome,
    pin_id,
    pix,
    pixValido,
    site,
    siteValido,
    telefone,
    telefoneValido,
    tiktok,
    tiktokValido,
    uid,
    whatsapp,
    whatsappValido,
    youtube,
    youtubeValido,
  ]);

  const handleSave = React.useCallback(() => {
    const data = formatDataForSave();

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
  }, [formatDataForSave, pin_id, uid, showToast]);

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
      imgProfileCard,
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
    if (imgProfileCard) {
      setImgProfileCard(imgProfileCard);
    } else {
      setImgProfileCard("/img/avatar-default.png");
    }
  }, []);

  const handleSaveImgProfileCard = React.useCallback(
    (linkImgProfile) => {
      return firebase
        .firestore()
        .collection("perfis")
        .where("pinId", "==", pin_id)
        .get()
        .then((ref) => {
          if (ref.empty) {
            throw new Error(
              "Salve suas alterações antes de trocar a foto de perfil"
            );
          }

          return ref.docs[0].ref.update({
            imgProfileCard: linkImgProfile
              ? linkImgProfile
              : "/img/avatar-default.png",
          });
        });
    },
    [pin_id]
  );

  const handleImgChange = React.useCallback(() => {
    const file = profileInputRef.current.files[0];
    if (file) {
      firebase
        .storage()
        .ref()
        .child(
          `/pin-img-profile/${pin_id}-${Math.round(Math.random() * 10000)}`
        )
        .put(file)
        .then((el) => {
          el.ref
            .getDownloadURL()
            .then((el) => {
              return handleSaveImgProfileCard(el);
            })
            .then(() => {
              showToast({
                type: "success",
                message: "Image atualizada com sucesso!",
              });
            })
            .catch((err) => {
              console.log(err);
              showToast({
                type: "error",
                message: err,
              });
            });
        })
        .catch((err) => {
          console.log(err);
          showToast({
            type: "error",
            message: `Foto não salva! ${err.message}`,
          });
        });
    }
  }, [pin_id, showToast, handleSaveImgProfileCard]);

  const handleLinksBlur = React.useCallback(
    (e, type) => {
      if (!e) return true;

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

      return true;
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
    <>
      <Head>
        <title>Edite seu cartão</title>
      </Head>
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
                src={imgProfileCard}
                alt="profile"
                className="rounded"
                width="full"
                height="full"
              />
            </div>
            <div
              className="input-group mt-3"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <input
                id="input-profile-pick"
                type="file"
                accept="image/x-png,image/jpeg"
                ref={profileInputRef}
                onChange={handleImgChange}
                style={{
                  display: "none",
                }}
              />
              <label
                className="btn btn-primary"
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                }}
                htmlFor="input-profile-pick"
              >
                Alterar foto de perfil
              </label>
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
                  if (!handleLinksBlur(e.target.value, "Facebook")) {
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
                  if (!handleLinksBlur(e.target.value, "Instagram")) {
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
                  setSiteValido(true);
                  if (!handleLinksBlur(e.target.value, "Site")) {
                    setSiteValido(false);
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
                  if (!handleLinksBlur(e.target.value, "Tik Tok")) {
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
                  setEnderecoValido(true);
                  if (!handleLinksBlur(e.target.value, "Endereço")) {
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
                  setYoutubeValido(true);
                  if (!handleLinksBlur(e.target.value, "Youtube")) {
                    setYoutubeValido(false);
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
