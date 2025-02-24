'use client';

import { Button } from '../ui/button';
import {
  Heart,
  LayoutDashboard,
  LogOut,
  Search,
  ShoppingBag,
  Store,
  User,
} from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { logout } from '@/services/Auth';
import { useUser } from '@/context/UserContext';
import { usePathname, useRouter } from 'next/navigation';
import { protectedRoute } from '@/constants';

const Navbar = () => {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    if (protectedRoute.some((route) => pathname.match(route))) {
      router.push('/');
    }
  };

  const navOptions = (
    <nav className="flex gap-2 ">
      <Button variant="outline" className="rounded-full p-0 size-10">
        <Heart />
      </Button>
      <Button variant="outline" className="rounded-full p-0 size-10">
        <ShoppingBag />
      </Button>

      {user ? (
        <>
          {user.role === 'user' && user?.hasShop === false && (
            <Link href="/create-shop">
              <Button>Create Shop</Button>
            </Link>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user?.image} />
                <AvatarFallback className="bg-primary text-white text-xl">
                  {user?.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-[10px] mt-1 w-80 mr-3 lg:mr-10 p-3">
              <div>
                <Avatar className="mx-auto w-12 h-12">
                  <AvatarImage src={user?.image} />
                  <AvatarFallback className="bg-primary text-white text-2xl">
                    {user?.name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center my-2">
                  <h2 className="text-lg">{user?.name}</h2>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-[5px] cursor-pointer">
                <User />
                <span>Profile</span>
              </DropdownMenuItem>
              <Link href={`${user?.role}/dashboard`}>
                <DropdownMenuItem className="rounded-[5px] cursor-pointer">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="rounded-[5px] cursor-pointer">
                <Store />
                <span>My Shop</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="rounded-[5px] text-white bg-[#FF4D4F] cursor-pointer mt-2"
              >
                <LogOut />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
        </>
      )}
    </nav>
  );

  return (
    <header className="border-b">
      <div className="max-w-screen-xl px-3 lg:px-5 lg:flex justify-between items-center mx-auto h-28 lg:h-20">
        <div className="flex justify-between items-center mb-2">
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="Logo" width="60" height="60" />
            <span className="text-md lg:text-xl font-semibold lg:ml-1">
              NextMart
            </span>
          </Link>
          <div className="lg:hidden mt-1">{navOptions}</div>
        </div>

        <div className="max-w-lg flex items-center flex-grow space-x-2 bg-white p-1 rounded-lg shadow-sm">
          <Select>
            <SelectTrigger className="border-none w-[75%]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="rounded-[10px] mt-1">
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

        <div className="hidden lg:block">{navOptions}</div>
      </div>
    </header>
  );
};

export default Navbar;
