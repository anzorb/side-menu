import React, { Component } from 'react';

const SideMenuItem = (props) => {

    const handleClick = (evt) => {
        if (props.onOpen) {
            props.onOpen();
        }
        props.onClick(evt);
    }
    const classNames = `side-menu-item ${props.active}`;
    return (
        <div className={classNames} onClick={(evt) => handleClick(evt)}>
            <div className="side-menu-item__icon">{props.icon}</div>
            <div className="side-menu-item__label">{props.label}</div>
        </div>
    )

};

export default SideMenuItem;