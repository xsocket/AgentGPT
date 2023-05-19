import type { ReactNode } from "react";
import React, { useCallback, useState } from "react";
import { FaCopy } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/default.css";

const LINKS = [
  {"key":"西湖", "url":false },
  {"key":"灵隐寺", "url":false },
  {"key":"叫花鸡", "url":false },
  {"key":"龙井虾仁", "url":"https://baike.baidu.com/item/龙井虾仁/1005772" },
  {"key":"杭州", "url":"https://baike.baidu.com/item/杭州市/200167"}
];

const wrapMessage = (message:string) => {
  let children = message;
  for(let item of LINKS) {
    if(children.indexOf(item.key) > 0) {
      let link = "[" + item.key + "](" + (item.url?item.url:"https://baike.baidu.com/item/"+item.key) + ")"
      children = children.replace(item.key, link);
    }
  }
  return children;
}

const MarkdownRendererDxm = ({ children }) => {    
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[() => rehypeHighlight({ ignoreMissing: true })]}
      components={{
        pre: CustomPre,
        code: CustomCodeBlock,
        a: (props) => CustomLink({ children: props.children, href: props.href }),
        p: (props) => <p className="mb-4">{props.children}</p>,
        ul: (props) => <ul className="ml-8 list-disc">{props.children}</ul>,
        ol: (props) => <ol className="ml-8 list-decimal">{props.children}</ol>,
      }}
    >
      {wrapMessage(children)}
    </ReactMarkdown>
  );
};

const CustomPre = ({ children }: { children: ReactNode }) => {
  const [isCopied, setIsCopied] = useState(false);

  const code = React.Children.toArray(children).find(isValidCustomCodeBlock);

  const language: string =
    code && code.props.className
      ? extractLanguageName(code.props.className.replace("hljs ", ""))
      : "";

  const handleCopyClick = useCallback(() => {
    if (code && React.isValidElement(code)) {
      const codeString = extractTextFromNode(code.props.children);
      void navigator.clipboard.writeText(codeString);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [code]);

  return (
    <div className="mb-4 flex flex-col ">
      <div className="flex w-full items-center justify-between rounded-t-lg bg-zinc-800 p-1 px-4 text-white">
        <div>{language.charAt(0).toUpperCase() + language.slice(1)}</div>
        <button
          onClick={handleCopyClick}
          className="flex items-center gap-2 rounded px-2 py-1 hover:bg-zinc-600 focus:outline-none"
        >
          <FaCopy />
          {isCopied ? "Copied!" : "Copy Code"}
        </button>
      </div>
      <pre className="rounded-t-[0]">{children}</pre>
    </div>
  );
};

interface CustomCodeBlockProps {
  inline?: boolean;
  className?: string;
  children: ReactNode;
}

const CustomCodeBlock = ({ inline, className, children }: CustomCodeBlockProps) => {
  // Inline code blocks will be placed directly within a paragraph
  if (inline) {
    return <code className="rounded bg-gray-200 px-1 py-[1px] text-black">{children}</code>;
  }

  const language = className ? className.replace("language-", "") : "plaintext";

  return <code className={`hljs ${language}`}>{children}</code>;
};

const CustomLink = ({ children, href }) => {
  return (
    <a
      className="link overflow-hidden"
      href={href as string}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

const isValidCustomCodeBlock = (
  element: ReactNode
): element is React.ReactElement<CustomCodeBlockProps> =>
  React.isValidElement(element) && element.type === CustomCodeBlock;

const extractLanguageName = (languageString: string): string => {
  // The provided language will be "language-{PROGRAMMING_LANGUAGE}"
  const parts = languageString.split("-");
  if (parts.length > 1) {
    return parts[1] || "";
  }
  return "";
};

const extractTextFromNode = (node: React.ReactNode): string => {
  if (typeof node === "string") {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map(extractTextFromNode).join("");
  }

  if (React.isValidElement(node)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
    return extractTextFromNode(node.props.children);
  }

  return "";
};

export default MarkdownRendererDxm;
