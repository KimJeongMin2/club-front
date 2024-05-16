import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

export default function Editor({video}) {
  
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        placeholder: "내용을 입력해주세요.",
      }}
      onReady={(editor) => {
        console.log("Editor is ready to use!", editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
        //setContents(data);
      }}
      onBlur={(event, editor) => {
        console.log("Blur", editor);
      }}
      onFocus={(event, editor) => {
        console.log("Focus", editor);
      }}
    ></CKEditor>
  );
}
