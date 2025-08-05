import express from "express"
import cors from "cors"
import booksRouter from "./routes/books.js"

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.use("/api/books", booksRouter)

app.listen(PORT, () => {
  console.log(`✅ Server ishga tushdi: http://localhost:${PORT}`)
})
