import Markdown from "react-markdown";

export default function MarkdownContent({ children }: { children: string }) {
  return <Markdown>{children}</Markdown>;
}
