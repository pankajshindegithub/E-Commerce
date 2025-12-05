import { useCart } from "../Context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { FaTruck } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/clerk-react";
import emptycart from "../assets/emptycart.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

const Cart = ({ location, getLocation }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart();
  const { user } = useUser();
  const navigator = useNavigate();

  // Total Price Calculation
  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0">
      {cartItem.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl">My Cart ({cartItem.length})</h1>

          <div className="mt-10">
            {cartItem.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-20 h-20 rounded-md"
                    />

                    <div>
                      <h1 className="md:w-[300px] line-clamp-2 text-lg">
                        {item.title}
                      </h1>
                      <p className="text-red-500 font-semibold text-lg">
                        ${item.price}
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-lg">
                    <button
                      onClick={() => updateQuantity(item.id, "decrease")}
                      className="cursor-pointer"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, "increase")}
                      className="cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <span
                    onClick={() => deleteItem(item.id)}
                    className="hover:bg-white/60 transition-all p-3 rounded-full hover:shadow-md"
                  >
                    <FaRegTrashAlt className="text-2xl text-red-500 cursor-pointer" />
                  </span>
                </div>
              );
            })}

            {/* FORM + BILL */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20">
              {/* Delivery Info */}
              <div className="bg-gray-100 rounded-md p-7 mt-4 space-y-2">
                <h1 className="text-gray-800 font-bold text-xl">Delivery Info</h1>

                <div className="flex flex-col space-y-1">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={user?.fullName}
                    readOnly
                    className="p-2 rounded-md"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label>Address</label>
                  <input
                    type="text"
                    defaultValue={location?.county}
                    className="p-2 rounded-md"
                  />
                </div>

                <div className="flex w-full gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label>State</label>
                    <input
                      type="text"
                      defaultValue={location?.state}
                      className="p-2 rounded-md w-full"
                    />
                  </div>

                  <div className="flex flex-col space-y-1 w-full">
                    <label>PostCode</label>
                    <input
                      type="text"
                      defaultValue={location?.postcode}
                      className="p-2 rounded-md w-full"
                    />
                  </div>
                </div>

                <div className="flex w-full gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label>Country</label>
                    <input
                      type="text"
                      defaultValue={location?.country}
                      className="p-2 rounded-md w-full"
                    />
                  </div>

                  <div className="flex flex-col space-y-1 w-full">
                    <label>Phone No</label>
                    <input
                      type="text"
                      placeholder="Enter your Number"
                      className="p-2 rounded-md w-full"
                    />
                  </div>
                </div>

                <button className="bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer">
                  Submit
                </button>

                <div className="flex items-center justify-center w-full text-gray-700">
                  ---------OR-----------
                </div>

                <div className="flex justify-center">
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer"
                    onClick={getLocation}
                  >
                    Detect Location
                  </button>
                </div>
              </div>

              {/* BILL SECTION */}
              <div className="bg-white border-gray-100 shadow-xl rounded-md p-7 mt-4 h-max">
                <h1 className="text-gray-800 font-bold text-xl">Bill Detail</h1>

                <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 items-center text-gray-700 mt-2">
                    <LuNotebookText /> Items total
                  </h1>
                  <p>${totalPrice.toFixed(2)}</p>
                </div>

                <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 items-center text-gray-700 mt-2">
                    <FaTruck /> Delivery Charge
                  </h1>
                  <p className="text-red-500 font-semibold">
                    <span className="text-gray-600 line-through">$25</span> Free
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 items-center text-gray-700">
                    <GiShoppingBag /> Handling Charge
                  </h1>
                  <p className="text-red-500 font-semibold">$5</p>
                </div>

                <hr className="text-gray-200 mt-2" />

                <div className="flex justify-between items-center">
                  <h1 className="font-semibold text-lg">Grand Total</h1>
                  <p className="font-semibold text-lg">
                    ${(totalPrice + 5).toFixed(2)}
                  </p>
                </div>

                <h1 className="font-semibold text-gray-700 mb-3 mt-7">
                  Apply Promo Code
                </h1>

                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter A code"
                    className="p-2 rounded-md w-full"
                  />
                  <button className="bg-white text-black font-semibold border border-gray-200 px-4 cursor-pointer py-1 rounded-md">
                    APPLY
                  </button>
                </div>

                <button className="bg-red-500 text-white px-3 py-3 rounded-md w-full cursor-pointer mt-3">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // ✅ EMPTY CART SECTION (FULLY FIXED)
        <div className="flex flex-col gap-3 justify-center items-center h-[600px]">
          <h1 className="text-red-500/80 font-bold text-5xl text-muted">
            Your cart is empty
          </h1>

          <Lottie animationData={emptycart} loop={true} className="w-[400px]" />

          <button
            onClick={() => navigator("/products")}
            className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
