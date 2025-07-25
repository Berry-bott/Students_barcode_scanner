import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';


export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate('');
      } else {
        setIsAuthenticated(true);
      }
    };

    checkUser();
  }, [navigate]);

  if (isAuthenticated === null) return <div>Loading...</div>;
  return children;
}
