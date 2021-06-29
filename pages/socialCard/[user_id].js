import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import SocialCardStyle from "./social_card.module.css";
import Input from "../../components/Input";
import { Fab, Action } from "react-tiny-fab";
import useToast from "../../hooks/Toas";

export default function SocialCard() {
  const router = useRouter();
  const { user_id } = router.query;

  const { showToast, handleDevide } = useToast();

  const handleSave = React.useCallback(() => {
    showToast({
      type: "success",
      message: "perfil salvo com suucesso",
    });

    router.push("/card/useridlllaopoomskdlmjfi");
  }, [showToast, router]);

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
            onClick={() => console.log("")}
          >
            <i className="fas fa-copy"></i>
          </Action>
        </Fab>
        <div className={SocialCardStyle.main}>
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
            <Input
              value="Delfio Francisco"
              error={false}
              onBlur={() => {}}
              placehold="Seu nome"
              type="text"
              onChange={() => {}}
            />
          </section>
          <section className={SocialCardStyle.ContainerInfos}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Facebook"
                aria-label="Facebook"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Telefone"
                aria-label="Telfone"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Instagram"
                aria-label="Instagram"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Whatsapp"
                aria-label="Whatsapp"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Pix"
                aria-label="Pix"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Site"
                aria-label="Site"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nosso Site"
                aria-label="Nosso Site"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Tik Tok"
                aria-label="Tik Tok"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Endereço"
                aria-label="Endereço"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Youtube"
                aria-label="Youtube"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
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
        </div>
      </main>
    </>
  );
}
