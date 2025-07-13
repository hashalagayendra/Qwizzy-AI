import React from "react";
import { useState } from "react";

function USerSelectionUserButton({
  user_data,
  setselectedUserID,
  selectedUserID,
}) {
  const [selectState, setselectState] = useState(true);
  return (
    <div
      onClick={() => {
        setselectState((pre) => !pre);
        setselectedUserID((prev) => {
          if (selectState && !prev.includes(user_data.id)) {
            return [...prev, user_data.id];
          } else {
            return prev.filter((id) => id !== user_data.id);
          }
        });
      }}
      className={`  ${
        selectedUserID.includes(user_data.id) ? "bg-white/30" : "bg-white/10"
      } w-full   text-white px-4 py-2 outline-none mb-1 text-center rounded-md flex  justify-center h-fit`}
    >
      <h1>{user_data.name}</h1>
    </div>
  );
}

export default USerSelectionUserButton;
