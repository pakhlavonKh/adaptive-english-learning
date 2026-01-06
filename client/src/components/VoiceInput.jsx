import React, { useEffect } from 'react';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import { Mic, MicOff, AlertCircle, Check } from 'lucide-react';

/**
 * Voice Input Component for Speaking Module
 * FR23: Accept and analyze voice input for speaking skills
 */
export default function VoiceInput({ onTranscriptChange, autoSubmit = false, placeholder = "Click the microphone to start speaking..." }) {
  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition();

  useEffect(() => {
    // Update parent component with transcript
    if (onTranscriptChange) {
      onTranscriptChange(transcript);
    }

    // Auto-submit when user stops speaking (optional)
    if (autoSubmit && transcript && !isListening && !interimTranscript) {
      // Transcript is final and listening stopped
    }
  }, [transcript, isListening, interimTranscript, onTranscriptChange, autoSubmit]);

  const handleToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleReset = () => {
    resetTranscript();
    if (onTranscriptChange) {
      onTranscriptChange('');
    }
  };

  if (!isSupported) {
    return (
      <div style={styles.unsupportedContainer}>
        <AlertCircle size={24} color="#e74c3c" />
        <p style={styles.errorText}>
          Speech recognition is not supported in this browser.
          <br />
          Please use Chrome, Edge, or Safari for voice input.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Microphone Button */}
      <div style={styles.controlsContainer}>
        <button
          type="button"
          onClick={handleToggle}
          style={{
            ...styles.micButton,
            ...(isListening ? styles.micButtonActive : {}),
          }}
          title={isListening ? 'Stop recording' : 'Start recording'}
        >
          {isListening ? (
            <>
              <MicOff size={32} />
              <span style={styles.buttonText}>Stop</span>
            </>
          ) : (
            <>
              <Mic size={32} />
              <span style={styles.buttonText}>Speak</span>
            </>
          )}
        </button>

        {transcript && (
          <button
            type="button"
            onClick={handleReset}
            style={styles.resetButton}
            title="Clear transcript"
          >
            Clear
          </button>
        )}
      </div>

      {/* Status Indicator */}
      {isListening && (
        <div style={styles.listeningIndicator}>
          <div style={styles.pulse}></div>
          <span style={styles.listeningText}>Listening...</span>
        </div>
      )}

      {/* Transcript Display */}
      <div style={styles.transcriptContainer}>
        {transcript || interimTranscript ? (
          <>
            <div style={styles.finalTranscript}>
              {transcript}
              {interimTranscript && (
                <span style={styles.interimTranscript}>{interimTranscript}</span>
              )}
            </div>
            {transcript && !isListening && (
              <div style={styles.completeBadge}>
                <Check size={16} />
                <span>Recording complete</span>
              </div>
            )}
          </>
        ) : (
          <p style={styles.placeholder}>{placeholder}</p>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div style={styles.errorContainer}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Instructions */}
      <div style={styles.instructions}>
        <p style={styles.instructionText}>
          💡 <strong>Tip:</strong> Speak clearly and at a normal pace. Click "Stop" when finished.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    border: '2px solid #e0e0e0',
  },
  controlsContainer: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  micButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '20px 40px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  },
  micButtonActive: {
    background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
    boxShadow: '0 4px 20px rgba(231, 76, 60, 0.4)',
    animation: 'pulse 1.5s infinite',
  },
  buttonText: {
    fontSize: '14px',
    fontWeight: '600',
  },
  resetButton: {
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#666',
    background: 'white',
    border: '2px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  listeningIndicator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '16px',
    padding: '12px',
    background: '#fee',
    borderRadius: '8px',
  },
  pulse: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: '#e74c3c',
    animation: 'pulse 1.5s infinite',
  },
  listeningText: {
    color: '#e74c3c',
    fontWeight: '600',
    fontSize: '14px',
  },
  transcriptContainer: {
    minHeight: '100px',
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '2px solid #e0e0e0',
    marginBottom: '12px',
  },
  finalTranscript: {
    fontSize: '16px',
    color: '#333',
    lineHeight: '1.6',
  },
  interimTranscript: {
    color: '#999',
    fontStyle: 'italic',
  },
  placeholder: {
    color: '#999',
    textAlign: 'center',
    margin: 0,
  },
  completeBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '12px',
    padding: '6px 12px',
    background: '#d4edda',
    color: '#155724',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px',
    background: '#fee',
    border: '1px solid #fcc',
    borderRadius: '8px',
    color: '#c00',
    fontSize: '14px',
    marginBottom: '12px',
  },
  unsupportedContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '24px',
    background: '#fff3cd',
    border: '2px solid #ffc107',
    borderRadius: '12px',
    textAlign: 'center',
  },
  errorText: {
    color: '#856404',
    fontSize: '14px',
    margin: 0,
  },
  instructions: {
    padding: '12px',
    background: '#e3f2fd',
    borderRadius: '8px',
    borderLeft: '4px solid #2196f3',
  },
  instructionText: {
    margin: 0,
    fontSize: '13px',
    color: '#1565c0',
  },
};
