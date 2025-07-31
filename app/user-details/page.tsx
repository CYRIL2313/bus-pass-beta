'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageTransition from '../components/PageTransition';
import { useBusPass } from '../context/BusPassContext';
import { User, IdCard, ArrowRight, ArrowLeft } from 'lucide-react';

export default function UserDetailsPage() {
  const router = useRouter();
  const { data, updateData } = useBusPass();
  const [name, setName] = useState(data.name);
  const [admissionNumber, setAdmissionNumber] = useState(data.admissionNumber);
  const [errors, setErrors] = useState({ name: '', admissionNumber: '' });

  useEffect(() => {
    if (!data.college) {
      router.push('/');
    }
  }, [data.college, router]);

  const validateForm = () => {
    const newErrors = { name: '', admissionNumber: '' };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (admissionNumber.length <= 2) {
      newErrors.admissionNumber = 'Please enter your admission number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      updateData({ name: name.trim(), admissionNumber });
      router.push('/bus-stops');
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <PageTransition>
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/90 backdrop-blur-lg">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-green-600 mr-3" />
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Student Details
                </CardTitle>
              </div>
              <p className="text-gray-600">
                Please provide your personal information
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700 font-medium">
                  Selected College: {data.college}
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className={`h-12 text-base border-2 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-200 focus:border-green-500'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    <IdCard className="w-4 h-4 inline mr-2" />
                    Admission Number
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={admissionNumber}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.startsWith('SJ')) {
                          setAdmissionNumber(value);
                        }
                      }}
                      placeholder="SJ followed by your admission number"
                      className={`h-12 text-base border-2 transition-colors ${
                        errors.admissionNumber ? 'border-red-500' : 'border-gray-200 focus:border-green-500'
                      }`}
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none bg-gray-100 px-1 rounded">
                      SJ
                    </span>
                  </div>
                  {errors.admissionNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.admissionNumber}</p>
                  )}
                  <p className="text-gray-500 text-sm">
                    Example: SJ2024001
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 h-12 text-base border-2 hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="flex-1 h-12 text-base bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
                >
                  Next Step
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageTransition>
    </div>
  );
}