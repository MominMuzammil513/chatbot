import { db } from "@/db/db";
import { messages } from "@/db/schema";
import { ilike } from "drizzle-orm";

const seedData = [
    { query: "what is aivoa?", response: "AIVOA is a technology company specializing in software development." },
    { query: "who is elyas mohamed?", response: "Elyas Mohamed is your virtual assistant to help with AIVOA-related queries." },
    { query: "what services do you offer?", response: "We provide software development, database solutions, and more." },
    { query: "how can i contact aivoa?", response: "You can email us at contact@aivoa.com or call +123-456-7890." },
    { query: "tell me a joke", response: "Why was the computer tired? It had a hard drive!" },
    { query: "Who are you?", response: "I am Elyas Mohamed, your virtual assistant. How can I help you today?" },
    { query: "What is AIVOA?", response: "AIVOA is a technology company specializing in software development and artificial intelligence solutions." },
    { query: "What do you do?", response: "I help users get information about AIVOA, guide them through our services, and assist with technical queries." },
    { query: "Can you develop AI solutions?", response: "Absolutely! We specialize in creating AI-driven applications tailored to your business needs." },
    { query: "Do you provide database solutions?", response: "Yes, we offer database design, optimization, and management services." },
    { query: "What is the Software Developer role about?", response: "The Software Developer role at AIVOA involves building high-quality applications, working on innovative projects, and collaborating with a talented team." },
    { query: "What skills are required for this job?", response: "We look for expertise in React, Next.js, databases (SQLite, PostgreSQL, or MySQL), and a passion for problem-solving." },
    { query: "Can you tell me a joke?", response: "Why was the computer cold? Because it left its Windows open!" },
    { query: "What programming languages do you know?", response: "I’m proficient in JavaScript, Python, and SQL, but I can discuss anything you’d like!" },
    { query: "What is a chatbot?", response: "A chatbot is a software program designed to simulate conversations with users, providing information or automating tasks." },
    { query: "What’s your favorite programming language?", response: "I love JavaScript because it powers interactive web applications like this one!" },
    { query: "Can you tell me a fact about AI?", response: "Did you know that AI can process data millions of times faster than the human brain?" },
    { query: "How are you today?", response: "I’m always ready to help! How can I assist you today?" },
    { query: "Do you have any ongoing projects?", response: "Yes, we are currently working on innovative AI-powered applications for various industries." },
    { query: "What is your mission?", response: "Our mission is to simplify technology and create intelligent solutions for businesses worldwide." },
  ];
  

async function seed() {
  try {
    for (const data of seedData) {
      const normalizedQuery = data.query.toLowerCase().trim();
      const existingRecord = await db
        .select()
        .from(messages)
        .where(ilike(messages.query, normalizedQuery));

      if (existingRecord.length === 0) {
        await db.insert(messages).values(data);
      } else {
        console.log(`Skipped (already exists): "${data.query}"`);
      }
    }

    console.log("Database seeding completed successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();