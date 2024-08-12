import { Bell, HelpCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const DashboardHeader = () => {
  return (
    <header className="py-4 bg-gray-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className="relative w-64 mr-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search drafts..."
              className="pl-8 pr-4"
            />
          </div>
          <Button variant="outline">Filters</Button>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button>Upgrade Plan</Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;