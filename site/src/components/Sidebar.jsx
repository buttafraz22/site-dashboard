import { FcBullish } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineLogout } from 'react-icons/hi';
import classNames from 'classnames';
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../lib/constants';
import { useAuth } from '../hooks/useAuth';



const linkClass =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

const SidebarLink = ({ link }) => {
    const { pathname } = useLocation();

    return (
		<Link
			to={link.path}
			className={classNames(pathname === link.path ? 'bg-secondary-700 text-white-200' : 'text-black', linkClass)}
		>
			<span className="text-xl">{link.icon}</span>
			{link.label}
		</Link>
	)
}
const Sidebar = () => {
    const navigate = useNavigate();
    const { handleLogout } = useAuth();

    const onLogout = (e) => {
        e.preventDefault();

        handleLogout();
        navigate('/login');
    }
    return (
        <div className='bg-teal-200
        flex flex-col 
        w-60
        p-3
        text-white'
        >
            {/* Box 1, the logo and text */}
            <div className='flex items-center gap-2 px-2 py-5'>
                <FcBullish fontSize={30} />
                <span className='text-teal-500 text-lg'>Stocks App</span>
            </div>

            {/* Box 2 , the open sidebar and the links */}
            <div className='py-8 flex flex-1 flex-col gap-0.5'>
                {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                    <SidebarLink key={item.key} link={item}/>
                )
                )}
            </div>

            {/* Box 3, the bottom bar with settings and logout */}
            <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-900'>
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
                <div className={classNames(linkClass, 'cursor-pointer text-red-500')}
                onClick={onLogout}>
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Logout
                </div>
            </div>
        </div>
    )
};

export default Sidebar;