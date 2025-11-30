import { useEffect } from 'react';
import 'src/css/globals.css';

export default function MyApp({ Component, pageProps }) {
    const { global, ...page } = pageProps;

    useEffect(() => {
        const themeColor = page.colors || 'colors-a';
        document.body.setAttribute('data-theme', themeColor);
    }, [page.colors]);

    return <Component {...pageProps} />;
}
