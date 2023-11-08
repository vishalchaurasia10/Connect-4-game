import Head from "next/head";
import ConnectFour from "./components/ConnectFourBoard";

export const metadata = {
  title: 'Battle of the Bots | Home'
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Connect Four</title>
      </Head>
      <ConnectFour />
    </>
  )
}
