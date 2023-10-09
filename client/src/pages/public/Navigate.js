/** @format */

import React from "react";
import { navigation } from "../../ultils/contants";
import { NavLink } from "react-router-dom";

const Navigate = () => {
    return (
        <div className="w-full bg-main flex justify-center">
            <div className="w-main flex items-center">
                {navigation.map((el) => (
                    <NavLink
                        className={
                            "py-[10px] px-[5px] text-sm font-medium text-white hover:bg-secondary"
                        }
                        key={el.id}
                    >
                        {el.title}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Navigate;
