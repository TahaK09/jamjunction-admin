import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

function Events() {
  const [prices, setPrices] = useState([{ tierName: "", amount: "" }]);

  const [formData, setFormData] = useState({
    image: "",
    prices: prices,
    title: "",
    description: "",
    date: "",
    category: "",
    startTime: "",
    endTime: "",
    location: "",
    venue: "",
    capacity: "",
    tickets_sold: 0,
    organizer: "JamJunction Team",
    isActive: true,
  });

  const [imageUploading, setImageUploading] = useState(false);
  const [imgPreview, setImgPreview] = useState("");
  const [imgUploadSuc, setImgUploadSuc] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, field, value) => {
    const updatedPrices = [...prices];
    updatedPrices[index][field] = value;
    setPrices(updatedPrices);
    setFormData((prev) => ({ ...prev, prices: updatedPrices }));
  };

  const addTier = () => {
    const updated = [...prices, { tierName: "", amount: "" }];
    setPrices(updated);
    setFormData((prev) => ({ ...prev, prices: updated }));
  };

  const removeTier = (index) => {
    const updated = prices.filter((_, i) => i !== index);
    setPrices(updated);
    setFormData((prev) => ({ ...prev, prices: updated }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please upload a proper image!");
      return;
    }

    setImageUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "thumbnail_f3n");
    data.append("cloud_name", "dwrhlxmd6");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwrhlxmd6/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const imageURL = await res.json();

      if (imageURL.url) {
        setFormData((prev) => ({
          ...prev,
          image: imageURL.url,
        }));
        setImgPreview(imageURL.url);
        setImgUploadSuc(true);
        toast.success("Image uploaded!");
      } else {
        toast.error("Image upload failed!");
      }
    } catch {
      toast.error("Failed to upload image. Please try again!");
    } finally {
      setImageUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        !formData.image ||
        !formData.title.trim() ||
        !formData.description.trim() ||
        !formData.location.trim() ||
        !formData.venue.trim()
      ) {
        toast.error("Please fill in all required fields!");
        setLoading(false);
        return;
      }

      let res;

      res = await axios.post(`http://localhost:5000/api/events/`, {
        ...formData,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Event is Live!");
        if (res.data.success) {
          setFormData({
            image: "",
            prices: prices,
            title: "",
            description: "",
            date: "",
            category: "",
            startTime: "",
            endTime: "",
            location: "",
            venue: "",
            capacity: "",
            tickets_sold: 0,
            organizer: "JamJunction Team",
            isActive: true,
          });
          setImgUploadSuc(false);
          setImgPreview("");
        }
      } else {
        toast.error("Unknown Error Occured!");
      }
    } catch (err) {
      toast.error("Error Putting Event!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="py-10 flex flex-col justify-between bg-white">
        <form
          className="md:p-10 p-4 space-y-5 max-w-lg"
          onSubmit={handleSubmit}
        >
          <div>
            <p className="text-base font-medium">Event Image</p>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <label key={"image1"} htmlFor={`image`}>
                <input
                  onChange={handleUpload}
                  accept="image/*"
                  type="file"
                  id={`image`}
                  hidden
                />
                <img
                  className="max-w-24 cursor-pointer"
                  src={
                    imgPreview ||
                    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                  }
                  alt="uploadArea"
                  width={100}
                  height={100}
                />
              </label>
            </div>
          </div>

          {/* Event Name */}
          <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="title">
              Event Name
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Type here"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>

          {/* Event Description */}
          <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="description">
              Event Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
              placeholder="Type here"
            ></textarea>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="date">
              Date
            </label>
            <input
              id="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>

          {/* Category */}
          <div className="w-full flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={handleInputChange}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            >
              <option value="">Select Category</option>
              {["Music", "Festival", "Parties", "Sports"].map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Start/End Time */}
          <div className="flex items-center gap-5 flex-wrap">
            <div className="flex-1 flex flex-col gap-1 w-32">
              <label className="text-base font-medium" htmlFor="startTime">
                Start Time
              </label>
              <input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleInputChange}
                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1 w-32">
              <label className="text-base font-medium" htmlFor="endTime">
                End Time
              </label>
              <input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleInputChange}
                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="location">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Type here"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>

          {/* Venue */}
          <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="venue">
              Venue
            </label>
            <input
              id="venue"
              type="text"
              value={formData.venue}
              onChange={handleInputChange}
              placeholder="Type here"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>

          {/* Capacity */}
          <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="capacity">
              Capacity
            </label>
            <input
              id="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleInputChange}
              placeholder="Type here"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>

          {/* Ticket Prices */}
          <p className="text-base font-medium">Ticket Prices</p>
          {prices.map((price, index) => (
            <div key={index} className="flex items-center gap-1 ">
              <input
                type="text"
                placeholder="Tier Name (e.g. Solo, Group of 4)"
                value={price.tierName}
                onChange={(e) =>
                  handleChange(index, "tierName", e.target.value)
                }
                className="w-2/3 outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              />
              <input
                type="number"
                placeholder="Amount"
                value={price.amount}
                onChange={(e) => handleChange(index, "amount", e.target.value)}
                className="w-1/3 outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              />
              {prices.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTier(index)}
                  className="cursor-pointer mx-auto"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                      stroke="#FF532E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}

          {/* Add Tier Button */}
          <button
            type="button"
            onClick={addTier}
            className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
          >
            Add Price Tier
          </button>

          {/* Submit */}
          <button
            type="submit"
            className="w-full px-8 py-2.5 bg-indigo-500 text-white font-medium rounded"
            onLoading={loading}
          >
            ADD EVENT
          </button>
        </form>
      </div>
    </>
  );
}

export default Events;
