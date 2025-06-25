import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DevicePairingCardProps {
  /**
   * The full URL to be encoded in the QR code.
   */
  pairingUrl: string;
  /**
   * The numerical pin code for manual pairing.
   */
  pairingPin?: string;
}

const DevicePairingCard: React.FC<DevicePairingCardProps> = ({ pairingUrl, pairingPin = "123-456" }) => {
  console.log('DevicePairingCard loaded');

  // Use a public API to generate a QR code from the pairing URL without adding a new dependency.
  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pairingUrl)}`;

  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Pair Your New Device</CardTitle>
        <CardDescription className="pt-1">
          Open the Data-Migrate app on your phone and scan the QR code to connect.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 p-6">
        <div className="p-4 bg-white border-4 border-gray-200 rounded-xl">
          <img 
            src={qrCodeApiUrl} 
            alt="Device Pairing QR Code"
            width={200}
            height={200}
          />
        </div>
        
        <div className="text-center w-full">
          <p className="text-sm text-muted-foreground">Or enter this code manually:</p>
          <div className="mt-2 text-4xl font-mono font-bold tracking-widest bg-slate-100 dark:bg-slate-800 py-3 px-4 rounded-lg border">
            {pairingPin}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DevicePairingCard;