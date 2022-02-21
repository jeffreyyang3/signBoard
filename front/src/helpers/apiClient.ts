const get = async ({
  path,
  globalPath,
  params,
  fetchOptions,
}: {
  path?: string;
  globalPath?: string;
  params?: Record<string, string>;
  fetchOptions?: RequestInit;
}) => {
  const result = await fetch(
    globalPath || `http://localhost:3000/${path}`,
    fetchOptions || {}
  );
  return result.json();
};
export { get };
