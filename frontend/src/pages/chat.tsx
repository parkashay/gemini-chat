"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { AIChatMessage } from "@/components/chat/ai-chat";
import { ChatActions } from "@/components/chat/data";
import { ScrapingIndicator } from "@/components/chat/scraping-indicator";
import { ChatBubble, ChatBubbleAction, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import MessageLoading from "@/components/ui/chat/message-loading";
import { SCRAPING_FLAG } from "@/lib/constants";
import { Message } from "@/lib/types";
import { CopyIcon, RefreshCcw, SendHorizonal, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ChatAiIcons = [
  {
    icon: CopyIcon,
    label: ChatActions.COPY,
  },
  {
    icon: RefreshCcw,
    label: ChatActions.REFRESH,
  },
];

export default function ChatPage() {
  const [isLoading, setisLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [scraping, setScraping] = useState<string>("");

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [messages]);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSend = async (message?: string) => {
    if (!input.trim()) return;
    setisLoading(true);

    const userMessage: Message = { role: "user", body: message || input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    formRef.current?.reset();
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });

    const response = await fetch(BACKEND_URL + "/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let botMessage = "";

    setisLoading(false);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const messages = chunk.split("\n\n");

      if (chunk) {
        messages.forEach((message) => {
          const text = message.replace("data:", "").trim();
          if (!text) return;
          if (text.endsWith(SCRAPING_FLAG)) {
            setScraping(text);
            return;
          }
          setScraping("");
          botMessage += " " + text;
          setMessages((prev) => {
            const newMessages = [...prev];
            if (newMessages[newMessages.length - 1]?.role === "ai") {
              newMessages[newMessages.length - 1].body = botMessage;
            } else {
              newMessages.push({ role: "ai", body: botMessage });
            }
            return newMessages;
          });
        });
      }
    }
  };

  function getMessageVariant(role: string) {
    return role === "ai" ? "received" : "sent";
  }

  const handleAction = (action: ChatActions, message: string) => {
    switch (action) {
      case ChatActions.COPY:
        navigator.clipboard.writeText(message);
        break;
      case ChatActions.REFRESH:
        handleSend(message);
        break;
      default:
        break;
    }
  };
  return (
    <div className="flex w-full flex-col relative h-full-auto">
      <div className="flex-1 w-full overflow-y-auto">
        <ChatMessageList ref={messagesContainerRef}>
          {messages.map((message, index) => {
            const variant = getMessageVariant(message.role!);
            return (
              <ChatBubble key={index} variant={variant}>
                <Avatar>
                  <AvatarImage
                    alt="Avatar"
                    className={message.role === "ai" ? "dark:invert" : ""}
                  />
                  <AvatarFallback className="border">
                    {message.role === "ai" ? <Sparkles className="text-yellow-600" /> : <User />}
                  </AvatarFallback>
                </Avatar>
                <ChatBubbleMessage>
                  {message?.role === "ai" ? <AIChatMessage message={message.body} /> : message.body}
                  {message.role === "ai" && (
                    <div className="flex items-center mt-1.5 gap-1">
                      {ChatAiIcons.map((icon, index) => {
                        const Icon = icon.icon;
                        return (
                          <ChatBubbleAction
                            variant="outline"
                            className="size-6"
                            key={index}
                            icon={<Icon className="size-3" />}
                            onClick={() => handleAction(icon.label, message.body)}
                          />
                        );
                      })}
                    </div>
                  )}
                </ChatBubbleMessage>
              </ChatBubble>
            );
          })}
          {isLoading && !scraping && (
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage alt="Avatar" className="dark:invert" />
                <AvatarFallback className="border">
                  <Sparkles className="text-yellow-600" />
                </AvatarFallback>
              </Avatar>
              <MessageLoading />
              Thinking...
            </div>
          )}
          {scraping && <ScrapingIndicator text={scraping} />}
          <div ref={scrollRef} />
        </ChatMessageList>
      </div>
      <div className="px-4 pb-4">
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            const inputValue = inputRef?.current?.value;
            handleSend(inputValue);
          }}
          className="relative flex items-center rounded-lg border focus-within:ring-1 focus-within:ring-ring p-2 gap-2"
        >
          <ChatInput
            ref={inputRef}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="resize-none rounded-lg border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <Button
            disabled={!input || isLoading}
            type="submit"
            variant="ghost"
            className="cursor-pointer !h-full py-4"
          >
            <SendHorizonal className="size-8" />
          </Button>
        </form>
      </div>
    </div>
  );
}
