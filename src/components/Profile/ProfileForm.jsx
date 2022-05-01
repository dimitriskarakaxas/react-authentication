const ProfileForm = () => {
  return (
    <div className="text-white p-6 bg-blue-500 max-w-lg mx-auto text-center">
      <h2 className="font-bold text-2xl">Change Password</h2>
      <form className="mt-2">
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="text-lg font-bold mb-1">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="text-black py-1 px-2 rounded outline-none"
          />
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="password" className="text-lg font-bold mb-1">
            Your Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="text-black py-1 px-2 rounded outline-none"
          />
        </div>

        <button
          type="submit"
          className="block w-fit mx-auto bg-blue-400 px-8 py-2 text-lg rounded transition-colors hover:bg-blue-800 mb-4"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
