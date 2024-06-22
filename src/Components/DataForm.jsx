import { useForm } from "react-hook-form";
import { useState } from "react";
import Tech from "./techQuestions";
import Health from "./healthQuestions";
import Edu from "./eduQuestions";
import { useNavigate } from "react-router-dom";

const dataForm = ({ setFormdata }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    surveyTopic: "",
    health: {
      exerciseFreq: "",
      dietPreference: "",
      additional: {},
    },
    technology: {
      favLanguage: "",
      experience: "",
      additional: {},
    },
    education: {
      highQualification: "",
      field: "",
      additional: {},
    },
    feedback: "",
  });

  const handleHealthChange = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      health: {
        ...prevData.health,
        [field]: value,
      },
    }));
  };

  const handleTechChange = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      technology: {
        ...prevData.technology,
        [field]: value,
      },
    }));
  };

  const handleEduChange = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      education: {
        ...prevData.education,
        [field]: value,
      },
    }));
  };

  const onSubmit = () => {
    console.log(data);
    setFormdata(data);
    navigate("/data-display");
  };

  return (
    <div>
      <div className="text-center">
        <p className="text-4xl m-10"> Sample Survey</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center"
        >
          <div className="grid grid-cols-3">
            <span>
              <input
                type="text"
                placeholder="first name"
                className="sm:px-5 md:px-10 lg:px-16 xl:px-24 py-1 m-5
               bg-white bg-opacity-50 placeholder:text-black border-none outline-none 
               placeholder:text-opacity-50 rounded-lg  focus:outline-red-400"
                {...register("firstName", {
                  required: "First name is required",
                  onChange: (e) =>
                    setData((prevData) => ({
                      ...prevData,
                      firstName: e.target.value,
                    })),
                })}
              ></input>
              {errors.firstName && (
                <p className="text-red-400 ml-5 ">{errors.firstName.message}</p>
              )}
            </span>
            <span>
              <input
                type="text"
                placeholder="middleName"
                className="sm:px-5 md:px-10 lg:px-16 xl:px-24 py-1 m-5
               bg-white bg-opacity-50 placeholder:text-black border-none outline-none 
               placeholder:text-opacity-50 rounded-lg focus:outline-red-400"
                {...register("middleName", {
                  onChange: (e) =>
                    setData((prevData) => ({
                      ...prevData,
                      middleName: e.target.value,
                    })),
                })}
              ></input>
            </span>
            <span>
              <input
                type="text"
                placeholder="Last Name"
                className="sm:px-5 md:px-10 lg:px-16 xl:px-24 py-1 m-5
               bg-white bg-opacity-50 placeholder:text-black border-none outline-none 
               placeholder:text-opacity-50 rounded-lg focus:outline-red-400"
                {...register("lastName", {
                  required: "Last name is required",
                  onChange: (e) =>
                    setData((prevData) => ({
                      ...prevData,
                      lastName: e.target.value,
                    })),
                })}
              ></input>
              {errors.lastName && (
                <p className="text-red-400 ml-5">{errors.lastName.message}</p>
              )}
            </span>
            <span>
              <input
                type="email"
                placeholder="email"
                className="sm:px-5 md:px-10 lg:px-16 xl:px-24 py-1 m-5
               bg-white bg-opacity-50 placeholder:text-black border-none outline-none 
               placeholder:text-opacity-50 rounded-lg focus:outline-red-400"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                  onChange: (e) =>
                    setData((prevData) => ({
                      ...prevData,
                      email: e.target.value,
                    })),
                })}
              />
              {errors.email && (
                <p className="text-red-400 ml-5">{errors.email.message}</p>
              )}
            </span>
            <div>
              <select
                className="sm:px-5 md:px-10 lg:px-16 xl:px-24 py-1 m-5
               bg-white bg-opacity-50 placeholder:text-black border-none outline-none 
               placeholder:text-opacity-50 rounded-lg focus:outline-red-400"
                {...register("surveyTopic", {
                  required: "Please select the survey topic",
                  validate: (value) =>
                    value !== "None" || "Please select a valid survey topic",
                  onChange: (e) =>
                    setData((prevData) => ({
                      ...prevData,
                      surveyTopic: e.target.value,
                    })),
                })}
              >
                <option value="None">Please select a value...</option>
                <option>Technology</option>
                <option>Health</option>
                <option>Education</option>
              </select>
              {errors.surveyTopic && (
                <p className="text-red-400 ml-5">
                  {errors.surveyTopic.message}
                </p>
              )}

              {data.surveyTopic === "Technology" && (
                <div className="bg-white bg-opacity-50 rounded-lg ">
                  <select
                    className="sm:px-5 md:px-10 lg:px-16 xl:px-24 py-1 m-5
              bg-white bg-opacity-50 placeholder:text-black border-none outline-none 
              placeholder:text-opacity-50 rounded-lg focus:outline-red-400"
                    {...register("technology.favLanguage", {
                      validate: (value) =>
                        value !== "None" || "please select a value",
                      onChange: (e) =>
                        handleTechChange("favLanguage", e.target.value),
                    })}
                  >
                    <option value="None" className="text-black text-opacity-50">
                      Favourite language....
                    </option>
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Nil">Nil</option>
                  </select>
                  {errors.technology?.favLanguage && (
                    <p className="text-red-400 ml-5">
                      {errors.technology.favLanguage.message}
                    </p>
                  )}

                  <input
                    type="number"
                    className="sm:px-5 md:px-10 lg:px-16 xl:px-24 py-1 m-5
              bg-white bg-opacity-50 placeholder:text-black border-none outline-none 
              placeholder:text-opacity-50 rounded-lg focus:outline-red-400"
                    placeholder="No. of yeas Experience"
                    {...register("technology.experience", {
                      required: "experience is required",
                      onChange: (e) =>
                        handleTechChange("experience", e.target.value),
                    })}
                  />
                  {errors.technology?.experience && (
                    <p className="text-red-400 ml-5">
                      {errors.technology.experience.message}
                    </p>
                  )}
                  <Tech setData={setData} data={data} />
                </div>
              )}
              <div className="bg-white bg-opacity-50 rounded-lg">
                {data.surveyTopic === "Health" && (
                  <div>
                    <select
                      className="sm:px-5 md:px-10 lg:px-16 xl:px-24 py-1 m-5
              bg-white bg-opacity-50 placeholder:text-black border-none outline-none 
              placeholder:text-opacity-50 rounded-lg focus:outline-red-400"
                      {...register("health.exerciseFreq", {
                        validate: (value) =>
                          value !== "None" || "please select a value",
                        onChange: (e) =>
                          handleHealthChange("exerciseFreq", e.target.value),
                      })}
                    >
                      <option
                        value="None"
                        className="text-black text-opacity-50"
                      >
                        Exercise Frequency
                      </option>
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Rarely">Rarely</option>
                    </select>
                    {errors.health?.exerciseFreq && (
                      <p className="text-red-400 ml-5">
                        {errors.health.exerciseFreq.message}
                      </p>
                    )}
                  </div>
                )}
                {data.surveyTopic === "Health" && (
                  <div>
                    <select
                      className="sm:px-5 md:px-10 lg:px-16 xl:px-24 py-1 m-5
              bg-white bg-opacity-50 placeholder:text-black border-none outline-none 
              placeholder:text-opacity-50 rounded-lg focus:outline-red-400"
                      {...register("health.dietPreference", {
                        validate: (value) =>
                          value !== "None" || "please select a value",
                        onChange: (e) =>
                          handleHealthChange("dietPreference", e.target.value),
                      })}
                    >
                      <option
                        value="None"
                        className="text-black text-opacity-50"
                      >
                        Diet Preference
                      </option>
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Non-Vegetarian">Non-Vegetarian</option>
                      <option value="Vegan">Vegan</option>
                    </select>
                    {errors.health?.dietPreference && (
                      <p className="text-red-400 ml-5">
                        {errors.health.dietPreference.message}
                      </p>
                    )}
                    <Health data={data} setData={setData} />
                  </div>
                )}
              </div>

              {data.surveyTopic === "Education" && (
                <div className="bg-white bg-opacity-50 rounded-lg w-full">
                  <select
                    className="sm:px-1 md:px-2 lg:px-5 xl:px-18 py-1 m-5
              bg-white bg-opacity-50 placeholder:text-black border-none outline-none 
              placeholder:text-opacity-50 rounded-lg focus:outline-red-400"
                    {...register("education.highQualification", {
                      validate: (value) =>
                        value !== "None" || "please select a value",
                      onChange: (e) =>
                        handleEduChange("highQualification", e.target.value),
                    })}
                  >
                    <option value="None" className="text-black text-opacity-50">
                      select Highest Qualification..
                    </option>
                    <option value="High School">High School</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="Master's">Master's</option>
                    <option value="Phd">Phd</option>
                  </select>
                  {errors.education?.highQualification && (
                    <p className="text-red-400 ml-5">
                      {errors.education.highQualification.message}
                    </p>
                  )}

                  <input
                    type="text"
                    className="sm:px-5 md:px-10 lg:px-16 xl:px-24 py-1 m-5
              bg-white bg-opacity-50 placeholder:text-black border-none outline-none 
              placeholder:text-opacity-50 rounded-lg focus:outline-red-400"
                    placeholder="Field of study"
                    {...register("education.field", {
                      required: "field is required",
                      onChange: (e) => handleEduChange("field", e.target.value),
                    })}
                  />
                  {errors.education?.field && (
                    <p className="text-red-400 ml-5">
                      {errors.education.field.message}
                    </p>
                  )}
                  <Edu data={data} setData={setData} />
                </div>
              )}
            </div>
          </div>
          <textarea
            className="sm:px-5 md:px-10 lg:px-16 xl:px-24 py-1 m-5
              bg-white bg-opacity-50 placeholder:text-black border-none outline-none 
              placeholder:text-opacity-50 rounded-lg focus:outline-red-400 resize-none"
            placeholder=" provide a feedback about the survey"
            {...register("feedback", {
              required: "Feedback is required",
              minLength: {
                value: 50,
                message: "Feedback must be at least 50 characters",
              },
              onChange: (e) =>
                setData((prevData) => ({
                  ...prevData,
                  feedback: e.target.value,
                })),
            })}
          ></textarea>
          {errors.feedback && (
            <p className="text-red-400 ml-5">{errors.feedback.message}</p>
          )}
          <button className="px-6  rounded-lg bg-opacity-50 hover:bg-opacity-100 bg-white py-2 m-5">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default dataForm;
