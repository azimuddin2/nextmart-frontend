'use client';

import { useUser } from '@/context/UserContext';

const HomePage = () => {
  const user = useUser();
  console.log(user);

  return (
    <div>
      <h2>Welcome To Next Mart Home Page</h2>
    </div>
  );
};

export default HomePage;
