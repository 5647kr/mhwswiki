import { useParams } from "react-router";
import { useQueryHook } from "../../../hook/useQueryHook";

interface RankType {
  description: string;
  id: number;
  level: number;
  name: string | null;
  skill: { id: number };
}

export default function SkillsId() {
  const { id } = useParams();

  const { data, isLoading } = useQueryHook({
    key: ["skills", id],
    path: `skills/${id}`,
  });

  console.log(data);

  if (isLoading) {
    return (
      <>
        <h2>로딩중....</h2>
      </>
    );
  }

  let kind = "";
  switch (data.kind) {
    case "weapon":
      kind = "무기";
      break;
    case "armor":
      kind = "방어구";
      break;
    case "set":
      kind = "시리즈";
      break;
    case "group":
      kind = "그룹";
      break;
    default:
      kind = "";
  }

  return (
    <>
      <section>
        <div className="flex justify-between items-center">
          <h2 className="heading2">{data.name}</h2>
          <span className="paragraph">{kind} 스킬</span>
        </div>
        <p className="my-5">{data.description}</p>

        {data.ranks.length > 0 && (
          <div className="border-t border-dashed border-(--border-color) py-5">
            <h3 className="heading3 text-(--subText-color)">스킬설명</h3>

            <ul className="mt-2.5 flex flex-col gap-2.5">
              {data.ranks.map((rank: RankType) => (
                <li key={rank.id}>
                  <span>Lv{rank.level}. </span>
                  {rank.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
