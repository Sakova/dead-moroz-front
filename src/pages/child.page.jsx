import { useSelector } from "react-redux";
import { selectChildGifts } from "../store/child/childSlice";

import GiftList from "../components/gifts-list/gifts-list.component";

const ChildPage = () => {
  const gifts = useSelector(selectChildGifts);

  return (
    <>
      {!gifts.length ? (
        <h3 style={{ textAlign: "center" }}>
          There is nothing! Try to write a wish to Dead Moroz :)
        </h3>
      ) : (
        <GiftList />
      )}
    </>
  );
};

export default ChildPage;
