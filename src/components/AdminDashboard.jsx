import React, { useState, useEffect, useMemo } from 'react';
import { useBookings } from '../hooks/useBookings';

export default function AdminDashboard() {
  const { loading, error, loginAdmin, getBookings, updateStatus, removeBooking } = useBookings();
  
  // Authentication State
  const [token, setToken] = useState(localStorage.getItem('lambo_admin_token') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Booking Data State
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modelFilter, setModelFilter] = useState('All');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [lamboVideoMode, setLamboVideoMode] = useState(localStorage.getItem('lambo_video_mode') || 'local');
  const [customBgInput, setCustomBgInput] = useState(localStorage.getItem('custom_hero_bg') || '');
  const [customShowcaseInput, setCustomShowcaseInput] = useState(localStorage.getItem('custom_hero_showcase') || '');
  const [customFilmInput, setCustomFilmInput] = useState(localStorage.getItem('custom_cinema_film') || '');

  // Fetch bookings when authenticated
  useEffect(() => {
    if (token) {
      getBookings(token)
        .then(setBookings)
        .catch(err => {
          console.error("Auth expired or failed:", err);
          handleLogout();
        });
    }
  }, [token, refreshTrigger, getBookings]);

  // Handle Login Submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const resToken = await loginAdmin(username, username ? password : '');
      localStorage.setItem('lambo_admin_token', resToken);
      setToken(resToken);
    } catch (err) {
      setLoginError(err.message || 'Invalid username or password');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('lambo_admin_token');
    setToken('');
    setBookings([]);
  };

  // Save Dynamic Asset Video Configs
  const handleSaveVideoAssets = (e) => {
    e.preventDefault();
    localStorage.setItem('lambo_video_mode', lamboVideoMode);
    localStorage.setItem('custom_hero_bg', customBgInput.trim());
    localStorage.setItem('custom_hero_showcase', customShowcaseInput.trim());
    localStorage.setItem('custom_cinema_film', customFilmInput.trim());
    
    // Dispatch a custom event to notify Hero and Cinema components in real-time
    const event = new Event('lambo_assets_updated');
    window.dispatchEvent(event);
    alert('Dynamic video configuration successfully updated!');
  };

  // Reset Dynamic Asset Video Configs
  const handleResetVideoAssets = () => {
    if (window.confirm('Reset all video custom overrides to default model trailers?')) {
      localStorage.removeItem('lambo_video_mode');
      localStorage.removeItem('custom_hero_bg');
      localStorage.removeItem('custom_hero_showcase');
      localStorage.removeItem('custom_cinema_film');
      setLamboVideoMode('streaming');
      setCustomBgInput('');
      setCustomShowcaseInput('');
      setCustomFilmInput('');
      
      const event = new Event('lambo_assets_updated');
      window.dispatchEvent(event);
      alert('Reset completed successfully!');
    }
  };

  // Update Booking Status
  const handleStatusToggle = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Pending' ? 'Confirmed' : 'Pending';
    try {
      await updateStatus(token, id, nextStatus);
      setRefreshTrigger(prev => prev + 1);
    } catch (err) {
      alert(`Error updating status: ${err.message}`);
    }
  };

  // Delete Booking with prompt
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to cancel the test drive for ${name}?`)) {
      return;
    }
    try {
      await removeBooking(token, id);
      setRefreshTrigger(prev => prev + 1);
    } catch (err) {
      alert(`Error deleting booking: ${err.message}`);
    }
  };

  // CSV Export Generator
  const handleCSVExport = () => {
    if (!bookings.length) return;

    const headers = ['Booking ID', 'Customer Name', 'Email Address', 'Car Model', 'Category', 'Status', 'Date Booked'];
    const rows = bookings.map(b => [
      b.id,
      b.name.replace(/"/g, '""'),
      b.email.replace(/"/g, '""'),
      b.model,
      b.tag || '',
      b.status,
      new Date(b.createdAt).toLocaleString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Lamborghini_Bookings_Export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtering & Sorting
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        b.name.toLowerCase().includes(query) ||
        b.email.toLowerCase().includes(query) ||
        b.id.toLowerCase().includes(query);

      const matchesModel = modelFilter === 'All' || b.model.toLowerCase().includes(modelFilter.toLowerCase());

      return matchesSearch && matchesModel;
    });
  }, [bookings, searchQuery, modelFilter]);

  // Statistics and KPI Metrics
  const stats = useMemo(() => {
    if (!bookings.length) return { total: 0, pending: 0, confirmed: 0, popular: 'None' };

    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'Pending').length;
    const confirmed = bookings.filter(b => b.status === 'Confirmed').length;

    const counts = {};
    bookings.forEach(b => {
      counts[b.model] = (counts[b.model] || 0) + 1;
    });
    let popular = 'None';
    let max = 0;
    Object.entries(counts).forEach(([modelName, num]) => {
      if (num > max) {
        max = num;
        popular = modelName;
      }
    });

    return { total, pending, confirmed, popular };
  }, [bookings]);

  // Render Auth Login view if token is missing
  if (!token) {
    return (
      <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'var(--bg-deep)' }}>
        <div className="cta-inner js-tilt" style={{ maxWidth: '480px', width: '100%', margin: '0 auto', border: '1px solid var(--line)', background: 'var(--bg-card)' }}>
          <div className="cta-copy" style={{ width: '100%', padding: '2.5rem' }}>
            <p className="eyebrow eyebrow-dark">Secure Verification Portal</p>
            <h2 style={{ fontSize: '2.0rem', marginBottom: '1.25rem', fontFamily: 'var(--font-display)' }}>Dealer Login</h2>
            
            <form className="cta-form" onSubmit={handleLogin}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', textAlign: 'left', marginBottom: '0.75rem' }}>
                <label style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Admin Username</label>
                <input 
                  type="text" 
                  placeholder="Enter username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                  style={{ width: '100%', padding: '0.85rem', fontFamily: 'var(--font-body)', background: 'var(--bg-deep)', border: '1px solid var(--line)', color: 'var(--text)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', textAlign: 'left', marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Security Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  style={{ width: '100%', padding: '0.85rem', fontFamily: 'var(--font-body)', background: 'var(--bg-deep)', border: '1px solid var(--line)', color: 'var(--text)', outline: 'none' }}
                />
              </div>

              {loginError && (
                <div style={{ color: '#ff1744', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'left' }}>
                  {loginError}
                </div>
              )}

              <button className="btn btn-primary btn-full" type="submit" disabled={loading}>
                {loading ? 'Authenticating...' : 'Authenticate'}
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '90vh', background: 'var(--bg-deep)', padding: '6rem 2rem 4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Dashboard Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem', borderBottom: '1px solid var(--line)', paddingBottom: '1.5rem' }}>
          <div>
            <span className="eyebrow" style={{ color: 'var(--accent)' }}>Database Terminal</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', letterSpacing: '0.05em', color: '#fff', margin: '0.2rem 0 0' }}>Dealer Console</h1>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-ghost" onClick={handleCSVExport} disabled={!bookings.length}>
              Download CSV 📊
            </button>
            <button className="btn btn-primary" onClick={handleLogout} style={{ background: '#ff1744', borderColor: '#ff1744', color: '#fff' }}>
              Disconnect ✕
            </button>
          </div>
        </div>

        {/* KPI Summaries */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          
          <div className="spec-card" style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--line)' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>Total Bookings</span>
            <p style={{ fontSize: '2.8rem', fontWeight: '700', color: 'var(--accent)', margin: '0.5rem 0 0', fontFamily: 'var(--font-display)' }}>
              {stats.total}
            </p>
          </div>

          <div className="spec-card" style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--line)' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>Pending Reviews</span>
            <p style={{ fontSize: '2.8rem', fontWeight: '700', color: '#ffb300', margin: '0.5rem 0 0', fontFamily: 'var(--font-display)' }}>
              {stats.pending}
            </p>
          </div>

          <div className="spec-card" style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--line)' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>Confirmed Drives</span>
            <p style={{ fontSize: '2.8rem', fontWeight: '700', color: '#00e676', margin: '0.5rem 0 0', fontFamily: 'var(--font-display)' }}>
              {stats.confirmed}
            </p>
          </div>

          <div className="spec-card" style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--line)' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>Most Popular</span>
            <p style={{ fontSize: '1.6rem', fontWeight: '600', color: '#fff', margin: '1.25rem 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {stats.popular}
            </p>
          </div>

        </div>

        {/* Dynamic Asset and Video Manager (STUNNING WOW FEATURE) */}
        <section style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px solid var(--line)', padding: '2rem', marginBottom: '3.5rem' }}>
          <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <span className="eyebrow" style={{ color: 'var(--accent)', fontSize: '0.68rem' }}>Assets Manager</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#fff', margin: '0.2rem 0 0' }}>Dynamic Trailer & Video Configuration</h2>
          </div>

          <form onSubmit={handleSaveVideoAssets}>
            {/* Playback Mode selector */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Video Playback Mode
                </label>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 1rem' }}>
                  Select streaming mode to display high-quality YouTube model trailers dynamically, or local drive mode for local files.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    type="button" 
                    onClick={() => setLamboVideoMode('streaming')}
                    className={`btn ${lamboVideoMode === 'streaming' ? 'btn-primary' : 'btn-ghost'}`}
                    style={{ flex: '1', padding: '0.75rem' }}
                  >
                    YouTube Streaming 📡
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setLamboVideoMode('local')}
                    className={`btn ${lamboVideoMode === 'local' ? 'btn-primary' : 'btn-ghost'}`}
                    style={{ flex: '1', padding: '0.75rem' }}
                  >
                    Local Drive (Offline) 💻
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Configuration Guide
                </label>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.45', background: 'rgba(0,0,0,0.2)', padding: '1rem', border: '1px solid var(--line)' }}>
                  • <strong>YouTube links:</strong> Paste any share/watch link (e.g. <code>https://youtu.be/Nun9uJGPeHI</code>) or just the 11-char ID.<br/>
                  • <strong>Local drives:</strong> Paste a relative path (e.g. <code>/video.mp4</code>) or an absolute local directory file link.<br/>
                  • <strong>Default fallback:</strong> Leave fields blank to let the website load standard model trailers dynamically!
                </div>
              </div>
            </div>

            {/* URL Override Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <label style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                  Hero Section: Background Loop Override
                </label>
                <input 
                  type="text" 
                  placeholder="Default: Model Dynamic Trailer (or /video.mp4)" 
                  value={customBgInput}
                  onChange={(e) => setCustomBgInput(e.target.value)}
                  style={{ width: '100%', padding: '0.85rem', fontFamily: 'monospace', fontSize: '0.85rem', background: 'var(--bg-deep)', border: '1px solid var(--line)', color: 'var(--text)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <label style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                  Hero Section: Showcase Video Override
                </label>
                <input 
                  type="text" 
                  placeholder="Default: Model Dynamic Trailer (or /video.mp4)" 
                  value={customShowcaseInput}
                  onChange={(e) => setCustomShowcaseInput(e.target.value)}
                  style={{ width: '100%', padding: '0.85rem', fontFamily: 'monospace', fontSize: '0.85rem', background: 'var(--bg-deep)', border: '1px solid var(--line)', color: 'var(--text)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                  Cinema Section: Uncut Film Video Override
                </label>
                <input 
                  type="text" 
                  placeholder="Default: Model Dynamic Film (or /video.mp4)" 
                  value={customFilmInput}
                  onChange={(e) => setCustomFilmInput(e.target.value)}
                  style={{ width: '100%', padding: '0.85rem', fontFamily: 'monospace', fontSize: '0.85rem', background: 'var(--bg-deep)', border: '1px solid var(--line)', color: 'var(--text)', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" type="button" onClick={handleResetVideoAssets}>
                Reset to Defaults ↺
              </button>
              <button className="btn btn-primary" type="submit">
                Save Assets Config 💾
              </button>
            </div>
          </form>
        </section>

        {/* Filter and Search Panel */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', background: 'rgba(0,0,0,0.2)', padding: '1.25rem', border: '1px solid var(--line)', marginBottom: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'flex', gap: '1rem', flex: '1', minWidth: '280px' }}>
            <input 
              type="text" 
              placeholder="Search by customer name, email, or pass ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-deep)', border: '1px solid var(--line)', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Model:</span>
            <select 
              value={modelFilter} 
              onChange={(e) => setModelFilter(e.target.value)}
              style={{ padding: '0.75rem 1.5rem', background: 'var(--bg-deep)', border: '1px solid var(--line)', color: '#fff', outline: 'none', cursor: 'pointer' }}
            >
              <option value="All">All Lineups</option>
              <option value="Revuelto">Revuelto</option>
              <option value="Temerario">Temerario</option>
              <option value="Tecnica">Huracán Tecnica</option>
              <option value="STO">Huracán STO</option>
              <option value="Urus">Urus SE</option>
              <option value="Aventador">Aventador SVJ</option>
              <option value="Sian">Sián FKP 37</option>
              <option value="Countach">Countach</option>
            </select>
          </div>

        </div>

        {/* Bookings Spreadsheet Grid Table */}
        <div style={{ overflowX: 'auto', background: 'rgba(0,0,0,0.15)', border: '1px solid var(--line)' }}>
          {loading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Loading secure records...
            </div>
          ) : filteredBookings.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No test drive bookings found matching your request.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead>
                <tr style={{ background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid var(--line)' }}>
                  <th style={{ padding: '1rem', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>Ticket ID</th>
                  <th style={{ padding: '1rem', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>Customer</th>
                  <th style={{ padding: '1rem', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>Email</th>
                  <th style={{ padding: '1rem', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>Requested Supercar</th>
                  <th style={{ padding: '1rem', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>Date Requested</th>
                  <th style={{ padding: '1rem', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>Status</th>
                  <th style={{ padding: '1rem', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr 
                    key={booking.id} 
                    style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', transition: 'background 0.2s' }}
                    className="admin-table-row"
                  >
                    <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 'bold' }}>
                      {booking.id}
                    </td>
                    <td style={{ padding: '1rem', color: '#fff', fontWeight: '500' }}>
                      {booking.name}
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      {booking.email}
                    </td>
                    <td style={{ padding: '1rem', color: '#fff', fontWeight: '600' }}>
                      <span style={{ fontSize: '0.82rem', padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        {booking.model}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {new Date(booking.createdAt).toLocaleDateString()} at {new Date(booking.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span 
                        style={{ 
                          fontSize: '0.72rem', 
                          fontWeight: 'bold', 
                          textTransform: 'uppercase', 
                          padding: '0.3rem 0.6rem', 
                          borderRadius: '2px',
                          background: booking.status === 'Confirmed' ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255, 179, 0, 0.1)',
                          color: booking.status === 'Confirmed' ? '#00e676' : '#ffb300',
                          border: `1px solid ${booking.status === 'Confirmed' ? 'rgba(0, 230, 118, 0.3)' : 'rgba(255, 179, 0, 0.3)'}`
                        }}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <button 
                          className="btn btn-ghost" 
                          onClick={() => handleStatusToggle(booking.id, booking.status)}
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.72rem', height: 'auto' }}
                        >
                          {booking.status === 'Pending' ? 'Confirm' : 'Revoke'}
                        </button>
                        <button 
                          className="btn btn-ghost" 
                          onClick={() => handleDelete(booking.id, booking.name)}
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.72rem', height: 'auto', color: '#ff1744', borderColor: 'rgba(255,23,68,0.2)' }}
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </main>
  );
}
