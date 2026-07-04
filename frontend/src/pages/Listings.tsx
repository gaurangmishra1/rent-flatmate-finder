import { useEffect, useState } from "react";
import api from "../api/api";

interface Listing {
  id: string;
  location: string;
  rent: number;
  roomType: string;
  furnished: boolean;
  owner: {
    name: string;
  };
}

export default function Listings() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    loadListings();
  }, []);

  async function loadListings() {
    try {
      const res = await api.get("/listings");

      setListings(res.data.listings);
    } catch (err) {
      console.log(err);
    }
  }
  async function sendInterest(listingId: string) {
  try {
    const token = localStorage.getItem("token");

    const res = await api.post(
      "/interests",
      {
        listingId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Interest Sent Successfully");
    console.log(res.data);
  } catch (err: any) {
    alert(err.response?.data?.message || "Failed");
  }
}

  return (
    <div style={{ padding: 20 }}>
      <h1>Available Listings</h1>

      {listings.map((listing) => (
        <div
          key={listing.id}
          style={{
            border: "1px solid gray",
            padding: 15,
            marginBottom: 15,
            borderRadius: 10,
          }}
        >
          <h3>{listing.location}</h3>

          <p>Rent: ₹{listing.rent}</p>

          <p>Room: {listing.roomType}</p>

          <p>
            Furnished: {listing.furnished ? "Yes" : "No"}
          </p>

          <p>Owner: {listing.owner.name}</p>

<button
  onClick={() => sendInterest(listing.id)}
>
  I'm Interested
</button>        </div>
      ))}
    </div>
  );
}