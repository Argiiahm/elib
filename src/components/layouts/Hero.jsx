import { ArrowRightIcon } from 'lucide-react';
import HeroDashboardPreview from './HeroDashboardPreview';

const Hero = () => {
  const features = [
    {
      title: (
        <>
          {' '}
          Find &amp; Explore <br /> a Book{' '}
        </>
      ),
      image: '/icons/find-book.webp',
    },
    {
      title: (
        <>
          Booking &amp; Get <br /> a Book
        </>
      ),
      image: '/icons/booking-book.webp',
    },
    {
      title: (
        <>
          Reading &amp; Enjoying <br /> a Book
        </>
      ),
      image: '/icons/reading-book.webp',
    },
    {
      title: (
        <>
          Returning <br /> Book
        </>
      ),
      image: '/icons/returning-book.webp',
    },
  ];
  return (
    <>
      <section className="mt-20 border-b border-gray-200 pb-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="space-y-3">
            <h1 className="text-5xl">
              Let's <span className="text-orange-500 font-medium">Reading</span>{' '}
              a Book!
            </h1>
            <p>
              Every book has a story to tell, and we're here to help you find
              the ones that match your interests.
            </p>
          </div>
        </div>
      </section>
      <section className="border-b border-gray-200">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-wrap justify-center">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative h-44 w-full max-w-64 overflow-hidden border-r border-gray-200 text-gray-500 p-2"
              >
                <h1 className="text-2xl">{feature.title}</h1>
                <ArrowRightIcon className="absolute bottom-3 left-2 z-10" />
                <img
                  loading="lazy"
                  draggable={false}
                  className="absolute -bottom-2 right-0 w-36"
                  src={feature.image}
                  alt={feature.title}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="border-b border-gray-200">
        <HeroDashboardPreview />
      </section>
    </>
  );
};

export default Hero;
