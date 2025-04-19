import React, {useEffect} from "react";
import { useQuill} from "react-quilljs";

export const QuillComponent = ({clipboard, setContent}) => {
    let placeholder = "Konten Artikel";
    const {quill, quillRef } = useQuill({placeholder});

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setContent(quill.root.innerHTML)
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quill]);

    useEffect(() => {
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(clipboard)
        }
    }, [quill, clipboard]);
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div ref={quillRef} />
        </div>
    );
};

export const QuillComponentMinimal = () => {
    const modules = {
        toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ align: [] }],

            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
        ],
    };

    const placeholder = "Compose an epic...";

    const formats = [
        "bold",
        "italic",
        "underline",
        "strike",
        "align",
        "list",
        "indent",
        "size",
        "header",
        "link",
        "image",
        "video",
        "color",
        "background",
    ];
    const { quillRef } = useQuill({ modules, formats, placeholder });
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div ref={quillRef} />
        </div>
    );
};
