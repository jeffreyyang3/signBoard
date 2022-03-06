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
  const options = {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const result = await fetch(globalPath || `/back/${path}`, fetchOptions || {});
  return result.json();
};
const post = async ({
  path,
  globalPath,
  params,
  postBody,
  fetchOptions,
}: {
  path?: string;
  globalPath?: string;
  params?: Record<string, string>;
  postBody?: any;
  fetchOptions?: RequestInit;
}) => {
  const options = {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    ...(postBody && {
      body: JSON.stringify(postBody),
    }),
  };
  const result = await fetch(globalPath || `/back/${path}`, options);
  return result.json();
};
export { get, post };
