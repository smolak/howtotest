import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const Code = ({ children, language = 'javascript' }) => (
  <SyntaxHighlighter language={language} style={a11yDark}>
    {children}
  </SyntaxHighlighter>
);
