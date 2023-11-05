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
      } else {
        console.error("Error:");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally{
      setloading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center">
          <LoadingSpinner dark={true} />
        </div>
      ) : (
        <Button
          variant={"outline"}
          className="w-full"
          onClick={handleManageBilling}
        >
          Manage Billing
        </Button>
      )}
    </>
  );
}

export default ManageAccountButton;
