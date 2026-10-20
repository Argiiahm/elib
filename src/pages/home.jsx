import Navbar from '../components/layouts/Navbar';
import Hero from '../components/layouts/Hero';
import { BookAudio } from 'lucide-react';
import categories from '../data/categories';
import Books from '../data/books';

const HomePage = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <section className="w-full max-w-7xl mx-auto my-6">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.slice(0, 3).map((category) => (
            <div
              key={category.name}
              className="relative my-6 flex h-[150px] w-[400px] items-center overflow-hidden rounded-md border border-gray-100 p-4"
            >
              <div className="z-10 flex items-center gap-3">
                <BookAudio className="shrink-0 text-gray-400" size={32} />
                <div>
                  <h2 className="text-2xl text-gray-400">{category.name}</h2>
                  <span className="text-sm text-gray-300">
                    {category.totalBooks} Books
                  </span>
                </div>
              </div>
              <img
                loading="lazy"
                draggable="false"
                src={category.image}
                alt={category.name}
                className="absolute -right-2 -bottom-6 h-[125px] w-[125px] object-contain object-bottom"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {Books.slice(0, 6).map((book) => (
            <div
              key={book.id}
              className="relative flex h-[150px] w-[400px] items-center overflow-hidden rounded-md border border-gray-100 p-4"
            >
              <div className="z-10 flex gap-3">
                <img
                  loading="lazy"
                  draggable="false"
                  src={book.image}
                  alt={book.title}
                  className="h-[120px] w-[125px] object-contain"
                />
                <div>
                  <h2 className="text-2xl text-gray-400">{book.title}</h2>
                  <span className="text-sm text-gray-300">{book.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
