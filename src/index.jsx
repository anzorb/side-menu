import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SideMenu from './SideMenu';
import SideMenuItem from './SideMenuItem';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            toggleOn: false,
            option: 'Option 1'
        };
        this.toggleChecked = this.toggleChecked.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.changeOption = this.changeOption.bind(this);
    }

    handleToggle() {
        this.setState({ toggleOn: !this.state.toggleOn });
    }

    toggleChecked(evt) {
        evt.stopPropagation();
        const checked = !this.state.checked;
        this.setState({ checked });
    }

    changeOption(option) {
        this.setState({ option, menuOpen: false });
    }

    render() {
        const dynamicItem = (
            <span>
                <input type="checkbox" checked={this.state.checked}/>&nbsp;Check me
            </span>
        )
        const validateCheckbox = (evt) => {
            evt.preventDefault();
            this.toggleChecked();
        };
        const toggleIcon = this.state.toggleOn ? <i className="fa fa-toggle-on"></i> : <i className="fa fa-toggle-off"></i>;
        const toggleValue = `Toggle ${this.state.toggleOn}`;
        return (
            <SideMenu open={this.state.menuOpen}>
                <SideMenuItem label={this.state.option} icon={<i className="fa fa-grav"></i>}>
                    <ul>
                        <li onClick={() => this.changeOption('Option 1')}>Option 1</li>
                        <li onClick={() => this.changeOption('Option 2')}>Option 2</li>
                        <li onClick={() => this.changeOption('Option 3')}>Option 3</li>
                        <li onClick={() => this.changeOption('Option 4')}>Option 4</li>
                        <li onClick={() => this.changeOption('Option 5')}>Option 5</li>
                        <li onClick={() => this.changeOption('Option 6')}>Option 6</li>
                    </ul>
                </SideMenuItem>
                <SideMenuItem label="Item 2" icon={<i className="fa fa-user-circle-o"></i>}>
                    Item 2 Content
                </SideMenuItem>
                <SideMenuItem label={dynamicItem} onClick={this.toggleChecked} icon={<i className="fa fa-bath"></i>}>
                    Item 3 Content
                </SideMenuItem>
                <SideMenuItem label={toggleValue} onClick={this.handleToggle} icon={toggleIcon}>
                    Item 4 Content
                </SideMenuItem>
            </SideMenu>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));