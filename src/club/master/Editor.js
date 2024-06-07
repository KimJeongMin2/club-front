import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useRecoilState } from "recoil";
import { contentsState, photoFileState } from "../../recoil/state/noticeState";

import axios from 'axios';
import instance from "../../api/instance";
import { useEffect } from "react";

class MyUploadAdapter {
  constructor(loader, setPhotoFile) {
    this.loader = loader;
    this.file = null;
    this.setPhotoFile = setPhotoFile;
  }

  
  upload() {
    return this.loader.file.then((file) => {
      this.file = file;
      const formData = new FormData();
      formData.append('upload', file);
      console.log("filefefe", file);

      return instance
        .post('/images/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
        console.log("response.data", response.data)
          this.setPhotoFile({
            file: this.file,
            url: response.data,
            type: file.type,
          });

          return { default: response.data, file: this.file };
        })
        .catch((error) => {
          throw error;
        });
    });
  }

  abort() {

  }
}

function MyCustomUploadAdapterPlugin(editor, setPhotoFile) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader, setPhotoFile);
  };
}

export default function Editor({ notice }) {
  const [content, setContent] = useRecoilState(contentsState);
  const [photoFile, setPhotoFile] = useRecoilState(photoFileState);

  console.log("noticenotice", notice);

  // const editorContents = notice?.noticeData? (notice?.noticeData?.content) : (notice?.recruitment?.content);


  let editorContents;

  if (notice?.noticeData || notice?.recruitment) {
    editorContents = notice?.noticeData ?
    `<img src="data:image/jpeg;base64,${notice?.noticeData?.photo}" />${notice?.noticeData?.content}` :
    `<img src="data:image/jpeg;base64,${notice?.recruitment?.photo}" />${notice?.recruitment?.content}`;
  }


  useEffect(() => {
    if(notice?.recruitment){
      console.log("여기 실행?")
      setPhotoFile(notice?.recruitment?.photo)
    }
  }, [notice?.recruitment]);

  console.log("ghkrdls", editorContents);
  const onEditorReady = (editor) => {
    console.log('Editor is ready to use!', editor);
    MyCustomUploadAdapterPlugin(editor, setPhotoFile);
    const uploadAdapter = new MyUploadAdapter(editor.plugins.get('FileRepository').createUploadAdapter, setPhotoFile);
    console.log("uploaderAdpter", uploadAdapter);
  };

  const onEditorChange = (event, editor) => {
    const data = editor.getData();
    console.log({ event, editor, data });
    setContent(data);
  };

  console.log("포토", photoFile);
  return (
    <CKEditor
      editor={ClassicEditor}
      data={editorContents}
      config={{
        placeholder: '내용을 입력해주세요.',
        extraPlugins: [MyCustomUploadAdapterPlugin],
      }}
      onReady={onEditorReady}
      onChange={onEditorChange}
      onBlur={(event, editor) => {
        console.log('Blur', editor);
      }}
      onFocus={(event, editor) => {
        console.log('Focus', editor);
      }}
    ></CKEditor>
  );
}
