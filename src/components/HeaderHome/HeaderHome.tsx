'use client';

import { IMGE } from '@/shemaValidations/model.schema'
import { FiAlignJustify } from 'react-icons/fi'

interface IHeaderHomePage {
    data: IMGE;
}

const HeaderHome = (props: IHeaderHomePage) => {
    return (
        <div className="header-home">
            <div className="top d-flex">
                <div className="left">
                    <button title="Menu">
                        <FiAlignJustify className="icon" />
                    </button>
                </div>

                <div className="right container">
                    <div className="row justify-content-center">
                        {props.data.data.results.map((item, index) => (
                            <div key={index} className="command">
                                <img src={item.img} className="logo-command" alt={item.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bottom">
                <p className='text'>Kingdom 2116</p>
                <p className='text'>Minimum point bid stage: <span className='minimum-bid'>10,000,000</span></p>
            </div>

            <div className="type">
                <span className='typeMge'>{props.data.data.results[0].typeMge}</span>
            </div>
        </div>
    )
}

export default HeaderHome