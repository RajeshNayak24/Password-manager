import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";

const Form = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const ref = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    console.log("show password.....!");
    console.log(ref.current.src);
    console.log(ref.current.src.includes("src/assets/visibility-off.png"));

    passwordRef.current.type = "text";
    if (ref.current.src.includes("src/assets/visibility-off.png")) {
      ref.current.src = "src/assets/visibility.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "src/assets/visibility-off.png";
      passwordRef.current.type = "text";
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = () => {
    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );
    console.log([...passwordArray, form]);
    setform({ site: "", username: "", password: "" });
    toast("password saved..!");
  };

  const deletePassword = (id) => {
    console.log("deleting password...", id);
    let c = confirm("Are you sure! Do you want Delete..!");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id != id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id != id))
      );
    }
    toast("password deleted..!");
  };
  const editPassword = (id) => {
    console.log("Editing password...", id);
    setform(passwordArray.filter((item) => item.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id != id));
  };

  const copyPassword = (text) => {
    navigator.clipboard.writeText(text);
    toast("copied to clipboard..!");
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl text text-center font-bold">
        <span className="text-green-500">&lt;</span>
        <span>Sec</span>
        <span className="text-green-500">Pass</span>
        <span className="text-green-500">/&gt;</span>
      </h1>
      <p className="text-green-300 font-bold text-center ">
        Your own password Manager
      </p>

      <div className=" flex flex-col gap-4 p-2 mx-auto my-3 items-center ">
        <input
          value={form.site}
          onChange={handleChange}
          className="inputfield w-full border-green-400 p-4 py-1"
          type="text"
          placeholder="Enter website url"
          name="site"
        />

        <div className="flex w-full justify-between gap-8">
          <input
            value={form.username}
            onChange={handleChange}
            className="inputfield w-full border-green-400 p-4 py-1"
            type="text"
            placeholder="Enter username"
            name="username"
          />
          <div className="relative w-full ">
            <input
              ref={passwordRef}
              value={form.password}
              onChange={handleChange}
              className="inputfield w-full border-green-400 p-4 py-1 "
              type="password"
              placeholder="Enter password"
              name="password"
            />
            <span className="absolute right-2 top-1" onClick={showPassword}>
              <img
                ref={ref}
                className="p-1"
                src="src/assets/visibility.png"
                alt="visibility"
              />
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="inputfield p-4 py-1 bg-green-600 border-green-400 hover:bg-green-800 text-white"
          onClick={savePassword}
        >
          Save password
        </button>
        <ToastContainer />
      </div>
      <div className="passwords mx-auto my-3 p-1 w-full max-w-6xl">
        <h2 className="font-bold text-xl mb-2">Your Passwords</h2>

        {passwordArray.length === 0 && <div>No passwords to show</div>}

        {passwordArray.length !== 0 && (
          <div className="overflow-x-auto sm:overflow-x-visible sm:overflow-y-visible overflow-y-auto max-h-[60vh] sm:max-h-none">
            <table className="table-auto w-full border-collapse ">
              <thead className="bg-green-800 text-white text-center sticky top-0">
                <tr>
                  <th className="py-2 px-4">Site</th>
                  <th className="py-2 px-4">Username</th>
                  <th className="py-2 px-4">Password</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-green-100">
                {passwordArray.map((items, index) => (
                  <tr key={index} className="border-b border-white">
                    <td className="py-2 px-4 text-center break-all">
                      <a
                        href={items.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {items.site}
                      </a>
                    </td>

                    <td className="py-2 px-4 text-center break-all">
                      <div className="flex justify-center items-center gap-2">
                        {items.username}
                        <button onClick={() => copyPassword(items.username)}>
                          <img
                            src="src/assets/copy.png"
                            alt="copy"
                            className="w-4 h-4"
                          />
                        </button>
                      </div>
                    </td>

                    <td className="py-2 px-4 text-center break-all">
                      <div className="flex justify-center items-center gap-2">
                        {items.password}
                        <button onClick={() => copyPassword(items.password)}>
                          <img
                            src="src/assets/copy.png"
                            alt="copy"
                            className="w-4 h-4"
                          />
                        </button>
                      </div>
                    </td>

                    <td className="py-2 px-4 text-center">
                      <div className="flex justify-center gap-4">
                        <button onClick={() => editPassword(items.id)}>
                          <img
                            src="src/assets/edit.png"
                            alt="edit"
                            className="w-4 h-4"
                          />
                        </button>
                        <button onClick={() => deletePassword(items.id)}>
                          <img
                            src="src/assets/delete.png"
                            alt="delete"
                            className="w-4 h-4"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
