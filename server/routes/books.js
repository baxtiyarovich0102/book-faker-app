import express from "express"
import { generateBooks } from "../utils/bookGenerator.js"

const router = express.Router()

// GET /api/books
router.get("/", (req, res) => {
  const {
    seed = "42",
    page = 1,
    region = "en_US",
    likes = 0,
    reviews = 0
  } = req.query

  const books = generateBooks({
    seed,
    page: parseInt(page),
    region,
    likes: parseFloat(likes),
    reviews: parseFloat(reviews)
  })

  res.json(books)
})

export default router
