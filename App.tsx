import React, { useState, useCallback, useEffect, useRef } from 'react';

// --- Icons ---
const DownloadIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const SpeakerIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
    </svg>
);

const UploadIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
    </svg>
);

const ResetIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.664 0l3.181-3.183m-3.181-4.991-3.182-3.182a8.25 8.25 0 0 0-11.664 0l-3.182 3.182" />
    </svg>
);

const RetryIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.664 0l3.181-3.183m-3.181-4.991-3.182-3.182a8.25 8.25 0 0 0-11.664 0l-3.182 3.182" />
    </svg>
);

const ZipIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
);

const PlayIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
  </svg>
);

const StopIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
  </svg>
);

const PauseIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
  </svg>
);

// --- Loader ---
const Loader: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    className={`animate-spin ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

// --- Services ---
const generateVoiceover = async (text: string): Promise<string> => {
  const { GoogleGenAI, Modality } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const prompt = `Say the following in a clear, standard Indian accent for an educational setting: "${text}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      throw new Error("Failed to generate audio. The API did not return any audio data.");
    }
    
    return base64Audio;
  } catch (error) {
    console.error("Error generating voiceover:", error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid') || error.message.includes('permission')) {
             return Promise.reject(new Error(`Authentication error: Please check your API key.`));
        }
        return Promise.reject(new Error(`Failed to generate voiceover: ${error.message}`));
    }
    return Promise.reject(new Error("An unknown error occurred while generating the voiceover."));
  }
};


declare global {
  interface Window {
    lamejs: {
      Mp3Encoder: new (channels: number, sampleRate: number, bitRate: number) => {
        encodeBuffer: (buffer: Int16Array) => Uint8Array;
        flush: () => Uint8Array;
      };
    };
    XLSX: any;
    JSZip: any;
  }
}

type AppStep = 'upload' | 'columns' | 'processing';

interface ResultItem {
  id: number;
  text: string;
  filename: string;
  status: 'pending' | 'processing' | 'done' | 'error';
  audioUrl?: string;
  error?: string;
}

const base64ToMp3BlobUrl = (base64: string): string => {
  const byteCharacters = atob(base64);
  const pcmBytes = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    pcmBytes[i] = byteCharacters.charCodeAt(i);
  }
  const pcmData = new Int16Array(pcmBytes.buffer);
  const encoder = new window.lamejs.Mp3Encoder(1, 24000, 128);
  const mp3Data: Uint8Array[] = [];
  const sampleBlockSize = 1152;
  for (let i = 0; i < pcmData.length; i += sampleBlockSize) {
    const sampleChunk = pcmData.subarray(i, i + sampleBlockSize);
    const mp3buf = encoder.encodeBuffer(sampleChunk);
    if (mp3buf.length > 0) mp3Data.push(mp3buf);
  }
  const mp3buf = encoder.flush();
  if (mp3buf.length > 0) mp3Data.push(mp3buf);
  const blob = new Blob(mp3Data, { type: 'audio/mp3' });
  return URL.createObjectURL(blob);
};

const sanitizeFilename = (name: string) => {
  return name.replace(/[^a-z0-9_.-]/gi, '_').replace(/_{2,}/g, '_');
};

const StatCard: React.FC<{ label: string; value: number; color?: string }> = ({ label, value, color = "indigo" }) => (
    <div className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center`}>
        <span className={`text-3xl font-bold text-${color}-600`}>{value}</span>
        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium mt-1">{label}</span>
    </div>
);

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('upload');
  const [fileData, setFileData] = useState<{ headers: string[]; rows: string[][] } | null>(null);
  const [textColumn, setTextColumn] = useState<string>('');
  const [filenameColumn, setFilenameColumn] = useState<string>('');
  const [concurrency, setConcurrency] = useState<number>(5);
  
  // Batch selection state
  const [startRow, setStartRow] = useState<number>(1);
  const [batchSize, setBatchSize] = useState<number>(0);

  const [results, setResults] = useState<ResultItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState(false);
  const [isProcessingPaused, setIsProcessingPaused] = useState(false);
  
  // Audio Preview State
  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    try {
      const data = await file.arrayBuffer();
      const workbook = window.XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json: (string | number)[][] = window.XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (json.length < 1) {
         throw new Error("Excel file is empty or the first sheet has no data.");
      }

      const headers = json[0].map(String);
      const rows = json.slice(1).map(row => row.map(String));
      
      if (headers.length < 1) {
        throw new Error("File must have a header row.");
      }
      setFileData({ headers, rows });
      setTextColumn(headers[0] || '');
      setFilenameColumn(headers[0] || '');
      setStartRow(1);
      setBatchSize(rows.length);
      setStep('columns');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to read or parse Excel file.");
      setStep('upload');
    }
  };

  const processItem = async (item: ResultItem) => {
      if (!item.text.trim()) {
        setResults(prev => prev.map(r => r.id === item.id ? { ...r, status: 'error', error: 'Empty text field' } : r));
        return;
      }
      
      try {
        const base64Audio = await generateVoiceover(item.text);
        const url = base64ToMp3BlobUrl(base64Audio);
        setResults(prev => prev.map(r => r.id === item.id ? { ...r, status: 'done', audioUrl: url, error: undefined } : r));
      } catch (err) {
        setResults(prev => prev.map(r => r.id === item.id ? { ...r, status: 'error', error: err instanceof Error ? err.message : 'Unknown error' } : r));
      }
  }

  const startProcessing = useCallback(() => {
    if (!fileData || !textColumn || !filenameColumn) return;

    const textColIndex = fileData.headers.indexOf(textColumn);
    const filenameColIndex = fileData.headers.indexOf(filenameColumn);

    if (textColIndex === -1 || filenameColIndex === -1) {
      setError("Invalid column selection.");
      setStep('columns');
      return;
    }

    // Calculate range
    const start = Math.max(0, startRow - 1);
    const count = batchSize > 0 ? batchSize : fileData.rows.length - start;
    const end = Math.min(fileData.rows.length, start + count);
    const rowsToProcess = fileData.rows.slice(start, end);

    if (rowsToProcess.length === 0) {
        setError("Selected range is invalid or empty.");
        return;
    }

    // Initialize rows for processing
    const initialResults: ResultItem[] = rowsToProcess.map((row, index) => ({
      id: start + index, // Use absolute index as ID
      text: row[textColIndex] || '',
      filename: sanitizeFilename(row[filenameColIndex] || `audio_${start + index + 1}`),
      status: 'pending',
    }));
    
    setResults(initialResults);
    setStep('processing');
    setIsProcessingPaused(false);
  }, [fileData, textColumn, filenameColumn, startRow, batchSize]);

  // Queue Management Effect
  useEffect(() => {
    if (step !== 'processing' || isProcessingPaused) return;

    const processingCount = results.filter(r => r.status === 'processing').length;
    const pendingItems = results.filter(r => r.status === 'pending');

    if (processingCount < concurrency && pendingItems.length > 0) {
        const slotsAvailable = concurrency - processingCount;
        const itemsToProcess = pendingItems.slice(0, slotsAvailable);

        setResults(prev => prev.map(r => 
            itemsToProcess.find(i => i.id === r.id) 
                ? { ...r, status: 'processing' } 
                : r
        ));

        itemsToProcess.forEach(item => processItem(item));
    }
  }, [results, step, isProcessingPaused, concurrency]);

  const retryIndividual = async (itemId: number) => {
    const itemToRetry = results.find(r => r.id === itemId);
    if(itemToRetry) {
        // Clear previous URL if it exists to free memory and update UI
        if (itemToRetry.audioUrl) {
            URL.revokeObjectURL(itemToRetry.audioUrl);
        }
        setResults(prev => prev.map(r => r.id === itemId ? { ...r, status: 'processing', error: undefined, audioUrl: undefined } : r));
        await processItem(itemToRetry);
    }
  }

  const handleDownloadZip = async () => {
      setIsZipping(true);
      const zip = new window.JSZip();
      const successfulResults = results.filter(r => r.status === 'done' && r.audioUrl);

      for(const item of successfulResults){
          try {
              const response = await fetch(item.audioUrl!);
              const blob = await response.blob();
              zip.file(`${item.filename}.mp3`, blob);
          } catch(e) {
              console.error(`Failed to fetch blob for ${item.filename}`, e);
          }
      }
      
      zip.generateAsync({ type: "blob" }).then((content: Blob) => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(content);
          link.download = `voiceovers_${startRow}_to_${startRow + successfulResults.length - 1}.zip`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);
          setIsZipping(false);
      });
  }

  const handleReset = () => {
    setStep('upload');
    setFileData(null);
    setTextColumn('');
    setFilenameColumn('');
    setResults([]);
    setError(null);
    setIsProcessingPaused(false);
    setStartRow(1);
    setBatchSize(0);
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
    }
    setPlayingId(null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  };

  const handlePreview = (item: ResultItem) => {
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
    }
    
    if (playingId === item.id) {
        setPlayingId(null);
        return;
    }

    if (item.audioUrl) {
        const audio = new Audio(item.audioUrl);
        audioRef.current = audio;
        setPlayingId(item.id);
        audio.play().catch(e => console.error("Audio play error", e));
        audio.onended = () => setPlayingId(null);
        audio.onerror = () => setPlayingId(null);
    }
  };

  // Helper to get filename for preview in columns step
  const getPreviewFilename = (rowIndex: number) => {
    if (!fileData || !filenameColumn) return '';
    const colIndex = fileData.headers.indexOf(filenameColumn);
    if (colIndex === -1) return '';
    const row = fileData.rows[rowIndex];
    if (!row) return '';
    return row[colIndex];
  };

  const renderContent = () => {
    switch (step) {
      case 'upload':
        return (
          <div className="text-center py-12">
            <label htmlFor="file-upload" className="cursor-pointer inline-flex flex-col items-center justify-center gap-4 bg-gray-50 border-2 border-dashed border-indigo-300 hover:border-indigo-500 text-gray-600 py-12 px-16 rounded-2xl transition-all duration-200 w-full">
              <div className="bg-indigo-100 p-4 rounded-full text-indigo-600">
                 <UploadIcon className="w-8 h-8" />
              </div>
              <span className="font-semibold text-lg">Click to Upload Excel File</span>
              <span className="text-sm text-gray-400">.xlsx or .xls files supported</span>
            </label>
            <input id="file-upload" type="file" accept=".xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" className="hidden" onChange={handleFileChange} />
          </div>
        );
      case 'columns':
        if (!fileData) return null;
        const maxRows = fileData.rows.length;
        const previewName = getPreviewFilename(startRow - 1);
        
        return (
          <div>
            <h2 className="text-xl font-semibold text-center mb-8">Setup Generation</h2>
            <div className="bg-gray-50 p-6 rounded-xl mb-8 space-y-6">
                {/* Column Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="text-column" className="block text-sm font-bold text-gray-700 mb-2">Text Column</label>
                        <select id="text-column" value={textColumn} onChange={e => setTextColumn(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
                        {fileData.headers.map(h => <option key={`text-${h}`} value={h}>{h}</option>)}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Column containing the text to speak.</p>
                    </div>
                    <div>
                        <label htmlFor="filename-column" className="block text-sm font-bold text-gray-700 mb-2">Filename Column</label>
                        <select id="filename-column" value={filenameColumn} onChange={e => setFilenameColumn(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
                        {fileData.headers.map(h => <option key={`file-${h}`} value={h}>{h}</option>)}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Column used to name the MP3 files.</p>
                    </div>
                </div>
                
                <div className="border-t border-gray-200 my-4"></div>

                {/* Range & Concurrency Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <label htmlFor="start-row" className="block text-sm font-bold text-gray-700 mb-2">Start Row</label>
                        <input 
                            id="start-row" 
                            type="number" 
                            min="1" 
                            max={maxRows} 
                            value={startRow} 
                            onChange={e => {
                                const val = Math.max(1, Math.min(maxRows, Number(e.target.value)));
                                setStartRow(val);
                                // Adjust batch size if it exceeds remaining
                                const remaining = maxRows - val + 1;
                                if (batchSize > remaining) setBatchSize(remaining);
                            }}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" 
                        />
                        <p className="text-xs text-gray-500 mt-1 truncate">
                            File at row {startRow}: <span className="font-medium text-indigo-600">{previewName || '(select filename col)'}</span>
                        </p>
                    </div>
                    
                    <div className="md:col-span-1">
                        <label htmlFor="batch-size" className="block text-sm font-bold text-gray-700 mb-2">Quantity</label>
                        <input 
                            id="batch-size" 
                            type="number" 
                            min="1" 
                            max={maxRows - startRow + 1}
                            value={batchSize} 
                            onChange={e => setBatchSize(Number(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" 
                        />
                         <p className="text-xs text-gray-500 mt-1">
                            Processing rows {startRow} to {startRow + batchSize - 1}
                        </p>
                    </div>

                    <div className="md:col-span-1">
                        <label htmlFor="concurrency" className="block text-sm font-bold text-gray-700 mb-2">Concurrency</label>
                        <select id="concurrency" value={concurrency} onChange={e => setConcurrency(Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
                        <option value={1}>1 (Slowest, Safest)</option>
                        <option value={3}>3 (Balanced)</option>
                        <option value={5}>5 (Fast)</option>
                        <option value={10}>10 (Turbo)</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Parallel generations.</p>
                    </div>
                </div>
            </div>
            <button onClick={startProcessing} className="w-full bg-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Start Batch ({batchSize} items)
            </button>
          </div>
        );
      case 'processing':
        const total = results.length;
        const completed = results.filter(r => r.status === 'done').length;
        const processing = results.filter(r => r.status === 'processing').length;
        const errors = results.filter(r => r.status === 'error').length;
        const pending = results.filter(r => r.status === 'pending').length;

        return (
          <div>
            {/* Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <StatCard label="Batch Total" value={total} color="gray" />
                <StatCard label="Pending" value={pending} color="yellow" />
                <StatCard label="Processing" value={processing} color="indigo" />
                <StatCard label="Completed" value={completed} color="green" />
                <StatCard label="Errors" value={errors} color="red" />
            </div>

            <div className="flex justify-between items-center mb-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
                 <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsProcessingPaused(!isProcessingPaused)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${isProcessingPaused ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}
                    >
                        {isProcessingPaused ? <PlayIcon className="w-4 h-4"/> : <PauseIcon className="w-4 h-4"/>}
                        {isProcessingPaused ? "Resume" : "Pause"}
                    </button>
                    <span className="text-sm text-gray-500 hidden md:inline">
                        {isProcessingPaused ? "Queue is paused." : `Processing...`}
                    </span>
                 </div>

                <button 
                  onClick={handleDownloadZip} 
                  disabled={completed === 0 || isZipping}
                  className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed shadow-sm">
                  {isZipping ? <Loader className="w-5 h-5"/> : <ZipIcon className="w-5 h-5" />}
                  {isZipping ? 'Compressing...' : `Download ZIP (${completed})`}
                </button>
            </div>

            <div className="border rounded-xl overflow-hidden shadow-sm bg-white flex flex-col max-h-[500px]">
              <div className="overflow-y-auto flex-grow">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0 z-10">
                    <tr>
                        <th scope="col" className="px-6 py-3 w-16">Row</th>
                        <th scope="col" className="px-6 py-3 w-1/3">Text Segment</th>
                        <th scope="col" className="px-6 py-3 w-1/4">Filename</th>
                        <th scope="col" className="px-6 py-3 text-center">Status</th>
                        <th scope="col" className="px-6 py-3 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {results.map(item => (
                        <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${item.status === 'processing' ? 'bg-indigo-50/30' : ''}`}>
                        <td className="px-6 py-4 font-mono text-xs text-gray-400">#{item.id + 1}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                             <div className="truncate max-w-xs" title={item.text}>{item.text}</div>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-gray-600">{item.filename}.mp3</td>
                        <td className="px-6 py-4 text-center">
                            {item.status === 'pending' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Queued</span>}
                            {item.status === 'processing' && <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"><Loader className="w-3 h-3"/> Generating</span>}
                            {item.status === 'done' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Ready</span>}
                            {item.status === 'error' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800" title={item.error}>Failed</span>}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                            {item.status === 'done' && item.audioUrl ? (
                            <>
                                <button 
                                    onClick={() => handlePreview(item)}
                                    className={`inline-flex items-center justify-center p-2 rounded-full transition-colors ${playingId === item.id ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                    title="Preview Audio"
                                >
                                    {playingId === item.id ? <StopIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
                                </button>
                                <button 
                                    onClick={() => retryIndividual(item.id)}
                                    className="inline-flex items-center justify-center p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                    title="Regenerate"
                                >
                                    <RetryIcon className="w-4 h-4" />
                                </button>
                                <a href={item.audioUrl} download={`${item.filename}.mp3`} className="inline-flex items-center justify-center p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors" title="Download Single File">
                                <DownloadIcon className="w-4 h-4" />
                                </a>
                            </>
                            ) : item.status === 'error' ? (
                            <button onClick={() => retryIndividual(item.id)} className="inline-flex items-center justify-center gap-1 text-xs bg-white border border-red-200 text-red-600 font-medium py-1 px-3 rounded hover:bg-red-50 transition-colors">
                                <RetryIcon className="w-3 h-3" /> Retry
                            </button>
                            ) : (
                            <span className="text-xs text-gray-300 italic">Wait...</span>
                            )}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans text-gray-800 flex items-center justify-center p-4">
      <main className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between bg-white">
             <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-3 rounded-xl shadow-md">
                    <SpeakerIcon className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">AI Voiceover Studio</h1>
                    <p className="text-sm text-gray-500">Bulk Audio Generation</p>
                </div>
            </div>
            <button onClick={handleReset} className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50">
                <ResetIcon className="w-4 h-4"/>
                New Project
            </button>
        </div>

        <div className="p-6 md:p-8 bg-white min-h-[400px]">
            {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-start gap-3" role="alert">
                <div className="mt-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg></div>
                <p className="text-sm font-medium">{error}</p>
            </div>
            )}
            
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;