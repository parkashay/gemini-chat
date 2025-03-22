import { SCRAPING_FLAG } from "@/lib/constants";
import { Loader2 } from "lucide-react";

export function ScrapingIndicator({ text }: { text: string }) {
  const formattedText = text.replace(SCRAPING_FLAG, "");
  return (
    <div className="bg-accent p-3 rounded-md flex items-center gap-3 w-fit">
      <Loader2 className="animate-spin" />
      <span className="capitalize italic">{formattedText}</span>
    </div>
  );
}
