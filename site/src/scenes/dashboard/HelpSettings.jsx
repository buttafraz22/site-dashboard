import React from 'react';


export const HelpSettings = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex">
          {/* Left Sidebar */}
          <div className="w-64 bg-gray-800">
            <div className="text-white text-lg font-semibold p-4">Settings</div>
            <ul className="text-white">
              <li className="p-4 hover:bg-gray-700 cursor-pointer">General</li>
              <li className="p-4 hover:bg-gray-700 cursor-pointer">Account</li>
              <li className="p-4 hover:bg-gray-700 cursor-pointer">Security</li>
              <li className="p-4 hover:bg-gray-700 cursor-pointer">Notifications</li>
            </ul>
          </div>
    
          {/* Main Content */}
          <div className="flex-1 p-8">
            <h1 className="text-2xl font-semibold mb-4">Help & Settings</h1>
    
            {/* Help Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Help</h2>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id turpis auctor,
                consequat libero non, tempus ligula. Duis efficitur ex a posuere.
              </p>
            </div>
    
            {/* Settings Section */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              <p className="text-gray-700 leading-relaxed">
                Sed ornare eros et felis rutrum, quis ultrices sem scelerisque. Phasellus sed
                fringilla justo, nec consectetur dui.
              </p>
            </div>
          </div>
        </div>
      );
}