import { Button } from "@chakra-ui/react";
import { setDefaultResultOrder } from "dns";
import React, { FormEvent } from "react";
import AppShell from "@/components/layouts/AppShell";
import JsonDisplay from "@/components/extras/jsonDisplay";

type Props = {};

const CreateEvent = (props: Props) => {
  const [prevImage, setPrevImage] = React.useState<any>("");
  const [data, setData] = React.useState<any>("");
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log("hello");
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const reader = new FileReader();
    if (data.avatar) {
      reader.readAsDataURL(data.avatar as Blob);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setPrevImage(readerEvent.target.result as string);
      }
    };
    setData(data);
    console.log(data);
  };

  return (
    <AppShell>
      <div className="bg-gray-50 p-4 rounded-lg">
        <form
          onReset={(e) => e.currentTarget.reset()}
          className="max-w-lg mx-auto relative"
          action=""
          onSubmit={handleFormSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              id="password"
              name="password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="age">
              Age:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              id="age"
              name="age"
              min="18"
              max="120"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="gender"
            >
              Gender:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="gender"
              name="gender"
              required
            >
              <option value="">--Select--</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="newsletter"
            >
              Subscribe to newsletter:
            </label>
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="newsletter"
              name="newsletter"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="birthdate"
            >
              Date of Birth:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              id="birthdate"
              name="birthdata"
            />
          </div>

          <div className="mb-4 ">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="avatar"
            >
              Avatar:
            </label>

            <label
              className="cursor-pointer bg-gray-200 mb-4 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
              htmlFor="avatar"
            >
              Select Image
            </label>
            <input
              className="hidden"
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
            />
            <img
              className="mt-4   rounded"
              id="preview-image"
              src={prevImage}
              alt=""
            />
          </div>

          <div className=" m-auto justify-between fixed max-w-full bottom-0  bg-slate-500 py-4 bg-opacity-60">
            <Button
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </Button>
            <Button
              type="reset"
              className="bg-gray-500 text-white rounded-lg px-4 py-2"
            >
              Reset
            </Button>
          </div>
        </form>
        <div className="data">
          <JsonDisplay data={data} />
        </div>
      </div>
    </AppShell>
  );
};

export default CreateEvent;
