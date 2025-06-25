import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from 'lucide-react';

// Mock data for transfer history, reflecting the page's purpose
const transferHistory = [
  {
    id: 'txn_1',
    date: '2024-08-15',
    sourceDevice: 'iPhone 14 Pro',
    destinationDevice: 'Samsung Galaxy S24',
    dataTransferred: '8.2 GB',
    status: 'Completed' as const,
  },
  {
    id: 'txn_2',
    date: '2024-08-12',
    sourceDevice: 'Google Pixel 7',
    destinationDevice: 'iPhone 15',
    dataTransferred: '1.5 GB',
    status: 'Failed' as const,
  },
  {
    id: 'txn_3',
    date: '2024-07-30',
    sourceDevice: 'OnePlus 11',
    destinationDevice: 'Google Pixel 8 Pro',
    dataTransferred: '15.6 GB',
    status: 'Completed' as const,
  },
  {
    id: 'txn_4',
    date: '2024-07-25',
    sourceDevice: 'iPhone 13 Mini',
    destinationDevice: 'Nothing Phone (2)',
    dataTransferred: '500 MB',
    status: 'Completed' as const,
  },
];

const HistoryPage = () => {
  console.log('HistoryPage loaded');

  // Helper function to determine badge variant based on status
  const getStatusVariant = (status: 'Completed' | 'Failed') => {
    switch (status) {
      case 'Completed':
        return 'default'; // 'default' is often styled as a success/primary state
      case 'Failed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Transfer History</h1>
          <p className="text-muted-foreground mt-1">A log of all your past data transfer sessions.</p>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableCaption>End of transfer list.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Date</TableHead>
                <TableHead>Transfer Details</TableHead>
                <TableHead className="text-center">Data Size</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transferHistory.map((transfer) => (
                <TableRow key={transfer.id}>
                  <TableCell className="font-medium">{transfer.date}</TableCell>
                  <TableCell>
                    <div className="font-semibold">{transfer.sourceDevice}</div>
                    <div className="text-sm text-muted-foreground">to {transfer.destinationDevice}</div>
                  </TableCell>
                  <TableCell className="text-center">{transfer.dataTransferred}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getStatusVariant(transfer.status)}>
                      {transfer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" aria-label="View Details">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HistoryPage;