import { Search } from "lucide-react";
import { useState } from "react";
import { useQueryHook } from "../hook/useQueryHook";
import { useNavigate } from "react-router";

export default function SearchInput({
  placeholder,
  fetchKey,
  fetchPath,
}: {
  placeholder: string;
  fetchKey: string;
  fetchPath: string;
}) {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const { data } = useQueryHook({
    key: [fetchKey],
    path: fetchPath,
  });

  const submitKeyword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (keyword === "") {
      alert(`${placeholder}을 검색할 수 없습니다.`);
      return;
    }

    const searchItem = data.filter((item: Items) =>
      item.name.includes(keyword)
    );

    if (searchItem.length === 0) {
      alert(`${placeholder}을 찾을 수 없습니다.`);
      setKeyword("");
      return;
    }

    navigate(`/items/${searchItem[0].id}`);
  };
  return (
    <>
      <form
        onSubmit={submitKeyword}
        className="py-2.5 px-5 bg-(--bg-color) border border-(--border-color) flex items-center gap-2.5"
      >
        <Search
          className="w-3.5 md:w-4 h-3.5 md:h-4 vertical-top"
          color="#6c757d"
        />
        <input
          type="text"
          className="text-sm md:text-base focus:outline-0"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={`${placeholder} 검색`}
        />
      </form>
    </>
  );
}
