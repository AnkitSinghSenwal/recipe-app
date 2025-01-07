import { Link } from "react-router-dom";

export default function RecipeListItem({ item, key }) {
  console.log(item);
  return (
    <div
      key={key}
      className="recipe"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: "1 1 250px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", // Darker shadow
        borderRadius: "8px",
        overflow: "hidden",
        textAlign: "center",
        padding: "1px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        backgroundColor: "#2c3e50", // Dark background color
      }}
    >
      <img
        src={item?.image_url}
        alt={item?.title}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "8px 8px 0 0",
        }}
      />
      <h3
        style={{
          fontSize: "18px",
          margin: "10px 0",
          color: "#ecf0f1", // Light text color
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <span>{item?.title}</span>
        <span style={{ fontSize: "14px", color: "#bdc3c7" }}>
          {" "}
          {/* Lighter gray for publisher */}
          {item?.publisher}
        </span>

        <span>
          <Link
            to={`/recipe-item/${item?.id}`}
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#34495e", // Dark background for button
              color: "#ecf0f1", // Light text on button
              textDecoration: "none",
              borderRadius: "5px",
              fontSize: "14px",
              textAlign: "center",
              transition: "background-color 0.3s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#1abc9c"; // Lighter background on hover
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#34495e"; // Reset button background
              e.target.style.transform = "scale(1)";
            }}
            onMouseDown={(e) => {
              e.target.style.transform = "scale(0.95)"; // Click effect
            }}
            onMouseUp={(e) => {
              e.target.style.transform = "scale(1.05)";
            }}
          >
            Recipe Details
          </Link>
        </span>
      </h3>
    </div>
  );
}
