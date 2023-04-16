import { AuthModal } from "@/atoms/authModal";
import { Button } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { SetterOrUpdater } from "recoil";

type Props = {
  setAuthModalState: SetterOrUpdater<AuthModal>;
};

const Logout = (props: Props) => {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    setError("");
    console.log("hello");

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
      props.setAuthModalState((p) => ({ ...p, open: false }));
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="relative w-full max-w-md max-h-full font-poppins">
      <div className="relative bg-white rounded-lg  ">
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
          data-modal-hide="popup-modal"
        ></button>
        <div className="p-6 text-center">
          <svg
            aria-hidden="true"
            className="mx-auto mb-4 text-gray-900 w-14 h-14 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              stroke-linejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-800 ">
            Are you sure you want to Logout?
          </h3>
          <Button
            variant={"unstyled"}
            _loading={{
              display: "flex",
              margin: "auto",
              justifyContent: "center",
              alignItems: "center",
            }}
            data-modal-hide="popup-modal"
            bg="red.500"
            px="2"
            fontWeight={"medium"}
            textColor={"white"}
            isLoading={loading}
            onClick={handleLogout}
            type="button"
            className="text-white font-poppins bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300   rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
            Yes, I'm sure
          </Button>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Logout;
