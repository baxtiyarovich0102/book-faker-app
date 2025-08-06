import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import BookCard from "./BookCard";

const App = () => {
  const [books, setBooks] = useState([]);
  const [region, setRegion] = useState("en_US");
  const [seed, setSeed] = useState("test");
  const [page, setPage] = useState(1);
  const [avgLikes, setAvgLikes] = useState(100);
  const [avgReviews, setAvgReviews] = useState(50);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/books", {
        params: { region, seed, page, likes: avgLikes, reviews: avgReviews },
      });

      const newBooks = res.data.books;

      setBooks((prev) => (page === 1 ? newBooks : [...prev, ...newBooks]));
    } catch (err) {
      console.error("Failed to fetch books:", err);
    } finally {
      setIsLoading(false);
    }
  }, [region, seed, page, avgLikes, avgReviews]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleRefresh = () => {
    setBooks([]);
    setPage(1);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📚 Book Store Tester</h1>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <select
          className="p-2 border rounded"
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
            handleRefresh();
          }}
        >
          <option value="en_US">English (US)</option>
          <option value="de_DE">German (Germany)</option>
          <option value="ja_JP">Japanese (Japan)</option>
        </select>

        <input
          className="p-2 border rounded"
          type="text"
          placeholder="Seed"
          value={seed}
          onChange={(e) => {
            setSeed(e.target.value);
            handleRefresh();
          }}
        />

        <input
          className="p-2 border rounded"
          type="number"
          placeholder="Avg Likes"
          value={avgLikes}
          onChange={(e) => {
            setAvgLikes(Number(e.target.value));
            handleRefresh();
          }}
        />

        <input
          className="p-2 border rounded"
          type="number"
          placeholder="Avg Reviews"
          value={avgReviews}
          onChange={(e) => {
            setAvgReviews(Number(e.target.value));
            handleRefresh();
          }}
        />

        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleRefresh}
        >
          🔄 Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>

      <div className="text-center my-6">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default App;
