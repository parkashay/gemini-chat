import type { Context } from "hono";
import type { BlankEnv, BlankInput } from "hono/types";
import type { ChatInput } from "../types/Chat.js";
import { scrapeWebsite } from "../services/scrape-website.js";
import { aiModel } from "../services/gemini.js";
import { SCRAPING_FLAG } from "../constants/constants.js";

export const chatController = async (c: Context<BlankEnv, "/chat", BlankInput>) => {
  c.header("Content-Type", "text/event-stream");
  c.header("Cache-Control", "no-cache");
  c.header("Connection", "keep-alive");

  const { message } = await c.req.json<ChatInput>();

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = message.match(urlRegex) || [];

  let scrapedContent = "";

  const stream = new ReadableStream({
    async start(controller) {
      if (urls.length > 0) {
        for (let i = 0; i < urls.length; i++) {
          controller.enqueue(`data: scraping link ${i + 1}/${urls.length} ${SCRAPING_FLAG}\n\n`);
          const content = await scrapeWebsite(urls[i]);
          if (content) {
            scrapedContent += `\nContent from ${urls[i]}:\n${content}\n\n`;
          }
        }
      }

      const prompt = `${scrapedContent}\n\n${message}`;
      const result = await aiModel.generateContentStream(prompt);

      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) {
          controller.enqueue(`data: ${text}\n\n`);
        }
      }
      controller.close();
    },
  });

  return c.newResponse(stream);
};
