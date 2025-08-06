import React from "react"

const BookGenerator = ({ books, loading }) => {
  if (loading) return <p>Loading...</p>

  return (
    <ul className="space-y-4">
      {books.map((book, idx) => {
        console.log(book)

        return (
          <li key={idx} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-gray-700">
              Author(s): {book.authors?.join(", ")}
            </p>
            <p className="text-gray-600 text-sm">
              Publisher: {book.publisher}
            </p>
            <p className="text-sm text-gray-500">
              Likes: {book.likes} • Reviews: {book.reviews.length}
            </p>
          </li>
        )
      })}
    </ul>
  )
}

export default BookGenerator
