'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedBus from './components/AnimatedBus';
import { useBusPass } from './context/BusPassContext';
import { GraduationCap, ArrowRight } from 'lucide-react';

const colleges = [
  'St. Joseph\'s College of Engineering and Technology, Palai',
  'College of Engineering Trivandrum',
  'Government Engineering College Thrissur',
  'Cochin University of Science and Technology',
  'National Institute of Technology Calicut',
  'Indian Institute of Technology Palakkad',
];

export default function HomePage() {
  const router = useRouter();
  const { data, updateData } = useBusPass();
  const [selectedCollege, setSelectedCollege] = useState(data.college);

  const handleNext = () => {
    if (selectedCollege) {
      updateData({ college: selectedCollege });
      router.push('/user-details');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-orange-50">
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/90 backdrop-blur-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="w-12 h-12 text-blue-600 mr-3" />
              <div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-orange-600 bg-clip-text text-transparent">
                  Bus Pass Portal
                </CardTitle>
                <p className="text-lg text-gray-600 mt-2">
                  St. Joseph's College of Engineering and Technology, Palai
                </p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8">
            <AnimatedBus />
            
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Welcome to Digital Bus Pass System
                </h2>
                <p className="text-gray-600">
                  Get your bus pass issued digitally in just a few simple steps
                </p>
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Select Your College
                </label>
                <Select value={selectedCollege} onValueChange={setSelectedCollege}>
                  <SelectTrigger className="w-full h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors">
                    <SelectValue placeholder="Choose your college from the list" />
                  </SelectTrigger>
                  <SelectContent>
                    {colleges.map((college) => (
                      <SelectItem key={college} value={college} className="text-base py-3">
                        {college}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                onClick={handleNext}
                disabled={!selectedCollege}
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Next Step
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}