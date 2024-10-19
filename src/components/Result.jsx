import { useState, useEffect, useContext } from 'react';
import { DataContext } from '../context/DataProvider';
import { Box, styled } from '@mui/material';

const Container = styled(Box)`
    height: 41vh;
    border-top: 1px solid #2f2f2f;
    background-color: white;
`;

const Iframe = styled('iframe')`
    width: 100%;
    height: 100%;
    border: none;
`;

const Result = () => {
    const [srcDoc, setSrcDoc] = useState('');
    const { html, css, js } = useContext(DataContext);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                    <body>${html}</body>
                    <style>${css}</style>
                    <script>${js}</script>
                </html>
            `);
        }, 250);

        return () => clearTimeout(timeout);
    }, [html, css, js]);

    return (
        <Container>
            <Iframe
                srcDoc={srcDoc}
                title="output"
                sandbox="allow-scripts"
                frameBorder="0"
                width="100%"
                height="100%"
            />
        </Container>
    );
};

export default Result;
