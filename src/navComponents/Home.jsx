import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updatePastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes]);

  return (
    <div className="w-full h-full py-5 max-w-[1200px] mx-auto px-4">
      <div className="flex flex-col gap-y-6 items-start">

        <div className="w-full flex flex-row gap-x-3 justify-between items-center">
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${pasteId ? "w-[78%]" : "w-[85%]"
              } text-white border font-bold border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 transition"
            onClick={createPaste}
          >
            {pasteId ? "Update Paste" : "Create My Paste"}
          </button>

          {pasteId && (
            <button
              className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-lg p-2 transition focus:ring-2 focus:ring-green-300"
              onClick={resetPaste}
            >
              <PlusCircle size={20} />
            </button>
          )}
        </div>


        <div className="w-full flex flex-col items-start relative rounded-md bg-white shadow-md border border-gray-300">

          <div className="w-full rounded-t flex items-center justify-end px-4 py-2 border  border-gray-200 bg-gray-800">

            <button
              className="flex justify-center items-center text-gray-300 hover:text-green-600 transition"
              onClick={() => {
                navigator.clipboard.writeText(value);
                toast.success("Copied to Clipboard", { position: "top-right" })
              }}
            >
              <Copy size={20} />
            </button>
          </div>

          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="✍️ Write your content here..."
            className="w-full font-bold p-4 text-gray-300 bg-gray-900 focus:outline-none resize"
            style={{ caretColor: "#2563eb" }}
            rows={13}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
