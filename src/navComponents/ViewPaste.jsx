import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);

  const paste = pastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-2xl text-gray-500">
        ❌ Paste not found
      </div>
    );
  }

  return (
    <div className="w-full h-full py-5 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">

        <input
          type="text"
          placeholder="Title"
          value={paste.title}
          disabled
          className="w-full text-gray-200 font-semibold border border-gray-300 rounded-lg p-3 bg-gray-900 cursor-not-allowed"
        />


        <div className="w-full flex flex-col items-start relative rounded-lg border border-gray-300 shadow-md bg-gray-900">

          <div className="w-full flex items-center justify-end px-4 py-2 border-b border-gray-200 bg-gray-800 rounded-t-lg">

            <button
              className="flex justify-center items-center text-gray-300 hover:text-green-600 transition"
              onClick={() => {
                navigator.clipboard.writeText(paste.content);
                toast.success("Copied to Clipboard ✅", { position: "top-right" });
              }}
            >
              <Copy size={20} />
            </button>
          </div>
          
          <textarea
            value={paste.content}
            disabled
            placeholder="Your content will appear here..."
            className="w-full p-4 text-gray-200 bg-gray-900 focus:outline-none resize-none rounded-b-lg cursor-not-allowed"
            rows={13}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
