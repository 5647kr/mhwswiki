import { useEffect } from "react";
import { useInfiniteQueryHook } from "../../../hook/useQueryHook";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";
import SearchInput from "../../../components/SearchInput";

export default function Charms() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteQueryHook({
      key: ["charms"],
      limit: "50",
      path: "charms",
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const content = data?.pages.flatMap((page) => page || []);

  console.log(content);
  if (isLoading) {
    return (
      <>
        <h1>로딩중...</h1>
      </>
    );
  }

  return (
    <>
      <section>
        <div className="flex justify-between items-center">
          <h2 className="heading5 text-(--subText-color)">호석</h2>
          <SearchInput
            placeholder="호석"
            fetchKey="searchCharms"
            fetchPath="charms"
          />
        </div>

        <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {content?.map((item) => (
            <li key={item.id}>
              <Link to={`/charms/${item.id}`}>
                <div className="py-2.5 px-5 border border-(--border-color) bg-(--bg-color) flex items-center gap-2.5">
                  <h2 className="paragraph flex-1">
                    {item.ranks[0].name.split("Ⅰ")[0]}
                  </h2>
                  <p className="subParagraph text-(--subText-color) flex-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.description}
                  </p>
                  <span className="subParagraph text-(--subText-color) text-end">
                    전체 스킬: {item.ranks.length}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div ref={ref} className="h-10 inset-shadow-[0_0_10px_red]"></div>
      </section>
    </>
  );
}
