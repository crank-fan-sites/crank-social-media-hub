/* eslint-disable @next/next/no-img-element */
import delve from 'dlv';
import { getStrapiMedia } from '@/lib/utils';

const ImageCards = ({ images }: { images: any }) => {
  return (
    <div className="relative space-y-4">
      <div className="flex items-end justify-center lg:justify-start space-x-4">
        {images &&
          images
            .slice(0, 2)
            .map((image: any, index: number) => (
              <img
                className="rounded-lg shadow-lg w-32 md:w-56"
                key={`heroImage-${index}`}
                width="200"
                src={getStrapiMedia(delve(image, 'url'))}
                alt={delve(image, 'alternativeText')}
              />
            ))}
      </div>
      <div className="flex items-start justify-center lg:justify-start space-x-4 md:ml-12">
        {images &&
          images
            .slice(2, 4)
            .map((image: any, index: number) => (
              <img
                className="rounded-lg shadow-lg w-32 md:w-56"
                key={`heroImage-${index}`}
                width="200"
                src={getStrapiMedia(delve(image, 'url'))}
                alt={delve(image, 'alternativeText')}
              />
            ))}
      </div>
    </div>
  );
};

ImageCards.defaultProps = {};

export default ImageCards;
