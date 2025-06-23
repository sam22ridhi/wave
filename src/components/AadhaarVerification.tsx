import React, { useState } from 'react';
import { Shield, CheckCircle, AlertCircle, Upload, Eye, EyeOff } from 'lucide-react';

interface AadhaarVerificationProps {
  onVerificationComplete: (verified: boolean) => void;
  isVisible: boolean;
}

export default function AadhaarVerification({ onVerificationComplete, isVisible }: AadhaarVerificationProps) {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'input' | 'otp' | 'document' | 'complete'>('input');
  const [isLoading, setIsLoading] = useState(false);
  const [showAadhaar, setShowAadhaar] = useState(false);
  const [uploadedDoc, setUploadedDoc] = useState<File | null>(null);

  if (!isVisible) return null;

  const formatAadhaar = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3');
    return formatted;
  };

  const handleAadhaarSubmit = async () => {
    if (aadhaarNumber.replace(/\s/g, '').length !== 12) return;
    
    setIsLoading(true);
    // Simulate API call for OTP generation
    setTimeout(() => {
      setStep('otp');
      setIsLoading(false);
    }, 2000);
  };

  const handleOtpSubmit = async () => {
    if (otp.length !== 6) return;
    
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setStep('document');
      setIsLoading(false);
    }, 1500);
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedDoc(file);
    }
  };

  const handleFinalSubmit = async () => {
    if (!uploadedDoc) return;
    
    setIsLoading(true);
    // Simulate document verification
    setTimeout(() => {
      setStep('complete');
      setIsLoading(false);
      setTimeout(() => {
        onVerificationComplete(true);
      }, 2000);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8 relative">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Organizer Verification
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Secure Aadhaar-based verification for trusted organizers
          </p>
        </div>

        {step === 'input' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Aadhaar Number
              </label>
              <div className="relative">
                <input
                  type={showAadhaar ? 'text' : 'password'}
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(formatAadhaar(e.target.value))}
                  placeholder="XXXX XXXX XXXX"
                  maxLength={14}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowAadhaar(!showAadhaar)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showAadhaar ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">Your data is secure</p>
                  <p>We use bank-grade encryption and never store your Aadhaar number permanently.</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleAadhaarSubmit}
              disabled={aadhaarNumber.replace(/\s/g, '').length !== 12 || isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-lg font-semibold transition-all"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Sending OTP...
                </div>
              ) : (
                'Send OTP'
              )}
            </button>
          </div>
        )}

        {step === 'otp' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="6-digit OTP"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-center text-lg tracking-widest"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                OTP sent to mobile number linked with Aadhaar
              </p>
            </div>

            <button
              onClick={handleOtpSubmit}
              disabled={otp.length !== 6 || isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-lg font-semibold transition-all"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Verifying...
                </div>
              ) : (
                'Verify OTP'
              )}
            </button>
          </div>
        )}

        {step === 'document' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Organization Document
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Upload registration certificate or authorization letter
                </p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleDocumentUpload}
                  className="hidden"
                  id="document-upload"
                />
                <label
                  htmlFor="document-upload"
                  className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Choose File
                </label>
                {uploadedDoc && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                    ✓ {uploadedDoc.name}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleFinalSubmit}
              disabled={!uploadedDoc || isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-lg font-semibold transition-all"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                'Complete Verification'
              )}
            </button>
          </div>
        )}

        {step === 'complete' && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Verification Complete!
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              You are now a verified organizer. Your profile will display the verification badge.
            </p>
            <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
              <div className="flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-green-800 dark:text-green-200 font-medium">Verified Organizer</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}