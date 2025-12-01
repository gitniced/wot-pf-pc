import React, { useState, useRef, useEffect } from 'react';
import styles from './index.module.less';

function Popover({ content, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef(null);

    useEffect(() => {
        
        function handleClickOutside(event) {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
          
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    

    return (
        <div ref={popoverRef} className={styles.popover_container}>
            <div className={styles.popover_trigger} onClick={() => setIsOpen(!isOpen)}>
                {children}
            </div>
            {isOpen && (
                <div className={styles.popover_content} >
                    {content}
                </div>
            )}
        </div>
    );
}


export default Popover;