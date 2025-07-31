'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageTransition from '../components/PageTransition';
import { useBusPass } from '../context/BusPassContext';
import { MapPin, IndianRupee, ArrowLeft, ArrowRight } from 'lucide-react';

const busStops = [
  { id: 1, name: 'Kottayam Bus Stand', fare: 50 },
  { id: 2, name: 'Pala Town', fare: 30 },
  { id: 3, name: 'Ettumanoor', fare: 70 },
  { id: 4, name: 'Changanassery', fare: 60 },
  { id: 5, name: 'Thiruvalla', fare: 100 },
  { id: 6, name: 'Kumily', fare: 80 },
  { id: 7, name: 'Mundakayam', fare: 45 },
  { id: 8, name: 'Erattupetta', fare: 35 },
];

export default function BusStopsPage() {
  const router = useRouter();
  const { data, updateData } = useBusPass();

  useEffect(() => {
    if (!data.college || !data.name) {
      router.push('/');
    }
  }, [data, router]);

  const handleDestinationSelect = (destination: string, fare: number) => {
    updateData({ destination, fare });
    router.push('/payment-method');
  };

  const handleBack = () => {
    router.push('/user-details');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-lg mb-6">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <MapPin className="w-10 h-10 text-purple-600 mr-3" />
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Select Your Destination
                  </CardTitle>
                </div>
                <p className="text-gray-600">
                  Choose your bus stop and view the fare
                </p>
              </CardHeader>
            </Card>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg mb-6 border border-purple-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                <div>
                  <p className="text-sm text-purple-700 font-medium">Student: {data.name}</p>
                  <p className="text-sm text-purple-600">Admission: {data.admissionNumber}</p>
                </div>
                <p className="text-sm text-purple-700">{data.college}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {busStops.map((stop) => (
                <Card
                  key={stop.id}
                  className="cursor-pointer transform hover:scale-105 transition-all duration-200 border-2 border-gray-200 hover:border-purple-400 hover:shadow-lg bg-white/80 backdrop-blur-sm"
                  onClick={() => handleDestinationSelect(stop.name, stop.fare)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-purple-600 mr-3" />
                        <div>
                          <h3 className="font-semibold text-gray-800">{stop.name}</h3>
                          <p className="text-sm text-gray-600">Regular Service</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-lg font-bold text-green-600">
                          <IndianRupee className="w-4 h-4" />
                          {stop.fare}
                        </div>
                        <p className="text-xs text-gray-500">per month</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-end">
                      <ArrowRight className="w-4 h-4 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleBack}
                variant="outline"
                className="h-12 px-8 text-base border-2 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="mr-2 w-5 h-5" />
                Back to Details
              </Button>
            </div>
          </div>
        </div>
      </PageTransition>
    </div>
  );
}