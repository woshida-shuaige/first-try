
import React from 'react';
import { PetConfig } from '../types';
import { PET_COLORS } from '../constants';

interface SettingsProps {
  config: PetConfig;
  onChange: (newConfig: PetConfig) => void;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ config, onChange, onClose }) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl w-72 space-y-4 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 border-b pb-2">设置小家</h3>
      
      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-500 uppercase">宠物名字</label>
        <input 
          type="text"
          value={config.name}
          onChange={(e) => onChange({...config, name: e.target.value})}
          className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-pink-300 outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-500 uppercase">主人昵称</label>
        <input 
          type="text"
          value={config.friendName}
          onChange={(e) => onChange({...config, friendName: e.target.value})}
          className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-pink-300 outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-500 uppercase">宠物颜色</label>
        <div className="flex flex-wrap gap-2">
          {PET_COLORS.map(c => (
            <button
              key={c.value}
              onClick={() => onChange({...config, color: c.value})}
              className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${config.color === c.value ? 'border-gray-800' : 'border-transparent'}`}
              style={{ backgroundColor: c.value }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      <button 
        onClick={onClose}
        className="w-full bg-gray-800 text-white py-2 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors"
      >
        保存并返回
      </button>
    </div>
  );
};

export default Settings;
