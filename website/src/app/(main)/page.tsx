import { getTranslations } from "next-intl/server";

import Hero from '../../components/mainpage/Hero';

export default async function Home() {
  const t = await getTranslations("HomePage");


  return (
    <main className="w-full px-10 flex justify-start items-center py-5 pt-20 flex-col ">
        <Hero />
        <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Featured Items
        </h2>
        <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden">
          <div className="flex items-stretch p-4 gap-3">
            <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex flex-col"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD3opw_3wmRP2GOFoB0kRnwGOkTGr_I-DHW-u_ALJk8IEAT0FzPsWESGI8oMwB9Srk7n3jWHhOylnbATOmHYcVLF39ReRiMAXF_G1w5pSqEsWXSmP6mOAWSb3EitS6vaiNJS6zoapSlYgdYSR8qxmsX7V-MH_ne1DUsTqx9nxI5hsVckbkFXVO2i24bd-AwnUTCTWhqOcpUABn2lLpyJqG0a5d01bH1NPgOdEjzOYUSGGThqZXNMjX7wJD7rWJ2VXX3FT3HQTUNEh4")',
                }}
              ></div>
              <div>
                <p className="text-[#111418] text-base font-medium leading-normal">
                  Artisan Mug
                </p>
                <p className="text-[#60758a] text-sm font-normal leading-normal">
                  Handmade ceramic mug with unique design
                </p>
              </div>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex flex-col"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDrzeSbYc_7BX_Vrz6JbNQN08jISO91Coqy55acVSxlevDvebL6boCDavGS3nQsVSDBdiyeo_3ETjljO_mtCn5MGsu4Z1D7VX76boE3rG-kzPzeoIlHpoazEn-gEqCnxdjnrFE9LIeqWqrTJOLztNQcaqZozNT7rK25hYR3IQUD8RqWOD0FAxgj-3ntSAnPm7AU3RNnS44hZKaMNx6DxAhI5nPye0nYmUN5uoiPcTpIoneWfOzxhPqrkNempsYAo_NRKIBfKPKBawc")',
                }}
              ></div>
              <div>
                <p className="text-[#111418] text-base font-medium leading-normal">
                  Wooden Bowl
                </p>
                <p className="text-[#60758a] text-sm font-normal leading-normal">
                  Handcrafted wooden bowl for serving or display
                </p>
              </div>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex flex-col"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBF_6B31tCNsaRp7PQ4JmV6F_olCiH9mZXJkDxvwmcw9SXNJF06mYsUtmfVo6yV4u_mFiOqKVAYtauuZm8_GIiQBzGDQS1jcyEiUKoNs_EDZMsB7K6fbD1DZfQzGwpQQEJ3-s0BnBOae9ST2C9KNRTO4fjv1S7c3ksZ3QHKAjRewhHYHRNvGg82ftrWI55KbSsdSywGIGCat-G7Tngt1Yl3pH4aIcasi9FVulfiaHTm71DOweE6WO-m0weSIpIwBlI0IJm_aRXBi9U")',
                }}
              ></div>
              <div>
                <p className="text-[#111418] text-base font-medium leading-normal">
                  Silk Scarf
                </p>
                <p className="text-[#60758a] text-sm font-normal leading-normal">
                  Beautiful hand-painted silk scarf
                </p>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Artist Stories
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuATBi7U8MMCLjUmjIqfJHSOQjzjGHBTsM0y6J0rdNiwImRWf63dlgjCnNPviM0IGtkIeQ7X9iuseHuqISOKT9oGAhC-lrOCcO2K7p2OegIUzU_ZEeXag-1pD--LCdLQpVbqxH_I851nIg6BzE71gTDr7dB-NAVcePm8psXQXkFGiy34DNHpw-6ML1VdO_imGASQWuUev13_yj9nlQK0vDky1YgW27kiYEUWNF9FEUkPR6Mcr2CylinHBJF5kzIfZpIz9BkZhQWUzco")',
              }}
            ></div>
            <div>
              <p className="text-[#111418] text-base font-medium leading-normal">
                Meet Sarah
              </p>
              <p className="text-[#60758a] text-sm font-normal leading-normal">
                Sarah is a ceramic artist who creates unique and functional
                pieces inspired by nature.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAJgnWGEHy7MGFci-LgpISYtmbizk--5JpT-84Ld-UklvQ_sNixrnJukv9EWHDsEnAnn2iePO69AocfgjHikSIRNmQtAByQbvxOlosqk435g5O-GOQMTRK1MdUatMByFr1nQyKyiWmDAeDYhiT52RytWCC2j7Fku9eGIqqH0HQ7BYnhJocwHEqPe1wny4i4faHz_o3HiQTogLEODlbfy0DCaYNOADXMXXtHe1E20ddzJ9q5_SrP-dDLliY25DZn_6fcrmqNx8bjC8A")',
              }}
            ></div>
            <div>
              <p className="text-[#111418] text-base font-medium leading-normal">
                Meet David
              </p>
              <p className="text-[#60758a] text-sm font-normal leading-normal">
                David is a woodworker who crafts beautiful and sustainable items
                for the home.
              </p>
            </div>
          </div>
        </div>
        <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Shop by Category
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBci-_x0URsfK0EV2hv2RV_f9Y_JdGPmwmdASilRM5UO1eco-TbPA14GHOZNzEwj2dmU2sGJ6l2fLdzyL5gO2j2QQ6fbLGuBPlERt4ZJWB117Ug9KIk2p7HkWdaLJgMU0qa0WgflI58B6Qyf8PEQ7dsDB7f7uqEREOZg2NG3N0W-aRAqmyt5Qzc_RDzKkElqklwpRMPngcIvJ7cqYN2I8UPnQTOVM3uKaPYjraCmEQorGgbZ6A2AI78qrKEODjzuTHPAjX-VRS22uQ")',
              }}
            ></div>
            <div>
              <p className="text-[#111418] text-base font-medium leading-normal">
                Ceramics
              </p>
              <p className="text-[#60758a] text-sm font-normal leading-normal">
                Explore our collection of handmade ceramic items.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBh-qCZ0bcvIbUIaNeXN1Dw0vDLK6BzBqHE4UkV7M7Yfo8-UYm5xY_LLQfuI2UsCtsnjpGPJosCBf4dyHkTfaY7tuSfFctDQuq8iM-r4IHqkYWT7X_pkGncpXFOisb8HNd9kB3iBIsCX9LtZSlXO0W4d0kWioM6gweqwwIcQRNIgSfuSAtSFrzaKHawQMyrYJafO9Ubft97ISyW9Jm3m60p8KhjQtV3ODAXRqsNzsQR3DzoJsFjQFhhYxlz3_L1IfCYnsWs9ANTN94")',
              }}
            ></div>
            <div>
              <p className="text-[#111418] text-base font-medium leading-normal">
                Woodworking
              </p>
              <p className="text-[#60758a] text-sm font-normal leading-normal">
                Discover handcrafted wooden items for your home.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDHFcky8vhLOjPInvWXC5jzCX6vpYz_wt8brg-3LlhPVFL035CSFXIJfPOF89Bgx0wQgpriQJvZrPAG3Q31Y7C7iWdZWKPnAtAa0uR2aYhP3XFK_Oj9w1RQIgRDwVFMzibPSNfFWk_STu6rnXjQqov7bfPuUC4WOqFGgAonbT-dwiUOJQps-PqhqmtkU0_Fpdxbk1WfNcd5m3kU72iA06YlLiwsyUKgymKcVLYKWClQB4luB4Ye5EUHm52Tzdw0BLNH8jOqqOenlyE")',
              }}
            ></div>
            <div>
              <p className="text-[#111418] text-base font-medium leading-normal">
                Textiles
              </p>
              <p className="text-[#60758a] text-sm font-normal leading-normal">
                Find unique hand-painted and woven textiles.
              </p>
            </div>
          </div>
        </div>
      </main>
      
  );
}
