import React, { createElement, useState } from "react"
import marksy from 'marksy'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import marked from 'marked'
import brakes from 'remark-breaks'

const markedOptions = {
    gfm: true,
    breaks: true,
}

// init marked
marked.use(markedOptions)

// init marksy
const compile = marksy({ createElement })

const initialMarkdown = `
# Markdown Previewer

FreeCodeCamp front-end project **Markdown Previewer** See more [there](https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-markdown-previewer).

## Markdown parsers

The project uses different parsers:

- [React Markdown](https://remarkjs.github.io/react-markdown/)
- [Marked](https://marked.js.org/)
- [Marksy](https://github.com/storybookjs/marksy)

You can switch between them in the menu above.

## Code highlight

Some plugins support and set up \`code\` higlighting

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

## Installation instructions

- clone repo
- cd to its folder
- run \`npm install\` (or \`pnpm install\`)

`
export default function MDPreviewerApp() {

    const [ userInput, setUserInput ] = useState(initialMarkdown)

    const onUserInput = e => setUserInput(e.currentTarget.value)

return (
<div 
    style={{ height: '100vh', overflow: "hidden" }}
    className="d-flex flex-column"
>    
    <div className="row no-gutters fflex-fill">
        <div className="col"></div>
        <div className="col">
            <h2>Hello there</h2>
        </div>
    </div>
    <div className="row no-gutters fflex-fill">
        <div className="col">
            <Editor content={ userInput } onChange={ onUserInput }/>
        </div>
        <div className="col" 
            style={{ overflowY: 'scroll', height: '100%' }}
        >
            <PreviewReactMarkdown content={ userInput }/>
        </div>
    </div>
</div>
)}

function Editor(props) {
    const { content, onChange } = props

return (
    <textarea 
        className="form-control"
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

function PreviewReactMarkdown({ content }) {

return (
    <div id="preview" className="preview">
        <ReactMarkdown plugins={ [gfm, brakes] }>{ content }</ReactMarkdown>
    </div>
)
}