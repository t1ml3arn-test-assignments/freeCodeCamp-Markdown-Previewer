import React, { createElement, useState } from "react"
import marksy from 'marksy'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import marked from 'marked'
import brakes from 'remark-breaks'
import { PrismLight as CodeLight } from 'react-syntax-highlighter'
import { materialLight as themeStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'

const markedOptions = {
    gfm: true,
    breaks: true,
}

// init marked
marked.use(markedOptions)

// init marksy
const compile = marksy({ createElement })

const initialMarkdown = `# Markdown Previewer

FreeCodeCamp front-end project **Markdown Previewer**. See more [there](https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-markdown-previewer).

## Markdown parsers

The project uses different parsers:

- [React Markdown](https://remarkjs.github.io/react-markdown/)
    - with syntax highlighting!
- [Marked](https://marked.js.org/)
- [Marksy](https://github.com/storybookjs/marksy)

You can switch between them in the menu above.

## Code highlighting

This feature enabled only for \`react markdown\`.

\`\`\`js
let React = require('react');
let Markdown = require('react-markdown');

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`

## Quote and image

I took a picture of a wall

![wall photo](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Aurelian_Wall_-_Sentry.JPG/220px-Aurelian_Wall_-_Sentry.JPG). 

The wall responded with

>That is a nice one!

but walls *don't talk*...

## GitHub flavored markdown

This type of markdown is not standard, it provides tables, tasklists and more. For the demonstration purpose it is enabled only for \`react-markdown\`.

### Table 

|  foo  |  bar  |
|-------|-------|
| bizz  | bazz  |
| hello | world |

### Tasklist

- [ ] foo
- [x] bar

## Installation instructions

- clone repo
- cd to its folder
- run \`npm install\` (or \`pnpm install\`)`

const LIBS = {
    ['React Markdown']: PreviewReactMarkdown,
    'Marksy': PreviewMarksy,
    'Marked': PreviewMarked
}
const LIBS_OPTIONS = Object.entries(LIBS).map(([key, val]) => <option key={ key } value={ key }>{ key }</option> )

export default function MDPreviewerApp() {

    const [ userInput, setUserInput ] = useState(initialMarkdown)
    const [ currentLib, setCurrentLib ] = useState('React Markdown')

    const onUserInput = e => setUserInput(e.currentTarget.value)
    const onLibChange = e => setCurrentLib(e.currentTarget.value)

    const CurrentLibClass = LIBS[currentLib]

return (
<div>    
    <div className="row no-gutters">
        <div className="col">
            <Editor content={ userInput } onChange={ onUserInput }/>
        </div>
        <div className="col">
            <SelectMDLib lib={ currentLib } onChange={ onLibChange } />
            <CurrentLibClass content={ userInput } />
            <Credits />
        </div>
    </div>
</div>
)}

function Editor(props) {
    const { content, onChange } = props

return (
    <textarea 
        className="form-control ffc-style-fix md-input"
        id="editor"
        value={ content }
        onChange={ onChange }
        // style={{ height: "100%" }}
    />
)}

function PreviewMarksy({ content }) {
    const compiled = compile(content, markedOptions)

return (
    <div id="preview" className="preview">{ compiled.tree }</div>
)}

function PreviewMarked({ content }) {

    const result = marked.parse(content)

    return <div id="preview" className="preview" dangerouslySetInnerHTML={{ __html: result }}></div>
}

const renderers = {
    table: function table({ children }) { return <table className="table table-striped">{ children }</table> },
    tableHead: function thead({ children }) { return <thead className="thead-dark">{ children }</thead> },
    code: ({ language, value }) => <CodeLight style={ themeStyle } language={ language } children={ value }/>
}
function PreviewReactMarkdown({ content }) {

return (
    <div id="preview" className="preview">
        <ReactMarkdown 
            renderers={ renderers } 
            plugins={ [gfm, brakes] }
            linkTarget="_blank"
        >{ content }</ReactMarkdown>
    </div>
)
}

function SelectMDLib({ lib, onChange }) {

    const [opacity, setOpacity] = useState(0.75)

    const onMouseOver = () => setOpacity(1)
    const onMouseLeave = () => setOpacity(.75)

return (
    <div 
        style={{ opacity }}
        className="lib-select"
        onMouseOver={ onMouseOver }
        onMouseLeave={ onMouseLeave }
    >
        <span style={{ paddingBottom: '10px' }}>Chose markdown library:</span>
        <br/>
        <select name="" id="" 
            value={ lib } 
            onChange={ onChange }
            className="custom-select"
        >{ LIBS_OPTIONS }</select>
    </div>
)
}

function Credits() {
    return (
        <div className="credits">
            made by <a href="https://github.com/T1mL3arn" target="_blank" rel="noreferrer">T1m</a>
        </div>
)}