// // import React, { useEffect, useRef, useState } from 'react';
// // import { Html5Qrcode } from 'html5-qrcode';
// // import { XIcon } from 'lucide-react'; // make sure you're using lucide-react JSX

// // const BarcodeScanner = () => {
// //   const scannerRef = useRef(null);
// //   const html5QrCodeRef = useRef(null);
// //   const [isScanning, setIsScanning] = useState(false);

// //   const startScanner = () => {
// //     const scannerId = "reader";

// //     if (!document.getElementById(scannerId)) return;

// //     html5QrCodeRef.current = new Html5Qrcode(scannerId);

// //     Html5Qrcode.getCameras().then((devices) => {
// //       if (devices && devices.length) {
// //         const cameraId = devices[0].id;

// //         html5QrCodeRef.current
// //           .start(
// //             cameraId,
// //             { fps: 10, qrbox: { width: 250, height: 250 } },
// //             (decodedText) => {
// //               const existing = JSON.parse(localStorage.getItem("scannedBarcodes")) || [];
// //               const updated = [...existing, { code: decodedText, time: new Date().toISOString() }];
// //               localStorage.setItem("scannedBarcodes", JSON.stringify(updated));
// //               alert(`Scanned: ${decodedText}`);
// //             },
// //             (err) => {
// //               // silently ignore scan errors
// //             }
// //           )
// //           .catch((err) => {
// //             console.error("Failed to start camera:", err);
// //           });
// //       }
// //     });
// //   };

// //   const stopScanner = () => {
// //     if (html5QrCodeRef.current && html5QrCodeRef.current._isScanning) {
// //       html5QrCodeRef.current
// //         .stop()
// //         .then(() => {
// //           html5QrCodeRef.current.clear();
// //           setIsScanning(false);
// //         })
// //         .catch((err) => console.warn("Stop error:", err));
// //     } else {
// //       setIsScanning(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (isScanning) {
// //       startScanner();
// //     }

// //     return () => {
// //       if (html5QrCodeRef.current && html5QrCodeRef.current._isScanning) {
// //         html5QrCodeRef.current
// //           .stop()
// //           .then(() => html5QrCodeRef.current.clear())
// //           .catch((err) => console.warn("Cleanup stop error:", err));
// //       }
// //     };
// //   }, [isScanning]);

// //   return (
// //     <>
// //       {/* Scanner stays in place */}
// //       {isScanning && (
// //         <div className="relative mx-auto w-full max-w-md  rounded-xl shadow-2xl">
// //           {/* Close Button */}
// //           <button
// //             onClick={stopScanner}
// //             className="absolute top-3 right-3 z-50 bg-white/80 backdrop-blur p-2 rounded-full text-red-600 hover:text-red-800 shadow-md"
// //           >
// //             <XIcon className="w-5 h-5" />
// //           </button>

// //           {/* Scanner Feed */}
// //           <div
// //             id="reader"
// //             ref={scannerRef}
// //             className="rounded-lg overflow-hidden"
// //             style={{ minHeight: "300px" }}
// //           ></div>
// //         </div>
// //       )}

// //       {/* 📷 Start Scan button at bottom center */}
// //       {!isScanning && (
// //         <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-4 sm:px-0">
// //           <button
// //             onClick={() => setIsScanning(true)}
// //             className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600
// //      hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-xl font-poppins text-sm sm:text-base"
// //           >
// //             📷 Start Scan
// //           </button>
// //         </div>

// //       )}
// //     </>

// //   );
// // };

// // export default BarcodeScanner;

// import React, { useEffect, useRef, useState } from "react";
// import { Html5Qrcode } from "html5-qrcode";
// import { XIcon } from "lucide-react";

// const BarcodeScanner = () => {
//   const scannerRef = useRef(null);
//   const html5QrCodeRef = useRef(null);
//   const [isScanning, setIsScanning] = useState(false);
//   const [cameraDevices, setCameraDevices] = useState([]);
//   const [selectedCameraId, setSelectedCameraId] = useState(null);

//   // Get list of cameras on mount
//   useEffect(() => {
//     Html5Qrcode.getCameras().then((devices) => {
//       setCameraDevices(devices);
//       if (devices.length > 0) {
//         setSelectedCameraId(devices[0].id); // default to first camera
//       }
//     });
//   }, []);

//   const startScanner = () => {
//     const scannerId = "reader";
//     if (!selectedCameraId || !document.getElementById(scannerId)) return;

//     html5QrCodeRef.current = new Html5Qrcode(scannerId);

//     html5QrCodeRef.current
//       .start(
//         selectedCameraId,
//         { fps: 10, qrbox: { width: 250, height: 250 } },
//         (decodedText) => {
//           const existing =
//             JSON.parse(localStorage.getItem("scannedBarcodes")) || [];
//           const updated = [
//             ...existing,
//             { code: decodedText, time: new Date().toISOString() },
//           ];
//           localStorage.setItem("scannedBarcodes", JSON.stringify(updated));
//           alert(`Scanned: ${decodedText}`);
//         },
//         (err) => {
//           // silently ignore scan errors
//         }
//       )
//       .catch((err) => {
//         console.error("Failed to start camera:", err);
//       });
//   };

//   const stopScanner = () => {
//     if (html5QrCodeRef.current && html5QrCodeRef.current._isScanning) {
//       html5QrCodeRef.current
//         .stop()
//         .then(() => {
//           html5QrCodeRef.current.clear();
//           setIsScanning(false);
//         })
//         .catch((err) => console.warn("Stop error:", err));
//     } else {
//       setIsScanning(false);
//     }
//   };

//   useEffect(() => {
//     if (isScanning) {
//       startScanner();
//     }

//     return () => {
//       if (html5QrCodeRef.current && html5QrCodeRef.current._isScanning) {
//         html5QrCodeRef.current
//           .stop()
//           .then(() => html5QrCodeRef.current.clear())
//           .catch((err) => console.warn("Cleanup stop error:", err));
//       }
//     };
//   }, [isScanning, selectedCameraId]);

//   return (
//     <>
//       {/* Scanner View */}
//       {isScanning && (
//         <div className="relative mx-auto w-full max-w-md rounded-xl shadow-2xl">
//           <button
//             onClick={stopScanner}
//             className="absolute top-3 right-3 z-50 bg-white/80 backdrop-blur p-2 rounded-full text-red-600 hover:text-red-800 shadow-md"
//           >
//             <XIcon className="w-5 h-5" />
//           </button>

//           <div
//             id="reader"
//             ref={scannerRef}
//             className="rounded-lg overflow-hidden"
//             style={{ minHeight: "300px" }}
//           ></div>
//         </div>
//       )}

//      {/* {/* Camera Selector */ }

// {!isScanning && cameraDevices.length > 1 && (
//   <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-50">
//     <div className="flex gap-4 bg-white shadow-xl px-4 py-2 rounded-xl border border-gray-300">
//       {cameraDevices.slice(0, 2).map((device, index) => (
//         <button
//           key={device.id}
//           onClick={() => setSelectedCameraId(device.id)}
//           className={`px-4 py-2 rounded-lg font-medium text-sm transition
//             ${
//               selectedCameraId === device.id
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-100 text-gray-800 hover:bg-gray-200"
//             }`}
//         >
//           {device.label?.toLowerCase().includes("front")
//             ? "📱 Front Camera"
//             : device.label?.toLowerCase().includes("back")
//             ? "🎯 Back Camera"
//             : `Camera ${index + 1}`}
//         </button>
//       ))}
//     </div>
//   </div>
// )}

//       {!isScanning && cameraDevices.length > 1 && (
//         <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-50">
//           <div
//             className="px-4 py-2 rounded-lg border shadow-lg flex"
//             onClick={(e) => setSelectedCameraId(e.target.value)}
//             value={selectedCameraId}
//           >
//             {cameraDevices.map((device) => (
//               <button
//                 className="border-2 border-red-300"
//                 key={device.id}
//                 value={device.id}
//               >
//                 {device.label || `Camera ${device.id}`}
//               </button>
//             ))}
//           </div>
//         </div>
//       // )} }

//       {/* Start Scan Button */}
//       {!isScanning && (
//         <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-4 sm:px-0">
//           <button
//             onClick={() => setIsScanning(true)}
//             className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600
//               hover:to-indigo-700 text-white sm:px-4 lg:px-8 py-2 rounded-xl font-semibold shadow-xl
//                font-poppins text-sm sm:text-base"
//           >
//             📷 Start Scan
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default BarcodeScanner;

import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { XIcon } from "lucide-react";

const BarcodeScanner = () => {
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraDevices, setCameraDevices] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState(null);

  // Fetch cameras on mount
  useEffect(() => {
    Html5Qrcode.getCameras().then((devices) => {
      setCameraDevices(devices);
      if (devices.length > 0) {
        setSelectedCameraId(devices[0].id); // default camera
      }
    });
  }, []);

  const startScanner = () => {
    const scannerId = "reader";
    if (!selectedCameraId || !document.getElementById(scannerId)) return;

    html5QrCodeRef.current = new Html5Qrcode(scannerId);

    html5QrCodeRef.current
      .start(
        selectedCameraId,
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          const existing =
            JSON.parse(localStorage.getItem("scannedBarcodes")) || [];
          const updated = [
            ...existing,
            { code: decodedText, time: new Date().toISOString() },
          ];
          localStorage.setItem("scannedBarcodes", JSON.stringify(updated));
          alert(`Scanned: ${decodedText}`);
        },
        () => {
          // ignore scanning errors silently
        }
      )
      .catch((err) => {
        console.error("Failed to start camera:", err);
      });
  };

  const stopScanner = () => {
    if (html5QrCodeRef.current && html5QrCodeRef.current._isScanning) {
      html5QrCodeRef.current
        .stop()
        .then(() => {
          html5QrCodeRef.current.clear();
          setIsScanning(false);
        })
        .catch((err) => console.warn("Stop error:", err));
    } else {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    if (isScanning) {
      startScanner();
    }

    return () => {
      if (html5QrCodeRef.current && html5QrCodeRef.current._isScanning) {
        html5QrCodeRef.current
          .stop()
          .then(() => html5QrCodeRef.current.clear())
          .catch((err) => console.warn("Cleanup stop error:", err));
      }
    };
  }, [isScanning, selectedCameraId]);

  return (
    <>
      {/* Scanner Feed */}
      {isScanning && (
        <div className="relative mx-auto w-full max-w-md rounded-xl shadow-2xl">
          <button
            onClick={stopScanner}
            className="absolute top-3 right-3 z-50 bg-white/80 backdrop-blur p-2 rounded-full text-red-600 hover:text-red-800 shadow-md"
          >
            <XIcon className="w-5 h-5" />
          </button>
          <div
            id="reader"
            ref={scannerRef}
            className="rounded-lg overflow-hidden"
            style={{ minHeight: "250px" }}
          ></div>
        </div>
      )}

      {/* Camera Selector */}
      {!isScanning && cameraDevices.length > 1 && (
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex gap-4 bg-white shadow-xl px-8 py-2 rounded-xl border border-gray-300">
            {cameraDevices.slice(0, 2).map((device, index) => (
              <button
                key={device.id}
                onClick={() => setSelectedCameraId(device.id)}
                className={`px-8 py-0 rounded-lg font-medium text-sm transition
                  ${
                    selectedCameraId === device.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
              >
                {device.label?.toLowerCase().includes("front")
                  ? " <div className> <div>Front</div> <div>📷</div>  </div>"
                  : device.label?.toLowerCase().includes("back")
                  ? " <div> <div>Back</div> <div>📷</div>  </div>"
                  : `Camera ${index + 1}`}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Start Scan Button */}
      {!isScanning && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full px-4 sm:px-0">
          <button
            onClick={() => setIsScanning(true)}
            className="w-full sm:w-auto px-5 sm:px-6 md:px-8 lg:px-10 py-3 rounded-xl
                    bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
                    text-white text-sm sm:text-base md:text-lg font-semibold shadow-xl
                    transition-all duration-300 ease-in-out font-poppins"
          >
            📷 Start Scan
          </button>
        </div>
      )}
    </>
  );
};

export default BarcodeScanner;
