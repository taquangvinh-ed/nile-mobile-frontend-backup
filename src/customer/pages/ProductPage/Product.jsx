"use client";

import { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from "@heroicons/react/20/solid";
import { singleFilters } from "../../components/Product/FilterData"; // Chỉ sử dụng singleFilters
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { filterProductsSimple } from "../../../State/Auth/Action"; // Sử dụng action mới
import ProductCardFilter from "../../components/Product/ProductCardFilter";

const sortOptions = [
  { name: "Giá: Từ thấp đến cao", value: "price_asc", current: false },
  { name: "Giá: Từ cao xuống thấp", value: "price_desc", current: false },
  { name: "Mới nhất", value: "newest", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product({ title }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const { products: filteredProducts, productsLoading, productsError } = useSelector((state) => state.auth);

  // Hàm chuyển đổi giá trị bộ lọc thành tham số API
  const getFilterParams = () => {
    const searchParams = new URLSearchParams(location.search);
    const price = searchParams.get("price") || "";
    const batteryCapacity = searchParams.get("battery_capacity") || "";
    const screenSize = searchParams.get("screen_size") || "";
    const sort = searchParams.get("sort") || "";
    const pageNumber = parseInt(searchParams.get("pageNumber")) || 0;
    const pageSize = parseInt(searchParams.get("pageSize")) || 10;

    const filters = {
      minPrice: null,
      maxPrice: null,
      minBattery: null,
      maxBattery: null,
      minScreenSize: null,
      maxScreenSize: null,
      sort,
      pageNumber,
      pageSize,
    };

    // Chuyển đổi giá trị "Mức giá" thành minPrice và maxPrice
    if (price) {
      switch (price) {
        case "<1":
          filters.maxPrice = 1000000;
          break;
        case "1-3":
          filters.minPrice = 1000000;
          filters.maxPrice = 3000000;
          break;
        case "3-5":
          filters.minPrice = 3000000;
          filters.maxPrice = 5000000;
          break;
        case "5-10":
          filters.minPrice = 5000000;
          filters.maxPrice = 10000000;
          break;
        case "10-15":
          filters.minPrice = 10000000;
          filters.maxPrice = 15000000;
          break;
        case "15-25":
          filters.minPrice = 15000000;
          filters.maxPrice = 25000000;
          break;
        case "20-25":
          filters.minPrice = 20000000;
          filters.maxPrice = 25000000;
          break;
        case "25-30":
          filters.minPrice = 25000000;
          filters.maxPrice = 30000000;
          break;
        case "30-50":
          filters.minPrice = 30000000;
          filters.maxPrice = 50000000;
          break;
        case ">85":
          filters.minPrice = 85000000;
          break;
        default:
          break;
      }
    }

    // Chuyển đổi giá trị "Dung lượng pin" thành minBattery và maxBattery
    if (batteryCapacity) {
      switch (batteryCapacity) {
        case "1000-4000":
          filters.minBattery = 1000;
          filters.maxBattery = 4000;
          break;
        case "4000-5000":
          filters.minBattery = 4000;
          filters.maxBattery = 5000;
          break;
        case "5000-6000":
          filters.minBattery = 5000;
          filters.maxBattery = 6000;
          break;
        case "6000-7000":
          filters.minBattery = 6000;
          filters.maxBattery = 7000;
          break;
        default:
          break;
      }
    }

    // Chuyển đổi giá trị "Kích thước màn hình" thành minScreenSize và maxScreenSize
    if (screenSize) {
      switch (screenSize) {
        case "3-<5":
          filters.minScreenSize = 3;
          filters.maxScreenSize = 5;
          break;
        case "5-<6":
          filters.minScreenSize = 5;
          filters.maxScreenSize = 6;
          break;
        case "6-<6.5":
          filters.minScreenSize = 6;
          filters.maxScreenSize = 6.5;
          break;
        case "6.5-<6.7":
          filters.minScreenSize = 6.5;
          filters.maxScreenSize = 6.7;
          break;
        case "6.7-<7":
          filters.minScreenSize = 6.7;
          filters.maxScreenSize = 7;
          break;
        case ">7":
          filters.minScreenSize = 7;
          break;
        default:
          break;
      }
    }

    return filters;
  };

  // Gọi API khi tham số URL thay đổi
  useEffect(() => {
    const filters = getFilterParams();
    dispatch(filterProductsSimple(filters)).then((response) => {
      if (response.success) {
        setProducts(response.products);
      } else {
        console.error("Filter products failed:", response.error);
      }
    });
  }, [location.search, dispatch]);

  // Xử lý bộ lọc radio
  const handleRadioFilter = (e, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  // Xử lý sắp xếp
  const handleSort = (sortValue) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("sort", sortValue);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  // Chuyển đổi dữ liệu sản phẩm để hiển thị
  const flattenedProducts = products.flatMap((product) =>
    product.variations.map((variation) => ({
      ...product,
      variation,
    }))
  );

  if (productsLoading) return <div>Đang tải...</div>;
  if (productsError) return <div>Lỗi: {productsError}</div>;

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop transition className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0" />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button type="button" onClick={() => setMobileFiltersOpen(false)} className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400">
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters for mobile */}
              <form className="mt-4 border-t border-gray-200 max-w-[200px] lg:hidden">
                {singleFilters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        <FormControl>
                          <RadioGroup
                            aria-labelledby={`mobile-${section.id}-label`}
                            name={section.id}
                            value={new URLSearchParams(location.search).get(section.id) || ""}
                            onChange={(e) => handleRadioFilter(e, section.id)}
                          >
                            {section.options.map((option, optionIdx) => (
                              <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">{title}</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500" />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <button
                          onClick={() => handleSort(option.value)}
                          className={classNames(option.current ? "font-medium text-gray-900" : "text-gray-500", "block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden")}
                        >
                          {option.name}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button type="button" onClick={() => setMobileFiltersOpen(true)} className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              <div>
                <div className="flex justify-between items-center">
                  <h1 className="text-lg opacity-55 font-bold">Filters</h1>
                  <FilterAltIcon className="opacity-50" />
                </div>
                <form className="hidden lg:block">
                  {singleFilters.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <FormLabel sx={{ color: "black" }} className="font-medium text-gray-900" id={`${section.id}-label`}>
                            {section.name}
                          </FormLabel>
                          <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                            <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          <FormControl>
                            <RadioGroup
                              aria-labelledby={`${section.id}-label`}
                              name={section.id}
                              value={new URLSearchParams(location.search).get(section.id) || ""}
                              onChange={(e) => handleRadioFilter(e, section.id)}
                            >
                              {section.options.map((option, optionIdx) => (
                                <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </div>

              {/* Product grid */}
              <div className="lg:col-span-4 w-full border border-black">
                <div className="flex flex-wrap justify-center bg-white py-1">
                  {flattenedProducts.length > 0 ? (
                    flattenedProducts.map((item) => <ProductCardFilter key={`${item.id}-${item.variation.ram}-${item.variation.rom}`} product={item} />)
                  ) : (
                    <p>Không có sản phẩm nào phù hợp với bộ lọc</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
