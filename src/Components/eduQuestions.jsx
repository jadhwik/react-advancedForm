import newQ from "./extraQ";

const NewQuestions = ({ data, setData }) => {
  const { data: apiData, error, loading } = newQ();
  console.log(apiData);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!apiData || !apiData.education) return <div>No data available</div>;

  const handleChange = (question, value, isCheckbox, isRadio) => {
    setData((prevData) => {
      if (isCheckbox) {
        const currentCheckboxValues =
          prevData.education.additional[question] || [];
        const newCheckboxValues = currentCheckboxValues.includes(value)
          ? currentCheckboxValues.filter((v) => v !== value)
          : [...currentCheckboxValues, value];

        return {
          ...prevData,
          education: {
            ...prevData.education,
            additional: {
              ...prevData.education.additional,
              [question]: newCheckboxValues,
            },
          },
        };
      } else if (isRadio) {
        return {
          ...prevData,
          education: {
            ...prevData.education,
            additional: {
              ...prevData.education.additional,
              [question]: value,
            },
          },
        };
      } else {
        return {
          ...prevData,
          education: {
            ...prevData.education,
            additional: {
              ...prevData.education.additional,
              [question]: value,
            },
          },
        };
      }
    });
  };

  return (
    <div>
      {apiData.education.map((item) => (
        <div key={item.id}>
          {(item.type === "text" || item.type === "number") && (
            <input
              type={item.type}
              placeholder={item.question}
              className="sm:px-5 md:px-10 lg:px-16 xl:px-24 py-1 m-5
                bg-white bg-opacity-50 placeholder:text-black border-none outline-none 
                placeholder:text-opacity-50 rounded-lg focus:outline-red-400"
              value={data.education.additional[item.question] || ""}
              onChange={(e) => handleChange(item.question, e.target.value)}
            />
          )}
          {item.type === "select" && (
            <div>
              <select
                className="sm:px-1 md:px-2 lg:px-5 xl:px-18 py-1 m-5 sm:text-sm md:text-sm lg:text-md xl:text-md 2xl:text-lg
                  placeholder:text-opacity-50 rounded-lg focus:outline-red-400 bg-white bg-opacity-50"
                value={data.education.additional[item.question] || ""}
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
            <div className="ml-5">
              <p>{item.question}</p>
              {item.options.map((option, index) => (
                <label key={index} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-red-600"
                    checked={(
                      data.education.additional[item.question] || []
                    ).includes(option)}
                    onChange={(e) => handleChange(item.question, option, true)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
          {item.type === "radio" && (
            <div>
              <p className="mb-2">{item.question}</p>
              <div className="flex flex-col ml-5">
                {item.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-3 mb-2"
                  >
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-red-600"
                      checked={
                        data.education.additional[item.question] === option
                      }
                      onChange={(e) =>
                        handleChange(item.question, option, false, true)
                      }
                    />
                    <span className="text-justify">{option}</span>
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
