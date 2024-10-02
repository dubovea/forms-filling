import { useFormStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useNavBack = () => {
  const navigate = useNavigate();
  const formData = useFormStore((state) => state.formData);
  useEffect(() => {
    if (!formData || Object.keys(formData).length === 0) {
      navigate("/");
    }
  }, [formData, navigate]);
};
