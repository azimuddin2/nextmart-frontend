import { getCurrentUser } from '@/services/AuthService';

const HomePage = async () => {
  const user = await getCurrentUser();
  console.log(user);

  return (
    <div>
      <h2>Welcome To Next Mart Home Page</h2>
    </div>
  );
};

export default HomePage;
