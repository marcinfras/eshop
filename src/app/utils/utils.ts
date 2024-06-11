export const getEnv = (env: string | undefined) => {
  if (!env) throw Error("Missing env");

  return env;
};
