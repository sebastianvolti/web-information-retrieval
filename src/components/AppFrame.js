import React from 'react';
import propTypes from 'prop-types';

const AppFrame = ({header, body, footer}) => {
    return (
        <div>
            <div className="app-frame">
                <div>{body}</div>
            </div>  
        </div>
    );
};

AppFrame.propTypes = {
    header: propTypes.string.isRequired,
    body: propTypes.element.isRequired,
};

export default AppFrame;
