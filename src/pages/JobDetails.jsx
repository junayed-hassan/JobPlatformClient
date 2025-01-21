import axios from "axios";
import { compareAsc, format } from "date-fns";
import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const JobDetails = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { id } = useParams();
  const [job, setJobs] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios(`${import.meta.env.VITE_API_URL}/job/${id}`).then((res) => {
      setJobs(res.data);
    });
  }, [id]);

  const {
    job_title,
    min_price,
    max_price,
    buyer,
    category,
    description,
    deadLine,
    _id,
  } = job || {};

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const price = form.price.value;
    const email = form.email.value;
    const comment = form.comment.value;
    const dateLineBid = startDate;

    if (buyer?.email === user?.email) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `you can not bids here.`,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    // validation price
    if (parseFloat(max_price) < parseFloat(price)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `you ${max_price} price has cross limitation.`,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    // validation date
    const result = compareAsc(new Date(), new Date(deadLine));
    if (result === 1) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `Date expired`,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const bidData = {
      price,
      email,
      comment,
      deadLine: dateLineBid,
      jobId: _id,
      buyer: buyer?.email,
      job_title,
      category,
      status: "pending",
    };

    //  send data to data base
    try {
      navigate("/my-bids");
      axios
        .post(`${import.meta.env.VITE_API_URL}/bids`, bidData)
        .then((res) => {
          console.log(res.data);
          e.target.reset();

          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your have successfully bid.",
              showConfirmButton: false,
              timer: 1500,
            });
          }

          console.log("amiiiio");
        });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto ">
      {/* Job Details */}
      <div className="flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-800 ">
            Deadline: {deadLine && format(new Date(deadLine), "P")}
          </span>
          <span className="px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full ">
            {category}
          </span>
        </div>

        <div>
          <h1 className="mt-2 text-3xl font-semibold text-gray-800 ">
            {job_title}
          </h1>

          <p className="mt-2 text-lg text-gray-600 ">{description}</p>
          <p className="mt-6 text-sm font-bold text-gray-600 ">
            Buyer Details:
          </p>
          <div className="flex items-center gap-5">
            <div>
              <p className="mt-2 text-sm  text-gray-600 ">
                Name: {buyer?.name}
              </p>
              <p className="mt-2 text-sm  text-gray-600 ">
                Email: {buyer?.email}
              </p>
            </div>
            <div className="rounded-full object-cover overflow-hidden w-14 h-14">
              <img referrerPolicy="no-referrer" src={buyer?.image} alt="" />
            </div>
          </div>
          <p className="mt-6 text-lg font-bold text-gray-600 ">
            Range: ${min_price} - ${max_price}
          </p>
        </div>
      </div>
      {/* Place A Bid Form */}
      <section className="p-6 w-full  bg-white rounded-md shadow-md flex-1 md:min-h-[350px]">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Place A Bid
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 " htmlFor="price">
                Price
              </label>
              <input
                id="price"
                type="text"
                name="price"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                defaultValue={user?.email}
                type="email"
                name="email"
                readOnly
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="comment">
                Comment
              </label>
              <input
                id="comment"
                name="comment"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Deadline</label>

              {/* Date Picker Input Field */}
              <DatePicker
                className="border p-2 rounded-md"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Place Bid
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default JobDetails;
