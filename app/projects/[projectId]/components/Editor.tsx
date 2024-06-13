"use client"

// import '@/styles.scss'

import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import { BubbleMenu } from '@tiptap/react'
import BulletList from '@tiptap/extension-bullet-list'
import CharacterCount from '@tiptap/extension-character-count'
import Code from '@tiptap/extension-code'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'
import HardBreak from '@tiptap/extension-hard-break'
import Heading from '@tiptap/extension-heading'
import History from '@tiptap/extension-history'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Image from '@tiptap/extension-image'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Strike from '@tiptap/extension-strike'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import Typography from '@tiptap/extension-typography'
import Underline from '@tiptap/extension-underline'

import { Mathematics } from '@tiptap-pro/extension-mathematics'
// import 'katex/dist/katex.min.css'

import { EditorContent, useEditor } from '@tiptap/react'
import React,{useEffect, useState, useCallback} from 'react'
// import  FirebaseImageUpload  from "./Firebase_Proj_Creation";

const limit = 900
export default function Editor() {
  const [isEditable, setIsEditable] = useState(false)
  const editor:any = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Gapcursor,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Blockquote,
      Bold,
      Code,
      CharacterCount.configure({ limit }),
      BulletList,
      ListItem,
      Heading.configure({levels:[1,2,3]}),
      History,
      Image,
      Italic,
      HardBreak,
      Dropcursor,
      HorizontalRule,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      OrderedList,
      Placeholder.configure({
        // Use a placeholder:
        placeholder: 'Write something …',
        // Use different placeholders depending on the node type:
        // placeholder: ({ node }) => {
        //   if (node.type.name === 'heading') {
        //     return 'What’s the title?'
        //   }

        //   return 'Can you add some further context?'
        //},
      }),
      Strike,
      Subscript,
      Superscript,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Typography,
      Underline,
      Mathematics,
    ],
    content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>singer</td>
              <td>songwriter</td>
              <td>actress</td>
            </tr>
          </tbody>
        </table>





        <blockquote>
        Nothing is impossible, the word itself says “I’m possible!”
      </blockquote>
      <p>Audrey Hepburn</p>



      <h1>
      This editor now supports $\\LaTeX$ math expressions.
    </h1>
    <p>
      Did you know that $3 * 3 = 9$? Isn't that crazy? Also Pythagoras' theorem is $a^2 + b^2 = c^2$.<br />
      Also the square root of 2 is $\\sqrt{2}$. If you want to know more about $\\LaTeX$ visit <a href="https://katex.org/docs/supported.html" target="_blank">katex.org</a>.
    </p>
    <code>
      <pre>$\\LaTeX$</pre>
    </code>
    <p>
      Do you want go deeper? Here is a list of all supported functions:
    </p>
    <ul>
      <li>$\\sin(x)$</li>
      <li>$\\cos(x)$</li>
      <li>$\\tan(x)$</li>
      <li>$\\log(x)$</li>
      <li>$\\ln(x)$</li>
      <li>$\\sqrt{x}$</li>
      <li>$\\sum_{i=0}^n x_i$</li>
      <li>$\\int_a^b x^2 dx$</li>
      <li>$\\frac{1}{x}$</li>
      <li>$\\binom{n}{k}$</li>
      <li>$\\sqrt[n]{x}$</li>
      <li>$\\left(\\frac{1}{x}\\right)$</li>
      <li>$\\left\\{\\begin{matrix}x&\\text{if }x>0\\\\0&\\text{otherwise}\\end{matrix}\\right.$</li>
    </ul>

        <>
      `,
    onUpdate({ editor }){
      const html = editor.getHTML();
      console.log(html);
      }
  })
  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable)
    }
  }, [isEditable, editor])




  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])


  const addImage = useCallback((url:any) => {
    if (url) { 
      console.log(
        "Image uploaded successfully!", url
      );
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const toggleEditing = useCallback(e => {
    if (!editor) {
      return
    }

    const { checked } = e.target

    editor.setEditable(!checked, true)
    editor.view.dispatch(editor.view.state.tr.scrollIntoView())
  }, [editor])



  if (!editor) {
    return null
  }

  return (
    <div className='bg-red-300 w-full overflow-x-hidden flex flex-wrap'>
    

      <div>
        <input type="checkbox" checked={isEditable} onChange={() => setIsEditable(!isEditable)} />Editable
      </div>
      <label>
          <input type="checkbox" checked={!editor.isEditable} onChange={toggleEditing} />
          Readonly
        </label>

      {/* {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <buttdon onClick={() => editor.chain().focus().toggleBold().run()}className={editor.isActive('bold') ? 'is-active' : ''}>bold</buttdon>
        <buttdon onClick={() => editor.chain().focus().toggleItalic().run()}className={editor.isActive('italic') ? 'is-active' : ''}>italic</buttdon>
        <buttdon
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          strike
        </buttdon>
      </BubbleMenu>} */}

            <div className='bg-orange-300 w-screen flex flex-wrap flex-row gap-3 '>
                
{/* // Blockquote buttons */}
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()}className={editor.isActive('blockquote') ? 'is-active' : ''}>toggleBlockquote</button>
      {/* <button onClick={() => editor.chain().focus().setBlockquote().run()}disabled={!editor.can().setBlockquote()}>setBlockquote</button>
      <button onClick={() => editor.chain().focus().unsetBlockquote().run()}disabled={!editor.can().unsetBlockquote()}>unsetBlockquote</button> */}
   
{/* // Bold buttons   npm install @tiptap/extension-horizontal-rule */}
      <button onClick={() => editor.chain().focus().toggleBold().run()}className={editor.isActive('bold') ? 'is-active' : ''}>toggleBold</button>
      {/* <button onClick={() => editor.chain().focus().setBold().run()}disabled={editor.isActive('bold')}>setBold</button>
      <button onClick={() => editor.chain().focus().unsetBold().run()}disabled={!editor.isActive('bold')}>unsetBold</button> */}
 
{/* // BulletList buttons */}
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}className={editor.isActive('bulletList') ? 'is-active' : ''}>toggleBulletList</button>
      <button onClick={() => editor.chain().focus().splitListItem('listItem').run()}disabled={!editor.can().splitListItem('listItem')}>splitListItem</button>
      <button onClick={() => editor.chain().focus().sinkListItem('listItem').run()}disabled={!editor.can().sinkListItem('listItem')}>sinkListItem</button>
      <button onClick={() => editor.chain().focus().liftListItem('listItem').run()}disabled={!editor.can().liftListItem('listItem')}>liftListItem</button>

{/* // Code buttons */}
      <button onClick={() => editor.chain().focus().toggleCode().run()}className={editor.isActive('code') ? 'is-active' : ''}>toggleCode</button>
      {/* <button onClick={() => editor.chain().focus().setCode().run()}disabled={editor.isActive('code')}>setCode</button>
      <button onClick={() => editor.chain().focus().unsetCode().run()}disabled={!editor.isActive('code')}>unsetCode</button> */}

{/* // Heading buttons */}
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>H1</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>H2</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>H3</button>

{/* // History buttons */}
      <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>undo</button>
      <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>redo</button>

{/* // HorizontalRule button */}
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>setHorizontalRule</button>

{/* // Italic buttons */}
      <button onClick={() => editor.chain().focus().toggleItalic().run()}className={editor.isActive('italic') ? 'is-active' : ''}>toggleItalic</button>
      {/* <button onClick={() => editor.chain().focus().setItalic().run()}disabled={editor.isActive('italic')}>setItalic</button>
      <button onClick={() => editor.chain().focus().unsetItalic().run()}disabled={!editor.isActive('italic')}>unsetItalic</button> */}

{/* // Image button */}
{/* <FirebaseImageUpload addImage={addImage}/> */}

{/* // LineBreak button */}
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>setHardBreak</button>

{/* // Link buttons */}
      <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>setLink</button>
      <button onClick={() => editor.chain().focus().unsetLink().run()}disabled={!editor.isActive('link')}>unsetLink</button>

{/* //OrderedList buttons */}
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}className={editor.isActive('bulletList') ? 'is-active' : ''}>toggleBulletList</button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}className={editor.isActive('orderedList') ? 'is-active' : ''}>toggleOrderedList</button>
      <button onClick={() => editor.chain().focus().splitListItem('listItem').run()}disabled={!editor.can().splitListItem('listItem')}>splitListItem</button>
      <button onClick={() => editor.chain().focus().sinkListItem('listItem').run()}disabled={!editor.can().sinkListItem('listItem')}>sinkListItem</button>
      <button onClick={() => editor.chain().focus().liftListItem('listItem').run()}disabled={!editor.can().liftListItem('listItem')}>liftListItem</button>

{/* // Strike buttons */}
      <button onClick={() => editor.chain().focus().toggleStrike().run()}className={editor.isActive('strike') ? 'is-active' : ''}>toggleStrike</button>
      {/* <button onClick={() => editor.chain().focus().setStrike().run()}disabled={editor.isActive('strike')}>setStrike</button>
      <button onClick={() => editor.chain().focus().unsetStrike().run()}disabled={!editor.isActive('strike')}>unsetStrike</button> */}

{/* // Subscript buttons */}
      <button onClick={() => editor.chain().focus().toggleSubscript().run()}className={editor.isActive('subscript') ? 'is-active' : ''}>toggleSubscript</button>
      {/* <button onClick={() => editor.chain().focus().setSubscript().run()}disabled={editor.isActive('subscript')}>setSubscript</button>
      <button onClick={() => editor.chain().focus().unsetSubscript().run()}disabled={!editor.isActive('subscript')}>unsetSubscript</button> */}

{/* // Superscript buttons */}
      <button onClick={() => editor.chain().focus().toggleSuperscript().run()}className={editor.isActive('superscript') ? 'is-active' : ''}>toggleSuperscript</button>
      {/* <button onClick={() => editor.chain().focus().setSuperscript().run()}disabled={editor.isActive('superscript')}>setSuperscript</button>
      <button onClick={() => editor.chain().focus().unsetSuperscript().run()}disabled={!editor.isActive('superscript')}>unsetSuperscript</button> */}

{/* // Table buttons */}
      <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>insertTable</button>
      <button onClick={() => editor.chain().focus().addColumnBefore().run()}>addColumnBefore</button>
      <button onClick={() => editor.chain().focus().addColumnAfter().run()}>addColumnAfter</button>
      <button onClick={() => editor.chain().focus().deleteColumn().run()}>deleteColumn</button>
      <button onClick={() => editor.chain().focus().addRowBefore().run()}>addRowBefore</button>
      <button onClick={() => editor.chain().focus().addRowAfter().run()}>addRowAfter</button>
      <button onClick={() => editor.chain().focus().deleteRow().run()}>deleteRow</button>
      <button onClick={() => editor.chain().focus().deleteTable().run()}>deleteTable</button>
      <button onClick={() => editor.chain().focus().mergeCells().run()}>mergeCells</button>
      <button onClick={() => editor.chain().focus().splitCell().run()}>splitCell</button>
      <button onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>toggleHeaderColumn</button>
      <button onClick={() => editor.chain().focus().toggleHeaderRow().run()}>toggleHeaderRow</button>
      <button onClick={() => editor.chain().focus().toggleHeaderCell().run()}>toggleHeaderCell</button>
      <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>mergeOrSplit</button>
      <button onClick={() => editor.chain().focus().setCellAttribute('colspan', 2).run()}>setCellAttribute</button>
      <button onClick={() => editor.chain().focus().fixTables().run()}>fixTables</button>
      <button onClick={() => editor.chain().focus().goToNextCell().run()}>goToNextCell</button>
      <button onClick={() => editor.chain().focus().goToPreviousCell().run()}>goToPreviousCell</button>

{/* //TextAlign buttons */}
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()}className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>left</button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()}className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>center</button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()}className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>right</button>
      <button onClick={() => editor.chain().focus().setTextAlign('justify').run()}className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>justify</button>

{/* //Underline buttons */}
      <button onClick={() => editor.chain().focus().toggleUnderline().run()}className={editor.isActive('underline') ? 'is-active' : ''}>toggleUnderline</button>
      {/* <button onClick={() => editor.chain().focus().setUnderline().run()}disabled={editor.isActive('underline')}>setUnderline</button>
      <button onClick={() => editor.chain().focus().unsetUnderline().run()}disabled={!editor.isActive('underline')}>unsetUnderline</button> */}
      
</div>

      <EditorContent editor={editor} />
      <div className="character-count">
        {editor.storage.characterCount.characters()}/{limit} characters
        <br />
        {editor.storage.characterCount.words()} words
      </div>
    
    </div>
  )
}