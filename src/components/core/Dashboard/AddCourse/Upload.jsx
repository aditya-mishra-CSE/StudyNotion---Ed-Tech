import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import { useSelector } from "react-redux"
import ReactPlayer from 'react-player';

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )
  const inputRef = useRef(null)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  })

  const previewFile = (file) => {
    // console.log(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  useEffect(() => {
    register(name, { required: true })
    
  }, [register])

  useEffect(() => {
    setValue(name, selectedFile)
    
  }, [selectedFile, setValue])

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-[#F1F2FF]" htmlFor={name}>
        {label} {!viewData && <sup className="text-[#EF476F]">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-[#424854]" : "bg-[#2C333F]"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-[#F1F2FF]`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <ReactPlayer
                url={previewSource}
                width="100%"
                height="100%"
                aspectRatio="16:9"
                controls
                playsinline
                style={{ border: '2px solid red', borderRadius: '5px' }}
              />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="mt-3 text-[#6E727F] underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex w-full flex-col items-center p-6"
            {...getRootProps()}
            onClick={()=> {console.log('Dropzone clicked');
              inputRef.current?.click();}}
          >
            <input {...getInputProps()} ref={inputRef} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-[#171717]">
              <FiUploadCloud className="text-2xl text-[#FFD60A]" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-[#999DAA]">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-[#FFD60A]">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-[#999DAA]">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-[#EF476F]">
          {label} is required
        </span>
      )}
    </div>
  )
}
