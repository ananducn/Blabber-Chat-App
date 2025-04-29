import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { SendHorizonal, ImagePlus, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const { sendMessage, selectedUser } = useChatStore();
  const fileInputRef = useRef(null);
  const [sendClicked, setSendClicked] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      return toast.error("Please select an image file");
    }
    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result;
      setImage(base64Image);
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !image) return;

    try {
      setSendClicked(true);
      await sendMessage({ text: text.trim(), image: image });

      setText("");
      setImage("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.log("Failed to send message: ", error);
    }
  };

  return (
    <div className="w-full">
      {/* Image Preview */}
      {image && (
        <div className="flex items-center gap-4 p-4">
          <div className="relative w-24 h-24">
            <img
              src={image}
              alt="preview"
              className="w-full h-full object-cover rounded-xl border border-base-300"
            />
            {/* Remove button */}
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Message Input Form */}
      <form
        onSubmit={handleSendMessage}
        className="w-full px-5 sm:pb-10 sm:px-10 md:px-20 py-4 flex items-center gap-3 border-t border-base-300 bg-base-100"
      >
        {/* Upload Button */}
        <div className="relative">
          <label
            htmlFor="image-upload"
            className="btn btn-ghost btn-circle hover:bg-base-300 cursor-pointer"
          >
            <ImagePlus className="size-5" />
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            ref={fileInputRef}
          />
        </div>

        {/* Text Input */}
        <input
          type="text"
          placeholder="Type your message..."
          className="input input-md input-primary w-full rounded-full"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={sendClicked}
          className="btn btn-primary rounded-full px-4"
        >
          <SendHorizonal className="size-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
