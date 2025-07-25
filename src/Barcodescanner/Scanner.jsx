import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { XIcon } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const BarcodeScanner = () => {
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraDevices, setCameraDevices] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Html5Qrcode.getCameras().then((devices) => {
      setCameraDevices(devices);
      if (devices.length > 0) {
        setSelectedCameraId(devices[0].id);
      }
    });
  }, []);

  const handleScanSuccess = async (decodedText) => {
    const regNum = decodedText.trim();
    setIsLoading(true);

    try {
      const { data: student, error: studentError } = await supabase
        .from("students")
        .select("*")
        .eq("reg_num", regNum)
        .single();

      if (studentError || !student) {
        setScanResult({
          message: `Student with reg_num "${regNum}" not found`,
          status: "error",
        });
        stopScanner();
        return;
      }

      const today = new Date().toISOString().split("T")[0];

      const { data: existingAttendance } = await supabase
        .from("attendance")
        .select("*")
        .eq("reg_num", regNum)
        .eq("date", today)
        .single();

      if (existingAttendance) {
        setScanResult({
          message: `Attendance already recorded for ${regNum} today`,
          status: "warning",
        });
        stopScanner();
        return;
      }

      const { error: attendanceError } = await supabase
        .from("attendance")
        .insert({
          reg_num: regNum,
          status: "present",
        });

      if (attendanceError) {
        setScanResult({
          message: `Could not log attendance: ${attendanceError.message}`,
          status: "error",
        });
      } else {
        setScanResult({
          message: `Attendance recorded for ${regNum}`,
          status: "success",
        });
      }

      stopScanner();
    } catch (err) {
      console.error(err);
      setScanResult({
        message: "Unexpected error while scanning.",
        status: "error",
      });
      stopScanner();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scanResult) {
      const timer = setTimeout(() => setScanResult(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [scanResult]);

  const startScanner = () => {
    const scannerId = "reader";
    if (!selectedCameraId || !document.getElementById(scannerId)) return;

    html5QrCodeRef.current = new Html5Qrcode(scannerId);

    html5QrCodeRef.current
      .start(
        selectedCameraId,
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (decodedText) => {
          await handleScanSuccess(decodedText);
        },
        () => {}
      )
      .catch((err) => {
        console.error("Failed to start camera:", err);
        setScanResult({ message: "Failed to start scanner", status: "error" });
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
    if (isScanning) startScanner();

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
      {/* Spinner Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-[999]">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Result Modal */}
      {scanResult && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-[1000]">
          <div className="bg-white max-w-sm w-full mx-4 rounded-xl p-6 shadow-2xl text-center space-y-4">
            <div
              className={`text-3xl ${
                scanResult.status === "success"
                  ? "text-green-600"
                  : scanResult.status === "warning"
                  ? "text-yellow-500"
                  : "text-red-600"
              }`}
            >
              {scanResult.status === "success"
                ? "✅"
                : scanResult.status === "warning"
                ? "⚠️"
                : "❌"}
            </div>
            <p className="text-gray-800 text-lg font-medium">
              {scanResult.message}
            </p>
          </div>
        </div>
      )}

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
                className={`px-8 py-0 rounded-lg font-medium text-sm transition ${
                  selectedCameraId === device.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {device.label?.toLowerCase().includes("front") ? (
                  <div className="flex items-center gap-2">
                    <span>Front</span> <span>📷</span>
                  </div>
                ) : device.label?.toLowerCase().includes("back") ? (
                  <div className="flex items-center gap-2">
                    <span>Back</span> <span>📷</span>
                  </div>
                ) : (
                  <span>Camera {index + 1}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Start Scan Button */}
      {!isScanning && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full px-4 sm:px-0 flex justify-center">
          <button
            onClick={() => setIsScanning(true)}
            className="w-full sm:w-auto px-5 sm:px-6 md:px-8 lg:px-10 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm sm:text-base md:text-lg font-semibold shadow-xl transition-all duration-300 ease-in-out font-poppins"
          >
            📷 Start Scan
          </button>
        </div>
      )}
    </>
  );
};

export default BarcodeScanner;
