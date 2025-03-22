import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { chatController } from "./controllers/chat.js";

const app = new Hono();

app.use("*", cors({ origin: "*" }));

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/chat", chatController);

serve(
  {
    fetch: app.fetch,
    port: 4000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
