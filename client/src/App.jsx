import React, { useEffect, useState } from "react"
import BookGenerator from "./components/BookGenerator"

const App = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/books?seed=42&page=1&region=en_US&likes=100&reviews=50")
        const data = await res.json()
        console.log("Fetched data:", data)
        setBooks(data.books)
      } catch (error) {
        console.error("Fetch error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Generated Books</h1>
      <BookGenerator books={books} loading={loading} />
    </div>
  )
}

export default App
