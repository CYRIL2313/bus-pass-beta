'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageTransition from '../components/PageTransition';
import { useBusPass } from '../context/BusPassContext';
import { CreditCard, ArrowLeft, IndianRupee, CheckCircle } from 'lucide-react';

const paymentApps = [
  { name: 'GPay', color: 'bg-green-500', icon: '💳' },
  { name: 'PhonePe', color: 'bg-purple-500', icon: '📱' },
  { name: 'Paytm', color: 'bg-blue-500', icon: '💰' },
  { name: 'BHIM UPI', color: 'bg-orange-500', icon: '🏦' },
  { name: 'Amazon Pay', color: 'bg-yellow-500', icon: '🛒' },
  { name: 'WhatsApp Pay', color: 'bg-green-600', icon: '💬' },
];

export default function OnlinePaymentPage() {
  const router = useRouter();
  const { data, updateData } = useBusPass();
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!data.college || !data.name || !data.destination || data.paymentMethod !== 'online') {
      router.push('/');
    }
  }, [data, router]);

  const handlePayment = async (appName: string) => {
    setSelectedApp(appName);
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      updateData({ paymentStatus: 'paid' });
      router.push('/ticket');
    }, 2000);
  };

  const handleBack = () => {
    router.push('/payment-method');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <PageTransition>
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/90 backdrop-blur-lg">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <CreditCard className="w-10 h-10 text-green-600 mr-3" />
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Online Payment
                </CardTitle>
              </div>
              <p className="text-gray-600">
                Select your preferred payment app
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg border border-green-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-green-700 font-medium">{data.destination}</p>
                    <p className="text-xs text-green-600">{data.name} ({data.admissionNumber})</p>
                  </div>
                  <div className="flex items-center text-xl font-bold text-green-600">
                    <IndianRupee className="w-5 h-5 mr-1" />
                    {data.fare}
                  </div>
                </div>
              </div>
              
              {isProcessing ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-lg font-medium text-gray-700">
                    Processing payment with {selectedApp}...
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Please wait while we complete your transaction
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    {paymentApps.map((app) => (
                      <Card
                        key={app.name}
                        className="cursor-pointer transform hover:scale-105 transition-all duration-200 border-2 border-gray-200 hover:border-green-400 hover:shadow-lg bg-white"
                        onClick={() => handlePayment(app.name)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className={`w-12 h-12 ${app.color} rounded-full flex items-center justify-center mx-auto mb-3 text-white text-xl`}>
                            {app.icon}
                          </div>
                          <h3 className="font-semibold text-gray-800">{app.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">Quick Pay</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-blue-800 font-medium text-sm">
                        Secure Payment
                      </p>
                      <p className="text-blue-700 text-xs mt-1">
                        Your payment is processed securely through encrypted channels
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="w-full h-12 text-base border-2 hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="mr-2 w-5 h-5" />
                    Back to Payment Methods
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </PageTransition>
    </div>
  );
}