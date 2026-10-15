import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  AlertCircle,
  Play,
  Square,
} from 'lucide-react';
import { WaveformVisualizer } from '../components/common/WaveformVisualizer';

interface VoiceTranscriptItem {
  id: string;
  speaker: 'user' | 'zain';
  text: string;
  timestamp: string;
}

export const VoiceAssistantPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcripts, setTranscripts] = useState<VoiceTranscriptItem[]>([
    {
      id: 'init_v1',
      speaker: 'zain',
      text: 'Greetings! I am ZAIN AI, your real-time voice intelligence assistant. Press the microphone below and speak to ask any question or brainstorm ideas.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [statusMessage, setStatusMessage] = useState('Standby — Click "Start Speaking"');
  const [error, setError] = useState('');

  const recognitionRef = useRef<any>(null);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcripts]);

  // Handle Speech Synthesis
  const speakText = (text: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick modern natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google'))
    );
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleStartRecording = () => {
    setError('');
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback if browser doesn't have Web Speech API
      setError('Web Speech Recognition is not natively supported in this browser. You can test typing or use a Chromium browser.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
        setStatusMessage('Listening to your voice... Speak now.');
      };

      recognition.onresult = async (event: any) => {
        const spokenText = event.results[0][0].transcript;
        if (!spokenText.trim()) return;

        // Add user speech to transcript
        const userMsg: VoiceTranscriptItem = {
          id: `trans_${Date.now()}`,
          speaker: 'user',
          text: spokenText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setTranscripts((prev) => [...prev, userMsg]);
        setIsRecording(false);
        setStatusMessage('Processing speech with ZAIN AI Neural Engine...');

        // Call Gemini server-side API
        try {
          const res = await fetch('/api/gemini/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              messages: [{ role: 'user', content: spokenText }],
              systemPrompt:
                'You are ZAIN AI, an intelligent, concise, vocal voice assistant. Provide friendly, clear, direct answers suitable for being spoken aloud (under 3-4 sentences). Do not use markdown formatting or emojis in your vocal responses.',
            }),
          });

          const data = await res.json();
          const aiReply = data.reply || "I've processed your voice input successfully.";

          const aiMsg: VoiceTranscriptItem = {
            id: `trans_ai_${Date.now()}`,
            speaker: 'zain',
            text: aiReply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setTranscripts((prev) => [...prev, aiMsg]);
          setStatusMessage('ZAIN AI is speaking...');
          speakText(aiReply);
        } catch (err: any) {
          setError(err?.message || 'Failed to synthesize vocal reply.');
          setStatusMessage('Ready for next voice input.');
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        setStatusMessage('Microphone idle.');
        if (event.error === 'not-allowed') {
          setError('Microphone permission was denied. Please allow microphone access in your browser.');
        } else {
          setError(`Voice input error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e: any) {
      setError(e?.message || 'Could not start microphone.');
      setIsRecording(false);
    }
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    setStatusMessage('Microphone paused.');
  };

  const handleSimulateVoicePrompt = async (samplePrompt: string) => {
    window.speechSynthesis?.cancel();
    const userMsg: VoiceTranscriptItem = {
      id: `trans_${Date.now()}`,
      speaker: 'user',
      text: samplePrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setTranscripts((prev) => [...prev, userMsg]);
    setStatusMessage('Synthesizing answer with Gemini...');

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: samplePrompt }],
          systemPrompt:
            'You are ZAIN AI, an intelligent vocal voice assistant. Provide friendly, clear, direct answers suitable for speech (under 3 sentences). Avoid markdown syntax.',
        }),
      });

      const data = await res.json();
      const aiReply = data.reply || 'Here is your simulated voice response.';

      const aiMsg: VoiceTranscriptItem = {
        id: `trans_ai_${Date.now()}`,
        speaker: 'zain',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setTranscripts((prev) => [...prev, aiMsg]);
      setStatusMessage('ZAIN AI voice playback...');
      speakText(aiReply);
    } catch (err: any) {
      setError(err?.message || 'Failed to get voice reply.');
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-teal-950 text-teal-400 border border-teal-800 uppercase">
              Feature Four
            </span>
            <span className="text-xs text-slate-400">Interactive Vocal Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">ZAIN AI Voice Assistant</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time speech recognition, animated audio waveform, and instant neural voice replies.
          </p>
        </div>

        {/* Audio Mute toggle */}
        <button
          onClick={() => {
            const nextMuted = !isMuted;
            setIsMuted(nextMuted);
            if (nextMuted) window.speechSynthesis?.cancel();
          }}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
            isMuted
              ? 'bg-rose-950/60 text-rose-300 border-rose-800'
              : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
          }`}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          <span>{isMuted ? 'Audio Output Muted' : 'Sound Enabled'}</span>
        </button>
      </div>

      {/* Main Interactive Waveform Orb Section */}
      <div className="relative rounded-3xl p-8 bg-gradient-to-b from-[#0c1630] via-[#091024] to-[#070b16] border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 text-center overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-6">
          {/* Status pill */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-semibold">
            <span
              className={`w-2 h-2 rounded-full ${
                isRecording
                  ? 'bg-rose-500 animate-ping'
                  : isSpeaking
                  ? 'bg-cyan-400 animate-pulse'
                  : 'bg-emerald-400'
              }`}
            />
            <span className="text-slate-300">{statusMessage}</span>
          </div>

          {/* Animated Waveform Visualizer */}
          <div className="py-2">
            <WaveformVisualizer isActive={isRecording} isSpeaking={isSpeaking} />
          </div>

          {/* Controls: Start/Stop Mic */}
          <div className="flex items-center justify-center space-x-4">
            {!isRecording ? (
              <button
                onClick={handleStartRecording}
                className="px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:opacity-95 shadow-xl shadow-cyan-500/30 transition-all transform hover:scale-105 flex items-center space-x-3"
              >
                <Mic className="w-5 h-5 text-white animate-pulse" />
                <span>Start Speaking to ZAIN AI</span>
              </button>
            ) : (
              <button
                onClick={handleStopRecording}
                className="px-8 py-4 rounded-2xl font-bold text-sm text-white bg-rose-600 hover:bg-rose-700 shadow-xl shadow-rose-600/30 transition-all flex items-center space-x-3"
              >
                <Square className="w-5 h-5 fill-white" />
                <span>Stop Listening</span>
              </button>
            )}
          </div>

          {/* Quick Voice Prompt presets */}
          <div className="pt-4 border-t border-slate-800/80">
            <span className="text-xs text-slate-400 font-medium mr-2">Or test with voice simulation:</span>
            <div className="inline-flex flex-wrap justify-center gap-2 mt-2">
              {[
                'Tell me about ZAIN TECH in 2 sentences',
                'What are the advantages of modern C++?',
                'Explain how neural networks learn',
              ].map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSimulateVoicePrompt(q)}
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  "{q}"
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Transcript Log */}
      <div className="p-6 rounded-3xl bg-[#090f20] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Live Voice Transcript History
          </h3>
          <span className="text-xs text-slate-400 font-mono">{transcripts.length} entries</span>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {transcripts.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                item.speaker === 'user'
                  ? 'bg-slate-900 border border-slate-800 ml-8 text-slate-200'
                  : 'bg-cyan-950/40 border border-cyan-800/60 mr-8 text-cyan-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1 text-[11px] font-bold">
                <span className={item.speaker === 'user' ? 'text-slate-400' : 'text-cyan-400 font-mono'}>
                  {item.speaker === 'user' ? 'You' : 'ZAIN AI'}
                </span>
                <span className="text-slate-500 font-normal">{item.timestamp}</span>
              </div>
              <p>{item.text}</p>
            </div>
          ))}
          <div ref={transcriptEndRef} />
        </div>
      </div>
    </div>
  );
};
