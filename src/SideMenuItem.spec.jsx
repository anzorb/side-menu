import React from 'react';
import ReactTestUtils from 'react-addons-test-utils'
import SideMenuItem from './SideMenuItem';
//const renderer = ReactTestUtils.createRenderer();

const TestTree = React.createClass({
    render() {
        return <SideMenuItem label="haha">Item 4 Content</SideMenuItem>
    }
})

describe('SideMenuItem', () => {

    it('should not crap out', () => {
        console.log(SideMenuItem);
        const el = ReactTestUtils.renderIntoDocument(<TestTree />);
        console.log(el);
        //const result = renderer.getRenderOutput();

        expect(true).toBe(true);
    });

});