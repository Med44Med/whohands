import React from "react";
import { categories } from "../../../../../../public/categories";
import { createClient } from "@/supabase/client";
import { useState } from "react";

interface Product {
  store: string;
  title: string;
  descreption?: string | null;
  category: string;
  sub_category: string;
}

const General = ({ store, nextPage,setId }) => {
  const supabase = createClient();

  const [product, setProduct] = useState<Product>({
    store,
    title: "",
    descreption: '',
    category: "",
    sub_category: "",
  });

  const handleGeneral = async (e) => {
    e.preventDefault();
    if (!product.title || !product.category || !product.sub_category) {
      alert("please fill all fields");
      return;
    }
    const { data, error } = await supabase
      .from("products")
      .insert([product])
      .select();
    if (error) {
      console.log(error);
      return;
    }

    setId(data[0]?.id)

    await nextPage();
  };
  return (
    <form className="overflow-y-auto flex-1 px-0 flex flex-col gap-1 md:px-20">
      <label htmlFor="">Category*</label>
      <select
        onChange={(e) =>
          setProduct((perv) => ({ ...perv, category: e.target.value }))
        }
        className="w-full px-3 py-2 mb-5 rounded outline-0 border border-gray-300 duration-150 focus:border-primary"
      >
        <option value="">Select a category</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
      <label htmlFor="">Title :</label>
      <select
        disabled={!product.category}
        className="w-full px-3 py-2 mb-5 rounded outline-0 border border-gray-300 duration-150 focus:border-primary disabled:text-gray-300"
        onChange={(e) =>
          setProduct((perv) => ({ ...perv, sub_category: e.target.value }))
        }
      >
        <option value="">Select a sub category</option>
        {categories
          .filter((cat) => cat.slug === product.category)[0]
          ?.subCategories.map((sub) => (
            <option key={sub.slug}>{sub.name}</option>
          ))}
      </select>
      <label htmlFor="">Title :</label>
      <input
        type="text"
        placeholder="Product name"
        value={product.title}
        onChange={(e) =>
          setProduct((perv) => ({ ...perv, title: e.target.value }))
        }
        className="w-full px-3 py-2 mb-5 rounded outline-0 border border-gray-300 duration-150 focus:border-primary"
      />
      <label htmlFor="">Descreption :</label>
      <textarea
        placeholder="Product descreption"
        value={product.descreption}
        onChange={(e) =>
          setProduct((perv) => ({ ...perv, descreption: e.target.value }))
        }
        className="w-full px-3 py-2 mb-5 min-h-32 rounded outline-0 border border-gray-300 duration-150 resize-none focus:border-primary"
        rows="3"
      />
      <button
        onClick={(e) => handleGeneral(e)}
        className="bg-primary w-fit ml-auto px-10 py-1 rounded text-white cursor-pointer duration-150 hover:bg-primary-hover"
      >
        Next
      </button>
    </form>
  );
};

export default General;
