import axios from "axios";

interface fetchDataProps {
  path: string;
  limit?: string;
  offset?: number;
}

export default async function fetchData({
  path,
  limit,
  offset,
}: fetchDataProps) {
  const BASE_URL = `https://wilds.mhdb.io/ko/${path}`;
  const url = new URL(BASE_URL);

  if (limit) {
    url.searchParams.append("limit", limit);
    url.searchParams.append("offset", String(offset));
  }

  try {
    const response = await axios.get(url.toString());

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
