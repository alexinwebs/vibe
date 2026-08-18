import Fastify from "fastify";
import cors from "@fastify/cors";

const app = Fastify({
  logger: true,
});

await app.register(cors, {
  origin: true,
});

app.get("/", async () => {
  return {
    name: "VIBE API",
    message: "Move different. Move VIBE.",
    version: "0.1.0",
  };
});

app.get("/health", async () => {
  return {
    status: "ok",
    service: "vibe-api",
    version: "0.1.0",
  };
});

const port = Number(process.env.PORT ?? 4000);
const host = process.env.HOST ?? "0.0.0.0";

try {
  await app.listen({
    port,
    host,
  });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}