import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { UICustomModal } from './UICustomModal';

const meta: Meta<typeof UICustomModal> = {
  title: 'UI/UICustomModal',
  component: UICustomModal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UICustomModal>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Modal Title</h2>
        <p className="text-gray-600">
          This is the content of the modal. You can put any content here.
        </p>
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Confirm
          </button>
        </div>
      </div>
    </UICustomModal>
  ),
};

export const SimpleMessage: Story = {
  render: () => (
    <UICustomModal>
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold">Confirmation</h3>
        <p>Are you sure you want to proceed with this action?</p>
        <div className="flex justify-center space-x-3">
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            No
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Yes
          </button>
        </div>
      </div>
    </UICustomModal>
  ),
};

export const FormModal: Story = {
  render: () => (
    <UICustomModal>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Create New Item</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Enter description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select category</option>
              <option>Work</option>
              <option>Personal</option>
              <option>Project</option>
            </select>
          </div>
        </form>
        <div className="flex justify-end space-x-3">
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Create
          </button>
        </div>
      </div>
    </UICustomModal>
  ),
};

export const AlertModal: Story = {
  render: () => (
    <UICustomModal>
      <div className="text-center space-y-4">
        <div className="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Delete Item</h3>
        <p className="text-gray-600">
          This action cannot be undone. Are you sure you want to delete this item permanently?
        </p>
        <div className="flex justify-center space-x-3 pt-2">
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </UICustomModal>
  ),
};

export const SuccessModal: Story = {
  render: () => (
    <UICustomModal>
      <div className="text-center space-y-4">
        <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Success!</h3>
        <p className="text-gray-600">
          Your action has been completed successfully.
        </p>
        <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Continue
        </button>
      </div>
    </UICustomModal>
  ),
};

export const InfoModal: Story = {
  render: () => (
    <UICustomModal>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Information</h3>
        </div>
        <div className="space-y-3 text-gray-600">
          <p>Here are some important details about this feature:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Feature will be available in 24 hours</li>
            <li>All existing data will be preserved</li>
            <li>You will receive an email notification</li>
            <li>No action is required from your side</li>
          </ul>
        </div>
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Got it
          </button>
        </div>
      </div>
    </UICustomModal>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState<'confirm' | 'form' | 'alert'>('confirm');

    const openModal = (type: 'confirm' | 'form' | 'alert') => {
      setModalType(type);
      setIsOpen(true);
    };

    const closeModal = () => {
      setIsOpen(false);
    };

    return (
      <div className="p-8 space-y-4">
        <h2 className="text-xl font-bold mb-4">Interactive Modal Demo</h2>
        <div className="space-x-4">
          <button
            onClick={() => openModal('confirm')}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Open Confirmation
          </button>
          <button
            onClick={() => openModal('form')}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Open Form
          </button>
          <button
            onClick={() => openModal('alert')}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Open Alert
          </button>
        </div>

        {isOpen && (
          <UICustomModal>
            {modalType === 'confirm' && (
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Confirm Action</h3>
                <p>Do you want to proceed with this action?</p>
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}

            {modalType === 'form' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Add New Item</h3>
                <input
                  type="text"
                  placeholder="Item name"
                  className="w-full px-3 py-2 border rounded-md"
                />
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            {modalType === 'alert' && (
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-red-600">Warning!</h3>
                <p>This is an important alert message.</p>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            )}
          </UICustomModal>
        )}
      </div>
    );
  },
};