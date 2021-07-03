import React from "react";
import Image from "next/image";
import SocialCardStyle from "../socialCard/social_card.module.css";
import CardStyle from "./card.module.css";
import firebase from "../../lib/firebase";
import BgCard from "../../components/BackgroundCard";
import useToast from "../../hooks/useToast";

export default function Card(props) {
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
    imgProfileCard
  } = props;

  const { showToast } = useToast();

  return (
    <main className={SocialCardStyle.container}>
      <BgCard bg={bg}>
        <section className={SocialCardStyle.WrapperImgProfile}>
          <div className={SocialCardStyle.ContainerImgProfile}>
            <Image
              src={imgProfileCard || '/img/avatar-default.png'}
              alt="profile"
              className="rounded"
              width="full"
              height="full"
            />
          </div>
        </section>
        <section className={SocialCardStyle.ContainerName}>
          <h2>{nome}</h2>
        </section>
        <section className={SocialCardStyle.ContainerInfos}>
          {facebook && (
            <a
              href={facebook}
              target="_blank"
              className="input-group mb-3"
              rel="noreferrer"
            >
              <div className={CardStyle.wrapperSocialInfo}>
                <div className={CardStyle.wrapperIcon}>
                  <i
                    className="fab fa-facebook-square"
                    style={{
                      color: "gray",
                    }}
                  ></i>
                </div>
                <div className={CardStyle.wrapperButton}>Facebook</div>
              </div>
            </a>
          )}
          {telefone && (
            <a href={`tel:${telefone}`} className="input-group mb-3">
              <div className={CardStyle.wrapperSocialInfo}>
                <div className={CardStyle.wrapperIcon}>
                  <i
                    className="fas fa-mobile-alt"
                    style={{
                      color: "gray",
                    }}
                  ></i>
                </div>
                <div className={CardStyle.wrapperButton}>Ligar</div>
              </div>
            </a>
          )}
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              className="input-group mb-3"
              rel="noreferrer"
            >
              <div className={CardStyle.wrapperSocialInfo}>
                <div className={CardStyle.wrapperIcon}>
                  <i
                    className="fab fa-instagram"
                    style={{
                      color: "gray",
                    }}
                  ></i>
                </div>
                <div className={CardStyle.wrapperButton}>Instagram</div>
              </div>
            </a>
          )}

          {whatsapp && (
            <a
              href={`https://api.whatsapp.com/send?phone=55${whatsapp}&text=Ol%C3%A1%2C%20vim%20a%20partir%20do%20seu%20cart%C3%A3o%20SID`}
              className="input-group mb-3"
            >
              <div className={CardStyle.wrapperSocialInfo}>
                <div className={CardStyle.wrapperIcon}>
                  <i
                    className="fab fa-whatsapp"
                    style={{
                      color: "gray",
                    }}
                  ></i>
                </div>
                <div className={CardStyle.wrapperButton}>Whatsapp</div>
              </div>
            </a>
          )}

          {pix && (
            <button
              onClick={(e) => {
                navigator.clipboard.writeText(pix);
                showToast({
                  type: "success",
                  message: "Chave copiada com sucesso",
                });
              }}
              className="input-group mb-3"
            >
              <div className={CardStyle.wrapperSocialInfo}>
                <div className={CardStyle.wrapperIcon}>
                  <Image
                    alt="img-pix"
                    width="45px"
                    height="45px"
                    src="/img/pix-logo.png"
                  />
                </div>
                <div className={CardStyle.wrapperButton}>
                  Copiar a chave pix
                </div>
              </div>
            </button>
          )}

          {site && (
            <a
              href={site}
              target="_blank"
              className="input-group mb-3"
              rel="noreferrer"
            >
              <div className={CardStyle.wrapperSocialInfo}>
                <div className={CardStyle.wrapperIcon}>
                  <i
                    className="fas fa-globe"
                    style={{
                      color: "gray",
                    }}
                  ></i>
                </div>
                <div className={CardStyle.wrapperButton}>Nosso site</div>
              </div>
            </a>
          )}

          {tiktok && (
            <a
              href={tiktok}
              target="_blank"
              className="input-group mb-3"
              rel="noreferrer"
            >
              <div className={CardStyle.wrapperSocialInfo}>
                <div className={CardStyle.wrapperIcon}>
                  <i
                    className="fab fa-tiktok"
                    style={{
                      color: "gray",
                    }}
                  ></i>
                </div>
                <div className={CardStyle.wrapperButton}>Tik Tok</div>
              </div>
            </a>
          )}

          {endereco && (
            <a
              href={endereco}
              target="_blank"
              className="input-group mb-3"
              rel="noreferrer"
            >
              <div className={CardStyle.wrapperSocialInfo}>
                <div className={CardStyle.wrapperIcon}>
                  <i
                    className="fas fa-map-marker-alt"
                    style={{
                      color: "gray",
                    }}
                  ></i>
                </div>
                <div className={CardStyle.wrapperButton}>Nosso Endereço</div>
              </div>
            </a>
          )}

          {youtube && (
            <a
              href={youtube}
              target="_blank"
              className="input-group mb-3"
              rel="noreferrer"
            >
              <div className={CardStyle.wrapperSocialInfo}>
                <div className={CardStyle.wrapperIcon}>
                  <i
                    className="fab fa-youtube"
                    style={{
                      color: "gray",
                    }}
                  ></i>
                </div>
                <div className={CardStyle.wrapperButton}>Youtube</div>
              </div>
            </a>
          )}

          {email && (
            <a
              href={`mailto:${email}`}
              className="input-group mb-3"
              rel="noreferrer"
            >
              <div className={CardStyle.wrapperSocialInfo}>
                <div className={CardStyle.wrapperIcon}>
                  <i
                    className="fas fa-envelope"
                    style={{
                      color: "gray",
                    }}
                  ></i>
                </div>
                <div className={CardStyle.wrapperButton}>E-mail</div>
              </div>
            </a>
          )}
        </section>
        <section className={CardStyle.wrapperLogoSid}>
          <div className={CardStyle.logoImg}>
            <Image
              src="/img/logo.png"
              alt="logo"
              // className="rounded mx-auto d-block"
              width="auto"
              height="auto"
            />
          </div>
        </section>
      </BgCard>
    </main>
  );
}

export async function getServerSideProps(ctx) {
  const { pin_id } = ctx.query;
  const invalidOperation = () => {
    return {
      redirect: {
        destination: "/sorry",
        permanent: false,
      },
    };
  };

  if (!pin_id) return invalidOperation();

  return firebase
    .firestore()
    .collection("perfis")
    .where("pinId", "==", pin_id)
    .get()
    .then((el) => {
      if (el.empty) {
        return invalidOperation();
      }
      const data = el.docs[0].data();

      return {
        props: {
          ...data,
        },
      };
    })
    .catch((err) => {
      console.log("error ", err);
      return invalidOperation();
    });
}
