import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Editor_white_theme: React.FC<{
  height: number;
  handleMarkdown: any;
  text: string;
}> = ({ height, handleMarkdown, text }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const editorRef = useRef<any>(null);
  return (
    <Editor
      onInit={(evt, editor) => (editorRef.current = editor)}
      onEditorChange={(newValue, editor) => handleMarkdown(newValue)}
      value={text}
      apiKey="tyadhszjzurqfse89iedirla6hy7v12swy0npw2vhxp0i6c8"
      init={{
        height,
        width: matches ? "auto" : "290px",
        content_css: "default",
        menubar: false,
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px, background-color:#000, color:#fff }",
      }}
    />
  );
};

export const Editor_dark_theme: React.FC<{
  height: number;
  handleMarkdown: any;
  text: string;
}> = ({ height, handleMarkdown, text }) => {
  const editorRef = useRef<any>(null);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Editor
      onInit={(evt, editor) => (editorRef.current = editor)}
      onEditorChange={(newValue, editor) => handleMarkdown(newValue)}
      value={text}
      apiKey="tyadhszjzurqfse89iedirla6hy7v12swy0npw2vhxp0i6c8"
      init={{
        width: matches ? "auto" : "290px",
        height,
        content_css: "tinymce-5-dark",
        menubar: false,
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px, background-color:#000, color:#fff }",
      }}
    />
  );
};
