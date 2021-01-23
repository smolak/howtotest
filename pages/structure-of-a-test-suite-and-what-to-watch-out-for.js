import Head from 'next/head';
import { Code } from '../components/Code';

export default function ImplementationDetailInTestsDescription() {
  return (
    <>
      <Head>
        <title>Structure of a test suite and what to watch out for</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto max-w-screen-lg p-4">
        <article>
          <h1 className="text-5xl leading-normal font-black max-w-screen-lg mb-10">
            Structure of a test suite and what to watch out for
          </h1>
          <p>
            Every test (suite) is composed of several different parts. In this article I will show you an example of a
            test suite, that starts from a very simple implementation, growing to be more complex. I will explain that
            structure, what problems you might run into and ways to fix / avoid them.
          </p>
          <section>
            <aside>
              <ul>
                <li>
                  I am using{' '}
                  <a href="https://mochajs.org/" target="_blank">
                    Mocha
                  </a>{' '}
                  here, but every test runner should have similar capabilities.
                </li>
                <li>
                  You will not learn here everything that is to writing good unit tests, but I have written more about
                  that. [ADD LINKS]
                </li>
                <li>
                  Also, I don't know anything about how starships are built or how do they operate, so this is all made
                  up.
                </li>
              </ul>
            </aside>
            <h3 className="text-3xl font-black leading-normal">Simple example</h3>
            <Code>
              {`describe('Starship class', () => { // (1)
  describe('engage method', () => { // (1a)
    it('should accelerate the ship to set speed', () => { // (2)
      const ussEnterprise = new Starship();     // (3)
      ussEnterprise.setCourse(new StarBase1()); //
      ussEnterprise.setWarpSpeed(1);            //

      ussEnterprise.engage(); // (4)
      
      expect(ussEnterprise.speed).toEqual('Warp 1'); // (5)
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
      const ussEnterprise = new Starship();     // (3)
      ussEnterprise.setCourse(new StarBase1()); //
      ussEnterprise.setWarpSpeed(1);            //

      ussEnterprise.engage(); // (4)
      
      expect(ussEnterprise.speed).toEqual('Warp 1'); // (5)
    });
    
    describe('when speed is not set', () => { // (6) NEW
      it('should throw an exception', () => {
        const ussEnterprise = new Starship(); // (3)
  
        expect(() => {
          ussEnterprise.engage(); // (4)
        }).toThrow("Starship can't move if speed is not set."); // (5)
      });
    });
  });
});`}
            </Code>
            <p>A couple of things changed here, with one new point to explain:</p>
            <h4>6. The description of a specific condition for the unit under the test</h4>
            <p>
              In this new test the same <code>`engage`</code> method is being tested, but this time it's to explain what
              will happen if speed is not set.
            </p>
            <p>
              In other words, you're being given a more thorough documentation for how to use the method, what are the
              preconditions it must meet in order for it to be used and what will happen if you don't.
            </p>

            <h4>The assert part being executed before the arrange part</h4>
            <p>
              This is done due to how the test assertion library behaves with code that throws exceptions. Other
              assertion libraries can handle this differently, so don't mind this, it's just how it is supposed to be
              done.
            </p>
            <p>
              Usually you're not supposed to use a <code>`try/catch`</code>, or at least I haven't seen, in the
              libraries I was using, this approach to asserting exceptions.
            </p>

            <div className="flex flex-col items-center">
              <ul className="conversation starting-you">
                <li>
                  Why not?
                  <br />
                  That would certainly put the things in right order (act part followed by assert part), like this:
                  <Code>
                    {`try {
  ussEnterprise.engage();
} catch (e) {
  expect(e.message).toEqual("Starship can't move if speed is not set.");
}`}
                  </Code>
                </li>
                <li>
                  There are several reasons for why it's not the way of doing it. You can read about it in [THIS ARTICLE
                  &lt;-- add it]
                </li>
              </ul>
            </div>
          </section>
          <section>
            <h3 className="text-3xl font-black leading-normal">Before/after, setup/teardown and alike</h3>
            <p>
              They are called hooks are they're used to avoid repetitive preparations for each test in given scope.
              Let's take a look at a whole test suite example:
            </p>
            <ul className="conversation starting-you">
              <li>Hold on. What do you mean by whole suite / scope?</li>
              <li>
                Every <code>`describe`</code> creates a scope. If it's a top level <code>`describe`</code>, it means
                whatever is going to be done there (before[Each] etc.), it will affect whole test suite, meaning - every
                test.
                <br />
                <br />
                If you were to have a nested <code>`describe`</code>, then it would also create a scope (narrower), and
                having before(Each) etc. there would affect that scope in addition to the top level one.
              </li>
            </ul>
            <p>Getting back to the example:</p>
            <Code>
              {`describe('Starship class', () => { // (1)
  let ussEnterprise; // (7) NEW
              
  beforeEach(() => { // (8) NEW
    ussEnterprise = new Starship();
    ussEnterprise.setCourse(new StarBase1());
  });
              
  describe('engage method', () => { // (1a)
    it('should accelerate the ship to set speed', () => { // (2)
      // const ussEnterprise = new Starship();     // (3) <-- we don't need those lines now...
      // ussEnterprise.setCourse(new StarBase1()); //
      
      ussEnterprise.setWarpSpeed(1);

      ussEnterprise.engage(); // (4)
      
      expect(ussEnterprise.speed).toEqual('Warp 1'); // (5)
    });
    
    describe('when speed is not set', () => { // (6)
      it('should throw an exception', () => {
        // const ussEnterprise = new Starship(); // (3) <-- nor this
  
        expect(() => {
          ussEnterprise.engage(); // (4)
        }).toThrow("Starship can't move if speed is not set."); // (5)
      });
    });
  });
});`}
            </Code>
            <h4>
              7. <code>`let ussEnterprise`</code>
            </h4>
            <p>
              Such a variable is probably not the worst thing that can happen. But if you were to assign a value to it
              and forget to clean it up between the tests and the fact that this variable has a value and some test
              relies on it not having one... you're in big trouble.
            </p>
            <p>
              You need to be aware that{' '}
              <strong>
                every single test should be able to be run independent from other tests, as well as in any order
              </strong>
              .
            </p>
            <p>
              Therefore use local variables / state very wisely and with caution. Avoid it if possible. I will show you
              how in just a moment.
            </p>
            <h4>
              8. <code>`beforeEach`</code>
            </h4>
            <p>
              In this example the need of creating the instance of the starship was extracted (kind of) to{' '}
              <code>`beforeEach`</code>, which means, for every test (in every scope) the{' '}
              <code>`let ussEnterprise`</code> will hold a fresh instance of the Starship class.
            </p>
            <p>Usually test runners have:</p>
            <ul>
              <li>
                <strong>
                  <code>`beforeEach`</code>
                </strong>{' '}
                - used for doing something before every test (every <code>`it`</code>). Useful for:
                <ul>
                  <li>creating more complex instances of classes</li>
                  <li>opening connections / files</li>
                  <li>resetting spies / stubs</li>
                </ul>
              </li>
              <li>
                <strong>
                  <code>`afterEach`</code>
                </strong>{' '}
                - used for doing something after every test (every <code>`it`</code>). Useful for:
                <ul>
                  <li>cleaning things after very test</li>
                  <li>closing connections / files</li>
                  <li>resetting spies / stubs (although it feels and reads better if done in beforeEach)</li>
                </ul>
              </li>
              <li>
                <strong>
                  <code>`before` and `after`</code>
                </strong>{' '}
                - similar to hooks described above, but run once before (or after) all of the tests. Used for
                preparations (or cleaning up) after the whole suite / scope <strong>once</strong>.
              </li>
            </ul>
          </section>
          <section>
            <h3 className="text-3xl font-black leading-normal">Things to watch out for</h3>
            <p>Let's have a look at the test suite again, this time without the comments:</p>
            <Code>
              {`describe('Starship class', () => {
  let ussEnterprise;
              
  beforeEach(() => {
    ussEnterprise = new Starship();
    ussEnterprise.setCourse(new StarBase1());
  });
              
  describe('engage method', () => {
    it('should accelerate the ship to set speed', () => {
      ussEnterprise.setWarpSpeed(1);

      ussEnterprise.engage();
      
      expect(ussEnterprise.speed).toEqual('Warp 1');
    });
    
    describe('when speed is not set', () => {
      it('should throw an exception', () => {
        expect(() => {
          ussEnterprise.engage();
        }).toThrow("Starship can't move if speed is not set.");
      });
    });
  });
});`}
            </Code>
            <p>
              In the first test, the <code>`should accelerate the ship to set speed`</code>, you might ask yourself:
              <ul>
                <li>
                  Where does that <code>`ussEnterprise`</code> come from?
                </li>
                <li>How was it created? Where is the arrange part?</li>
                <li>I found it, but there's also course set, is it important?</li>
              </ul>
            </p>
            <p>
              You might ask yourself those and plenty other questions. Especially when you look at the other test, where
              there's just the assertion.
            </p>
            <p>
              The reason for those question is that <strong>the abstraction was (most likely) not needed</strong>.
            </p>
            <p>
              In other words: <strong>some duplication is fine as long as the individual tests remain readable</strong>.
            </p>
            <ul className="conversation starting-you">
              <li>
                But what if I wanted to abstract some parts and still have enough information?
                <br />
                Can I do it?
              </li>
            </ul>
            <p>
              Yes, you can, and looking at the local variable <code>`let ussEnterprise`</code>, you even should.
            </p>
          </section>
          <section>
            <h3 className="text-3xl font-black leading-normal">Helper methods</h3>
            <p>I will begin from showing the code first:</p>
            <Code>
              {`function createAndPrepareStarship() {
  const ussEnterprise = new Starship();
  ussEnterprise.setCourse(new StarBase1());
  
  return ussEnterprise;              
}

describe('Starship class', () => {            
  describe('engage method', () => {
    it('should accelerate the ship to set speed', () => {
      const ussEnterprise = createAndPrepareStarship();
      ussEnterprise.setWarpSpeed(1);

      ussEnterprise.engage();
      
      expect(ussEnterprise.speed).toEqual('Warp 1');
    });
    
    describe('when speed is not set', () => {
      it('should throw an exception', () => {
        const ussEnterprise = createAndPrepareStarship();
      
        expect(() => {
          ussEnterprise.engage();
        }).toThrow("Starship can't move if speed is not set.");
      });
    });
  });
});`}
            </Code>
            <p>
              Thanks to the <code>`createAndPrepareStarship`</code> function:
              <ul>
                <li>
                  we got rid of the local state (which we would have to reset using <code>`beforeEach`</code>)
                </li>
                <li>
                  that resulted in us not having to track what that actually was. Previously you had to jum to
                  <code>`beforeEach`</code> to have a look - now it is inlined AND abstracted.
                  <aside>
                    <p>
                      Imagine what would happen if you had more states, more variables, more jumping back and forth,
                      keeping track what is what, where it's reset / initiated...
                    </p>
                  </aside>
                </li>
                <li>you know what is done (a starship is created and prepared)</li>
                <li>and if you need to know how exactly, you can easily jump to the implementation</li>
                <li>but as that is abstracted, it is probably irrelevant to the unit under the test right now</li>
              </ul>
            </p>
            <p>
              Let's imagine now that creating a starship is a more complex task (like it wouldn't be 😉 ) and you'd need
              to do more preparations. Then those helper functions come in handy even more:
            </p>
            <Code>
              {`function createStarship() {
  return new Starship({
    engine: new WarpEngine(),
    fuelTank: new AntimatterContainer(),
    // and more ... like I said, I know little about this  
  });              
}

function prepareStarship(starship) {
  starship.takeOff().goToOrbit().setCourse(new StarBase1());
  
  return starship;
}

function createAndPrepareStarship() {
  return prepareStarship(createStarship());
}
`}
            </Code>
            <p>
              As you can see, all of the engine, the fuel tank and any other preparations are not important for the
              tests against <code>`engage`</code> method, but they need to be done before a starship is operational. And
              such helper methods assist you with that.
            </p>
            <ul className="conversation starting-you">
              <li>So, there's no point in using hooks?</li>
              <li>
                There is, as sometimes you don't only assign values to local variables. You can also:
                <ul>
                  <li>start a server</li>
                  <li>open / close a file for reading</li>
                  <li>
                    spy on e.g. <code>`console.error`</code> to check what it was called with or if at all
                  </li>
                  <li>and so on</li>
                </ul>
              </li>
              <li>Got it.</li>
            </ul>
          </section>
          <section>
            <h3 className="text-3xl font-black leading-normal">Summarizing:</h3>
            <ul className="dos-and-donts">
              <li className="do">Try keeping the arrange / act / assert in every test.</li>
              <li className="dont">Don't abstract at all or too early.</li>
              <li className="dont">Don't create local state / variables unless you know what you're doing.</li>
              <li className="do">Write well described helper methods and use them instead.</li>
              <li className="do">Avoid hooks if you can.</li>
              <li></li>
            </ul>
          </section>
        </article>
      </main>

      <footer className="container mx-auto max-w-screen-lg p-4 pt-10">
        <p>Footer content ... to be added ;)</p>
      </footer>
    </>
  );
}
