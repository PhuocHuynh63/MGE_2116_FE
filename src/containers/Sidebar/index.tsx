'use client';

import { ROUTES } from '@/routes';
import NavLink from '@/utils/hooks/NavLink';
import Link from 'next/link';
import { useMenu } from '@/lib/menu.provider';
import '@styles/main/sidebar.style.scss';

const SideBarMainPage = () => {
    const menuContext = useMenu();
    const isOpenMenu = menuContext?.isMenuOpen;
    const toggleMenu = menuContext?.toggleMenu;

    return (
        <div className='sidebar-main-container'>
            <div className={`sidebar-main ${isOpenMenu ? 'open' : 'close'}`}>
                <div className="filter-blur" onClick={toggleMenu} />
                <Link href={ROUTES.BID_MGE}>
                    <div className="logo" />
                </Link>
                <ul className="content">
                    <NavLink href={ROUTES.BID_MGE}>
                        <li className='bid_mge'>
                            Bid MGE
                        </li>
                    </NavLink>
                    <NavLink href={ROUTES.DATA_POINTS}>
                        <li className='data_points'>
                            Data Points
                        </li>
                    </NavLink>
                    <NavLink href={ROUTES.RESULTS_TOP}>
                        <li className='results_top'>
                            Results Top
                        </li>
                    </NavLink>
                    <NavLink href={ROUTES.HISTORY}>
                        <li className='history'>
                            History
                        </li>
                    </NavLink>
                </ul>
            </div>
        </div>
    )
}

export default SideBarMainPage