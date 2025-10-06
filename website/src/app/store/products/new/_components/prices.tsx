import React from "react";
import { useEffect } from "react";

const Prices = ({ properties, pervPage, nextPage, variants, setVariants }) => {
  useEffect(() => {
    function generateCombinations(obj) {
      const entries = Object.entries(obj);

      function helper(index, current) {
        if (index === entries.length) return [current];

        const [key, values] = entries[index];
        let result = [];

        for (let value of values) {
          result = result.concat(
            helper(index + 1, { ...current, [key]: value })
          );
        }

        return result;
      }

      return helper(0, {});
    }
    const arr = generateCombinations(properties);
    const newArr = arr.map((a) => ({ variant: a, price: 0,sales:0 }));
    setVariants(newArr);
  }, [properties]);

  console.log(variants);

  return (
    <div className=" overflow-hidden w-1/4 flex flex-col gap-5 ">
      <div className="flex-1 rounded-xl overflow-y-auto shadow flex flex-col gap-3 p-1">
        {variants.map((v, i) => (
          <div
            key={i}
            className="bg-background p-5 flex justify-between items-center rounded"
          >
            <div className='flex gap-1'>{Object.keys(v.variant).map(v=><div key={v} className='p-3 bg-gray-300 rounded-xl flex gap-1' ><span className='capitalize'>{v} :</span><span className='capitalize'>{variants[i].variant[v]}</span></div>)}</div>
            <div className="flex items-center">
              <label className="px-3">Price:</label>
              <input type="number" min={0} step={100} className="bg-white py-1 px-3 rounded outline-0 border border-transparent  duration-150 focus:border-primary" />
              <label className="px-3">Sales:</label>
              <input type="number" min={0} step={100} className="bg-white py-1 px-3 rounded outline-0 border border-transparent  duration-150 focus:border-primary" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={() => pervPage()}
          className="bg-primary min-w-36 p-2 px-10 text-white rounded duration-150 cursor-pointer hover:bg-primary-hover"
        >
          Perv
        </button>
        {Object.keys(properties).length === 0 ? (
          <button
            onClick={() => handleSkip()}
            className="bg-primary min-w-36 p-2 px-10 text-white rounded duration-150 cursor-pointer hover:bg-primary-hover"
          >
            Skip
          </button>
        ) : (
          <button
            onClick={() => nextPage()}
            className="bg-primary min-w-36 p-2 px-10 text-white rounded duration-150 cursor-pointer hover:bg-primary-hover"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Prices;
