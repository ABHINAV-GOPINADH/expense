'use client';

import React, { useState, useRef } from 'react';
import { CameraIcon, DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ReceiptScannerProps {
  onScanComplete: (data: {
    amount: number;
    date: string;
    description: string;
    category: string;
    merchant: string;
  }) => void;
  onClose: () => void;
}

export default function ReceiptScanner({ onScanComplete, onClose }: ReceiptScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [scannedData, setScannedData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      processImage(file);
    }
  };

  const processImage = async (file: File) => {
    setIsScanning(true);
    
    try {
      // Mock OCR processing - in real app, this would call an OCR service
      // For demo purposes, we'll simulate processing time and return mock data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockData = {
        amount: Math.random() * 200 + 10, // Random amount between $10-$210
        date: new Date().toISOString().split('T')[0],
        description: 'Receipt from ' + (file.name.split('.')[0] || 'merchant'),
        category: 'Meals & Entertainment',
        merchant: 'Sample Restaurant',
      };
      
      setScannedData(mockData);
    } catch (error) {
      console.error('OCR processing failed:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      alert('Camera access is required for receipt scanning');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'receipt.jpg', { type: 'image/jpeg' });
            processImage(file);
          }
        }, 'image/jpeg');
      }
    }
  };

  const confirmScanData = () => {
    if (scannedData) {
      onScanComplete(scannedData);
    }
  };

  const resetScanner = () => {
    setPreviewUrl('');
    setScannedData(null);
    setIsScanning(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Scan Receipt</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {!previewUrl && !scannedData && (
          <div className="space-y-4">
            <div className="text-center">
              <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h4 className="mt-2 text-lg font-medium text-gray-900">
                Upload or Capture Receipt
              </h4>
              <p className="mt-1 text-sm text-gray-500">
                Choose how you'd like to scan your receipt
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-6 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <DocumentIcon className="mx-auto h-8 w-8 text-gray-400" />
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Upload File
                </span>
                <span className="mt-1 block text-sm text-gray-500">
                  JPG, PNG, or PDF
                </span>
              </button>

              <button
                onClick={handleCameraCapture}
                className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-6 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <CameraIcon className="mx-auto h-8 w-8 text-gray-400" />
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Take Photo
                </span>
                <span className="mt-1 block text-sm text-gray-500">
                  Use camera
                </span>
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}

        {previewUrl && !scannedData && (
          <div className="space-y-4">
            <div className="text-center">
              <img
                src={previewUrl}
                alt="Receipt preview"
                className="mx-auto h-64 w-auto object-contain rounded-lg border"
              />
            </div>
            
            {isScanning && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Processing receipt...</p>
              </div>
            )}

            <div className="flex justify-center space-x-4">
              <button
                onClick={resetScanner}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {scannedData && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <DocumentIcon className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="mt-2 text-lg font-medium text-gray-900">
                Receipt Scanned Successfully!
              </h4>
              <p className="mt-1 text-sm text-gray-500">
                Please review the extracted information below
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={scannedData.amount}
                    onChange={(e) => setScannedData({...scannedData, amount: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={scannedData.date}
                    onChange={(e) => setScannedData({...scannedData, date: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={scannedData.description}
                  onChange={(e) => setScannedData({...scannedData, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={scannedData.category}
                  onChange={(e) => setScannedData({...scannedData, category: e.target.value})}
                >
                  <option value="Meals & Entertainment">Meals & Entertainment</option>
                  <option value="Travel">Travel</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Accommodation">Accommodation</option>
                  <option value="Communication">Communication</option>
                  <option value="Training & Development">Training & Development</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Merchant</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={scannedData.merchant}
                  onChange={(e) => setScannedData({...scannedData, merchant: e.target.value})}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={resetScanner}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Scan Again
              </button>
              <button
                onClick={confirmScanData}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Use This Data
              </button>
            </div>
          </div>
        )}

        {/* Hidden video element for camera capture */}
        <video
          ref={videoRef}
          className="hidden"
          autoPlay
          playsInline
        />
        <canvas
          ref={canvasRef}
          className="hidden"
        />
      </div>
    </div>
  );
}
