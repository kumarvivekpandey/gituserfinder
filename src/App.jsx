import React, { useState, useEffect } from 'react';

const API_URL = "https://api.github.com/users/";

const FetchUserData = () => {
  const [inputValue, setInputValue] = useState('');
  const [user, setUser] = useState('');
  const [result, setResult] = useState({});
  
  useEffect(() => {
    if (user) {
    
      fetch(API_URL + user)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then(data => setResult(data))
        .catch(error => console.error("Error fetching data:", error));
    }
               
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the user state with the inputValue when the form is submitted
    setUser(inputValue);
  };



  return (
    <>
      <h1>Hello</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
         
        />
        <button type="submit">Submit</button>
      </form>

     

      <div className="container">
       {/* Display fetched data */}
      {Object.keys(result).length > 0 && (
        <div>
          <h2>User Data</h2>
          
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      </div>
    </>
  );
};

export default FetchUserData;
