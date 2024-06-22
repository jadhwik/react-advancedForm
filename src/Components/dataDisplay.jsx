import { useNavigate } from "react-router-dom";
import tick from "../assets/checked.png";
import dataForm from "./DataForm";

const dataDisplay = ({ formData }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  if (!formData) {
    return (
      <div className="flex flex-col items-center mt-10">
        <p className="text-lg">No data available</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
          onClick={handleBack}
        >
          Go Back to Form
        </button>
      </div>
    );
  }

  console.log(formData);

  return (
    <div>
      <div className="flex flex-row items-center gap-5">
        <p className="text-5xl">Survey Complete</p>
        <img src={tick} className="w-14"></img>
      </div>

      <div className="flex flex-col bg-white px-10 items-center mt-10 space-y-4 text-lg ">
        {formData && (
          <div className="flex flex-col items-start px-10 py-5 gap-5 ">
            <p className="text-center">
              <span className="font-semibold mr-2 text-red-500"> Name : </span>
              {formData.firstName}
              {formData.middleName && ` ${formData.middleName} `}
              {formData.lastName}
            </p>
            <p className="text-center">
              {" "}
              <span className="font-semibold mr-2 text-red-500">
                {" "}
                Email :{" "}
              </span>{" "}
              {formData.email}
            </p>
            <p className="text-center">
              {" "}
              <span className="font-semibold mr-2 text-red-500">
                {" "}
                Survey Topic :{" "}
              </span>
              {formData.surveyTopic}
            </p>

            {formData.surveyTopic === "Technology" && (
              <div>
                <div className="mb-2">
                  <span className="font-semibold text-red-500">
                    Favorite Language:{" "}
                  </span>
                  <span>{formData.technology.favLanguage}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-red-500">
                    Experience:{" "}
                  </span>
                  <span>{formData.technology.experience}yrs</span>
                </div>
                {Object.entries(formData.technology?.additional).map(
                  ([key, value]) => (
                    <div key={key} className="mb-2">
                      <span className="font-semibold text-red-500 mr-2">
                        {key}:
                      </span>
                      <span>{value}</span>
                    </div>
                  )
                )}
              </div>
            )}

            {formData.surveyTopic === "Health" && (
              <div>
                <div className="mb-2">
                  <span className="font-semibold text-red-500">
                    Exercise Frequency:{" "}
                  </span>
                  <span>{formData.health.exerciseFreq}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-red-500">
                    Diet Preference:{" "}
                  </span>
                  <span>{formData.health.dietPreference}</span>
                </div>
                {Object.entries(formData.health?.additional).map(
                  ([key, value]) => (
                    <div key={key} className="mb-2">
                      <span className="font-semibold text-red-500 mr-2">
                        {key}:
                      </span>
                      <span>{value}</span>
                    </div>
                  )
                )}
              </div>
            )}

            {formData.surveyTopic === "Education" && (
              <div>
                <div className="mb-2">
                  <span className="font-semibold text-red-500">
                    Highest Qualification:{" "}
                  </span>
                  <span>{formData.education.highQualification}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-red-500">
                    Field of Study:{" "}
                  </span>
                  <span>{formData.education.field}</span>
                </div>
                {Object.entries(formData.education?.additional).map(
                  ([key, value]) => (
                    <div key={key} className="mb-2">
                      <span className="font-semibold text-red-500 mr-2">
                        {key}:
                      </span>
                      <span>{value}</span>
                    </div>
                  )
                )}
              </div>
            )}
            <div className="flex flex-row items-center">
              <span className="text-red-500 font-semibold mr-2">Feedback:</span>
              <div className="max-w-[400px] break-words">
                <p className="text-balance">{formData.feedback}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
        onClick={handleBack}
      >
        Go Back to Form
      </button>
    </div>
  );
};

export default dataDisplay;
