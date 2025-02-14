import { Button } from '../ui/button';
import { Heart, Search, ShoppingBag } from 'lucide-react';
import logo from '@/assets/icons/logo.svg';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';

const Navbar = () => {
  return (
    <header className="border-b w-full">
      <div className="container lg:flex justify-between items-center mx-auto h-28 lg:h-16 px-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <Image src={logo} alt="Logo" width="60" height="60" />
            <span className="text-xl font-semibold ml-1">Next Mart</span>
          </div>

          <nav className="flex gap-2 lg:hidden">
            <Button variant="outline" className="rounded-full p-0 size-10">
              <Heart />
            </Button>
            <Button variant="outline" className="rounded-full p-0 size-10">
              <ShoppingBag />
            </Button>
          </nav>
        </div>

        <div className="max-w-lg flex items-center flex-grow space-x-2 bg-white p-1 rounded-lg shadow-sm">
          <Select>
            <SelectTrigger className="border-none w-[75%]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="rounded-[5px] mt-1">
              <SelectGroup>
                <SelectItem value="foods">Foods</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="books">Books</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            type="text"
            placeholder="Search here anything"
            className="px-4 py-2 border-none bg-white w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#693AF8]"
          />

          <Button className="px-4 py-2 text-white rounded-full transition">
            <Search />
          </Button>
        </div>

        <div className="hidden lg:block">
          <nav className="flex gap-2 ">
            <Button variant="outline" className="rounded-full p-0 size-10">
              <Heart />
            </Button>
            <Button variant="outline" className="rounded-full p-0 size-10">
              <ShoppingBag />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
