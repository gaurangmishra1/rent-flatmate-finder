import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Rent & Flatmate Finder</h1>

      <hr />

      <h2>Welcome {user.name}</h2>

      <p>Email: {user.email}</p>

      <p>Role: {user.role}</p>

      <br />

      {user.role === "OWNER" && (
        <>
          <button>Create Listing</button>

          <br />
          <br />

          <Link to="/interests">
            <button>View Interests</button>
          </Link>

          <br />
          <br />
        </>
      )}

      {user.role === "TENANT" && (
        <>
          <Link to="/listings">
            <button>Browse Listings</button>
          </Link>

          <br />
          <br />

          <Link to="/interests">
            <button>My Interests</button>
          </Link>

          <br />
          <br />
        </>
      )}

      <Link to="/chat">
        <button>Chat</button>
      </Link>

      <br />
      <br />

      <button onClick={logout}>Logout</button>
    </div>
  );
}