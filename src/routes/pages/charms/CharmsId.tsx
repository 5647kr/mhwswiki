import { Link, useParams } from "react-router";
import { useQueryHook } from "../../../hook/useQueryHook";

interface TotalMaterialType {
  id: number;
  name: string;
  quantity: number;
}

export default function CharmsId() {
  const { id } = useParams();

  const { data, isLoading } = useQueryHook({
    key: ["charms", id],
    path: `charms/${id}`,
  });


  const totalZenny: number =
    data?.ranks.reduce(
      (acc: number, rank: CharmsRanks) => acc + (rank.crafting?.zennyCost || 0),
      0
    ) || 0;

  const totalMaterialsMap = data?.ranks.reduce(
    (acc: Record<number, TotalMaterialType>, rank: CharmsRanks) => {
      rank.crafting.materials.forEach((material) => {
        const itemId = material.item.id;
        if (acc[itemId]) {
          acc[itemId].quantity += material.quantity;
        } else {
          acc[itemId] = {
            id: itemId,
            name: material.item.name,
            quantity: material.quantity,
          };
        }
      });
      return acc;
    },
    {} as Record<number, TotalMaterialType>
  );

  const totalMaterialsList: TotalMaterialType[] = totalMaterialsMap
    ? Object.values(totalMaterialsMap)
    : [];

  if (isLoading) {
    return (
      <>
        <h2>로딩중....</h2>
      </>
    );
  }

  return (
    <>
      <section>
        <div className="flex justify-between items-center">
          <h2 className="heading2">{data.ranks[0].name.split("Ⅰ")[0]}</h2>
        </div>
        <p className="my-5">{data.ranks[0].description}</p>

        {data.ranks[0].skills.length > 0 && (
          <div className="border-t border-dashed border-(--border-color) py-5 flex flex-col md:flex-row md:justify-between gap-5">
            <div>
              <h3 className="heading3 text-(--subText-color)">호석설명</h3>
              <ul className="mt-2.5 flex flex-col gap-5">
                {data.ranks.map((rank: CharmsRanks) => (
                  <li
                    key={rank.id}
                    className="flex flex-col gap-2.5 border-t border-(--border-color) first:border-t-0 pt-1.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <h4 className="heading4">
                        Lv{rank.level}. {rank.name}
                      </h4>
                    </div>
                    {rank.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center text-(--subText-color)"
                      >
                        <p className="paragraph">
                          Lv{skill.level}.{skill.skill.name}
                        </p>
                        <span className="subParagraph">
                          : {skill.description}
                        </span>
                      </div>
                    ))}

                    <h5 className="heading5">필요 소재</h5>
                    <ul>
                      {rank.crafting.materials.map((material) => (
                        <li key={material.id}>
                          <div className="flex items-center">
                            <Link
                              to={`/items/${material.item.id}`}
                              className="paragraph"
                            >
                              {material.item.name}&nbsp;
                            </Link>
                            <span className="paragraph">
                              {material.quantity} 개
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p className="paragraph">
                      필요 제니: {rank.crafting.zennyCost} z
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="heading3 text-(--subText-color) mb-4">
                최종 강화 총합
              </h3>
              <ul className="border-b border-dashed border-(--border-color) pb-2.5 mb-2.5">
                {totalMaterialsList.map((mat) => (
                  <li key={mat.id} className="flex justify-between">
                    <span className="paragraph">{mat.name}</span>
                    <span className="paragraph font-bold">
                      {mat.quantity}개
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center">
                <span className="heading5">총 필요 제니:&nbsp;</span>
                <span className="heading4 text-(--accent-color)">
                  {totalZenny.toLocaleString()} z
                </span>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
