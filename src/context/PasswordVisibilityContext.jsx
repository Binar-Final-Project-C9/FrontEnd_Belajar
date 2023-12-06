import { createContext, useContext, useState } from "react";

export const PasswordVisibilityContext = createContext();

export const usePasswordVisibility = () => {
  return useContext(PasswordVisibilityContext);
};

export const PasswordVisibilityProvider = ({ children }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const ctxValue = {
    isPasswordVisible,
    togglePasswordVisibility,
  };

  return (
    <PasswordVisibilityContext.Provider value={ctxValue}>
      {children}
    </PasswordVisibilityContext.Provider>
  );
};
