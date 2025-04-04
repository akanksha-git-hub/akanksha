import { useEffect } from "react";

export default function CardA({ item }) {
  const performanceData = item?.data?.year_performance || [];

  useEffect(() => {
    console.log("🧾 Full item:", item);
    console.log("🧾 item.data:", item?.data);
    console.log("📊 item.data.year_performance:", item?.data?.year_performance);
    console.log("📦 performanceData (final):", performanceData);
  }, [item]);

  return (
    <div className="bg-[#F6AC27] rounded-lg shadow-lg h-full p-6 text-black">
      <h2 className="text-2xl font-bold mb-4">{item?.data?.title || "No Title"}</h2>
      <p className="mb-4">{item?.data?.description || "No Description"}</p>

      <h3 className="text-xl font-semibold mb-2">Year Performance Data:</h3>

      {performanceData.length > 0 ? (
        <ul className="space-y-4">
          {performanceData.map((entry, index) => (
            <li key={index} className="bg-white p-4 rounded shadow">
              <p><strong>Year:</strong> {entry.year_202324 || "N/A"}</p>
              <p><strong>Percentage:</strong> {entry.percentage || "N/A"}</p>
              <p><strong>Description:</strong> {entry.description || "N/A"}</p>
              <p><strong>Descrip %:</strong> {entry.descrip_percentage || "N/A"}</p>
              <p><strong>Distinction:</strong> {entry.distinction || "N/A"}</p>
              <p><strong>1st Class:</strong> {entry.first_class || "N/A"}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No performance data found.</p>
      )}
    </div>
  );
}
