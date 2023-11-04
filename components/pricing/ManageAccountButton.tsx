import { useState } from "react";
import { Button } from "../ui/button";
import LoadingSpinner from "../LoadingSpinner";

function ManageAccountButton() {
  const [loading, setloading] = useState(false);

  const handleManageBilling = async () => {
    try {
      setloading(true);
      const response = await fetch("/api/manageBilling", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.text();
        window.location.href = data;
        setloading(false);
      } else {
        console.error("Error:");
        setloading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setloading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center">
          <LoadingSpinner dark={false}/>
        </div>
      ) : (
        <Button
          className="w-full dark:bg-black dark:text-white"
          onClick={handleManageBilling}
        >
          Manage Billing
        </Button>
      )}
    </>
  );
}

export default ManageAccountButton;
