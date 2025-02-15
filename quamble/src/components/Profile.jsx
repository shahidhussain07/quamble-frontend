import React, { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { FaTrophy, FaStar, FaClock } from "react-icons/fa"; // Example icons

export default function ProfilePage() {
  // --------------------------------------------------------------------------
  // 1. Profile Data & Edit Logic (Your Existing Code)
  // --------------------------------------------------------------------------
  const [profileData, setProfileData] = useState({
    firstName: "Raj",
    lastName: "Shakya",
    userName: "rajshakya0101",
    gender: "Male",
    currentRole: "Student",
    currentOrganisation:
      "Cluster Innovation Centre (DUCIC), University of Delhi (DU), Delhi",
    currentIndustry: "Science and Technology",
    bio: `I'm a passionate student at Cluster Innovation Centre (DUCIC), University of Delhi, eager to learn and grow as a Headline Web Developer. While I haven't had formal work experience yet, I'm actively involved in projects and learning new technologies to hone my skills. I'm excited to connect with others and share my knowledge while gaining valuable insights from experienced mentors.`,
    profilePic: "/assets/TeamDP/Raj.jpg", // Default profile picture
  });

  // Control whether the "Edit Profile" side panel is open
  const [isEditOpen, setIsEditOpen] = useState(false);

  const toggleEdit = () => {
    setIsEditOpen(!isEditOpen);
  };

  // Handle form submission for saving edits
  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = {
      ...profileData,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      gender: formData.get("gender"),
      currentRole: formData.get("currentRole"),
      currentOrganisation: formData.get("currentOrganisation"),
      currentIndustry: formData.get("currentIndustry"),
      bio: formData.get("bio"),
    };
    setProfileData(updatedData);
    toggleEdit();
  };

  // Handle profile picture change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileData((prevData) => ({
          ...prevData,
          profilePic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --------------------------------------------------------------------------
  // 2. Achievements Data (Dynamic)
  // --------------------------------------------------------------------------
  const [achievements] = useState([
    {
      icon: <FaTrophy className="text-2xl text-blue-600 mx-auto" />,
      title: "Quiz Master",
      description: "Complete 20 quizzes",
    },
    {
      icon: <FaStar className="text-2xl text-blue-600 mx-auto" />,
      title: "Perfect Score",
      description: "Get 100% in a quiz",
    },
    {
      icon: <FaClock className="text-2xl text-blue-600 mx-auto" />,
      title: "Speed Demon",
      description: "Complete a quiz in under 2 minutes",
    },
  ]);

  // --------------------------------------------------------------------------
  // 3. Recent Quizzes Data (Dynamic)
  // --------------------------------------------------------------------------
  const [recentQuizzes] = useState([
    {
      title: "Science Trivia",
      date: "2024-03-15",
      score: "90%",
    },
    {
      title: "History Masters",
      date: "2024-03-14",
      score: "85%",
    },
    {
      title: "Geography Challenge",
      date: "2024-03-13",
      score: "95%",
    },
  ]);

  return (
    <div className="relative min-h-screen bg-gray-50 p-4 md:p-8">
      {/* ---------------- PROFILE CARD ---------------- */}
      <div className="mx-auto p-5 bg-white rounded-3xl shadow-md overflow-hidden w-full relative">
        <button
          onClick={toggleEdit}
          className="absolute top-[290px] right-8 bg-blue-500 text-white px-3 py-1 rounded-t-lg text-sm shadow flex gap-1 items-center hover:bg-blue-600"
        >
          Edit
          <FiEdit3 />
        </button>
        <p className="text-md font-semibold text-gray-700">Manage Profile</p>
        <br />
        <hr />
        <br />
        <div className="relative">
          <div className="bg-blue-500 h-32 rounded-t-2xl"></div>
          <div className="absolute top-16 left-4">
            <img
              src={profileData.profilePic}
              alt="Profile"
              className="h-28 w-28 rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>
        <div className="mt-16 px-6 pb-6">
          <h2 className="text-2xl font-bold text-gray-800 pb-1">
            {profileData.firstName} {profileData.lastName}
          </h2>
          <p className="text-gray-500">
            Current Role:{" "}
            <span className="font-medium text-gray-800">
              {profileData.currentRole}
            </span>
          </p>
          <p className="text-gray-500 mt-2">
            Current Organisation:{" "}
            <span className="font-medium text-gray-800">
              {profileData.currentOrganisation}
            </span>
          </p>
          <p className="text-gray-500 mt-2">
            Current Industry:{" "}
            <span className="font-medium text-gray-800">
              {profileData.currentIndustry}
            </span>
          </p>
          <p className="text-gray-500 mt-4">Bio / About You:</p>
          <p className="text-gray-700 mt-2 whitespace-pre-line">{profileData.bio}</p>
          <hr className="my-8" />

          {/* ---------------- ACHIEVEMENTS SECTION ---------------- */}
          <div className="bg-white rounded-2xl shadow-sm p-5 mb-8">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Achievements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {achievements.map((achv, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-xl shadow p-4 flex flex-col items-center"
                >
                  {achv.icon}
                  <h3 className="text-md font-semibold text-gray-800 mt-2">
                    {achv.title}
                  </h3>
                  <p className="text-sm text-gray-600">{achv.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------- RECENT QUIZZES SECTION ---------------- */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Recent Quizzes</h2>
            {recentQuizzes.map((quiz, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 mb-2 rounded-lg bg-gray-50"
              >
                <div>
                  <div className="text-gray-800 font-medium">{quiz.title}</div>
                  <div className="text-sm text-gray-500">{quiz.date}</div>
                </div>
                <div className="text-blue-600 font-bold text-lg">{quiz.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- EDITABLE PROFILE SECTION (SIDE PANEL) ---------------- */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-end">
          <div className="bg-white w-full md:w-1/3 h-full shadow-lg overflow-y-auto p-6 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
              <button
                onClick={toggleEdit}
                className="text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={profileData.profilePic}
                    alt="Profile"
                    className="h-24 w-24 rounded-full border-4 border-blue-500 object-cover"
                  />
                  <label
                    htmlFor="profilePic"
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full shadow cursor-pointer"
                  >
                    📷
                  </label>
                  <input
                    id="profilePic"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="hidden"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  defaultValue={profileData.firstName}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  defaultValue={profileData.lastName}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Current Role
                </label>
                <input
                  type="text"
                  name="currentRole"
                  defaultValue={profileData.currentRole}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Current Organisation
                </label>
                <input
                  type="text"
                  name="currentOrganisation"
                  defaultValue={profileData.currentOrganisation}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Current Industry
                </label>
                <input
                  type="text"
                  name="currentIndustry"
                  defaultValue={profileData.currentIndustry}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  defaultValue={profileData.bio}
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  defaultValue={profileData.gender}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Transgender</option>
                </select>
              </div>
              <div className="flex justify-between items-center mt-6">
                <button
                  type="button"
                  onClick={toggleEdit}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
