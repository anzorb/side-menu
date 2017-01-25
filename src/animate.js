let capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const vendors = [
    'Webkit',
    'Moz',
    'O',
    'ms'
];

const transitionEnd = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'msTransition': 'MSTransitionEnd',
    'transition': 'transitionend'
};

class Animate {
    constructor() {
        // transitionend is special.
        this.transitionend = transitionEnd[this.format('transition', true)];
    }

    /**
     * Formats a CSS property with the appropriate
     * vendor prefix as required. Example:
     * transform >>> WebkitTransform
     * @param {string} propertyName the CSS property to format.
     * @return {string} The formatted (vendor-prefixed) property.
     */
    format(propertyName, forceVendor) {
        let testEl = document.createElement('div');

        // Check if the property exists as-is. We use
        // transform as a benchmark for all properties
        // since it is actually more reliable than some
        // specific properties (i.e. transition on iPad Mini 8.2)
        if (!forceVendor) {
            if (testEl.style.transform !== undefined) {
                return propertyName;
            }
        }

        // Capitalize propertyName.
        let _propertyName = capitalizeFirstLetter(propertyName);

        // Cycle through known vendors.
        for (let vendor in vendors) {
            // Combine vendor with capitalized propertyName.
            let vendorProp = vendors[vendor] + _propertyName;

            // Check whether the vendor property exists.
            if (testEl.style[vendorProp] !== undefined) {
                return vendorProp;
            }
        }

        // Return the original propertyName.
        return propertyName;
    }
}

export default new Animate();
