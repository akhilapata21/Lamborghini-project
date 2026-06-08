import React, { useState, useEffect, useRef } from 'react';

export default function IntroLoader({ onLaunch }) {
  const [status, setStatus] = useState("SYSTEMS OFFLINE");
  const [rpm, setRpm] = useState(0);
  const [logs, setLogs] = useState([{ text: "STANDBY: SECURE IGNITION TRIGGER", type: "info" }]);
  const [igniting, setIgniting] = useState(false);
  const [launched, setLaunched] = useState(false);
  const [disabled, setDisabled] = useState(false);
  
  const logsContainerRef = useRef(null);

  const addLog = (text, type = "") => {
    setLogs((prev) => [...prev, { text, type }]);
  };

  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Web Audio V12 Engine Start sound synthesizer
  const playEngineStartSound = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    
    // Create base oscillators for engine cylinders
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const noiseNode = ctx.createBufferSource();
    
    // Gain nodes
    const engineGain = ctx.createGain();
    const starterGain = ctx.createGain();
    const masterGain = ctx.createGain();
    
    // Filter
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    
    // Setup starter clicking noise
    const bufferSize = ctx.sampleRate * 0.8; // 0.8s of noise
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    noiseNode.buffer = buffer;
    
    // Modulate noise to sound like starter click-click-click
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 1000;
    noiseFilter.Q.value = 4;
    
    const noiseAmp = ctx.createGain();
    // pulsing the starter click
    for (let t = 0; t < 0.6; t += 0.08) {
      noiseAmp.gain.setValueAtTime(0.35, now + t);
      noiseAmp.gain.exponentialRampToValueAtTime(0.01, now + t + 0.05);
    }
    noiseAmp.gain.setValueAtTime(0, now + 0.7);
    
    noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseAmp);
    noiseAmp.connect(starterGain);
    
    // Setup V12 cylinders: sawtooth + triangle wave with detuning
    osc1.type = "sawtooth";
    osc2.type = "triangle";
    
    // Frequency sweeps representing engine RPM
    osc1.frequency.setValueAtTime(30, now);
    osc2.frequency.setValueAtTime(15, now);
    
    // Crank-start ignition phase (0.7s to 1.1s) -> burst! RPM shoots to peak
    osc1.frequency.exponentialRampToValueAtTime(320, now + 1.0);
    osc2.frequency.exponentialRampToValueAtTime(160, now + 1.0);
    
    // Throttle decel to warm rumble idle phase (1.1s to 2.8s) -> RPM drops back down
    osc1.frequency.exponentialRampToValueAtTime(65, now + 2.4);
    osc2.frequency.exponentialRampToValueAtTime(32, now + 2.4);
    
    // Filter sweep matching the RPM curve
    filter.frequency.setValueAtTime(120, now);
    filter.frequency.exponentialRampToValueAtTime(850, now + 1.0);
    filter.frequency.exponentialRampToValueAtTime(180, now + 2.4);
    
    // Gain sweeps
    engineGain.gain.setValueAtTime(0.0, now);
    engineGain.gain.setValueAtTime(0.01, now + 0.68);
    engineGain.gain.exponentialRampToValueAtTime(0.85, now + 0.85); // roar!
    engineGain.gain.linearRampToValueAtTime(0.35, now + 1.8);       // decay to idle
    engineGain.gain.linearRampToValueAtTime(0.0, now + 2.9);        // fade out
    
    starterGain.gain.setValueAtTime(0.65, now);
    starterGain.gain.linearRampToValueAtTime(0.0, now + 0.75);
    
    // LFO to modulate cylinder firing (tremolo/rumble feel)
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 35; // speed of rumble
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.28;
    
    lfo.connect(lfoGain);
    lfoGain.connect(engineGain.gain);
    
    // Connection tree
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(engineGain);
    
    engineGain.connect(masterGain);
    starterGain.connect(masterGain);
    masterGain.connect(ctx.destination);
    
    // Master volume control
    masterGain.gain.setValueAtTime(0.6, now);
    masterGain.gain.exponentialRampToValueAtTime(0.6, now + 2.5);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 3.0); // smooth fade out
    
    // Play nodes
    osc1.start(now);
    osc2.start(now);
    noiseNode.start(now);
    lfo.start(now);
    
    osc1.stop(now + 3.1);
    osc2.stop(now + 3.1);
    noiseNode.stop(now + 3.1);
    lfo.stop(now + 3.1);
  };

  const handleIgnition = () => {
    if (disabled) return;
    setDisabled(true);
    setIgniting(true);

    // Play synthesized sound
    try {
      playEngineStartSound();
    } catch (e) {
      console.error("Audio Synthesis error: ", e);
    }

    // Phase 1: Starter Crank (0.0s - 0.7s)
    setStatus("CRANKING STARTER...");
    addLog("ENGAGED IGNITION PROTOCOL...", "accent");
    addLog("CRANKING STARTER MOTOR...", "accent");

    let currentRpm = 0;
    const crankInterval = setInterval(() => {
      currentRpm = Math.floor(Math.random() * 300) + 300;
      setRpm(currentRpm);
    }, 80);

    // Phase 2: Combustion Roar (0.7s - 1.5s)
    setTimeout(() => {
      clearInterval(crankInterval);
      setStatus("V12 COMBUSTION ACTIVE");
      addLog("V12 N/A ENGINE IGNITED!", "success");
      addLog("CYLINDERS 1-12 ACTIVE - SYMMETRIC SPARK", "success");
      addLog("HPEV TRIPLE ELECTRIC MOTOR SYSTEM ENGAGED", "success");

      // Rev up rapidly from current to 8500 RPM
      const startRpm = currentRpm;
      const endRpm = 8500;
      const duration = 400; // ms
      const startTime = performance.now();

      function revUp(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress * (2 - progress);
        const curRpm = startRpm + (endRpm - startRpm) * ease;
        setRpm(curRpm);
        if (progress < 1) {
          requestAnimationFrame(revUp);
        }
      }
      requestAnimationFrame(revUp);
    }, 700);

    // Phase 3: Decel to Idle & Ready (1.3s - 2.4s)
    setTimeout(() => {
      addLog("OUTPUT CAPABILITY: 1015 CV COMBINED POWER", "success");
      addLog("DYNAMIC FLUID TEMPERATURES: SECURE", "success");
      addLog("ALL GEARBOX ACTUATORS CALIBRATED", "success");
      addLog("SYSTEM CHECK: 100% OK", "success");
      addLog("IGNITION SEQUENCE COMPLETED.", "success");
      setStatus("IGNITION SEQUENCE COMPLETED");

      // Drop RPM back to idle (1200 RPM)
      const startRpm = 8500;
      const endRpm = 1200;
      const duration = 900; // ms
      const startTime = performance.now();

      function revDown(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
        const curRpm = startRpm + (endRpm - startRpm) * ease;
        setRpm(curRpm);
        if (progress < 1) {
          requestAnimationFrame(revDown);
        }
      }
      requestAnimationFrame(revDown);
    }, 1300);

    // Phase 4: Launch Scissor Door slide open and clean up (2.6s - 3.7s)
    setTimeout(() => {
      setStatus("LAUNCHING COCKPIT...");
      addLog("DRIVETRAIN ENGAGED. ENJOY THE RIDE.", "success");
      setLaunched(true);
    }, 2600);

    // Trigger complete
    setTimeout(() => {
      onLaunch();
    }, 3500);
  };

  const maxDash = 534;
  const pct = Math.min(rpm / 9000, 1);
  const strokeDashoffset = maxDash - pct * maxDash;

  return (
    <div className={`intro-loader ${igniting ? 'is-igniting' : ''} ${launched ? 'is-launched' : ''}`} id="intro-loader">
      <div className="loader-panel loader-panel-left"></div>
      <div className="loader-panel loader-panel-right"></div>
      
      <div className="loader-content">
        <div className="loader-header">
          <span className="loader-logo-mark" aria-hidden="true">◢</span>
          <span className="loader-logo-wordmark">Lamborghini</span>
        </div>
        
        <div className="loader-dashboard">
          <div className="dashboard-status">
            <span className="status-indicator"></span>
            <span className={`status-text ${igniting ? 'status-active' : ''}`}>{status}</span>
          </div>
          
          <div className="gauge-and-btn">
            {/* Circular RPM Tachometer */}
            <div className="rpm-gauge-container">
              <svg className="rpm-gauge" viewBox="0 0 200 200">
                <circle className="rpm-gauge-bg" cx="100" cy="100" r="85"></circle>
                <circle 
                  className="rpm-gauge-fill" 
                  cx="100" 
                  cy="100" 
                  r="85" 
                  strokeDasharray={maxDash} 
                  strokeDashoffset={strokeDashoffset}
                ></circle>
              </svg>
              <div className="rpm-display">
                <span className="rpm-value">{(rpm / 1000).toFixed(1)}</span>
                <span className="rpm-unit">RPM x1000</span>
              </div>
            </div>
            
            {/* Red Start Engine Button */}
            <div className="ignition-btn-wrap" id="ignition-btn-wrap">
              <div className="ignition-btn-pulse"></div>
              <button 
                className="ignition-btn" 
                onClick={handleIgnition}
                disabled={disabled}
                type="button"
              >
                <span className="ignition-label-top">START</span>
                <span className="ignition-label-mid">ENGINE</span>
                <span className="ignition-label-bot">START</span>
              </button>
            </div>
          </div>
          
          {/* Diagnostics Logs */}
          <div className="cyber-logs" ref={logsContainerRef}>
            {logs.map((log, index) => (
              <div 
                key={index} 
                className={`log-line ${log.type ? `log-line--${log.type}` : ''}`}
              >
                &gt; {log.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
