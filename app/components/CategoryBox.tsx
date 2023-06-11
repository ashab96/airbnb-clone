"use client";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback } from "react";
import { IconType } from "react-icons";
interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    //console.log("inside handleClick");
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    //upadte query with clicked label
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };
    //on clicking the selected category again removing it from the query
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }
    //generate the new url based on the query
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [label, router, params]);

  return (
    <div
      onClick={handleClick}
      className={`
  flex 
  flex-col 
  items-center 
  justify-center 
  gap-2
  p-3
  border-b-2
  hover:text-neutral-800
  transition
  cursor-pointer
  ${selected ? "border-b-neutral-800" : "border-transparent"}
  ${selected ? "text-neutral-800" : "text-neutral-500"}
`}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
