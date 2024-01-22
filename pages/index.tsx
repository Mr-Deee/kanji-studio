// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
// import styles from "styles/Home.module.css";
// import Navbar from "components/navbar";

// const inter = Inter({ subsets: ["latin"] });

// export default function Home() {
//   return (
//     <>
//     <div>
//        <Navbar/>
//  </div>
//     </>
//   );
// }
// App.tsx

import React from 'react';
import Navbar from '../components/navbar';

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      {/* Other content of your home page */}
    </div>
  );
};

export default App;
