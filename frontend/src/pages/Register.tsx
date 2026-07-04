export default function Register() {
  return (
    <div style={{ padding: 30 }}>
      <h2>Register</h2>

      <input placeholder="Name" />

      <br />
      <br />

      <input placeholder="Email" />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
      />

      <br />
      <br />

      <button>Register</button>
    </div>
  );
}