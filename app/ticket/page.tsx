'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageTransition from '../components/PageTransition';
import { useBusPass } from '../context/BusPassContext';
import { Ticket, CheckCircle, Home, IndianRupee, Calendar, User, IdCard, MapPin, Download } from 'lucide-react';

export default function TicketPage() {
  const router = useRouter();
  const { data, resetData } = useBusPass();

  useEffect(() => {
    if (!data.college || !data.name || !data.destination || data.paymentStatus !== 'paid') {
      router.push('/');
    }
  }, [data, router]);

  const handleBackToHome = () => {
    resetData();
    router.push('/');
  };

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 print:bg-white">
      <PageTransition>
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white print:shadow-none print:border">
            <CardHeader className="text-center border-b border-dashed border-gray-300">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-green-600 mr-3" />
                <div>
                  <CardTitle className="text-2xl font-bold text-green-600">
                    Payment Successful!
                  </CardTitle>
                  <p className="text-gray-600 mt-1">
                    Your bus pass has been issued
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Ticket className="w-16 h-16 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Digital Bus Pass</h1>
                <p className="text-gray-600">St. Joseph's College of Engineering and Technology, Palai</p>
              </div>
              
              <div className="space-y-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <User className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Student Name</p>
                        <p className="font-semibold text-gray-800">{data.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <IdCard className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Admission Number</p>
                        <p className="font-semibold text-gray-800">{data.admissionNumber}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Destination</p>
                        <p className="font-semibold text-gray-800">{data.destination}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <IndianRupee className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Monthly Fare</p>
                        <p className="font-semibold text-gray-800">₹{data.fare}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Issue Date</p>
                      <p className="font-semibold text-gray-800">{currentDate}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Payment Status: PAID</span>
                </div>
              </div>
              
              <div className="text-center text-sm text-gray-500 mb-8 border-t border-dashed border-gray-300 pt-6">
                <p>This is a digitally generated bus pass.</p>
                <p>Please carry a valid ID along with this pass while traveling.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 print:hidden">
                <Button
                  onClick={handlePrint}
                  variant="outline"
                  className="flex-1 h-12 text-base border-2 hover:bg-gray-50 transition-colors"
                >
                  <Download className="mr-2 w-5 h-5" />
                  Print Pass
                </Button>
                <Button
                  onClick={handleBackToHome}
                  className="flex-1 h-12 text-base bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200"
                >
                  <Home className="mr-2 w-5 h-5" />
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageTransition>
    </div>
  );
}