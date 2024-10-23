import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { uploadBoard } from "../api";

const Editor = () => {
  const navigate = useNavigate();

  const titleRef = useRef();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const formData = new FormData();

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          loader.file.then((file) => {
            formData.append("pictures", file);
          });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  const handleSubmit = () => {
    if (title.length < 1) {
      titleRef.current.focus();
      return;
    }

    const data = {
      title,
      content,
    };

    formData.append("title", title);
    formData.append("content", content);
    console.log(formData);
    uploadBoard(data);
  };

  return (
    <div className="Editor">
      <section>
        <div className="title-wrapper">
          <textarea
            className="input-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            ref={titleRef}
          />
        </div>
      </section>
      <section>
        <CKEditor
          editor={ClassicEditor}
          data=""
          config={{ extraPlugins: [uploadPlugin] }}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            setContent(editor.getData());
            console.log({ event, editor, content });
          }}
          onBlur={(event, editor) => {
            //console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            //console.log("Focus.", editor);
          }}
        />
      </section>
      <section>
        <div className="control-box">
          <div className="cancel-btn-wrapper">
            <Button
              text={"취소"}
              onClick={() => navigate(-1, { replace: true })}
            />
          </div>
          <div className="submit-btn-wrapper">
            <Button text={"완료"} type="black" onClick={handleSubmit} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Editor;