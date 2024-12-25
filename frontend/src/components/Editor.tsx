import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';




  
export const Editor=({ onChange,description }: { onChange: (value: string) => void, description:string }) =>{
    return <div className="mt-2">
       {/* <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border">
                <div className="my-2 bg-white rounded-b-lg w-full">
                    <label className="sr-only">Publish post</label>
                    <textarea onChange={onChange} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..." required />
                </div>
            </div>
        </div> */}
        <ReactQuill theme="snow" value={description} onChange={(value) => onChange(value)} />
    </div>

}