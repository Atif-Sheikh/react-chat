import React from 'react';
import { Spinner } from "@chakra-ui/react";

import './loader.css'

const Loader = ({color="blue.500"}) => {
    return (
        <div className='loaderContainer'>
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color={color}
                size="xl"
            />
        </div>
    );
};

export default Loader;
