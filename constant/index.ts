import {
  MdOutlineRssFeed,
  MdSportsTennis,
  MdOutlineMoreHoriz,
} from "react-icons/md";
import { BsFillChatTextFill } from "react-icons/bs";
import { BiCartAlt } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { HiComputerDesktop, HiShoppingBag } from "react-icons/hi2";
import { FaGamepad } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { RiBearSmileFill } from "react-icons/ri";
import { GiRolledCloth } from "react-icons/gi";
import { product, product2, product3, product4, product5 } from "@/assets";

const category = [
  {
    title: "",
    value: "",
  },
  {
    title: "Computing",
    value: "Computing",
  },
  {
    title: "Supermarket",
    value: "Supermarket",
  },
  {
    title: "Games",
    value: "Games",
  },
  {
    title: "Kids",
    value: "Kids",
  },
  {
    title: "Automobile",
    value: "Automobile",
  },
  {
    title: "Sport",
    value: "Sport",
  },
  {
    title: "Fashion",
    value: "Fashion",
  },
];

const Filter = [
  {
    title: "Location",
    value: "location",
  },
  {
    title: "Price",
    value: "Price",
  },
];

const Price = [
  {
    title: "Location",
    value: "location",
  },
  {
    title: "Price",
    value: "Price",
  },
];

const Tab = [
  {
    title: "Feed",
    icon: MdOutlineRssFeed,
    active: "feed",
    route: "/dashboard/feed",
  },
  {
    title: "Inbox",
    icon: BsFillChatTextFill,
    active: "inbox",
    route: "/dashboard/chat",
  },
  {
    title: "Carts",
    icon: BiCartAlt,
    active: "cart",
    route: "/dashboard/carts",
  },
  {
    title: "Notification",
    icon: IoMdNotifications,
    active: "notify",
    route: "",
  },
];

const Categories = [
  {
    title: "Computing",
    icon: HiComputerDesktop,
    value: "Computing",
  },
  {
    title: "SuperMarket",
    icon: HiShoppingBag,
    value: "SuperMarket",
  },
  {
    title: "Games",
    icon: FaGamepad,
    value: "Games",
  },
  {
    title: "Kids",
    icon: RiBearSmileFill,
  },
  {
    title: "Automobile",
    icon: AiTwotoneCar,
    value: "Automobile",
  },
  {
    title: "Sports",
    icon: MdSportsTennis,
    value: "Sports",
  },
  {
    title: "Fashion",
    icon: GiRolledCloth,
    value: "Automobile",
  },
  {
    title: "Other Categories",
    icon: MdOutlineMoreHoriz,
    value: "other",
  },
];

type Props = {
  image: any[];
  title: string;
  price: string;
  location: string;
  isSellerActive: boolean;
  description: string;
  id: number;
  quantity: number;
};

const products: Props[] = [
  {
    image: [product, product, product, product, product],
    title: "Windows Laptop M2 Chip",
    price: "$4,000 - 0.002 ETH",
    location: "Port Harcourt, Rivers state",
    isSellerActive: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ipsum quis tellus rhoncus, sed ullamcorper nunc mollis.",
    id: 1,
    quantity: 0,
  },
  {
    image: [product, product, product, product, product],
    title: "Macbook M2 Chip",
    price: "$4,000 - 0.002 ETH",
    location: "Port Harcourt, Rivers state",
    isSellerActive: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ipsum quis tellus rhoncus, sed ullamcorper nunc mollis.",
    id: 2,
    quantity: 0,
  },
  {
    image: [product2, product, product3, product4, product5],
    title: "M2 Chip",
    price: "$4,000 - 0.002 ETH",
    location: "Port Harcourt, Rivers state",
    isSellerActive: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ipsum quis tellus rhoncus, sed ullamcorper nunc mollis.",
    id: 3,
    quantity: 0,
  },
  {
    image: [product, product, product, product, product],
    title: "Macbook M2",
    price: "$4,000 - 0.002 ETH",
    location: "Port Harcourt, Rivers state",
    isSellerActive: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ipsum quis tellus rhoncus, sed ullamcorper nunc mollis.",
    id: 4,
    quantity: 0,
  },
  {
    image: [product, product, product, product, product],
    title: "Chip",
    price: "$4,000 - 0.002 ETH",
    location: "Port Harcourt, Rivers state",
    isSellerActive: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ipsum quis tellus rhoncus, sed ullamcorper nunc mollis.",
    id: 5,
    quantity: 0,
  },
  {
    image: [product, product, product, product, product],
    title: "Chip",
    price: "$4,000 - 0.002 ETH",
    location: "Port Harcourt, Rivers state",
    isSellerActive: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ipsum quis tellus rhoncus, sed ullamcorper nunc mollis.",
    id: 6,
    quantity: 0,
  },
];

type SellingPointType = {
  title: string;
  description: string;
};

const sellingPoint: SellingPointType[] = [
  {
    title: "Direct and Authentic Interactions",
    description:
      "Experience a new level of buyer-seller connection with our live sessions. Sellers can showcase their products in real-time, allowing buyers to engage directly, ask questions, and receive instant feedback.",
  },
  {
    title: "Curated Product Galleries",
    description:
      "EExplore beautifully curated galleries created by our diverse community of sellers. Discover unique and innovative products that are carefully selected to cater to your needs and preferences.",
  },
  {
    title: "Global Reach, Local Charm",
    description:
      "Connect with sellers and buyers from around the world while still supporting local businesses. Our marketplace enables you to access a global network of products while fostering a sense of community and supporting independent sellers.",
  },
  {
    title: "Convenience and Seamless Experience",
    description:
      "Enjoy a hassle-free shopping experience with our intuitive interface and streamlined processes. From browsing products to secure transactions, we prioritize convenience and aim to make every step effortless.",
  },
  {
    title: "Enhanced Security",
    description:
      "Trust and peace of mind are paramount in our decentralized marketplace. Built on blockchain technology, we ensure secure transactions and protect your personal information. Our platform provides transparency, immutability, and data integrity.",
  },
];

export { category, Tab, Filter, Price, Categories, products, sellingPoint };
