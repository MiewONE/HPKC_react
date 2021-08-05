import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function EditorComponent({ value, onChange }) {
    const modules = {
        toolbar: [
            //[{ 'font': [] }],
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image'],
            [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
            ['clean'],
        ],
    };

    const formats = [
        //'font',
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'align',
        'color',
        'background',
    ];
    return (
        <div style={{ height: '450px', padding: '2%' }}>
            <ReactQuill
                style={{ width: '100%', height: '450px' }}
                theme="snow"
                modules={modules}
                formats={formats}
                value={value || ''}
                onChange={(content, delta, source, editor) =>
                    onChange(editor.getHTML())
                }
            />
        </div>
    );
}

export default EditorComponent;
