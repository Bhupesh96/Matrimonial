import React, { useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const TestToast = () => {
  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "PrimeReact Working!",
      detail: "Toast rendered from PrimeReact",
      life: 3000,
    });
  };

  return (
    <div style={{ padding: "50px" }}>
      <Toast ref={toast} position="top-right" />

      <Button
        label="Test PrimeReact Toast"
        onClick={showSuccess}
        severity="success"
      />
    </div>
  );
};

export default TestToast;
