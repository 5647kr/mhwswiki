import { Link, useParams } from "react-router";
import { useQueryHook } from "../../../hook/useQueryHook";

interface RecipeType {
  amount: number;
  id: number;
  inputs: { name: string; id: number }[];
  output: { id: number };
}

export default function ItemsId() {
  const { id } = useParams();

  const { data, isLoading } = useQueryHook({
    key: ["items", id],
    path: `items/${id}`,
  });

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
          <h2 className="heading2">{data.name}</h2>
          <p className="paragraph text-(--subText-color)">
            주머니 최대수량: {data.carryLimit}개
          </p>
        </div>
        <p className="my-2.5">{data.description}</p>

        {data.recipes.length > 0 && (
          <div className="border-t border-dashed border-(--border-color) py-2.5">
            <h3 className="heading3 text-(--subText-color)">조합법</h3>

            <ul className="mt-2.5 flex flex-col gap-2.5">
              {data.recipes.map((recipe: RecipeType) => (
                <li key={recipe.id} className="flex gap-2.5">
                  <span>
                    <Link to={`/items/${recipe.inputs[0].id}`}>
                      {recipe?.inputs[0].name}
                    </Link>
                    {recipe.inputs.length > 1 && (
                      <>
                        {" "}
                        +{" "}
                        <Link to={`/items/${recipe.inputs[1].id}`}>
                          {recipe?.inputs[1].name}
                        </Link>
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
