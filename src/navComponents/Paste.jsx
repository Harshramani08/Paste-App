import { Calendar, Copy, Eye, PencilLine, Share2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/FormatDate";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
  };


  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-6">

        <div className="w-full flex items-center gap-3 px-4 py-2 rounded-md border border-gray-300 shadow-sm mt-4 bg-gray-900">
          <input
            type="search"
            placeholder="🔍 Search paste here..."
            className="focus:outline-none w-full bg-transparent font-bold text-gray-300 placeholder:text-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>


        <div className="flex flex-col border border-gray-300 py-5 rounded-lg shadow-md bg-gray-800">
          <h2 className="px-4 text-2xl font-bold border-b border-gray-200 pb-3 text-gray-300">
            All Pastes
          </h2>

          <div className="w-full px-4 pt-5 flex flex-col gap-y-6">
            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <div
                  key={paste?._id}
                  className="border border-gray-200 bg-gray-900 hover:bg-gray-950 transition-all w-full gap-y-4 justify-between flex flex-col sm:flex-row p-4 rounded-lg shadow-sm"
                >

                  <div className="w-full sm:w-[55%] flex flex-col space-y-2">
                    <p className="text-xl font-semibold text-gray-300 truncate">
                      {paste?.title}
                    </p>
                    <p className="text-sm font-normal line-clamp-3 text-gray-300">
                      {paste?.content}
                    </p>
                  </div>


                  <div className="flex flex-col gap-y-3 sm:items-end">

                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">

                      <a href={`/?pasteId=${paste?._id}`}>
                        <button className="p-2 rounded-md bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50 group transition">
                          <PencilLine
                            className="text-gray-700 group-hover:text-blue-500"
                            size={20}
                          />
                        </button>
                      </a>


                      <button
                        className="p-2 rounded-md bg-white border border-gray-300 hover:border-red-500 hover:bg-red-50 group transition"
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <Trash2
                          className="text-gray-700 group-hover:text-red-500"
                          size={20}
                        />
                      </button>


                      <a href={`/pastes/${paste?._id}`} target="_blank">
                        <button className="p-2 rounded-md bg-white border border-gray-300 hover:border-orange-500 hover:bg-orange-50 group transition">
                          <Eye
                            className="text-gray-700 group-hover:text-orange-500"
                            size={20}
                          />
                        </button>
                      </a>

                      <button
                        className="p-2 rounded-md bg-white border border-gray-300 hover:border-green-500 hover:bg-green-50 group transition"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard", { position: "top-right" });
                        }}
                      >
                        <Copy
                          className="text-gray-700 group-hover:text-green-500"
                          size={20}
                        />
                      </button>

                    </div>


                    <div className="flex items-center gap-x-2 text-gray-600 text-sm">
                      <Calendar size={18} />
                      {FormatDate(paste?.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xl text-center w-full text-gray-500 font-medium py-6">
                No Data Found ❌
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;
