import Head from 'next/head';
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>How to test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <section className="max-w-screen-md">
          <h1 className="text-8xl font-black leading-normal">How to test</h1>
          <p className="text-2xl leading-normal">
            <strong>How to test</strong> is a place where you will find a set of guides, examples, on
          </p>
          <ul className="list-disc list-inside text-2xl leading-normal mb-8">
            <li>how to go about testing,</li>
            <li>writing meaningful tests,</li>
            <li>well described tests,</li>
            <li>or even how to begin writing test first code.</li>
          </ul>
          <p>
            All of the code examples you will find here are ones I either came
            up with or I had reviewed at work (those are changed, not 1:1)
            or it is a code I created in my free time.
          </p>
        </section>

        <nav>
          <Link href="/implementation-detail-in-tests-description">
            <a className="text-blue-600 hover:text-blue-800 hover:underline">(Problems with) implementation detail in test's description</a>
          </Link>
        </nav>
      </main>

      <footer className="container mx-auto pt-10">
        Footer content ... to be added ;)
      </footer>
    </>
  )
}
