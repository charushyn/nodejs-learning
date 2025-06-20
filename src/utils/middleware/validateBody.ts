import { RequestHandler } from "express";

export default function validateBody(requiredValues: string[]): RequestHandler {
  return (req, res, next) => {
    const missed: string[] = [];

    const body: object = req.body;

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      res.status(400).json({ error: "Invalid request body type" });
      return;
    }

    for (const field of requiredValues) {
      if (!(field in body)) {
        missed.push(field);
      }
    }

    if (missed.length > 0) {
      res.status(400).json({
        error: `Missed required values: ${missed.join(", ")}`,
      });
      return;
    }

    next();
  };
}
