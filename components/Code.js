import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia, coy } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const Code = ({ children, inConversation = false, language = 'javascript' }) => {
  const wrapLinesProps = {
    lineProps: { style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } },
    wrapLines: true,
  };

  const wrapLinesConditionally = inConversation ? wrapLinesProps : {};

  return (
    <SyntaxHighlighter language={language} style={inConversation ? coy : okaidia} {...wrapLinesConditionally}>
      {children}
    </SyntaxHighlighter>
  );
};
