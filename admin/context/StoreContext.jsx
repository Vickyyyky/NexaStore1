// context/StoreContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";

// ✅ Create context
export const StoreContext = createContext(null);

// ✅ Provide context
export const StoreContextProvider = ({ children }) => {
  const [favItems, setFavItems] = useState({});
  const [item_list, setItemList] = useState([]);
  const [token, setToken] = useState("");

  // ✅ API base URL (switch between local + production)
  const url =
    import.meta.env.MODE === "development"
      ? "http://localhost:4000"
      : "https://nexastore1-1.onrender.com";

  // ✅ Add item to favorites
  const addToFav = async (itemId) => {
    setFavItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));
    if (token) {
      try {
        await axios.post(`${url}/api/fav/add`, { itemId }, { headers: { token } });
      } catch (err) {
        console.error("Add to fav failed:", err);
      }
    }
  };

  // ✅ Remove item from favorites
  const removeFromFav = async (itemId) => {
    setFavItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) updated[itemId] -= 1;
      else delete updated[itemId];
      return updated;
    });
    if (token) {
      try {
        await axios.post(`${url}/api/fav/remove`, { itemId }, { headers: { token } });
      } catch (err) {
        console.error("Remove from fav failed:", err);
      }
    }
  };

  // ✅ Increase/decrease quantity
  const increaseFavQty = async (itemId) => await addToFav(itemId);
  const decreaseFavQty = async (itemId) => await removeFromFav(itemId);

  // ✅ Total amount for favorite items
  const getTotalFavAmount = () => {
    let total = 0;
    for (const itemId in favItems) {
      const item = item_list.find((p) => p._id === itemId);
      if (item) total += item.price * favItems[itemId];
    }
    return total;
  };

  // ✅ Fetch all items
  const fetchItemList = async () => {
    try {
      const res = await axios.get(`${url}/api/item/list`);
      setItemList(res.data.data || []);
    } catch (err) {
      console.error("Fetch item list failed:", err);
    }
  };

  // ✅ Load favorite items from backend
  const loadFavData = async (token) => {
    try {
      const res = await axios.post(`${url}/api/fav/get`, {}, { headers: { token } });
      setFavItems(res.data.favData || {});
    } catch (err) {
      console.error("Load fav data failed:", err);
    }
  };

  // ✅ Initialize on load
  useEffect(() => {
    const load = async () => {
      await fetchItemList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadFavData(savedToken);
      }
    };
    load();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        item_list,
        favItems,
        setFavItems,
        addToFav,
        removeFromFav,
        increaseFavQty,
        decreaseFavQty,
        getTotalFavAmount,
        url,
        token,
        setToken,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
