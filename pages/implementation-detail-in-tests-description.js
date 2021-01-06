import Head from 'next/head';
import { Code } from '../components/Code';

export default function ImplementationDetailInTestsDescription() {
  return (
    <>
      <Head>
        <title>(Problems with) implementation detail in test's description</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto max-w-screen-lg p-4">
        <article>
          <h1 className="text-5xl leading-normal font-black max-w-screen-lg">
            (Problems with) implementation detail in test's description
          </h1>
          <p>Let's take a look at this test:</p>
          <Code>
            {`describe('omit', () => {
    it('should remove "name" property', () => {
      const data = {
        name: 'John',
        age: 42,
        email: 'john@email.com'
      };
      
      const result = omit('name', data);
      
      expect(result.name).toBeUndefined();
  });
});`}
          </Code>
          <p>The test is doing exactly what is written in the `it` clause. But can you spot what's wrong here?</p>
          <p>Let me give you a hint (by hiding the implementation):</p>
          <Code>
            {`describe('omit', () => {
  it('should remove "name" property', () => {});
});`}
          </Code>
          <p>
            When you read this description now, does it tell you what <code>`omit`</code> does? No? Then we're on the
            same page.
          </p>
          <p>Let's try fixing this test one step at a time.</p>
          <p>
            First of all <code>`name`</code> is an implementation detail and should only serve as an example in, well,
            the implementation. Code examples can change, property that will be omited can change. What does not change
            is the functionality, the unit under the test, the behaviour. Therefore what <strong>is</strong> happening,
            is that <code>`omit`</code> removes given property from passed object.
          </p>
          <p>Having established that, a better description would be:</p>
          <Code language="diff">
            {`describe('omit', () => {
-  it('should remove "name" property', () => {});
+  it('should remove given property from passed object', () => {});
});`}
          </Code>
          <p>Are we done now? I would say almost. Perhaps there's more.</p>
          <p>
            If I were to leave the description like this (still, with implementation hidden), I would not expect `omit`
            to return anything (as it does right now), but probably operate on the object itself-meaning, it would alter
            the object by referencing to it.
          </p>
          <p>Let's fix that as well:</p>
          <Code language="diff">
            {`describe('omit', () => {
-  it('should remove given property from passed object', () => {});
+  it('should return a copy of the object with given property removed', () => {});
});`}
          </Code>
          <ul>
            <li>Sounds better? I think so.</li>
            <li>Is it perfect? Probably not.</li>
            <li>Is it good enough? Yes, I'd say so.</li>
            <li>Is it better than the one at the beginning? Most certainly, yes.</li>
          </ul>
          <p>All right. Let's bring back the implementation to see how does the new description fit in:</p>
          <Code>
            {`describe('omit', () => {
  it('should return a copy of the object with given property removed', () => {
    const data = {
      name: 'John',
      age: 42,
      email: 'john@email.com'
    };
    
    const result = omit('name', data);
    
    expect(result.name).toBeUndefined();
  });
});`}
          </Code>
          <p>Hmm... something feels odd, doesn't it? Let's look at the assertion and the description:</p>
          <p>
            <code>`should return a copy of the object`</code> and <code>`expect(data.name).toBeUndefined();`</code> - is
            that (copy) checked anywhere? Nope? Let's fix it.
          </p>
          <aside>
            <p>There are two ways you can approach this:</p>
            <ol>
              <li>Add an assertion to given test.</li>
              <li>Add a new test, which checks that input object is not the same as the output object.</li>
            </ol>
            <ul>
              <li>Which one is correct?</li>
              <li>I'd say both are, but I would go with another assertion only.</li>
              <li>Why?</li>
              <li>
                Because this test is short and doesn't need to expliticlty (separate test) show that the returned object
                is a copy, simple assertion in one test will be fine. Secondly, because it relates to the data being
                returned. If, on the other hand, there were two, separate things going on as a result of some action,
                then I would say go with two separate tests.
              </li>
            </ul>
            <p>
              <strong>
                (TODO: link to an example with a button when where it is clicked spy is called and spinner is shown).
              </strong>
            </p>
          </aside>
          <p>Here's the code with additional assertion:</p>
          <Code>
            {`describe('omit', () => {
  it('should return a copy of the object with given property removed', () => {
    const data = {
      name: 'John',
      age: 42,
      email: 'john@email.com'
    };
    
    const result = omit('name', data);
    
    expect(result.name).toBeUndefined();
    expect(result).not.toEqual(data);
  });
});`}
          </Code>
          <ul>
            <li>
              I got a question: why not checking if <code>`data`</code> still has <code>`name`</code> property? Isn't
              that the same?
            </li>
            <li>No.</li>
            <li>
              But it's that simple (to write and read). I still don't see it <span className="italic">that</span>{' '}
              different.
            </li>
            <li>
              OK, let's try doing it your way.
              <Code language="diff">
                {`- expect(result).not.toEqual(data);
+ expect(data.name).toEqual('John');`}
              </Code>
            </li>
            <li>Done. What now?</li>
            <li>
              Break the test. Remove copying the object from implementation.
              <Code language="diff">
                {`- const copy = { ...object };
- delete copy[property];
- return copy;
+ delete object[property];
+ return object;`}
              </Code>
            </li>
            <li>Done.</li>
            <li>
              Run the tests and watch.
              <Code language="shell">{`Assertion error: undefined expected to be equal to John`}</Code>
            </li>
            <li>What the?</li>
            <li>
              Now use the initial assertion.
              <Code language="shell">Assertion error: expected not to be equal </Code>
              As you can see, using the object equality assertion resulted in error message that reflects the expected
              behaviour as written in test's description. And that's the difference and reason why checking properties
              would not help you eventually.
            </li>
          </ul>
          <section>
            <h3 className="text-3xl font-black leading-normal">Summarizing:</h3>
            <ol>
              <li>(-) Don't mention implementation detail in the description (test data can change).</li>
              <li>(+) Instead, write concise explanation what to expect (behaviour).</li>
              <li>(+) Let the example show how it works (implementation).</li>
              <li>
                (+) Finally, use assertions that correspond exactly (or as close as possible) to test's description, so
                when the tests will fail, messages will inform you exactly (or as close as possible) why.
              </li>
            </ol>
          </section>
        </article>
      </main>

      <footer className="container mx-auto max-w-screen-lg p-4 pt-10">
        <p>Footer content ... to be added ;)</p>
      </footer>
    </>
  );
}
