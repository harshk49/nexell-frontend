import React, { useState, useEffect } from "react";

interface ImageCarouselProps {
  images: string[];
  autoplayDelay?: number;
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoplayDelay = 5000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [images.length, autoplayDelay]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div className="relative flex items-center justify-center w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-all duration-800 ease-in-out ${
              index === currentIndex
                ? "opacity-100 transform translate-x-0"
                : index === (currentIndex - 1 + images.length) % images.length
                ? "opacity-0 transform -translate-x-full"
                : "opacity-0 transform translate-x-full"
            }`}
          >
            <img
              src={image}
              alt={`Carousel image ${index + 1}`}
              className="object-contain max-w-[90%] max-h-[90%]"
            />
          </div>
        ))}
      </div>

      {/* Optional: Dots indicator */}
      <div className="absolute flex space-x-2 transform -translate-x-1/2 bottom-4 left-1/2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
