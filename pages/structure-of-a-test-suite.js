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
          <p>
            Every test (suite) is composed of several different parts. In this article I will show you couple of
            examples of such test suites, starting from a very simple one, followed by more complex ones with
            explanation what is what and why the structure looks like it looks.
          </p>
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
          <section>
            <h3 className="text-3xl font-black leading-normal">Conditions</h3>
            <p>
              Very often you will want to test the same functionality under given conditions. Here's an example (using
              previous code):
            </p>
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
    
    describe('when speed is not set', () => { // (6) NEW
      it('should throw an exception', () => {
        const ussEnterprise = new Starship(); // (3)
  
        expect(() => {
          ussEnterprise.engage(); // (4)
        }).toThrow('Starship can\'t move if speed is not set.'); // (5)
      });
    });
  });
});`}
            </Code>
            <p>A couple of things changed here, with one new point to explain, so let's begin:</p>
            <h4>6. The description of a specific condition for the unit under the test</h4>
            <p>
              In this new test the same <code>`engage`</code> method is being tested, but this time it's to explain what
              will happen if speed is not set.
            </p>
            <p>
              In other words, you're being given a more thorough documentation for how to use the method, what are the
              preconditions it must met in order for it to be used.
            </p>

            <h4>The assert part being executed before the arrange part</h4>
            <p>
              This is done due to how the test assertion module behaves with code that throws exceptions. Other modules
              can handle this differently, so don't mind this, it's just how it is supposed to be done.
            </p>

            <div className="flex flex-col items-center">
              <ul className="conversation starting-you">
                <li>
                  Why not using <code>`try/catch`</code> here?
                  <br />
                  That would certainly put the things in right order (act followed by assert).
                  <Code>
                    {`try {
  ussEnterprise.engage();
} catch (e) {
  expect(e.message).toEqual('Starship can\'t move if speed is not set.');
}`}
                  </Code>
                </li>
                <li>
                  There are several reasons for why it's not a correct way of doing it. You can read about it in [THIS
                  ARTICLE &lt;-- add it]
                </li>
              </ul>
            </div>
          </section>
        </article>
      </main>

      <footer className="container mx-auto max-w-screen-lg p-4 pt-10">
        <p>Footer content ... to be added ;)</p>
      </footer>
    </>
  );
}
