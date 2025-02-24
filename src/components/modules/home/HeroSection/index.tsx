import styles from './HeroSection.module.css';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import cupImage from '@/assets/images/cup-with-headphone.png';

const HeroSection = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-3 lg:px-5">
      <div
        className={`${styles.banner} border-2 border-white rounded-3xl my-6 lg:flex lg:flex-row-reverse items-center justify-center p-5 lg:py-0 lg:px-12`}
      >
        <div className="flex-1">
          <Image src={cupImage} alt="Cup with head phone" className="mx-auto" />
        </div>
        <div className="flex-1 text-center lg:text-left">
          <h2 className="lg:text-4xl text-xl font-bold lg:leading-snug">
            Don't Miss Out on <br /> These Unbeatable Black <br /> Friday Deals!
          </h2>
          <p className="text-base my-4 text-gray-700">
            Save big this Black Friday with unbeatable deals on tech, home
            essentials, fashion, and more! Limited stock.
          </p>
          <Button className="rounded-full mr-3 px-6 font-semibold">
            Buy Now
          </Button>
          <Button
            variant="outline"
            className="rounded-full px-6 font-semibold bg-white"
          >
            All Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
