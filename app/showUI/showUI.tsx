import { Interweave } from 'interweave';
import React from "react"

type ChatProps = {
  html: string;
}

export default function UI({ html }: ChatProps) {
  const transform = (node: HTMLElement, children: React.ReactNode) => {
    if (node.tagName === 'DIV' && node.getAttribute('class')) {
      return React.createElement(node.tagName, {
        className: node.getAttribute('class'),
        children,
      });
    }
  };
  
  return (
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen overflow-y-auto">
        <Interweave content={html} transform={transform}/>
      </div>
    </div>
  );
}


export function UserInsertedContent({ html }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
}
