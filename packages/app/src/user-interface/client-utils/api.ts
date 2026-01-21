import { useEffect, useState } from "react";

export const useApiFetch = (query: any, setLoading: (loading: boolean) => void) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await fetch(process.env.NEXT_PUBLIC_CRAFT_CMS_GRAPHQL_ENDPOINT + "api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_CRAFT_CMS_GRAPHQL_TOKEN}`
        },
        body: JSON.stringify({
          query,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.data) {
            setResponse(res.data);
          } else {
            setError(res);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false)
          setError(error);
        });
    }

    fetchData();

    return setLoading(true)

  }, [query]);

  return { response, error };
};

