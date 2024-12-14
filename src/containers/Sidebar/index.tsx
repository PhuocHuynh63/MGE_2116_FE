'use client';

import { ROUTES } from '@/routes';
import NavLink from '@/utils/hooks/NavLink';
import '@styles/main-sidebar.style.scss';
import Link from 'next/link';

const SideBarMainPage = () => {
    return (
        <div className="sidebar-main">
            <Link href={ROUTES.BID_MGE}>
                <div className="logo"></div>
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
    )
}

export default SideBarMainPage