class CodeHighlighter {
    static run() {
        hljs.highlightAll();
        globalThis.window.highlightJsBadge();
    }
}

export default CodeHighlighter;
