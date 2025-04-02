export const storages = [
  "4GB",
  "6GB",
  "8GB",
  "32GB",
  "64GB",
  "128GB",
  "25GB",
  "512GB",
  "1TB",
];

export const filters = [
  {
    id: "phone_catogary",
    name: "Loại điện thoại",
    options: [
      { value: "iphone", label: "iPhone (iOS)" },
      { value: "Android", label: "Android" },
      { value: "normal", label: "Phổ thông" },
    ],
  },
];
export const singleFilters = [
  {
    id: "price",
    name: "Mức giá",
    options: [
      { value: "<1", label: "Dưới 1 triệu" },
      { value: "1-3", label: "1 đến 3 triệu" },
      { value: "3-5", label: "3 đến 5 triệu " },
      { value: "5-10", label: "5 đến 10 triệu" },
      { value: "10-15", label: "10 đến 15 triệu" },
      { value: "15-25", label: "15 đến 20 triệu" },
      { value: "20-25", label: "20 đến 25 triệu" },
      { value: "25-30", label: "25 đến 30 triệu" },
      { value: "30-50", label: "30 đến 50 triệu" },
      { value: ">85", label: "Trên 85 triệu" },
    ],
  },
  {
    id: "battery_capacity",
    name: "Dung lượng pin",
    options: [
      { value: "1000-4000", label: "1000mAh → 4000mAh" },
      { value: "4000-5000", label: "4000mAh → 5000mAh" },
      { value: "5000-6000", label: "5000mAh → 6000mAh" },
      { value: "6000-7000", label: "6000mAh → 7000mAh" },
    ],
  },
  {
    id: "screen_size",
    name: "Kích thước màn hình",
    options: [
      { value: "3-<5", label: 'Từ 3" đến < 5"' },
      { value: "5-<6", label: 'Từ 5" đến < 6"' },
      { value: "6-<6.5", label: 'Từ 6" đến < 6.5"' },
      { value: "6.5-<6.7", label: 'Từ 6.5" đến < 6.7"' },
      { value: "6.7-<7", label: 'Từ 6.7" đến < 7"' },
      { value: ">7", label: 'Từ 7" trở lên' },
    ],
  },
];
