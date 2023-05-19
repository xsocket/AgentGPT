import { type ReactNode } from "react";
import Head from "next/head";
import DottedGridBackground from "../components/DottedGridBackground";
import clsx from "clsx";

interface LayoutProps {
  children: ReactNode;
  className?: string;
  centered?: boolean;
}

const DefaultLayout = (props: LayoutProps) => {
  const description = "高效好用的自主AI平台";

  return (
    <div
      className={clsx(
        "flex flex-col bg-gradient-to-b from-[#2B2B2B] to-[#1F1F1F]",
        props.centered && "items-center justify-center"
      )}
    >
      <Head>
        <title>AIGC探索星球 - 度小满</title>
        <meta name="description" content={description} />
        <meta property="og:title" content="AIGC探索星球：您的高效AI助手 🤖" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://www.duxiaoman.com/" />
        <meta property="og:image" content="https://w1.dxmstatic.com/static/fe-duxiaoman/img/white-logo.d0f48bb3.png" />
        <meta property="og:image:width" content="192" />
        <meta property="og:image:height" content="48" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DottedGridBackground className={clsx("min-w-screen min-h-screen", props.className)}>
        {props.children}
      </DottedGridBackground>
    </div>
  );
};

export default DefaultLayout;
