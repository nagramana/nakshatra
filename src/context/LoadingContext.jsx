import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

const LoadingContext =
  createContext();

export function LoadingProvider({
  children
}) {

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    const timer =
      setTimeout(() => {

        setLoading(false);

      }, 2000);

    return () =>
      clearTimeout(timer);

  }, []);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading
      }}
    >
      {children}
    </LoadingContext.Provider>
  );

}

export const useLoading = () =>
  useContext(
    LoadingContext
  );