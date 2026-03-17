import {
  useInfiniteQuery,
  useQuery,
  type QueryKey,
} from "@tanstack/react-query";
import fetchData from "../api/fetchData";

function useInfiniteQueryHook({
  key,
  limit,
  path,
}: {
  key: string[];
  limit: string;
  path: string;
}) {
  return useInfiniteQuery({
    queryKey: key,
    queryFn: ({ pageParam }) =>
      fetchData({ limit: limit, offset: pageParam, path: path }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < parseInt(limit)) {
        return undefined;
      }

      return allPages.length * parseInt(limit);
    },
  });
}

function useQueryHook<T extends QueryKey>({
  key,
  path,
}: {
  key: T;
  path: string;
}) {
  return useQuery({
    queryKey: key,
    queryFn: () => fetchData({ path }),
  });
}

export { useInfiniteQueryHook, useQueryHook };
