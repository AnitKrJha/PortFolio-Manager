import React from "react";

function JsonDisplay({ data }: any) {
  const entries = Object.entries(data);

  return (
    <React.Fragment>
      <h1 className="formData text-center font-bold text-4xl border-t-orange-600  mt-4  border-t-2">
        Form Data
      </h1>
      <div className="bg-gray-100 py-4 px-6 rounded-lg grid grid-cols-2 gap-4">
        {entries.map(([key, value]) => (
          <React.Fragment key={key}>
            <div className="font-medium bg-gray-300 text-gray-700">{key}:</div>
            <div className="text-gray-600 bg-gray-200">
              {JSON.stringify(value)}
            </div>
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
}

export default JsonDisplay;
