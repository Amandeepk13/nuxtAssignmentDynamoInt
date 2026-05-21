export const useGlobalLoader = () => {
  return useState("globalLoader", () => false);
}