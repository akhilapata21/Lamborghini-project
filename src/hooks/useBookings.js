import { useState, useCallback } from 'react';

const API_BASE = 'http://localhost:5000/api';

export function useBookings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Submit a Booking (Public)
  const createBooking = useCallback(async (bookingData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit booking');
      setLoading(false);
      return data;
    } catch (e) {
      setError(e.message);
      setLoading(false);
      throw e;
    }
  }, []);

  // 2. Admin Login
  const loginAdmin = useCallback(async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to authenticate');
      setLoading(false);
      return data.token;
    } catch (e) {
      setError(e.message);
      setLoading(false);
      throw e;
    }
  }, []);

  // 3. Fetch Bookings (Admin Protected)
  const getBookings = useCallback(async (token) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to retrieve bookings');
      setLoading(false);
      return data;
    } catch (e) {
      setError(e.message);
      setLoading(false);
      throw e;
    }
  }, []);

  // 4. Update Status (Admin Protected)
  const updateStatus = useCallback(async (token, id, status) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/bookings/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status');
      setLoading(false);
      return data;
    } catch (e) {
      setError(e.message);
      setLoading(false);
      throw e;
    }
  }, []);

  // 5. Delete Booking (Admin Protected)
  const removeBooking = useCallback(async (token, id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/bookings/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete booking');
      setLoading(false);
      return data;
    } catch (e) {
      setError(e.message);
      setLoading(false);
      throw e;
    }
  }, []);

  return {
    loading,
    error,
    createBooking,
    loginAdmin,
    getBookings,
    updateStatus,
    removeBooking
  };
}
