import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Contact, Image, Video, CalendarDays } from 'lucide-react';

// Define the structure for a single data type
interface DataType {
  id: string;
  name: string;
  size: string;
  icon: React.ElementType;
  count: number;
}

// Mock data representing what might be fetched from the connected device
const MOCK_DATA_TYPES: DataType[] = [
  { id: 'contacts', name: 'Contacts', size: '15 MB', icon: Contact, count: 584 },
  { id: 'photos', name: 'Photos', size: '2.4 GB', icon: Image, count: 1234 },
  { id: 'videos', name: 'Videos', size: '5.1 GB', icon: Video, count: 88 },
  { id: 'calendar', name: 'Calendar Events', size: '5 MB', icon: CalendarDays, count: 210 },
];

interface DataTypeSelectorProps {
  onSelectionChange?: (selectedIds: string[]) => void;
}

const DataTypeSelector: React.FC<DataTypeSelectorProps> = ({ onSelectionChange }) => {
  console.log('DataTypeSelector loaded');

  // State to manage which items are selected. We use a Map for efficient lookups.
  const [selected, setSelected] = useState<Map<string, boolean>>(() => {
    // By default, all items are selected
    const initialSelection = new Map<string, boolean>();
    MOCK_DATA_TYPES.forEach(item => initialSelection.set(item.id, true));
    return initialSelection;
  });

  const handleCheckedChange = (id: string) => {
    setSelected(prevSelected => {
      const newSelected = new Map(prevSelected);
      newSelected.set(id, !newSelected.get(id));
      return newSelected;
    });
  };

  // Memoize the calculation of selected items
  const selectedItemsSummary = useMemo(() => {
    const selectedIds = MOCK_DATA_TYPES
      .filter(item => selected.get(item.id))
      .map(item => item.id);
    const count = selectedIds.length;
    return { count, ids: selectedIds };
  }, [selected]);

  // Notify the parent component when the selection changes
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedItemsSummary.ids);
    }
  }, [selectedItemsSummary, onSelectionChange]);

  const allSelected = selectedItemsSummary.count === MOCK_DATA_TYPES.length;
  const isIndeterminate = selectedItemsSummary.count > 0 && !allSelected;

  const handleSelectAllChange = () => {
    const newAllSelectedValue = !allSelected;
    setSelected(prevSelected => {
      const newSelected = new Map(prevSelected);
      MOCK_DATA_TYPES.forEach(item => newSelected.set(item.id, newAllSelectedValue));
      return newSelected;
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Select Data to Transfer</CardTitle>
        <CardDescription>Uncheck any items you don't want to transfer.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center p-2 rounded-md border">
            <Checkbox
              id="select-all"
              checked={allSelected}
              onCheckedChange={handleSelectAllChange}
              aria-label="Select all data types"
            />
            <Label htmlFor="select-all" className="ml-3 flex-1 text-sm font-medium">
              Select All
            </Label>
            <span className="text-sm text-muted-foreground">{`${selectedItemsSummary.count} of ${MOCK_DATA_TYPES.length} selected`}</span>
        </div>
        
        <div className="space-y-2">
          {MOCK_DATA_TYPES.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-3 rounded-lg transition-colors hover:bg-muted/50"
            >
              <item.icon className="h-6 w-6 mr-4 text-muted-foreground" />
              <div className="flex-grow">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">{`${item.count} items • ${item.size}`}</p>
              </div>
              <Checkbox
                id={item.id}
                checked={!!selected.get(item.id)}
                onCheckedChange={() => handleCheckedChange(item.id)}
                aria-label={`Select ${item.name}`}
              />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4 border-t text-sm text-muted-foreground">
        <p>Total items selected: {selectedItemsSummary.count} categories.</p>
      </CardFooter>
    </Card>
  );
};

export default DataTypeSelector;