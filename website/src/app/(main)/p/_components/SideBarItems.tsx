import React from "react";
import { Text } from "@/components/typography";
import { IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";
import { categories } from "../../../../../public/categories";
import { ImBin } from "react-icons/im";
import { wilayas, communes } from "../../../../../public/location";

const SideBarItems = ({ title, show, setShow, children }) => {
  return (
    <div className="w-full">
      <div
        onClick={() => setShow(!show)}
        className="w-full flex justify-between items-center cursor-pointer pb-1"
      >
        <Text size="large">{title}</Text>
        <IoIosArrowDown
          className={clsx(
            "text-xl duration-150 ease",
            show ? "rotate-180" : "rotate-0"
          )}
        />
      </div>
      <div
        className={clsx(
          "w-full flex flex-col justify-start items-start gap-3 duration-300 ease-in overflow-hidden",
          show ? "max-h-96" : "max-h-0"
        )}
      >
        {children}
      </div>
    </div>
  );
};

const CategoryMenu = ({ filter, setFilter }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showCategory, setShowCategory] = useState(false);
  const [showSubCategory, setShowSubCategory] = useState(false);

  const handleCategory = (value) => {
    const newFilterQuerry = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      newFilterQuerry.delete("category");
      setShowCategory(false);
      setShowSubCategory(false);
    } else {
      newFilterQuerry.set("category", value);
      setShowCategory(false);
      setShowSubCategory(true);
    }
    newFilterQuerry.delete("subcategory");
    router.push(`${pathname}?${newFilterQuerry.toString()}`);
  };

  const handleSubCategory = (value) => {
    const newFilterQuerry = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      newFilterQuerry.delete("subcategory");
    } else {
      newFilterQuerry.set("subcategory", value);
    }
    router.push(`${pathname}?${newFilterQuerry.toString()}`);
    setShowSubCategory(false);
  };

  return (
    <>
      <SideBarItems
        title="Category"
        show={showCategory}
        setShow={setShowCategory}
      >
        <div
          className="flex justify-start items-center gap-2 cursor-pointer py-2 pl-1"
          onClick={() => handleCategory("all")}
        >
          {filter?.category === "all" ? <FaRegCheckSquare /> : <FaRegSquare />}
          <Text className={clsx("duration-150 hover:text-primary ")}>All</Text>
        </div>
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex justify-start items-center gap-2 cursor-pointer py-2 pl-1"
            onClick={() => handleCategory(cat.slug)}
          >
            {filter?.category === cat.slug ? (
              <FaRegCheckSquare />
            ) : (
              <FaRegSquare />
            )}
            <Text className={clsx("duration-150 hover:text-primary ")}>
              {cat.name}
            </Text>
          </div>
        ))}
      </SideBarItems>
      {filter?.category && filter.category !== "all" && (
        <SideBarItems
          title="Sub Category"
          show={showSubCategory}
          setShow={setShowSubCategory}
        >
          <div
            className="flex justify-start items-center gap-2 cursor-pointer py-2 pl-1"
            onClick={() => handleSubCategory("all")}
          >
            {filter?.sub_category === "all" ? (
              <FaRegCheckSquare />
            ) : (
              <FaRegSquare />
            )}
            <Text className={clsx("duration-150 hover:text-primary ")}>
              All
            </Text>
          </div>
          {categories
            .filter((cat) => cat.slug === filter.category)[0]
            ?.subCategories.map((sub, subIndex) => (
              <div
                key={subIndex}
                className="flex justify-start items-center gap-2 cursor-pointer py-2 pl-1"
                onClick={() => handleSubCategory(sub.slug)}
              >
                {filter?.subcategory === sub.slug ? (
                  <FaRegCheckSquare />
                ) : (
                  <FaRegSquare />
                )}
                <Text className={clsx("duration-150 hover:text-primary ")}>
                  {sub.name}
                </Text>
              </div>
            ))}
        </SideBarItems>
      )}
    </>
  );
};

const PriceMenu = ({ filter, setFilter, min, max }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);
  const [priceFilter, setpriceFilter] = useState({
    min,
    max,
  });

  const handlePrice = () => {
    const FilterQuerry = new URLSearchParams(searchParams.toString());
    const filter = JSON.parse(FilterQuerry.get("filter"));
    if (!filter) {
      FilterQuerry.set("filter", JSON.stringify({ price: priceFilter }));
    } else {
      const newFilterQuerry = { ...filter, price: priceFilter };
      FilterQuerry.set("filter", JSON.stringify(newFilterQuerry));
    }
    router.push(`${pathname}?${FilterQuerry}`);
  };
  return (
    <SideBarItems title="Price" show={show} setShow={setShow}>
      <div className="w-full flex justify-center items-center gap-3">
        <input
          type="number"
          className="w-1/2 bg-white text-black h-10 text-center rounded outline-0 border-2 border-transparent duration-150 focus:border-primary"
          placeholder="Min"
          min={min}
          step="100"
          value={priceFilter.min}
          onChange={(e) =>
            setpriceFilter((perv) => ({ ...perv, min: e.target.value }))
          }
        />
        <input
          type="number"
          className="w-1/2 bg-white text-black h-10 text-center"
          placeholder="Max"
          max={max}
          step="100"
          value={priceFilter.max}
          onChange={(e) =>
            setpriceFilter((perv) => ({ ...perv, max: e.target.value }))
          }
        />
        <ImBin
          onClick={() => handlePrice()}
          className="text-2xl text-text-muted duration-150 hover:text-primary  cursor-pointer"
        />
      </div>
    </SideBarItems>
  );
};

const LocationMenu = ({ filter, setFilter }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showWilaya, setShowWilaya] = useState(false);
  const [showCommune, setShowCommune] = useState(false);

  const [textFilter, setTextFilter] = useState("");

  const handleWilaya = (value) => {
    const newFilterQuerry = new URLSearchParams(searchParams.toString());
    const filter = JSON.parse(newFilterQuerry.get("filter"));
    if (!filter) {
      if (value === "all") {
        router.push(`${pathname}?${newFilterQuerry.toString()}`);
      } else {
        newFilterQuerry.set(
          "filter",
          JSON.stringify({ location: { wilaya: value } })
        );
        router.push(`${pathname}?${newFilterQuerry.toString()}`);
      }
    } else {
      if (value === "all") {
        const { location, ...newFilter } = filter;
        newFilterQuerry.set("filter", JSON.stringify(newFilter));
        router.push(`${pathname}?${newFilterQuerry.toString()}`);
      } else {
        const newFilter = { ...filter, location: { wilaya: value } };
        newFilterQuerry.set("filter", JSON.stringify(newFilter));
        router.push(`${pathname}?${newFilterQuerry.toString()}`);
      }
    }
    setShowWilaya(false);
    setShowCommune(true);
  };

  const newFilterQuerry = new URLSearchParams(searchParams.toString());
  const wil = JSON.parse(newFilterQuerry.get('filter'))?.location?.wilaya
  console.log(wil);
  

  const handleCommune = (value) => {
    const newFilterQuerry = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      newFilterQuerry.delete("commune");
    } else {
      newFilterQuerry.set("commune", value);
    }
    setShowCommune(false);
    router.push(`${pathname}?${newFilterQuerry.toString()}`);
  };

  return (
    <>
      <SideBarItems title="Wilaya" show={showWilaya} setShow={setShowWilaya}>
        <input
          type="text"
          value={textFilter}
          onChange={(e) => setTextFilter(e.target.value)}
          className="w-full outline-0 border border-text-muted px-3 py-1"
        />
        {wilayas
          .filter((w) =>
            w.name.toLowerCase().includes(textFilter.toLowerCase())
          )
          .map((w, index) => (
            <div key={index} onClick={() => handleWilaya(w.code)}>
              {w.name}
            </div>
          ))}
      </SideBarItems>
      {wil && wil !== "all" && (
        <SideBarItems
          title="commune"
          show={showCommune}
          setShow={setShowCommune}
        >
          {communes
            .filter((c) => c.wilaya_id === wil)
            .map((c, index) => (
              <div key={index} onClick={() => handleCommune(c.post_code)}>
                {c.name}
              </div>
            ))}
        </SideBarItems>
      )}
    </>
  );
};

export { CategoryMenu, PriceMenu, LocationMenu };
