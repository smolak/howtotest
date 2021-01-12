import Head from 'next/head';
import { Code } from '../components/Code';

export default function ImplementationDetailInTestsDescription() {
  return (
    <>
      <Head>
        <title>Structure of a test suite</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto max-w-screen-lg p-4">
        <article>
          <h1 className="text-5xl leading-normal font-black max-w-screen-lg mb-10">Structure of a test suite</h1>
          <section>
            <aside>
              <p>
                I am using{' '}
                <a href="https://mochajs.org/" target="_blank">
                  Mocha
                </a>{' '}
                here, but every test runner should have similar capabilities.
              </p>
            </aside>
            <h3 className="text-3xl font-black leading-normal">Simple example</h3>
            <Code>
              {`describe('Starship class', () => { // (1)
  describe('engage method', () => { // (1a)
    it('should accelerate the ship to set speed', () => { // (2)
      const ussEnterprise = new Starship(); // (3)
      const warp3 = 3;                      //
      ussEnterprise.setSpeed(warp3);        //

      ussEnterprise.engage(); // (4)
      
      expect(ussEnterprise.speed).toEqual(warp3); // (5)
    });
  });
});`}
            </Code>
            <p>Let's break it down:</p>
            <h4>1. The name of the thing we're testing</h4>
            <p>
              It's like the title of the book, an identifier for the test suite, usually it's the name of the module /
              class / function / ...
            </p>
            <p>
              The <strong>1a</strong> is just a scope for the <code>`engage`</code> method, hence the similar number, as
              it plays the same role (just the scope is narrower).
            </p>

            <h4>2. What is supposed to happen</h4>
            <p>
              It's the description of the expected result of the functionality you're testing. In other words, how the
              unit under the test should work, what should happen when you execute `engage` method.
            </p>
            <p className="underline">Other examples of such descriptions:</p>
            <ul>
              <li>should fetch products</li>
              <li>should log user in</li>
              <li>should build read query</li>
            </ul>
            <p>
              If you want to know more or learn how to write meaningful test descriptions, what to watch out for, etc.,
              read the [guideline &lt;-- add link]
            </p>

            <h4>3. The arrange part of the implementation</h4>
            <p>
              This is where (usually all of) the preparations are done for the implementation of the test. It can be the
              creation of an instance of the class or preparation of test doubles or whatever is necessary for the unit
              to act.
            </p>

            <h4>4. The act part of the implementation</h4>
            <p>
              This is <span className="italic">the</span> code which when executed will trigger the feature to happen
              and eventually produce the expected result(s). This part is very important as it shows everyone how to use
              your feature.
            </p>

            <h4>5. The assert part of the implementation</h4>
            <p>
              This is where you check / assert / expect that the feature, the unit under the test works as it should.
              This is where you verify that given input produces expected output or things that you expect to happen,
              happen. Usually there's one assertion, but that is not a rule.
            </p>
          </section>
        </article>
      </main>

      <footer className="container mx-auto max-w-screen-lg p-4 pt-10">
        <p>Footer content ... to be added ;)</p>
      </footer>
    </>
  );
}
