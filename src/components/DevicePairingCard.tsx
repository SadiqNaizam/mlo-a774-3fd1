import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// A simple SVG to represent a QR code without needing an external library.
const QRCodePlaceholder = () => (
    <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="mx-auto bg-white">
        <path fill="#000" d="M10 10h25v25h-25z m5 5v15h15v-15z M65 10h25v25h-25z m5 5v15h15v-15z M10 65h25v25h-25z m5 5v15h15v-15z M45 10h5v5h-5z M55 10h5v5h-5z M40 15h5v5h-5z M50 20h5v5h-5z M45 25h5v5h-5z M40 30h5v5h-5z M45 35h5v5h-5z M50 35h5v5h-5z M55 35h5v5h-5z M60 35h5v5h-5z M65 35h5v5h-5z M70 35h5v5h-5z M75 35h5v5h-5z M80 35h5v5h-5z M85 35h5v5h-5z M40 40h5v5h-5z M45 45h5v5h-5z M50 50h5v5h-5z M55 55h5v5h-5z M60 60h5v5h-5z M65 65h5v5h-5z M70 70h5v5h-5z M75 75h5v5h-5z M80 80h5v5h-5z M85 85h5v5h-5z M40 60h5v5h-5z M45 65h5v5h-5z M50 70h5v5h-5z M55 75h5v5h-5z M60 80h5v5h-5z M40 85h5v5h-5z" />
    </svg>
);

interface DevicePairingCardProps {
  /**
   * The numerical pin code for manual pairing.
   */
  pairingPin?: string;
}

const DevicePairingCard: React.FC<DevicePairingCardProps> = ({ pairingPin = "123-456" }) => {
  console.log('DevicePairingCard loaded');

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
          <QRCodePlaceholder />
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