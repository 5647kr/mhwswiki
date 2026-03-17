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
    const data = response.data;

    console.log(data);

    // 데이터가 배열인 경우에만 가나다순 정렬 수행
    // if (Array.isArray(data)) {
    //   return data.sort((a, b) => {
    //     // name 필드를 기준으로 가나다순 정렬
    //     // localeCompare는 한국어 정렬 규칙을 완벽하게 따릅니다.
    //     return a.name.localeCompare(b.name, "ko");
    //   });
    // }

    return data;
  } catch (error) {
    console.error(error);
  }
}
