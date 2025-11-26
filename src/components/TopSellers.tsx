import React, { useEffect, useState } from "react";

interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}

const TopSellers = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Simulate fetching data
      const response = await fetch("https://randomuser.me/api/?results=5");

      const data = await response.json();

      const authorsData: Author[] = data.results.map((user: any) => ({
        name: `${user?.name?.first} ${user?.name?.last}`,
        isFollowing: false,
        image: user?.picture?.medium,
      }));

      setAuthors(authorsData);
    } catch (error) {
      console.error("Error fetching top sellers:", error);

      setAuthors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFollowClick = (index: number) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author, idx) =>
        idx === index ? { ...author, isFollowing: !author.isFollowing } : author
      )
    );
  };

  if (loading) {
    return <div className="">Loading...</div>;
  }

  return (
    <div className="bg-white p-5 mx-5 mt-[5rem] border w-[23rem] rounded">
      <h2 className="text-xl font-bold mb-5">Top Sellers</h2>

      <ul>
        {authors.map((author, idx) => (
          <li key={idx} className="flex items-center justify-between mb-4">
            <section className="flex justify-center items-center">
              <img
                src={author.image}
                alt={author.name}
                className="w-[25%] h-[25%] justify-center rounded-full"
              />

              <span className="ml-4">{author.name}</span>
            </section>

            <button
              onClick={() => handleFollowClick(idx)}
              className={`py-1 px-3 rounded text-white cursor-pointer ${
                author.isFollowing ? "bg-red-500 " : "bg-black"
              }`}
            >
              {author.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellers;
