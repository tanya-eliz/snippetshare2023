import * as React from 'react';
import Navbar from '../../components/NavBar/Navbar';
import {Snippets} from '../../components/Snippets/Snippets';

const SnippetsPage = () => {
    return(
        <>
            <Navbar />
            <Snippets/>
        </>
    )
}

export default SnippetsPage;