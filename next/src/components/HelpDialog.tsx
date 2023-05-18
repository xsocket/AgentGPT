import React from "react";
import { useTranslation } from "next-i18next";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";
import Dialog from "./Dialog";

export default function HelpDialog({ show, close }: { show: boolean; close: () => void }) {
  const [t] = useTranslation();
  return (
    <Dialog header={`${t("WELCOME_TO_AGENT_GPT", { ns: "help" })} 🤖`} isShown={show} close={close}>
      <div>
        <p>
          <strong>AIGC探索星球</strong> {t("INTRODUCING_AGENTGPT", { ns: "help" })}
        </p>
        <br />
        <div>
          {t("TO_LEARN_MORE_ABOUT_AGENTGPT", {
            ns: "help",
          })}
          <a
            target="_blank"
            href="https://docs.reworkd.ai"
            className="text-sky-500"
          >
            {t("AGENTGPT_DOCUMENTATION", { ns: "help" })}
          </a>
        </div>
        <br />
        <p className="mt-2">{t("FOLLOW_THE_JOURNEY", { ns: "help" })}</p>
        <div className="mt-4 flex w-full items-center justify-center gap-5">
          <div className="cursor-pointer rounded-full p-3 "
            
            onClick={() => window.open("https://www.duxiaoman.com/", "_blank")}
          >
            <img src="dxm/logo-color.png" style={{"height":"32px"}}/>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
