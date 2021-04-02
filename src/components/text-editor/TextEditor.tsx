import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const TextEditor=(props)=>{
    const [isEditor, setEditor] = React.useState(false);
    const [state, setState] = React.useState({editorState: null})

    const onEditorStateChange: Function = (editorState) => {
        setState({
            editorState,
        });
        const convertedData = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        props.getContent(convertedData)
    };
    React.useEffect(()=>{
         if (typeof window !== "undefined" && process.browser) {
            setEditor(true)
            setState({editorState: EditorState.createEmpty()})
         }
    },[window])
    return(
        <React.Fragment>
            {isEditor &&(
                <Editor
                    initialEditorState={state}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={e => onEditorStateChange(e)}
                />
            )}
        </React.Fragment>
    )
}

export default TextEditor;