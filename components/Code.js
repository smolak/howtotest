import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia, coy } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const Code = ({ children, inConversation = false, language = 'javascript' }) => (
  <SyntaxHighlighter language={language} style={inConversation ? coy : okaidia}>
    {children}
  </SyntaxHighlighter>
);
