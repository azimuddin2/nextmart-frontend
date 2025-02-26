import CartProducts from '@/components/modules/cart';
import Coupon from '@/components/modules/cart/Coupon';
import NMBanner from '@/components/ui/core/NMBanner';

const CartPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-3 lg:px-5 mb-10">
      <NMBanner title="Cart Page" path="Home - cart" />
      <div className="grid lg:grid-cols-12 gap-5">
        <CartProducts />
        <Coupon />
      </div>
    </div>
  );
};

export default CartPage;
