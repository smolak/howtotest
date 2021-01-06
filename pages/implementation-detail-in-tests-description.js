import Head from 'next/head';
import { Code } from '../components/Code';
import { Pre } from '../components/Pre';

export default function ImplementationDetailInTestsDescription() {
  return (
    <>
      <Head>
        <title>(Problems with) implementation detail in test's description</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <article>
          <h1 className="text-6xl font-black leading-normal">
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
});`.trim()}
          </Code>
          <p>The test is doing exactly what is written in the `it` clause. But can you spot what's wrong here?</p>
          <p>Let me give you a hint (by hiding the implementation):</p>
          <Code>
            {`describe('omit', () => {
  it('should remove "name" property', () => {});
});`.trim()}
          </Code>
          <p>
            When you read this description now, does it tell you what <Pre>`omit`</Pre> does? No? Then we're on the same
            page.
          </p>
          <p>Let's try fixing this test one step at a time.</p>
          <p>
            First of all <Pre>`name`</Pre> is an implementation detail and should only serve as an example in, well, the
            implementation. Code examples can change, property that will be omited can change. What does not change is
            the functionality, the unit under the test, the behaviour. Therefore what <strong>is</strong> happening, is
            that <Pre>`omit`</Pre> removes given property from passed object.
          </p>
          <p>Having established that, a better description would be:</p>
        </article>
      </main>

      <footer className="container mx-auto pt-10">Footer content ... to be added ;)</footer>
    </>
  );
}
