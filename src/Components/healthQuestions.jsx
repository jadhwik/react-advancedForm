import newQ from "./extraQ";

const NewQuestions = ({ data, setData }) => {
  const { data: apiData, error, loading } = newQ();
  console.log(apiData);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!apiData || !apiData.health) return <div>No data available</div>;

  const handleChange = (question, value, isCheckbox) => {
    setData((prevData) => {
      if (isCheckbox) {
        const currentCheckboxValues =
          prevData.health.additional[question] || [];
        const newCheckboxValues = currentCheckboxValues.includes(value)
          ? currentCheckboxValues.filter((v) => v !== value)
          : [...currentCheckboxValues, value];

        return {
          ...prevData,
          health: {
            ...prevData.health,
            additional: {
              ...prevData.health.additional,
              [question]: newCheckboxValues,
            },
          },
        };
      } else {
        return {
          ...prevData,
          health: {
            ...prevData.health,
            additional: {
              ...prevData.health.additional,
              [question]: value,
            },
          },
        };
      }
    });
  };

  return (
    <div>
      {apiData.health.map((item) => (
        <div key={item.id}>
          {(item.type === "text" || item.type === "number") && (
            <input
              type={item.type}
              placeholder={item.question}
              className="sm:px-5 md:px-10 lg:px-16 xl:px-24 py-1 m-5
                bg-white bg-opacity-50 placeholder:text-black border-none outline-none 
                placeholder:text-opacity-50 rounded-lg focus:outline-red-400"
              value={data.health.additional[item.question] || ""}
              onChange={(e) => handleChange(item.question, e.target.value)}
            />
          )}
          {item.type === "select" && (
            <div>
              <select
                className="sm:px-5 md:px-10 lg:px-16 xl:px-24 py-1 m-5
                  bg-white bg-opacity-50 placeholder:text-black border-none outline-none 
                  placeholder:text-opacity-50 rounded-lg focus:outline-red-400"
                value={data.health.additional[item.question] || ""}
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
          {item.type === "checkbox" && (
            <div>
              <p>{item.question}</p>
              <div className="ml-28">
                {item.options.map((option, index) => (
                  <label key={index} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-red-600"
                      checked={(
                        data.health.additional[item.question] || []
                      ).includes(option)}
                      onChange={(e) =>
                        handleChange(item.question, option, true)
                      }
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NewQuestions;
