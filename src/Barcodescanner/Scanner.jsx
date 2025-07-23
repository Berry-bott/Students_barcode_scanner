// // src/components/BarcodeScanner.jsx
// import React, { useEffect } from 'react';
// import { Html5QrcodeScanner } from 'html5-qrcode';

// const BarcodeScanner = () => {
//   useEffect(() => {
//     const scanner = new Html5QrcodeScanner("scanner", {
//       fps: 10,
//       qrbox: 250,
//       rememberLastUsedCamera: true,
//     });

//     scanner.render(
//       (decodedText, decodedResult) => {
//         // Save to localStorage
//         const existing = JSON.parse(localStorage.getItem("scannedBarcodes")) || [];
//         const updated = [...existing, { code: decodedText, time: new Date().toISOString() }];
//         localStorage.setItem("scannedBarcodes", JSON.stringify(updated));

//         alert(`Scanned: ${decodedText}`);
//       },
//       (errorMessage) => {
//         // Optional error logging
//         console.warn("Scan error:", errorMessage);
//       }
//     );

//     return () => {
//       scanner.clear().catch(error => console.error("Failed to clear scanner", error));
//     };
//   }, []);

//   return (
//     <div className="my-8">
//       <h2 className="text-xl font-bold text-center mb-4">📷 Scan Barcode</h2>
//       <div id="scanner" className="mx-auto w-full max-w-md border border-gray-300 rounded-md shadow-md"></div>
//     </div>
//   );
// };

// export default BarcodeScanner;


// BarcodeScanner.jsx
import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const BarcodeScanner = () => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("scanner", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      rememberLastUsedCamera: true,
    });

    // Clear any existing content in case of re-render
    document.getElementById("scanner").innerHTML = "";

    scanner.render(
      (decodedText, decodedResult) => {
        console.log("Success:", decodedText);
        const existing = JSON.parse(localStorage.getItem("scannedBarcodes")) || [];
        const updated = [...existing, { code: decodedText, time: new Date().toISOString() }];
        localStorage.setItem("scannedBarcodes", JSON.stringify(updated));
        alert(`Scanned: ${decodedText}`);
      },
      (errorMessage) => {
        console.warn("Scanning error:", errorMessage);
      }
    );

    return () => {
      scanner.clear().catch((error) => console.error("Clear error:", error));
    };
  }, []);

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold text-center mb-4">📷 Scan Barcode</h2>
      <div id="scanner" className="mx-auto w-full max-w-md border border-gray-300 rounded-md shadow-md"></div>
    </div>
  );
};

export default BarcodeScanner;
