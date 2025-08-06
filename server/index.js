import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import booksRouter from "./routes/books.js"

const app = express()
const PORT = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, '../client')))

// API routes
app.use("/api/books", booksRouter)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.listen(PORT, () => {
  console.log(`✅ Server ishga tushdi: http://localhost:${PORT}`)
})