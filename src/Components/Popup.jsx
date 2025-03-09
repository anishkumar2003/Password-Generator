import React, { useState } from 'react';

function Popup({ message, iserror }) {
    const [isActive, setActive] = useState(true);
    const popupClass = iserror ? 'bg-red-500 text-white p-2 rounded w-[50%] relative mt-2' : 'bg-green-500 text-white p-2 rounded w-[50%] relative mt-2';
    const closeButtonClass = 'absolute top-0 right-0 mt-1 mr-2 text-red-600 cursor-pointer';

    const handleClose = () => {
        setActive(false);
    };

    if (!isActive) {
        return null;
    }

    return (
        <div className={popupClass}>
            <h2>{message}</h2>
            <h2 className={closeButtonClass} onClick={handleClose}>X</h2>
        </div>
    );
}

export default Popup;
