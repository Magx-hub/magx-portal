import React from 'react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

const MigrationModal = ({ 
  isOpen, 
  onClose, 
  onMigrate, 
  loading 
}) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="Migrate Sample Data"
    >
      <div className="p-6">
        <p className="text-gray-600 mb-6">
          This will add sample student data including academic scores and behavioral assessments. 
          This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <Button 
            onClick={onClose}
            variant="outline"
          >
            Cancel
          </Button>
          <Button 
            onClick={onMigrate}
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Migrating...' : 'Migrate Data'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default MigrationModal;
