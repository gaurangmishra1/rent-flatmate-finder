import { useEffect, useState } from "react";
import api from "../api/api";

interface Interest {
  id: string;
  status: string;
  compatibilityScore: number;

  tenant?: {
    name: string;
    email: string;
  };

  listing: {
    location: string;
    rent: number;
  };
}

export default function Interests() {
  const [interests, setInterests] = useState<Interest[]>([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    loadInterests();
  }, []);

  async function loadInterests() {
    try {
      const token = localStorage.getItem("token");

      const endpoint =
        user.role === "OWNER"
          ? "/interests/owner"
          : "/interests/my";

      const res = await api.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setInterests(res.data.interests);
    } catch (err) {
      console.log(err);
    }
  }

  async function updateStatus(
    id: string,
    status: "ACCEPTED" | "DECLINED"
  ) {
    try {
      const token = localStorage.getItem("token");

      const endpoint =
        status === "ACCEPTED"
          ? `/interests/${id}/accept`
          : `/interests/${id}/decline`;

      await api.patch(
        endpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Updated Successfully");

      loadInterests();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>
        {user.role === "OWNER"
          ? "Interested Tenants"
          : "My Interests"}
      </h1>

      {interests.length === 0 && (
        <p>No interests found.</p>
      )}

      {interests.map((i) => (
        <div
          key={i.id}
          style={{
            border: "1px solid gray",
            padding: 15,
            marginBottom: 15,
            borderRadius: 8,
          }}
        >
          {user.role === "OWNER" && i.tenant && (
            <>
              <h3>{i.tenant.name}</h3>
              <p>{i.tenant.email}</p>
            </>
          )}

          <p>
            <b>Location:</b> {i.listing.location}
          </p>

          <p>
            <b>Rent:</b> ₹{i.listing.rent}
          </p>

          <p>
            <b>Compatibility:</b> {i.compatibilityScore}%
          </p>

          <p>
            <b>Status:</b> {i.status}
          </p>

          {user.role === "OWNER" &&
            i.status === "PENDING" && (
              <>
                <button
                  onClick={() =>
                    updateStatus(i.id, "ACCEPTED")
                  }
                >
                  Accept
                </button>

                <button
                  style={{ marginLeft: 10 }}
                  onClick={() =>
                    updateStatus(i.id, "DECLINED")
                  }
                >
                  Decline
                </button>
              </>
            )}
        </div>
      ))}
    </div>
  );
}