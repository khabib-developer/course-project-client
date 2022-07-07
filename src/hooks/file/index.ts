import { useCallback } from "react";
import { useHttp } from "../http";
import { useActions } from "../redux/useActions";

export const useFile = () => {
  const actions = useActions();
  const http = useHttp();
  const fileUpload = useCallback(
    async (file: any): Promise<any> => {
      const formdata = new FormData();
      const size = file.size / 1024;
      if (size > 1024) {
        actions.setError("The file size should not exceed 1MB");
        return;
      }
      formdata.append("file", file);
      return await http("/file/upload/", "POST", formdata, {}, true);
    },
    [actions, http]
  );

  const deleteFile = useCallback(
    async (file: any): Promise<any> => {
      await http(`/file/delete/${file}`);
    },
    [http]
  );

  return { fileUpload, deleteFile };
};
