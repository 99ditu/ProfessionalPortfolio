import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";
import { storage } from "./storage";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid form data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to send message" });
      }
    }
  });

  // Resume download endpoint
  app.get("/api/resume", (req, res) => {
    // In a real implementation, this would serve the actual resume file
    // For now, we'll redirect to a placeholder or return the resume data
    const resumePath = path.join(__dirname, "..", "attached_assets", "Disha Tulsani_1751956227762.pdf");
    res.download(resumePath, "Disha_Tulsani_Resume.pdf", (err) => {
      if (err) {
        res.status(404).json({ success: false, message: "Resume not found" });
      }
    });
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to retrieve contacts" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
