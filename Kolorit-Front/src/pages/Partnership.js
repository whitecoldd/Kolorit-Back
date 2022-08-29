import React, { useState, useEffect } from "react";
import ItemsModelUnfold from "../comps/ItemsModelUnfold";
import MobileMenu from "../comps/MobileMenu";
import NewMobileMenu from "../comps/NewMobileMenu";
import { publicRequest } from "../requests/request";
export default function Partnership({
  onAdd,
  onRemoveFromPage,
  addToCompare,
  removeFromCompare,
}) {
  const [Items, setItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(`/api/items/find`);
        setItems(res.data);
      } catch {}
    };
    getItems();
  }, []);

  return (
    <>
      {/* {Items.map((Items) => (
        <ItemsModelUnfold
          Items={Items}
          onAdd={onAdd}
          onRemoveFromPage={onRemoveFromPage}
          addToCompare={addToCompare}
          removeFromCompare={removeFromCompare}
        ></ItemsModelUnfold>
      ))} */}
      <NewMobileMenu/>
    </>
  );
}
