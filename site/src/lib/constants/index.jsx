import {
	HiOutlineViewGrid,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi';	
import { FaBars, FaChartLine, FaHistory, FaLaptop, FaCommentDollar } from "react-icons/fa";
import { CiBadgeDollar } from "react-icons/ci";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'summary',
		label: 'Summary',
		path: '/dashboard',
		icon: <FaBars />
	},
	{
		key: 'stocksymbols',
		label: 'Symbols',
		path: '/dashboard/symbols',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'analytics',
		label: 'Analysis',
		path: '/dashboard/analysis',
		icon: <CiBadgeDollar />
	},
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'support',
		label: 'Help & Support',
		path: '/dashboard/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]



export const features = [
    {
        title: 'Information, You Can Trust.',
        icon: <FaLaptop fontSize={80} className=' w-[60px] h-[60px] object-contain m-auto'/>,
        content: 'Leave the skeptical part to us, and do what you do best: Make money!'
    },
    {
        title: 'Real Time Data.',
        icon: <FaChartLine fontSize={80} className=' w-[60px] h-[60px] object-contain m-auto'/>,
        content: 'Get PSX floor data, on our tabs. Its free!'
    },
	{
        title: 'Augmented History.',
        icon: <FaHistory fontSize={80} className=' w-[60px] h-[60px] object-contain m-auto'/>,
        content: 'Get upto 5 years of historical stock data, all curated by our experts diligently.'
    },
	{
        title: 'Leading Bull Information.',
        icon: <FaCommentDollar fontSize={80} className=' w-[60px] h-[60px] object-contain m-auto'/>,
        content: 'Get Leading Bull Information, courtesy of our experts.'
    },
] 

export const feedback = [
    {
      id: "feedback-1",
      content:
        "PSX app has improved our team productivity by an order of magnitude. Since making the  switch our team has become a well-oiled collaboration machine.",
      name: "Satish Patel",
      title: "Founder & CEO, Huddle",
    },
    {
      id: "feedback-2",
      content:
        "PSX app has improved our team productivity by an order of magnitude. Since making the  switch our team has become a well-oiled collaboration machine.",
      name: "Bruce McKenzie",
      title: "Founder & CEO, Huddle"
    },
    {
      id: "feedback-3",
      content:
      "PSX app has improved our team productivity by an order of magnitude. Since making the  switch our team has become a well-oiled collaboration machine.",
      name: "Iva Boyd",
      title: "Founder & CEO, Huddle",
    },
  ];
  