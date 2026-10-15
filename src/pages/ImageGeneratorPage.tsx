import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Sparkles,
  Download,
  Trash2,
  Maximize2,
  X,
  RefreshCw,
  AlertCircle,
  BookmarkPlus,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ImageGeneratorPage: React.FC = () => {
  const { generatedImages, saveImageItem, deleteImageItem } = useApp();

  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Realistic');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const styles = [
    'Realistic',
    'Anime',
    '3D Render',
    'Digital Art',
    'Cinematic',
    'Cartoon',
    'Logo Concept',
  ];

  const aspectRatios = [
    { label: 'Square (1:1)', val: '1:1' },
    { label: 'Landscape (16:9)', val: '16:9' },
    { label: 'Portrait (9:16)', val: '9:16' },
    { label: 'Standard (4:3)', val: '4:3' },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please provide a prompt describing your image.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          style,
          aspectRatio,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate image.');
      }

      if (data.imageUrl) {
        saveImageItem({
          prompt,
          style,
          aspectRatio,
          imageUrl: data.imageUrl,
        });
      }
    } catch (err: any) {
      setError(err?.message || 'Error generating image.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (imageUrl: string, promptText: string) => {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `zain_${promptText.slice(0, 20).replace(/\s+/g, '_')}_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const promptIdeas = [
    'Futuristic cybernetic city floating in the clouds with glowing neon cyan bridges',
    'Photorealistic portrait of an AI researcher working in a quantum computing lab',
    '3D isometric render of a glass neural network server stack with liquid cooling',
    'Minimalist geometric logo for a next-generation AI robotics startup',
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-400 border border-indigo-800 uppercase">
              Feature Three
            </span>
            <span className="text-xs text-slate-400">Photorealistic & Vector Generation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">AI Image Studio</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Render high-fidelity artwork, photorealistic scenes, 3D renders, and logos from natural language.
          </p>
        </div>
      </div>

      {/* Generation Control Panel */}
      <div className="p-6 rounded-3xl bg-[#090f20] border border-slate-800 space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Prompt Description
          </label>
          <div className="relative">
            <textarea
              rows={3}
              placeholder="Describe your scene in rich detail (e.g., 'An intricate holographic neural core floating over a cyberpunk cityscape at dusk...')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-4 rounded-2xl bg-[#060a14] border border-slate-700/80 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Quick inspiration pills */}
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-[11px] text-slate-500 self-center">Try:</span>
            {promptIdeas.map((idea, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPrompt(idea)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-400 hover:text-cyan-300 transition-colors truncate max-w-xs"
              >
                {idea}
              </button>
            ))}
          </div>
        </div>

        {/* Style & Aspect Ratio Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Style */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Visual Aesthetic Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {styles.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStyle(s)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    style === s
                      ? 'bg-indigo-950 text-indigo-300 border-indigo-500/80 shadow-md'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Aspect Ratio
            </label>
            <div className="grid grid-cols-2 gap-2">
              {aspectRatios.map((ar) => (
                <button
                  key={ar.val}
                  type="button"
                  onClick={() => setAspectRatio(ar.val)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    aspectRatio === ar.val
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-500/80 shadow-md'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {ar.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-indigo-500 via-blue-600 to-cyan-500 hover:opacity-90 shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Synthesizing High-Resolution Scene...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate AI Image Artwork</span>
            </>
          )}
        </button>
      </div>

      {/* Gallery Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Your Generated Image Gallery ({generatedImages.length})
          </h2>
          <span className="text-xs text-slate-400">Stored in persistent gallery</span>
        </div>

        {generatedImages.length === 0 ? (
          <div className="py-16 text-center rounded-3xl bg-[#090f20] border border-slate-800 p-8 text-slate-500 space-y-2">
            <ImageIcon className="w-10 h-10 mx-auto text-slate-600" />
            <div className="font-semibold text-slate-300 text-sm">Gallery Empty</div>
            <p className="text-xs max-w-sm mx-auto">
              Generate your first image above to build your personal visual collection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedImages.map((img) => (
              <div
                key={img.id}
                className="group relative rounded-2xl overflow-hidden bg-[#090f20] border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between"
              >
                {/* Image Display */}
                <div className="relative aspect-video bg-black/60 overflow-hidden">
                  <img
                    src={img.imageUrl}
                    alt={img.prompt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => setLightboxImage(img.imageUrl)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Fullscreen Preview"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card Meta & Actions */}
                <div className="p-4 space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono mb-1">
                      <span>{img.style}</span>
                      <span>{img.aspectRatio}</span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2">{img.prompt}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <button
                      onClick={() => handleDownload(img.imageUrl, img.prompt)}
                      className="flex items-center space-x-1 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => deleteImageItem(img.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors"
                      title="Delete Image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden border border-cyan-500/40 bg-black shadow-2xl"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={lightboxImage} alt="Fullscreen preview" className="w-full h-auto object-contain max-h-[85vh]" />
          </div>
        </div>
      )}
    </div>
  );
};
