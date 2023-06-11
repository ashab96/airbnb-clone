import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  //   const [isFavoriting, setIsFavoriting] = useState(false);

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    //console.log("inside hasfavorite usememo list", currentUser?.favoriteIds);
    //console.log("hasfavorite value in usememo", list.includes(listingId));
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }
      //console.log("inside toggleFavorite hasFavorited ", hasFavorited);

      try {
        let request;

        if (hasFavorited) {
          //   setIsFavoriting(true);
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          //   setIsFavoriting(false);
          //console.log("inside else case of hasFavorited");
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        //console.log("inside toggleFavorite hasFavorited later", hasFavorited);
        //console.log("inside toggleFavorite listingId later", listingId);
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
