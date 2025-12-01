import React, { useState } from 'react';
import { Image } from 'antd';

const PreviewImage: React.FC = ({ children, src, disabled }: any) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <span onClick={() => { setVisible(!disabled || true) }}>{children}</span>
            <Image
                width={0}
                style={{ display: 'none' }}
                src={src}
                preview={{
                    visible,
                    scaleStep: 1,
                    src,
                    onVisibleChange: (value) => {
                        setVisible(value);
                    },
                }}
            />
        </>
    );
};

export default PreviewImage;