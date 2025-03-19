"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "../../AuthModal/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../State/Auth/Action";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
const navigation = {
  categories: [
    {
      id: "phoneCategories",
      name: "Điện thoại",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "data:image/jpeg;base64,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",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "data:image/jpeg;base64,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",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "brandID",
          name: "Thương hiệu",
          items: [
            { id: "iphone", name: "iPhone", href: "#" },
            { id: "samsung", name: "Samsung", href: "#" },
            { id: "xiaomi", name: "Xiaomi", href: "#" },
            { id: "oppo", name: "OPPO", href: "#" },
            { id: "realme", name: "realme", href: "#" },
            { id: "tecno", name: "TECNO", href: "#" },
            { id: "vivo", name: "vivo", href: "#" },
            { id: "nokia", name: "Nokia", href: "#" },
            { id: "masstel", name: "Masstel", href: "#" },
          ],
        },
        {
          id: "phonePriceID",
          name: "Mức giá điện thoại",
          items: [
            { name: "Dưới 2 triệu", href: "#" },
            { name: "Từ 2 - 4 triệu", href: "#" },
            { name: "Từ 4 - 7 triệu", href: "#" },
            { name: "Từ 7 - 13 triệu", href: "#" },
            { name: "Từ 13 - 20 triệu", href: "#" },
            { name: "Trên 20 triệu", href: "#" },
          ],
        },
        {
          id: "HotProductID",
          name: "Điện thoại HOT🔥",
          items: [
            { name: "iPhone 15 Pro Max", href: "#" },
            { name: "Galaxy 25 Ultra", href: "#" },
          ],
        },
      ],
    },
    {
      id: "laptop",
      name: "Laptop",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Phụ kiện`", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleAvatarClick = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    }
  };

  const dispatch = useDispatch();

  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token && !isAuthenticated && !user) {
    }
  }, [dispatch, isAuthenticated, user]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLoginSuccess = (userData) => {
    setIsAuthModalOpen(false);
  };

  return (
    <div className="bg-white" style={{ zIndex: 1000, position: "relative" }}>
      {/* Mobile meanu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pb-8 pt-10"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                          />
                          <a
                            href={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.id} className="flow-root">
                              <Link
                                to={`/${category.id}/${section.id}/${item.id}`}
                                className="-m-2 block p-2 text-gray-500"
                                onClick={() => setOpen(false)}
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign in
                </a>
              </div>
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Create account
                </a>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
              <Popover className="relative">
                {/* Nút để mở menu */}
                <PopoverButton className="-m-2 flex items-center p-2 focus:outline-none">
                  <UserIcon className="h-6 w-6 text-gray-900" />{" "}
                  {/* Biểu tượng My Account */}
                  <span className="ml-3 block text-base font-medium text-gray-900">
                    My Account_t
                  </span>
                </PopoverButton>

                {/* Menu xổ xuống */}
                {isAuthenticated && (
                  <PopoverPanel className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {/* Các tùy chọn trong menu */}
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Đơn hàng của tôi
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Thông tin tài khoản
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </a>
                    </div>
                  </PopoverPanel>
                )}
              </Popover>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-green-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          <span className="text-white text-lg font-semibold mr-4">
            GIAO NHANH - MIỄN PHÍ
          </span>
          cho đơn từ 300k
        </p>

        <nav
          aria-label="Top"
          className="flex mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className=" border-gray-200">
            <div className="flex items-center justify-between h-16">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/*Logo */}
              <div className="  ml-4 flex lg:ml-0 ">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dwif85oqc/image/upload/v1739246144/ecommerce/images/Logo/hvqpxo32q2njeq0uwph9.png"
                  className="h-14 w-auto object-cover cursor-pointer"
                  onClick={() => navigate("/")}
                />
              </div>

              {/* Flyout menus */}
              <PopoverGroup className=" hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600">
                          {category.name}
                        </PopoverButton>
                      </div>

                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 top-1/2 bg-white shadow"
                        />

                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category.featured.map((item) => (
                                  <div
                                    key={item.name}
                                    className="group relative text-base sm:text-sm"
                                  >
                                    <img
                                      alt={item.imageAlt}
                                      src={item.imageSrc}
                                      className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                    />
                                    <a
                                      href={item.href}
                                      className="mt-6 block font-medium text-gray-900"
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0 z-10"
                                      />
                                      {item.name}
                                    </a>
                                    <p aria-hidden="true" className="mt-1">
                                      Shop now
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p
                                      id={`${section.name}-heading`}
                                      className="font-medium text-gray-900"
                                    >
                                      {section.name}
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`${section.name}-heading`}
                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      {section.items.map((item) => (
                                        <li key={item.id} className="flow-root">
                                          <Link
                                            to={`/${category.id}/${section.id}/${item.id}`}
                                            className="-m-2 block p-2 text-gray-500"
                                            onClick={() => setOpen(false)}
                                          >
                                            {item.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </PopoverGroup>

              {/* Search */}
              <div className=" mx-5 hidden lg:flex flex-1 justify-centerx">
                <TextField
                  id="filled-basic"
                  placeholder="Tìm kiếm"
                  variant="filled"
                  size="small"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <SearchIcon sx={{ color: "gray", mr: 1 }} />
                      ),
                    },
                  }}
                  sx={{
                    width: "40rem",
                    maxWidth: "600px",
                    backgroundColor: "#f5f5f5",
                    "& .MuiFilledInput-root": {
                      borderRadius: "4px",
                    },
                  }}
                />
              </div>

              {/*Right icon */}
              <div className=" ml-auto flex items-center">
                <div className="border-t border-gray-200 px-4 py-6">
                  <Popover className="relative">
                    {/* Nút để mở menu */}
                    <PopoverButton className="-m-2 flex items-center p-2 focus:outline-none">
                      <UserIcon
                        onClick={handleAvatarClick}
                        className="h-6 w-6 text-gray-900"
                      />{" "}
                      {/* Biểu tượng My Account */}
                    </PopoverButton>

                    {/* Menu xổ xuống */}
                    {isAuthenticated && (
                      <PopoverPanel className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {/* Các tùy chọn trong menu */}
                          <Link
                            to="/account/order"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Đơn hàng của tôi
                          </Link>
                          <Link
                            to="/userProfile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Thông tin tài khoản
                          </Link>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Đăng xuất
                          </a>
                        </div>
                      </PopoverPanel>
                    )}
                  </Popover>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="" className="group -m-2 flex items-center p-2">
                    <ShoppingCartOutlinedIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-900 group-hover:text-gray-500"
                      onClick={() => navigate("/cart")}
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      0
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </header>
    </div>
  );
}
