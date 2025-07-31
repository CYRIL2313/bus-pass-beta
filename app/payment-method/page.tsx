'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageTransition from '../components/PageTransition';
import { useBusPass } from '../context/BusPassContext';
import { CreditCard, Wallet, ArrowLeft, IndianRupee, AlertCircle } from 'lucide-react';

export default function PaymentMethodPage() {
  const router = useRouter();
  const { data, updateData } = useBusPass();

  useEffect(() => {
    if (!data.college || !data.name || !data.destination) {
      router.push('/');
    }
  }, [data, router]);

  const handleOnlinePayment = () => {
    updateData({ paymentMethod: 'online' });
    router.push('/online-payment');
  };

  const handleUpfrontPayment = () => {
    updateData({ paymentMethod: 'upfront' });
    // Show message for upfront payment
  };

  const handleBack = () => {
    router.push('/bus-stops');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <PageTransition>
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/90 backdrop-blur-lg">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <CreditCard className="w-10 h-10 text-orange-600 mr-3" />
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Payment Method
                </CardTitle>
              </div>
              <p className="text-gray-600">
                Choose your preferred payment option
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-lg border border-orange-200">
                <div className="space-y-2">
                  <p className="text-sm text-orange-700 font-medium">
                    Destination: {data.destination}
                  </p>
                  <div className="flex items-center text-lg font-bold text-green-600">
                    <IndianRupee className="w-5 h-5 mr-1" />
                    {data.fare} per month
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Card
                  className="cursor-pointer transform hover:scale-105 transition-all duration-200 border-2 border-green-200 hover:border-green-400 hover:shadow-lg bg-gradient-to-r from-green-50 to-emerald-50"
                  onClick={handleOnlinePayment}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Wallet className="w-8 h-8 text-green-600 mr-4" />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Online Payment</h3>
                          <p className="text-sm text-gray-600">Pay instantly using UPI or digital wallets</p>
                        </div>
                      </div>
                      <div className="text-green-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card
                  className="cursor-pointer transform hover:scale-105 transition-all duration-200 border-2 border-gray-200 hover:border-gray-400 hover:shadow-lg bg-gradient-to-r from-gray-50 to-slate-50"
                  onClick={handleUpfrontPayment}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard className="w-8 h-8 text-gray-600 mr-4" />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Upfront Payment</h3>
                          <p className="text-sm text-gray-600">Pay directly at college counter</p>
                        </div>
                      </div>
                      <div className="text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {data.paymentMethod === 'upfront' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-800 font-medium">
                      Sorry for the inconvenience
                    </p>
                    <p className="text-yellow-700 text-sm mt-1">
                      Upfront payment will be available soon. Please use online payment for now.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="pt-4">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="w-full h-12 text-base border-2 hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  Back to Destinations
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageTransition>
    </div>
  );
}