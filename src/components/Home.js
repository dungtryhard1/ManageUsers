const Home = () => {
  return (
    <div className="mt-4">
      <div>
        <span>Use Api from website <a href="https://reqres.in">https://reqres.in.</a></span>
        <br/>
        <span>Website functions:</span>
        <ul className="list-inline ms-3 mt-2">
            <li>1. Login</li>
            <li>2. Add new user</li>
            <li>3. Update user</li>
            <li>4. Delete user</li>
            <li>5. Display all users</li>
            <li>6. Search users follow email</li>
            <li>7. Arrange user follow id and frist name</li>
            <li>8. Import user from file .csv</li>
            <li>9. Export user to file .csv</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
