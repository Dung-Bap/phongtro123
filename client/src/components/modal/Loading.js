import React, { useEffect, useRef } from 'react';
import { Hearts } from 'react-loader-spinner';

const Loading = () => {
    const voteModalRef = useRef();
    useEffect(() => {
        voteModalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, []);
    return (
        <div ref={voteModalRef}>
            <Hearts
                height="100"
                width="100"
                color="#fa383e"
                ariaLabel="hearts-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
};

export default Loading;
