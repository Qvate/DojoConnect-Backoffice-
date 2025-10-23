import React, { useState } from "react";
import { FaSearch, FaFilter, FaDownload } from "react-icons/fa";

// Export modal component
const exportOptions = [
  {
    key: "xlsx",
    label: "As XLSX",
    svg: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M6.75048 0.166016H0.333805V6.58269H1.50048V1.33269H6.2663L8.50048 3.56684V6.58269H9.66713V3.08269L6.75048 0.166016ZM9.53011 9.51353C9.45577 9.45748 9.3765 9.40828 9.29329 9.36653C9.2087 9.32453 9.0372 9.24987 8.77879 9.14253C8.51861 9.03578 8.35354 8.95528 8.28529 8.90163C8.21704 8.84793 8.18261 8.77386 8.18261 8.67993C8.18261 8.57143 8.22346 8.48161 8.30396 8.41043C8.38096 8.34511 8.49471 8.31186 8.64286 8.31186C8.77296 8.31186 8.89779 8.32586 9.01736 8.35386C9.13636 8.38243 9.31546 8.43961 9.55229 8.52711L9.71096 7.88425C9.30846 7.75711 8.93571 7.69411 8.59329 7.69411C8.11846 7.69411 7.77721 7.83993 7.57011 8.13161C7.43421 8.31946 7.36711 8.53761 7.36711 8.78668C7.36711 9.07488 7.46979 9.29593 7.67571 9.44936C7.74804 9.50361 7.82796 9.55203 7.91429 9.59518C8.00121 9.63778 8.14996 9.70311 8.36053 9.79061C8.64579 9.90786 8.82486 9.99361 8.89721 10.0502C8.96954 10.1062 9.00628 10.1844 9.00628 10.2847C9.00628 10.3973 8.96896 10.4918 8.89486 10.5694C8.80911 10.658 8.67554 10.7024 8.49471 10.7024C8.21586 10.7024 7.87636 10.619 7.47621 10.4504L7.36186 11.1229C7.73634 11.2548 8.12776 11.3207 8.53611 11.3207C8.92871 11.3207 9.23321 11.239 9.45076 11.0763C9.70686 10.8832 9.83403 10.5985 9.83403 10.2234C9.83403 9.90493 9.73314 9.66868 9.53011 9.51353ZM2.9045 7.75577L2.0785 8.89791L1.263 7.75577H0.345426L1.57682 9.46144L0.28125 11.2593H1.21285L2.03943 10.0897L2.87007 11.2593H3.8215L2.53407 9.48127L3.80693 7.75577H2.9045ZM4.49998 7.75577V11.2593H6.79423V10.6409H5.28923V7.75577H4.49998Z" fill="#1A1A1A" fillOpacity="0.8"/>
      </svg>
    ),
  },
];

const ExportModal = ({ onClose }: { onClose: () => void }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Export handler
  const handleExport = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      // Example payload for exporting classes
      const payload = {
        format: selected || "xlsx",
        include_all: true,
        filters: {
          status: "active",
          level: "Beginner"
        }
      };
      const res = await fetch("https://apis.dojoconnect.app/export/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      // Download file
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `classes_export.${selected || "xlsx"}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setSuccess("Export successful!");
    } catch (err: any) {
      setError("Export failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-white rounded-md shadow-lg border border-gray-200 w-56 py-2"
      style={{
        position: "absolute",
        top: "110%",
        right: 0,
        zIndex: 100,
      }}
    >
      {exportOptions.map((opt) => {
        const isActive = selected === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            className={`flex items-center w-full px-4 py-2 gap-3 text-left transition
              ${isActive ? "bg-red-50" : ""}
              rounded-md group`}
            onClick={() => setSelected(opt.key)}
          >
            <span
              className={`transition ${
                isActive ? "text-red-600" : "text-gray-500"
              }`}
            >
              {React.cloneElement(opt.svg, {
                ...(isActive ? { color: "#E51B1B" } : { color: "#A1A1A1" }),
              })}
            </span>
            <span
              className={`font-medium transition ${
                isActive ? "text-red-600" : "text-gray-700"
              }`}
            >
              {opt.label}
            </span>
          </button>
        );
      })}
      <div className="px-4 mt-2">
        <button
          className="w-full bg-red-600 text-white rounded-md py-2 font-medium shadow hover:bg-red-700 transition"
          disabled={!selected || loading}
          onClick={handleExport}
        >
          {loading ? "Exporting..." : "Export"}
        </button>
        {success && <div className="text-green-600 text-xs mt-2">{success}</div>}
        {error && <div className="text-red-600 text-xs mt-2">{error}</div>}
      </div>
      <div className="px-4 mt-2">
        <button
          className="w-full text-gray-500 text-xs mt-2"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default function SearchFilterExport() {
  const [showExport, setShowExport] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6" style={{ position: "relative" }}>
        <div className="flex gap-3">
          {/* Search */}
          <div className="flex items-center border border-gray-200 rounded-md px-3 py-2 bg-white">
            <span className="text-gray-400 mr-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search"
              className="outline-none bg-transparent text-sm"
            />
          </div>
          {/* Filter */}
          <div className="flex items-center border border-gray-200 rounded-md px-3 py-2 bg-white">
            <span className="text-gray-400 mr-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-.293.707l-6.414 6.414A1 1 0 0 0 14 14.414V19a1 1 0 0 1-1.447.894l-4-2A1 1 0 0 1 8 17V14.414a1 1 0 0 0-.293-.707L1.293 6.707A1 1 0 0 1 1 6V4z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Filter"
              className="outline-none bg-transparent text-sm"
            />
          </div>
        </div>
        {/* Right Buttons */}
        <div className="flex gap-2" style={{ position: "relative" }}>
          <button
            className="flex items-center gap-2 bg-red-600 text-white rounded-md px-4 py-2 font-medium shadow hover:bg-red-700 transition"
            onClick={() => alert("Create New Profile")}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Create New
          </button>
          <div style={{ position: "relative" }}>
            <button
              className="flex items-center gap-2 bg-white border border-red-600 rounded-md px-4 py-2 font-medium text-red-600 shadow hover:bg-red-50 transition"
              onClick={() => setShowExport((v) => !v)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4m-8 8h12"/>
              </svg>
              Export
            </button>
            {showExport && (
              <ExportModal onClose={() => setShowExport(false)} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}