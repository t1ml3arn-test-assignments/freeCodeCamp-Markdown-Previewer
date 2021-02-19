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

export default function MDPreviewerApp() {

    const [ userInput, setUserInput ] = useState("")

    const onChange = e => setUserInput(e.currentTarget.value)

return (
    <div>
        <Editor content={ userInput } onChange={ onChange }/>
        <PreviewReactMarkdown content={ userInput }/>
        <PreviewMarked content={ userInput } />
        <PreviewMarksy content={ userInput } />
    </div>
)}

function Editor(props) {
    const { content, onChange } = props

return (
    <textarea 
        id="editor" cols="30" rows="10"
        value={ content }
        onChange={ onChange }
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