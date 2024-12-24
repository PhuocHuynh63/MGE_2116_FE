'use client'

import { IMGE } from "@/shemaValidations/model.schema"
import '@styles/main-headerhome.style.scss'

interface IHomePage {
    data: IMGE
}

const HomePage = (props: IHomePage) => {
    return (
        <div className="home-page">
            <div className="d-flex">
                <div className="left">
                    <button>Hello</button>
                </div>

                <div className="right container">
                    <div className="row ">
                        {props.data.data.results.map((item) => (
                            <div key={item.id} className="command">
                                <img src={item.img} className="logo-command" alt={item.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage