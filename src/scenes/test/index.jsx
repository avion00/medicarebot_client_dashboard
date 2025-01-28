import React, { useState } from "react";
import AddBotDialogBox from "../../components/AddBotDialogBox";

function TestComponent() {
  const [successBox, setSuccessBox] = useState(false);

  const handleOpenDialog = () => {
    setSuccessBox(true);
  };

  const handleCloseDialog = () => {
    setSuccessBox(false);
  };

  return (
    <div>
      <button onClick={handleOpenDialog}>Show Dialog</button>
      <AddBotDialogBox
        successBox={successBox}
        handleSetSuccessBoxClose={handleCloseDialog}
      />
    </div>
  );
}

export default TestComponent;
