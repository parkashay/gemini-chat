import { removeScrapingIndicator } from "@/lib/utils";
import MarkdownContent from "@/markdown";

export function AIChatMessage({ message }: { message: string }) {
  return <MarkdownContent>{removeScrapingIndicator(message)}</MarkdownContent>;
}
