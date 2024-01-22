// import "styles/globals.css";
// import type { AppProps } from "next/app";

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }
// App.tsx

import React from 'react';
import Navbar from '../components/navbar';

const App: React.FC = () => {
  return (
    <div>
      <Navbar brandName={''} imageSrcPath={''} navItems={[]} />
      {/* Other content of your home page */}
    </div>
  );
};

export default App;