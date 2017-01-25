import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SideMenuItem from './SideMenuItem';
import './SideMenu.scss';
import animate from './animate';

const lookUp = (el, className) => {
    while (el) {
        if (el.classList.contains(className)) {
            return el;
        }
        el = el.parentElement;
    }
    return undefined;
};

class SideMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: -1,
            contentStyles: {},
            content: ''
        };
        this.setSelected = this.setSelected.bind(this);
        this.handleGlobalClose = this.handleGlobalClose.bind(this);
    }

    get isOpen() {
        return this.state.selectedIndex !== -1;
    }

    componentDidMount() {
        document.body.addEventListener('touchstart', this.handleGlobalClose, true);
        document.body.addEventListener('mousedown', this.handleGlobalClose, true);
        this.el = ReactDOM.findDOMNode(this);
        this.contentEl = this.el.querySelector('.side-menu-container');
        this.offsetTopRelativeToWindow = this.contentEl.getBoundingClientRect().top;
    }

    componentWillUnmount() {
        document.body.removeEventListener('touchstart', this.handleGlobalClose, true);
        document.body.removeEventListener('mousedown', this.handleGlobalClose, true);
        this.el = undefined;
        this.contentEl = undefined;
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.menuOpen && this.isOpen) {
            this.close();
        }
    }

    setSelected(evt, selectedIndex, content) {
        const menuItem = lookUp(evt.target, 'side-menu-item');
        if (this.state.selectedIndex === selectedIndex) {
            this.close();
        } else {
            this.open(menuItem, selectedIndex, content);
        }
    }

    handleGlobalClose(evt) {
        if (!this.isOpen) {
            return;
        }
        if (evt.target !== this.el && !this.el.contains(evt.target)) {
            evt.preventDefault();
            evt.stopPropagation();
            evt.stopImmediatePropagation();
            this.close();
        }
    }

    close() {
        this.setState({ selectedIndex: -1 });
    }

    open(menuItem, selectedIndex, content) {
        // first, set the content, so we can calculate height
        this.setState({ selectedIndex, content });
        window.requestAnimationFrame(() => {
            const top = menuItem.offsetTop;
            const itemHeight = menuItem.clientHeight;
            const height = this.contentEl.clientHeight;
            let delta = top - height / 2 + itemHeight / 2;
            if (this.offsetTopRelativeToWindow + delta < this.offsetTopRelativeToWindow) {
                delta = 5;
            }
            const contentStyles = {
                top: delta + 'px'
            };
            // next, set height
            this.setState({ contentStyles });
        });
    }

    renderChildren() {
        return this.props.children.map((sideMenuItem, idx) => {

            if (sideMenuItem.type !== SideMenuItem) {
                console.error('SideMenu expects children of type SideMenuItem');
                return false;
            }

            const props = {
                label: sideMenuItem.props.label,
                key: idx,
                idx: idx,
                icon: sideMenuItem.props.icon,
                active: idx === this.state.selectedIndex ? 'selected' : ''
            };

            // if use passes on click, we don't open the menu, and assume they just want a button
            if (sideMenuItem.props.onClick) {
                props.onClick = (evt) => {
                    this.close();
                    sideMenuItem.props.onClick(evt);
                };
            } else {
                props.onClick = (evt) => this.setSelected(evt, idx, sideMenuItem.props.children);
            }

            // onOpen can be used for analytics
            if (sideMenuItem.props.onOpen) {
                props.onOpen = () => sideMenuItem.props.onOpen;
            };

            return (
                <SideMenuItem {...props}>
                    {sideMenuItem.props.children}
                </SideMenuItem>
            )
        });
    }

    render() {
        const fadeIn = this.state.selectedIndex !== -1 ? 'show' : '';
        const classNames = `side-menu-container ${fadeIn}`;
        return (
            <div className="side-menu">
                <div className="side-menu-items">{this.renderChildren()}</div>
                <div className={classNames} style={this.state.contentStyles}>
                    <div className="side-menu-content">{this.state.content}</div>
                </div>
            </div>
        )
    }

};

export default SideMenu;