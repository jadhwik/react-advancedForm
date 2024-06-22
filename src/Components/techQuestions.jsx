import newQ from "./extraQ";

const NewQuestions = ({ data, setData }) => {
  const { data: apiData, error, loading } = newQ();
  console.log(apiData);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!apiData || !apiData.technology) return <div>No data available</div>;

  const handleChange = (question, value) => {
    setData((prevData) => ({
      ...prevData,
      technology: {
        ...prevData.technology,
        additional: {
          ...prevData.technology.additional,
          [question]: value,
        },
      },
    }));
  };

  return (
    <div>
      {apiData.technology.map((item) => (
        <div key={item.id}>
          {item.type === "text" && (
            <input
              type="text"
              placeholder={item.question}
              className="sm:px-5 md:px-10 lg:px-5 xl:px-24 py-1 m-5
                bg-white bg-opacity-50 placeholder:text-black border-none outline-none 
                placeholder:text-opacity-50 rounded-lg focus:outline-red-400"
              value={data.technology.additional[item.question] || ""}
              onChange={(e) => handleChange(item.question, e.target.value)}
            />
          )}
          {item.type === "select" && (
            <div>
              <select
                className="sm:px-5 md:px-10 lg:px-16 xl:px-24 py-1 m-5
                  bg-white bg-opacity-50 placeholder:text-black border-none outline-none 
                  placeholder:text-opacity-50 rounded-lg focus:outline-red-400"
                value={data.technology.additional[item.question] || ""}
                onChange={(e) => handleChange(item.question, e.target.value)}
              >
                <option value="">{item.question}</option>
                {item.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NewQuestions;
