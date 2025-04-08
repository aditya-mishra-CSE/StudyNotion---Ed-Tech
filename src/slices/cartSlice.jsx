import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
    //The JSON.parse() function is used in this line of code because localStorage stores data as strings,
    // and you likely want to work with the totalItems value as a number (or possibly an object/array, depending on what it represents).

}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addToCart: (state, action) => {
    //   const course = action.payload
    //   const index = state.cart.findIndex((item) => item._id === course._id)

    //   if (index >= 0) {
    //     // If the course is already in the cart, do not modify the quantity
    //     toast.error("Course already in cart")
    //     return
    //   }
    //   // If the course is not in the cart, add it to the cart
    //   state.cart.push(course)
    //   // Update the total quantity and price
    //   state.totalItems++
    //   state.total += course.price
    //   // Update to localstorage
    //   localStorage.setItem("cart", JSON.stringify(state.cart))
    //   localStorage.setItem("total", JSON.stringify(state.total))
    //   localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
    //   // show toast
    //   toast.success("Course added to cart")
    // },
    // removeFromCart: (state, action) => {
    //   const courseId = action.payload
    //   const index = state.cart.findIndex((item) => item._id === courseId)

    //   if (index >= 0) {
    //     // If the course is found in the cart, remove it
    //     state.totalItems--
    //     state.total -= state.cart[index].price
    //     state.cart.splice(index, 1)
    //     // Update to localstorage
    //     localStorage.setItem("cart", JSON.stringify(state.cart))
    //     localStorage.setItem("total", JSON.stringify(state.total))
    //     localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
    //     // show toast
    //     toast.success("Course removed from cart")
    //   }
    // },

    addToCart: (state, action) => {
      const course = action.payload;
      const existingCourse = state.cart.find((item) => item._id === course._id);

      //courseId hum paas kar rahe hai aur item id cart me pdi hui hai 

      if (existingCourse) {
        toast.error("Course already in cart");
        return;
      }

      state.cart.push(course);
      state.totalItems++;
      state.total += course.price;
      updateLocalStorage(state); // Call refactored function

      toast.success("Course added to cart");
    },
    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const removedCourse = state.cart.find((item) => item._id === courseId);

      if (removedCourse) {
        state.cart = state.cart.filter((item) => item._id !== courseId);
        state.totalItems--;
        state.total -= removedCourse.price;
        updateLocalStorage(state); // Call refactored function

        toast.success("Course removed from cart");
      }
    },

    resetCart: (state) => {
      state.cart = []
      state.total = 0
      state.totalItems = 0
      // Update to localstorage
      localStorage.removeItem("cart")
      localStorage.removeItem("total")
      localStorage.removeItem("totalItems")
    },
  },
})

// Refactored local storage update function
const updateLocalStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state.cart));
  localStorage.setItem("total", JSON.stringify(state.total));
  localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
};

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions

export default cartSlice.reducer

