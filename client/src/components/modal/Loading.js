import React, { useEffect, useRef } from 'react';
import { HashLoader } from 'react-spinners';

const Loading = () => {
    const voteModalRef = useRef();
    useEffect(() => {
        voteModalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, []);
    return (
        <div ref={voteModalRef}>
            <HashLoader color="#ee3131" />;
        </div>
    );
};

export default Loading;
