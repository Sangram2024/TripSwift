"use client";

import { useState } from "react";

export function PropertyImageGallery({ image }: { image: string[] }) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div>
      <div className="rounded-md overflow-hidden">
        <img
          src={image[currentImage]}
          alt="Property image"
          height={500}
          width={500}
        />
      </div>
      <div className="flex items-center gap-2 mt-4">
        {image?.map((img, i) => (
          <div
            key={`${img + i}`}
            onClick={() => setCurrentImage(i)}
            className={`rounded-md overflow-hidden ${
              currentImage === i ? "ring ring-primary-50 ring-offset-2" : null
            }`}
          >
            <img src={img} alt="Property image" height={200} width={200} />
          </div>
        ))}
      </div>
    </div>
  );
}
