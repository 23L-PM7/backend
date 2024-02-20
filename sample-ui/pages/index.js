import { useEffect, useState } from "react";

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <main className="container mx-auto my-10 ">
      <button className="mb-2 btn btn-primary">New task</button>
      {articles.map((article) => (
        <div key={article.id} className="mb-2 shadow card bg-base-100">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-1">{article.title}</div>
              <button className="btn btn-ghost btn-sm">Edit</button>
              <button className="btn btn-ghost btn-sm">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
