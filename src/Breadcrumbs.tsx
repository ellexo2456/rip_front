import React from 'react';
import {Breadcrumb} from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom';
import './Breadcrumbs.css'
// import {getAlpinistById} from "./AlpinistPage/modules/get-alpinist-by-id.ts";

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <Breadcrumb className={"bread-crumbs_container"}>
            {location.pathname.startsWith("/rip_front/alpinist/") && (
                <Breadcrumb.Item linkAs={Link} linkProps={{to: '/rip_front'}}>
                    Главная
                </Breadcrumb.Item>
            )}

            {location.pathname.startsWith("/rip_front/alpinist/") && (
                pathnames.map((name, index) => {
                    if (name == 'rip_front') {
                        return
                    }
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    return isLast || name == 'alpinist' ? (
                        <Breadcrumb.Item active key={name}>
                            {name.replace(/alpinist/g, 'альпинист')}
                        </Breadcrumb.Item>
                    ) : (
                        <Breadcrumb.Item linkAs={Link} linkProps={{to: routeTo}} key={name}>
                            {name}
                        </Breadcrumb.Item>
                    );
                })
            )}

        </Breadcrumb>
    );
};

export default Breadcrumbs;
