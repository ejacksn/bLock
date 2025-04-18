import Head from 'next/head' //use instead of head
import { StateContext } from "@/context/StateContext"
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {

    margin: 0;
    padding: 0;
    --dark-primary: #061003; 
    --mid-secondary: #AAAE7F;
    --light-primary: #D0D6B3;

    --color1: #171819;
    --color2: #232425;
    --color3: #00bd46;

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #D0D6B3;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #061003;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .poppins-medium {
  font-family: "Poppins", serif;
  font-weight: 500;
  font-style: normal;

  .poppins-semibold {
  font-family: "Poppins", serif;
  font-weight: 600;
  font-style: normal;
}

.poppins-bold {
  font-family: "Poppins", serif;
  font-weight: 700;
  font-style: normal;
}

.poppins-extrabold {
  font-family: "Poppins", serif;
  font-weight: 800;
  font-style: normal;
}

.poppins-black {
  font-family: "Poppins", serif;
  font-weight: 900;
  font-style: normal;
}
}
`

export default function App({ Component, pageProps }) {
  return (
    <>
        <Head>
          <title>bLock</title>
          <meta name='description' content='App for creating virtual blockchain time capsules'/>
          <meta name='robots' content='index, follow'/>
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon_package/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon_package/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon_package/favicon-16x16.png"/>
          <link rel="manifest" href="/favicon_package/site.webmanifest"/>
          <meta name="msapplication-TileColor" content="#da532c"/>
          <meta name="theme-color" content="#ffffff"/>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
              
        </Head>

        <GlobalStyle />

      <StateContext>
        <Component {...pageProps} />
      </StateContext>
    </>
  )
}
