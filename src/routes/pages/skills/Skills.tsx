import { useEffect } from "react";
import { useInfiniteQueryHook } from "../../../hook/useQueryHook";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";
import SearchInput from "../../../components/SearchInput";

export default function Skills() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteQueryHook({
      key: ["skills"],
      limit: "50",
      path: "skills",
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const skills = data?.pages.flatMap((page) => page || []);

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
          <h2 className="heading5 text-(--subText-color)">스킬</h2>
          <SearchInput
            placeholder="스킬"
            fetchKey="searchSkills"
            fetchPath="skills"
          />
        </div>

        <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills?.map((skill: Skills) => (
            <li key={skill.id}>
              <Link to={`/skills/${skill.id}`}>
                <div className="py-2.5 px-5 border border-(--border-color) bg-(--bg-color) flex items-center gap-2.5">
                  <h2 className="paragraph flex-1">{skill.name}</h2>
                  <p className="subParagraph text-(--subText-color) flex-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {skill.description
                      ? `${skill.description}`
                      : `${skill.kind === "set" ? "시리즈 스킬" : "그룹 스킬"}`}
                  </p>
                  <span className="subParagraph text-(--subText-color) text-end">
                    전체 스킬: {skill.ranks.length}
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
