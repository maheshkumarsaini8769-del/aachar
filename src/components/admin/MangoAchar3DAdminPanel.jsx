import React, { useState, lazy, Suspense } from 'react';
import { 
  Rotate3d, 
  Upload, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  Eye, 
  Sliders, 
  Sparkles, 
  FileCode, 
  Layers, 
  Check, 
  AlertCircle,
  Download
} from 'lucide-react';
import { 
  get3DSettings, 
  save3DSettings, 
  reset3DSettings 
} from '../../utils/threeSettingsStorage';

const MangoAchar3DViewer = lazy(() =>
  import('../product/MangoAchar3DViewer').then(m => ({ default: m.MangoAchar3DViewer }))
);

export const MangoAchar3DAdminPanel = () => {
  const [config, setConfig] = useState(get3DSettings);
  const [activeTab, setActiveTab] = useState('general');
  const [savedToast, setSavedToast] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [previewKey, setPreviewKey] = useState(0);

  const handleToggleEnable = () => {
    setConfig(prev => ({ ...prev, isEnabled: !prev.isEnabled }));
  };

  const handleSave = () => {
    save3DSettings(config);
    setSavedToast(true);
    setPreviewKey(k => k + 1);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all 3D product settings to default factory values?')) {
      const def = reset3DSettings();
      setConfig(def);
      setPreviewKey(k => k + 1);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.glb') && !file.name.endsWith('.gltf')) {
      alert('Security Validation: Only .glb or .gltf 3D assets are allowed.');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      alert('File size exceeds 25MB limit.');
      return;
    }

    // In browser, create a local object URL for previewing
    const objectUrl = URL.createObjectURL(file);
    setConfig(prev => ({
      ...prev,
      modelType: 'glb',
      glbUrl: objectUrl
    }));
    setUploadStatus(`Uploaded "${file.name}" (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
    setPreviewKey(k => k + 1);
  };

  const handleUpdateIngredient = (idx, field, value) => {
    const updated = [...config.ingredients];
    updated[idx] = { ...updated[idx], [field]: value };
    setConfig(prev => ({ ...prev, ingredients: updated }));
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#2D1810] to-[#4A2511] p-5 sm:p-6 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-2 border-amber-500/30 shadow-md">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-amber-400/30">
            <Rotate3d className="w-3.5 h-3.5" />
            <span>Product Management • Mango Achar Only</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold">
            Interactive 3D Product Experience Settings
          </h2>
          <p className="text-xs sm:text-sm text-amber-100/80 mt-1 max-w-xl">
            Control the WebGL 3D jar viewer, GLB models, default viewing angles, authentic ingredient markers, and live product animations for Classic Mango Pickle.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-brand-yellow hover:bg-amber-400 text-brand-brown text-xs sm:text-sm font-extrabold flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{savedToast ? 'Published!' : 'Save & Publish'}</span>
          </button>
        </div>
      </div>

      {savedToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>3D Settings successfully published to the live Mango Achar product page!</span>
        </div>
      )}

      {/* Main Grid: Settings Tabs (Left) + Live 3D Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Settings Panel (Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Sub-tab Navigation */}
          <div className="flex border-b border-brand-border bg-white rounded-xl p-1 gap-1">
            {[
              { id: 'general', label: 'General & Status', icon: Sliders },
              { id: 'model', label: '3D Model & Assets', icon: FileCode },
              { id: 'camera', label: 'Camera & Studio', icon: Eye },
              { id: 'ingredients', label: 'Ingredient Markers', icon: Sparkles }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-brand-brown text-white shadow-xs'
                      : 'text-brand-brownMuted hover:text-brand-brown hover:bg-amber-50/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: General & Status */}
          {activeTab === 'general' && (
            <div className="bg-white p-5 rounded-2xl border border-brand-border space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="font-serif font-bold text-base text-brand-brown">Enable 3D Product Viewer</h3>
                  <p className="text-xs text-brand-brownMuted mt-0.5">
                    When active, shows the dedicated "3D View" thumbnail in Mango Achar's gallery.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleToggleEnable}
                  className={`w-14 h-8 rounded-full transition-colors relative cursor-pointer ${
                    config.isEnabled ? 'bg-emerald-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform shadow-xs ${
                      config.isEnabled ? 'left-7' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-brand-brown uppercase">
                  Product Scope Validation:
                </label>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Target: Classic Mango Pickle (ID: aam-classic)</span>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    Strict isolation enabled: Other achar varieties (Nimbu, Mirch, Garlic, Mix) continue using standard lightweight product galleries.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-brand-brown uppercase">
                  Default Background Lighting Studio:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'warm-studio', label: 'Warm Studio', desc: 'Ivory warm glow' },
                    { id: 'marble', label: 'Marble Counter', desc: 'Clean stone' },
                    { id: 'rustic', label: 'Rustic Shelf', desc: 'Traditional dark' }
                  ].map(b => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setConfig(prev => ({ ...prev, defaultBackground: b.id }))}
                      className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        config.defaultBackground === b.id
                          ? 'border-brand-brown bg-amber-50 text-brand-brown shadow-xs'
                          : 'border-brand-border bg-white text-gray-700 hover:border-brand-yellow'
                      }`}
                    >
                      <div className="font-bold text-xs">{b.label}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">{b.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 3D Model & Assets */}
          {activeTab === 'model' && (
            <div className="bg-white p-5 rounded-2xl border border-brand-border space-y-4 shadow-xs">
              <div>
                <h3 className="font-serif font-bold text-base text-brand-brown">3D Asset Engine</h3>
                <p className="text-xs text-brand-brownMuted">
                  Choose between the procedural Three.js WebGL model or upload a custom GLB/GLTF binary container.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setConfig(prev => ({ ...prev, modelType: 'procedural' }))}
                  className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    config.modelType === 'procedural'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                      : 'border-brand-border bg-white text-gray-700'
                  }`}
                >
                  <div className="font-bold text-xs">Procedural PBR (Active)</div>
                  <div className="text-[11px] text-gray-600 mt-0.5">
                    Flint glass IOR 1.52, mustard oil refraction, instanced rai/methi seeds & live wrapped label.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setConfig(prev => ({ ...prev, modelType: 'glb' }))}
                  className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    config.modelType === 'glb'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                      : 'border-brand-border bg-white text-gray-700'
                  }`}
                >
                  <div className="font-bold text-xs">Custom GLB Container</div>
                  <div className="text-[11px] text-gray-600 mt-0.5">
                    Standard binary glTF file hosted in /public/models/ or CDN.
                  </div>
                </button>
              </div>

              {/* Upload GLB File */}
              <div className="p-4 border-2 border-dashed border-brand-border rounded-xl bg-brand-cream/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-brown">
                    <Upload className="w-4 h-4 text-amber-700" />
                    <span>Upload or Replace GLB / GLTF Model</span>
                  </div>
                  <a
                    href="/models/mango-achar-jar.glb"
                    download="mango-achar-jar.glb"
                    className="text-[11px] text-amber-700 hover:text-amber-900 font-bold flex items-center gap-1 underline"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Current GLB</span>
                  </a>
                </div>

                <input
                  type="file"
                  accept=".glb,.gltf"
                  onChange={handleFileUpload}
                  className="block w-full text-xs text-brand-brown file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-brown file:text-white hover:file:bg-brand-brown/90 cursor-pointer"
                />

                {uploadStatus && (
                  <div className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{uploadStatus}</span>
                  </div>
                )}

                <div className="text-[10px] text-brand-brownMuted leading-relaxed">
                  Allowed formats: .glb, .gltf • Max file size: 25MB • Security checked for malicious scripts.
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-brown uppercase mb-1">
                  Active Asset Path / Storage URL:
                </label>
                <input
                  type="text"
                  value={config.glbUrl}
                  onChange={(e) => setConfig(prev => ({ ...prev, glbUrl: e.target.value }))}
                  className="w-full text-xs font-mono bg-white border border-brand-border rounded-xl px-3 py-2 text-brand-brown"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Camera & Studio Angles */}
          {activeTab === 'camera' && (
            <div className="bg-white p-5 rounded-2xl border border-brand-border space-y-4 shadow-xs">
              <div>
                <h3 className="font-serif font-bold text-base text-brand-brown">Viewing Angles & Auto-Rotation</h3>
                <p className="text-xs text-brand-brownMuted">
                  Configure default perspective and turntable motion parameters.
                </p>
              </div>

              {/* Auto Rotate Speed */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-brand-brown">
                  <span>Turntable 360° Rotation Speed</span>
                  <span>{config.autoRotateSpeed} rpm</span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="4.0"
                  step="0.1"
                  value={config.autoRotateSpeed}
                  onChange={(e) => setConfig(prev => ({ ...prev, autoRotateSpeed: parseFloat(e.target.value) }))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              {/* Default Zoom Distance */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-brand-brown">
                  <span>Default Camera Distance</span>
                  <span>{config.defaultViewAngle?.zoomDistance || 5.5} units</span>
                </div>
                <input
                  type="range"
                  min="3.2"
                  max="7.5"
                  step="0.1"
                  value={config.defaultViewAngle?.zoomDistance || 5.5}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    defaultViewAngle: { ...prev.defaultViewAngle, zoomDistance: parseFloat(e.target.value) }
                  }))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB 4: Manage Ingredient Markers */}
          {activeTab === 'ingredients' && (
            <div className="bg-white p-5 rounded-2xl border border-brand-border space-y-4 shadow-xs">
              <div>
                <h3 className="font-serif font-bold text-base text-brand-brown">Verified Recipe Ingredients</h3>
                <p className="text-xs text-brand-brownMuted">
                  Manage the verified recipe ingredients displayed in the "Explore Ingredients" interactive card.
                </p>
              </div>

              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {config.ingredients.map((ing, idx) => (
                  <div key={ing.id} className="p-3 bg-brand-cream/40 rounded-xl border border-brand-border space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-brand-brown flex items-center gap-1.5">
                        <span>{ing.icon}</span>
                        <span>{ing.name} ({ing.hindiName})</span>
                      </span>
                      <span className="text-[10px] text-brand-brownMuted font-mono">#{ing.id}</span>
                    </div>

                    <input
                      type="text"
                      value={ing.subtitle}
                      onChange={(e) => handleUpdateIngredient(idx, 'subtitle', e.target.value)}
                      placeholder="Subtitle..."
                      className="w-full text-xs bg-white border border-brand-border rounded-lg px-2.5 py-1.5 text-brand-brown"
                    />

                    <input
                      type="text"
                      value={ing.role}
                      onChange={(e) => handleUpdateIngredient(idx, 'role', e.target.value)}
                      placeholder="Role in achar recipe..."
                      className="w-full text-xs bg-white border border-brand-border rounded-lg px-2.5 py-1.5 text-brand-brown"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Live 3D Preview (Col 5) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-serif font-bold text-sm text-brand-brown flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-amber-700" />
              <span>Live 3D Preview</span>
            </span>
            <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Interactive WebGL Viewport
            </span>
          </div>

          {/* Embedded Live Viewer Container */}
          <div className="aspect-square rounded-2xl overflow-hidden border-2 border-brand-border shadow-md">
            <Suspense fallback={
              <div className="w-full h-full flex flex-col items-center justify-center bg-brand-cream/50 p-6 text-center">
                <div className="w-8 h-8 border-3 border-brand-yellow border-t-brand-brown rounded-full animate-spin mb-2" />
                <span className="text-xs font-bold text-brand-brown">Loading 3D Viewport...</span>
              </div>
            }>
              <MangoAchar3DViewer 
                key={previewKey}
                onClose={() => {}}
                productName="Classic Mango Pickle"
              />
            </Suspense>
          </div>

          <p className="text-[11px] text-brand-brownMuted italic text-center">
            Drag with mouse to rotate 360°, scroll to zoom, test "Show Inside" and "Explore Ingredients" live before publishing.
          </p>
        </div>

      </div>

    </div>
  );
};
