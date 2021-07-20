import { PreviewFile, upload } from "frontend/upload";
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";

const megaByte = 1000 * 1000;

type value = string | { files: PreviewFile[]; upload: () => Promise<string[]> };

export const createValue = (image = "") => image as value;

function FileUpload(
  {
    onChange,
    value,
  }: {
    onChange: (props: { files: PreviewFile[]; upload: typeof upload }) => void;
    value?: value;
  },
  ref: ForwardedRef<any>
) {
  const [files, setFiles] = useState([] as PreviewFile[]);
  useEffect(() => {
    if (!value || typeof value !== "string") return;
    setFiles([{ preview: value, doNotUpload: true, name: "uploaded" }]);
  }, [value]);

  const onDrop = useCallback(async (validFiles: File[]) => {
    const files = validFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles(files);
    onChange({ files, upload: () => upload(files) });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ["image/*"],
    maxFiles: 1,
    multiple: false,
    maxSize: 10 * megaByte,
  });

  useImperativeHandle(ref, () => ({}));

  return (
    <div
      className="text-center border border-dashed rounded p-4 mt-4 text-gray-400"
      {...getRootProps()}
    >
      <aside>
        {files.map((file) => (
          <div key={file.name}>
            <img className="w-auto h-40 m-auto pb-4" src={file.preview} />
          </div>
        ))}
      </aside>
      <div>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop a picture here, or click to select a picture</p>
        )}
      </div>
    </div>
  );
}

export default forwardRef(FileUpload);
