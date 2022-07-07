import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useFile } from "../../hooks/file";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";

export const UpoadFile: React.FC<{
  handleFile: any;
  image: string | null;
  update: boolean;
}> = ({ handleFile, image, update }) => {
  const app = useTypedSelector((s) => s.app);
  const [drag, setdrag] = useState<boolean>(false);
  const [refresh, setrefresh] = useState<number>(0);
  const { fileUpload, deleteFile } = useFile();
  const dragStartHandler = (e: any) => {
    e.preventDefault();
    setdrag(true);
  };

  const dragLeaveHandler = (e: any) => {
    e.preventDefault();
    setdrag(false);
  };

  const onDropHandler = (e: any) => {
    e.preventDefault();
    handleInputChange(e.dataTransfer.files[0]);
    setdrag(false);
    setrefresh((prev) => prev + 1);
  };

  const handleInputChange = async (e: any) => {
    const file = await fileUpload(e);
    file && handleFile(file.image);
  };

  const handleDelete = async () => {
    await deleteFile(image);
    handleFile(null);
  };

  if (image && !update)
    return (
      <div className="w-100 text-center" style={{ position: "relative" }}>
        <div className="" style={{ position: "absolute" }}>
          <DeleteIcon
            onClick={handleDelete}
            style={{ cursor: "pointer" }}
            className="text-danger"
          />
        </div>
        <img
          style={{ borderRadius: "10px" }}
          width="100%"
          src={`${app.server}/static/images/${image}`}
          alt="Oops!"
        />
      </div>
    );

  if (image && update)
    return (
      <label
        data-refresh={refresh}
        onDragStart={dragStartHandler}
        onDragLeave={dragLeaveHandler}
        onDragOver={dragStartHandler}
        onDrop={onDropHandler}
        className="d-flex justify-content-center align-items-center"
        style={{
          position: "relative",
          border: `1px dashed ${drag ? "#000" : "#ccc"}`,
          borderRadius: "10px",
          cursor: "pointer",
          margin: "10px",
        }}
      >
        <img
          width="100%"
          src={`${app.server}/static/images/${image}`}
          alt="Oops!"
        />
        <AddIcon sx={{ cursor: "pointer", position: "absolute" }} />
        <input
          type="file"
          className="w-100"
          onChange={(e: any) => handleInputChange(e.target.files[0])}
          style={{ opacity: 0, position: "absolute", cursor: "pointer" }}
          id="fileinput"
        />
      </label>
    );

  return (
    <label
      data-refresh={refresh}
      onDragStart={dragStartHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragStartHandler}
      onDrop={onDropHandler}
      className="d-flex justify-content-center align-items-center"
      style={{
        position: "relative",
        border: `1px dashed ${drag ? "#000" : "#ccc"}`,
        borderRadius: "10px",
        cursor: "pointer",
        height: "200px",
        width: "200px",
      }}
    >
      <AddIcon sx={{ cursor: "pointer" }} />
      <input
        type="file"
        className="w-100"
        onChange={(e: any) => handleInputChange(e.target.files[0])}
        style={{ opacity: 0, position: "absolute", cursor: "pointer" }}
        id="fileinput"
      />
    </label>
  );
};
