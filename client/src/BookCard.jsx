import React from "react";

const BookCard = ({ book }) => {
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Language:</strong> {book.language}</p>
      <p><strong>Country:</strong> {book.country}</p>
      <p><strong>Likes:</strong> {book.likes}</p>
      <p><strong>Reviews:</strong></p>
      <ul>
        {Array.isArray(book.reviews) ? (
          book.reviews.map((review, idx) => (
            <li key={idx}>
              <strong>{review.author}:</strong> {review.text}
            </li>
          ))
        ) : (
          <li>{book.reviews}</li> // Agar string bo‘lsa
        )}
      </ul>
    </div>
  );
};

export default BookCard;
