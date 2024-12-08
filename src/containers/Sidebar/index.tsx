'use client';

import { ROUTES } from '@/routes';
import '@styles/main-sidebar.style.scss';
import Link from 'next/link';

const SideBarMainPage = () => {
    return (
        <div className="sidebar-main">
            <div className="logo"></div>
            <ul className="content">
                <li className=''>
                    <Link href={ROUTES.BID_MGE}>
                        Bid MGE
                    </Link>
                </li>
                <li className=''>
                    <Link href={ROUTES.DATA_POINTS}>
                        Data Points
                    </Link>
                </li>
                <li className=''>
                    <Link href={ROUTES.RESULTS_TOP}>
                        Results Top
                    </Link>
                </li>
                <li className=''>
                    <Link href={ROUTES.HISTORY}>
                        History
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SideBarMainPage