import { useState } from "react";
import { Prism as SyntaxHighlighter }
from "react-syntax-highlighter";

import {
  oneDark
} from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeBlock({
  inline,
  className,
  children,
  ...props
}) {

  const [copied, setCopied] =
    useState(false);

  const match =
    /language-(\w+)/.exec(
      className || ""
    );

  const code =
    String(children).replace(
      /\n$/,
      ""
    );

  const copyCode = () => {

    navigator.clipboard.writeText(
      code
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (
    !inline &&
    match
  ) {
    return (
      <div
        className="code-container"
      >

        <div
          className="code-header"
        >

          <span>
            {match[1]}
          </span>

          <button
            onClick={copyCode}
          >
            {copied
              ? "✅ Copied"
              : "📋 Copy"}
          </button>

        </div>

        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {code}
        </SyntaxHighlighter>

      </div>
    );
  }

  return (
    <code
      className={className}
      {...props}
    >
      {children}
    </code>
  );
}

export default CodeBlock;