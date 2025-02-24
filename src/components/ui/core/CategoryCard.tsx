import { ICategory } from '@/types';
import Image from 'next/image';

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <div className="bg-[#f7f7f7] border-2 border-white rounded-xl p-5 lg:p-6">
      <div className="h-20">
        <Image
          src={category.icon}
          alt="Category"
          width={100}
          height={100}
          className="mx-auto"
        />
      </div>
      <h3 className="text-center font-semibold mt-5 text-lg">
        {category.name}
      </h3>
    </div>
  );
};

export default CategoryCard;
